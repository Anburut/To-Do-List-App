// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const tasks = getTasks();
  tasks.forEach(task => renderTask(task));
});

// Add task on button click or Enter key
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = { text: taskText, completed: false };
  renderTask(task);
  saveTask(task);
  taskInput.value = '';
}

// Render task to DOM
function renderTask(task) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (task.completed) li.classList.add('completed');
  
  li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Toggle completion on click
  li.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      task.completed = !task.completed;
      li.classList.toggle('completed');
      updateTasks();
    }
  });

  // Delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    updateTasks();
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update tasks in localStorage
function updateTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    tasks.push({
      text: item.querySelector('span').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}