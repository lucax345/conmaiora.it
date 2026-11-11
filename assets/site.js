/* conmaiora.it — tutto il contenuto è già nella pagina: questo file aggiunge solo il movimento. */
(function () {
  "use strict";
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- La prova: tocchi una richiesta, il sito della trattoria cambia. ---- */
  var sheet = document.getElementById("sheet");
  if (sheet) {
    var thread = document.getElementById("thread"),
        me = document.getElementById("me"),
        ai = document.getElementById("ai"),
        btns = [].slice.call(document.querySelectorAll(".reqs button")),
        replies = {
          1: "Carbonara a 14 €. È già sul sito.",
          2: "Ribollita aggiunta tra i primi, a 10 €. È online.",
          3: "Tiramisù tolto dai dolci. Lo rimetto quando me lo dici.",
          4: "Scritto in alto sul sito. Per il 15 agosto non prendo prenotazioni.",
          5: "Da domani c'è il menu di pesce. Lunedì torna quello di sempre."
        },
        reqs = document.querySelector(".reqs"),
        reset = document.getElementById("reset"),
        changed = { 1: ".carb", 2: ".ribo", 3: ".tira", 4: ".closed", 5: ".pesce" },
        smooth = calm ? "auto" : "smooth",
        auto = null, step = 1, seen = false;

    function say(n) {
      me.textContent = btns[n - 1].textContent;
      ai.textContent = replies[n];
      thread.classList.remove("go"); void thread.offsetWidth; thread.classList.add("go");
    }
    /* Porta la riga cambiata al centro del foglio e ci passa l'evidenziatore. */
    function show(n) {
      var el = sheet.querySelector(changed[n]);
      if (!el) return;
      if (sheet.scrollHeight > sheet.clientHeight + 4) {
        var top = el.getBoundingClientRect().top - sheet.getBoundingClientRect().top + sheet.scrollTop;
        sheet.scrollTo({ top: Math.max(0, top - (sheet.clientHeight - el.offsetHeight) / 2), behavior: smooth });
      }
      el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    }
    /* Una richiesta alla volta è «quella di adesso»; le precedenti restano sul menu. */
    function apply(n) {
      sheet.classList.add("r" + n);
      btns.forEach(function (b, i) {
        b.classList.toggle("now", i === n - 1);
        if (i === n - 1) b.setAttribute("aria-pressed", "true");
      });
      say(n); show(n);
      var li = btns[n - 1].parentNode;
      if (reqs.scrollWidth > reqs.clientWidth + 4) {
        reqs.scrollTo({ left: li.offsetLeft - (reqs.clientWidth - li.offsetWidth) / 2, behavior: smooth });
      }
    }
    function clear() {
      btns.forEach(function (b, i) {
        sheet.classList.remove("r" + (i + 1));
        b.classList.remove("now");
        b.setAttribute("aria-pressed", "false");
      });
    }
    function stop() { if (auto) { clearInterval(auto); auto = null; } }
    function play() {
      if (auto || calm) return;
      auto = setInterval(function () {
        step++;
        if (step > btns.length) { step = 1; clear(); }
        apply(step);
      }, 4200);
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        seen = true; stop();
        apply(+b.dataset.r);
        if (reset) reset.hidden = false;
      });
    });
    if (reset) reset.addEventListener("click", function () {
      clear(); apply(1); reset.hidden = true; btns[0].focus();
    });
    /* Da sola, finché nessuno tocca, e solo quando è in vista. */
    if (!calm && "IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        if (seen) return;
        if (e[0].isIntersecting) { if (!auto) show(step); play(); } else stop();
      }, { threshold: 0.35 }).observe(sheet);
    }
  }

  /* ---- Il campanello dei contatti: segue il puntatore e suona. ---- */
  var bell = document.getElementById("bell");
  if (bell) {
    var first = document.getElementById("f-locale");
    bell.addEventListener("click", function () {
      bell.classList.remove("hit"); void bell.offsetWidth; bell.classList.add("hit");
      if (first) setTimeout(function () { first.focus({ preventScroll: false }); }, 380);
    });
    if (!calm && matchMedia("(hover: hover)").matches) {
      addEventListener("pointermove", function (e) {
        var x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
        bell.style.setProperty("--px", (x * 16).toFixed(1) + "px");
        bell.style.setProperty("--py", (y * 12).toFixed(1) + "px");
        bell.style.setProperty("--rot", (x * 5).toFixed(2) + "deg");
      }, { passive: true });
    }
  }

  /* ---- Il modulo dei contatti prepara l'email: non c'è nessun server in mezzo. ---- */
  var form = document.getElementById("racconta");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var rows = [
        ["Locale", v("f-locale")],
        ["Città", v("f-citta")],
        ["Coperti", v("f-coperti")],
        ["Come ricontattarmi", v("f-contatto")]
      ].filter(function (r) { return r[1]; }).map(function (r) { return r[0] + ": " + r[1]; });
      var body = rows.join("\n") + (v("f-racconto") ? "\n\n" + v("f-racconto") : "");
      var subject = "Maiora per " + (v("f-locale") || "il mio locale");
      location.href = "mailto:info@conmaiora.it?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var done = document.getElementById("f-done");
      if (done) done.hidden = false;
    });
  }

  /* ---- I titoli si accendono parola per parola mentre scorri. Una volta accesi restano accesi. ---- */
  var heads = [].slice.call(document.querySelectorAll("main h2.h-xl, .end h2"));
  if (!calm && heads.length) {
    var lit = heads.map(function (h) {
      var words = [];
      (function walk(node, inEm) {
        [].slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function (t) {
              if (!t) return;
              if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(" ")); return; }
              var w = document.createElement("span");
              w.className = inEm ? "w e" : "w"; w.textContent = t;
              words.push(w); frag.appendChild(w);
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1) walk(c, inEm || c.tagName === "EM");
        });
      })(h, false);
      h.classList.add("lit");
      return { el: h, words: words, done: 0 };
    });
    var queued = false;
    var light = function () {
      queued = false;
      var vh = innerHeight,
          atEnd = scrollY + vh >= document.documentElement.scrollHeight - 4;
      lit.forEach(function (o) {
        if (o.done >= o.words.length) return;
        var r = o.el.getBoundingClientRect();
        if (r.top > vh) return;
        var from = vh * 0.88, to = Math.max(vh * 0.14, vh * 0.5 - r.height / 2),
            p = atEnd ? 1 : (from - r.top) / (from - to),
            n = Math.min(o.words.length, Math.ceil(Math.max(0, p) * o.words.length));
        for (; o.done < n; o.done++) o.words[o.done].classList.add("on");
      });
      /* tutti accesi: non c'è più niente da ascoltare */
      if (lit.every(function (o) { return o.done >= o.words.length; })) {
        removeEventListener("scroll", ask); removeEventListener("resize", ask);
      }
    };
    var ask = function () { if (!queued) { queued = true; requestAnimationFrame(light); } };
    addEventListener("scroll", ask, { passive: true });
    addEventListener("resize", ask);
    light();
  }

  /* ---- I cicli (oggetti che ondeggiano, piatto, pianta) si fermano lontano dallo schermo. ---- */
  if (!calm && "IntersectionObserver" in window) {
    var idleIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("idle", !e.isIntersecting); });
    }, { rootMargin: "240px 0px" });
    [].slice.call(document.querySelectorAll(".hero, .demo, .field")).forEach(function (el) { idleIO.observe(el); });
  }

  /* ---- I blocchi salgono quando entrano nello schermo; i numeri contano. ---- */
  if (!calm && "IntersectionObserver" in window) {
    var sets = [".facts li", ".steps li", ".honest li", ".leave li", ".incl li", ".incl .note", ".incl .act",
                ".log li", ".chat li", ".side > *", ".qa details", ".next-steps li", ".sec-head .lede",
                ".field .lede", ".dark .lede", ".end .row > *", ".doubts-h p"],
        fades = [".where tbody tr"], bigs = [".figure .n", ".figure .u"],
        parents = [];
    var mark = function (sel, extra) {
      [].slice.call(document.querySelectorAll(sel)).forEach(function (el) {
        var par = el.parentNode, i = [].indexOf.call(par.children, el);
        el.classList.add("rise"); if (extra) el.classList.add(extra);
        el.style.setProperty("--i", i);
        if (parents.indexOf(par) < 0) parents.push(par);
      });
    };
    sets.forEach(function (s) { mark(s); });
    fades.forEach(function (s) { mark(s, "fade"); });
    bigs.forEach(function (s) { mark(s, "big"); });
    var seenIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        [].slice.call(e.target.children).forEach(function (c) { if (c.classList.contains("rise")) c.classList.add("in"); });
        seenIO.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    parents.forEach(function (par) { seenIO.observe(par); });

    var countIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        countIO.unobserve(e.target);
        var el = e.target, to = +el.getAttribute("data-count"), t0 = 0;
        var tick = function (t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / 1100);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = "0";
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.3 });
    [].slice.call(document.querySelectorAll("[data-count]")).forEach(function (el) { countIO.observe(el); });
  }
})();
