document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');
    let isPainting = false;
    let currentColor = '#000000';
    let isErasing = false;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 30; 
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function startPosition(e) {
        isPainting = true;
        draw(e);
    }
    
    function endPosition() {
        isPainting = false;
        ctx.beginPath();
    }
    
    function draw(e) {
        if (!isPainting) return;
        
        ctx.lineCap = 'round';
        
        if (isErasing) {
            
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        } else {
            
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 5;
        }
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    document.querySelectorAll('.color-option').forEach(color => {
        color.addEventListener('click', function() {
            isErasing = false;
            document.getElementById('erase-btn').classList.remove('active');
            currentColor = this.style.backgroundColor;
            updateCursor();
        });
    });

    document.getElementById('erase-btn').addEventListener('click', function() {
        isErasing = !isErasing;
        this.classList.toggle('active');
        updateCursor();
    });
    
    function updateCursor() {
        if (isErasing) {
            canvas.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"white\" stroke=\"black\" stroke-width=\"1\"/></svg>') 12 12, auto";
        } else {
            canvas.style.cursor = 'crosshair';
        }
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseout', endPosition);
    canvas.addEventListener('mousemove', draw);
    
    updateCursor();
});