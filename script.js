const bgAudio = new Audio('bg.mp3');
bgAudio.loop = true;

const VAULT_PASSWORD = "trump2024"; // Example password

function checkAccess() {
    const status = document.getElementById("status");
    const documents = document.getElementById("documents");
    const loginBox = document.querySelector(".login-box");

    // Play the audio
    bgAudio.play();

    status.innerHTML = "ACCESS GRANTED";
    status.style.color = "#00ff00";
    
    setTimeout(() => {
        loginBox.style.display = "none";
        documents.style.display = "block";
        startMatrixRain();
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Auto play audio when page loads
    bgAudio.play();
    
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Making the canvas full screen
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    // Characters to be used
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = canvas.width/fontSize;
    
    // Array of drops - one per column
    const drops = [];
    
    // Setting up the drops
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    // Drawing the characters
    function draw() {
        // Black BG for the canvas, translucent to show trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0'; // Green text
        ctx.font = fontSize + 'px monospace';
        
        // Looping over drops
        for(let i = 0; i < drops.length; i++) {
            // Random character
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Sending the drop back to the top randomly after it has crossed the screen
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    });
});

function startMatrixRain() {
    const canvas = document.querySelector('.matrix-rain');
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
}

// Optional: Add this function if you want to toggle audio
function toggleAudio() {
    if (bgAudio.paused) {
        bgAudio.play();
    } else {
        bgAudio.pause();
    }
}
