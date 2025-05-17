// loading dom
document.addEventListener('DOMContentLoaded', function() {
   
    // update confirmation dialog
    const proceed = confirm('System has updated to Windows 98\n\nDo you want to proceed to Get Windows page?');
    
    if (!proceed) {
        window.location.href = 'about.html';
        return;
    }

    // get ref for solitaire elements
    const solitaireCard = document.querySelector('.solitaire-card');
    if (solitaireCard) {
        solitaireCard.addEventListener('click', function() {
            window.open('https://www.microsoft.com/en-us/windows/get-windows-11', '_blank');
        });
    }

    // get ref to exit button element
    const exitBtn = document.querySelector('.exit-btn');

    // click handler if button exists
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            if (confirm('Do you want to close this window?')) {
                const solitaireTab = document.querySelector('.solitaire-tab');

                // fade out animation
                solitaireTab.style.transition = 'opacity 0.3s ease';
                solitaireTab.style.opacity = '0';
                
                setTimeout(() => {
                    solitaireTab.style.display = 'none';
                }, 300);
            }
        });
    }
});