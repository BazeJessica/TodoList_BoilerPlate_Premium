//state management
let tasks = [];
let currentFilter = "all"; //(all, active, completed)
let currentSort = "asc"; // asc (oldest first) , desc (newest first)

//DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");
const filterBtns = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sortSelect");

const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
 document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
};

const toggleTheme = () =>{
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

const updateThemeIcon = (theme) => {
  const icon = themeToggle.querySelector('i');
  if(theme === 'dark'){
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  };
}

const apiCall = async (url, options = {}) => {
try{
  const response = await fetch(url, options);
  if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json(); 
}catch(error){
  console.error("API call failed:", error);
  alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  return null;
 }
};

//fetching initial tasks
const fetchTasks = async ()=>{
  loader.style.display = 'block';
  const data = await apiCall('/tasks');
  if(data){
    tasks = data;
    renderTasks();
  }
  loader.style.display = 'none';
}


//adding Tasks

const addTask = async () => {
  const taskName = taskInput.value.trim();
  if(!taskName) return;

    const data = await apiCall('/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: taskName}),
    });
    if(data){
      tasks.push(data);
      renderTasks();
      taskInput.value = "";
    }
}

// Toggle Task Complete
const toggleTask = async (id, currentStatus) => {
  const data = await apiCall(`/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !currentStatus })
  });

  if (data) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = data;
      renderTasks();
    }
  }
};


// Delete Task
const deleteTask = async (id) => {
  // Add an exit animation to the specific row before calling DB (optional polish UX element)
  const li = document.querySelector(`li[data-id="${id}"]`);
  if (li) li.style.animation = 'fadeOut 0.3s ease-out forwards';

  const data = await apiCall(`/tasks/${id}`, { method: 'DELETE' });
  if (data) {
    tasks = tasks.filter(t => t.id !== id);
    setTimeout(() => renderTasks(), 300); // Wait for animation
  }
};
