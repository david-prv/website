// Some local variables
let isImprintOpen = false;
let tempHtml = "";
let imprintUrl = window.location.href + "#imprint";

// Check if the permanent link was used for imprint
function checkPath() {
    /* Possible paths:
     * - #[site-name]
     * - ?[site-name]
     * 
     * site-names:
     * - imprint
     * - privacy
     */
    let url = new URL(window.location.href);

    // set eventlisteners
    addListeners();

    // check for site-names in url
    if((url.searchParams.get("imprint") !== null) || (window.location.href.indexOf("/#imprint") !== -1)) {
        imprintUrl = window.location.href;
        toggleImprint();
    }
    if((url.searchParams.get("privacy") !== null) || (window.location.href.indexOf("/#privacy") !== -1)) {
        togglePrivacy();
    }
}

// Function that hooks event listeners to external-links 
function addListeners() {
    window.addEventListener('resize', checkWindow, true);
    Array.prototype.forEach.call(document.getElementsByClassName('external-url'), function(el) {
        el.addEventListener('mouseover', function (event) {
            if(!el.innerHTML.includes(`<i class="fas fa-link no-transform"></i>`)) el.innerHTML = el.innerHTML.replace('</a>', '') + ` <i class="fas fa-link no-transform"></i></a>`;
        });
        el.addEventListener('mouseleave', function (event) {
            el.innerHTML = el.innerHTML.replace(` <i class="fas fa-link no-transform"></i>`, "");
        });
    });
}

// Toggle function for showing imprint dynamically
async function toggleImprint() { 
    if(isImprintOpen) {
        isImprintOpen = false;
        await returnToOriginal();
        await addListeners();
    } else {
        isImprintOpen = true;
        await showImprint();
    }
}

// Toggle function for showing privacy ext. page
async function togglePrivacy() { 
    window.location.href = "privacy.html";
}

// Function that actually inserts the imprint
function showImprint() {
    tempHtml = document.getElementById("dynamic").innerHTML;
    document.getElementById("dynamic").innerHTML = `<h1>Imprint</h1>

<h2>Information according to &sect; 5 TMG</h2>
<p>David Dewes<br />
Schw&auml;hnselstr. 5<br />
66125 Saarbr&uuml;cken</p>

<h2>Contact</h2>
<p>E-Mail: <span id="7DlKjh2+8_j(j4d5FF6">[<a style="cursor: pointer;font-weight:bolder;text-decoration: underline;" onClick="document.getElementById('7DlKjh2+8_j(j4d5FF6').innerHTML = atob('aW1wcmludEBkYXZpZC1kZXdlcy5kZQ==')">Reveal</a>]</span></p>

<p>Source: <a href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a><br>
Permanent Link: <a href="${imprintUrl}">${imprintUrl}</a></p>
<p>Background Animation was created by <a href="https://codepen.io/LeonGr">LeonGr</a>.</p>
    <a class="float-right list-nav" onclick="toggleImprint()">< Go back</a>`;
    
}
// Return to the original html code
function returnToOriginal() {
    document.getElementById("dynamic").innerHTML = tempHtml;
    window.history.replaceState( {} , 'back', '/' );
}

// Check window size and adjust footer
function checkWindow() {
    if(window.innerWidth <= 373) {
        document.getElementById("privacy").innerText = "Data";
        document.getElementById("imprint").innerText = "Legal";
    } else {
        document.getElementById("privacy").innerText = "Privacy";
        document.getElementById("imprint").innerText = "Imprint";
    }
}

// =============================================================
// Background animation made by: https://codepen.io/LeonGr
// =============================================================

let canvas, ctx;

var stars = [], // Array that contains the stars
    FPS = 60, // Frames per second
    x = window.innerWidth/20, // Number of stars
    mouse = {
      x: 0,
      y: 0
    };  // mouse location

// Draw the scene

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  ctx.globalCompositeOperation = "lighter";
  
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.stroke();
  }
  
  ctx.beginPath();
  for (var i = 0, x = stars.length; i < x; i++) {
    var starI = stars[i];
    ctx.moveTo(starI.x,starI.y); 
    if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
    for (var j = 0, x = stars.length; j < x; j++) {
      var starII = stars[j];
      if(distance(starI, starII) < 150) {
        //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
        ctx.lineTo(starII.x,starII.y); 
      }
    }
  }
  ctx.lineWidth = 0.05;
  ctx.strokeStyle = 'white';
  ctx.stroke();
}

function distance( point1, point2 ){
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

// Update star locations

function update() {
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
  
    s.x += s.vx / FPS;
    s.y += s.vy / FPS;
    
    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}

// Update and draw

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener('mousemove', function(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Push stars to array

    for (var i = 0; i < x; i++) {
        stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
        });
    }

    tick();
}
