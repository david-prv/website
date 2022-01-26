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
    document.getElementById("dynamic").innerHTML = `<h2>Imprint</h2>

<strong>Information according to &sect; 5 TMG</strong>
<p>David Dewes<br />
Schw&auml;hnselstr. 5<br />
66125 Saarbr&uuml;cken</p>

<strong>Contact</strong>
<p>E-Mail: <span id="7DlKjh2+8_j(j4d5FF6">[<a style="cursor: pointer;font-weight:bolder;text-decoration: underline;" onClick="document.getElementById('7DlKjh2+8_j(j4d5FF6').innerHTML = atob('aW1wcmludEBkYXZpZC1kZXdlcy5kZQ==')">Reveal</a>]</span></p>

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
        document.getElementById("privacy").innerText = "Data";
        document.getElementById("imprint").innerText = "Legal";
    } else {
        document.getElementById("privacy").innerText = "Privacy";
        document.getElementById("imprint").innerText = "Imprint";
    }
}
