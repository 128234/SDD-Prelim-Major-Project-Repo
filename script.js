alert('test');
goToPage(page1);
document.getElementById("lastQuestionButton").hidden = true;

//Everytime a certain button is pressed, this code will switch from page to page
function goToPage(page) {
  document.querySelectorAll(".pages").forEach(i => i.hidden = true);
  page.hidden = false;
}

//This function will add a new row to the table for the user to enter
var studentID = 0;
alert(studentID);
function addNewStudent(){
  if(studentID != 0){
    studentID = -1;
  } 
  studentID += 1
  alert(studentID)
  table = document.getElementById("studentListTable");
  row = table.insertRow(-1);
  cell0 = row.insertCell(0);
  cell1 = row.insertCell(1);
  cell2 = row.insertCell(2);
  inputElement0 = document.createElement("input");
  inputElement1 = document.createElement("input");
  inputElement2 = document.createElement("input");
  
  inputElement0.id = 'fName' + studentID.toString()
  inputElement1.id = 'sName' + studentID.toString()
  inputElement2.id = 'rank' + studentID.toString()
  
  cell0.appendChild(inputElement0);
  cell1.appendChild(inputElement1);
  cell2.appendChild(inputElement2);
}

function x() {
    table = document.getElementById('studentListTable');
    for (r = 1, n = table.rows.length; r < n; r++) {
        for (c = 0, m = table.rows[r].cells.length; c < m; c++) {
            alert(table.rows[r].cells[c].innerHTML);
        }
    }
}