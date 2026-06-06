// Typing animation for hero fade-text
document.addEventListener('DOMContentLoaded', function () {
    const fadeTextEl = document.querySelector('.fade-text');
    const texts = ["Certified Salesforce Developer", " Certified Java Developer", " PHP Developer"];
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

const heroSpeechState = {
    utterance: null,
    isPlaying: false,
    defaultVoice: null,
};

function updateHeroActionButton() {
    const button = document.getElementById('heroActionBtn');
    if (!button) return;
    if (heroSpeechState.isPlaying) {
        button.innerHTML = '<i class="fas fa-stop"></i> Stop';
        button.setAttribute('aria-pressed', 'true');
        button.setAttribute('aria-label', 'Stop voiceover');
    } else {
        button.innerHTML = '<i class="fas fa-play"></i> Start';
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', 'Start voiceover');
    }
}

function stopHeroIntro() {
    if (!heroSpeechState.isPlaying) return;
    window.speechSynthesis.cancel();
    heroSpeechState.isPlaying = false;
    heroSpeechState.utterance = null;
    const card = document.getElementById('heroGraphic');
    if (card) card.classList.remove('speaking');
    updateHeroActionButton();
}

function createUtterance(introText, voice) {
    const utterance = new SpeechSynthesisUtterance(introText);
    utterance.rate = 1;
    utterance.pitch = 1.05;
    utterance.lang = 'en-US';
    if (voice) {
        utterance.voice = voice;
    }
    utterance.onend = function () {
        heroSpeechState.isPlaying = false;
        heroSpeechState.utterance = null;
        const card = document.getElementById('heroGraphic');
        if (card) card.classList.remove('speaking');
        updateHeroActionButton();
    };
    utterance.onerror = function () {
        stopHeroIntro();
    };
    return utterance;
}

function getBrowserName() {
    const ua = navigator.userAgent;
    if (/samsungbrowser|samsung/i.test(ua)) return 'samsung';
    if (/edg/i.test(ua)) return 'edge';
    if (/opr|opera/i.test(ua)) return 'opera';
    if (/chrome/i.test(ua) && !/edg/i.test(ua) && !/opr/i.test(ua) && !/samsungbrowser/i.test(ua)) return 'chrome';
    if (/firefox/i.test(ua)) return 'firefox';
    if (/safari/i.test(ua) && !/chrome/i.test(ua) && !/chromium/i.test(ua)) return 'safari';
    return 'unknown';
}

function findFemaleVoice(voices) {
    const browser = getBrowserName();
    const voicePreferences = {
        chrome: [/Google UK English Female/i, /Google US English/i, /Microsoft Zira Desktop/i, /Samantha/i],
        edge: [/Microsoft Zira Desktop/i, /Microsoft Hazel Desktop/i, /Google UK English Female/i, /Samantha/i],
        firefox: [/Samantha/i, /Alloy/i, /Google UK English Female/i, /Microsoft Zira Desktop/i],
        safari: [/Samantha/i, /Anna/i, /Victoria/i, /Alloy/i],
        opera: [/Google UK English Female/i, /Microsoft Zira Desktop/i, /Samantha/i],
        samsung: [/Samantha/i, /Google UK English Female/i, /Microsoft Zira Desktop/i, /Alloy/i],
        unknown: [/Google UK English Female/i, /Microsoft Zira Desktop/i, /Samantha/i],
    };

    const preferredPatterns = voicePreferences[browser] || voicePreferences.unknown;
    for (const pattern of preferredPatterns) {
        const matched = voices.find(voice => pattern.test(voice.name));
        if (matched) return matched;
    }

    const femaleVoices = voices.filter(voice => /female|zira|hazel|samantha|amy|eva|alloy/i.test(voice.name + ' ' + voice.lang));
    if (femaleVoices.length) {
        return femaleVoices.find(voice => /english/i.test(voice.lang)) || femaleVoices[0];
    }
    return voices.find(voice => /english/i.test(voice.lang));
}

function getPreferredHeroVoice() {
    const voices = window.speechSynthesis.getVoices();
    return findFemaleVoice(voices) || voices[0] || null;
}

function toggleHeroVoice() {
    if (!('speechSynthesis' in window)) {
        alert('Your browser does not support speech synthesis.');
        return;
    }
    if (heroSpeechState.isPlaying) {
        stopHeroIntro();
        return;
    }
    const introText = "Hi, I'm Keerthipriya. I'm a software developer focused on Salesforce, with over six years of experience working across Sales Cloud, Service Cloud, Experience Cloud, and Field Service. I also build web applications using JavaScript, Java and PHP. I solve problems passionately and enjoy learning and sharing knowledge with others.";
    heroSpeechState.defaultVoice = getPreferredHeroVoice();
    const utterance = createUtterance(introText, heroSpeechState.defaultVoice);
    heroSpeechState.utterance = utterance;
    heroSpeechState.isPlaying = true;
    const card = document.getElementById('heroGraphic');
    if (card) card.classList.add('speaking');
    updateHeroActionButton();
    window.speechSynthesis.speak(utterance);
}

function initializeHeroVoiceButton() {
    const button = document.getElementById('heroActionBtn');
    if (!button) return;
    button.addEventListener('click', toggleHeroVoice);
    updateHeroActionButton();
}







document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("navLinks");
    const burger = document.getElementById("hamburger");

    burger.addEventListener("click", function () {
        nav.classList.toggle("active");
        burger.classList.toggle("active");
    });

    initializeHeroVoiceButton();

    if (!window.speechSynthesis.getVoices().length) {
        window.speechSynthesis.onvoiceschanged = function () {
            heroSpeechState.defaultVoice = getPreferredHeroVoice();
            window.speechSynthesis.onvoiceschanged = null;
        };
    }
});

