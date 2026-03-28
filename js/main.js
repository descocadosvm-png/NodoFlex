// Mostrar sección de suscripción y hacer scroll al formulario al hacer clic en 'Contacto'
document.addEventListener('DOMContentLoaded', function () {
    const btnContacto = document.getElementById('btn-contacto');
    const seccionSuscripcion = document.getElementById('solicitar-suscripcion');
    const form = document.getElementById('form-nodoflex');
    if (btnContacto && seccionSuscripcion && form) {
        btnContacto.addEventListener('click', function (e) {
            e.preventDefault();
            seccionSuscripcion.classList.remove('hidden');
            setTimeout(function() {
                const yOffset = -60; // Ajusta según el alto del navbar
                const y = form.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 100);
        });
    }
});
// Ocultar logo superior suavemente al hacer scroll
document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('logo-superior');
    if (logo) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                logo.style.opacity = '0';
                logo.style.pointerEvents = 'none';
            } else {
                logo.style.opacity = '1';
                logo.style.pointerEvents = '';
            }
        });
    }
});
// --- Efecto 3D Parallax en tarjetas de "Cómo funciona" ---
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 14; // grados
            const rotateX = -((y - centerY) / centerY) * 12;
            card.style.setProperty('--rotateY', `${rotateY}deg`);
            card.style.setProperty('--rotateX', `${rotateX}deg`);
            card.style.setProperty('--glowX', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--glowY', `${(y / rect.height) * 100}%`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotateY', '0deg');
            card.style.setProperty('--rotateX', '0deg');
            card.style.setProperty('--glowX', '50%');
            card.style.setProperty('--glowY', '50%');
        });
        card.addEventListener('focus', () => {
            card.style.setProperty('--rotateY', '0deg');
            card.style.setProperty('--rotateX', '0deg');
            card.style.setProperty('--glowX', '50%');
            card.style.setProperty('--glowY', '50%');
        });
    });
});
// Funcion para detectar el scroll y activar animaciones
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // Distancia para activar
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);

// Ejecutar una vez al cargar por si el usuario ya esta en medio de la pagina
reveal();

// --- TSParticles Animation (de animation.js) ---
window.addEventListener('DOMContentLoaded', function () {
    if (window.tsParticles) {
        tsParticles.load("tsparticles", {
            background: {
                color: { value: "#121417" }
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: false, mode: "push" },
                    onHover: { enable: true, mode: "attract" },
                    resize: true
                },
                modes: {
                    attract: {
                        distance: 200,
                        duration: 0.4,
                        speed: 1.5
                    }
                }
            },
            particles: {
                color: { value: "#00A3FF" },
                links: {
                    color: "#00A3FF",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                collisions: { enable: false },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: { default: "bounce" },
                    random: false,
                    speed: 1.2,
                    straight: false
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 60
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 4 } }
            },
            detectRetina: true
        });
    }
});

// Lógica exclusiva para la sección #suscripciones (formulario y selección de plan)
document.addEventListener('DOMContentLoaded', function () {
    // Selección de plan desde botón SOLO si existe la sección
    var contacto = document.getElementById('contacto');
    if (contacto) {
        document.querySelectorAll('.btn-subscribe').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var plan = btn.getAttribute('data-plan');
                var select = document.getElementById('plan');
                if (select) {
                    if (plan === 'inicial') select.value = 'sinergia';
                    if (plan === 'pro') select.value = 'quantum';
                    if (plan === 'enterprise') select.value = 'enterprise';
                    contacto.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Envío de formulario
        var form = document.getElementById('form-nodoflex');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var nombre = document.getElementById('nombre').value;
                var email = document.getElementById('email').value;
                var plan = document.getElementById('plan').value;
                var mensajeEstado = document.getElementById('mensaje-estado');
                mensajeEstado.classList.remove('hidden');
                mensajeEstado.textContent = 'Enviando...';
                fetch('https://n8n.nodoflex.com/webhook/nodoflex', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, email, plan })
                })
                .then(function(response) {
                    if (response.ok) {
                        mensajeEstado.textContent = '¡Solicitud enviada con éxito! Nos pondremos en contacto.';
                        mensajeEstado.classList.remove('text-red-500');
                        mensajeEstado.classList.add('text-green-500');
                        form.reset();
                    } else {
                        throw new Error('Error en el envío');
                    }
                })
                .catch(function() {
                    mensajeEstado.textContent = 'Hubo un error. Intenta nuevamente.';
                    mensajeEstado.classList.remove('text-green-500');
                    mensajeEstado.classList.add('text-red-500');
                });
            });
        }
    }
});
