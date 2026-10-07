// Maiora. La firma «L'ora che passa» e il modulo «Fatti richiamare».
// Senza JavaScript o con movimento ridotto: ore ferme sul valore giusto, bicchieri già accostati.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Le ore delle scene: ogni cifra rotola dall'ora precedente a quella della scena.
  const clocks = [...document.querySelectorAll(".clock[data-from]")];
  if (!reduce && "IntersectionObserver" in window) {
    clocks.forEach((el) => {
      const to = el.textContent.trim(), from = el.dataset.from;
      if (from.length !== to.length) return;
      el.setAttribute("aria-label", to);
      el.textContent = "";
      let i = 0;
      [...to].forEach((ch, k) => {
        if (!/\d/.test(ch)) { const s = document.createElement("span"); s.className = "sep"; s.textContent = ch; s.setAttribute("aria-hidden", "true"); el.append(s); return; }
        const col = document.createElement("span"); col.className = "col"; col.setAttribute("aria-hidden", "true");
        const strip = document.createElement("span"); strip.className = "strip";
        for (let d = 0; d <= 9; d++) { const s = document.createElement("span"); s.textContent = d; strip.append(s); }
        strip.style.setProperty("--d", /\d/.test(from[k]) ? from[k] : ch);
        strip.style.setProperty("--i", i++);
        strip.dataset.to = ch;
        col.append(strip); el.append(col);
      });
    });
    // La scena tiene il colore dell'ora prima finché la sua ora non arriva.
    const scenes = [...document.querySelectorAll(".scene[data-turn]")];
    scenes.forEach((sc) => sc.classList.add("pre"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target; io.unobserve(el);
        el.classList.add("rolling");
        const sc = el.closest(".scene[data-turn]");
        if (sc) { sc.classList.add("turning"); sc.offsetWidth; }
        requestAnimationFrame(() => {
          el.querySelectorAll(".strip").forEach((s) => s.style.setProperty("--d", s.dataset.to));
          if (sc) sc.classList.remove("pre");
        });
      });
    }, { threshold: 0.4 });
    clocks.forEach((el) => io.observe(el));
    // Chi salta a una scena (per esempio dal tasto «Fatti richiamare») oltre la sua ora la trova già accesa.
    const settle = (el) => { io.unobserve(el); el.querySelectorAll(".strip").forEach((s) => s.style.setProperty("--d", s.dataset.to)); };
    const io3 = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const sc = e.target, el = sc.querySelector(".clock[data-from]");
        if (el && el.getBoundingClientRect().bottom < 0) { settle(el); sc.classList.add("turning"); sc.classList.remove("pre"); io3.unobserve(sc); }
      });
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    scenes.forEach((sc) => io3.observe(sc));

    // 2. Il brindisi: i bicchieri si scostano e si toccano quando la scena arriva.
    const cheers = document.querySelector(".cheers");
    if (cheers) {
      const toast = cheers.closest(".toast");
      [cheers, toast].forEach((n) => n && n.classList.add("ready"));
      const io2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => [cheers, toast].forEach((n) => n && n.classList.add("clink")), 250); io2.disconnect(); } }, { threshold: 0.6 });
      io2.observe(cheers);
    }

    // 3. Il sole si ferma quando non si vede.
    const stage = document.querySelector(".stage");
    if (stage) new IntersectionObserver(([e]) => stage.classList.toggle("paused", !e.isIntersecting)).observe(stage);
  }

  // 4. Il modulo: il sito non ha un server. Con i campi validi prepara un messaggio per info@conmaiora.it
  //    nell'app di posta di chi scrive. Senza JavaScript: controlli del browser e action="mailto:" in testo semplice.
  const form = document.getElementById("richiamo");
  if (!form) return;
  const EMAIL = "info@conmaiora.it";
  form.noValidate = true;
  const msgs = { nome: "Scrivi il tuo nome.", locale: "Scrivi il nome del ristorante.", telefono: "Scrivi un numero di telefono: ti serve per essere richiamato." };
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let first = null;
    Object.keys(msgs).forEach((id) => {
      const input = form.elements[id], err = document.getElementById(id + "-err"), field = input.closest(".field");
      const bad = id === "telefono" ? input.value.replace(/\D/g, "").length < 6 : !input.value.trim();
      err.textContent = bad ? msgs[id] : "";
      input.setAttribute("aria-invalid", bad ? "true" : "false");
      field.toggleAttribute("data-invalid", bad);
      if (bad && !first) first = input;
    });
    const stato = document.getElementById("stato");
    if (first) { stato.textContent = ""; first.focus(); return; }
    const val = (id) => form.elements[id].value.trim();
    const righe = [
      "Ciao Maiora, potete richiamarmi?",
      "",
      "Nome e cognome: " + val("nome"),
      "Ristorante: " + val("locale"),
      "Telefono: " + val("telefono"),
      "Quando chiamarmi: " + val("quando"),
    ];
    if (val("messaggio")) righe.push("", "Messaggio:", val("messaggio"));
    const oggetto = "Richiesta di richiamata: " + val("locale").replace(/\s+/g, " ");
    const corpo = righe.join("\n").replace(/\r?\n/g, "\r\n");
    const href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(oggetto) + "&body=" + encodeURIComponent(corpo);
    const link = document.createElement("a");
    link.href = "mailto:" + EMAIL;
    link.textContent = EMAIL;
    stato.replaceChildren("Ora si apre la tua app di posta con il messaggio pronto: basta premere Invia. Se non si apre, scrivici a ", link, ".");
    location.href = href;
  });
})();
