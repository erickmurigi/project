// Define project data structure
let projects = [];

// Function to render the project list
function renderProjectList() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
  
    if (projects.length === 0) {
      projectList.innerHTML = ''; // Provide feedback to the user
      console.log('No projects found.');
    } else {
      const ul = document.createElement('ul');
      projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.addEventListener('click', () => viewProject(project.id));
        ul.appendChild(li);
      });
      projectList.appendChild(ul);
    }
  }

// Function to view a project
function viewProject(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (project) {
    const viewProjectSection = document.getElementById('viewProject');
    const projectDetails = document.getElementById('projectDetails');
    projectDetails.innerHTML = `<h2 id="project-${project.id}">${project.name}</h2>`;
    viewProjectSection.classList.remove('hidden');
  }
}

// Function to create a project
function createProject(event) {
    event.preventDefault();
    const projectName = document.getElementById('projectName').value;
    if (projectName.trim() === '') { // Form validation
      alert('Please enter a project name.');
      return;
    }
    const newProject = {
      id: Date.now(),
      name: projectName
    };
    projects.push(newProject);
    renderProjectList();
    document.getElementById('createProjectForm').classList.add('hidden');
    document.getElementById('projectName').value = '';
    alert('Project created successfully.'); // Provide feedback to the user
  }

// Function to delete a project
function deleteProject() {
    const viewProjectSection = document.getElementById('viewProject');
    const projectDetails = document.getElementById('projectDetails');
    const projectId = parseInt(projectDetails.firstChild.id.split('-')[1]);
    projects = projects.filter(p => p.id !== projectId);
    renderProjectList();
    viewProjectSection.classList.add('hidden');
    alert('Project deleted successfully.'); // Provide feedback to the user
  }

// Event listeners
document.getElementById('viewAllProjects').addEventListener('click', () => {
  renderProjectList();
});

document.getElementById('createProject').addEventListener('click', () => {
  document.getElementById('createProjectForm').classList.remove('hidden');
});

document.getElementById('createProjectForm').addEventListener('submit', createProject);

document.getElementById('deleteProject').addEventListener('click', deleteProject);