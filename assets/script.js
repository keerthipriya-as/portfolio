// Typing animation for hero fade-text
document.addEventListener('DOMContentLoaded', function () {
    const fadeTextEl = document.querySelector('.fade-text');
    const texts = ["I'm a Certified Salesforce Developer", "I'm a Certified Java Developer", "I'm a PHP Developer"];
    let index = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[index].length) {
            fadeTextEl.textContent += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            fadeTextEl.textContent = texts[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            index = (index + 1) % texts.length;
            setTimeout(type, 500);
        }
    }

    type();
});

// Button actions
function openTrailhead() {
    window.open("https://www.salesforce.com/trailblazer/askeerthipriya", "_blank");
}
function openLinkedIn() {
    window.open("https://www.linkedin.com/in/keerthipriya-a-s/", "_blank");
}






document.addEventListener("DOMContentLoaded", function () {
	
    const nav = document.getElementById("navLinks");
    const burger = document.getElementById("hamburger");

    burger.addEventListener("click", function () {
        nav.classList.toggle("active");
        burger.classList.toggle("active");
    });
	
	
});

