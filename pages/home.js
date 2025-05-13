document.addEventListener('DOMContentLoaded', function() {
  
    const exitBtn = document.querySelector('.exit-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            if (confirm('Do you want to close this window?')) {
                const welcomeTab = document.querySelector('.welcome-tab');
                welcomeTab.style.transition = 'opacity 0.3s ease';
                welcomeTab.style.opacity = '0';
                
                setTimeout(() => {
                    welcomeTab.style.display = 'none';
                }, 300);
            }
        });
    }
});