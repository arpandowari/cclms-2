/**
 * Hero Slider Component
 * Handles the main hero carousel functionality and animations
 */
const HeroSlider = {
    init: function() {
        console.log("HeroSlider init called");
        // First check if the slider element exists
        if ($('#heroSlider').length === 0) {
            console.error("Error: #heroSlider element not found in the DOM");
            return;
        }
        
        console.log("HeroSlider element found, initializing...");
        
        // Hero Slider settings - make it slide automatically with a good interval
        $('#heroSlider').carousel({
            interval: 6000,        // 6 seconds interval
            pause: false,          // Don't pause on hover
            ride: 'carousel',      // Start cycling automatically
            wrap: true,            // Allow wrapping around
            keyboard: true         // Allow keyboard navigation
        });
        
        // The navigation buttons are hidden in CSS, but functionality remains
        // This is kept for reference and for keyboard/programmatic access
        $('.carousel-control-prev').click(function() {
            $('#heroSlider').carousel('prev');
        });
        
        $('.carousel-control-next').click(function() {
            $('#heroSlider').carousel('next');
        });
        
        // Handle slider animations
        $('#heroSlider').on('slide.bs.carousel', function(e) {
            const activeItem = $(e.relatedTarget).find('[class*="animate__"]');
            activeItem.each(function() {
                const animationClass = $(this).attr('class').match(/animate__([a-zA-Z]+)/)[0];
                $(this).removeClass(animationClass);
                
                // Re-apply animation after a tiny delay
                setTimeout(() => {
                    $(this).addClass(animationClass);
                }, 50);
            });
        });
        
        console.log("HeroSlider initialized successfully");
    }
}; 