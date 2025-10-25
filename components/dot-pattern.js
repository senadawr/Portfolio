
class DotPattern extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    opacity: 0.2;
                    mix-blend-mode: multiply;
                }
                canvas {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <canvas id="dots-canvas"></canvas>
        `;

        this.initCanvas();
    }

    initCanvas() {
        const canvas = this.shadowRoot.getElementById('dots-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let dots = [];
        const dotSize = 1.3;
        const spacing = 14;
        const repelDistance = 110;
        const mouse = { x: null, y: null };
        let hoveredButton = null;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initDots();
        }

        function initDots() {
            dots = [];
            const cols = Math.ceil(width / spacing);
            const rows = Math.ceil(height / spacing);
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * spacing,
                        y: j * spacing,
                        originalX: i * spacing,
                        originalY: j * spacing,
                        vx: 0,
                        vy: 0,
                    });
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            dots.forEach(dot => {
                dot.vx *= 0.899999999;
                dot.vy *= 0.899999999;
                
                dot.vx += (dot.originalX - dot.x) * 0.005;
                dot.vy += (dot.originalY - dot.y) * 0.005;
                
                if (hoveredButton) {
                    const buttonRect = hoveredButton.getBoundingClientRect();
                    const buffer = 80;
                    
                    const isInButtonArea = dot.x >= (buttonRect.left - buffer) && 
                                          dot.x <= (buttonRect.right + buffer) &&
                                          dot.y >= (buttonRect.top - buffer) && 
                                          dot.y <= (buttonRect.bottom + buffer);
                    
                    if (isInButtonArea) {
                        const distToLeft = Math.abs(dot.x - (buttonRect.left - buffer));
                        const distToRight = Math.abs(dot.x - (buttonRect.right + buffer));
                        const distToTop = Math.abs(dot.y - (buttonRect.top - buffer));
                        const distToBottom = Math.abs(dot.y - (buttonRect.bottom + buffer));
                        
                        const minDistX = Math.min(distToLeft, distToRight);
                        const minDistY = Math.min(distToTop, distToBottom);
                        const minDistance = Math.min(minDistX, minDistY);
                        
                        let repelX = 0;
                        let repelY = 0;
                        
                        if (minDistance === distToLeft) {
                            repelX = -1;
                        } else if (minDistance === distToRight) {
                            repelX = 1;
                        }
                        
                        if (minDistance === distToTop) {
                            repelY = -1;
                        } else if (minDistance === distToBottom) {
                            repelY = 1;
                        }
                        
                        const force = (buffer - minDistance) / buffer;
                        if (force > 0) {
                            dot.vx += repelX * force * 0.4;
                            dot.vy += repelY * force * 0.4;
                        }
                    }
                }
                else if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - dot.x;
                    const dy = mouse.y - dot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < repelDistance) {
                        const force = (repelDistance - distance) / repelDistance;
                        dot.vx -= dx * force * 0.2;
                        dot.vy -= dy * force * 0.2;
                    }
                }

                dot.x += dot.vx;
                dot.y += dot.vy;
                
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }

        function checkButtonHover() {
            const buttons = document.querySelectorAll('a, button, .work-card, .scroll-down-btn, .project-card');
            let foundHovered = null;
            
            buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                if (mouse.x >= rect.left && mouse.x <= rect.right && 
                    mouse.y >= rect.top && mouse.y <= rect.bottom) {
                    foundHovered = button;
                }
            });
            
            hoveredButton = foundHovered;
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            checkButtonHover();
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
            hoveredButton = null;
        });

        resize();
        animate();
    }
}
customElements.define('dot-pattern', DotPattern);