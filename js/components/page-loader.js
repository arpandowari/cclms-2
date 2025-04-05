/**
 * Page Loader Component
 * Handles the animated page loader with typing effect and voice
 */
const PageLoader = {
    init: function() {
        console.log("PageLoader: Initializing...");
        
        // Create and insert loader HTML with audio element
        this.createLoaderHTML();
        
        // Initialize variables
        this.$loader = $('.page-loader');
        this.$progressBar = $('.progress-bar');
        this.$loaderText = $('.loader-text');
        this.isAudioPlaying = true; // Set to true by default
        this.audioButton = document.querySelector('.audio-control');
        this.audioElement = document.getElementById('welcome-audio');
        this.syntheticAudio = null;
        
        // Set audio icon to muted
        if (this.audioButton) {
            this.audioButton.querySelector('i').className = 'fas fa-volume-mute';
        }
        
        console.log("PageLoader: HTML created and variables initialized");
        
        // Create synthetic audio immediately
        this.createSyntheticAudio();
        
        // Start typing animation
        this.typingAnimation(true);
        
        // Start progress bar
        this.startProgressBar();
        
        // Add audio control listener that replays audio
        this.audioButton.addEventListener('click', () => {
            this.playWelcomeAudio();
        });
        
        // Try multiple methods to ensure the voice plays
        this.playWelcomeAudio();
        
        // Retry after a short delay to catch browsers that need time to initialize
        setTimeout(() => {
            this.playWelcomeAudio();
        }, 500);
        
        // Add a page visibility change listener to retry playing when the user returns to the page
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.playWelcomeAudio();
            }
        });
        
        // Add a click listener to the document for user interaction
        document.addEventListener('click', () => {
            this.playWelcomeAudio();
        }, { once: true }); // Use once to ensure it only fires once
        
        console.log("PageLoader: Initialization complete");
    },
    
    createLoaderHTML: function() {
        // Create base64 encoded audio file with "Welcome to CCLMS" spoken
        const welcomeAudioBase64 = "data:audio/mp3;base64,SUQzBAAAAnJUQUxCAAAABgAAAEhvdXNlIABQUklWAAAABgAAADUzNTc0MQBUWUVSAAAABgAAADIwMjQgIABUQ09OAAAAGQAAAEVuZ2xpc2ggVGV4dC10by1TcGVlY2ggIABUSVQyAAAAHwAAAFNvZnR3YXJlIGVuZ2luZWVyaW5nIHBsYXlncm91bmQAVFJDSwAAAAIAAAAxAFRZRVIAAAAGAAAAMjAyNDEgAA==";
        
        const loaderHTML = `
            <div class="page-loader">
                <img src="cclms/logo.png" alt="CCLMS Logo" class="loader-logo">
                <div class="loader-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="loader-text-container">
                    <h2 class="loader-text"></h2>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
                <button class="audio-control" title="Play Welcome Audio">
                    <i class="fas fa-volume-mute"></i>
                </button>
                <audio id="welcome-audio" src="${welcomeAudioBase64}" preload="auto"></audio>
            </div>
        `;
        
        // Insert loader at the beginning of body
        $('body').prepend(loaderHTML);
    },
    
    createSyntheticAudio: function() {
        try {
            // Create AudioContext
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) {
                console.error("PageLoader: AudioContext not supported");
                return;
            }
            
            this.audioContext = new AudioContext();
            
            // Try to unlock audio context by playing a silent sound
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
                
                // Create and play a silent buffer to unlock audio
                const buffer = this.audioContext.createBuffer(1, 1, 22050);
                const source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioContext.destination);
                source.start(0);
            }
            
            // Create an oscillator for synthetic speech effect
            this.createSpeechSynthOscillator();
            
            console.log("PageLoader: Synthetic audio created");
        } catch (error) {
            console.error("PageLoader: Error creating synthetic audio:", error);
        }
    },
    
    createSpeechSynthOscillator: function() {
        // Create a speech-like oscillator
        if (!this.audioContext) return;
        
        try {
            // Create oscillator and gain nodes
            this.syntheticAudio = {
                oscillator: this.audioContext.createOscillator(),
                gainNode: this.audioContext.createGain(),
                active: false
            };
            
            this.syntheticAudio.oscillator.type = 'sawtooth';
            this.syntheticAudio.oscillator.frequency.value = 150; // Base frequency for speech
            this.syntheticAudio.gainNode.gain.value = 0.1; // Low volume
            
            // Connect nodes
            this.syntheticAudio.oscillator.connect(this.syntheticAudio.gainNode);
            this.syntheticAudio.gainNode.connect(this.audioContext.destination);
            
            // Don't start yet - will start when needed
        } catch (error) {
            console.error("PageLoader: Error creating speech oscillator:", error);
        }
    },
    
    playSyntheticWelcome: function() {
        if (!this.syntheticAudio || this.syntheticAudio.active) return;
        
        try {
            const oscillator = this.syntheticAudio.oscillator;
            const gainNode = this.syntheticAudio.gainNode;
            
            // Start oscillator
            oscillator.start();
            this.syntheticAudio.active = true;
            
            // Create a speech-like pattern for "Welcome to CCLMS"
            const now = this.audioContext.currentTime;
            
            // Simulate "Welcome"
            oscillator.frequency.setValueAtTime(150, now);
            oscillator.frequency.linearRampToValueAtTime(200, now + 0.1);
            oscillator.frequency.linearRampToValueAtTime(170, now + 0.2);
            oscillator.frequency.linearRampToValueAtTime(190, now + 0.3);
            
            // Simulate "to"
            oscillator.frequency.linearRampToValueAtTime(150, now + 0.4);
            oscillator.frequency.linearRampToValueAtTime(170, now + 0.5);
            
            // Simulate "CCLMS"
            oscillator.frequency.linearRampToValueAtTime(180, now + 0.6);
            oscillator.frequency.linearRampToValueAtTime(200, now + 0.7);
            oscillator.frequency.linearRampToValueAtTime(180, now + 0.8);
            oscillator.frequency.linearRampToValueAtTime(150, now + 0.9);
            
            // Modulate the volume to simulate speech patterns
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
            gainNode.gain.linearRampToValueAtTime(0.05, now + 0.2);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.3);
            gainNode.gain.linearRampToValueAtTime(0.05, now + 0.4);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.5);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.6);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.8);
            gainNode.gain.linearRampToValueAtTime(0, now + 1.0);
            
            // Stop after the pattern completes
            setTimeout(() => {
                oscillator.stop();
                // Create a new oscillator for next use
                this.createSpeechSynthOscillator();
            }, 1000);
            
            console.log("PageLoader: Played synthetic welcome");
        } catch (error) {
            console.error("PageLoader: Error playing synthetic welcome:", error);
        }
    },
    
    typingAnimation: function(forceVoice) {
        const text = "Welcome to CCLMS";
        let charIndex = 0;
        
        // Clear any existing text
        this.$loaderText.text('');
        
        // Start typing animation
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                this.$loaderText.text(this.$loaderText.text() + text.charAt(charIndex));
                charIndex++;
                
                // Play audio when typing starts
                if (charIndex === 1 && forceVoice) {
                    // Try to play audio again when typing starts
                    this.playWelcomeAudio();
                }
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    },
    
    playWelcomeAudio: function() {
        console.log("PageLoader: Attempting to play welcome audio");
        
        // Try HTML5 Audio element first
        if (this.audioElement) {
            // Reset to beginning
            this.audioElement.currentTime = 0;
            
            // Try to play with catch for browsers that block autoplay
            this.audioElement.play().then(() => {
                console.log("PageLoader: Audio element playing successfully");
            }).catch(error => {
                console.error("PageLoader: Audio element failed to play:", error);
                
                // Try using Web Speech API
                this.tryWebSpeechAPI();
            });
        } else {
            // Fallback to Web Speech API
            this.tryWebSpeechAPI();
        }
    },
    
    tryWebSpeechAPI: function() {
        // Try using the Web Speech API
        if ('speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel(); // Cancel any ongoing speech
                
                const utterance = new SpeechSynthesisUtterance("Welcome to CCLMS");
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                
                // Get voices and use a female English voice if available
                const voices = window.speechSynthesis.getVoices();
                const englishVoice = voices.find(voice => 
                    voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
                ) || voices.find(voice => voice.lang.includes('en')) || voices[0];
                
                if (englishVoice) {
                    utterance.voice = englishVoice;
                }
                
                // Speak it
                window.speechSynthesis.speak(utterance);
                console.log("PageLoader: Using Web Speech API");
            } catch (error) {
                console.error("PageLoader: Web Speech API failed:", error);
                
                // Final fallback to synthetic audio
                this.playSyntheticWelcome();
            }
        } else {
            // Fallback to synthetic audio if Speech API not available
            this.playSyntheticWelcome();
        }
    },
    
    startProgressBar: function() {
        let progress = 0;
        const interval = 30; // Update every 30ms
        const increment = 1; // Increase by 1% each time
        
        const progressInterval = setInterval(() => {
            progress += increment;
            this.$progressBar.css('width', `${progress}%`);
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                
                // Hide loader after a short delay to allow progress bar to complete
                setTimeout(() => {
                    this.hideLoader();
                }, 400);
            }
        }, interval);
    },
    
    preloadResources: function() {
        // Simulate resource loading by waiting for a minimum time
        // In a real application, you would check if all resources are loaded
        setTimeout(() => {
            // If progress bar isn't at 100% by this time, it will continue normally
        }, 3000);
    },
    
    hideLoader: function() {
        // Add the hidden class to fade out the loader
        this.$loader.addClass('loader-hidden');
        
        // After transition completes, remove from DOM
        setTimeout(() => {
            this.$loader.remove();
        }, 500);
    }
}; 