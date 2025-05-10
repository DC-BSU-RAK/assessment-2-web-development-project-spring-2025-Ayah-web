document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('Oldpc-vid');
    const vidContainer = document.querySelector('.vid-container');
    const popupOverlay = document.getElementById('popup-overlay');
    const replayBtn = document.getElementById('replay-btn');
    const closeBtn = document.querySelector('.exit-btn');
    
    let videoPlayed = false;
    
    vidContainer.addEventListener('mouseenter', function() {
        if (!videoPlayed) {
            video.play().catch(error => {
                console.error("Video play failed:", error);
                
            });
            videoPlayed = true;
        }
    });

    video.addEventListener('ended', function() {
        popupOverlay.style.display = 'flex';
    });
    
    replayBtn.addEventListener('click', function() {
        resetAndReplayVideo();
    });
    
    closeBtn.addEventListener('click', function() {
        resetAndReplayVideo();
    });
    
    function resetAndReplayVideo() {
        popupOverlay.style.display = 'none';
        video.currentTime = 0;
        videoPlayed = false;
        
        video.play().catch(error => {
            console.log("Autoplay blocked - waiting for user interaction");
            vidContainer.addEventListener('click', function onClick() {
                video.play();
                vidContainer.removeEventListener('click', onClick);
            }, { once: true });
        });
    }
});