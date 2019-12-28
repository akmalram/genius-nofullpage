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

(function ($) {
    $.fn.bgscroll = function (options) {

        var x = $.extend({
            bgpositionx: 50,
            direction: "bottom",
            debug: !1,
            min: 0,
            max: 100
        }, options);

        var a = $(document).height() - $(window).height(),
            b = a - (this.offset().top + this.height());

        this.offset().top < a && (b = 0);

        var c = (this.offset().top + this.height());

        if ($(window).scrollTop() > b && $(window).scrollTop() < c) {
            var d = ($(window).scrollTop() - b) / (c - b) * 100;

            "top" == x.direction && (d = 100 - d),
                d > x.max && (d = x.max),
                d < x.min && (d = x.min);

            if (x.debug) {
                console.log('Element background position: ' + d + ' %');
            }
        }

        return this.css({
            backgroundPositionY: 'calc(' + d + '% - 30%)'
        });
    };
}(jQuery));

$(document).ready(() => {
    $(window).scroll(function () {
        $('.bg-parallax').bgscroll({
            direction: 'bottom', // направление bottom или top
            bgpositionx: 50, // x позиция фонового изображения, от 0 до 100, размерность в %, 50 - означает по центру
            debug: false, // Режим отладки
            min: 0, // минимальное положение (в %) на которое может смещаться фон
            max: 1000 // максимальное положение (в %) на которое может смещаться фон
        });
    });
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