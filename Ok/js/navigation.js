// ===== NAVIGATION MODULE =====
export class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupHeaderScroll();
        this.setupActiveLinks();
        this.setupMobileMenu();
    }

    // Smooth scrolling for anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Header scroll effect
    setupHeaderScroll() {
        let lastScroll = 0;
        const header = document.querySelector('.header');

        if (!header) return;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.style.transform = 'translateY(0)';
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Set active navigation links
    setupActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('nav__link--active');
            }
        });
    }

    // Mobile menu toggle
    setupMobileMenu() {
        if (window.innerWidth <= 768) {
            const header = document.querySelector('.header__content');
            const nav = document.querySelector('.header__nav');
            
            if (!header || !nav) return;

            // Check if menu button already exists
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = '☰';
                menuBtn.style.cssText = `
                    display: block;
                    font-size: 28px;
                    background: transparent;
                    border: none;
                    color: var(--color-text-primary);
                    cursor: pointer;
                    padding: 10px;
                `;
                
                header.insertBefore(menuBtn, nav);
                
                menuBtn.addEventListener('click', () => {
                    const isOpen = nav.style.display === 'flex';
                    nav.style.display = isOpen ? 'none' : 'flex';
                    nav.style.flexDirection = 'column';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.right = '0';
                    nav.style.background = 'var(--color-bg-darker)';
                    nav.style.padding = '20px';
                    nav.style.borderBottom = '1px solid var(--color-border)';
                    nav.style.zIndex = '1000';
                });
            }
        }
    }
}



