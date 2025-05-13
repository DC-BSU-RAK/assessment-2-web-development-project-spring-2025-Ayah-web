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
});