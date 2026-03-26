// Zoom imágenes

const main = document.querySelector("#main");
const images = document.querySelectorAll(".bg");

window.addEventListener("scroll", () => {
    const rect = main.getBoundingClientRect();
    const total = main.offsetHeight - window.innerHeight;
    const scroll = Math.min(Math.max(-rect.top, 0), total);
    const progress = total > 0 ? scroll / total : 0;

    const start = 1.15;
    const end = 1.0;

    const scale = start - ((start - end) * progress);

    images.forEach((img) => {
        img.style.transform = `scale(${scale})`;
    });
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
