// Tailwind config
 tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#7e22ce',
                secondary: '#3b0764',
                dark: '#0f172a'
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            }
        }
    }
};

// Animación personalizada para barras de progreso redondeadas
function animateBar(barId, labelId, percent, duration = 1200) {
    const bar = document.getElementById(barId);
    const label = document.getElementById(labelId);
    let start = null;
    const finalWidth = percent;
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = Math.floor(progress * finalWidth);
        bar.style.width = current + '%';
        label.textContent = current + '%';
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            bar.style.width = finalWidth + '%';
            label.textContent = finalWidth + '%';
        }
    }
    requestAnimationFrame(step);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const menuButton = document.querySelector('.md\\:hidden');
    if(menuButton) {
        menuButton.addEventListener('click', () => {
            alert('Mobile menu functionality would go here');
        });
    }

    // Activar animación fade-in al cargar la página
    document.querySelectorAll('.fade-in').forEach((el) => {
        void el.offsetWidth;
    });

    // Reiniciar la animación slide-up-fade en las secciones al cargar la página (versión robusta)
    document.querySelectorAll('section').forEach((section, i) => {
        if (section.classList.contains('slide-up-fade')) {
            section.classList.remove('slide-up-fade');
            void section.offsetWidth;
            requestAnimationFrame(() => {
                setTimeout(() => {
                    section.classList.add('slide-up-fade');
                }, 100 + i * 100);
            });
        }
    });

    // Barras circulares para las tres habilidades
    function createSmallCircleBar(containerId, labelId, value) {
        var label = document.getElementById(labelId);
        var bar = new ProgressBar.Circle('#' + containerId, {
            strokeWidth: 12,
            easing: 'easeInOut',
            duration: 1400,
            color: '#7e22ce',
            trailColor: '#eee',
            trailWidth: 12,
            svgStyle: {width: '65px', height: '65px', display: 'block'},
            step: function(state, bar) {
                var val = Math.round(bar.value() * 100);
                label.textContent = val + '%';
            }
        });
        bar.animate(value);
        // Eliminado: No modificar manualmente el viewBox ni el path
    }

    createSmallCircleBar('frontend-circle', 'frontend-circle-label', 0.55);
    createSmallCircleBar('backend-circle', 'backend-circle-label', 0.40);
    createSmallCircleBar('programming-circle', 'programming-circle-label', 0.60);
});
