const WHATSAPP_NUMBER = '254742038072';

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const siteHeader = document.querySelector('.site-header');

const setHeaderState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle('scrolled', window.scrollY > 16);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const businessName = String(formData.get('businessName') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const industry = String(formData.get('industry') || '').trim();
    const projectNeed = String(formData.get('projectNeed') || '').trim();
    const budget = String(formData.get('budget') || '').trim();

    const requiredFields = [name, businessName, phone, email, industry, projectNeed];
    if (requiredFields.some((value) => !value)) {
      if (formStatus) {
        formStatus.textContent = 'Please complete all required fields before continuing.';
      }
      return;
    }

    const whatsappMessage = [
      'Hello Lamech Digital, I would like to discuss a website for my business.',
      `Name: ${name}`,
      `Business Name: ${businessName}`,
      `Phone / WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Business Type: ${industry}`,
      `Budget: ${budget || 'Not specified'}`,
      `Project Need: ${projectNeed}`
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (formStatus) {
      formStatus.textContent = 'Opening WhatsApp...';
    }

    contactForm.reset();

    setTimeout(() => {
      if (formStatus) {
        formStatus.textContent = 'Your consultation request is ready on WhatsApp.';
      }
    }, 200);
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const chatbotWidget = document.querySelector('.chatbot-widget');
const chatbotPanel = document.querySelector('.chatbot-panel');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotForm = document.querySelector('.chatbot-form');
const chatbotInput = document.querySelector('.chatbot-form input');
const quickReplies = document.querySelectorAll('.quick-reply');

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;

  if (sender === 'bot') {
    message.innerHTML = text;
  } else {
    message.textContent = text;
  }

  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getReply(question) {
  const normalized = question.toLowerCase();

  if (normalized.includes('service') || normalized.includes('offer')) {
    return 'I build business websites with branding, mobile responsiveness, WhatsApp integration, SEO, Google Business Profile support and supporting digital tools.';
  }

  if (normalized.includes('cost') || normalized.includes('price') || normalized.includes('quote')) {
    return `Pricing depends on the size and complexity of the project. <a href="${whatsappLink}" target="_blank" rel="noreferrer">Message me on WhatsApp</a> and I can tell you the most suitable package for your business.`;
  }

  if (normalized.includes('long') || normalized.includes('time') || normalized.includes('day') || normalized.includes('week')) {
    return 'Most small business websites take a few days to a couple of weeks depending on scope, content and feedback timing.';
  }

  if (normalized.includes('talk') || normalized.includes('direct') || normalized.includes('contact') || normalized.includes('whatsapp')) {
    return `<a href="${whatsappLink}" target="_blank" rel="noreferrer">Click here to chat on WhatsApp</a>`;
  }

  return `I can help with website design, business websites, WhatsApp integration and digital setup. <a href="${whatsappLink}" target="_blank" rel="noreferrer">Chat on WhatsApp</a> for a more detailed discussion.`;
}

if (chatbotWidget && chatbotPanel && chatbotToggle && chatbotClose && chatbotMessages && chatbotForm && chatbotInput) {
  const toggleChatbot = () => {
    const isHidden = chatbotPanel.hasAttribute('hidden');
    chatbotPanel.toggleAttribute('hidden', !isHidden);
    chatbotToggle.classList.toggle('is-open', isHidden);
    chatbotToggle.setAttribute('aria-expanded', String(isHidden));
    chatbotToggle.setAttribute('aria-label', isHidden ? 'Close chatbot' : 'Open chatbot');
  };

  chatbotToggle.addEventListener('click', toggleChatbot);
  chatbotClose.addEventListener('click', toggleChatbot);

  quickReplies.forEach((button) => {
    button.addEventListener('click', () => {
      const question = button.dataset.question || '';
      if (!question) return;

      addMessage(question, 'user');
      addMessage(getReply(question), 'bot');
    });
  });

  chatbotForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = chatbotInput.value.trim();

    if (!question) return;

    addMessage(question, 'user');
    addMessage(getReply(question), 'bot');
    chatbotInput.value = '';
  });
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
