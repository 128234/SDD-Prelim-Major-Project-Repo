goToPage(page1);
var allClassesArray = [];
var chosenClassArray = [];

//Everytime a certain button is pressed, this code will switch from page to page
function goToPage(page) {
  var pages = document.getElementsByClassName("pages");
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  page.style.display = "block";
}

//This function will add a new row to the table for the user to enter
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
  if(document.getElementById("studentListTable").rows.length > 1){
  document.getElementById("studentListTable").deleteRow(-1);
  }
}

//This function will save the list of students that the user entered into an array
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


function createTable() {
  for(i=0;i<chosenClassArray.length;i++) {
    row = document.getElementById("studentListTableDisplay").insertRow(-1);
  cell0 = row.insertCell(0);
  cell1 = row.insertCell(1);
  cell2 = row.insertCell(2);
cell0.innerHTML = chosenClassArray[i].firstName
    cell1.innerHTML = chosenClassArray[i].lastName
    cell2.innerHTML = chosenClassArray[i].rank
  }
  
}