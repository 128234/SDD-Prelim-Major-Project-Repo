//This will first go to page 1
goToPage(page1);
//This array contains all class arrays
var allClassesArray = [];
//This array is used to store the details of the students in the selected class
var chosenClassArray = [];

//Every time a certain button is pressed, this code will switch from page to page.
//It works by hiding all pages and showing the one selected.
function goToPage(page) {
  var pages = document.getElementsByClassName("pages");
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  page.style.display = "block";
}

//PAGE3 - This function will add a new row to the table for the user to enter
//var studentID = -1; //useless at the moment
function addNewStudent() {
  //studentID += 1; //useless
  //Creates a new row and splits it into 3 cells
  row = document.getElementById("studentListTable").insertRow(-1);
  cell0 = row.insertCell(0);
  cell1 = row.insertCell(1);
  cell2 = row.insertCell(2);

  //This will create and place input elements in each cell in the table
  inputElement0 = document.createElement("input");
  inputElement1 = document.createElement("input");
  inputElement2 = document.createElement("input");
  /*Useless code for now
  inputElement0.id = "fName" + studentID.toString();
  inputElement1.id = "sName" + studentID.toString();
  inputElement2.id = "rank" + studentID.toString();
  */
  cell0.appendChild(inputElement0);
  cell1.appendChild(inputElement1);
  cell2.appendChild(inputElement2);
}

//This function deletes the last row of the input table
function removeLastStudent() {
  if (document.getElementById("studentListTable").rows.length > 1) {
    document.getElementById("studentListTable").deleteRow(-1);
  }
}

//PAGE3 - This function will save the list of students that the user entered into an array
function saveClass() {
  table = document.getElementById("studentListTable");
  //Iterates through the table and appends value in the cell to an object
  isFilled = checkTableFilled(table)
  if(!isFilled){
    alert("Please fill all cells");
        chosenClassArray = [];
        return;
  }
  
  for (r = 1; r < table.rows.length; r++) {
      studentDetailsObject = {
        firstName: table.rows[r].cells[0].childNodes[0].value,
        lastName: table.rows[r].cells[1].childNodes[0].value,
        rank: table.rows[r].cells[2].childNodes[0].value
      };
      //The object is pushed into the class array
      chosenClassArray.push(studentDetailsObject);
      //
    }
    goToPage(page4);
    createTable();
    disableInputBox();
  }

//Used in the saveClass function to check if all cells are entered
function checkTableFilled(table) {
  checkFilled = true
  for (r = 1; r < table.rows.length; r++) {
    for (c = 0; c < table.rows[r].cells.length; c++) {
      if (table.rows[r].cells[c].childNodes[0].value == "" ) {
        table.rows[r].cells[c].style.backgroundColor = "red"
        checkFilled = false
    } else {
      table.rows[r].cells[c].style.backgroundColor = "white"
    }
    }
  }
  return checkFilled;
}

//PAGE4 - This will create a table to be display the students entered into the array
function createTable() {
  for (i = 0; i < chosenClassArray.length; i++) {
    row = document.getElementById("studentListTableDisplay").insertRow(-1);
    cell0 = row.insertCell(0);
    cell1 = row.insertCell(1);
    cell2 = row.insertCell(2);
    cell0.innerHTML = chosenClassArray[i].firstName;
    cell1.innerHTML = chosenClassArray[i].lastName;
    cell2.innerHTML = chosenClassArray[i].rank;
  }
}

//PAGE4 - This will split the class into the groups assigned by the user
function divideClass() {
  //Booleans to show which radio button is selected
  isItByGroupsBtn = $("#byGroupsBtn").prop("checked");
  isItByStudentsBtn = $("#byStudentsBtn").prop("checked");

  //Number of groups and number of students in each group
  numOfGroups = Number(document.getElementById("numGroupsInput").value);
  numOfStudents = Number(document.getElementById("numStudentsInput").value);

  //Used when unequal groups are formed
  numOfRemainingStudents = 0;
  numOfRemainingGroups = 0;

  //This if statement will clear the output when the user changes the input
  if (
    (numOfGroups == 0 && isItByGroupsBtn == true) ||
    (numOfStudents == 0 && isItByStudentsBtn == true)
  ) {
    classDivideFeedback.innerHTML = "";
  } else {
    //Case when the top radio button has been selected
    if (isItByGroupsBtn == true) {
      //Case when an equal number of students per group is possible
      if (chosenClassArray.length % numOfGroups == 0) {
        numOfStudents = chosenClassArray.length / numOfGroups;
        document.getElementById("numStudentsInput").value = numOfStudents;

        //Output back to user
        classDivideFeedback.innerHTML =
          "The class will be split into " +
          numOfGroups +
          " groups containing " +
          numOfStudents +
          " students.";

        //Case when an equal number of students per group is impossible
      } else {
        if (chosenClassArray.length < numOfGroups) {
          classDivideFeedback.innerHTML =
            "The values provided are unable to generate a group as there are more groups than students.";
        } else {
          //SPLIT INTO UNEQUAL GROUPS
          numOfRemainingStudents = Math.ceil(
            chosenClassArray.length / numOfGroups
          );
          numOfStudents = chosenClassArray.length;
          while (numOfStudents % (numOfGroups - numOfRemainingGroups) != 0) {
            numOfStudents -= numOfRemainingStudents;
            numOfRemainingGroups += 1;
          }
          numOfStudents = numOfStudents / (numOfGroups - numOfRemainingGroups);

          classDivideFeedback.innerHTML =
            "Due to the parameters entered, the class cannot be equally distributed into " +
            numOfGroups +
            " groups. <br/>" +
            "Here is a possible alternative: " +
            "<br/>";
          classDivideFeedback.innerHTML +=
            "The class can be split into " +
            (numOfGroups - numOfRemainingGroups) +
            " group(s) containing " +
            numOfStudents +
            " student(s) and " +
            numOfRemainingGroups +
            " group(s) containing " +
            numOfRemainingStudents +
            " students.";
        }
      }
    } else if (isItByStudentsBtn == true) {
      if (chosenClassArray.length % numOfStudents == 0) {
        numOfGroups = chosenClassArray.length / numOfStudents;
        document.getElementById("numGroupsInput").value = numOfGroups;
      }
    }
    /*classDivideFeedback.innerHTML =
    "The class will be split into " +
    numOfGroups +
    " groups, containing " +
    numOfStudents +
    " students.";*/
    //alert(byStudentsButton.checked.value)
    //if(chosenClassArray.length%)
  }
}

//PAGE4 - Disable other input box when typing
function disableInputBox() {
  //Booleans to show which radio button is selected
  isItByGroupsBtn = $("#byGroupsBtn").prop("checked");
  isItByStudentsBtn = $("#byStudentsBtn").prop("checked");

  //This will disable the other input box when that radio button is selected
  if (isItByGroupsBtn) {
    document.getElementById("numGroupsInput").disabled = false;
    document.getElementById("numStudentsInput").disabled = true;
    document.getElementById("byGroupsLabel").style.color = "black";
    document.getElementById("byStudentsLabel").style.color = "darkgray";
  } else {
    document.getElementById("numStudentsInput").disabled = false;
    document.getElementById("numGroupsInput").disabled = true;
    document.getElementById("byGroupsLabel").style.color = "darkgray";
    document.getElementById("byStudentsLabel").style.color = "black";
  }
}
