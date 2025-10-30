class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: #01823E;
                    z-index: 1000;
                    padding: 1rem 2rem;
                }
                .nav-container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #01823E;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .nav-links.active {
                    display: flex;
                }
                .nav-links a {
                    font-family: 'Syne Mono', monospace;
                    color: black;
                    text-decoration: none;
                    padding: 0.75rem 1rem;
                    transition: color 0.3s ease;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .nav-links a:last-child {
                    border-bottom: none;
                }
                .nav-links a:hover {
                    color: white;
                    background: rgba(0, 0, 0, 0.1);
                }
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    color: black;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                @media (min-width: 768px) {
                    .nav-links {
                        display: flex;
                        position: static;
                        flex-direction: row;
                        padding: 0;
                        box-shadow: none;
                        background: transparent;
                    }
                    .nav-links a {
                        margin-left: 2rem;
                        padding: 0.5rem 0;
                        border-bottom: none;
                        text-align: left;
                    }
                    .nav-links a:hover {
                        background: transparent;
                        color: #01823E;
                    }
                    .mobile-menu-btn {
                        display: none;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <div class="nav-links">
                        <a href="index.html#home">HOME</a>
                        <a href="index.html#about">ABOUT</a>
                        <a href="index.html#work">MY WORK</a>
                        <a href="index.html#contact">CONTACT</a>
                    </div>
                    <button class="mobile-menu-btn">
                        <i data-feather="menu"></i>
                    </button>
                </div>
            </nav>
        `;
        this.addSmoothScrolling();
        this.addMobileMenu();
    }
    addSmoothScrolling() {
        const links = this.shadowRoot.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = 0;
                    const elementPosition = targetElement.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    addMobileMenu() {
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const navLinks = this.shadowRoot.querySelector('.nav-links');
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            const links = this.shadowRoot.querySelectorAll('.nav-links a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        }
    }
}
customElements.define('custom-navbar', CustomNavbar);