const ready = (callback) => {
    window.addEventListener('DOMContentLoaded', (e) => {
        callback(e);
    })
}

const menuClose = () => {
    document.querySelector('.navbar .togglebtn').classList.remove('active');
    document.querySelector('.navbar .menu-modal').classList.remove('active');
    document.querySelector('.navbar').classList.remove('modalOpened');
}

ready(() => {
    const modalbtn = document.querySelector('.navbar .togglebtn');
    const modalmenu = document.querySelector('.navbar .menu-modal');
    const navbar = document.querySelector('.navbar');
    const MenuClassToggler = () => {
        modalbtn.addEventListener('click', () => {
            modalbtn.classList.toggle('active');
            modalmenu.classList.toggle('active');
            navbar.classList.toggle('modalOpened');
        });
    }

    MenuClassToggler();
});

ready(() => {
    const element = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            element.classList.add('scrolled');
        } else if (window.scrollY < 200) {
            element.classList.remove('scrolled');
        }
    });

    if (window.scrollY > 200) {
        element.classList.add('scrolled');
    } else if (window.scrollY < 200) {
        element.classList.remove('scrolled');
    }
});

ready(() => {
    let scrollToAnchor = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                menuClose();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    scrollToAnchor();
})

ready(() => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        $.ajax({
                method: "POST",
                url: "../send.php",
                data: $('.form').serialize(),
            })
            .done(function() {
                form.reset();
                alert('Ваша заявка принята!')
            });
    });
});

const fontAwesomeFreeObserver = new FontFaceObserver('Font Awesome 5 Free');
const fontAwesomeBrandsObserver = new FontFaceObserver('Font Awesome 5 Brands');
const gilroyObserver = new FontFaceObserver('Gilroy');

Promise.all([
    fontAwesomeFreeObserver.load(),
    fontAwesomeBrandsObserver.load(),
    gilroyObserver.load()
]).then(() => {
    document.querySelector('html').classList.add('fonts-loaded');
});