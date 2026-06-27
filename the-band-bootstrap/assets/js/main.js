// ==========================================
// 1. XỬ LÝ ĐÓNG / MỞ TICKET MODAL (MUA VÉ)
// ==========================================
const buyBtns = document.querySelectorAll('.js-buy-ticket');
const modal = document.querySelector('.js-modal');
const modalContainer = document.querySelector('.js-modal-container');
const modalClose = document.querySelector('.js-modal-close');

// Hàm hiển thị modal mua vé (thêm class open vào modal)
function showBuyTickets() {
    modal.classList.add('open');
}

// Hàm ẩn modal mua vé (gỡ bỏ class open của modal)
function hideBuyTickets() {
    modal.classList.remove('open');
}

// Lặp qua từng thẻ button và nghe hành vi click
for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTickets);
}

// Nghe hành vi click vào nút close
modalClose.addEventListener('click', hideBuyTickets);

// Nghe hành vi click bên ngoài modal để ẩn modal
modal.addEventListener('click', hideBuyTickets);

// Ngăn chặn hành vi ẩn modal khi click vào bên trong vùng modal-container
modalContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});


// ==========================================
// 2. XỬ LÝ ĐÓNG / MỞ MOBILE MENU
// ==========================================
const header = document.getElementById('header');
const mobileMenu = document.getElementById('mobile-menu');
const headerHeight = header.clientHeight; // Lấy chiều cao mặc định của header (46px)

// Đóng/mở mobile menu
mobileMenu.onclick = function () {
    const isClosed = header.clientHeight === headerHeight;
    if (isClosed) {
        header.style.height = 'auto'; // Mở menu
    } else {
        header.style.height = null; // Đóng menu (bằng cách xóa style inline height)
    }
}


// ==========================================
// 3. TỰ ĐỘNG ĐÓNG MENU KHI CHỌN PHẦN TỬ
// ==========================================
const menuItems = document.querySelectorAll('#nav li a[href*="#"]');

for (var i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    
    menuItem.onclick = function (event) {
        // Kiểm tra xem có anh chị em liền kề và anh chị em đó có phải class subnav không
        const isParentMenu = this.nextElementSibling && this.nextElementSibling.classList.contains('subnav');
        
        if (isParentMenu) {
            event.preventDefault(); // Bỏ qua hành vi mặc định nếu click vào mục "More"
        } else {
            header.style.height = null; // Đóng menu khi click vào các mục khác
        }
    }
}