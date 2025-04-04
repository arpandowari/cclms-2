/**
 * Navigation Component
 * Handles navigation functionality including active states, smooth scrolling, and sticky navbar
 */
const Navigation = {
    init: function() {
        // Navbar active class toggle on click
        $('.navbar-nav .nav-link').on('click', function() {
            $('.navbar-nav .nav-link').removeClass('active');
            $(this).addClass('active');
        });

        // Enhanced smooth scrolling for all anchor links
        $('.navbar-nav .nav-link[href*="#"]').on('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').split('#')[1];
            const target = $('#' + targetId);
            
            if (target.length) {
                // Calculate header height for proper offset
                const headerHeight = $('.navbar').outerHeight() + 20;
                
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 800, function() {
                    // Callback after animation - update hash
                    window.location.hash = targetId;
                });
            }
        });
        
        // Mobile menu collapse after click
        $('.navbar-nav>li>a').on('click', function(){
            $('.navbar-collapse').collapse('hide');
        });
        
        // Modern sticky navbar on scroll
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('.main-nav').addClass('navbar-scrolled');
                // Hide top bar on scroll
                $('.top-bar').addClass('top-bar-hidden');
                // Add scrolled class to body for spacing
                $('body').addClass('scrolled');
            } else {
                $('.main-nav').removeClass('navbar-scrolled');
                // Show top bar when back at top
                $('.top-bar').removeClass('top-bar-hidden');
                // Remove scrolled class from body
                $('body').removeClass('scrolled');
            }
            
            // Update active nav link on scroll
            this.updateActiveNavOnScroll();
        }.bind(this));
        
        // Initialize the active nav based on initial scroll position
        this.updateActiveNavOnScroll();
    },
    
    // Update active navigation link based on scroll position
    updateActiveNavOnScroll: function() {
        const scrollPosition = $(window).scrollTop() + 200; // Adding offset for better UX
        
        // Check each section and update nav accordingly
        $('section, div[id$="-component"], div[id$="-section"]').each(function() {
            const currentSection = $(this);
            const sectionTop = currentSection.offset().top;
            const sectionBottom = sectionTop + currentSection.outerHeight();
            const sectionId = currentSection.attr('id');
            
            // If no ID or not a main section, skip
            if (!sectionId) return;
            
            // Check if we're currently scrolled to this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                
                // Find links that point to this section and activate them
                const $navLinks = $('.navbar-nav .nav-link[href*="#' + sectionId + '"]');
                if ($navLinks.length) {
                    $navLinks.addClass('active');
                }
            }
        });
    }
}; 