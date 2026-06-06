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
    const introText = "Hi, You are viewing Keerthipriya's portfolio. She's a software developer focused on Salesforce, with over six years of experience working across Sales Cloud, Service Cloud, Experience Cloud, and Field Service. She also build web applications using JavaScript, Java and PHP. She is eager to solve problems passionately and enjoy learning and sharing knowledge with others.";
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

    //chat bot
    (function setupChatbot(){
        const toggle = document.getElementById('chatToggle');
        const windowEl = document.getElementById('chatWindow');
        const closeBtn = document.getElementById('chatClose');
        const form = document.getElementById('chatForm');
        const input = document.getElementById('chatInput');
        const messages = document.getElementById('chatMessages');

        if (!toggle || !windowEl || !form || !input || !messages) return;

        function openChat(){
            windowEl.classList.add('open');
            windowEl.setAttribute('aria-hidden','false');
            toggle.style.display = 'none';
            input.focus();
        }
        function closeChat(){
            windowEl.classList.remove('open');
            windowEl.setAttribute('aria-hidden','true');
            toggle.style.display = '';
            toggle.focus();
        }

        toggle.addEventListener('click', function(){
            if (windowEl.classList.contains('open')) closeChat(); else openChat();
        });
        closeBtn.addEventListener('click', function () {
            const messagesEl = document.getElementById('chatMessages');
            if (messagesEl) messagesEl.innerHTML = '';
            closeChat();
        });

        function appendMessage(text, who){
            const el = document.createElement('div');
            el.className = 'chat-bubble ' + (who==='user' ? 'user' : 'bot');
            el.textContent = text;
            messages.appendChild(el);
            messages.scrollTop = messages.scrollHeight;
        }

        function botReply(userText){
            
            const t = userText.toLowerCase();
            let reply = "Sorry, I didn't get that. Try asking about skills, experience, or contact.";
            if (t.includes('skill') || t.includes('skills') || t.includes('knowledge')) reply = 'I am skilled in Salesforce Configurations and platform development including Apex, Aura, Visualforce, Lightning Web Components, and integrations. I also have experience in Html, CSS, Javascript, Java and PHP for web development.';
            else if (t.includes('experience') || t.includes('exp')) reply = 'I have 6+ years experience across Sales, Service, Experience Clouds and Field Service, working on custom development, integrations, and web applications.';
            else if (t.includes('contact') || t.includes('email') || t.includes('phone')) reply = 'You can reach me at askeerthipriya99@gmail.com or +91 7010481281.';
            else if (t.includes('keerthi') || t.includes('priya') || t.includes('keerthipriya')) reply = 'That\'s me! I\'m Keerthipriya, a passionate software developer focused on Salesforce and web technologies. I love solving problems and learning new things.';
            else if (t.includes('hi') || t.includes('hello') || t.includes('hey')) reply = 'Hey! you can ask me about my skills, experience, or how to contact me. It\'s a simple chatbot built in javascript to improve user experience on my portfolio site.';
            else if (t.includes('nice') || t.includes('good') || t.includes('great') || t.includes('awesome') || t.includes('cool') || t.includes('lovely') || t.includes('super') || t.includes('beautiful') || t.includes('fantastic') ) reply = 'Thank you! I\'m glad you like it. Feel free to explore the site and let me know if you have any questions!';
            else if (t.includes('thanks') || t.includes('thank you')) reply = 'You\'re welcome! Is there anything else you\'d like to know about me? You can ask about my skills, experience, or how to contact me.';
            else if (t.includes('bye') || t.includes('goodbye')) reply = 'Goodbye! Feel free to come back if you have more questions.';
            else if (t.includes('oh') || t.includes('oh no')) reply = 'If you have any questions about my skills or experience, just ask!';
            else if (t.includes('what is your name') || t.includes('your name') || t.includes('who are you')) reply = 'I\'m Keerthipriya, a software developer.';
            else if (t.includes('welcome')) reply = 'Is there anything else you\'d like to know about me? You can ask about my skills, experience, or how to contact me.';

            setTimeout(()=> appendMessage(reply, 'bot'), 700);
        }

        form.addEventListener('submit', function(e){
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;
            appendMessage(text, 'user');
            input.value = '';
            botReply(text);
        });
    })();

