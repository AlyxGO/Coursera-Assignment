function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    // Toggle the active class on the hamburger icon
    hamburger.classList.toggle('active');
    
    // Toggle the active class on the nav element
    nav.classList.toggle('active');
}

// Close menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav');
        
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close menus on mobile devices
        const nav = document.querySelector('nav');
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
        
        // Retrieve the target element
        const target = document.querySelector(this.getAttribute('href'));
        
        // Calculate the scroll position, taking into account the height of the fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Smoothly scroll to the target position
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Tech stack tag filtering
// Retrieve all available tech stack tags
function getAllTechTags() {
    const techStacks = document.querySelectorAll('.tech-stack');
    const tags = new Set();
    
    techStacks.forEach(stack => {
        stack.querySelectorAll('span').forEach(tag => {
            tags.add(tag.textContent.trim());
        });
    });
    
    return Array.from(tags);
}

// Update filter tags
function updateActiveFilters() {
    const activeFilters = document.getElementById('activeFilters');
    activeFilters.innerHTML = '';
    
    currentFilters.forEach(filter => {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.textContent = filter;
        tag.onclick = () => removeFilter(filter);
        activeFilters.appendChild(tag);
    });
}

// +-Tags
function addFilter(tech) {
    if (!currentFilters.includes(tech)) {
        currentFilters.push(tech);
        updateActiveFilters();
        filterProjects();
    }
}

function removeFilter(tech) {
    currentFilters = currentFilters.filter(filter => filter !== tech);
    updateActiveFilters();
    filterProjects();
}

// filter projects
function filterProjects() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        const techTags = Array.from(project.querySelectorAll('.tech-stack span'))
            .map(tag => tag.textContent.trim());
        
        if (currentFilters.length === 0 || 
            currentFilters.every(filter => techTags.includes(filter))) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });
}

// initialize
let currentFilters = [];
const filterInput = document.getElementById('techFilter');
const allTags = getAllTechTags();

// Filter input event processing
filterInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    const matchingTags = allTags.filter(tag => 
        tag.toLowerCase().includes(value)
    );

    if (matchingTags.length === 1 && matchingTags[0].toLowerCase() === value) {
        addFilter(matchingTags[0]);
        e.target.value = '';
    }
});

// Add click events to filter tags
document.querySelectorAll('.tech-stack span').forEach(tag => {
    tag.addEventListener('click', () => {
        addFilter(tag.textContent.trim());
    });
});

filterProjects();

// Lightbox
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve all project images
    const projectImages = document.querySelectorAll('.project img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    // Add a click event to each image
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            
            // Retrieve image title
            const figcaption = this.nextElementSibling;
            lightboxCaption.textContent = figcaption.textContent;
        });
    });

    // Close button click event
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    // Click outside the lightbox to close it
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Escape key to close the lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
        }
    });
});