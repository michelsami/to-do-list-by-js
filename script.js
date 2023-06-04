
// global variables
//=================

let taskNameInput = document.getElementById("add-task");
let taskPriorityInput = document.getElementById("select-priority");
let taskDescription = document.getElementById("taskDescription");
let priorityButton = document.getElementById("priority-button");

let addButton = document.getElementById("add-task-button");
let tableOfAllData = document.getElementById("body-table");
let taskId;
let editMode = false;


// functions 
//----------

// generate unique task id function
const generateTaskID = () => {
	taskId = JSON.parse(localStorage.getItem('taskId'));
	if(taskId == null){
		localStorage.setItem('taskId', JSON.stringify(0));
 		taskId = JSON.parse(localStorage.getItem('taskId'));
	}
}

// get data from local storage
const getDataFromLocalStorage =  ()=>{
	let allDataFromLocalStorage = JSON.parse(localStorage.getItem('allTasks'));
	let emptyArray = [];
	if(allDataFromLocalStorage != null){
		return allDataFromLocalStorage;
	}else {
		return emptyArray;
	}
}

// display data on screen
const getDataFromLocalstorageAndDisplayOnScreen = () => {
	// remove all items from the current table 
	tableEmpty()

	let dataFromLocalStorage = getDataFromLocalStorage();
	for (let i = 0; i < dataFromLocalStorage.length; i++) {
		createNewRowInTheTable(dataFromLocalStorage[i].taskId, dataFromLocalStorage[i].taskName, dataFromLocalStorage[i].taskDescription, dataFromLocalStorage[i].taskPriority)
	}

}

//add New Task To Local Storage Array
const addNewTaskToLocalStorageArray = (newTask, taskId)=>{
	// add new task to array
	let dataFromLocalStorage = getDataFromLocalStorage();
	dataFromLocalStorage.push(newTask);

	// send data to local storage 
	localStorage.setItem('allTasks', JSON.stringify(dataFromLocalStorage));
	localStorage.setItem('taskId', JSON.stringify(taskId));
}

// add new task
const addDataFunction = ()=> {

	// value variables 
	let taskNameInputValue = taskNameInput.value;
	let taskPriorityInputValue = taskPriorityInput.value;
	let taskDescriptionValue = taskDescription.value;

	// new id
	taskId++;

	// insert data to the new row 
	createNewRowInTheTable(taskId, taskNameInputValue,  taskDescriptionValue,taskPriorityInputValue);

	// add data to array
	let newTask = {
		taskId: taskId,
		taskName : taskNameInputValue,
		taskDescription: taskDescriptionValue,
		taskPriority : taskPriorityInputValue
	} 

	//add New Task To Local Storage Array
	addNewTaskToLocalStorageArray(newTask, taskId);

}

// add new Row to table
const createNewRowInTheTable = (taskIdToAdd, taskName, taskDescription, taskPriority)=>{

	let row = tableOfAllData.insertRow(-1); // We are adding at the end
	row.classList.add("table-secondary"); // table grey bootstrap class

	// add buttons
    let buttonEditToAdd = document.createElement("button");
    let buttondeleteToAdd = document.createElement("button");
   


      // Create table cells
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
   
      // Add data to cell1, cell1 and cell3
      cell1.innerText = taskIdToAdd;
      cell2.innerText = taskName
      cell3.innerText = taskDescription
      cell4.innerText = taskPriority

	  // create edit and delete buttons
	buttonEditToAdd.innerHTML = "Edit";
	buttonEditToAdd.className = "editButton btn btn-primary";
	cell5.appendChild(buttonEditToAdd);

	buttondeleteToAdd.innerHTML = "Delete";
	buttondeleteToAdd.className = "deleteButton btn btn-danger";
	cell6.appendChild(buttondeleteToAdd);

	
	 

}

// create save button 
const createSaveButton = (e)=> {
	let saveButton = document.createElement('button');
	saveButton.innerHTML = "Save";
	saveButton.className = "saveButton";
	e.target.parentElement.parentElement.children[4].appendChild(saveButton);
	
}

// edit Row
const editRow  = (e)=>{

	if(e.target.className.includes("editButton")){


		if(editMode == false){
			
		editMode = true;
		// create the task name input and the priority // and the new save button
		let newInput = document.createElement('input');
		let newPriority = document.createElement('select');
		let newDescription = document.createElement('textarea');

		

		// create priority options
		for (var i = 1; i<= 3; i++){
			let optionText = document.createElement('option');
			
		optionText.value = i;
		optionText.innerHTML = i;
		newPriority.appendChild(optionText);
		}


	
		createSaveButton(e);

		// save the old task name and old priority
		let actualTaskName = e.target.parentElement.parentElement.children[1].innerHTML;
		let actualTaskPriority = e.target.parentElement.parentElement.children[3].innerHTML;
		let actualTaskDescription= e.target.parentElement.parentElement.children[2].innerHTML;

		// assign the old task name and priority as input value
		newInput.value = actualTaskName;
		newPriority.value = actualTaskPriority;
		newDescription.value = actualTaskDescription;

		// empty the old task name text  and priority 
		e.target.parentElement.parentElement.children[1].innerHTML = "";
		e.target.parentElement.parentElement.children[2].innerHTML = "";
		//console.log(`here: ${e.target.parentElement.parentElement.children[3].innerHTML}`)
		e.target.parentElement.parentElement.children[3].value = actualTaskPriority;
		e.target.parentElement.parentElement.children[3].innerHTML = "";
		

		// add the input task name and priority // create new save button
		e.target.parentElement.parentElement.children[1].appendChild(newInput);
		e.target.parentElement.parentElement.children[2].appendChild(newDescription);
		e.target.parentElement.parentElement.children[3].appendChild(newPriority);
		




		}






	}	
}

// delete Row
const deleteRow = (e)=>{
	if(e.target.className.includes("deleteButton")){
		let idOfTask = parseInt(e.target.parentElement.parentElement.firstChild.innerHTML);

		let dataFromLocalStorage = getDataFromLocalStorage();
		
		
	for (let i = 0; i < dataFromLocalStorage.length; i++) {
		if(dataFromLocalStorage[i].taskId === idOfTask){
			 dataFromLocalStorage.splice(i, 1)
			
		}
		
	}

	// send the new array after delete to be stored in local storage
	localStorage.setItem('allTasks', JSON.stringify(dataFromLocalStorage));

	// remove all items from the current table 
	tableEmpty()


	// get the updated array from local storage
	getDataFromLocalstorageAndDisplayOnScreen();

	}

	
}

// remove all table rows 
const tableEmpty = ()=>{
	function removeAllChildNodes(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	}
	const container = document.querySelector('#body-table');
	removeAllChildNodes(container);
}

// save edits
const saveAmendments = (e)=>{



	
	if(e.target.className.includes("saveButton")){

		let idOfTaskToSave = parseInt(e.target.parentElement.parentElement.firstChild.innerHTML);



		let dataFromLocalStorage = getDataFromLocalStorage();

		objIndex = dataFromLocalStorage.findIndex((obj => obj.taskId == idOfTaskToSave));


		// save the new value to the value
		dataFromLocalStorage[objIndex].taskName = e.target.parentElement.parentElement.children[1].children[0].value;
		dataFromLocalStorage[objIndex].taskDescription = e.target.parentElement.parentElement.children[2].children[0].value;
		dataFromLocalStorage[objIndex].taskPriority = e.target.parentElement.parentElement.children[3].children[0].value;


		console.log(dataFromLocalStorage[objIndex].taskName)

		// send data to localStorage
		localStorage.setItem('allTasks', JSON.stringify(dataFromLocalStorage));


		editMode == false

		// refresh page
		location.reload();





	}

	
}

// sort by priority
const findHighestPriorityTask = ()=>{
	let allTasks = JSON.parse(localStorage.getItem('allTasks'));
	let sortedProducts = allTasks.sort(
		(p1, p2) => (p1.taskPriority > p2.taskPriority) ? 1 : (p1.taskPriority < p2.taskPriority) ? -1 : 0);
		
		tableEmpty()

	let dataFromLocalStorage = sortedProducts	;
	for (let i = 0; i < dataFromLocalStorage.length; i++) {
		createNewRowInTheTable(dataFromLocalStorage[i].taskId, dataFromLocalStorage[i].taskName, dataFromLocalStorage[i].taskDescription, dataFromLocalStorage[i].taskPriority)
	}
}




//  functions excusion stack
//--------------------------

// generate unique task id
generateTaskID();

// display data on screen
getDataFromLocalstorageAndDisplayOnScreen();



// event listeners
// ---------------

// add button
addButton.addEventListener("click", addDataFunction)

// edit row
document.addEventListener("click", editRow);

// save edits
document.addEventListener("click", saveAmendments);

// delete row
document.addEventListener("click", deleteRow);

// sort by priority
priorityButton.addEventListener("click", findHighestPriorityTask);















