/**
 * Main JavaScript file
 * Imports and initializes all component modules
 */
$(document).ready(function() {
    console.log("Main.js loaded and executing...");
    
    // Check if PageLoader is active; if so, defer component initialization
    if (typeof PageLoader !== 'undefined' && $('.page-loader').length > 0) {
        console.log("Page loader detected, components will be initialized after loader completes");
    } else {
        // Pre-cache future hover states to improve first-interaction performance
        setTimeout(function() {
            $('<div class="navbar-nav-hover-cache">')
                .css({
                    position: 'absolute',
                    visibility: 'hidden',
                    pointer: 'none'
                })
                .appendTo('body');
            $('.navbar-nav .nav-link').each(function() {
                $(this).clone().addClass('active').appendTo('.navbar-nav-hover-cache');
            });
        }, 1000);
        
        // Initialize all components with error handling
        try {
            console.log("Initializing components from main.js");
            
            // Prioritize navigation initialization for faster responsiveness
            if (typeof Navigation !== 'undefined') {
                console.log("Initializing Navigation");
                Navigation.init();
            } else {
                console.error("Navigation component not found");
            }
            
            if (typeof HeroSlider !== 'undefined') {
                console.log("Initializing HeroSlider");
                HeroSlider.init();
            } else {
                console.error("HeroSlider component not found");
            }
            
            if (typeof AdmissionCard !== 'undefined') {
                console.log("Initializing AdmissionCard");
                AdmissionCard.init();
            } else {
                console.error("AdmissionCard component not found");
            }
            
            if (typeof CoursesSection !== 'undefined') {
                console.log("Initializing CoursesSection with 3D effects");
                CoursesSection.init();
            } else {
                console.error("CoursesSection component not found");
            }
            
            if (typeof Courses !== 'undefined') {
                console.log("Initializing Courses");
                Courses.init();
            } else {
                console.error("Courses component not found");
            }
            
            if (typeof Testimonials !== 'undefined') {
                console.log("Initializing Testimonials");
                Testimonials.init();
            } else {
                console.error("Testimonials component not found");
            }
            
            if (typeof Utils !== 'undefined') {
                console.log("Initializing Utils");
                Utils.init();
            } else {
                console.error("Utils component not found");
            }
            
            if (typeof WelcomeSection !== 'undefined') {
                console.log("Initializing WelcomeSection");
                WelcomeSection.init();
            } else {
                console.error("WelcomeSection component not found");
            }
            
            if (typeof ContactSection !== 'undefined') {
                console.log("Initializing ContactSection with 3D effects");
                ContactSection.init();
            } else {
                console.error("ContactSection component not found");
            }
            
            // Hide debug message after all components initialized
            console.log("All components initialized, hiding debug message");
            $("#debug-message").fadeOut();
            
        } catch (error) {
            console.error("Error initializing components:", error);
            $("#debug-message").html("Error initializing components: " + error.message + 
                                  "<button onclick=\"document.getElementById('debug-message').style.display='none';\" style=\"margin-left: 10px; border: none; background: #721c24; color: white; padding: 2px 8px; border-radius: 3px;\">Close</button>");
        }
    }
});

/**
 * Main JavaScript file 
 * Initializes all components when the document is ready
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    // Each component has its own initialization in its respective file
    
    // Set CSS variables for components
    document.documentElement.style.setProperty('--primary-color-rgb', '13, 110, 253');
    
    // Add 3D effect to body
    document.body.classList.add('has-3d-effects');
    
    // Initialize CoursesSection component if available
    if (typeof CoursesSection !== 'undefined') {
        console.log('Initializing CoursesSection with 3D effects');
        CoursesSection.init();
    }
    
    // Initialize ContactSection component if available
    if (typeof ContactSection !== 'undefined') {
        console.log('Initializing ContactSection with 3D effects');
        ContactSection.init();
    }
    
    // Show a welcome message in console
    console.log('CCLMS - College of Learning & Management Sciences');
    console.log('All components initialized successfully');
    
    // Initialize tab functionality
    // Course tabs functionality
    const courseTabs = document.querySelectorAll('#courseTabs .nav-link');
    
    if (courseTabs.length > 0) {
        courseTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                // Get the tab's target
                const targetId = this.getAttribute('data-bs-target');
                
                // Find all videos and pause them
                const allVideos = document.querySelectorAll('.course-video');
                allVideos.forEach(video => {
                    video.pause();
                });
                
                // Find the video in the target tab and play it
                const targetTab = document.querySelector(targetId);
                if (targetTab) {
                    const video = targetTab.querySelector('.course-video');
                    if (video) {
                        // Small timeout to ensure the tab is visible
                        setTimeout(() => {
                            video.play()
                                .catch(error => {
                                    console.log('Video play error:', error);
                                    // Try playing muted if autoplay failed
                                    video.muted = true;
                                    video.play().catch(e => console.log('Failed even with mute:', e));
                                });
                        }, 100);
                    }
                }
            });
        });
        
        // Play the first tab video on page load
        const firstTabVideo = document.querySelector('#bca .course-video');
        if (firstTabVideo) {
            setTimeout(() => {
                firstTabVideo.play()
                    .catch(error => {
                        console.log('Initial video play error:', error);
                        // Try playing muted if autoplay failed
                        firstTabVideo.muted = true;
                        firstTabVideo.play().catch(e => console.log('Failed even with mute:', e));
                    });
            }, 500);
        }
        
        // Add click event to all videos to unmute them when clicked
        const allVideos = document.querySelectorAll('.course-video');
        allVideos.forEach(video => {
            // Hide play button overlay when video starts playing
            video.addEventListener('play', function() {
                this.parentNode.classList.add('video-playing');
            });
            
            // Show play button overlay when video is paused
            video.addEventListener('pause', function() {
                this.parentNode.classList.remove('video-playing');
            });
            
            video.addEventListener('click', function() {
                if (this.muted) {
                    this.muted = false;
                    
                    // Create and display a message that the video is now unmuted
                    const unmutedMessage = document.createElement('div');
                    unmutedMessage.textContent = 'Video unmuted';
                    unmutedMessage.style.position = 'absolute';
                    unmutedMessage.style.top = '10px';
                    unmutedMessage.style.left = '50%';
                    unmutedMessage.style.transform = 'translateX(-50%)';
                    unmutedMessage.style.background = 'rgba(0, 0, 0, 0.7)';
                    unmutedMessage.style.color = 'white';
                    unmutedMessage.style.padding = '5px 10px';
                    unmutedMessage.style.borderRadius = '4px';
                    unmutedMessage.style.zIndex = '10';
                    unmutedMessage.style.fontSize = '14px';
                    
                    this.parentNode.appendChild(unmutedMessage);
                    
                    // Remove the message after 2 seconds
                    setTimeout(() => {
                        unmutedMessage.remove();
                    }, 2000);
                }
            });
        });
    }
    
    // Initialize the cube rotation
    const cube = document.querySelector('.cube');
    if (cube) {
        const showClass = [
            'show-front',
            'show-right',
            'show-back',
            'show-left'
        ];
        
        let currentClass = showClass[0];
        cube.classList.add(currentClass);
        
        // Rotate cube on button click
        const nextBtn = document.querySelector('.control-next');
        const prevBtn = document.querySelector('.control-prev');
        
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', function() {
                let currentIndex = showClass.indexOf(currentClass);
                let nextIndex = (currentIndex + 1) % showClass.length;
                
                cube.classList.remove(currentClass);
                currentClass = showClass[nextIndex];
                cube.classList.add(currentClass);
            });
            
            prevBtn.addEventListener('click', function() {
                let currentIndex = showClass.indexOf(currentClass);
                let prevIndex = (currentIndex - 1 + showClass.length) % showClass.length;
                
                cube.classList.remove(currentClass);
                currentClass = showClass[prevIndex];
                cube.classList.add(currentClass);
            });
            
            // Auto rotate every 5 seconds
            setInterval(function() {
                let currentIndex = showClass.indexOf(currentClass);
                let nextIndex = (currentIndex + 1) % showClass.length;
                
                cube.classList.remove(currentClass);
                currentClass = showClass[nextIndex];
                cube.classList.add(currentClass);
            }, 5000);
        }
    }
}); 