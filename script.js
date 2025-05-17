// loading dom fully before js execution
document.addEventListener('DOMContentLoaded', function() {

    // element ref
    const video = document.getElementById('Oldpc-vid');
    const vidContainer = document.querySelector('.vid-container');
    const popupOverlay = document.getElementById('popup-overlay');
    const replayBtn = document.getElementById('replay-btn');
    const closeBtn = document.querySelector('.exit-btn');
    

    let videoPlayed = false;
    
    // mouse event handler
    vidContainer.addEventListener('mouseenter', function() {
        if (!videoPlayed) {
            // fallback message
            video.play().catch(error => {
                console.error("Video play failed:", error);
                
            });
            videoPlayed = true;
        }
    });

    // ending of video handler
    video.addEventListener('ended', function() {
        popupOverlay.style.display = 'flex';
    });
    
    // replay button handler
    replayBtn.addEventListener('click', function() {
        resetAndReplayVideo();
    });
    
    // close button handler
    closeBtn.addEventListener('click', function() {
        resetAndReplayVideo();
    });
    
    // video reset function
    function resetAndReplayVideo() {
        popupOverlay.style.display = 'none';
        video.currentTime = 0;
        videoPlayed = false;
        
        video.play().catch(error => {
            console.log("Autoplay blocked - waiting for user interaction");
            // fallback for autoplay restrictions
            vidContainer.addEventListener('click', function onClick() {
                video.play();
                vidContainer.removeEventListener('click', onClick);
            }, { once: true });
        });
    }
});