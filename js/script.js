// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

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

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');

            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#10B981';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Typing effect for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect when page loads
    window.addEventListener('load', function () {
        const subtitle = document.querySelector('.hero-text .subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 80);
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Card hover effects with mouse tracking
    document.querySelectorAll('.skill-card, .service-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            }
        }
        updateCounter();
    }

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.stat-number');
                if (number && !number.classList.contains('animated')) {
                    number.classList.add('animated');
                    const text = number.textContent;
                    const value = parseInt(text.replace(/[^0-9]/g, ''));
                    number.textContent = '0' + text.replace(/[0-9]/g, '');
                    animateCounter(number, value);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

    // Add floating animation to random elements
    function addFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.skill-icon, .service-icon');
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
            element.style.animation = `float 3s ease-in-out infinite`;
        });
    }

    // Initialize floating animations
    setTimeout(addFloatingAnimation, 1000);

    // Add sparkle effect to buttons on hover
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#f093fb';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }

    document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
        button.addEventListener('mouseenter', function (e) {
            const rect = button.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createSparkle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 100);
            }
        });
    });

    // Progressive loading effect for images/cards
    const loadObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .service-card, .stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        loadObserver.observe(card);
    });

    // Dynamic gradient background
    function updateGradient() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const time = Date.now() * 0.0005;
            const color1 = `hsl(${230 + Math.sin(time) * 20}, 70%, 60%)`;
            const color2 = `hsl(${270 + Math.cos(time) * 20}, 70%, 50%)`;
            hero.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
        }
    }

    // Update gradient every 3 seconds
    setInterval(updateGradient, 3000);

    // Add cursor trail effect
    let trail = [];
    document.addEventListener('mousemove', function (e) {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        // Keep only recent trail points
        trail = trail.filter(point => Date.now() - point.time < 500);

        // Create trail effect on hero section
        if (e.target.closest('.hero')) {
            const trailDot = document.createElement('div');
            trailDot.style.position = 'fixed';
            trailDot.style.left = e.clientX + 'px';
            trailDot.style.top = e.clientY + 'px';
            trailDot.style.width = '6px';
            trailDot.style.height = '6px';
            trailDot.style.background = 'rgba(255, 255, 255, 0.6)';
            trailDot.style.borderRadius = '50%';
            trailDot.style.pointerEvents = 'none';
            trailDot.style.animation = 'sparkle 0.8s ease-out forwards';
            trailDot.style.zIndex = '1000';
            document.body.appendChild(trailDot);

            setTimeout(() => trailDot.remove(), 800);
        }
    });

    // Add loading screen
    function showLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
                <h3 style="color: white; font-size: 1.5rem; margin-bottom: 10px;">Nancy Aliu</h3>
                <p style="color: rgba(255,255,255,0.8);">Loading Portfolio...</p>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(loader);

        // Remove loader after page loads
        window.addEventListener('load', function () {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        });
    }

    // Initialize loading screen
    if (document.readyState === 'loading') {
        showLoadingScreen();
    }
});