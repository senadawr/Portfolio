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
          }
          .nav-links a {
            font-family: 'Gotham', sans-serif;
            color: black;
            text-decoration: none;
            margin-left: 2rem;
            transition: color 0.3s ease;
            cursor: pointer;
          }
          .nav-links a:hover {
            color: #01823E;
          }
          .mobile-menu-btn {
            display: block;
            background: none;
            border: none;
            color: black;
  font-size: 1.5rem;
          }
          @media (min-width: 768px) {
            .nav-links {
              display: flex;
            }
            .mobile-menu-btn {
              display: none;
            }
          }
        </style>
        <nav>
          <div class="nav-container">
            <div class="nav-links">
              <a href="#home">HOME</a>
              <a href="#about">ABOUT</a>
              <a href="#work">MY WORK</a>
              <a href="#contact">CONTACT</a>
            </div>
  <button class="mobile-menu-btn">
              <i data-feather="menu"></i>
            </button>
          </div>
        </nav>
      `;
      
      // Add smooth scrolling functionality
      this.addSmoothScrolling();
    }
    
    addSmoothScrolling() {
      const links = this.shadowRoot.querySelectorAll('a[href^="#"]');
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const navbarHeight = 0; // Approximate height of the fixed navbar
            const elementPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }
  customElements.define('custom-navbar', CustomNavbar);