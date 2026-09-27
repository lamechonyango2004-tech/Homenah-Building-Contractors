// Smooth reveal for sections and cards
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => observer.observe(item));

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form submission to WhatsApp
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name')?.toString().trim() || 'Client';
  const email = formData.get('email')?.toString().trim() || 'No email provided';
  const phone = formData.get('phone')?.toString().trim() || 'No phone provided';
  const message = formData.get('message')?.toString().trim() || 'No message provided';

  const whatsappMessage = `Hello Homenah Building Contractors,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
  const whatsappLink = `https://wa.me/254720144481?text=${whatsappMessage}`;

  window.open(whatsappLink, '_blank');
  contactForm.reset();
});

// FAQ chatbot
const chatbot = document.querySelector('.chatbot');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotBody = document.querySelector('.chatbot-body');
const typingMessage = document.querySelector('.typing');
const quickReplyButtons = document.querySelectorAll('.quick-reply');

const botResponses = {
  services: 'We offer building alignment, dimension checks, documentation support, materials testing and quality control oversight.',
  booking: 'You can book an inspection by sending your project details through our contact form or by WhatsApp messaging us directly.',
  location: 'We provide inspection and construction assurance support for clients across the region. Reach out to confirm availability and service areas.',
  contact: 'You can contact us directly on 0720144481 / 0106650270 or via WhatsApp at wa.me/254720144481.'
};

function addMessage(text, isUser = false) {
  const message = document.createElement('div');
  message.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  message.textContent = text;
  chatbotBody.appendChild(message);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function showTyping() {
  typingMessage.classList.remove('hidden');
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function hideTyping() {
  typingMessage.classList.add('hidden');
}

chatbotToggle?.addEventListener('click', () => {
  chatbot?.classList.toggle('open');
  const expanded = chatbotToggle.getAttribute('aria-expanded') === 'true';
  chatbotToggle.setAttribute('aria-expanded', String(!expanded));

  if (!expanded && chatbotBody) {
    setTimeout(() => {
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 50);
  }
});

quickReplyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const reply = button.dataset.reply;
    const userText = button.textContent.trim();

    addMessage(userText, true);
    showTyping();

    setTimeout(() => {
      hideTyping();
      addMessage(botResponses[reply] || 'Thanks for your message. We will get back to you soon.');
    }, 700);
  });
});

const directContact = document.querySelector('[data-reply="contact"]');
directContact?.addEventListener('click', () => {
  window.open('https://wa.me/254720144481', '_blank');
});
