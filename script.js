

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

  
// ── INVIO FORM ───────────────────────────────────
form.addEventListener('submit', (e) => {

  // Blocca il refresh della pagina
  e.preventDefault();

  let valido = true;

  // Reset errori
  errNome.textContent = '';
  errEmail.textContent = '';
  errCitta.textContent = '';

  nomeInput.style.borderColor = '';
  emailInput.style.borderColor = '';
  cittaInput.style.borderColor = '';

  // ── Validazione NOME ───────────────────────────
  if (nomeInput.value.trim() === '') {
    errNome.textContent = 'Inserisci il tuo nome.';
    nomeInput.style.borderColor = '#d94040';
    valido = false;
  }

  // ── Validazione EMAIL ──────────────────────────
  if (emailInput.value.trim() === '') {

    errEmail.textContent = 'Inserisci la tua email.';
    emailInput.style.borderColor = '#d94040';
    valido = false;

  } else {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
      errEmail.textContent = 'Email non valida.';
      emailInput.style.borderColor = '#d94040';
      valido = false;
    }
  }

  // ── Validazione CITTÀ ──────────────────────────
  if (cittaInput.value === '') {
    errCitta.textContent = 'Seleziona una città.';
    cittaInput.style.borderColor = '#d94040';
    valido = false;
  }

  // Se il form NON è valido → stop
  if (!valido) return;

  // ── Simulazione invio ──────────────────────────
  submitBtn.disabled = true;
  spinner.style.display = 'inline-block';

  submitBtn.querySelector('.btn-text').textContent =
    'Invio in corso...';

  // Simula richiesta server
  setTimeout(() => {

    // Nasconde il form
    form.style.display = 'none';

    // Mostra messaggio dinamico
    confirmMsg.style.display = 'block';

    confirmText.innerHTML = `
      Grazie <strong>${nomeInput.value}</strong>!<br>
      Ti abbiamo registrato per la città di
      <strong>${cittaInput.value}</strong>.<br>
      Riceverai aggiornamenti esclusivi a:
      <strong>${emailInput.value}</strong>.
    `;

    // Confetti
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
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];//calcola random le emoji basandosi sulla lunghezza del vettore
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
// ── FAQ ACCORDION ───────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {

    // Chiude tutte le altre FAQ
    faqItems.forEach(faq => {
      if (faq !== item) {
        faq.classList.remove('active');
      }
    });

    // Toggle della FAQ cliccata
    item.classList.toggle('active');
  });
});
});
