/**
 * Back to Top Button Component
 * Handles the back to top button visibility and scroll functionality
 */

const BackToTop = {
    init: function() {
        this.cacheDOM();
        if (this.backToTopBtn) {
            this.bindEvents();
        }
    },
    
    cacheDOM: function() {
        this.backToTopBtn = document.querySelector('.back-to-top-btn');
    },
    
    bindEvents: function() {
        window.addEventListener('scroll', this.toggleButtonVisibility.bind(this));
        this.backToTopBtn.addEventListener('click', this.scrollToTop.bind(this));
    },
    
    toggleButtonVisibility: function() {
        if (window.pageYOffset > 300) {
            this.backToTopBtn.classList.add('active');
        } else {
            this.backToTopBtn.classList.remove('active');
        }
    },
    
    scrollToTop: function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    BackToTop.init();
}); 