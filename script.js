/* ========================================== */
/* MAIN JAVASCRIPT FUNCTIONALITY */
/* ========================================== */

// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================== */
    /* SMOOTH SCROLLING FOR NAVIGATION LINKS */
    /* ========================================== */
    
    // Get all anchor links (links starting with #)
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each navigation link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Get the target section ID from the link
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = 80; // Approximate height of the fixed navbar
                let elementPosition = targetElement.offsetTop - navbarHeight; // Account for navbar
                
                // Special handling for About section to show more content
                if (targetId === '#about') {
                    elementPosition = targetElement.offsetTop - 0; // Show more of the About section
                }
                
                // Smooth scroll to the target section
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth' // Enable smooth scrolling animation
                });
            }
        });
    });
    
    /* ========================================== */
    /* SCROLL ANIMATION SYSTEM */
    /* ========================================== */
    
    // Configuration for the Intersection Observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger 50px before element exits viewport
    };
    
    // Create Intersection Observer to watch for scroll events
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is entering viewport - add fade-in effect
                entry.target.classList.add('fade-in');
                entry.target.classList.remove('fade-out');
            } else {
                // Element is exiting viewport - add fade-out effect
                entry.target.classList.add('fade-out');
                entry.target.classList.remove('fade-in');
            }
        });
    }, observerOptions);
    
    // Get all sections with scroll animations and start observing them
    const scrollSections = document.querySelectorAll('.scroll-section');
    scrollSections.forEach(section => {
        observer.observe(section); // Start watching each section for scroll events
    });
    
    /* ========================================== */
    /* ICON INITIALIZATION */
    /* ========================================== */
    
    // Initialize Feather icons (social media icons) if library is loaded
    if (typeof feather !== 'undefined') {
        feather.replace(); // Replace all feather icon placeholders with actual icons
    }
    
    /* ========================================== */
    /* PROJECT PANEL FUNCTIONALITY */
    /* ========================================== */
    
    // Panel pinning functionality
    let isPinned = false;
    let pinnedPanel = null;
    let originalPanelOrder = [];
    
    // Make functions globally available
    window.pinPanel = function(panel, panelId) {
        if (isPinned) {
            // If clicking the same panel, unpin it
            if (pinnedPanel === panel) {
                unpinPanel({ stopPropagation: () => {} });
            }
            return; // Prevent multiple pins
        }
        
        isPinned = true;
        pinnedPanel = panel;
        
        const grid = document.getElementById('projectGrid');
        const allPanels = grid.querySelectorAll('.project-card');
        
        // Store original order of panels
        originalPanelOrder = Array.from(allPanels);
        
        // Add pinned class to grid
        grid.classList.add('pinned');
        
        // Add pinned class to clicked panel
        panel.classList.add('pinned', 'expanded');
        
        // Create container for other panels and move them down
        const otherPanelsContainer = document.createElement('div');
        otherPanelsContainer.className = 'other-panels-container';
        
        // Add other panels to container first
        allPanels.forEach(p => {
            if (p !== panel) {
                p.classList.add('other-panels');
                otherPanelsContainer.appendChild(p);
            }
        });
        
        // Add container to grid
        grid.appendChild(otherPanelsContainer);
        
        // Show expanded content after animation
        setTimeout(() => {
            const expandedContent = panel.querySelector('.expanded-content');
            if (expandedContent) {
                expandedContent.classList.add('show');
            }
            if (typeof feather !== 'undefined') {
                feather.replace(); // Re-initialize icons
            }
        }, 300);
    };
    
    window.unpinPanel = function(event) {
        event.stopPropagation();
        
        if (!isPinned) return;
        
        const grid = document.getElementById('projectGrid');
        const allPanels = grid.querySelectorAll('.project-card');
        
        // Hide expanded content first
        const expandedContent = pinnedPanel.querySelector('.expanded-content');
        if (expandedContent) {
            expandedContent.classList.remove('show');
        }
        
        // Remove classes after animation
        setTimeout(() => {
            grid.classList.remove('pinned');
            pinnedPanel.classList.remove('pinned', 'expanded');
            
            // Remove the container and restore panels to grid in original order
            const otherPanelsContainer = grid.querySelector('.other-panels-container');
            if (otherPanelsContainer) {
                const otherPanels = otherPanelsContainer.querySelectorAll('.project-card');
                otherPanels.forEach(p => {
                    p.classList.remove('other-panels');
                });
                otherPanelsContainer.remove();
            }
            
            // Restore panels in their original order
            originalPanelOrder.forEach(panel => {
                grid.appendChild(panel);
            });
            
            isPinned = false;
            pinnedPanel = null;
        }, 200);
    };
    
    // Close with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isPinned) {
            unpinPanel(event);
        }
    });
});
