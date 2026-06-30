// 1. TỰ ĐỘNG ĐÓNG MOBILE MENU KHI CLICK LINK
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#nav .nav-link:not(.dropdown-toggle)');
    const menuCollapse = document.getElementById('navbarNav');

    if (menuCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // Kiểm tra xem menu đang hiển thị (ở dạng collapse trên mobile) hay không
                const isMobileMenuOpen = menuCollapse.classList.contains('show');
                if (isMobileMenuOpen) {
                    // Sử dụng API Collapse của Bootstrap để ẩn menu
                    const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse) || new bootstrap.Collapse(menuCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    // Khởi tạo tất cả Bootstrap Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});


// 2. BOOTSTRAP FORM VALIDATION (LIÊN HỆ)
(function () {
    'use strict';
    // Lấy tất cả các form cần áp dụng class validate của Bootstrap
    const forms = document.querySelectorAll('.needs-validation');

    // Lặp qua và ngăn chặn việc submit nếu form không hợp lệ
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();