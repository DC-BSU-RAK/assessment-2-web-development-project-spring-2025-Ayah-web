// loading dom
document.addEventListener('DOMContentLoaded', function() {
    
    // exit button functionality
    const exitBtn = document.querySelector('.exit-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            if (confirm('Do you want to close this window?')) {
                const aboutTab = document.querySelector('.about-tab');
                aboutTab.style.transition = 'opacity 0.3s ease';
                aboutTab.style.opacity = '0';
                
                setTimeout(() => {
                    aboutTab.style.display = 'none';
                }, 300);
            }
        });
    }

    // get ref for carousel elements
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let slideInterval;
    

    // nav indicator dots
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === currentIndex) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // init carousel
    function initCarousel() {
        createIndicators();
        updateCarousel();
        startAutoSlide();
        
        // pause autoslide on hover
        carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        

        // prev and next button handlers
        prevBtn.addEventListener('click', () => {
            pauseAutoSlide();
            goToPrevSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            pauseAutoSlide();
            goToNextSlide();
        });
    }
    
    // update visible slide and ind carousel
    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) {
                slide.classList.add('active');
            }
        });
        
       
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
  
    // nav to slides
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= slides.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        updateCarousel();
    }
    
    function goToPrevSlide() {
        currentIndex--;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        updateCarousel();
    }
    
    function goToNextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) currentIndex = 0;
        updateCarousel();
    }
    
    // auto-roation/slide
    function startAutoSlide() {
        pauseAutoSlide();
        slideInterval = setInterval(goToNextSlide, 5000);
    }
    
    // pause
    function pauseAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoSlide();
    }, {passive: true});
    
    // handling swipes and touch
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, {passive: true});
    
    // swipe gesture processing
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) { 
            goToNextSlide();
        } else if (difference < -50) { 
            goToPrevSlide();
        }
    }
    
    // init carousel
    initCarousel();
});