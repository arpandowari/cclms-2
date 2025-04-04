/**
 * Admission Card Component
 * Handles the floating admission card display and interaction
 */
const AdmissionCard = {
    init: function() {
        // Immediately show the admission card
        $('.glass-card').removeClass('hidden');
        
        // Admission card close functionality
        $('#closeAdmissionCard').on('click', function() {
            $('.glass-card').addClass('hidden');
            
            // Store in local storage that the user closed the card
            localStorage.setItem('admissionCardClosed', 'true');
            localStorage.setItem('admissionCardClosedTime', Date.now().toString());
            
            return false;
        });
        
        // Check if admission card was previously closed
        if (localStorage.getItem('admissionCardClosed')) {
            $('.glass-card').addClass('hidden');
        }
        
        // Reset the card visibility after 1 day
        const lastClosed = localStorage.getItem('admissionCardClosedTime');
        if (lastClosed) {
            const oneDayInMs = 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(lastClosed) > oneDayInMs) {
                localStorage.removeItem('admissionCardClosed');
                localStorage.removeItem('admissionCardClosedTime');
                $('.glass-card').removeClass('hidden');
            }
        }
    }
}; 