document.addEventListener('DOMContentLoaded', () => {
    /* Mobile Navigation */
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        navMenu.classList.toggle('open');
    };

    navToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link =>
        link.addEventListener('click', () => navMenu.classList.remove('open'))
    );

    /* Active link highlight on scroll */
    const sections = document.querySelectorAll('section[id]');
    const activateMenuAtCurrentSection = () => {
        const checkpoint = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const inView = checkpoint >= sectionTop && checkpoint <= sectionTop + sectionHeight;

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}` && inView);
            });
        });
    };
    window.addEventListener('scroll', activateMenuAtCurrentSection);
    activateMenuAtCurrentSection();

    /* Animated skill bars */
    const fills = document.querySelectorAll('.fill');

    const animateBars = () => {
        fills.forEach(fill => {
            const rect = fill.getBoundingClientRect();
            const inView = rect.top < window.innerHeight - 80;
            if (inView && !fill.dataset.animated) {
                fill.style.width = fill.dataset.width;
                fill.dataset.animated = true;
            }
        });
    };

    window.addEventListener('scroll', animateBars);
    animateBars();

    /* Contact form submission */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const data = Object.fromEntries(new FormData(form).entries());
            console.log('Contact request:', data);
            alert('Thanks for reaching out! I will respond shortly.');
            form.reset();

            fills.forEach(fill => {
                fill.style.width = '0';
                delete fill.dataset.animated;
            });
            animateBars();
        });
    }
});
