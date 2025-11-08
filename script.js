// Initialize AOS (Animate On Scroll) with enhanced settings
AOS.init({
    duration: 1200,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: false,
    offset: 150,
    delay: 100,
    anchorPlacement: 'top-bottom'
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add smooth scrolling with enhanced easing
            const targetPosition = target.offsetTop - 100; // Account for fixed navbar
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1500;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Custom easing function for smoother animation
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
            
            requestAnimationFrame(animation);
            
            // Update active navigation state
            updateActiveNavigation(target.id);
        }
    });
});

// Update active navigation state
function updateActiveNavigation(sectionId) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced navbar scroll effect with progress indicator
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update scroll progress indicator
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Update active navigation based on scroll position
    updateActiveNavigationOnScroll();
});

// Update active navigation based on scroll position
function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-number, .stat-value, .celeb-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (counter.textContent.includes('∞')) {
                    counter.textContent = '∞';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (counter.textContent.includes('+')) {
                    counter.textContent = target + '+';
                } else if (counter.textContent.includes('∞')) {
                    counter.textContent = '∞';
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections with counters
document.querySelectorAll('.hero-stats, .social-work-section, .community-section, .retirement-celebration').forEach(section => {
    observer.observe(section);
});

// Typing effect for hero title
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
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Floating animation for cards
function addFloatingEffect() {
    const cards = document.querySelectorAll('.social-card, .mandir-card, .interview-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('floating');
    });
}

// Add floating class to CSS
const style = document.createElement('style');
style.textContent = `
    .floating {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Initialize floating effects
document.addEventListener('DOMContentLoaded', function() {
    addFloatingEffect();
});

// Smooth reveal animation for timeline items
function revealTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Initialize timeline reveal
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    // Reveal timeline items when they come into view
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealTimelineItems();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const timelineSection = document.querySelector('.career-section');
    if (timelineSection) {
        timelineObserver.observe(timelineSection);
    }
});

// Gallery hover effects
function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize gallery effects
document.addEventListener('DOMContentLoaded', initGalleryEffects);

// Parallax scrolling for background elements
function initParallax() {
    const parallaxElements = document.querySelectorAll('.floating-card, .mandir-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * (0.1 + index * 0.05);
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initParallax);

// Smooth reveal for social work cards
function revealSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize social cards reveal
document.addEventListener('DOMContentLoaded', function() {
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealSocialCards();
                socialObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const socialSection = document.querySelector('.social-work-section');
    if (socialSection) {
        socialObserver.observe(socialSection);
    }
});

// Celebration message typing effect
function typeCelebrationMessage() {
    const messageElement = document.querySelector('.celebration-message p');
    if (messageElement) {
        const text = messageElement.textContent;
        typeWriter(messageElement, text, 30);
    }
}

// Initialize celebration message typing
document.addEventListener('DOMContentLoaded', function() {
    const celebrationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeCelebrationMessage();
                celebrationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const celebrationSection = document.querySelector('.retirement-celebration');
    if (celebrationSection) {
        celebrationObserver.observe(celebrationSection);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body.loaded .hero-content {
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Smooth scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop);

// ULTRA-ADVANCED WebGL-Inspired Particle System
function addParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ultra-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        perspective: 1000px;
        transform-style: preserve-3d;
    `;
    
    // Create MIND-BLOWING 3D particles with advanced physics
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 3;
        const colors = [
            '#ff0080', '#ff8c00', '#40e0d0', '#ff6b6b', 
            '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', 
            '#ff9ff3', '#54a0ff', '#667eea', '#764ba2'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random();
        
        let shapeClass = 'particle-sphere';
        if (shape > 0.8) shapeClass = 'particle-cube';
        else if (shape > 0.6) shapeClass = 'particle-diamond';
        else if (shape > 0.4) shapeClass = 'particle-triangle';
        
        particle.className = `ultra-particle ${shapeClass}`;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation: ultra-particle-float ${3 + Math.random() * 8}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.4 + Math.random() * 0.6};
            filter: blur(${Math.random() * 0.5}px) brightness(1.2);
            box-shadow: 
                0 0 ${size * 3}px ${color},
                0 0 ${size * 6}px rgba(255, 255, 255, 0.2),
                inset 0 0 ${size}px rgba(255, 255, 255, 0.3);
            transform-style: preserve-3d;
        `;
        
        // Add holographic effect
        if (Math.random() > 0.7) {
            particle.style.background = `conic-gradient(from ${Math.random() * 360}deg, #ff0080, #ff8c00, #40e0d0, #ff0080)`;
            particle.style.backgroundSize = '200% 200%';
            particle.style.animation += ', holographic-shift 2s ease infinite';
        }
        
        particleContainer.appendChild(particle);
    }
    
    hero.appendChild(particleContainer);
    
    // Add SPECTACULAR particle animation styles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle-sphere { border-radius: 50%; }
        .particle-cube { 
            border-radius: 3px; 
            transform: rotateX(45deg) rotateY(45deg);
        }
        .particle-diamond { 
            transform: rotate(45deg);
            border-radius: 20%;
        }
        .particle-triangle { 
            border-radius: 30% 70% 70% 30%;
            transform: rotate(30deg);
        }
        
        @keyframes ultra-particle-float {
            0% { 
                transform: translateY(120vh) translateZ(0px) rotateX(0deg) rotateY(0deg) scale(0); 
                opacity: 0; 
            }
            10% { 
                opacity: 0.8; 
                transform: translateY(100vh) translateZ(50px) rotateX(90deg) rotateY(45deg) scale(1);
            }
            25% {
                transform: translateY(80vh) translateZ(100px) rotateX(180deg) rotateY(90deg) scale(1.3);
                opacity: 1;
            }
            50% {
                transform: translateY(50vh) translateZ(150px) rotateX(270deg) rotateY(180deg) scale(1.5);
            }
            75% {
                transform: translateY(20vh) translateZ(100px) rotateX(360deg) rotateY(270deg) scale(1.2);
            }
            95% { 
                opacity: 0.8; 
                transform: translateY(5vh) translateZ(50px) rotateX(450deg) rotateY(360deg) scale(1);
            }
            100% { 
                transform: translateY(-10vh) translateZ(0px) rotateX(540deg) rotateY(450deg) scale(0); 
                opacity: 0; 
            }
        }
        
        @keyframes holographic-shift {
            0%, 100% { 
                background-position: 0% 0%;
                filter: hue-rotate(0deg) saturate(1);
            }
            25% { 
                background-position: 100% 0%;
                filter: hue-rotate(90deg) saturate(1.2);
            }
            50% { 
                background-position: 100% 100%;
                filter: hue-rotate(180deg) saturate(1.5);
            }
            75% { 
                background-position: 0% 100%;
                filter: hue-rotate(270deg) saturate(1.2);
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Initialize particle background
document.addEventListener('DOMContentLoaded', addParticleBackground);

// SPECTACULAR 3D Morphing Background
function addMorphingBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const morphContainer = document.createElement('div');
    morphContainer.className = 'morphing-background';
    morphContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    `;
    
    // Create morphing shapes
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = `morph-shape morph-${i}`;
        const size = Math.random() * 300 + 200;
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]});
            border-radius: 50%;
            filter: blur(40px);
            opacity: 0.1;
            animation: morph-float-${i} ${10 + Math.random() * 10}s ease-in-out infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        
        morphContainer.appendChild(shape);
    }
    
    hero.insertBefore(morphContainer, hero.firstChild);
    
    // Add morphing animations
    const morphStyle = document.createElement('style');
    let morphAnimations = '';
    
    for (let i = 0; i < 8; i++) {
        morphAnimations += `
            @keyframes morph-float-${i} {
                0%, 100% { 
                    transform: translate(0, 0) scale(1) rotate(0deg); 
                    border-radius: 50%;
                }
                25% { 
                    transform: translate(100px, -100px) scale(1.2) rotate(90deg); 
                    border-radius: 30% 70% 70% 30%;
                }
                50% { 
                    transform: translate(-50px, 150px) scale(0.8) rotate(180deg); 
                    border-radius: 70% 30% 30% 70%;
                }
                75% { 
                    transform: translate(-150px, -50px) scale(1.1) rotate(270deg); 
                    border-radius: 20% 80% 80% 20%;
                }
            }
        `;
    }
    
    morphStyle.textContent = morphAnimations;
    document.head.appendChild(morphStyle);
}

// AMAZING Interactive 3D Tilt Effect
function add3DTiltEffect() {
    const cards = document.querySelectorAll('.social-card, .floating-card, .mandir-card, .interview-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -20;
            const rotateY = ((x - centerX) / centerX) * 20;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(30px) 
                scale(1.05)
            `;
            
            // Add light effect
            const lightX = (x / rect.width) * 100;
            const lightY = (y / rect.height) * 100;
            
            card.style.background = `
                radial-gradient(circle at ${lightX}% ${lightY}%, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0.05) 30%, 
                transparent 70%)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
            card.style.background = '';
        });
    });
}

// Initialize advanced effects
document.addEventListener('DOMContentLoaded', () => {
    addMorphingBackground();
    add3DTiltEffect();
});

// Add loading screen
function addLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>Loading Papa's Legacy...</h2>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
    
    // Add loading spinner styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading-content {
            text-align: center;
            color: white;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 2rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-content h2 {
            font-size: 1.5rem;
            font-weight: 300;
        }
    `;
    document.head.appendChild(loadingStyle);
}

// Initialize loading screen
document.addEventListener('DOMContentLoaded', addLoadingScreen);

// MIND-BLOWING Celebration Effects
function addCelebrationEffects() {
    // Add floating celebration emojis
    const celebrationEmojis = ['🎉', '🎊', '🌟', '✨', '🎈', '🎁', '🏆', '💫', '🎯', '🚀', '💎', '🔥'];
    const hero = document.querySelector('.hero');
    
    if (hero) {
        for (let i = 0; i < 30; i++) {
            const emoji = document.createElement('div');
            emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            emoji.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 2 + 1}rem;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: celebration-float ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                z-index: 1;
                pointer-events: none;
                opacity: 0.6;
                filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
            `;
            hero.appendChild(emoji);
        }
        
        // Add celebration animation styles
        const celebrationStyle = document.createElement('style');
        celebrationStyle.textContent = `
            @keyframes celebration-float {
                0%, 100% { 
                    transform: translateY(0) rotate(0deg) scale(1); 
                    opacity: 0.6; 
                }
                25% { 
                    transform: translateY(-20px) rotate(90deg) scale(1.1); 
                    opacity: 0.8; 
                }
                50% { 
                    transform: translateY(-40px) rotate(180deg) scale(1.2); 
                    opacity: 1; 
                }
                75% { 
                    transform: translateY(-20px) rotate(270deg) scale(1.1); 
                    opacity: 0.8; 
                }
            }
        `;
        document.head.appendChild(celebrationStyle);
    }
    
    // Add celebration effects to all sections
    addSectionCelebrations();
}

// Add celebration effects to each section
function addSectionCelebrations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (section.id !== 'home') {
            // Add celebration border effect
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            
            // Add celebration corner elements
            const cornerCeleb = document.createElement('div');
            cornerCeleb.className = 'corner-celebration';
            cornerCeleb.innerHTML = `
                <div class="corner-element corner-top-left">✨</div>
                <div class="corner-element corner-top-right">🌟</div>
                <div class="corner-element corner-bottom-left">💫</div>
                <div class="corner-element corner-bottom-right">🎊</div>
            `;
            section.appendChild(cornerCeleb);
        }
    });
    
    // Add corner celebration styles
    const cornerStyle = document.createElement('style');
    cornerStyle.textContent = `
        .corner-celebration {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .corner-element {
            position: absolute;
            font-size: 1.5rem;
            opacity: 0.4;
            animation: corner-pulse 4s ease-in-out infinite;
        }
        
        .corner-top-left {
            top: 20px;
            left: 20px;
            animation-delay: 0s;
        }
        
        .corner-top-right {
            top: 20px;
            right: 20px;
            animation-delay: 1s;
        }
        
        .corner-bottom-left {
            bottom: 20px;
            left: 20px;
            animation-delay: 2s;
        }
        
        .corner-bottom-right {
            bottom: 20px;
            right: 20px;
            animation-delay: 3s;
        }
        
        @keyframes corner-pulse {
            0%, 100% { 
                transform: scale(1) rotate(0deg); 
                opacity: 0.4; 
            }
            50% { 
                transform: scale(1.3) rotate(180deg); 
                opacity: 0.8; 
            }
        }
    `;
    document.head.appendChild(cornerStyle);
}

// Initialize celebration effects
document.addEventListener('DOMContentLoaded', addCelebrationEffects);

// Music Controls Functionality
function initMusicControls() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicText = musicToggle.querySelector('.music-text');
    const musicIcon = musicToggle.querySelector('i');
    
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
            musicToggle.classList.remove('playing');
            musicText.textContent = 'Play Music';
            musicIcon.className = 'fas fa-music';
        } else {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicText.textContent = 'Pause Music';
                musicIcon.className = 'fas fa-pause';
            }).catch(error => {
                console.log('Music playback failed:', error);
                // Fallback for browsers that block autoplay
                musicText.textContent = 'Click to Play';
            });
        }
    });
    
    // Handle music ending
    backgroundMusic.addEventListener('ended', function() {
        if (isPlaying) {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        }
    });
    
    // Add music visualization effect
    if (backgroundMusic) {
        backgroundMusic.addEventListener('play', function() {
            musicToggle.style.animation = 'pulse-glow 2s ease-in-out infinite';
        });
        
        backgroundMusic.addEventListener('pause', function() {
            musicToggle.style.animation = 'gradient-shift 3s ease infinite';
        });
    }
}

// Initialize music controls
document.addEventListener('DOMContentLoaded', initMusicControls);

console.log("🎉 MIND-BLOWING Papa's Legacy Website Loaded Successfully! 🎉");
console.log("🚀 Celebrating 30+ years of excellence and service to humanity with INCREDIBLE effects! ✨");
console.log("🌟 Prepare to be AMAZED by the visual spectacle! 🎊");
