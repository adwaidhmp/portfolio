        // Create moving particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles-canvas');
            
            function createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size between 2px and 8px
                const size = Math.random() * 6 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random horizontal position
                particle.style.left = Math.random() * 100 + '%';
                
                // Random animation duration between 3s and 8s
                const duration = Math.random() * 5 + 3;
                particle.style.animationDuration = duration + 's';
                
                // Random delay
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                // Random opacity
                const opacity = Math.random() * 0.5 + 0.3;
                particle.style.background = `rgba(255, 255, 255, ${opacity})`;
                
                particlesContainer.appendChild(particle);
                
                // Remove particle after animation completes
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, (duration + 2) * 1000);
            }
            
            // Create initial particles
            for (let i = 0; i < 20; i++) {
                setTimeout(createParticle, i * 200);
            }
            
            // Continue creating particles
            setInterval(createParticle, 300);
        }
        
        // Start particles when page loads
        window.addEventListener('load', createParticles);

        // Mobile menu toggle
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const toggle = document.querySelector('.mobile-menu-toggle i');
            
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                toggle.classList.remove('fa-bars');
                toggle.classList.add('fa-times');
            } else {
                toggle.classList.remove('fa-times');
                toggle.classList.add('fa-bars');
            }
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const toggle = document.querySelector('.mobile-menu-toggle i');
            
            mobileMenu.classList.remove('active');
            toggle.classList.remove('fa-times');
            toggle.classList.add('fa-bars');
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add active class to navigation on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Contact form submission
    emailjs.init("tx-CM5j4diYSvRHwg"); 

    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        const obj = { name, email, subject, message };

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const serviceid = "service_mzosifp";
        const templateid = "template_z4c1nej";

        emailjs.send(serviceid, templateid, obj)
            .then(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'rgba(40, 167, 69, 0.3)';
                
                this.reset(); // Reset form

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch((err) => {
                console.error("Email sending failed:", err);
                alert("Something went wrong. Please try again.");
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
        // Add some interactive hover effects
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const mobileMenu = document.getElementById('mobileMenu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Prevent mobile menu close when clicking inside menu
        document.getElementById('mobileMenu').addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                closeMobileMenu();
            }
        });