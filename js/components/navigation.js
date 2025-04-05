/**
 * Navigation Component
 * Handles navigation functionality including active states, smooth scrolling, and sticky navbar
 */
const Navigation = {
    init: function() {
        // Cache DOM elements for better performance
        this.$navbar = $('.navbar-nav');
        this.$navLinks = $('.navbar-nav .nav-link');
        this.$mainNav = $('.main-nav');
        this.$topBar = $('.top-bar');
        this.$body = $('body');

        // Single delegated event handler for all nav links
        this.$navbar.on('click', '.nav-link', this.handleNavClick.bind(this));
        
        // Modern sticky navbar on scroll with throttling
        $(window).on('scroll', this.throttle(this.handleScroll.bind(this), 10));
        
        // Initialize the active nav based on initial scroll position
        this.updateActiveNavOnScroll();
    },

    // Handle all navigation click events in one handler
    handleNavClick: function(e) {
        const $clickedLink = $(e.currentTarget);
        
        // Only process hash links
        if ($clickedLink.attr('href').includes('#')) {
            e.preventDefault();
            
            // Remove active class from all links and add to clicked link
            this.$navLinks.removeClass('active');
            $clickedLink.addClass('active');
            
            // Get target section
            const targetId = $clickedLink.attr('href').split('#')[1];
            const $target = $('#' + targetId);
            
            if ($target.length) {
                // Calculate header height for proper offset
                const headerHeight = $('.navbar').outerHeight() + 20;
                
                // Immediately hide mobile menu if open
                $('.navbar-collapse').collapse('hide');
                
                // Perform smooth scroll with better performance
                $('html, body').animate({
                    scrollTop: $target.offset().top - headerHeight
                }, 500, function() {
                    // Update URL hash after animation completes
                    window.history.pushState(null, null, '#' + targetId);
                });
            }
        }
    },
    
    // Handle scroll events with improved performance
    handleScroll: function() {
        const scrollPosition = $(window).scrollTop();
        
        // Sticky navbar logic
        if (scrollPosition > 100) {
            this.$mainNav.addClass('navbar-scrolled');
            this.$topBar.addClass('top-bar-hidden');
            this.$body.addClass('scrolled');
        } else {
            this.$mainNav.removeClass('navbar-scrolled');
            this.$topBar.removeClass('top-bar-hidden');
            this.$body.removeClass('scrolled');
        }
        
        // Update active nav link on scroll
        this.updateActiveNavOnScroll();
    },
    
    // Update active navigation link based on scroll position
    updateActiveNavOnScroll: function() {
        const scrollPosition = $(window).scrollTop() + 200; // Adding offset for better UX
        
        // Check each section and update nav accordingly
        $('section, div[id$="-component"], div[id$="-section"]').each(function() {
            const currentSection = $(this);
            const sectionId = currentSection.attr('id');
            
            // If no ID or not a main section, skip
            if (!sectionId) return;
            
            const sectionTop = currentSection.offset().top;
            const sectionBottom = sectionTop + currentSection.outerHeight();
            
            // Check if we're currently scrolled to this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                
                // Find links that point to this section and activate them
                $('.navbar-nav .nav-link[href*="#' + sectionId + '"]').addClass('active');
            }
        });
    },
    
    // Throttle function to limit execution frequency
    throttle: function(func, delay) {
        let lastCall = 0;
        return function() {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return func.apply(this, arguments);
        };
    }
}; 