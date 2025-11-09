// Create Loading Screen
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>Loading C.P. Jain's Legacy...</h2>
            <p>Preparing a tribute to an extraordinary journey</p>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    console.log('🎯 Loading C.P. Jain\'s Legacy website...');
    
    // Remove loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                console.log('✅ C.P. Jain\'s Legacy website loaded successfully');
            }, 500);
        }, 2000);
    });
}

// Initialize loading screen
document.addEventListener('DOMContentLoaded', createLoadingScreen);

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Simple Auto-Play Music System
function initMusicControls() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicText = musicToggle.querySelector('.music-text');
    const musicIcon = musicToggle.querySelector('i');
    
    let isPlaying = false;
    
    // IMMEDIATE auto-play function - LOCAL ONLY
    function playLocalMusic() {
        console.log('🎵 Starting local music auto-play...');
        
        backgroundMusic.currentTime = 0;
        backgroundMusic.volume = 0.7;
        backgroundMusic.muted = false;
        
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('🎵✅ LOCAL MUSIC PLAYING!');
                isPlaying = true;
                musicToggle.classList.add('playing');
                musicText.textContent = 'Pause Music';
                musicIcon.className = 'fas fa-pause';
                musicToggle.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                musicToggle.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.5)';
            }).catch(error => {
                console.log('🎵 Direct play blocked, trying muted approach...');
                // Try muted play then unmute
                backgroundMusic.muted = true;
                backgroundMusic.play().then(() => {
                    console.log('🎵 Muted play started, unmuting...');
                    isPlaying = true;
                    setTimeout(() => {
                        backgroundMusic.muted = false;
                        musicToggle.classList.add('playing');
                        musicText.textContent = 'Pause Music';
                        musicIcon.className = 'fas fa-pause';
                        musicToggle.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                        console.log('🎵✅ LOCAL MUSIC UNMUTED AND PLAYING!');
                    }, 500);
                }).catch(() => {
                    console.log('🎵 Auto-play not allowed by browser');
                });
            });
        }
    }
    
    // Multiple auto-play attempts
    setTimeout(playLocalMusic, 100);   
    setTimeout(playLocalMusic, 500);   
    setTimeout(playLocalMusic, 1000);  
    setTimeout(playLocalMusic, 2000);  
    
    // Auto-play when audio is ready
    backgroundMusic.addEventListener('canplaythrough', function() {
        console.log('🎵 Audio ready - attempting play...');
        if (!isPlaying) playLocalMusic();
    }, { once: true });
    
    // Auto-play on metadata load
    backgroundMusic.addEventListener('loadedmetadata', function() {
        console.log('🎵 Audio metadata loaded - attempting play...');
        if (!isPlaying) setTimeout(playLocalMusic, 200);
    }, { once: true });
    
    // Auto-play on any user interaction
    ['click', 'touchstart', 'keydown', 'mousemove', 'scroll'].forEach(event => {
        document.addEventListener(event, function() {
            if (!isPlaying && backgroundMusic.paused) {
                console.log(`🎵 User ${event} - starting music...`);
                playLocalMusic();
            }
        }, { once: true, passive: true });
    });
    
    // Music toggle button
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
            musicToggle.classList.remove('playing');
            musicText.textContent = 'Play Music';
            musicIcon.className = 'fas fa-music';
            musicToggle.style.background = '';
            musicToggle.style.boxShadow = '';
        } else {
            playLocalMusic();
        }
    });
    
    // Loop the music
    backgroundMusic.addEventListener('ended', function() {
        if (isPlaying) {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        }
    });
}

// Initialize music controls
document.addEventListener('DOMContentLoaded', initMusicControls);

// Try auto-play on window load
window.addEventListener('load', function() {
    console.log('🎵 Window loaded - final auto-play attempt...');
    const audio = document.getElementById('backgroundMusic');
    if (audio && audio.paused) {
        audio.volume = 0.8;
        audio.play().then(() => {
            console.log('🎵✅ Window load auto-play SUCCESS!');
            const musicToggle = document.getElementById('musicToggle');
            if (musicToggle) {
                musicToggle.classList.add('playing');
                musicToggle.querySelector('.music-text').textContent = 'Pause Music';
                musicToggle.querySelector('i').className = 'fas fa-pause';
                musicToggle.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            }
        }).catch(() => {
            console.log('🎵 Window load auto-play blocked');
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Initialize AOS (Animate On Scroll) if available
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add some visual effects for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.floating-card, .social-card, .interview-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

console.log('🎯 C.P. Jain\'s Legacy - Simple auto-play system loaded');