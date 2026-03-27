document.addEventListener("DOMContentLoaded", function () {
  const heroCta = document.getElementById("hero-cta");
  const beneficiosSection = document.getElementById("sec-beneficios");
  const whatsappLink = document.getElementById("whatsapp-link");
  const contactForm = document.getElementById("contact-form");

  function scrollToBeneficios() {
    if (beneficiosSection) {
      beneficiosSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Quando clica no botão do topo, vai ver os benefícios
  if (heroCta) {
    heroCta.addEventListener("click", scrollToBeneficios);
  }

  // Configurar link de WhatsApp (substituir pelo número real)
  if (whatsappLink) {
    const numero = "351912345678"; // <-- ALTERAR para o número real (com indicativo país)
    const mensagem = encodeURIComponent(
      "Olá, tenho um tuk tuk e gostava de saber como posso ter mais clientes e organizar melhor o meu dia."
    );
    const url = `https://wa.me/${numero}?text=${mensagem}`;
    whatsappLink.href = url;
  }

  // Simular envio de formulário (aqui podes integrar com backend mais tarde)
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const cidade = document.getElementById("cidade").value.trim();

      if (!nome || !telefone) {
        alert("Por favor, preencha pelo menos o nome e o telemóvel.");
        return;
      }

      // Aqui podes fazer um fetch/POST para a tua API ou um serviço de email
      // Por enquanto, só mostramos uma mensagem simples.
      alert(
        "Obrigado, " +
          nome +
          ". Vamos entrar em contacto consigo em breve para falar sobre o seu tuk tuk."
      );

      contactForm.reset();
    });
  }
});
