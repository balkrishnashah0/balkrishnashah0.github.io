document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const projectsPerPage = 3; // Number of projects per page (set to 3)

    // Dynamically update copyright year
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Scroll-to-Top Button Functionality
    window.onscroll = function () {
        var scrollUpButton = document.getElementById("scrollUp");
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollUpButton.style.display = "block"; // Show button
        } else {
            scrollUpButton.style.display = "none"; // Hide button
        }
    };
    document.getElementById("scrollUp").addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Smooth Scrolling for Navbar Links
    document.querySelectorAll(".nav-link, .btn[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId.startsWith("#")) return;
    
            event.preventDefault();
            const targetElement = document.getElementById(targetId.substring(1));
    
            if (targetElement) {
                window.scrollTo({ 
                    top: targetElement.getBoundingClientRect().top + window.scrollY - 60, 
                    behavior: "smooth" 
                });
            }
        });
    });

    // Fetch and Display Projects from JSON with Pagination
    async function fetchProjectsData(filterValue = "all") {
        try {
            const response = await fetch('assets/projects/projects.json'); // Replace with actual path to JSON file
            const projects = await response.json();

            // Filter the projects based on the selected category
            const filteredProjects = filterValue === "all" ? projects : projects.filter(project => project.category === filterValue);

            // Get the projects for the current page
            const startIndex = (currentPage - 1) * projectsPerPage;
            const endIndex = startIndex + projectsPerPage;
            const projectsToDisplay = filteredProjects.slice(startIndex, endIndex);

            displayProjects(projectsToDisplay);

            // Update pagination buttons visibility
            updatePaginationButtons(filteredProjects.length);
        } catch (error) {
            console.error('Error loading the projects data:', error);
        }
    }

    // Function to display projects
    function displayProjects(projects) {
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = ''; // Clear existing projects (if any)
        
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('col-lg-4', 'col-md-6', 'project-item', project.category); // Add category class for filtering

            projectDiv.innerHTML = `
                <div class="project-card">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <h4 class="project-title">${project.title}</h4>
                    <p class="project-description">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                </div>
            `;

            projectContainer.appendChild(projectDiv);
        });

        // Smooth transition effect
        projectContainer.classList.add('fade-in');
        setTimeout(() => projectContainer.classList.remove('fade-in'), 500);
    }

    // Function to update pagination buttons visibility
    function updatePaginationButtons(totalProjects) {
        const totalPages = Math.ceil(totalProjects / projectsPerPage);
        
        const prevButton = document.getElementById("prev-proj");
        const nextButton = document.getElementById("next-proj");

        // Disable prev button if on first page
        prevButton.disabled = currentPage === 1;
        // Disable next button if on last page
        nextButton.disabled = currentPage === totalPages;
    }

    // Project Filtering functionality
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".filter-btn.active").classList.remove("active");
            this.classList.add("active");

            let filterValue = this.getAttribute("data-filter");

            // Reset current page when a new filter is selected
            currentPage = 1;

            // Fetch projects based on the selected filter
            fetchProjectsData(filterValue);
        });
    });

    // Handle pagination buttons
    document.getElementById("prev-proj").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            fetchProjectsData();
        }
    });

    document.getElementById("next-proj").addEventListener("click", function () {
        currentPage++;
        fetchProjectsData();
    });

    // Initial load of all projects
    fetchProjectsData();
});
