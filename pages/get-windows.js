document.addEventListener('DOMContentLoaded', function() {
   
    const proceed = confirm('System has updated to Windows 98\n\nDo you want to proceed to Get Windows page?');
    
    if (!proceed) {
        window.location.href = 'about.html';
        return;
    }

   
    const solitaireCard = document.querySelector('.solitaire-card');
    if (solitaireCard) {
        solitaireCard.addEventListener('click', function() {
            window.open('https://www.microsoft.com/en-us/windows/get-windows-11', '_blank');
        });
    }

    
    const exitBtn = document.querySelector('.exit-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', function() {
            if (confirm('Do you want to close this window?')) {
                const solitaireTab = document.querySelector('.solitaire-tab');
                solitaireTab.style.transition = 'opacity 0.3s ease';
                solitaireTab.style.opacity = '0';
                
                setTimeout(() => {
                    solitaireTab.style.display = 'none';
                }, 300);
            }
        });
    }
});