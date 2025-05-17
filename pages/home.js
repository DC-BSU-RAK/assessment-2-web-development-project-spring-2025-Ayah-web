// load dom fully before executing js
document.addEventListener('DOMContentLoaded', function() {
  
    // get ref to element
    const exitBtn = document.querySelector('.exit-btn');
    // exit button function
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {

            // confirmation dialog
            if (confirm('Do you want to close this window?')) {
                const welcomeTab = document.querySelector('.welcome-tab');

                // fade out transition
                welcomeTab.style.transition = 'opacity 0.3s ease';
                welcomeTab.style.opacity = '0';
                
                // after fade, element is hidden
                setTimeout(() => {
                    welcomeTab.style.display = 'none';
                }, 300);
            }
        });
    }
});