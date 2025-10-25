// Wait for DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor links (links starting with #)
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each navigation link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = 80;
                let elementPosition = targetElement.offsetTop - navbarHeight;
                
                if (targetId === '#about') {
                    elementPosition = targetElement.offsetTop - 0;
                }
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Configuration for the Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create Intersection Observer to watch for scroll events
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.remove('fade-out');
            } else {
                entry.target.classList.add('fade-out');
                entry.target.classList.remove('fade-in');
            }
        });
    }, observerOptions);
    
    // Get all sections with scroll animations and start observing them
    const scrollSections = document.querySelectorAll('.scroll-section');
    scrollSections.forEach(section => {
        observer.observe(section);
    });
    
    // Initialize Feather icons if library is loaded
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Panel pinning functionality
    let isPinned = false;
    let pinnedPanel = null;
    let originalPanelOrder = [];
    
    // Make functions globally available
    window.pinPanel = function(panel, panelId) {
        if (isPinned) {
            if (pinnedPanel === panel) {
                unpinPanel({ stopPropagation: () => {} });
            }
            return;
        }
        
        isPinned = true;
        pinnedPanel = panel;
        
        const grid = document.getElementById('projectGrid');
        const allPanels = grid.querySelectorAll('.project-card');
        
        originalPanelOrder = Array.from(allPanels);
        
        grid.classList.add('pinned');
        panel.classList.add('pinned', 'expanded');
        
        const otherPanelsContainer = document.createElement('div');
        otherPanelsContainer.className = 'other-panels-container';
        
        allPanels.forEach(p => {
            if (p !== panel) {
                p.classList.add('other-panels');
                otherPanelsContainer.appendChild(p);
            }
        });
        
        grid.appendChild(otherPanelsContainer);
        
        setTimeout(() => {
            const expandedContent = panel.querySelector('.expanded-content');
            if (expandedContent) {
                expandedContent.classList.add('show');
            }
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 300);
    };
    
    window.unpinPanel = function(event) {
        event.stopPropagation();
        
        if (!isPinned) return;
        
        const grid = document.getElementById('projectGrid');
        const allPanels = grid.querySelectorAll('.project-card');
        
        const expandedContent = pinnedPanel.querySelector('.expanded-content');
        if (expandedContent) {
            expandedContent.classList.remove('show');
        }
        
        setTimeout(() => {
            grid.classList.remove('pinned');
            pinnedPanel.classList.remove('pinned', 'expanded');
            
            const otherPanelsContainer = grid.querySelector('.other-panels-container');
            if (otherPanelsContainer) {
                const otherPanels = otherPanelsContainer.querySelectorAll('.project-card');
                otherPanels.forEach(p => {
                    p.classList.remove('other-panels');
                });
                otherPanelsContainer.remove();
            }
            
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
