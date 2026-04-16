const navPageLinks = document.querySelectorAll('.nav-page');
const pages = document.querySelectorAll('.page');
const gambar = document.getElementById('gambar');
const separator = document.querySelectorAll('.separator img');
const audios = document.querySelectorAll("audio");
const triviaa = document.querySelectorAll('#konten5 h3');

function stopsounds() {
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

gambar.addEventListener('click', () => {
    stopsounds();
    const sound = document.getElementById('sound');
    sound.play();
});

separator.forEach(img => {
    const soundId = img.dataset.sound;

    if (soundId) {
        img.style.cursor = "pointer";

        img.addEventListener('click', () => {
            stopsounds();

            const audio = document.getElementById(soundId);
            if (audio) {
                stopsounds();
                audio.play();
            }
        });
    }
});

triviaa.forEach(header => {
    header.addEventListener('click', () => {
        const paragraph = header.nextElementSibling;
        const sign = header.querySelector('.sign');

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

    window.onscroll = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
}

updateSidebarListener('page1');