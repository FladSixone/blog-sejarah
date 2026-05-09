const navPageLinks = document.querySelectorAll('.nav-page');
const pages = document.querySelectorAll('.page');
const triviaa = document.querySelectorAll('.content section h3');

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

triviaa.forEach(header => {
    header.addEventListener('click', () => {
        const paragraph = header.nextElementSibling;
        const sign = header.querySelector('.sign');

        if (!paragraph) return;

        paragraph.classList.toggle('active');

        if (paragraph.classList.contains('active')) {
            sign.textContent = '-';
        } else {
            sign.textContent = '+';
        }
    });
});

function switchPage(targetPageId) {
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
    }

    navPageLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === targetPageId) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateSidebarListener(targetPageId);
    updateMobileSidebarContent(targetPageId);
}

navPageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.dataset.page;
        switchPage(targetPage);
    });
});

function updateSidebarListener(activePageId) {
    const activePage = document.getElementById(activePageId);
    if (!activePage) return;

    const sections = activePage.querySelectorAll('section');
    const sidebarLinks = activePage.querySelectorAll('.sidebar a');
    const mobileLinks = document.querySelectorAll('#mobileSidebarContent a');

    function highlightCurrent() {
        let current = "";
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.removeEventListener('scroll', highlightCurrent);
    window.addEventListener('scroll', highlightCurrent);
    highlightCurrent();
}

function updateMobileSidebarContent(activePageId) {
    const activePage = document.getElementById(activePageId);
    if (!activePage) return;
    const sidebar = activePage.querySelector('.sidebar');
    if (!sidebar) return;
    const mobileContent = document.getElementById('mobileSidebarContent');
    if (mobileContent) {
        const clone = sidebar.cloneNode(true);
        mobileContent.innerHTML = '';
        Array.from(clone.children).forEach(child => {
            mobileContent.appendChild(child);
        });
        attachMobileLinkEvents();
    }
}

function attachMobileLinkEvents() {
    const mobileLinks = document.querySelectorAll('#mobileSidebarContent a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                closeMobileMenu();
            }
        });
    });
}

const burgerBtn = document.getElementById('burgerBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('mobileMenuOverlay');
const closeBtn = document.getElementById('closeMobileSidebar');

function openMobileMenu() {
    mobileSidebar.classList.add('open');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileSidebar.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

if (burgerBtn) {
    burgerBtn.addEventListener('click', openMobileMenu);
}
if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
}
if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
}

updateSidebarListener('page1');
updateMobileSidebarContent('page1');