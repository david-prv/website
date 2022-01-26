// Define hellos
let hellos = ["Zdravo", "Zdravo", "Ahoj", "Hallo", "Hei", "Salut", "Ciao", "Sveiki", "Olà", "Merhaba", "Konnichiwa", "Hej", "Shalom", "Jambo", "Hoi", "Salve"];
let final_hello = "Hey";

// Delayed loop
let iterations = 0;

let x = setInterval(function() {

    if(!document.getElementById("hello")) return;

    // Start timed fade-out
    if(iterations == hellos.length - 6) document.getElementById("hello").classList.add("fade-out");

    // Loop through all hellos
    if(iterations < hellos.length) {
        document.getElementById("hello").innerText = hellos[iterations] + ",";
        iterations += 1;
    } else {
        // Stop loop
        clearInterval(x);
        
        // Fade-in
        setTimeout(function() {
            document.getElementById("hello").innerText = final_hello + ",";
            document.getElementById("hello").classList.remove("fade-out");
            document.getElementById("hello").classList.add("fade-in");
        }, 700);
    }

}, 200);
