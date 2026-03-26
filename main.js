//  Zoom imágenes

const main = document.querySelector("#main");
const images = document.querySelectorAll(".bg");

let isMobile = window.innerWidth <= 768;
let total = main.offsetHeight - window.innerHeight;
let rafId = null;

function applyScale() {
    const rect = main.getBoundingClientRect();
    const progress = 1 - (rect.bottom / window.innerHeight);

    const start = isMobile ? 1.35 : 1.15;
    const scale = start - ((start - 1.1) * progress);

    images.forEach(img => {
        if (isMobile && img.classList.contains("imagen1")) return;
        img.style.transform = `scale(${scale})`;
    });
}

window.addEventListener("resize", () => {
    isMobile = window.innerWidth <= 768;
    total = main.offsetHeight - window.innerHeight;
    moverContenido();
});

window.addEventListener("scroll", () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
        rafId = null;
        applyScale();
    });
}, { passive: true });

if (document.readyState === "complete") {
    applyScale();
} else {
    window.addEventListener("load", applyScale);
}

//  Mover fecha y countdown según pantalla

function moverContenido() {
    const esMobile = window.innerWidth <= 480;

    const panelDos = document.querySelector('.fondo--principal');
    const panelTres = document.querySelector('.fondo--tercero');

    const fecha = document.querySelector('.fecha');
    const countdown = document.getElementById('countdown');

    if (!panelDos || !panelTres || !fecha || !countdown) return;

    if (esMobile) {
        panelTres.appendChild(fecha);
        panelTres.appendChild(countdown);
    } else {
        panelDos.appendChild(fecha);
        panelDos.appendChild(countdown);
    }
}

//  Transición

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.6
});

document.querySelectorAll(".fade").forEach(el => {
    observer.observe(el);
});

// ── Countdown ──

const fechaBoda = new Date("2026-12-05T00:00:00").getTime();

function actualizarCountdown() {
    const ahora = new Date().getTime();
    const diferencia = fechaBoda - ahora;

    if (diferencia <= 0) {
        const countdown = document.getElementById("countdown");
        countdown.classList.add("evento_hoy");
        countdown.innerHTML = "Hoy es el gran día";
        return;
    }

    const dias    = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas   = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    actualizarValor("dias",     String(dias).padStart(2, "0"));
    actualizarValor("horas",    String(horas).padStart(2, "0"));
    actualizarValor("minutos",  String(minutos).padStart(2, "0"));
    actualizarValor("segundos", String(segundos).padStart(2, "0"));
}

function actualizarValor(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent === value) return;

    el.classList.remove("animate");
    void el.offsetWidth;
    el.textContent = value;
    el.classList.add("animate");
}

// ── Init ──

moverContenido();
setInterval(actualizarCountdown, 1000);
actualizarCountdown();