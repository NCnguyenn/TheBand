document.addEventListener('DOMContentLoaded', function () {
    // 1. XỬ LÝ MOBILE MENU (ĐÓNG/MỞ)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navbarNav = document.getElementById('navbarNav');
    const header = document.getElementById('header');
    
    if (mobileMenuBtn && navbarNav) {
        mobileMenuBtn.addEventListener('click', function () {
            navbarNav.classList.toggle('hidden');
            // Thêm class flex-col, w-full, absolute khi hiển thị trên mobile
            navbarNav.classList.toggle('flex');
            navbarNav.classList.toggle('flex-col');
            navbarNav.classList.toggle('absolute');
            navbarNav.classList.toggle('top-[46px]');
            navbarNav.classList.toggle('left-0');
            navbarNav.classList.toggle('w-full');
            navbarNav.classList.toggle('bg-black');
            navbarNav.classList.toggle('p-2');
        });

        // Tự động đóng menu khi nhấp vào link (ngoại trừ More dropdown)
        const navLinks = navbarNav.querySelectorAll('.nav-link:not(#navbarDropdown)');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (!navbarNav.classList.contains('hidden')) {
                    navbarNav.classList.add('hidden');
                    navbarNav.classList.remove('flex', 'flex-col', 'absolute', 'top-[46px]', 'left-0', 'w-full', 'bg-black', 'p-2');
                }
            });
        });
    }

    // 2. CAROUSEL SLIDER (CHUYỂN ẢNH TỰ ĐỘNG & THỦ CÔNG)
    let currentSlide = 0;
    const slidesCount = 3;
    const slides = [
        document.getElementById('slide-0'),
        document.getElementById('slide-1'),
        document.getElementById('slide-2')
    ];
    const indicators = [
        document.getElementById('indicator-0'),
        document.getElementById('indicator-1'),
        document.getElementById('indicator-2')
    ];
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let carouselInterval;

    function showSlide(index) {
        // Đảm bảo chỉ số nằm trong khoảng hợp lệ
        if (index >= slidesCount) index = 0;
        if (index < 0) index = slidesCount - 1;
        
        currentSlide = index;

        // Cập nhật slide
        slides.forEach(function (slide, i) {
            if (slide) {
                if (i === currentSlide) {
                    slide.classList.remove('opacity-0', 'z-0');
                    slide.classList.add('opacity-100', 'z-10');
                } else {
                    slide.classList.remove('opacity-100', 'z-10');
                    slide.classList.add('opacity-0', 'z-0');
                }
            }
        });

        // Cập nhật indicators (chấm chỉ thị)
        indicators.forEach(function (indicator, i) {
            if (indicator) {
                if (i === currentSlide) {
                    indicator.classList.remove('bg-white/40');
                    indicator.classList.add('bg-white');
                } else {
                    indicator.classList.remove('bg-white');
                    indicator.classList.add('bg-white/40');
                }
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startCarousel() {
        stopCarousel();
        carouselInterval = setInterval(nextSlide, 4000);
    }

    function stopCarousel() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            startCarousel(); // Reset timer
        });
        nextBtn.addEventListener('click', function () {
            nextSlide();
            startCarousel(); // Reset timer
        });
    }

    indicators.forEach(function (indicator, i) {
        if (indicator) {
            indicator.addEventListener('click', function () {
                showSlide(i);
                startCarousel(); // Reset timer
            });
        }
    });

    startCarousel(); // Khởi chạy auto slide

    // 3. TICKET MODAL MUA VÉ (BẬT/TẮT MƯỢT MÀ)
    const buyBtns = document.querySelectorAll('.js-buy-ticket');
    const modal = document.getElementById('ticketModal');
    const modalContainer = document.getElementById('ticketModalContainer');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');

    function openModal() {
        if (modal && modalContainer) {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.classList.add('opacity-100', 'pointer-events-auto');
            modalContainer.classList.remove('translate-y-[-50px]');
            modalContainer.classList.add('translate-y-0');
        }
    }

    function closeModal() {
        if (modal && modalContainer) {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.classList.remove('opacity-100', 'pointer-events-auto');
            modalContainer.classList.add('translate-y-[-50px]');
            modalContainer.classList.remove('translate-y-0');
        }
    }

    buyBtns.forEach(function (btn) {
        btn.addEventListener('click', openModal);
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);
    
    // Đóng khi click ngoài modal container
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Ngăn chặn sự kiện click lan ra ngoài từ container
    if (modalContainer) {
        modalContainer.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // 4. KIỂM TRA HỢP LỆ FORM (FORM VALIDATION)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let isValid = true;
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const messageInput = document.getElementById('contact-message');
            
            const errorName = document.getElementById('error-name');
            const errorEmail = document.getElementById('error-email');
            const errorMessage = document.getElementById('error-message');

            // Reset error states
            [nameInput, emailInput, messageInput].forEach(function (input) {
                if (input) input.classList.remove('ring-2', 'ring-red-500', 'border-red-500');
            });
            [errorName, errorEmail, errorMessage].forEach(function (err) {
                if (err) err.classList.add('hidden');
            });

            // Validate Name
            if (nameInput && nameInput.value.trim() === '') {
                nameInput.classList.add('ring-2', 'ring-red-500', 'border-red-500');
                if (errorName) errorName.classList.remove('hidden');
                isValid = false;
            }

            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && (emailInput.value.trim() === '' || !emailPattern.test(emailInput.value.trim()))) {
                emailInput.classList.add('ring-2', 'ring-red-500', 'border-red-500');
                if (errorEmail) errorEmail.classList.remove('hidden');
                isValid = false;
            }

            // Validate Message
            if (messageInput && messageInput.value.trim() === '') {
                messageInput.classList.add('ring-2', 'ring-red-500', 'border-red-500');
                if (errorMessage) errorMessage.classList.remove('hidden');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault(); // Ngăn submit
            } else {
                alert('Thank you for contacting us! Your message has been sent successfully.');
                contactForm.reset();
                e.preventDefault(); // Demo chặn thực tế
            }
        });
    }

    // 5. SCROLLSPY (CẬP NHẬT TRẠNG THÁI MENU KHI CUỘN)
    const sections = ['#', '#band', '#tour', '#contact'];
    const menuItems = {
        '#': document.querySelector('#nav a[href="#"]') || document.querySelector('#nav a[href="#"]'),
        '#band': document.querySelector('#nav a[href="#band"]'),
        '#tour': document.querySelector('#nav a[href="#tour"]'),
        '#contact': document.querySelector('#nav a[href="#contact"]')
    };

    window.addEventListener('scroll', function () {
        let scrollPosition = window.scrollY + 100;

        // Tìm section hiện tại đang hiển thị
        let activeSection = '#';
        
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            activeSection = '#contact'; // Chạm đáy thì active contact
        } else {
            const bandEl = document.getElementById('band');
            const tourEl = document.getElementById('tour');
            const contactEl = document.getElementById('contact');

            if (contactEl && scrollPosition >= contactEl.offsetTop) {
                activeSection = '#contact';
            } else if (tourEl && scrollPosition >= tourEl.offsetTop) {
                activeSection = '#tour';
            } else if (bandEl && scrollPosition >= bandEl.offsetTop) {
                activeSection = '#band';
            }
        }

        // Cập nhật class active
        Object.keys(menuItems).forEach(function (key) {
            const item = menuItems[key];
            if (item) {
                if (key === activeSection) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    });
});