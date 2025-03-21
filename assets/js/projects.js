// document.addEventListener("DOMContentLoaded", function () {
//     // Function to fetch the external JSON file
//     async function fetchProjectsData() {
//         try {
//             const response = await fetch('assets/projects/projects.json'); // Replace with actual path to JSON file
//             const projects = await response.json();
//             displayProjects(projects);
//         } catch (error) {
//             console.error('Error loading the projects data:', error);
//         }
//     }

//     // Function to display projects
//     function displayProjects(projects) {
//         const projectContainer = document.querySelector('.project-container');
//         projectContainer.innerHTML = ''; // Clear existing projects (if any)
        
//         projects.forEach(project => {
//             const projectDiv = document.createElement('div');
//             projectDiv.classList.add('col-lg-4', 'col-md-6', 'project-item', project.category); // Add category class for filtering

//             projectDiv.innerHTML = `
//                 <div class="project-card">
//                     <img src="${project.image}" alt="${project.title}" class="project-image">
//                     <h4 class="project-title">${project.title}</h4>
//                     <p class="project-description">${project.description}</p>
//                     <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
//                 </div>
//             `;

//             projectContainer.appendChild(projectDiv);
//         });
//     }

//     // Initial load of projects from external JSON
//     fetchProjectsData();

//     // Project Filtering functionality
//     document.querySelectorAll(".filter-btn").forEach(button => {
//         button.addEventListener("click", function () {
//             document.querySelector(".filter-btn.active").classList.remove("active");
//             this.classList.add("active");

//             let filterValue = this.getAttribute("data-filter");
//             fetchProjectsData(filterValue);
//         });
//     });
// });