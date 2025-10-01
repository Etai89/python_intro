$(document).ready(function() {
    console.log("אתר זה נוצר על ידי איתי חתואל");
    window.currentSlide = 1;
    let currentSlide = window.currentSlide;
    const totalSlides = 12;
    
    // Mobile detection
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Initialize presentation
    updateSlide();
    updateProgress();
    
    // Mobile-specific initialization
    if (isMobile) {
        initMobileFeatures();
    }
    
    // Navigation event handlers
    $('#nextBtn').click(function() {
        if (currentSlide < totalSlides) {
            currentSlide++;
            window.currentSlide = currentSlide;
            updateSlide();
            updateProgress();
        }
    });
    
    $('#prevBtn').click(function() {
        if (currentSlide > 1) {
            currentSlide--;
            window.currentSlide = currentSlide;
            updateSlide();
            updateProgress();
        }
    });
    
    // Slide navigation dots
    $('.nav-dot').click(function() {
        const slideNum = parseInt($(this).data('slide'));
        currentSlide = slideNum;
        window.currentSlide = currentSlide;
        updateSlide();
        updateProgress();
    });
    
    // Keyboard navigation (desktop only)
    if (!isMobile) {
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // Left arrow - next slide (RTL)
                    if (currentSlide < totalSlides) {
                        currentSlide++;
                        window.currentSlide = currentSlide;
                        updateSlide();
                        updateProgress();
                    }
                    break;
                case 39: // Right arrow - previous slide (RTL)
                    if (currentSlide > 1) {
                        currentSlide--;
                        window.currentSlide = currentSlide;
                        updateSlide();
                        updateProgress();
                    }
                    break;
                case 32: // Spacebar - next slide
                    e.preventDefault();
                    if (currentSlide < totalSlides) {
                        currentSlide++;
                        window.currentSlide = currentSlide;
                        updateSlide();
                        updateProgress();
                    }
                    break;
                case 27: // Escape - first slide
                    currentSlide = 1;
                    window.currentSlide = currentSlide;
                    updateSlide();
                    updateProgress();
                    break;
            }
        });
    }
    
    // Update current slide
    function updateSlide() {
        // Remove active class from all slides
        $('.slide').removeClass('active prev');
        
        // Add active class to current slide
        $(`.slide[data-slide="${currentSlide}"]`).addClass('active');
        
        // Add prev class to previous slides for animation
        for (let i = 1; i < currentSlide; i++) {
            $(`.slide[data-slide="${i}"]`).addClass('prev');
        }
        
        // Update navigation dots
        $('.nav-dot').removeClass('active');
        $(`.nav-dot[data-slide="${currentSlide}"]`).addClass('active');
        
        // Update navigation buttons state
        $('#prevBtn').prop('disabled', currentSlide === 1);
        $('#nextBtn').prop('disabled', currentSlide === totalSlides);
        
        // Trigger slide-specific animations (reduced on mobile)
        if (!isMobile) {
            triggerSlideAnimations();
        } else {
            triggerMobileAnimations();
        }
        
        // Scroll to top on mobile
        if (isMobile) {
            window.scrollTo(0, 0);
        }
    }
    
    // Update progress bar and counter
    function updateProgress() {
        const progressPercent = (currentSlide / totalSlides) * 100;
        $('.progress-fill').css('width', `${progressPercent}%`);
        $('.slide-counter').text(`${currentSlide} / ${totalSlides}`);
    }
    
    // Tab functionality for code examples
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        
        // Remove active class from all tabs and content
        $('.tab-btn').removeClass('active');
        $('.tab-content').removeClass('active');
        
        // Add active class to clicked tab and corresponding content
        $(this).addClass('active');
        $(`#${tabId}`).addClass('active');
        
        // Check if content is scrollable and add indicator
        setTimeout(() => {
            const activeContent = $(`#${tabId}`);
            if (activeContent[0] && activeContent[0].scrollHeight > activeContent[0].clientHeight) {
                activeContent.addClass('scrollable');
            } else {
                activeContent.removeClass('scrollable');
            }
        }, 100);
    });
    
    // Desktop animations
    function triggerSlideAnimations() {
        const activeSlide = $('.slide.active');
        
        // Reset all animations
        activeSlide.find('.animated').removeClass('fadeInUp fadeInLeft fadeInRight fadeInDown bounceIn zoomIn');
        
        // Animate elements with delay
        setTimeout(() => {
            activeSlide.find('.feature-card').each(function(index) {
                $(this).addClass('animated fadeInUp').css('animation-delay', `${index * 0.2}s`);
            });
            
            activeSlide.find('.reason-card').each(function(index) {
                $(this).addClass('animated fadeInUp').css('animation-delay', `${index * 0.15}s`);
            });
            
            activeSlide.find('.app-card').each(function(index) {
                $(this).addClass('animated fadeInUp').css('animation-delay', `${index * 0.1}s`);
            });
            
            activeSlide.find('.market-stat').each(function(index) {
                $(this).addClass('animated fadeInLeft').css('animation-delay', `${index * 0.2}s`);
            });
            
            activeSlide.find('.trend-item').each(function(index) {
                $(this).addClass('animated fadeInRight').css('animation-delay', `${index * 0.2}s`);
            });
            
            activeSlide.find('.story-card').each(function(index) {
                $(this).addClass('animated fadeInUp').css('animation-delay', `${index * 0.3}s`);
            });
            
            activeSlide.find('.step').each(function(index) {
                $(this).addClass('animated fadeInLeft').css('animation-delay', `${index * 0.2}s`);
            });
            
            activeSlide.find('.path-level').each(function(index) {
                $(this).addClass('animated fadeInUp').css('animation-delay', `${index * 0.2}s`);
            });
            
            // Special animations for title slide
            if (currentSlide === 1) {
                activeSlide.find('.python-logo').addClass('animated bounceIn');
                activeSlide.find('.main-title').addClass('animated fadeInDown').css('animation-delay', '0.5s');
                activeSlide.find('.subtitle').addClass('animated fadeInUp').css('animation-delay', '0.8s');
                activeSlide.find('.stats-preview .stat').each(function(index) {
                    $(this).addClass('animated zoomIn').css('animation-delay', `${1 + index * 0.2}s`);
                });
            }
        }, 100);
    }
    
    // Simplified animations for mobile
    function triggerMobileAnimations() {
        const activeSlide = $('.slide.active');
        
        // Simple fade in for mobile
        activeSlide.find('.feature-card, .reason-card, .app-card, .language-example').each(function(index) {
            $(this).css('opacity', '0').animate({
                opacity: 1
            }, 300 + (index * 50));
        });
    }
    
    // Mobile-specific features
    function initMobileFeatures() {
        // Disable hover effects on mobile
        $('body').addClass('mobile-device');
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        $(document).on('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        });
        
        // Smooth scrolling for mobile
        $('html').css({
            '-webkit-overflow-scrolling': 'touch',
            'scroll-behavior': 'smooth'
        });
        
        // Mobile-friendly tap areas
        $('.nav-btn, .tab-btn, .nav-dot').css({
            'min-height': '44px',
            'min-width': '44px'
        });
    }
    
    // Enhanced touch/swipe support
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    
    $('.presentation-container').on('touchstart', function(e) {
        const touch = e.originalEvent.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startTime = Date.now();
    });
    
    $('.presentation-container').on('touchend', function(e) {
        if (!startX || !startY) return;
        
        const touch = e.originalEvent.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        const timeDiff = Date.now() - startTime;
        
        // Only register swipes if they're fast enough and long enough
        if (timeDiff < 500 && Math.abs(diffX) > 50) {
            // Make sure it's more horizontal than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    if (currentSlide < totalSlides) {
                        currentSlide++;
                        window.currentSlide = currentSlide;
                        updateSlide();
                        updateProgress();
                    }
                } else {
                    // Swipe right - previous slide
                    if (currentSlide > 1) {
                        currentSlide--;
                        window.currentSlide = currentSlide;
                        updateSlide();
                        updateProgress();
                    }
                }
            }
        }
        
        startX = 0;
        startY = 0;
        startTime = 0;
    });
    
    // Prevent default touch behaviors on navigation elements
    $('.nav-btn, .nav-dot, .tab-btn').on('touchstart touchmove', function(e) {
        e.stopPropagation();
    });
    
    // Responsive handling for orientation changes
    $(window).on('orientationchange resize', function() {
        setTimeout(function() {
            // Recalculate layout
            updateSlide();
            
            // Adjust navigation for new orientation
            const newWidth = window.innerWidth;
            if (newWidth <= 768) {
                $('body').addClass('mobile-device');
                $('.presentation-container').css('margin-top', '120px');
            } else {
                $('body').removeClass('mobile-device');
                $('.presentation-container').css('margin-top', '80px');
            }
            
            // Force repaint
            $('.slide.active').hide().show(0);
        }, 300);
    });
    
    // Smooth scrolling for internal links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // Fullscreen mode (desktop only)
    if (!isMobile) {
        $(document).keydown(function(e) {
            if (e.which === 70 && e.ctrlKey) { // Ctrl+F for fullscreen
                e.preventDefault();
                toggleFullscreen();
            }
        });
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Performance optimization - lazy load images
    function lazyLoadImages() {
        const images = $('.slide img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.each(function() {
            imageObserver.observe(this);
        });
    }
    
    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
    
    // Accessibility improvements
    $(document).ready(function() {
        // Add ARIA labels
        $('#nextBtn').attr('aria-label', 'המצגת הבאה');
        $('#prevBtn').attr('aria-label', 'המצגת הקודמת');
        $('.nav-dot').each(function(index) {
            $(this).attr('aria-label', `עבור למצגת ${index + 1}`);
        });
        
        // Focus management for mobile
        if (isMobile) {
            $('.slide.active').attr('tabindex', '0').focus();
        }
        
        // Screen reader announcements
        $('.slide-counter').attr('aria-live', 'polite');
    });
    
    // Presenter notes (desktop only)
    const presenterNotes = {
        1: "מצגת פתיחה - דגש על העתיד והאטרקטיביות של Python",
        2: "הסבר בסיסי על Python - שמור על פשטות",
        3: "יתרונות - דגש על קלות הלמידה והשכר הגבוה",
        4: "נתוני שוק - הדגש שזה לא רק טרנד זמני",
        5: "תחומי שימוש - הראה את הרב-תכליתיות",
        6: "עתיד - דגש על AI והזדמנויות חדשות",
        7: "שכר וקריירה - המספרים מדברים בעד עצמם",
        8: "השוואת שפות - הדגש את הפשטות של Python",
        9: "דוגמאות קוד - תן זמן לתלמידים לקרוא",
        10: "מבוא לתכנות - הסבר את ההתפתחות",
        11: "תקשורת רשת - חשוב לעולם המודרני",
        12: "התקנה - צעדים פרקטיים שאפשר לעשות היום"
    };
    
    // Show presenter notes on Alt+N (desktop only)
    if (!isMobile) {
        $(document).keydown(function(e) {
            if (e.altKey && e.which === 78) { // Alt+N
                e.preventDefault();
                const note = presenterNotes[currentSlide] || "אין הערות למצגת זו";
                alert(`הערות למרצה - סלייד ${currentSlide}:\n\n${note}`);
            }
        });
    }
    
    // Print mode - show all slides
    window.addEventListener('beforeprint', function() {
        $('.slide').addClass('active').removeClass('prev');
        $('.slide').css('position', 'static');
    });
    
    window.addEventListener('afterprint', function() {
        updateSlide(); // Restore normal view
    });
    
    // Performance optimization - preload next slide images
    function preloadNextSlideImages() {
        if (currentSlide < totalSlides) {
            const nextSlide = $(`.slide[data-slide="${currentSlide + 1}"]`);
            nextSlide.find('img').each(function() {
                if (!this.complete) {
                    const img = new Image();
                    img.src = $(this).attr('src');
                }
            });
        }
    }
    
    // Call preload function when slide changes
    $('.nav-dot, #nextBtn, #prevBtn').click(function() {
        setTimeout(preloadNextSlideImages, 100);
    });
    
    // Error handling for missing elements
    $(document).ready(function() {
        // Check if all required elements exist
        const requiredElements = ['.slide', '.nav-dot', '#nextBtn', '#prevBtn', '.progress-fill'];
        requiredElements.forEach(function(selector) {
            if ($(selector).length === 0) {
                console.warn(`Warning: Required element ${selector} not found`);
            }
        });
    });
    
    // Mobile debugging (development only)
    if (isMobile && window.location.hostname === 'localhost') {
        console.log('Mobile mode activated');
        console.log('Screen dimensions:', window.innerWidth, 'x', window.innerHeight);
        console.log('Device pixel ratio:', window.devicePixelRatio);
    }
    
    console.log('Python Presentation initialized successfully!');
    if (isMobile) {
        console.log('Mobile optimizations enabled');
        console.log('Use swipe gestures to navigate between slides');
    } else {
        console.log('Use arrow keys, spacebar, or click navigation to move between slides');
        console.log('Press F1 for keyboard shortcuts help');
    }
});

// Global functions for content-end navigation
function goToNextSlide() {
    const totalSlides = 12;
    const currentSlideElement = $('.slide.active');
    const currentSlideNum = parseInt(currentSlideElement.data('slide'));
    
    if (currentSlideNum < totalSlides) {
        goToSlide(currentSlideNum + 1);
    }
}

function goToSlide(slideNum) {
    const totalSlides = 12;
    if (slideNum >= 1 && slideNum <= totalSlides) {
        // Update current slide variables
        window.currentSlide = slideNum;
        
        // Remove active class from all slides
        $('.slide').removeClass('active');
        
        // Add active class to target slide
        $(`.slide[data-slide="${slideNum}"]`).addClass('active');
        
        // Update navigation dots
        $('.nav-dot').removeClass('active');
        $(`.nav-dot[data-slide="${slideNum}"]`).addClass('active');
        
        // Update progress bar
        const progress = (slideNum / totalSlides) * 100;
        $('.progress-fill').css('width', progress + '%');
        
        // Update navigation buttons
        $('#prevBtn').prop('disabled', slideNum === 1);
        $('#nextBtn').prop('disabled', slideNum === totalSlides);
        
        // Check tab content scrollability on slide change
        setTimeout(() => {
            $('.tab-content.active').each(function() {
                if (this.scrollHeight > this.clientHeight) {
                    $(this).addClass('scrollable');
                } else {
                    $(this).removeClass('scrollable');
                }
            });
            
            // Check slide content scrollability on mobile
            if ($(window).width() <= 768) {
                $('.slide.active .slide-content').each(function() {
                    if (this.scrollHeight > this.clientHeight) {
                        $(this).addClass('scrollable');
                    } else {
                        $(this).removeClass('scrollable');
                    }
                });
            }
        }, 100);
    }
    
    // Initialize scrollability check on page load
    $(document).ready(function() {
        setTimeout(() => {
            $('.tab-content.active').each(function() {
                if (this.scrollHeight > this.clientHeight) {
                    $(this).addClass('scrollable');
                } else {
                    $(this).removeClass('scrollable');
                }
            });
            
            // Check slide content scrollability on mobile
            if ($(window).width() <= 768) {
                $('.slide.active .slide-content').each(function() {
                    if (this.scrollHeight > this.clientHeight) {
                        $(this).addClass('scrollable');
                    } else {
                        $(this).removeClass('scrollable');
                    }
                });
            }
        }, 500);
    });
}