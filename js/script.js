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

        if (modal) {
            btn.forEach(one => {
                one.addEventListener('click', () => {
                    modal.classList.add('active');
                    targetInput.setAttribute('value', one.getAttribute('data-modal-target'));
                });
            });

            [closetBtn, modalBackground].forEach(one => {
                one.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            });
        }
    }

    const courseModalToggler = (buttonClass, modalClass) => {
        let btn = document.querySelectorAll(buttonClass),
            modal = document.querySelector(modalClass),
            closetBtn = document.querySelector(`${modalClass} .close-btn`),
            modalBackground = document.querySelector(`${modalClass} .modal-background`);

        if (modal) {
            btn.forEach(one => {
                one.addEventListener('click', () => {
                    modal.classList.add('active');
                    modal.setAttribute('data-course-active', one.getAttribute('data-modal-course'));
                });
            });

            [closetBtn, modalBackground].forEach(one => {
                one.addEventListener('click', () => {
                    modal.classList.remove('active');
                    modal.setAttribute('data-course-active', '');

                });
            });
        }
    }

    modalToggler('.call-order-modal-btn', '.call-order');

    courseModalToggler('.course-modal-btn', '.course-modal');
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
                data: $(form).serialize(),
            })
            .done(function() {
                form.reset();
                alert('Ваша заявка принята!');
            });
    });

    const courseforms = document.querySelectorAll('.course-form');
    courseforms.forEach(one => {
        one.addEventListener('submit', (e) => {
            e.preventDefault();
            $.ajax({
                    method: "POST",
                    url: "../call-order.php",
                    data: $(one).serialize(),
                })
                .done(function() {
                    one.reset();
                    alert('Ваша заявка принята!');
                });
        });
    });
});

ready(() => {
    const parallax = (el, reverse) => {
        let lFollowX = 0,
            lFollowY = 0,
            x = 0,
            y = 0,
            friction = 1 / 15;

        function moveBackground() {
            if(reverse) {
                x -= (lFollowX + x) * friction;
                y -= (lFollowY + y) * friction;
            } else {
                x += (lFollowX - x) * friction;
                y += (lFollowY - y) * friction;
            }

            translate = 'translate(' + x.toFixed(3) + 'px, ' + y.toFixed(3) + 'px)';


            $(el).css({
                '-webit-transform': translate,
                '-moz-transform': translate,
                'transform': translate
            });

            window.requestAnimationFrame(moveBackground);
        }

        $(window).on('mousemove click', function (e) {

            let lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            let lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100;

        });

        moveBackground();
    }

    parallax('#aboutus .video .background');
    parallax('#aboutus .content .background', true);
});

ready(() => {
    const loadData = (url, field, selector) => {
        let req = fetch(url)
            .then(data => data.json())
            .then(parsedData => {
                document.querySelector(selector).innerHTML = parsedData[field];
            })
            .catch(e => {
                console.log(e);
            });
    }

    loadData('https://akmalram.github.io/genius-nofullpage/data/data.json', 'main_text', '#main_text');
    loadData('https://akmalram.github.io/genius-nofullpage/data/data.json', 'course-1-text', '#course-1-text');
    loadData('https://akmalram.github.io/genius-nofullpage/data/data.json', 'course-2-text', '#course-2-text');
    loadData('https://akmalram.github.io/genius-nofullpage/data/data.json', 'course-3-text', '#course-3-text');
    loadData('https://akmalram.github.io/genius-nofullpage/data/data.json', 'course-4-text', '#course-4-text');
    loadData('https://akmalram.github.io/genius-nofullpage/data/data.json', 'course-5-text', '#course-5-text');
    loadData('https://akmalram.github.io/genius-nofullpage/data/data.json', 'course-6-text', '#course-6-text');
});
