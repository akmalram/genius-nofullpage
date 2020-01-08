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
        if (window.scrollY > 50) {
            element.classList.add('scrolled');
        } else if (window.scrollY < 50) {
            element.classList.remove('scrolled');
        }
    });

    if (window.scrollY > 50) {
        element.classList.add('scrolled');
    } else if (window.scrollY < 50) {
        element.classList.remove('scrolled');
    }
});

ready(() => {
    let partnersSlider = new Swiper('.swiper-container.parters-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            1020: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            520: {
                slidesPerView: 1,
            },
        }
    });
});

ready(() => {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});

ready(() => {
    const modalToggler = (buttonClass, modalClass) => {
        let btn = document.querySelectorAll(buttonClass),
            modal = document.querySelector(modalClass),
            closetBtn = document.querySelector(`${modalClass} .close-btn`),
            modalBackground = document.querySelector(`${modalClass} .modal-background`),
            targetInput = document.querySelector(`${modalClass} input[name="hidden"]`);

        let addTargetTo = (to, value) => {
            to.setAttribute('value', value);
        }

       if(modal) {
        btn.forEach(one => {
            one.addEventListener('click', () => {
                modal.classList.add('active');
                targetInput.setAttribute('value', one.getAttribute('data-modal-target'));
                console.log(one)
            });
        });

        [closetBtn, modalBackground].forEach(one => {
            one.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        });
       }
    }

    modalToggler('.call-order-modal-btn', '.call-order');
});

ready(() => {
    const callOrderForm = document.querySelector('.call-order .form');

    callOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../call-order.php",
            data: $(callOrderForm).serialize(),
        })
        .done(function() {
            callOrderForm.parentNode.classList.add('done');
            callOrderForm.reset();
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
    const form = document.querySelector('#contacts .form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        $.ajax({
                method: "POST",
                url: "../send.php",
                data: $('.form').serialize(),
            })
            .done(function() {
                form.reset();
                alert('Ваша заявка принята!');
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