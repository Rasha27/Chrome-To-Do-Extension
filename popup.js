// JavaScript code for the to-do list functionality
// Example: Handling tasks in Chrome storage


// Function to add a task

// Function to add a task with an optional deadline
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim(); // Trim any leading/trailing whitespace
    const deadlineInput = document.getElementById('deadlineInput').value;
  
    if (taskValue !== '') {
      chrome.storage.sync.get({ tasks: [] }, function(data) {
        const tasks = data.tasks;
        const newTask = { task: taskValue, completed: false };
  
        // Check if the deadline input is not empty before adding it to the task object
        if (deadlineInput !== '') {
          newTask.deadline = deadlineInput;
        }
  
        tasks.push(newTask);
        chrome.storage.sync.set({ tasks: tasks }, function() {
          fetchTasks(); // Refresh tasks after adding a new one
          taskInput.value = ''; // Clear the task input field after adding task
          document.getElementById('deadlineInput').value = ''; // Clear the deadline input field after adding task
        });
      });
    }
  }
  
  // ... (existing code)
  
  
  // ... (remaining code remains the same)
  
  // Function to fetch and display tasks
  function fetchTasks() {
    chrome.storage.sync.get({ tasks: [] }, function(data) {
      const taskList = document.getElementById('taskList');
      const completedList = document.getElementById('completedList');
      taskList.innerHTML = '';
      completedList.innerHTML = '';
  
      data.tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
          data.tasks[index].completed = this.checked;
          chrome.storage.sync.set({ tasks: data.tasks }, function() {
            fetchTasks();// Refresh tasks after marking as completed
          });
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(task.task));
  
        if (task.deadline) {
            const deadlineText = document.createElement('span');
            deadlineText.textContent = ' (Deadline: ' + task.deadline + ')';
            listItem.appendChild(deadlineText);
          }
        
        if (task.completed) {
        completedList.appendChild(listItem);
        } else {
        taskList.appendChild(listItem);
        }
        
      });
    });
  }
  
  // Event listener for the Add button
  document.getElementById('addTaskButton').addEventListener('click', addTask);
  
  // Fetch tasks when the popup loads
  document.addEventListener('DOMContentLoaded', fetchTasks);
  