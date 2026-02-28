/* ========================================
   TRIBUTE TO C.P. JAIN
   Elegant Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Simple gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity 0.3s';
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = 'max-width:90%;max-height:90%;border-radius:12px;box-shadow:0 4px 60px rgba(0,0,0,0.5)';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            setTimeout(() => modal.style.opacity = '1', 10);
            
            modal.addEventListener('click', () => {
                modal.style.opacity = '0';
                setTimeout(() => document.body.removeChild(modal), 300);
            });
        });
    });
    
    console.log('Tribute website loaded');
});
