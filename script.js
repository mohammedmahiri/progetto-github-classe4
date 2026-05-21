

document.addEventListener('DOMContentLoaded', () => {

  const form        = document.getElementById('signupForm');
  const confirmMsg  = document.getElementById('confirmMsg');
  const confirmText = document.getElementById('confirmText');
  const submitBtn   = document.getElementById('submitBtn');
  const spinner     = document.getElementById('spinner');

  // ── Campi ──────────────────────────────────────────────────
  const nomeInput  = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const cittaInput = document.getElementById('citta');

  const errNome  = document.getElementById('errNome');
  const errEmail = document.getElementById('errEmail');
  const errCitta = document.getElementById('errCitta');

  // ── Validazione in tempo reale ──────────────────────────────
  nomeInput.addEventListener('input', () => validaNome());
  emailInput.addEventListener('input', () => validaEmail());
  cittaInput.addEventListener('change', () => validaCitta());

  function validaNome() {
    const val = nomeInput.value.trim();
    if (val.length < 2) {
      mostraErrore(nomeInput, errNome, 'Inserisci almeno 2 caratteri.');
      return false;
    }
    nascondiErrore(nomeInput, errNome);
    return true;
  }

  function validaEmail() {
    const val = emailInput.value.trim();
    const re  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) {
      mostraErrore(emailInput, errEmail, 'Inserisci un indirizzo email valido.');
      return false;
    }
    nascondiErrore(emailInput, errEmail);
    return true;
  }

  function validaCitta() {
    if (!cittaInput.value) {
      mostraErrore(cittaInput, errCitta, 'Seleziona la tua città.');
      return false;
    }
    nascondiErrore(cittaInput, errCitta);
    return true;
  }

  function mostraErrore(campo, elemento, testo) {
    elemento.textContent = testo;
    campo.style.borderColor = '#d94040';
  }

  function nascondiErrore(campo, elemento) {
    elemento.textContent = '';
    campo.style.borderColor = '';
  }

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const n1 = validaNome();
    const n2 = validaEmail();
    const n3 = validaCitta();

    if (!n1 || !n2 || !n3) return;

    const nome  = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const citta = cittaInput.value;

    // Mostra spinner simulando invio
    submitBtn.disabled = true;
    spinner.style.display = 'inline';
    submitBtn.querySelector('.btn-text').textContent = 'Invio in corso…';

    setTimeout(() => {
      // Nasconde form, mostra messaggio personalizzato
      form.style.display = 'none';
      confirmMsg.style.display = 'block';
      confirmText.textContent =
        `Grazie ${nome}! Ti abbiamo aggiunto alla lista di lancio per ${citta}. ` +
        `Riceverai aggiornamenti esclusivi all'indirizzo ${email}.`;

      // Confetti leggero con emoji 🎉
      lanciaConfetti();
    }, 1400);
  });

  // ── Confetti emoji ──────────────────────────────────────────
  function lanciaConfetti() {
    const emojis  = ['🌿', '🍅', '🥕', '🍋', '🍓', '🌱', '🎉', '✨'];
    const wrapper = document.querySelector('.signup-form-box');
    const rect    = wrapper.getBoundingClientRect();

    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + 40}px;
        font-size: ${1 + Math.random()}rem;
        pointer-events: none;
        z-index: 9999;
        animation: confettiFall ${1.2 + Math.random() * .8}s ease forwards;
        animation-delay: ${Math.random() * .4}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }
  }

  // Aggiungi keyframe confetti dinamicamente
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0%   { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
      100% { opacity: 0; transform: translateY(120px) rotate(360deg) scale(.6); }
    }
  `;
  document.head.appendChild(style);

  // ── Smooth scroll per navbar ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Navbar shadow on scroll ────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 20px rgba(0,0,0,.10)'
      : 'none';
  });

});
