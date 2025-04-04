/**
 * Welcome Section Component
 * Handles 3D cube rotation, counter animations, and other interactive elements
 */

const WelcomeSection = {
    init: function() {
        console.log("WelcomeSection init called");
        this.cacheDOM();
        if (this.isComponentAvailable()) {
            console.log("WelcomeSection is available, initializing component");
            this.setupCube();
            this.bindEvents();
            this.initCounters();
            
            // Initialize with a slight delay to ensure DOM is fully loaded
            setTimeout(() => {
                this.animateElements();
            }, 300);
        } else {
            console.warn("WelcomeSection component is not available in the DOM");
        }
    },
    
    cacheDOM: function() {
        this.welcomeSection = document.querySelector('.welcome-section');
        console.log("WelcomeSection cacheDOM - Found section:", !!this.welcomeSection);
        if (this.welcomeSection) {
            this.cube = this.welcomeSection.querySelector('.cube');
            this.prevBtn = this.welcomeSection.querySelector('.prev-btn');
            this.nextBtn = this.welcomeSection.querySelector('.next-btn');
            this.counterElements = this.welcomeSection.querySelectorAll('.counter-value');
            this.featureItems = this.welcomeSection.querySelectorAll('.feature-item');
            console.log("WelcomeSection elements - Cube:", !!this.cube, "PrevBtn:", !!this.prevBtn, "NextBtn:", !!this.nextBtn);
        }
    },
    
    isComponentAvailable: function() {
        return this.welcomeSection !== null;
    },
    
    setupCube: function() {
        if (!this.cube) return;
        
        // Set initial cube position
        this.currentFace = 0;
        const faces = ['front', 'right', 'back', 'left'];
        this.totalFaces = faces.length;
        
        // Set initial class
        this.cube.classList.add('show-front');
    },
    
    bindEvents: function() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', this.rotateCubePrev.bind(this));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', this.rotateCubeNext.bind(this));
        }
        
        // Mouse move parallax effect on features
        if (this.welcomeSection) {
            this.welcomeSection.addEventListener('mousemove', this.parallaxEffect.bind(this));
        }
        
        // Automatic cube rotation
        this.startAutoRotation();
    },
    
    rotateCubePrev: function() {
        console.log("Rotating cube previous");
        this.currentFace = (this.currentFace - 1 + this.totalFaces) % this.totalFaces;
        this.updateCubeFace();
    },
    
    rotateCubeNext: function() {
        console.log("Rotating cube next");
        this.currentFace = (this.currentFace + 1) % this.totalFaces;
        this.updateCubeFace();
    },
    
    updateCubeFace: function() {
        if (!this.cube) return;
        
        // Remove all show-* classes
        this.cube.classList.remove('show-front', 'show-right', 'show-back', 'show-left');
        
        // Add appropriate class based on currentFace
        const faces = ['front', 'right', 'back', 'left'];
        this.cube.classList.add(`show-${faces[this.currentFace]}`);
        console.log("Updated cube face to:", faces[this.currentFace]);
        
        // Reset auto rotation timer
        this.resetAutoRotation();
    },
    
    startAutoRotation: function() {
        console.log("Starting auto rotation of cube");
        // Clear any existing timer first
        if (this.autoRotationTimer) {
            clearInterval(this.autoRotationTimer);
        }
        
        this.autoRotationTimer = setInterval(() => {
            this.rotateCubeNext();
        }, 5000);
    },
    
    resetAutoRotation: function() {
        console.log("Resetting auto rotation timer");
        clearInterval(this.autoRotationTimer);
        this.startAutoRotation();
    },
    
    initCounters: function() {
        if (!this.counterElements.length) return;
        
        // Set up intersection observer for counters
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        this.counterElements.forEach(counter => {
            counter.textContent = '0';
            observer.observe(counter);
        });
    },
    
    animateCounter: function(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        const animate = () => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(progress * target);
            
            if (currentCount > target) {
                counterElement.textContent = target;
            } else {
                counterElement.textContent = currentCount;
                if (frame < totalFrames) {
                    requestAnimationFrame(animate);
                }
            }
        };
        
        animate();
    },
    
    parallaxEffect: function(e) {
        if (!this.featureItems.length) return;
        
        const sectionRect = this.welcomeSection.getBoundingClientRect();
        const centerX = sectionRect.left + sectionRect.width / 2;
        const centerY = sectionRect.top + sectionRect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate distance from center (normalized between -1 and 1)
        const distanceX = (mouseX - centerX) / (sectionRect.width / 2);
        const distanceY = (mouseY - centerY) / (sectionRect.height / 2);
        
        // Apply transform to each feature item
        this.featureItems.forEach((item, index) => {
            const factor = 5 + (index % 3); // Different factor for each item
            const rotateX = -distanceY * factor;
            const rotateY = distanceX * factor;
            
            item.style.transform = `perspective(1000px) translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    },
    
    animateElements: function() {
        // Add staggered entrance animation to feature items
        if (this.featureItems.length) {
            this.featureItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 150);
            });
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    WelcomeSection.init();
}); 