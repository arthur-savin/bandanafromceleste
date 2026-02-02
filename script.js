// ============================================
// HEADER STICKY & SCROLL EFFECTS
// ============================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter classe "scrolled" après un certain scroll
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Fermer le menu au clic sur un lien
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ============================================
// SCROLL ANIMATIONS (Fade In Up)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer toutes les sections et cartes
const elementsToAnimate = document.querySelectorAll(`
    .hero-text,
    .hero-visual,
    .section-header,
    .tarifs-section-header,
    .tarif-card,
    .tarifs-custom-block,
    .tarifs-fabrication,
    .tarifs-bandana-colors,
    .product-card,
    .step-card,
    .size-guide-card,
    .review-card,
    .apropos-text,
    .apropos-visual,
    .reassurance-item,
    .newsletter-content,
    .faq-item
`);

elementsToAnimate.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});

// ============================================
// FAQ ACCORDÉON
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fermer tous les autres items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle l'item actuel
        item.classList.toggle('active', !isActive);
    });
});

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les ancres vides
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const email = emailInput.value;
        
        // Validation basique
        if (email && email.includes('@')) {
            // Ici vous pouvez ajouter votre logique d'envoi
            // Par exemple, une requête AJAX vers votre backend
            
            // Feedback visuel
            const button = newsletterForm.querySelector('.btn');
            const originalText = button.textContent;
            button.textContent = '✓ Code envoyé !';
            button.style.background = 'var(--color-success)';
            
            // Réinitialiser après 3 secondes
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                emailInput.value = '';
            }, 3000);
            
            console.log('Email enregistré:', email);
        } else {
            // Afficher une erreur
            emailInput.style.borderColor = 'var(--color-accent)';
            setTimeout(() => {
                emailInput.style.borderColor = '';
            }, 2000);
        }
    });
}

// ============================================
// PRODUCT CARD HOVER EFFECTS (déjà géré en CSS)
// ============================================

// Les effets hover sont déjà gérés par le CSS
// Mais on peut ajouter des micro-interactions supplémentaires si besoin

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Animation supplémentaire si nécessaire
    });
});

// ============================================
// SPARKLE ANIMATION SUR LE CTA HERO
// ============================================

// L'animation sparkle est déjà gérée par le CSS avec @keyframes
// Mais on peut ajouter une interaction au clic

const heroCTA = document.querySelector('.hero .btn-primary');

if (heroCTA) {
    heroCTA.addEventListener('click', function(e) {
        // Créer un effet de particules au clic
        createSparkleEffect(e.clientX, e.clientY);
    });
}

function createSparkleEffect(x, y) {
    const sparkles = ['✦', '✧', '✩', '✪', '✫'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('span');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.color = 'var(--color-accent)';
        sparkle.style.zIndex = '10000';
        sparkle.style.animation = `sparkleFloat ${0.5 + Math.random() * 0.5}s ease-out forwards`;
        
        document.body.appendChild(sparkle);
        
        // Animation de flottement
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 50 + Math.random() * 30;
        const finalX = x + Math.cos(angle) * distance;
        const finalY = y + Math.sin(angle) * distance;
        
        sparkle.style.setProperty('--final-x', finalX + 'px');
        sparkle.style.setProperty('--final-y', finalY + 'px');
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Ajouter l'animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        to {
            transform: translate(calc(var(--final-x) - 50%), calc(var(--final-y) - 50%)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// LAZY LOADING DES IMAGES (si vous ajoutez de vraies images plus tard)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PERFORMANCE: Debounce pour le scroll
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimiser les événements de scroll
const optimizedScrollHandler = debounce(() => {
    // Logique de scroll optimisée
}, 10);

// ============================================
// GALLERY CAROUSEL AUTO-SCROLL
// ============================================

const galleryCarousel = document.getElementById('galleryCarousel');

if (galleryCarousel) {
    // Observer pour animer le carrousel quand il entre dans le viewport
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                // Optionnel: pause quand hors vue pour économiser les ressources
                // entry.target.style.animationPlayState = 'paused';
            }
        });
    }, {
        threshold: 0.1
    });

    galleryObserver.observe(galleryCarousel);

    // Ajouter les items de la galerie à l'animation scroll
    const galleryItems = galleryCarousel.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.classList.add('fade-in-up');
        observer.observe(item);
    });
}

// ============================================
// INITIALISATION AU CHARGEMENT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ bandanafromceleste - Site chargé');
    
    // Vérifier si on est déjà en haut de page
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    }
});

