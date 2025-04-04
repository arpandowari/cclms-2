/**
 * Testimonials Component
 * Handles the testimonial carousel functionality
 */
const Testimonials = {
    init: function() {
        // Testimonial carousel settings
        $('#testimonialCarousel').carousel({
            interval: 5000,
            pause: 'hover'
        });
    }
}; 