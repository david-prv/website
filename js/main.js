// Some local variables
let isImprintOpen = false;
let tempHtml = "";
let imprintUrl = window.location.href + "?imprint";

// Check if the permanent link was used for imprint
function checkPath() {
    let url = new URL(window.location.href);
    addListeners();
    if(url.searchParams.get("imprint") !== null) {
        imprintUrl = window.location.href;
        toggleImprint();
    }
}

// Function that hooks event listeners to external-links
function addListeners() {
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

// Function that actually inserts the imprint
function showImprint() {
    tempHtml = document.getElementById("dynamic").innerHTML;
    document.getElementById("dynamic").innerHTML = `<h2>Imprint</h2>

<strong>Information according to &sect; 5 TMG</strong>
<p>David Dewes<br />
Schw&auml;hnselstr. 5<br />
66125 Saarbr&uuml;cken</p>

<strong>Contact</strong>
<p>E-Mail: imprint@david-dewes.de</p>

<p>Source: <a href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a><br>
Permanent Link: <a href="${imprintUrl}">${imprintUrl}</a></p>
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
        document.getElementById("contact").innerText = "DM";
        document.getElementById("imprint").innerText = "Legal";
    } else {
        document.getElementById("contact").innerText = "Contact";
        document.getElementById("imprint").innerText = "Imprint";
    }
}
