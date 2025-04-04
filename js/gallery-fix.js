/**
 * Gallery Fix Script
 * This script fixes click issues with gallery filter buttons
 */
$(document).ready(function() {
    // Wait a moment for everything to load
    setTimeout(function() {
        console.log('Gallery fix script running');
        
        // Set up delegated click handler for filter buttons
        $(document).off('click', '.filter-btn').on('click', '.filter-btn', function(e) {
            e.preventDefault();
            
            const $this = $(this);
            const filterValue = $this.attr('data-filter');
            
            console.log('Filter clicked from fix script:', filterValue);
            
            // Update active state
            $('.filter-btn').removeClass('active');
            $this.addClass('active');
            
            // Get all items
            const items = $('.gallery-item');
            
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
            
            // Force Isotope layout update if available
            if ($('.gallery-grid').data('isotope')) {
                $('.gallery-grid').isotope('layout');
            }
            
            return false;
        });
        
        console.log('Gallery fix script initialized');
    }, 1000);
}); 