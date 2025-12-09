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
       
    }

    createSmallCircleBar('frontend-circle', 'frontend-circle-label', 0.55);
    createSmallCircleBar('backend-circle', 'backend-circle-label', 0.40);
    createSmallCircleBar('programming-circle', 'programming-circle-label', 0.60);

    // Dark mode toggle
    const darkToggle = document.getElementById('dark-toggle');
    const darkIcon = document.getElementById('dark-icon');
    function updateDarkButton() {
        if(!darkToggle || !darkIcon) return;
        const isDark = document.documentElement.classList.contains('dark');
        darkToggle.classList.remove('bg-slate-800', 'bg-white');
        darkToggle.classList.toggle('text-yellow-300', isDark);
        darkToggle.classList.toggle('text-primary', !isDark);
        darkIcon.classList.toggle('bulb-on', isDark);
        darkIcon.classList.toggle('bulb-off', !isDark);
        darkIcon.classList.remove('bulb-flash');
        void darkIcon.offsetWidth;
        darkIcon.classList.add('bulb-flash');
    }
    function setDarkModeClass(isDark) {
        if(isDark) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }
    darkToggle.addEventListener('click', function() {
        const isDark = !document.documentElement.classList.contains('dark');
        setDarkModeClass(isDark);
        // Optionally save preference
        if(isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        updateDarkButton();
        console.log('Dark mode toggled. Now dark:', isDark);
    });
    // Load theme preference
    if(localStorage.getItem('theme') === 'dark') {
        setDarkModeClass(true);
    } else {
        setDarkModeClass(false);
    }
    updateDarkButton();

    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'en';
    const translations = {
        en: {
            home: 'Home', skills: 'Skills', education: 'Education', experience: 'Experience', projects: 'Projects',
            heroTitle: "Hi all, I'm Andres",
            heroDesc: "I'm a Colombia-based software developer, currently open to work! I love helping new ideas come to life and building with a modern approach.",
            downloadResume: 'Download Resume', contactMe: 'Contact Me',
            heroResume: 'Download Resume',
            heroContact: 'Contact Me',
            skillsTitle: 'Skills & Proficiency',
            skillsRole: 'Junior Frontend Developer',
            skillsReact: 'Building responsive Single-Page-Websites (SPA) & PWA in React.js',
            skillsNext: 'Building responsive static websites using Next.js',
            skillsProficiency: 'Proficiency',
            skillsFrontend: 'Frontend/Design',
            skillsBackend: 'Backend',
            skillsProgramming: 'Programming',
            educationTitle: 'Education',
            workTitle: 'Work Experience',
            projectsTitle: 'Projects',
            contactTitle: 'Contact me!',
            whatsapp: 'Send me a message on WhatsApp!',
            // Experience cards
            exp1Title: 'Freelance Software Developer',
            exp1Company: 'Misc · November 2022 - Present',
            exp1Desc: "While freelancing, I picked up small jobs here and there: I diagnosed and repaired computers, and even set up LLMs for a small AI project of my own. I also worked on web design for a small local business, where I took on the challenge of making a shopping cart and a dashboard for view metrics.",
            exp2Title: 'Commercial Assistant & Analyst',
            exp2Company: 'Coexnort - Group Coex · January 2021 - July 2021',
            exp2Desc: "After my internship, I stayed a few months to keep up with the team, where I thrived managing the data and raising potential clients by roughly 15%.",
            exp3Title: 'Commercial Assistant Intern',
            exp3Company: 'Coexnort - Group Coex · January 2021 - July 2021',
            exp3Desc: "Internship, where I was able to learn about customs first hand, managing emails with clients and interacting with them. It was, for me, a personal eye-opener. It's also where my love for data and automatizations grew. I was able to make a simple auto response for my boss, with notifications for when and how a meeting with a client was happening.",
            // Projects cards
            proj1Title: 'Dashboard for view count',
            proj1Desc: 'For one of my projects, I had to make a dashboard, so I took the opportunity to create one for myself.',
            proj1Btn: 'Live Preview',
            proj2Title: 'Shopping Cart',
            proj2Desc: 'Following the Dashboard I was asked to do the frontend on a shopping cart, so I took a modern-purple approach.',
            proj2Btn: 'Live Preview',
            proj3Title: 'Crunchyroll-like anime page',
            proj3Desc: 'A passion project with friends! We are trying to make an anime player, with manga as extra content. Our idea is to make it functional, but only for demo purposes ;)',
            proj3Btn: 'View Repository',
            proj4Title: 'Landing for Psychologist',
            proj4Desc: 'Landing page with glass effect and clear CTAs for a clinical psychologist specialized in hypnotherapy.',
            proj4Btn: 'Open site',
            proj5Title: 'RapidExpress (Java CLI + MySQL)',
            proj5Desc: 'Logistics management system with roles and routes, MVC architecture in Java and MySQL database.',
            proj5Btn: 'View repository',
            // Education cards
            edu1Title: 'University of Santander UDES',
            edu1Degree: 'Bachelor in Foreign Trade',
            edu1Date: 'August 2017 - November 2022',
            edu1Desc: 'Expert in charge of the management, coordination and optimization of commercial operations between different countries, facilitating the flow of goods, services and capital across borders. With great knowledge of customs laws, and operations.',
            edu2Title: 'Campuslands',
            edu2Degree: 'Backend Software Development Technologist',
            edu2Date: 'March 2025 to Present',
            edu2Desc: 'A scholarship where I have the valuable opportunity to grow my abilities to program increasingly incredible things! At the moment I am well versed in Python, Java, Javascript, HTML & CSS, with knowledge in SQL & NoSQL databases.',
            // Footer and contact
            footerSlogan: 'Turning ideas into reality with code',
            footerCopyright: '© 2025 Andres Felipe Mendoza Gomez. All rights reserved.',
            contactWhatsApp: 'Send me a message on WhatsApp!',
            heroResumeEn: 'Download Resume in English',
            heroResumeEs: 'Download Resume in Spanish',
        },
        es: {
            home: 'Inicio', skills: 'Habilidades', education: 'Educación', experience: 'Experiencia', projects: 'Proyectos',
            heroTitle: "Hola a todos, soy Andres",
            heroDesc: "¡Soy un desarrollador de software colombiano, actualmente disponible para trabajar! Me encanta ayudar a dar vida a nuevas ideas y construir con un enfoque moderno.",
            downloadResume: 'Descargar CV', contactMe: 'Contáctame',
            heroResume: 'Descargar CV',
            heroContact: 'Contáctame',
            skillsTitle: 'Habilidades y Competencias',
            skillsRole: 'Desarrollador Frontend Junior',
            skillsReact: 'Construyendo sitios web de una sola página (SPA) y PWA en React.js',
            skillsNext: 'Construyendo sitios web estáticos responsivos usando Next.js',
            skillsProficiency: 'Competencia',
            skillsFrontend: 'Frontend/Diseño',
            skillsBackend: 'Backend',
            skillsProgramming: 'Programación',
            educationTitle: 'Educación',
            workTitle: 'Experiencia Laboral',
            projectsTitle: 'Proyectos',
            contactTitle: '¡Contáctame!',
            whatsapp: '¡Envíame un mensaje por WhatsApp!',
            // Experience cards
            exp1Title: 'Desarrollador de Software Freelance',
            exp1Company: 'Varios · Noviembre 2022 - Presente',
            exp1Desc: "Como freelance, tomé pequeños trabajos: diagnostiqué y reparé computadoras, e incluso configuré LLMs para un pequeño proyecto de IA propio. También trabajé en diseño web para un negocio local, donde asumí el reto de hacer un carrito de compras y un dashboard de métricas.",
            exp2Title: 'Asistente Comercial y Analista',
            exp2Company: 'Coexnort - Grupo Coex · Enero 2021 - Julio 2021',
            exp2Desc: "Después de mi pasantía, me quedé unos meses más con el equipo, donde destaqué gestionando datos y aumentando los clientes potenciales en aproximadamente un 15%.",
            exp3Title: 'Practicante Asistente Comercial',
            exp3Company: 'Coexnort - Grupo Coex · Enero 2021 - Julio 2021',
            exp3Desc: "Pasantía donde aprendí sobre aduanas de primera mano, gestionando correos y clientes. Fue una experiencia reveladora. También nació mi gusto por los datos y automatizaciones. Logré hacer una auto respuesta para mi jefe, con notificaciones para reuniones con clientes.",
            // Projects cards
            proj1Title: 'Dashboard para conteo de vistas',
            proj1Desc: 'Para uno de mis proyectos, tuve que hacer un dashboard, así que aproveché para crear uno para mí.',
            proj1Btn: 'Vista en Vivo',
            proj2Title: 'Carrito de Compras',
            proj2Desc: 'Después del Dashboard me pidieron hacer el frontend de un carrito de compras, así que usé un estilo moderno-morado.',
            proj2Btn: 'Vista en Vivo',
            proj3Title: 'Página de anime tipo Crunchyroll',
            proj3Desc: '¡Un proyecto de pasión con amigos! Estamos intentando hacer un reproductor de anime, con manga como contenido extra. La idea es que sea funcional, pero solo con fines demo ;)',
            proj3Btn: 'Ver repositorio',
            proj4Title: 'Landing para Psicóloga',
            proj4Desc: 'Landing page con efecto glass y llamados claros a la acción para una psicóloga clínica especialista en hipnoterapia.',
            proj4Btn: 'Abrir sitio',
            proj5Title: 'RapidExpress (Java CLI + MySQL)',
            proj5Desc: 'Sistema de gestión logística con roles y rutas, arquitectura MVC en Java y base de datos MySQL.',
            proj5Btn: 'Ver repositorio',
            // Education cards
            edu1Title: 'Universidad de Santander UDES',
            edu1Degree: 'Licenciatura en Comercio Exterior',
            edu1Date: 'Agosto 2017 - Noviembre 2022',
            edu1Desc: 'Experto encargado de la gestión, coordinación y optimización de operaciones comerciales entre diferentes países, facilitando el flujo de bienes, servicios y capital a través de fronteras. Con gran conocimiento de leyes aduaneras y operaciones.',
            edu2Title: 'Campuslands',
            edu2Degree: 'Tecnólogo en Desarrollo Backend',
            edu2Date: 'Marzo 2025 a la fecha',
            edu2Desc: 'Una beca donde tengo la valiosa oportunidad de crecer mis habilidades para programar cosas cada vez más increíbles. Actualmente domino Python, Java, Javascript, HTML & CSS, con conocimientos en bases de datos SQL y NoSQL.',
            // Footer and contact
            footerSlogan: 'Convirtiendo ideas en realidad con código',
            footerCopyright: '© 2025 Andres Felipe Mendoza Gomez. Todos los derechos reservados.',
            contactWhatsApp: '¡Envíame un mensaje por WhatsApp!',
            heroResumeEn: 'Descargar hoja de vida en inglés',
            heroResumeEs: 'Descargar hoja de vida en español',
        }
    };
    function setLanguage(lang) {
        currentLang = lang;
        // Navigation
        document.querySelectorAll('nav ul li a')[0].textContent = translations[lang].home;
        document.querySelectorAll('nav ul li a')[1].textContent = translations[lang].skills;
        document.querySelectorAll('nav ul li a')[2].textContent = translations[lang].education;
        document.querySelectorAll('nav ul li a')[3].textContent = translations[lang].experience;
        document.querySelectorAll('nav ul li a')[4].textContent = translations[lang].projects;
        // Hero
        document.querySelector('h1').textContent = translations[lang].heroTitle;
        document.querySelector('.text-xl.text-slate-600.mb-6').textContent = translations[lang].heroDesc;
        document.querySelector('a[href*="drive.google.com"]').textContent = translations[lang].downloadResume;
        document.querySelector('a[href="#contact"]').textContent = translations[lang].contactMe;
        // Hero buttons
        document.querySelectorAll('[data-translate-hero]').forEach(el => {
            el.textContent = translations[lang][el.getAttribute('data-translate-hero')];
        });
        // Hero resume buttons
        const resumeEn = document.querySelector('[data-translate-hero="heroResumeEn"]');
        const resumeEs = document.querySelector('[data-translate-hero="heroResumeEs"]');
        if (lang === 'en') {
            resumeEn.style.display = '';
            resumeEs.style.display = 'none';
        } else {
            resumeEn.style.display = 'none';
            resumeEs.style.display = '';
        }
        resumeEn.textContent = translations[lang].heroResumeEn;
        resumeEs.textContent = translations[lang].heroResumeEs;
        // Skills
        document.querySelector('.section-title').textContent = translations[lang].skillsTitle;
        document.querySelector('h3.text-2xl.font-bold.mb-6').textContent = translations[lang].skillsProficiency;
        document.querySelectorAll('.font-medium.w-40')[0].textContent = translations[lang].skillsFrontend;
        document.querySelectorAll('.font-medium.w-40')[1].textContent = translations[lang].skillsBackend;
        document.querySelectorAll('.font-medium.w-40')[2].textContent = translations[lang].skillsProgramming;
        // Skills section
        document.querySelectorAll('[data-translate-skills]').forEach(el => {
            el.textContent = translations[lang][el.getAttribute('data-translate-skills')];
        });
        // Education
        document.querySelectorAll('.section-title')[1].textContent = translations[lang].educationTitle;
        // Education cards (if data-translate)
        document.querySelectorAll('[data-translate-edu]').forEach(el => {
            el.textContent = translations[lang][el.getAttribute('data-translate-edu')];
        });
        // Experience
        document.querySelectorAll('.section-title')[2].textContent = translations[lang].workTitle;
        // Experience cards (if data-translate)
        document.querySelectorAll('[data-translate-exp]').forEach(el => {
            el.textContent = translations[lang][el.getAttribute('data-translate-exp')];
        });
        // Projects
        document.querySelectorAll('.section-title')[3].textContent = translations[lang].projectsTitle;
        // Projects cards (if data-translate) with graceful fallback to avoid undefined
        const langMap = translations[lang] || translations.en;
        document.querySelectorAll('[data-translate-proj]').forEach(el => {
            const key = el.getAttribute('data-translate-proj');
            const value = (langMap && langMap[key]) ? langMap[key] : (el.textContent || key || '');
            if (el.tagName === 'A' || el.tagName === 'BUTTON') {
                const icon = el.getAttribute('data-icon');
                el.innerHTML = icon ? `<i class="${icon}"></i> ${value}` : value;
            } else {
                el.textContent = value;
            }
        });
        // Contact
        document.querySelectorAll('.section-title')[4].textContent = translations[lang].contactTitle;
        document.querySelector('.fa-whatsapp').nextSibling.textContent = ' ' + translations[lang].whatsapp;
        // Footer
        document.querySelectorAll('[data-translate-footer]').forEach(el => {
            el.textContent = translations[lang][el.getAttribute('data-translate-footer')];
        });
        // Contact WhatsApp
        document.querySelectorAll('[data-translate-contact]').forEach(el => {
            el.textContent = translations[lang][el.getAttribute('data-translate-contact')];
        });
    }
    langToggle.addEventListener('click', function() {
        setLanguage(currentLang === 'en' ? 'es' : 'en');
        langToggle.textContent = currentLang === 'en' ? 'EN/ES' : 'ES/EN';
    });
    // Optionally, set initial language based on browser
    // setLanguage(navigator.language.startsWith('es') ? 'es' : 'en');
});
