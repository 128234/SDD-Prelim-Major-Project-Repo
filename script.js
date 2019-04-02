//This will first go to page 1
goToPage(page1);
var allClassesArray = [];
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
//var studentID = -1; //useless
function addNewStudent() {
  //studentID += 1; //useless
  row = document.getElementById("studentListTable").insertRow(-1);

  cell0 = row.insertCell(0);
  cell1 = row.insertCell(1);
  cell2 = row.insertCell(2);

  //This will place input elements in each cell in the table
  inputElement0 = document.createElement("input");
  inputElement1 = document.createElement("input");
  inputElement2 = document.createElement("input");
  //Useless code
  //inputElement0.id = "fName" + studentID.toString();
  //inputElement1.id = "sName" + studentID.toString();
  //inputElement2.id = "rank" + studentID.toString();
  //End of useless code
  cell0.appendChild(inputElement0);
  cell1.appendChild(inputElement1);
  cell2.appendChild(inputElement2);
}

function removeLastStudent() {
  if (document.getElementById("studentListTable").rows.length > 1) {
    document.getElementById("studentListTable").deleteRow(-1);
  }
}

//PAGE3 - This function will save the list of students that the user entered into an array
function saveClass() {
  table = document.getElementById("studentListTable");
  for (r = 1; r < table.rows.length; r++) {
    //for (c = 0, m = table.rows[r].cells.length; c < m; c++) {
    studentDetailsObject = {
      firstName: table.rows[r].cells[0].childNodes[0].value,
      lastName: table.rows[r].cells[1].childNodes[0].value,
      rank: table.rows[r].cells[2].childNodes[0].value
    };
    chosenClassArray.push(studentDetailsObject);
    //}
  }
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

//This will split the class into the groups assigned by the user
function divideClass() {
  isByGroupsBtn = $("#byGroupsBtn").prop("checked");
  isByStudentsBtn = $("#byStudentsBtn").prop("checked");
  numOfGroups = Number(document.getElementById("numGroupsInput").value);
  numOfStudents = Number(document.getElementById("numStudentsInput").value);

  if (isByGroupsBtn == true) {
    if (chosenClassArray.length % numOfGroups == 0) {
      numOfStudents = chosenClassArray.length / numOfGroups;
      document.getElementById("numStudentsInput").value = numOfStudents;
    }
  } else {
    if (chosenClassArray.length % numOfStudents == 0) {
      numOfGroups = chosenClassArray.length / numOfStudents;
      document.getElementById("numGroupsInput").value = numOfGroups;
    }
  }
  classDivideFeedback.innerHTML =
    "The class will be split into " +
    numOfGroups +
    " groups, containing " +
    numOfStudents +
    " students.";
  //alert(byStudentsButton.checked.value)
  //if(chosenClassArray.length%)
}
