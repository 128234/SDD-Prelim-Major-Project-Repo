//This will first go to page 1
goToPage(page1);
//This array contains all class arrays
var allClassesArray = [];
//This array is used to store the details of the students in the selected class
var chosenClassArray = [];
//The following variable stores details regarding the size of the groups
var groupDetailsObject = {
  equalGroups: true,
  numGroupsA: 0,
  numStudentsA: 0,
  numGroupsB: 0,
  numStudentsB: 0
};

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
  if (document.getElementById("studentListTable").rows.length > 2) {
    document.getElementById("studentListTable").deleteRow(-1);
  }
}

//PAGE3 - This function will save the list of students that the user entered into an array
function saveClass() {
  table = document.getElementById("studentListTable");
  //Iterates through the table and appends value in the cell to an object
  isFilled = checkTableFilled(table);
  if (!isFilled) {
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
  //These following functions will initialise the following page
  goToPage(page4);
  createTable("studentListTableDisplayP4");
  disableInputBox();
}

//PAGE3 - Used in the saveClass function to check if all cells are entered
function checkTableFilled(table) {
  checkFilled = true;
  for (r = 1; r < table.rows.length; r++) {
    for (c = 0; c < table.rows[r].cells.length; c++) {
      //If the cell is empty, it will be highlighted red for the user to see
      if (table.rows[r].cells[c].childNodes[0].value == "") {
        table.rows[r].cells[c].style.backgroundColor = "red";
        checkFilled = false;
      } else {
        table.rows[r].cells[c].style.backgroundColor = "white";
      }
    }
  }
  return checkFilled;
}

//PAGE4 & PAGE5 - This will create a table to be display the students entered into the array
function createTable(tableName) {
  for (i = 0; i < chosenClassArray.length; i++) {
    row = document.getElementById(tableName).insertRow(-1);
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
    document.getElementById("numGroupsInput").value = "";
    document.getElementById("numStudentsInput").value = "";
  } else {
    //When the button selected has a input value entered
    //Case when the top radio button has been selected
    if (isItByGroupsBtn == true) {
      //Case when an equal number of students per group is possible
      if (chosenClassArray.length % numOfGroups == 0) {
        numOfStudents = chosenClassArray.length / numOfGroups;
        //NOT NEEDED - document.getElementById("numStudentsInput").value = numOfStudents;

        //This will assign to the global variable that equal groups are possible
        groupDetailsObject.equalGroups = true;

        //Output back to user, if statement used for plural cases (e.g. numOfGroups == 1)
        if (numOfGroups == 1 && numOfStudents == 1) {
          classDivideFeedback.innerHTML =
            "The class will be split into 1 group, containing 1 student.";
        } else if (numOfGroups == 1) {
          classDivideFeedback.innerHTML =
            "The class will be split into 1 group, containing " +
            numOfStudents +
            " students.";
        } else if (numOfStudents == 1) {
          classDivideFeedback.innerHTML =
            "The class will be split into " +
            numOfGroups +
            " groups, each containing 1 student.";
        } else {
          classDivideFeedback.innerHTML =
            "The class will be split into " +
            numOfGroups +
            " groups, each containing " +
            numOfStudents +
            " students.";
        }

        //Case when an equal number of students per group is impossible
      } else {
        //More groups than students case
        if (chosenClassArray.length < numOfGroups) {
          classDivideFeedback.innerHTML =
            "The values provided are unable to generate a group as there are more groups than students.";
        } else {
          //The following code will split the class into as equal as possible groups
          numOfRemainingStudents = Math.ceil(
            chosenClassArray.length / numOfGroups
          );
          numOfStudents = chosenClassArray.length;
          while (numOfStudents % (numOfGroups - numOfRemainingGroups) != 0) {
            numOfStudents -= numOfRemainingStudents;
            numOfRemainingGroups += 1;
          }
          numOfGroups = numOfGroups - numOfRemainingGroups;
          numOfStudents = numOfStudents / numOfGroups;

          //This will assign to the global variable that equal groups are impossible
          groupDetailsObject.equalGroups = false;

          //Will display output back to user
          classDivideFeedback.innerHTML =
            "Due to the parameters entered, the class cannot be equally distributed into " +
            (numOfGroups + numOfRemainingGroups) +
            " groups. <br/>" +
            "Here is a possible alternative: " +
            "<br/>";
          //If statement to deal with singular and plural cases
          if (
            numOfGroups == 1 &&
            numOfRemainingGroups == 1 &&
            numOfStudents == 1
          ) {
            classDivideFeedback.innerHTML +=
              "The class can be split into 1 group containing 1 student and 1 group containing " +
              numOfRemainingStudents +
              " students.";
          } else if (numOfGroups == 1 && numOfStudents == 1) {
            classDivideFeedback.innerHTML +=
              "The class can be split into 1 group containing 1 student and " +
              numOfRemainingGroups +
              " groups, each containing " +
              numOfRemainingStudents +
              " students.";
          } else if (numOfGroups == 1 && numOfRemainingGroups == 1) {
            classDivideFeedback.innerHTML +=
              "The class can be split into 1 group containing " +
              numOfStudents +
              " students and 1 group containing " +
              numOfRemainingStudents +
              " students.";
          } else if (numOfRemainingGroups == 1 && numOfStudents == 1) {
            classDivideFeedback.innerHTML +=
              "The class can be split into " +
              numOfGroups +
              " groups, each containing 1 student and 1 group containing " +
              numOfRemainingStudents +
              " students.";
          } else {
            classDivideFeedback.innerHTML +=
              "The class can be split into " +
              numOfGroups +
              " groups, each containing " +
              numOfStudents +
              " students and " +
              numOfRemainingGroups +
              " groups, each containing " +
              numOfRemainingStudents +
              " students.";
          }
        }
      }
      //Bottom radio button selected
    } else if (isItByStudentsBtn == true) {
      //Equal groups are possible
      if (chosenClassArray.length % numOfStudents == 0) {
        numOfGroups = chosenClassArray.length / numOfStudents;
        //NOT NEEDED - document.getElementById("numGroupsInput").value = numOfGroups;

        //This will assign to the global variable that equal groups are possible
        groupDetailsObject.equalGroups = true;

        //Output back to user
        if (numOfGroups == 1 && numOfStudents == 1) {
          classDivideFeedback.innerHTML =
            "The class will be split into 1 group, containing 1 student.";
        } else if (numOfGroups == 1) {
          classDivideFeedback.innerHTML =
            "The class will be split into 1 group, containing " +
            numOfStudents +
            " students.";
        } else if (numOfStudents == 1) {
          classDivideFeedback.innerHTML =
            "The class will be split into " +
            numOfGroups +
            " groups, each containing 1 student.";
        } else {
          classDivideFeedback.innerHTML =
            "The class will be split into " +
            numOfGroups +
            " groups, each containing " +
            numOfStudents +
            " students.";
        }
      } else {
        //Equal groups are impossible case
        if (chosenClassArray.length < numOfStudents) {
          classDivideFeedback.innerHTML =
            "The values provided are unable to generate a group as there are not enough students in the class.";
        } else {
          //SPLIT INTO UNEQUAL GROUPS
          numOfRemainingStudents = chosenClassArray.length % numOfStudents;
          numOfGroups = Math.ceil(chosenClassArray.length / numOfStudents);
          numOfRemainingGroups = 1;
          numOfGroups -= 1

          //This will assign to the global variable that equal groups are impossible
          groupDetailsObject.equalGroups = false;

          //Output back to user
          classDivideFeedback.innerHTML =
            "Due to the parameters entered, the class cannot be equally distributed into " +
            (numOfGroups+numOfRemainingGroups) +
            " groups. <br/>" +
            "Here is a possible alternative: " +
            "<br/>";

          if (numOfGroups == 1 && numOfRemainingStudents == 1) {
            classDivideFeedback.innerHTML +=
              "The class can be split into 1 group containing " +
              numOfStudents +
              " students and 1 group containing 1 student.";
          } else if (numOfGroups == 1) {
            classDivideFeedback.innerHTML +=
              "The class can be split into 1 group containing " +
              numOfStudents +
              " students and 1 group containing " +
              numOfRemainingStudents +
              " students.";
          } else if (numOfRemainingStudents == 1) {
            classDivideFeedback.innerHTML +=
              "The class can be split into " +
              (numOfGroups) +
              " groups, each containing " +
              numOfStudents +
              " students and 1 group containing 1 student.";
          } else {
            classDivideFeedback.innerHTML +=
              "The class can be split into " +
              numOfGroups +
              " groups, each containing " +
              numOfStudents +
              " students and 1 group containing " +
              numOfRemainingStudents +
              " students.";
          }
        }
      }
    }
    //GLOBAL VARIABLES FOR CLASSES TO ACCESS IN SORTCLASS FUNCTION
    groupDetailsObject.numGroupsA = numOfGroups;
    groupDetailsObject.numStudentsA = numOfStudents;
    groupDetailsObject.numGroupsB = numOfRemainingGroups;
    groupDetailsObject.numStudentsB = numOfRemainingStudents;
    console.log(groupDetailsObject);
  }
  /**/
  //alert(byStudentsButton.checked.value)
  //if(chosenClassArray.length%)
}

//PAGE4 - Disable other input box when typing
function disableInputBox() {
  //Booleans to show which radio button is selected
  isItByGroupsBtn = $("#byGroupsBtn").prop("checked");
  isItByStudentsBtn = $("#byStudentsBtn").prop("checked");

  //This will disable the other input box when that radio button is selected
  if (isItByGroupsBtn == true) {
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

  classDivideFeedback.innerHTML = "";
  document.getElementById("numGroupsInput").value = "";
  document.getElementById("numStudentsInput").value = "";
}

//PAGE5 - Will sort and divide class into groups determined by teacher
function sortClass(method) {
  switch (method) {
    case "sortAlphaLastname":
      sortedArray = alphaSortClass("lastName");
      break;
    case "sortAlphaFirstname":
      sortedArray = alphaSortClass("firstName");
      break;
    case "sortRank":
      // code block
      break;
    case "sortRandom":
      // code block
      break;
  }
  for (i = 0; i < sortedArray.length; i++) {}
}

//This will use an insertion sort to sort the class alphabetically either by firstname or lastname
function alphaSortClass(name) {
  tempArray = chosenClassArray;
  first = 0;
  last = tempArray.length;
  positionOfNext = last - 2;

  while (positionOfNext >= first) {
    next = tempArray[positionOfNext][name];
    current = positionOfNext;
    while (
      current < last &&
      next.toLowerCase() > tempArray[current + 1][name].toLowerCase()
    ) {
      current++;
      tempArray[current - 1][name] = tempArray[current][name];
    }
    tempArray[current][name] = next;
    positionOfNext -= 1;
  }
  return tempArray;
}

//Function to randomly group students - uses selection sort
function randomiseArray(array) {
  arrRandomNumber = [];
  sortArray = array.reverse();
  sortedArray = [];
  for (i = 0; i < array.length; i++) {
    arrRandomNumber.push(Math.random());
  }
  while (sortedArray.length <= array.length) {
    max = 0;
    for (i = 0; i < arrRandomNumber.length; i++) {
      if (arrRandomNumber[i] > arrRandomNumber[max]) {
        max = i;
      }
    }
    sortedArray.push(array[max]);
    arrRandomNumber[max] = 0;
  }
  sortedArray.pop();
  return sortedArray;
}
/* STUFF TO DO
- Check that group sorter is entered and then show button
- Radio buttons on how to sort group (random, alphabetically, rank order (top with bottom, random for odd)

- Display table back to user with lists.

--------

-Add functionality that saves classes to cloud/local storage
- Back button on pages
*/
