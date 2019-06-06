//This will first go to page 1
goToPage(page1);
//This array contains all class arrays
var allClassesArray = JSON.parse(localStorage.getItem("allClassesArray"))
if (allClassesArray == null) {
      var allClassesArray = [];
    }
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
//This is a temporary variable to store the class name and variable
var tempClassStore = [];

//Every time a certain button is pressed, this code will switch from page to page.
//It works by hiding all pages and showing the one selected.
function goToPage(page) {
  var pages = document.getElementsByClassName("pages");
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  page.style.display = "block";
}

function clearInputTable() {
  while (document.getElementById("studentListTable").rows.length > 2) {
    document.getElementById("studentListTable").deleteRow(-1);
  }

  //Will clear the value in the top cell and make cell white
  for (i = 0; i < 3; i++) {
    document.getElementById("studentListTable").rows[1].cells[
      i
    ].childNodes[0].value =
      "";
    document.getElementById("studentListTable").rows[1].cells[
      i
    ].style.backgroundColor =
      "white";
  }

  classNameInput.value = "";
  goToPage(page3);
}

//This function will load already saved classes
function loadClass() {
  bubbleSort();
  index = binarySearch();

  if (index === false) {
    alert("This class was not found in our database. Please try again.");
    return;
  }
  findClassNameInput.value = "";
  while (document.getElementById("studentListTable").rows.length > 1) {
    document.getElementById("studentListTable").deleteRow(-1);
  }
  for (i = 0; i < allClassesArray[index].class.length; i++) {
    row = document.getElementById("studentListTable").insertRow(-1);
    cell0 = row.insertCell(0);
    cell1 = row.insertCell(1);
    cell2 = row.insertCell(2);
    inputElement0 = document.createElement("input");
    inputElement1 = document.createElement("input");
    inputElement2 = document.createElement("input");
    cell0.appendChild(inputElement0);
    cell1.appendChild(inputElement1);
    cell2.appendChild(inputElement2);
    cell0.childNodes[0].value = allClassesArray[index].class[i].firstName;
    cell1.childNodes[0].value = allClassesArray[index].class[i].lastName;
    cell2.childNodes[0].value = allClassesArray[index].class[i].rank;
  }
  classNameInput.value = allClassesArray[index].name;
  goToPage(page3);
}

function bubbleSort() {
  //The following lines display the insertion sort algorithm which sorts the array
  tempArray = allClassesArray;
  first = 0;
  last = tempArray.length - 1;
  positionOfNext = last - 1;

  while (positionOfNext >= first) {
    next = tempArray[positionOfNext];
    current = positionOfNext;
    while (
      current < last &&
      next.name.toLowerCase() > tempArray[current + 1].name.toLowerCase()
    ) {
      current++;
      tempArray[current - 1] = tempArray[current];
    }
    tempArray[current] = next;
    positionOfNext -= 1;
  }
  allClassesArray = tempArray;
  return;
}

function binarySearch() {
  lower = 0;
  upper = allClassesArray.length - 1;
  foundIt = false;
  requiredName = findClassNameInput.value;

  //This will iterate through the array until it has found the value it is looking for
  do {
    middle = Math.floor((upper + lower) / 2);

    //If the value is not located in the middle, it will split the remaining array into 2 halves and will repeat the same process
    if (
      requiredName.toLowerCase() == allClassesArray[middle].name.toLowerCase()
    ) {
      foundIt = true;
      positionFound = middle + 1;
    } else if (
      requiredName.toLowerCase() < allClassesArray[middle].name.toLowerCase()
    ) {
      upper = middle - 1;
    } else {
      lower = middle + 1;
    }
  } while (!foundIt && lower <= upper);

  //This will display its position back to the user
  if (foundIt) {
    return positionFound - 1;
  } else {
    return false;
    return;
  }
}

//Function TO CHECK THAT NAME ENTERED IS UNIQUE
function checkClassName() {
  isNameUnique = "true";
  if (classNameInput.value === "") {
    isNameUnique = "blank";
  } else {
    for (i = 0; i < allClassesArray.length; i++) {
      if (
        allClassesArray[i].name.toLowerCase() ==
        classNameInput.value.toLowerCase()
      ) {
        isNameUnique = "false";
        break;
      }
    }
  }
  return [isNameUnique, i];
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
function removeLastStudent(table) {
  if (document.getElementById(table).rows.length > 2) {
    document.getElementById(table).deleteRow(-1);
  } else if (document.getElementById(table).rows.length == 2) {
    //Will clear the value in the top cell and make cell white
    for (i = 0; i < 3; i++) {
      document.getElementById(table).rows[1].cells[i].childNodes[0].value = "";
      document.getElementById(table).rows[1].cells[i].style.backgroundColor =
        "white";
    }
  }
}

//PAGE3 - This function will save the list of students that the user entered into an array
function saveClass() {
  //This function will give the entered class a name and check whether it is unique or not
  isNameUniqueArray = checkClassName();
  switch (isNameUniqueArray[0]) {
    case "blank":
      alert("Please enter a name for your class");
      return;
      break;
    case "false":
      if (
        !confirm(
          "A class with this name already exists. Continuing will override this class."
        )
      ) {
        return;
        break;
      } else {
        allClassesArray.splice(isNameUniqueArray[1], 1);
      }
  }

  chosenClassArray = [];
  table = document.getElementById("studentListTable");
  //Iterates through the table and appends value in the cell to an object
  isFilled = checkTableFilled(table);
  if (!isFilled) {
    alert("Please fill all cells will correct values");
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
  }

  //This variable will save the class to an array
  var classObject = {
    name: classNameInput.value,
    class: chosenClassArray
  };
  tempClassStore[0] = classObject;

  //These following functions will initialise the following page
  goToPage(page4);
  createTable("studentListTableDisplayP4");
  disableInputBox();
}

//PAGE3 - Used in the saveClass function to check if all cells are entered
function checkTableFilled(table) {
  checkFilled = true;
  //Loop will iterate through each cell to determined if it filled or not
  for (r = 1; r < table.rows.length; r++) {
    for (c = 0; c < table.rows[r].cells.length; c++) {
      //If the cell is empty, it will be highlighted red for the user to see
      if (table.rows[r].cells[c].childNodes[0].value == "") {
        table.rows[r].cells[c].style.backgroundColor = "red";
        checkFilled = false;
      } else if (
        c == 2 &&
        !Number.isInteger(Number(table.rows[r].cells[c].childNodes[0].value))
      ) {
        //Checks if rank is an integer
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
  //This will clear all existing values in the table
  while (document.getElementById(tableName).rows.length > 1) {
    document.getElementById(tableName).deleteRow(-1);
  }

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
  //DEFINING VARIABLES:
  //Booleans to show which radio button is selected - jQuery
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

    //Hide save button
    document.getElementById("page4SaveBtn").style.display = "none";
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
        //Show save button
        document.getElementById("page4SaveBtn").style.display = "inline";

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
          //Show save button
          document.getElementById("page4SaveBtn").style.display = "inline";
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
        //Show save button
        document.getElementById("page4SaveBtn").style.display = "inline";
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
          numOfGroups -= 1;

          //This will assign to the global variable that equal groups are impossible
          groupDetailsObject.equalGroups = false;

          //Output back to user
          classDivideFeedback.innerHTML =
            "Due to the parameters entered, the class cannot be equally distributed into " +
            (numOfGroups + numOfRemainingGroups) +
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
              numOfGroups +
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
          //Show save button
          document.getElementById("page4SaveBtn").style.display = "inline";
        }
      }
    }
    //GLOBAL VARIABLES FOR CLASSES TO ACCESS IN SORTCLASS FUNCTION
    groupDetailsObject.numGroupsA = numOfGroups;
    groupDetailsObject.numStudentsA = numOfStudents;
    groupDetailsObject.numGroupsB = numOfRemainingGroups;
    groupDetailsObject.numStudentsB = numOfRemainingStudents;
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
  groupedClassArray = [];
  //This switch statement will determine which type of sort will be run
  switch (method) {
    case "sortAlphaLastname":
      sortedArray = alphaSortClass("lastName");
      break;
    case "sortAlphaFirstname":
      sortedArray = alphaSortClass("firstName");
      break;
    case "sortRankMixed":
      sortedArray = rankSortClass("mixed");
      break;
    case "sortRankOrdered":
      sortedArray = rankSortClass("ordered");
      break;
    case "sortRandom":
      sortedArray = randomSortClass();
      break;
  }
  //This section will split the sorted class into the designated groups
  for (i = 0; i < groupDetailsObject.numGroupsB; i++) {
    smallGroupArray = [];
    for (x = 0; x < groupDetailsObject.numStudentsB; x++) {
      smallGroupArray.push(
        sortedArray[x + i * groupDetailsObject.numStudentsB]
      );
    }
    groupedClassArray.push(smallGroupArray);
  }
  for (j = 0; j < groupDetailsObject.numGroupsA; j++) {
    smallGroupArray = [];
    for (x = 0; x < groupDetailsObject.numStudentsA; x++) {
      smallGroupArray.push(
        sortedArray[
          x +
            (i * groupDetailsObject.numStudentsB +
              j * groupDetailsObject.numStudentsA)
        ]
      );
    }
    groupedClassArray.push(smallGroupArray);
  }

  //This section will display the table back to the user
  sortedStudentListTableP5.style.display = "table";
  while (document.getElementById("sortedStudentListTableP5").rows.length > 1) {
    document.getElementById("sortedStudentListTableP5").deleteRow(-1);
  }
  for (i = 0; i < groupedClassArray.length; i++) {
    for (j = 0; j < groupedClassArray[i].length; j++) {
      row = document.getElementById("sortedStudentListTableP5").insertRow(-1);
      cell0 = row.insertCell(0);
      cell1 = row.insertCell(1);
      cell2 = row.insertCell(2);
      cell3 = row.insertCell(3);
      cell0.innerHTML = i + 1;
      cell1.innerHTML = groupedClassArray[i][j].firstName;
      cell2.innerHTML = groupedClassArray[i][j].lastName;
      cell3.innerHTML = groupedClassArray[i][j].rank;
    }
  }
}

//This will use an insertion sort to sort the class alphabetically either by firstname or lastname
function alphaSortClass(name) {
  tempArray = chosenClassArray;
  first = 0;
  last = tempArray.length - 1;
  positionOfNext = last - 1;

  while (positionOfNext >= first) {
    next = tempArray[positionOfNext];
    current = positionOfNext;
    while (
      current < last &&
      next[name].toLowerCase() > tempArray[current + 1][name].toLowerCase()
    ) {
      current++;
      tempArray[current - 1] = tempArray[current];
    }
    tempArray[current] = next;
    positionOfNext -= 1;
  }
  return tempArray;
}

//Function to sort class by each student's rank
function rankSortClass(method) {
  tempArray = chosenClassArray;
  first = 0;
  last = tempArray.length - 1;
  positionOfNext = last - 1;

  //This will sort the array so that the it is in order from highest ranking to lowest ranking
  while (positionOfNext >= first) {
    next = tempArray[positionOfNext];
    current = positionOfNext;
    while (
      current < last &&
      Number(next.rank) > Number(tempArray[current + 1].rank)
    ) {
      current++;
      tempArray[current - 1] = tempArray[current];
    }
    tempArray[current] = next;
    positionOfNext -= 1;
  }
  //This will sort the array so that it will be a mixed class
  if (method == "mixed") {
    halfArrayLength = Math.ceil(tempArray.length / 2);
    endOfTempArray = tempArray.slice(halfArrayLength);
    endOfTempArray.reverse();
    tempArray = tempArray.slice(0, halfArrayLength);

    for (i = 0; i < endOfTempArray.length; i++) {
      tempArray.splice(2 * i + 1, 0, endOfTempArray[i]);
    }
  }

  return tempArray;
}

//Function to randomly group students - uses insertion sort
function randomSortClass() {
  tempArray = chosenClassArray;
  arrRandomNumber = [];

  for (i = 0; i < tempArray.length; i++) {
    arrRandomNumber.push(Math.random());
  }
  first = 0;
  last = tempArray.length - 1;
  positionOfNext = last - 1;

  while (positionOfNext >= first) {
    next = arrRandomNumber[positionOfNext];
    storedValue = tempArray[positionOfNext];
    current = positionOfNext;
    while (current < last && next > arrRandomNumber[current + 1]) {
      current++;
      arrRandomNumber[current - 1] = arrRandomNumber[current];
      tempArray[current - 1] = tempArray[current];
    }
    arrRandomNumber[current] = next;
    tempArray[current] = storedValue;
    positionOfNext -= 1;
  }
  return tempArray;
}

//Will save class and go back to beginning
function saveSession() {
  allClassesArray.push(tempClassStore[0]);
  localStorage.setItem("allClassesArray", JSON.stringify(allClassesArray))

  //This will clear all existing values in the table
  while (document.getElementById("studentListTable").rows.length > 2) {
    document.getElementById("studentListTable").deleteRow(-1);
  }
  for (i = 0; i < 3; i++) {
    document.getElementById("studentListTable").rows[1].cells[
      i
    ].childNodes[0].value =
      "";
  }
  document.getElementById("classNameInput").value = "";

  goToPage(page2);
}
