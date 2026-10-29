/* Solstice Makers Fair — working tickets.
   Pass tier cards and schedule-page workshop links pre-fill the order
   form; pass, quantity, and workshops update the summary live;
   submitting validates and ends in a confirmation state.
   Front-end demo only: no real tickets are sold. */
(function () {
  "use strict";

  var PASS_KEY = "smf-pass";
  var WORKSHOP_KEY = "smf-workshops";
  var PASSES = {
    weekend:   { label: "Weekend Pass", price: 20 },
    "day-sat": { label: "Day Pass — Saturday", price: 12 },
    "day-sun": { label: "Day Pass — Sunday", price: 12 },
    supporter: { label: "Maker Supporter Pass", price: 45 }
  };
  var WORKSHOPS = {
    w1: { label: "Weave a Table Runner", price: 38 },
    w2: { label: "Pour Your Own Candle", price: 22 },
    w3: { label: "Print a Set of Cards", price: 30 }
  };
  function money(n) { return "$" + n; }

  /* ---------- schedule page + tier cards: preselect on the tickets form ---------- */
  function initLinks() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-pass-link]"), function (a) {
      a.addEventListener("click", function () {
        try { localStorage.setItem(PASS_KEY, a.getAttribute("data-pass-link")); } catch (e) {}
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-workshop-link]"), function (a) {
      a.addEventListener("click", function () {
        try {
          var list = JSON.parse(localStorage.getItem(WORKSHOP_KEY) || "[]");
          var id = a.getAttribute("data-workshop-link");
          if (list.indexOf(id) === -1) list.push(id);
          localStorage.setItem(WORKSHOP_KEY, JSON.stringify(list));
        } catch (e) {}
      });
    });
  }

  /* ---------- tickets page ---------- */
  function initTickets() {
    var form = document.getElementById("ticket-form");
    if (!form) return;
    var passSel = document.getElementById("pass");
    var qtySel = document.getElementById("qty");
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var btn = document.getElementById("review-btn");
    var linesEl = document.getElementById("summary-lines");
    var confirm = document.getElementById("ticket-confirmation");
    var layout = document.getElementById("order-layout");
    var boxes = {};
    Object.keys(WORKSHOPS).forEach(function (k) { boxes[k] = document.getElementById(k); });

    /* restore preselections */
    try {
      var savedPass = localStorage.getItem(PASS_KEY);
      if (savedPass && PASSES[savedPass]) {
        for (var i = 0; i < passSel.options.length; i++) {
          if (passSel.options[i].value === savedPass) { passSel.selectedIndex = i; break; }
        }
      }
      var savedWs = JSON.parse(localStorage.getItem(WORKSHOP_KEY) || "[]");
      savedWs.forEach(function (id) { if (boxes[id]) boxes[id].checked = true; });
    } catch (e) {}

    function current() {
      var pass = PASSES[passSel.value] || PASSES.weekend;
      var qty = parseInt(qtySel.value, 10) || 1;
      var ws = Object.keys(WORKSHOPS).filter(function (k) { return boxes[k] && boxes[k].checked; });
      return { pass: pass, qty: qty, workshops: ws };
    }
    function total() {
      var c = current();
      return c.pass.price * c.qty + c.workshops.reduce(function (s, k) { return s + WORKSHOPS[k].price; }, 0);
    }

    function render() {
      var c = current(), t = total();
      var html = '<div class="summary-line"><span>' + c.pass.label + " × " + c.qty + "</span><strong>" + money(c.pass.price * c.qty) + "</strong></div>";
      c.workshops.forEach(function (k) {
        html += '<div class="summary-line"><span>' + WORKSHOPS[k].label + ' × 1</span><strong>' + money(WORKSHOPS[k].price) + "</strong></div>";
      });
      html += '<div class="summary-line"><span>Kids under 12</span><strong>Free</strong></div>';
      html += '<div class="summary-line"><span>Fees</span><strong>None — ever</strong></div>';
      html += '<div class="summary-line total"><span>Total</span><span>' + money(t) + "</span></div>";
      linesEl.innerHTML = html;
      btn.textContent = "Review order — " + money(t) + " total";
    }

    [passSel, qtySel].forEach(function (el) { el.addEventListener("change", render); });
    /* tier-card buttons on this page update the form in place */
    Array.prototype.forEach.call(document.querySelectorAll("[data-pass-link]"), function (a) {
      a.addEventListener("click", function () {
        var v = a.getAttribute("data-pass-link");
        for (var i = 0; i < passSel.options.length; i++) {
          if (passSel.options[i].value === v) { passSel.selectedIndex = i; break; }
        }
        render();
      });
    });
    Object.keys(boxes).forEach(function (k) { if (boxes[k]) boxes[k].addEventListener("change", render); });

    function setErr(input, id, bad) {
      var e = document.getElementById(id);
      if (e) e.classList.toggle("show", bad);
      input.classList.toggle("invalid", bad);
      return !bad;
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var ok = true;
      ok = setErr(name, "err-name", name.value.trim().length < 2) && ok;
      ok = setErr(email, "err-email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) && ok;
      if (!ok) { var f = form.querySelector(".invalid"); if (f) f.focus(); return; }
      var c = current(), t = total();
      var ref = "SMF-" + (1000 + Math.floor(Math.random() * 9000));
      document.getElementById("conf-ref").textContent = ref;
      document.getElementById("conf-detail").textContent =
        c.pass.label + " × " + c.qty +
        (c.workshops.length ? " · Workshops: " + c.workshops.map(function (k) { return WORKSHOPS[k].label; }).join(", ") : " · No workshops") +
        " · Total " + money(t);
      document.getElementById("conf-email").textContent = email.value.trim();
      try {
        localStorage.setItem("smf-order", JSON.stringify({ ref: ref, pass: passSel.value, qty: c.qty, workshops: c.workshops, total: t, email: email.value.trim() }));
        localStorage.removeItem(PASS_KEY); localStorage.removeItem(WORKSHOP_KEY);
      } catch (e) {}
      layout.hidden = true;
      confirm.hidden = false;
      confirm.setAttribute("tabindex", "-1");
      confirm.focus();
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", function () { initLinks(); initTickets(); });
})();
