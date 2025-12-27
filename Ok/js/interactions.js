// ===== INTERACTIONS MODULE =====
export class Interactions {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupLikeButtons();
        this.setupFollowButtons();
        this.setupLoadMore();
        this.setupNewsletter();
        this.setupCardClicks();
        this.setupParallax();
    }

    // Scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(`
            .wallet-card,
            .step-card,
            .collection-card,
            .nft-card,
            .influencer-card,
            .section-header
        `);

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    }

    // Like button functionality
    setupLikeButtons() {
        document.querySelectorAll('.nft-card__favorites').forEach(likeBtn => {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const span = this.querySelector('span');
                if (span) {
                    let count = parseInt(span.textContent) || 0;
                    count++;
                    span.textContent = count;
                    
                    // Animation
                    this.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });
    }

    // Follow button functionality
    setupFollowButtons() {
        document.querySelectorAll('.influencer-card .btn--primary').forEach(btn => {
            if (btn.textContent.trim() === 'Follow') {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    if (this.textContent.trim() === 'Follow') {
                        this.textContent = 'Following';
                        this.style.background = 'transparent';
                        this.style.border = '2px solid var(--color-primary)';
                    } else {
                        this.textContent = 'Follow';
                        this.style.background = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)';
                        this.style.border = 'none';
                    }
                });
            }
        });
    }

    // Load more functionality
    setupLoadMore() {
        document.querySelectorAll('.btn--outline').forEach(btn => {
            if (btn.textContent.includes('Load more') || btn.textContent.includes('view all')) {
                btn.addEventListener('click', function() {
                    const originalText = this.textContent;
                    this.textContent = 'Loading...';
                    this.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.pointerEvents = 'auto';
                        alert('✨ More content loaded! (This is a demo)');
                    }, 1500);
                });
            }
        });
    }

    // Newsletter subscription
    setupNewsletter() {
        const subscribeForm = document.querySelector('.subscribe__form');
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const input = this.querySelector('.subscribe__input');
                const email = input.value;
                
                if (email && email.includes('@')) {
                    const btn = this.querySelector('.subscribe__btn');
                    btn.style.transform = 'scale(1.2)';
                    
                    setTimeout(() => {
                        btn.style.transform = 'scale(1)';
                        alert('🎉 Thank you for subscribing! You will be notified about the next NFT drop.');
                        input.value = '';
                    }, 300);
                } else {
                    input.style.borderColor = '#EF4444';
                    input.style.animation = 'shake 0.5s';
                    
                    setTimeout(() => {
                        input.style.borderColor = 'var(--color-border)';
                        input.style.animation = '';
                    }, 500);
                }
            });
        }
    }

    // Card click navigation - removed, handled in index.html directly

    // Parallax effect for hero glows
    setupParallax() {
        window.addEventListener('mousemove', (e) => {
            const glows = document.querySelectorAll('.hero__glow');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            glows.forEach((glow, index) => {
                const speed = (index + 1) * 20;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                
                glow.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }
}

