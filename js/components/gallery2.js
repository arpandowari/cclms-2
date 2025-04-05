/**
 * Gallery Component
 * Handles gallery filtering, lightbox, and layout
 */
const Gallery = {
    init: function() {
        console.log('Gallery component init');
        
        // Initialize once the DOM is fully loaded
        $(document).ready(() => {
            // Initialize after a short delay to ensure everything is loaded
            setTimeout(() => {
                this.initIsotope();
                this.initLightbox();
                $('.gallery-preloader').fadeOut(300);
            }, 500);
        });
    },

    initIsotope: function() {
        console.log('Initializing Isotope');
        
        // Make sure Isotope is loaded
        if (typeof $.fn.isotope === 'undefined') {
            console.error('Isotope library not found!');
            return;
        }
        
        // Get the gallery grid
        const $gallery = $('.gallery-grid');
        if ($gallery.length === 0) {
            console.error('Gallery grid element not found!');
            return;
        }
        
        // Count gallery items
        const items = $gallery.find('.gallery-item');
        console.log(`Found ${items.length} gallery items`);
        
        // Count filter buttons
        const filterBtns = $('.filter-btn');
        console.log(`Found ${filterBtns.length} filter buttons`);
        
        // Initialize Isotope without waiting for images
        const $grid = $gallery.isotope({
            itemSelector: '.gallery-item',
            layoutMode: 'masonry',
            percentPosition: true,
            transitionDuration: '0.4s'
        });
        
        // Make sure all items are visible on initial load
        items.show();
        
        // Set up delegated click handler for filter buttons
        $(document).on('click', '.filter-btn', function(e) {
            e.preventDefault();
            
            const $this = $(this);
            const filterValue = $this.attr('data-filter');
            
            console.log('Filter clicked:', filterValue);
            
            // Update active state
            $('.filter-btn').removeClass('active');
            $this.addClass('active');
            
            // Handle filtering
            if (filterValue === '*') {
                items.show();
            } else {
                const className = filterValue.replace('.', '');
                items.each(function() {
                    const $item = $(this);
                    if ($item.hasClass(className)) {
                        $item.show();
                    } else {
                        $item.hide();
                    }
                });
            }
            
            // Re-layout Isotope
            $grid.isotope('layout');
            return false;
        });
        
        // Load images and update layout
        if (typeof $.fn.imagesLoaded !== 'undefined') {
            $gallery.imagesLoaded().done(function() {
                console.log('All gallery images loaded');
                $grid.isotope('layout');
            });
        }
    },
    
    initLightbox: function() {
        // Initialize GLightbox if available
        if (typeof GLightbox === 'function') {
            const lightbox = GLightbox({
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });
            console.log('GLightbox initialized');
        } else {
            console.error('GLightbox library not found!');
        }
    }
};

// Auto-initialize if this is included directly
if (typeof module === 'undefined') {
    Gallery.init();
} 