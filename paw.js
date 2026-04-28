// ===== PAW HAVEN — INTERACTIVE SCRIPT =====
document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.hero-stat .num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();
        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString() + (target >= 1000 ? '+' : '+');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // ===== MARKETPLACE FILTER =====
    const filterTabs = document.querySelectorAll('#marketplace .filter-tab');
    const productCards = document.querySelectorAll('.product-card');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== ADOPTION FILTER =====
    const adoptTabs = document.querySelectorAll('[data-adopt-filter]');
    const petCards = document.querySelectorAll('.pet-card');
    adoptTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            adoptTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.adoptFilter;
            petCards.forEach(card => {
                if (filter === 'all' || card.dataset.petType === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== MODAL SYSTEM =====
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    function openModal(html) {
        modalContent.innerHTML = html;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // ===== ADOPT BUTTONS =====
    document.querySelectorAll('.btn-adopt').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.pet-card');
            const name = card.querySelector('h3').textContent;
            const breed = card.querySelector('.breed').textContent;
            openModal(`
        <h2 style="font-size:28px;font-weight:800;margin-bottom:8px;">Adopt ${name} ❤️</h2>
        <p style="color:var(--text-secondary);margin-bottom:24px;">${breed}</p>
        <div class="form-group"><label>Your Name</label><input type="text" placeholder="Full name"></div>
        <div class="form-group"><label>Phone</label><input type="tel" placeholder="+91 XXXXX XXXXX"></div>
        <div class="form-group"><label>Email</label><input type="email" placeholder="you@email.com"></div>
        <div class="form-group"><label>Why do you want to adopt ${name}?</label><textarea placeholder="Tell us about your home and experience with pets..."></textarea></div>
        <button class="btn-primary" style="width:100%;justify-content:center;margin-top:8px;" onclick="showSuccess('adoption')">Submit Application</button>
      `);
        });
    });

    // ===== BOOK VET =====
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.vet-card');
            const name = card.querySelector('h3').textContent;
            const spec = card.querySelector('.specialization').textContent;
            openModal(`
        <h2 style="font-size:28px;font-weight:800;margin-bottom:8px;">Book ${name}</h2>
        <p style="color:var(--accent);font-weight:600;margin-bottom:24px;">${spec}</p>
        <div class="form-group"><label>Pet Owner Name</label><input type="text" placeholder="Your name"></div>
        <div class="form-group"><label>Phone</label><input type="tel" placeholder="+91 XXXXX XXXXX"></div>
        <div class="form-group"><label>Pet Type</label><select><option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Farm Animal</option><option>Other</option></select></div>
        <div class="form-group"><label>Preferred Date</label><input type="date"></div>
        <div class="form-group"><label>Concern</label><textarea placeholder="Briefly describe the issue..."></textarea></div>
        <button class="btn-primary" style="width:100%;justify-content:center;margin-top:8px;background:linear-gradient(135deg,var(--accent),#7C3AED);color:#fff;" onclick="showSuccess('vet')">Confirm Booking</button>
      `);
        });
    });

    // ===== AMBULANCE FORM =====
    document.getElementById('btnAmbulance').addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('amb-name').value;
        const phone = document.getElementById('amb-phone').value;
        const loc = document.getElementById('amb-location').value;
        if (!name || !phone || !loc) {
            showToast('Please fill in all required fields!', 'error');
            return;
        }
        showSuccess('ambulance');
    });

    // ===== VOLUNTEER FORM =====
    document.getElementById('btnVolunteer').addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('vol-name').value;
        const email = document.getElementById('vol-email').value;
        if (!name || !email) {
            showToast('Please enter your name and email!', 'error');
            return;
        }
        showSuccess('volunteer');
    });

    // ===== NEWSLETTER =====
    document.getElementById('btnNewsletter').addEventListener('click', () => {
        const email = document.getElementById('newsletter-email').value;
        if (!email || !email.includes('@')) {
            showToast('Please enter a valid email!', 'error');
            return;
        }
        showToast('🎉 Subscribed! Welcome to the pack!', 'success');
        document.getElementById('newsletter-email').value = '';
    });

    // ===== SUCCESS HANDLER =====
    window.showSuccess = function (type) {
        const messages = {
            adoption: '🎉 Adoption Application Submitted!<br><small style="color:var(--text-secondary)">Our team will review and reach out within 48 hours. Thank you for choosing adoption!</small>',
            vet: '✅ Appointment Booked!<br><small style="color:var(--text-secondary)">You\'ll receive a confirmation SMS shortly. The vet will contact you before the appointment.</small>',
            ambulance: '🚑 Ambulance Dispatched!<br><small style="color:var(--text-secondary)">Help is on the way! Expected arrival within 15 minutes. Stay with the animal and keep them calm.</small>',
            volunteer: '🤝 Welcome to the Team!<br><small style="color:var(--text-secondary)">We\'re thrilled to have you! Check your email for next steps and orientation details.</small>'
        };
        if (type === 'ambulance' || type === 'volunteer') {
            openModal(`<div style="text-align:center;padding:20px 0;"><div style="font-size:60px;margin-bottom:20px;">${type === 'ambulance' ? '🚑' : '🤝'}</div><h2 style="font-size:24px;font-weight:800;margin-bottom:16px;">${messages[type]}</h2><button class="btn-primary" style="margin-top:16px;" onclick="closeModal()">OK, Got it</button></div>`);
        } else {
            const mc = document.getElementById('modalContent');
            mc.innerHTML = `<div style="text-align:center;padding:20px 0;"><div style="font-size:60px;margin-bottom:20px;">${type === 'adoption' ? '🐾' : '🏥'}</div><h2 style="font-size:24px;font-weight:800;margin-bottom:16px;">${messages[type]}</h2><button class="btn-primary" style="margin-top:16px;" onclick="closeModal()">OK, Got it</button></div>`;
        }
    };
    window.closeModal = closeModal;

    // ===== TOAST NOTIFICATIONS =====
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `position:fixed;bottom:100px;right:30px;z-index:3000;padding:14px 24px;border-radius:12px;font-size:14px;font-weight:600;color:#fff;backdrop-filter:blur(10px);animation:slideIn 0.4s ease;max-width:320px;`;
        toast.style.background = type === 'error' ? 'rgba(239,68,68,0.9)' : 'rgba(16,185,129,0.9)';
        toast.innerHTML = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            toast.style.transition = '0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });

    // ===== PRODUCT/THRIFT CARD CLICKS =====
    document.querySelectorAll('.product-card .btn-sm, .thrift-card .btn-sm').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card, .thrift-card');
            const title = card.querySelector('h3').textContent;
            openModal(`
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:60px;margin-bottom:20px;">📦</div>
          <h2 style="font-size:24px;font-weight:800;margin-bottom:8px;">${title}</h2>
          <p style="color:var(--text-secondary);margin-bottom:24px;">Interested in this item? Leave your contact info and the owner will reach out!</p>
          <div class="form-group"><label>Your Name</label><input type="text" placeholder="Name"></div>
          <div class="form-group"><label>Phone / WhatsApp</label><input type="tel" placeholder="+91 XXXXX XXXXX"></div>
          <button class="btn-primary" style="width:100%;justify-content:center;" onclick="showToast('✅ Request sent! The owner will contact you soon.','success');closeModal();">Send Request</button>
        </div>
      `);
        });
    });

    // ===== CSS ANIMATION KEYFRAMES =====
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(100px); } to { opacity:1; transform:translateX(0); } }
  `;
    document.head.appendChild(style);

});
