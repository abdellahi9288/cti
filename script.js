// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 31, 95, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 31, 95, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Basic validation
    let isValid = true;
    let errorMessage = '';
    
    if (!name || name.trim().length < 2) {
        isValid = false;
        errorMessage += 'Le nom doit contenir au moins 2 caractères.\n';
    }
    
    if (!email || !isValidEmail(email)) {
        isValid = false;
        errorMessage += 'Veuillez entrer une adresse email valide.\n';
    }
    
    if (!message || message.trim().length < 10) {
        isValid = false;
        errorMessage += 'Le message doit contenir au moins 10 caractères.\n';
    }
    
    if (isValid) {
        // Show success message
        showNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success');
        this.reset();
    } else {
        // Show error message
        showNotification(errorMessage, 'error');
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .project-item, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    
    if (hero && heroLogo) {
        const rate = scrolled * -0.5;
        heroLogo.style.transform = `translateY(${rate}px)`;
    }
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project gallery lightbox effect (simple version)
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.project-overlay');
        
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
            setTimeout(() => {
                overlay.style.transform = 'translateY(100%)';
            }, 3000);
        }
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    revealSections();
});

window.addEventListener('scroll', revealSections);

// Back to top button
const createBackToTopButton = () => {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #001F5F, #0033CC);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 31, 95, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px) scale(1.1)';
        backToTop.style.boxShadow = '0 6px 20px rgba(0, 31, 95, 0.4)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0) scale(1)';
        backToTop.style.boxShadow = '0 4px 15px rgba(0, 31, 95, 0.3)';
    });
};

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 31, 95, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 31, 95, 0.1)';
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        const rate = scrolled * -0.5;
        heroLogo.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
%cCTI - Centre de Transition Numérique et d'Impression
%cمركز التحول الرقمي والطباعة

%cBienvenue sur notre site web!
%cWelcome to our website!

%cLa technologie au service du progrès local.
%cTechnology at the service of local progress.
`, 
'color: #001F5F; font-size: 18px; font-weight: bold;',
'color: #001F5F; font-size: 16px; font-weight: bold;',
'color: #666; font-size: 14px;',
'color: #666; font-size: 14px;',
'color: #0033CC; font-size: 12px; font-style: italic;',
'color: #0033CC; font-size: 12px; font-style: italic;'
);

// --- Multilingual Support ---
const translations = {
    fr: {
        company_name_ar: "مركز التحول الرقمي والطباعة",
        company_name_fr: "Centre de Transition Numérique et d'Impression",
        nav_home: "Accueil",
        nav_services: "Services",
        nav_projects: "Projets",
        nav_director: "Message du Directeur",
        nav_gallery: "Galerie",
        nav_contact: "Contact",
        hero_subtitle: "Votre partenaire de confiance pour la transformation numérique",
        cta_services: "Découvrir nos services",
        // Services
        services_title: "Nos Services",
        service_web_title: "Développement Web & Mobile",
        service_web_desc: "Création de sites web modernes et d'applications mobiles performantes adaptées à vos besoins.",
        service_design_title: "Design Graphique",
        service_design_desc: "Conception de logos, identités visuelles et supports de communication professionnels.",
        service_network_title: "Réseaux Informatiques",
        service_network_desc: "Installation, configuration et maintenance de réseaux informatiques sécurisés.",
        service_hardware_title: "Matériel Informatique",
        service_hardware_desc: "Vente et maintenance de matériel informatique de qualité professionnelle.",
        service_printing_title: "Impression Numérique",
        service_printing_desc: "Services d'impression numérique haute qualité pour tous vos projets.",
        // Projects
        projects_title: "Nos Projets",
        project1_title: "Site Web E-commerce",
        project1_desc: "Développement d'une plateforme de vente en ligne complète",
        project2_title: "Application Mobile",
        project2_desc: "Application mobile native pour gestion de stock",
        project3_title: "Réseau Entreprise",
        project3_desc: "Infrastructure réseau pour entreprise de 50 employés",
        project4_title: "Identité Visuelle",
        project4_desc: "Création de l'identité visuelle complète d'une startup",
        project5_title: "Impression Grand Format",
        project5_desc: "Campagne d'affichage publicitaire pour événement",
        project6_title: "Système de Gestion",
        project6_desc: "Développement d'un système de gestion intégré",
        // Director
        director_title: "Message du Directeur",
        director_quote: "La technologie au service du progrès local.",
        director_msg1: "Au Centre de Transition Numérique et d'Impression, nous croyons fermement que la technologie doit être un vecteur de développement et de progrès pour notre communauté locale. Notre mission est de démocratiser l'accès aux solutions numériques modernes tout en préservant l'identité et les valeurs de notre région.",
        director_msg2: "Depuis notre création, nous nous efforçons d'accompagner les entreprises, les organisations et les particuliers dans leur transformation numérique, en proposant des solutions adaptées, innovantes et durables. Notre équipe d'experts combine expertise technique et compréhension des enjeux locaux pour offrir des services de qualité supérieure.",
        director_msg3: "Nous sommes fiers de contribuer au développement économique et social de notre région en facilitant l'adoption des technologies numériques. Ensemble, construisons un avenir numérique inclusif et prospère.",
        // Gallery
        gallery_title: "Galerie",
        gallery_mac: "Apple Mac",
        gallery_hp: "HP Laptop",
        gallery_accessory: "Accessoire informatique",
        // Contact
        contact_title: "Contact",
        contact_info_title: "Informations de Contact",
        contact_phone_label: "Téléphone:",
        contact_phone: "+212 XXX XXX XXX",
        contact_email_label: "Email:",
        contact_email: "contact@cti.ma",
        contact_address_label: "Adresse:",
        contact_address: "123 Rue de l'Innovation<br>Ville, Maroc",
        contact_hours_label: "Horaires:",
        contact_hours: "Lundi - Vendredi: 9h00 - 18h00<br>Samedi: 9h00 - 13h00",
        contact_form_title: "Envoyez-nous un message",
        contact_form_name: "Nom complet *",
        contact_form_email: "Email *",
        contact_form_phone: "Téléphone",
        contact_form_message: "Message *",
        contact_form_submit: "Envoyer le message",
        contact_map_title: "Localisation",
        contact_map_coming: "Intégration Google Maps à venir",
        contact_map_interactive: "📍 Carte interactive",
        // Footer
        footer_company: "Centre de Transition Numérique et d'Impression",
        footer_links_title: "Liens rapides",
        footer_link_services: "Services",
        footer_link_projects: "Projets",
        footer_link_contact: "Contact",
        footer_services_title: "Services",
        footer_service_web: "Développement Web",
        footer_service_design: "Design Graphique",
        footer_service_network: "Réseaux IT",
        footer_service_printing: "Impression Numérique",
        footer_copyright: "© 2024 CTI - Centre de Transition Numérique et d'Impression. Tous droits réservés."
    },
    en: {
        company_name_ar: "Digital Transformation & Printing Center",
        company_name_fr: "Digital Transition and Printing Center",
        nav_home: "Home",
        nav_services: "Services",
        nav_projects: "Projects",
        nav_director: "Director's Message",
        nav_gallery: "Gallery",
        nav_contact: "Contact",
        hero_subtitle: "Your trusted partner for digital transformation",
        cta_services: "Discover our services",
        // Services
        services_title: "Our Services",
        service_web_title: "Web & Mobile Development",
        service_web_desc: "Creation of modern websites and high-performance mobile apps tailored to your needs.",
        service_design_title: "Graphic Design",
        service_design_desc: "Design of logos, visual identities, and professional communication materials.",
        service_network_title: "IT Networking",
        service_network_desc: "Installation, configuration, and maintenance of secure IT networks.",
        service_hardware_title: "Computer Hardware",
        service_hardware_desc: "Sales and maintenance of professional-grade computer hardware.",
        service_printing_title: "Digital Printing",
        service_printing_desc: "High-quality digital printing services for all your projects.",
        // Projects
        projects_title: "Our Projects",
        project1_title: "E-commerce Website",
        project1_desc: "Development of a complete online sales platform",
        project2_title: "Mobile Application",
        project2_desc: "Native mobile app for inventory management",
        project3_title: "Enterprise Network",
        project3_desc: "Network infrastructure for a 50-employee company",
        project4_title: "Visual Identity",
        project4_desc: "Creation of a complete visual identity for a startup",
        project5_title: "Large Format Printing",
        project5_desc: "Advertising campaign for an event",
        project6_title: "Management System",
        project6_desc: "Development of an integrated management system",
        // Director
        director_title: "Director's Message",
        director_quote: "Technology at the service of local progress.",
        director_msg1: "At the Digital Transition and Printing Center, we firmly believe that technology should be a driver of development and progress for our local community. Our mission is to democratize access to modern digital solutions while preserving the identity and values of our region.",
        director_msg2: "Since our creation, we have strived to support businesses, organizations, and individuals in their digital transformation by offering tailored, innovative, and sustainable solutions. Our team of experts combines technical expertise and understanding of local challenges to provide superior quality services.",
        director_msg3: "We are proud to contribute to the economic and social development of our region by facilitating the adoption of digital technologies. Together, let's build an inclusive and prosperous digital future.",
        // Gallery
        gallery_title: "Gallery",
        gallery_mac: "Apple Mac",
        gallery_hp: "HP Laptop",
        gallery_accessory: "Computer Accessory",
        // Contact
        contact_title: "Contact",
        contact_info_title: "Contact Information",
        contact_phone_label: "Phone:",
        contact_phone: "+212 XXX XXX XXX",
        contact_email_label: "Email:",
        contact_email: "contact@cti.ma",
        contact_address_label: "Address:",
        contact_address: "123 Innovation Street<br>City, Morocco",
        contact_hours_label: "Hours:",
        contact_hours: "Monday - Friday: 9:00 - 18:00<br>Saturday: 9:00 - 13:00",
        contact_form_title: "Send us a message",
        contact_form_name: "Full Name *",
        contact_form_email: "Email *",
        contact_form_phone: "Phone",
        contact_form_message: "Message *",
        contact_form_submit: "Send Message",
        contact_map_title: "Location",
        contact_map_coming: "Google Maps integration coming soon",
        contact_map_interactive: "📍 Interactive map",
        // Footer
        footer_company: "Digital Transition and Printing Center",
        footer_links_title: "Quick Links",
        footer_link_services: "Services",
        footer_link_projects: "Projects",
        footer_link_contact: "Contact",
        footer_services_title: "Services",
        footer_service_web: "Web Development",
        footer_service_design: "Graphic Design",
        footer_service_network: "IT Networks",
        footer_service_printing: "Digital Printing",
        footer_copyright: "© 2024 CTI - Digital Transition and Printing Center. All rights reserved."
    },
    ar: {
        company_name_ar: "مركز التحول الرقمي والطباعة",
        company_name_fr: "مركز التحول الرقمي والطباعة",
        nav_home: "الرئيسية",
        nav_services: "الخدمات",
        nav_projects: "المشاريع",
        nav_director: "رسالة المدير",
        nav_gallery: "المعرض",
        nav_contact: "اتصل بنا",
        hero_subtitle: "شريككم الموثوق للتحول الرقمي",
        cta_services: "اكتشف خدماتنا",
        // Services
        services_title: "خدماتنا",
        service_web_title: "تطوير الويب والتطبيقات",
        service_web_desc: "إنشاء مواقع إلكترونية حديثة وتطبيقات جوال عالية الأداء حسب احتياجاتكم.",
        service_design_title: "تصميم جرافيكي",
        service_design_desc: "تصميم الشعارات والهويات البصرية ووسائل الاتصال الاحترافية.",
        service_network_title: "الشبكات المعلوماتية",
        service_network_desc: "تركيب وتهيئة وصيانة الشبكات المعلوماتية الآمنة.",
        service_hardware_title: "معدات الحاسوب",
        service_hardware_desc: "بيع وصيانة معدات الحاسوب بجودة احترافية.",
        service_printing_title: "الطباعة الرقمية",
        service_printing_desc: "خدمات طباعة رقمية عالية الجودة لجميع مشاريعكم.",
        // Projects
        projects_title: "مشاريعنا",
        project1_title: "موقع تجارة إلكترونية",
        project1_desc: "تطوير منصة بيع عبر الإنترنت متكاملة",
        project2_title: "تطبيق جوال",
        project2_desc: "تطبيق جوال أصلي لإدارة المخزون",
        project3_title: "شبكة شركة",
        project3_desc: "بنية تحتية للشبكة لشركة تضم 50 موظفًا",
        project4_title: "هوية بصرية",
        project4_desc: "إنشاء هوية بصرية كاملة لشركة ناشئة",
        project5_title: "طباعة كبيرة الحجم",
        project5_desc: "حملة إعلانية لحدث معين",
        project6_title: "نظام إدارة",
        project6_desc: "تطوير نظام إدارة متكامل",
        // Director
        director_title: "رسالة المدير",
        director_quote: "التكنولوجيا في خدمة التقدم المحلي.",
        director_msg1: "في مركز التحول الرقمي والطباعة، نؤمن بأن التكنولوجيا يجب أن تكون محركًا للتنمية والتقدم لمجتمعنا المحلي. مهمتنا هي ديمقراطية الوصول إلى الحلول الرقمية الحديثة مع الحفاظ على هوية وقيم منطقتنا.<br><br>",
        director_msg2: "منذ تأسيسنا، نسعى لمرافقة الشركات والمؤسسات والأفراد في تحولهم الرقمي من خلال تقديم حلول مبتكرة ومستدامة ومخصصة. يجمع فريقنا بين الخبرة التقنية وفهم التحديات المحلية لتقديم خدمات عالية الجودة.<br><br>",
        director_msg3: "نفخر بالمساهمة في التنمية الاقتصادية والاجتماعية لمنطقتنا من خلال تسهيل تبني التقنيات الرقمية. معًا نبني مستقبلًا رقميًا شاملاً ومزدهرًا.",
        // Gallery
        gallery_title: "المعرض",
        gallery_mac: "أبل ماك",
        gallery_hp: "حاسوب HP",
        gallery_accessory: "ملحقات الحاسوب",
        // Contact
        contact_title: "اتصل بنا",
        contact_info_title: "معلومات الاتصال",
        contact_phone_label: "الهاتف:",
        contact_phone: "+212 XXX XXX XXX",
        contact_email_label: "البريد الإلكتروني:",
        contact_email: "contact@cti.ma",
        contact_address_label: "العنوان:",
        contact_address: "123 شارع الابتكار<br>المدينة، المغرب",
        contact_hours_label: "ساعات العمل:",
        contact_hours: "الاثنين - الجمعة: 9:00 - 18:00<br>السبت: 9:00 - 13:00",
        contact_form_title: "أرسل لنا رسالة",
        contact_form_name: "الاسم الكامل *",
        contact_form_email: "البريد الإلكتروني *",
        contact_form_phone: "الهاتف",
        contact_form_message: "الرسالة *",
        contact_form_submit: "إرسال الرسالة",
        contact_map_title: "الموقع",
        contact_map_coming: "سيتم دمج خرائط جوجل قريبًا",
        contact_map_interactive: "📍 خريطة تفاعلية",
        // Footer
        footer_company: "مركز التحول الرقمي والطباعة",
        footer_links_title: "روابط سريعة",
        footer_link_services: "الخدمات",
        footer_link_projects: "المشاريع",
        footer_link_contact: "اتصل بنا",
        footer_services_title: "الخدمات",
        footer_service_web: "تطوير الويب",
        footer_service_design: "تصميم جرافيكي",
        footer_service_network: "الشبكات المعلوماتية",
        footer_service_printing: "الطباعة الرقمية",
        footer_copyright: "© 2024 مركز التحول الرقمي والطباعة. جميع الحقوق محفوظة."
    }
};

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    // Set direction and font for Arabic
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
        document.body.style.fontFamily = "'Noto Naskh Arabic', 'Inter', sans-serif";
    } else {
        document.body.setAttribute('dir', 'ltr');
        document.body.style.fontFamily = "'Inter', sans-serif";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
        // Set default language
        setLanguage(langSwitcher.value);
    }
}); 