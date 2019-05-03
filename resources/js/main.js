var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
	todo: [],
	completed: []
};

function listname() {
	var list_name = prompt("Please enter name for the ToDo list", "My ToDo");
	var todoname = document.getElementById('ListName');
	todoname.onclick = function (e) {
		this.contentEditable = true;
		this.focus();
	}
	todoname.onmouseout = function () {
		this.style.border = '';
		this.contentEditable = false;
	}
	if (list_name != null) {
		document.getElementById("ListName").innerHTML =
			"" + list_name + "";
	} else {
		document.getElementById("ListName").innerHTML =
			"My To Do List";
	}
}


// Edit, Remove and complete icons in SVG format
var editSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 26 22" style="enable-background:new 0 0 26 22;" xml:space="preserve"><rect class="noFill" width="26" height="22"/><g><path class="fill" d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z "/></g></svg>';
var removeSVG = '<svg class="svg-icon" viewBox="0 0 20 20"><path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderTodoList();


// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function () {
	var value = document.getElementById('item').value;
	if (value) {
		addItem(value);
	}
});

document.getElementById('item').addEventListener('keydown', function (e) {
	var value = this.value;
	if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
		addItem(value);
	}
});

function addItem(value) {
	addItemToDOM(value);
	document.getElementById('item').value = '';

	data.todo.push(value);
	dataObjectUpdated();
}

function renderTodoList() {
	if (!data.todo.length && !data.completed.length) return;

	for (var i = 0; i < data.todo.length; i++) {
		var value = data.todo[i];
		addItemToDOM(value);
	}

	for (var j = 0; j < data.completed.length; j++) {
		var value = data.completed[j];
		addItemToDOM(value, true);
	}
}

function dataObjectUpdated() {
	localStorage.setItem('todoList', JSON.stringify(data));
	console.log(localStorage.length);
}

function editItem() {
	var item = document.getElementById('todo');
	item.onclick = function (e) {
		this.contentEditable = true;
		this.focus();
	}
	item.onmouseout = function () {
		this.style.border = '';
		this.contentEditable = false;
	}
}

function removeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
	}
	dataObjectUpdated();

	parent.removeChild(item);
}

function completeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
		data.todo.push(value);
	}
	dataObjectUpdated();

	// Check if the item should be added to the completed list or to re-added to the todo list
	var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
	var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');
	var item = document.createElement('li');
	item.innerText = text;
	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeSVG;
	remove.addEventListener('click', removeItem);


	var edit = document.createElement('button');
	edit.classList.add('edit');
	edit.innerHTML = editSVG;
	edit.addEventListener('click', editItem);

	// Add click event for removing the item

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeSVG;
	complete.addEventListener('click', completeItem);

	// clear all items from the local storage
	function clearStorage() {
		localStorage.clear();
		var mynode = document.querySelectorAll('#todo, #completed');
		for (var i = 0; i < mynode.length; i++) {
			while (mynode[i].firstChild) {
				mynode[i].removeChild(mynode[i].firstChild);
			}
		}
	}	var clearBtn = document.getElementById("clearAll");
	clearBtn.onclick = clearStorage;

	// Add click event for completing the item
	buttons.appendChild(edit);
	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);

	list.insertBefore(item, list.childNodes[0]);
}


function cd() {
	window.localStorage.clear();
}