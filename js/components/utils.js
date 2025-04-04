/**
 * Utilities Component
 * Handles utility functions like back-to-top, counters, and notices
 */
const Utils = {
    init: function() {
        this.initBackToTop();
        this.initCounters();
        this.initNotices();
    },
    
    initBackToTop: function() {
        // Back to top button
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        
        $('.back-to-top').click(function() {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });
    },
    
    initCounters: function() {
        // Counter animation
        $('.counter').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    },
    
    initNotices: function() {
        // Add notice about registration
        function showNotice() {
            let notice = $('<div class="floating-notice">Admissions open for 2025-26! <a href="#">Register Now</a></div>');
            $('body').append(notice);
            
            setTimeout(function() {
                notice.addClass('show');
            }, 1000);
            
            $('.floating-notice a').on('click', function(e) {
                e.preventDefault();
                notice.removeClass('show');
                setTimeout(function() {
                    notice.remove();
                }, 500);
            });
        }
        
        // Show notice after 3 seconds
        setTimeout(showNotice, 3000);
    }
}; 