/**
 * Contact Section Component
 * Handles 3D effects, form interactions and animations
 */
const ContactSection = {
    init: function() {
        if (!this.isComponentAvailable()) {
            console.log('Contact section not found in DOM');
            return;
        }
        
        console.log('Initializing Contact component with 3D effects');
        this.cacheDOM();
        this.bindEvents();
        this.initFormValidation();
        this.setupGlowEffects();
        this.initFocusEffects();
    },
    
    isComponentAvailable: function() {
        return document.querySelector('.contact-section') !== null;
    },
    
    cacheDOM: function() {
        this.contactSection = document.querySelector('.contact-section');
        this.contactInfoCard = document.querySelector('.contact-info-card');
        this.cardGlow = document.querySelector('.card-glow');
        this.contactForm = document.getElementById('contactForm');
        this.submitBtn = document.querySelector('.submit-btn');
        this.formInputs = document.querySelectorAll('.glass-input');
        this.mapContainer = document.querySelector('.map-container');
        this.socialButtons = document.querySelectorAll('.social-btn');
        this.formStatusIndicator = document.querySelector('.form-status-indicator');
        this.statusText = document.querySelector('.status-text');
        this.loadingSpinner = document.querySelector('.spinner-border');
    },
    
    initFocusEffects: function() {
        // Add focus/blur event listeners to activate depth effects
        this.formInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            
            input.addEventListener('focus', () => {
                if (formGroup) {
                    formGroup.classList.add('focused');
                }
            });
            
            input.addEventListener('blur', () => {
                if (formGroup) {
                    formGroup.classList.remove('focused');
                }
            });
        });
        
        // Add floating highlight on contact-form-card
        const contactFormCard = document.querySelector('.contact-form-card');
        if (contactFormCard) {
            contactFormCard.addEventListener('mousemove', (e) => {
                const rect = contactFormCard.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                // Apply gradient highlight based on mouse position
                contactFormCard.style.setProperty('--x', `${x}%`);
                contactFormCard.style.setProperty('--y', `${y}%`);
                
                // Apply subtle rotation
                const rotateY = ((x / 100) - 0.5) * 2; // -1 to 1 degrees
                const rotateX = ((y / 100) - 0.5) * -2; // -1 to 1 degrees
                contactFormCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
            });
            
            contactFormCard.addEventListener('mouseleave', () => {
                // Reset rotation
                contactFormCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            });
        }
    },
    
    bindEvents: function() {
        // Card 3D hover effect
        if (this.contactInfoCard) {
            this.contactInfoCard.addEventListener('mousemove', this.handleCardMouseMove.bind(this));
            this.contactInfoCard.addEventListener('mouseleave', this.handleCardMouseLeave.bind(this));
        }
        
        // Form interactions
        if (this.formInputs.length) {
            this.formInputs.forEach(input => {
                input.addEventListener('focus', this.handleInputFocus.bind(this));
                input.addEventListener('blur', this.handleInputBlur.bind(this));
            });
        }
        
        // Form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
        
        // Parallax effect on scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Window resize event
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Program select change handler
        const programSelect = document.getElementById('program');
        if (programSelect) {
            programSelect.addEventListener('change', this.handleProgramChange.bind(this));
        }
        
        // Initialize input label animations
        this.initInputLabelAnimations();
    },
    
    initInputLabelAnimations: function() {
        // Apply initial state to inputs that might already have values
        this.formInputs.forEach(input => {
            if (input.value !== '') {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.classList.add('active');
                }
            }
            
            // Add animation effect to labels when typing
            input.addEventListener('input', () => {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    if (input.value !== '') {
                        label.classList.add('active');
                    } else {
                        label.classList.remove('active');
                    }
                }
            });
        });
    },
    
    handleCardMouseMove: function(e) {
        if (!this.cardGlow) return;
        
        const rect = this.contactInfoCard.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate position in percentage
        const x = (mouseX / rect.width) * 100;
        const y = (mouseY / rect.height) * 100;
        
        // Update CSS variables for glow effect
        this.contactInfoCard.style.setProperty('--mouse-x', `${x}%`);
        this.contactInfoCard.style.setProperty('--mouse-y', `${y}%`);
        
        // Calculate rotation angles (limited to small range for subtle effect)
        const rotateY = ((mouseX / rect.width) - 0.5) * 4; // -2 to 2 degrees
        const rotateX = ((mouseY / rect.height) - 0.5) * -4; // -2 to 2 degrees
        
        // Apply 3D rotation
        this.contactInfoCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        
        // Show glow effect
        this.cardGlow.style.opacity = '1';
    },
    
    handleCardMouseLeave: function() {
        // Reset card rotation
        this.contactInfoCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        
        // Hide glow effect
        if (this.cardGlow) {
            this.cardGlow.style.opacity = '0';
        }
    },
    
    handleInputFocus: function(e) {
        // Add focus class to parent form-group
        const formGroup = e.target.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('focused');
            
            // Enhance depth effect
            if (formGroup.classList.contains('depth-effect')) {
                e.target.style.transform = 'translateZ(10px)';
            }
            
            // Animate focus indicator
            const indicator = formGroup.querySelector('.input-focus-indicator');
            if (indicator) {
                indicator.style.width = '100%';
            }
        }
    },
    
    handleInputBlur: function(e) {
        // Remove focus class from parent form-group
        const formGroup = e.target.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('focused');
            
            // Reset depth effect
            if (formGroup.classList.contains('depth-effect')) {
                e.target.style.transform = 'translateZ(0)';
            }
            
            // Reset focus indicator if the input is empty
            if (e.target.value === '') {
                const indicator = formGroup.querySelector('.input-focus-indicator');
                if (indicator) {
                    indicator.style.width = '0';
                }
            }
        }
    },
    
    handleProgramChange: function(e) {
        const programValue = e.target.value;
        const inquirySelect = document.getElementById('inquiry');
        
        // Pre-fill inquiry options based on selected program
        if (inquirySelect) {
            // Reset inquiry select
            inquirySelect.selectedIndex = 0;
            
            // If a specific program is selected, highlight relevant inquiry options
            if (programValue && programValue !== 'other') {
                // Add visual indication to relevant inquiry options (e.g., admission, fees)
                Array.from(inquirySelect.options).forEach(option => {
                    if (option.value === 'admission' || option.value === 'fees' || option.value === 'scholarship') {
                        option.classList.add('recommended-option');
                    } else {
                        option.classList.remove('recommended-option');
                    }
                });
            } else {
                // Remove highlighting if "Other Programs" is selected
                Array.from(inquirySelect.options).forEach(option => {
                    option.classList.remove('recommended-option');
                });
            }
        }
    },
    
    handleFormSubmit: function(e) {
        e.preventDefault();
        
        // Check if form is valid
        if (!this.validateForm()) {
            console.log('Form validation failed');
            this.updateFormStatus('error', 'Please fill in all required fields correctly.');
            return;
        }
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            program: document.getElementById('program').value,
            inquiryType: document.getElementById('inquiry').value,
            city: document.getElementById('city').value,
            message: document.getElementById('message').value,
            consent: document.getElementById('consent').checked
        };
        
        // Add loading state to button and show spinner
        this.submitBtn.disabled = true;
        this.submitBtn.querySelector('span').textContent = 'Processing...';
        this.submitBtn.querySelector('i').className = 'fas fa-circle-notch fa-spin ms-2';
        
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.remove('d-none');
        }
        this.updateFormStatus('', 'Submitting your request...');
        
        // Simulate form submission (replace with actual AJAX call in production)
        setTimeout(() => {
            // Log form data to console (for development purposes)
            console.log('Form Data:', formData);
            
            // Show success state
            this.submitBtn.querySelector('span').textContent = 'Request Submitted!';
            this.submitBtn.querySelector('i').className = 'fas fa-check ms-2';
            this.submitBtn.classList.add('btn-success');
            
            if (this.loadingSpinner) {
                this.loadingSpinner.classList.add('d-none');
            }
            this.updateFormStatus('success', 'Your request has been successfully submitted. We will contact you soon!');
            
            // Show success message
            this.showSuccessMessage(formData.name);
            
            // Reset the form after successful submission
            setTimeout(() => {
                this.contactForm.reset();
                this.submitBtn.disabled = false;
                this.submitBtn.querySelector('span').textContent = 'Submit Request';
                this.submitBtn.querySelector('i').className = 'fas fa-paper-plane ms-2';
                this.submitBtn.classList.remove('btn-success');
                
                // Reset all focus indicators
                const indicators = document.querySelectorAll('.input-focus-indicator');
                indicators.forEach(indicator => {
                    indicator.style.width = '0';
                });
                
                // Remove success message after delay
                const successMessage = document.querySelector('.submission-success-message');
                if (successMessage) {
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }
                
                this.updateFormStatus('', '');
            }, 4000);
        }, 2000);
    },
    
    updateFormStatus: function(type, message) {
        if (this.statusText) {
            this.statusText.textContent = message;
            this.statusText.className = 'status-text';
            if (type) {
                this.statusText.classList.add(type);
            }
        }
    },
    
    showSuccessMessage: function(name) {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'submission-success-message card-3d';
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h4>Thank You, ${name}!</h4>
            <p>Your information request has been submitted successfully.</p>
            <p>Our admissions team will contact you within 24 hours.</p>
        `;
        
        // Insert after the form
        this.contactForm.parentNode.appendChild(successMessage);
        
        // Animate entrance
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100);
    },
    
    validateForm: function() {
        let isValid = true;
        
        // Simple validation
        this.formInputs.forEach(input => {
            // Skip check for optionals
            if (input.getAttribute('required') === null) return;
            
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearError(input);
                
                // Validate email format
                if (input.type === 'email' && !this.isValidEmail(input.value)) {
                    this.showError(input, 'Please enter a valid email address');
                    isValid = false;
                }
                
                // Validate phone number (basic validation)
                if (input.id === 'phone' && !this.isValidPhone(input.value)) {
                    this.showError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });
        
        // Check the consent checkbox
        const consentCheckbox = document.getElementById('consent');
        if (consentCheckbox && !consentCheckbox.checked) {
            isValid = false;
            this.showError(consentCheckbox, 'You must agree to the privacy policy');
        }
        
        return isValid;
    },
    
    isValidPhone: function(phone) {
        // Basic phone validation - at least 10 digits
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        return phoneRegex.test(phone.replace(/[\s-]/g, ''));
    },
    
    showError: function(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('is-invalid');
            
            // Create or update error message
            let errorElement = formGroup.querySelector('.invalid-feedback');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'invalid-feedback';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = message;
            
            // Show the error message
            errorElement.style.display = 'block';
        }
    },
    
    clearError: function(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('is-invalid');
            
            // Hide error message if exists
            const errorElement = formGroup.querySelector('.invalid-feedback');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
    },
    
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    handleScroll: function() {
        if (!this.contactSection) return;
        
        const scrollY = window.scrollY || window.pageYOffset;
        const rect = this.contactSection.getBoundingClientRect();
        
        // Check if section is visible in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Calculate the parallax effect
            const parallaxRate = scrollY * 0.1;
            
            // Apply parallax movement to floating shapes
            const shapes = document.querySelectorAll('.floating-shape');
            shapes.forEach((shape, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                const speed = 0.05 * (index + 1);
                shape.style.transform = `translate(${direction * parallaxRate * speed}px, ${parallaxRate * speed}px)`;
            });
        }
    },
    
    setupGlowEffects: function() {
        // Setup map container hover effect
        if (this.mapContainer) {
            this.mapContainer.addEventListener('mousemove', (e) => {
                const rect = this.mapContainer.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                // Calculate rotation angles
                const rotateY = ((mouseX / rect.width) - 0.5) * 2;
                const rotateX = ((mouseY / rect.height) - 0.5) * -2;
                
                this.mapContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            this.mapContainer.addEventListener('mouseleave', () => {
                this.mapContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        }
        
        // Setup social button hover effects
        if (this.socialButtons.length) {
            this.socialButtons.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    btn.style.transform = 'translateY(-3px)';
                });
                
                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translateY(0)';
                });
            });
        }
    },
    
    handleResize: function() {
        // Disable 3D effects on smaller screens
        if (window.innerWidth < 768) {
            if (this.contactInfoCard) {
                this.contactInfoCard.style.transform = 'none';
            }
            
            if (this.mapContainer) {
                this.mapContainer.style.transform = 'none';
            }
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ContactSection.init();
});

// Make the component globally available
window.ContactSection = ContactSection; 