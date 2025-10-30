document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
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
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
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
    const scrollSections = document.querySelectorAll('.scroll-section');
    scrollSections.forEach(section => {
        observer.observe(section);
    });
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    // Panel pinning
    let isPinned = false;
    let pinnedPanel = null;
    let originalPanelOrder = [];
    window.pinPanel = function(panel, panelId) {
        if (isPinned) {
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
            const closeButton = panel.querySelector('.expanded-close-btn');
            if (closeButton) {
                closeButton.style.display = 'flex';
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
        allPanels.forEach(p => {
            const closeButton = p.querySelector('.expanded-close-btn');
            if (closeButton) {
                closeButton.style.display = 'none';
            }
        });
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
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isPinned) {
            unpinPanel(event);
        }
    });
});
