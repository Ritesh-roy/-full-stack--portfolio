
        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 5 + 2;
                const posX = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}vw`;
                particle.style.top = '100vh';
                particle.style.opacity = Math.random() * 0.3 + 0.1;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                
                // Random color between primary and secondary
                const colors = ['#3b82f6', '#10b981', '#8b5cf6'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                particlesContainer.appendChild(particle);
            }
        }

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });

        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            
            // Create a dark theme modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(15, 23, 42, 0.95);
                border: 2px solid rgba(59, 130, 246, 0.3);
                padding: 2rem;
                z-index: 10000;
                border-radius: var(--border-radius);
                color: var(--light);
                max-width: 500px;
                width: 90%;
                backdrop-filter: blur(10px);
                box-shadow: var(--shadow-lg);
            `;
            modal.innerHTML = `
                <h3 style="color: var(--primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-check-circle"></i> Message Sent!
                </h3>
                <div style="margin-bottom: 1.5rem; font-family: 'JetBrains Mono', monospace;">
                    <div>> message.status = <span style="color: var(--secondary);">"sent"</span>;</div>
                    <div>> recipient.name = <span style="color: var(--secondary);">"${name}"</span>;</div>
                    <div>> contact.email = <span style="color: var(--secondary);">"${email}"</span>;</div>
                    <div>> response.time = <span style="color: var(--secondary);">"${new Date().toLocaleTimeString()}"</span>;</div>
                </div>
                <p style="margin-bottom: 1.5rem;">Thank you for reaching out! I'll get back to you soon at ${email}.</p>
                <button id="closeModal" style="background: linear-gradient(90deg, var(--primary), var(--primary-dark)); color: white; border: none; padding: 10px 20px; font-family: 'Inter'; cursor: pointer; border-radius: var(--border-radius); width: 100%;">Close</button>
            `;
            
            document.body.appendChild(modal);
            
            document.getElementById('closeModal').addEventListener('click', () => {
                document.body.removeChild(modal);
                contactForm.reset();
            });
        });

        // Add hover effects to all interactive elements
        document.querySelectorAll('.badge, .skill-tag, .tech-tag, .social-link, .tool-icon').forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            // Add fade-in to hero content
            const heroContent = document.querySelector('.hero-content');
            heroContent.classList.add('fade-in');
        });
    