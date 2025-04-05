/**
 * Courses Component
 * Handles course tab functionality and hover effects
 */
const Courses = {
    init: function() {
        // Check if component exists
        if (!document.querySelector('.courses-section')) {
            console.log('Courses section not found in DOM');
            return;
        }






















































        
        
        console.log('Initializing Courses component');
        
        // Initialize more advanced component if available
        if (typeof CoursesSection !== 'undefined') {
            CoursesSection.init();
        } else {
            // Course tabs
            $('#courseTabs a').on('click', function(e) {
                e.preventDefault();
                $(this).tab('show');
            });

            // Animation for course items
            $('.course-item').hover(
                function() {
                    $(this).addClass('shadow-lg');
                },
                function() {
                    $(this).removeClass('shadow-lg');
                }
            );
        }
    }
};

/**
 * Courses component with 3D effects and interactive elements
 */
const CoursesSection = {
    /**
     * Initialize the component
     */
    init: function() {
        if (!this.isComponentAvailable()) {
            console.log('Courses section not found in the DOM');
            return;
        }

        console.log('Initializing Courses component with 3D effects');
        this.cacheDOM();
        this.bindEvents();
        this.initGlowEffect();
        this.initTabAnimation();
        this.fixCourseImages();
    },

    /**
     * Check if component exists in the DOM
     * @returns {boolean}
     */
    isComponentAvailable: function() {
        return document.querySelector('.courses-section') !== null;
    },

    /**
     * Cache DOM elements
     */
    cacheDOM: function() {
        this.coursesSection = document.querySelector('.courses-section');
        this.courseNavWrapper = document.querySelector('.course-nav-wrapper');
        this.coursesGlowBg = document.querySelector('.courses-glow-bg');
        this.navTabs = document.querySelectorAll('.course-nav .nav-link');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.courseCards = document.querySelectorAll('.course-card');
        this.courseFeatures = document.querySelectorAll('.feature.depth-effect');
        this.courseImages = document.querySelectorAll('.course-image');
    },
    
    /**
     * Fix course images by ensuring they load properly
     */
    fixCourseImages: function() {
        // Ensure all course images are loaded
        this.courseImages.forEach(img => {
            const bgImage = img.getAttribute('style');
            
            // Log current background image style
            console.log('Current image style:', bgImage);
            
            if (bgImage && bgImage.includes('url(')) {
                // Extract the URL
                const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                if (urlMatch && urlMatch[1]) {
                    const imageUrl = urlMatch[1];
                    console.log('Loading image:', imageUrl);
                    
                    // Test if image exists
                    const testImg = new Image();
                    testImg.onload = () => {
                        console.log('Image loaded successfully:', imageUrl);
                        // Ensure image is displayed by forcing a reflow
                        img.style.display = 'none';
                        img.offsetHeight; // Force reflow
                        img.style.display = 'block';
                    };
                    testImg.onerror = () => {
                        console.error('Failed to load image:', imageUrl);
                        // Try alternative URL format
                        const altUrl = imageUrl.replace(/^['"]?(.*?)['"]?$/, '$1');
                        console.log('Trying alternative URL:', altUrl);
                        
                        // Update the image URL to use the correct path from root
                        const fixedUrl = this.fixImageUrl(imageUrl);
                        console.log('Fixed URL:', fixedUrl);
                        img.style.backgroundImage = `url('${fixedUrl}')`;
                    };
                    testImg.src = imageUrl;
                }
            }
        });
    },
    
    /**
     * Fix image URL to ensure it uses the correct path
     * @param {string} url - The original URL
     * @returns {string} - The fixed URL
     */
    fixImageUrl: function(url) {
        // Remove any quotes from the URL
        let cleanUrl = url.replace(/^['"]?(.*?)['"]?$/, '$1');
        
        // If the URL doesn't start with a slash or http, add relative path
        if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith('http')) {
            // Fix specific incorrect paths
            if (cleanUrl === 'cclms/bca.jpeg') {
                // URL is correct, just ensure it's accessible
                return cleanUrl;
            } else if (cleanUrl === 'cclms/course_bhm.jpg') {
                // URL is correct, just ensure it's accessible
                return cleanUrl;
            } else if (cleanUrl === 'cclms/bba.jpg') {
                // URL is correct, just ensure it's accessible
                return cleanUrl;
            }
        }
        
        return cleanUrl;
    },

    /**
     * Bind event listeners
     */
    bindEvents: function() {
        // Add event listeners for tab switching
        this.navTabs.forEach(tab => {
            tab.addEventListener('click', this.handleTabChange.bind(this));
        });

        // Add 3D tilt effect to course cards
        this.courseCards.forEach(card => {
            card.addEventListener('mousemove', this.handleCardTilt.bind(this));
            card.addEventListener('mouseleave', this.resetCardTilt.bind(this));
        });

        // Add hover effect to course features
        this.courseFeatures.forEach(feature => {
            feature.addEventListener('mouseenter', this.handleFeatureHover.bind(this));
            feature.addEventListener('mouseleave', this.handleFeatureLeave.bind(this));
        });

        // Window resize event
        window.addEventListener('resize', this.handleResize.bind(this));
    },

    /**
     * Initialize the glow effect on the course navigation
     */
    initGlowEffect: function() {
        if (!this.courseNavWrapper || !this.coursesGlowBg) return;

        this.courseNavWrapper.addEventListener('mousemove', (e) => {
            const rect = this.courseNavWrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.coursesGlowBg.style.setProperty('--x', `${x}%`);
            this.coursesGlowBg.style.setProperty('--y', `${y}%`);
        });

        this.courseNavWrapper.addEventListener('mouseenter', () => {
            this.coursesGlowBg.style.opacity = '1';
        });

        this.courseNavWrapper.addEventListener('mouseleave', () => {
            this.coursesGlowBg.style.opacity = '0';
        });
    },

    /**
     * Initialize tab switching animations
     */
    initTabAnimation: function() {
        // Apply initial animation to the active tab content
        const activeTabPane = document.querySelector('.tab-pane.active');
        if (activeTabPane) {
            this.animateTabContent(activeTabPane);
        }
    },

    /**
     * Handle tab change event
     * @param {Event} e - Click event
     */
    handleTabChange: function(e) {
        const targetId = e.currentTarget.getAttribute('data-bs-target');
        const targetPane = document.querySelector(targetId);
        
        // Wait for Bootstrap to finish the tab switch
        setTimeout(() => {
            if (targetPane && targetPane.classList.contains('show')) {
                this.animateTabContent(targetPane);
                
                // Fix course images in the newly displayed tab
                const courseImages = targetPane.querySelectorAll('.course-image');
                courseImages.forEach(img => {
                    // Log current state
                    console.log('Tab changed, fixing image:', img.getAttribute('style'));
                    
                    // Force reflow to ensure the image is displayed
                    img.style.display = 'none';
                    img.offsetHeight; // Force reflow
                    img.style.display = 'block';
                    
                    // Ensure the background image is correctly loaded
                    const bgImage = img.getAttribute('style');
                    if (bgImage && bgImage.includes('url(')) {
                        const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                        if (urlMatch && urlMatch[1]) {
                            const imageUrl = this.fixImageUrl(urlMatch[1]);
                            img.style.backgroundImage = `url('${imageUrl}')`;
                        }
                    }
                });
            }
        }, 300);
    },

    /**
     * Animate tab content when tab is changed
     * @param {HTMLElement} tabPane - The tab pane to animate
     */
    animateTabContent: function(tabPane) {
        const card = tabPane.querySelector('.course-card');
        const courseImage = tabPane.querySelector('.course-image-container');
        const courseContent = tabPane.querySelector('.course-content');
        const floatingIcons = tabPane.querySelectorAll('.floating-icon');
        
        // Reset animations
        [card, courseImage, courseContent, ...floatingIcons].forEach(el => {
            if (el) {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = null;
            }
        });
        
        // Apply animations
        if (card) card.style.animation = 'fadeIn 0.5s forwards';
        if (courseImage) courseImage.style.animation = 'slideInLeft 0.5s forwards';
        if (courseContent) courseContent.style.animation = 'slideInRight 0.5s forwards';
        
        // Ensure course images are properly displayed
        const courseImageElements = tabPane.querySelectorAll('.course-image');
        courseImageElements.forEach(img => {
            if (img) {
                // Save the original background image
                const originalBg = img.style.backgroundImage;
                
                // Force reflow to ensure background image is displayed
                img.style.display = 'none';
                img.offsetHeight;
                img.style.display = 'block';
                
                // Ensure the background image is still applied
                if (!img.style.backgroundImage || img.style.backgroundImage === 'none') {
                    img.style.backgroundImage = originalBg;
                }
                
                // Log status for debugging
                console.log('Reapplied background image:', img.style.backgroundImage);
            }
        });
        
        // Animate floating icons with staggered delay
        floatingIcons.forEach((icon, index) => {
            icon.style.animation = `float 4s ${index * 0.5}s ease-in-out infinite`;
        });
        
        // Animate features with staggered delay
        const features = tabPane.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.style.animation = `fadeInUp 0.3s ${0.3 + (index * 0.1)}s forwards`;
            feature.style.opacity = '0';
        });
    },

    /**
     * Handle 3D tilt effect for course cards
     * @param {Event} e - Mouse move event
     */
    handleCardTilt: function(e) {
        const card = e.currentTarget;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Calculate mouse position relative to card center
        const mouseX = e.clientX - cardRect.left;
        const mouseY = e.clientY - cardRect.top;
        
        // Calculate rotation angles (limited to a small range)
        const rotateY = ((mouseX / cardWidth) - 0.5) * 5; // -2.5 to 2.5 degrees
        const rotateX = ((mouseY / cardHeight) - 0.5) * -5; // -2.5 to 2.5 degrees
        
        // Apply the rotation transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        
        // Add shine effect based on mouse position
        this.updateShineEffect(card, mouseX, mouseY, cardWidth, cardHeight);
    },

    /**
     * Reset card tilt when mouse leaves the card
     * @param {Event} e - Mouse leave event
     */
    resetCardTilt: function(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        
        // Reset shine effect
        const shine = card.querySelector('.card-shine');
        if (shine) {
            shine.style.opacity = '0';
        }
    },

    /**
     * Add shine effect to card based on mouse position
     * @param {HTMLElement} card - The card element
     * @param {number} mouseX - Mouse X position
     * @param {number} mouseY - Mouse Y position
     * @param {number} width - Card width
     * @param {number} height - Card height
     */
    updateShineEffect: function(card, mouseX, mouseY, width, height) {
        // Create or find shine element
        let shine = card.querySelector('.card-shine');
        if (!shine) {
            shine = document.createElement('div');
            shine.classList.add('card-shine');
            shine.style.position = 'absolute';
            shine.style.top = '0';
            shine.style.left = '0';
            shine.style.right = '0';
            shine.style.bottom = '0';
            shine.style.pointerEvents = 'none';
            shine.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)';
            shine.style.opacity = '0';
            shine.style.transition = 'opacity 0.3s ease';
            shine.style.zIndex = '3';
            card.appendChild(shine);
        }
        
        // Calculate shine position
        const x = (mouseX / width) * 100;
        const y = (mouseY / height) * 100;
        
        // Update shine position and opacity
        shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`;
        shine.style.opacity = '1';
    },

    /**
     * Handle feature hover effect
     * @param {Event} e - Mouse enter event
     */
    handleFeatureHover: function(e) {
        const feature = e.currentTarget;
        feature.style.transform = 'translateZ(15px)';
        feature.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        
        const icon = feature.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2)';
        }
    },

    /**
     * Handle feature leave effect
     * @param {Event} e - Mouse leave event
     */
    handleFeatureLeave: function(e) {
        const feature = e.currentTarget;
        feature.style.transform = 'translateZ(0px)';
        feature.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        
        const icon = feature.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
        }
    },

    /**
     * Handle window resize event
     */
    handleResize: function() {
        // Reset transformations and animations on small screens
        if (window.innerWidth < 768) {
            this.courseCards.forEach(card => {
                card.style.transform = 'none';
            });
            
            this.courseFeatures.forEach(feature => {
                feature.style.transform = 'none';
            });
        }
    }
};

// Initialize the component when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Courses !== 'undefined') {
        Courses.init();
    }
});

// Make component available globally
window.CoursesSection = CoursesSection; 