(() => {
  const init = () => {
    if (typeof Swiper !== "undefined") {
      const el = document.querySelector(".mySwiper");
      if (el) {
        new Swiper(".mySwiper", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          },
        });
      }
    }
 
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
 
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
 
    const body = document.body;
    const reactorBar = document.getElementById("reactor-bar");
    const hudPercent = document.getElementById("hud-percent");
    let lastPercent = -1;
 
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
 
    const updateReactor = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      let percent = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      percent = clamp(percent, 0, 100);
 
      if (reactorBar) reactorBar.style.width = `${percent}%`;
      if (hudPercent && percent !== lastPercent) hudPercent.textContent = String(percent);
      lastPercent = percent;
    };
 
    window.addEventListener("scroll", updateReactor, { passive: true });
    window.addEventListener("resize", updateReactor);
    updateReactor();
 
    const initTilt = () => {
      const items = document.querySelectorAll(".holo");
      items.forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const ry = (x - 0.5) * 10;
          const rx = (0.5 - y) * 10;
          el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
          el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
          el.classList.add("tilting");
        });
 
        el.addEventListener("mouseleave", () => {
          el.classList.remove("tilting");
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        });
      });
    };
 
    const createSamanthaUI = () => {
      const fab = document.createElement("button");
      fab.id = "samantha-fab";
      fab.type = "button";
      fab.setAttribute("aria-label", "Abrir S.A.M.A.N.T.H.A");
      fab.textContent = "S";
 
      const panel = document.createElement("div");
      panel.id = "samantha-panel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-label", "S.A.M.A.N.T.H.A");
 
      const header = document.createElement("div");
      header.id = "samantha-header";
 
      const title = document.createElement("div");
      title.id = "samantha-title";
      title.textContent = "S.A.M.A.N.T.H.A";
 
      const closeBtn = document.createElement("button");
      closeBtn.id = "samantha-close";
      closeBtn.type = "button";
      closeBtn.setAttribute("aria-label", "Fechar");
      closeBtn.textContent = "×";
 
      header.appendChild(title);
      header.appendChild(closeBtn);
 
      const log = document.createElement("div");
      log.id = "samantha-log";
 
      const form = document.createElement("form");
      form.id = "samantha-form";
 
      const input = document.createElement("input");
      input.id = "samantha-input";
      input.type = "text";
      input.autocomplete = "off";
      input.placeholder = "Digite: ajuda, projetos, sobre, contato, email, linkedin, scan";
 
      const send = document.createElement("button");
      send.id = "samantha-send";
      send.type = "submit";
      send.textContent = "Enviar";
 
      const mic = document.createElement("button");
      mic.id = "samantha-mic";
      mic.type = "button";
      mic.setAttribute("aria-label", "Usar voz");
      mic.textContent = "🎙";
 
      form.appendChild(input);
      form.appendChild(send);
      form.appendChild(mic);
 
      panel.appendChild(header);
      panel.appendChild(log);
      panel.appendChild(form);
 
      document.body.appendChild(fab);
      document.body.appendChild(panel);
 
      const addMsg = (text, who) => {
        const msg = document.createElement("div");
        msg.className = `s-msg ${who}`;
        const bubble = document.createElement("div");
        bubble.className = "s-bubble";
        bubble.textContent = text;
        msg.appendChild(bubble);
        log.appendChild(msg);
        log.scrollTop = log.scrollHeight;
      };
 
      const open = () => {
        document.body.classList.add("samantha-open");
        setTimeout(() => input.focus(), 0);
      };
 
      const close = () => {
        document.body.classList.remove("samantha-open");
      };
 
      const runCommand = (raw) => {
        const cmd = (raw || "").trim().toLowerCase();
        if (!cmd) return;
 
        if (cmd === "ajuda" || cmd === "help") {
          addMsg("Comandos: ajuda, projetos, sobre, contato, email, linkedin, scan", "bot");
          return;
        }
 
        if (cmd === "projetos") {
          document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth", block: "start" });
          addMsg("Indo para Projetos em Destaque.", "bot");
          return;
        }
 
        if (cmd === "sobre") {
          document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth", block: "start" });
          addMsg("Indo para Sobre Mim.", "bot");
          return;
        }
 
        if (cmd === "contato") {
          document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
          addMsg("Indo para Contato.", "bot");
          return;
        }
 
        if (cmd === "email") {
          window.location.href = "mailto:migpratass26@gmail.com";
          addMsg("Abrindo email.", "bot");
          return;
        }
 
        if (cmd === "linkedin") {
          window.open("https://www.linkedin.com/in/miguel-prata-silva-42562b27b/", "_blank", "noopener,noreferrer");
          addMsg("Abrindo LinkedIn.", "bot");
          return;
        }
 
        if (cmd === "scan") {
          body.classList.toggle("scan");
          addMsg(body.classList.contains("scan") ? "Scan mode ativado." : "Scan mode desativado.", "bot");
          return;
        }
 
        if (cmd === "samantha" || cmd === "jarvis") {
          addMsg("Pronta. Em que posso ajudar?", "bot");
          return;
        }
 
        addMsg("Não entendi. Digite 'ajuda' para ver comandos.", "bot");
      };
 
      fab.addEventListener("click", () => {
        document.body.classList.contains("samantha-open") ? close() : open();
      });
 
      closeBtn.addEventListener("click", close);
 
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      });
 
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = input.value;
        input.value = "";
        addMsg(value, "user");
        runCommand(value);
      });
 
      let recognition = null;
      if ("webkitSpeechRecognition" in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = "pt-BR";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
 
        recognition.onresult = (event) => {
          const text =
            event.results && event.results[0] && event.results[0][0] ? event.results[0][0].transcript : "";
          if (text) {
            addMsg(text, "user");
            runCommand(text);
          }
        };
 
        recognition.onerror = () => {
          addMsg("Voz indisponível no momento.", "bot");
        };
      } else if ("SpeechRecognition" in window) {
        recognition = new SpeechRecognition();
        recognition.lang = "pt-BR";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
 
        recognition.onresult = (event) => {
          const text2 =
            event.results && event.results[0] && event.results[0][0] ? event.results[0][0].transcript : "";
          if (text2) {
            addMsg(text2, "user");
            runCommand(text2);
          }
        };
 
        recognition.onerror = () => {
          addMsg("Voz indisponível no momento.", "bot");
        };
      }
 
      mic.addEventListener("click", () => {
        if (!recognition) {
          addMsg("Seu navegador não suporta reconhecimento de voz.", "bot");
          return;
        }
        try {
          recognition.start();
          addMsg("Ouvindo...", "bot");
        } catch (e) {
          addMsg("Não consegui iniciar a voz.", "bot");
        }
      });
 
      addMsg("Olá. Sou a S.A.M.A.N.T.H.A. Digite 'ajuda' para comandos.", "bot");
    };
 
    initTilt();
    createSamanthaUI();
  };
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
