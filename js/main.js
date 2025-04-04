/**
 * Main JavaScript file
 * Imports and initializes all component modules
 */
$(document).ready(function() {
    console.log("Main.js loaded and executing...");
    
    // Initialize all components with error handling
    try {
        console.log("Initializing components from main.js");
        
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
        
        if (typeof Navigation !== 'undefined') {
            console.log("Initializing Navigation");
            Navigation.init();
        } else {
            console.error("Navigation component not found");
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
}); 