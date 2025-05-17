// loading  dom fully before js execution
document.addEventListener('DOMContentLoaded', function() {
    
    // element ref
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    // stating variables
    let isPainting = false;
    let currentColor = '#000000';
    let isErasing = false;
    
    // function to resize canvas to fit windows dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 30; 
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // init canvas and resize event handler
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // when mouse is pressed, start painting
    function startPosition(e) {
        isPainting = true;
        draw(e);
    }
    
    // when mouse is released, painting stops
    function endPosition() {
        isPainting = false;
        ctx.beginPath();
    }
    
    // main function drawing
    function draw(e) {

        // only paint with pressed mouse
        if (!isPainting) return;
        
        // round line
        ctx.lineCap = 'round';
        
        // if in erasing mode
        if (isErasing) {
            
            // clears pixels
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        } else {
            
            // drawing mode
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 5;
        }
        
        // calculating canvas coordinates
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // drawing line at current pos
        ctx.lineTo(x, y);
        ctx.stroke();
        // begin new path at current pos
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    // colour selections from options
    document.querySelectorAll('.color-option').forEach(color => {
        color.addEventListener('click', function() {
            // switching to draw mode
            isErasing = false;
            document.getElementById('erase-btn').classList.remove('active');
            currentColor = this.style.backgroundColor;
            updateCursor();
        });
    });

    // toggling eraser mode
    document.getElementById('erase-btn').addEventListener('click', function() {
        isErasing = !isErasing;
        this.classList.toggle('active');
        updateCursor();
    });
    
    // update cursor style based on mode
    function updateCursor() {
        if (isErasing) {
            canvas.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"white\" stroke=\"black\" stroke-width=\"1\"/></svg>') 12 12, auto";
        } else {
            canvas.style.cursor = 'crosshair';
        }
    }

    // mouse event listener for the canvas
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseout', endPosition);
    canvas.addEventListener('mousemove', draw);
    
    // init cursor
    updateCursor();
});