document.addEventListener('DOMContentLoaded', function() {
    
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

    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let slideInterval;
    

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
    

    function initCarousel() {
        createIndicators();
        updateCarousel();
        startAutoSlide();
        

        carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        

        prevBtn.addEventListener('click', () => {
            pauseAutoSlide();
            goToPrevSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            pauseAutoSlide();
            goToNextSlide();
        });
    }
    
 
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
    
 
    function startAutoSlide() {
        pauseAutoSlide();
        slideInterval = setInterval(goToNextSlide, 5000);
    }
    
    function pauseAutoSlide() {
        clearInterval(slideInterval);
    }
    

    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoSlide();
    }, {passive: true});
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, {passive: true});
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) { 
            goToNextSlide();
        } else if (difference < -50) { 
            goToPrevSlide();
        }
    }
    
    initCarousel();
});