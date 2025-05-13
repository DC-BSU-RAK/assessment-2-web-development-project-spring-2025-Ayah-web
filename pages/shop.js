document.addEventListener('DOMContentLoaded', function() {

    const proceed = confirm('System has updated to Windows ME\n\nDo you want to proceed to Get Windows page?');
    
    if (proceed) {
        window.open('https://www.microsoft.com/en-us/windows/help-me-choose', '_blank');
    }


    const upgradeBtn = document.querySelector('.upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    }


    const exitBtn = document.querySelector('.exit-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            if (confirm('Do you want to close this window?')) {
                const shopTab = document.querySelector('.shop-tab');
                shopTab.style.transition = 'opacity 0.3s ease';
                shopTab.style.opacity = '0';
                
                setTimeout(() => {
                    shopTab.style.display = 'none';
                }, 300);
            }
        });
    }
});