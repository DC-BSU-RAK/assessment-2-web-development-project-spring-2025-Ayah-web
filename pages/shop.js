// load dom
document.addEventListener('DOMContentLoaded', function() {

    // update confirmation dialog
    const proceed = confirm('System has updated to Windows ME\n\nDo you want to proceed to Get Windows page?');
    
    if (proceed) {
        window.open('https://www.microsoft.com/en-us/windows/help-me-choose', '_blank');
    }

    // get ref to upgrade button
    const upgradeBtn = document.querySelector('.upgrade-btn');

    // if upgrade button exists, event listener added
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // open link in new tab
            window.open(this.href, '_blank');
        });
    }

    // get ref to exit button element
    const exitBtn = document.querySelector('.exit-btn');

    // if exit button exists, even listener added
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            if (confirm('Do you want to close this window?')) {
                const shopTab = document.querySelector('.shop-tab');

                // fade out animation
                shopTab.style.transition = 'opacity 0.3s ease';
                shopTab.style.opacity = '0';
                
                setTimeout(() => {
                    shopTab.style.display = 'none';
                }, 300);
            }
        });
    }
});