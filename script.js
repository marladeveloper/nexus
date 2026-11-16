// Menu mobile
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Ano automático no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Animação discreta ao entrar na tela
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Formulário: abre uma conversa no WhatsApp com os dados preenchidos.
// IMPORTANTE: substitua pelo número oficial da NEXUS, com código do país e DDD,
// somente números. Exemplo de formato: 5574999999999.
const whatsappNumber = "55DDDNÚMERO";

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (whatsappNumber.includes("NÚMERO") || whatsappNumber.length < 12) {
    alert("O formulário está pronto! Para ativar o envio, adicione o número oficial do WhatsApp da NEXUS no arquivo script.js.");
    return;
  }

  const form = new FormData(event.currentTarget);
  const message = [
    "Olá! Vim pelo site da NEXUS.",
    "",
    `Nome: ${form.get("name")}`,
    `Contato: ${form.get("email")}`,
    `Solução: ${form.get("service")}`,
    `Projeto: ${form.get("message") || "Não informado"}`
  ].join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
