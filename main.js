// Zoom imágenes

const main = document.querySelector("#main");
const images = document.querySelectorAll(".bg");

let isMobile = window.innerWidth <= 768;
let total = main.offsetHeight - window.innerHeight;
let rafId = null;

function applyScale() {
    const scrolled = Math.min(Math.max(window.scrollY - main.offsetTop, 0), total);
    const rect = main.getBoundingClientRect();
    const progress = 1 - (rect.bottom / window.innerHeight);

    const start = isMobile ? 1.35 : 1.15;
    const scale = start - ((start - 1.2) * progress);

    images.forEach(img => {
    if (isMobile && img.classList.contains("imagen1")) return;
        img.style.transform = `scale(${scale})`;
    });
}

window.addEventListener("resize", () => {
    isMobile = window.innerWidth <= 768;
    total = main.offsetHeight - window.innerHeight;
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

/* Transición*/

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

// Countdown

const fechaBoda = new Date("2026-12-06T00:00:00").getTime();

function actualizarCountdown() {
    const ahora = new Date().getTime();
    const diferencia = fechaBoda - ahora;

    if (diferencia <= 0) {
        const countdown = document.getElementById("countdown");
        countdown.classList.add("evento_hoy");
        countdown.innerHTML = "Hoy es el gran día";
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

setInterval(actualizarCountdown, 1000);
actualizarCountdown();
