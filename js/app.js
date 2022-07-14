/* SIDEBAR MENU */
let slidingMenu = function () {
    let menuToggle = document.querySelector('.menu-toggle');
    let body = document.body;

    menuToggle.addEventListener('click', function (ev) {
        ev.preventDefault();
        body.classList.toggle('menu-active');
        body.classList.toggle('span-active');
        body.classList.toggle('toggle-active');
    });
}
slidingMenu();

/*LEFT MOBILE SIDEBAR MENU */
let slidingMenuLeft = function () {
    let sideToggle = document.querySelector('.toggle-sidebar');
    let sideMenu = document.querySelector('.side-menu');
    let inputHumbMenu = document.getElementById('menu-hamburger');


    sideToggle.addEventListener('click', function () {

        if (inputHumbMenu.checked) {
            sideMenu.classList.add('is-visible');
        } else {
            sideMenu.classList.remove('is-visible');
        }
    });
}
slidingMenuLeft();

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.side-menu a[href*=' + sectionId + ']').classList.add('active-link')
            let cls_icon = document.querySelector('.side-menu a[href*=' + sectionId + '] i').className
            let cls_substr_icon = cls_icon.substr(-4)
            if (cls_substr_icon = 'line') {
                let f_cls = cls_icon.replace('line', 'fill')
                document.querySelector('.side-menu a[href*=' + sectionId + '] i').classList.remove(cls_icon)
                document.querySelector('.side-menu a[href*=' + sectionId + '] i').classList.add(f_cls)
            }

        } else {
            document.querySelector('.side-menu a[href*=' + sectionId + ']').classList.remove('active-link')
            let cls_icon = document.querySelector('.side-menu a[href*=' + sectionId + '] i').className
            let cls_substr_icon = cls_icon.substr(-4)
            if (cls_substr_icon = 'fill') {
                let f_cls = cls_icon.replace('fill', 'line')
                document.querySelector('.side-menu a[href*=' + sectionId + '] i').classList.remove(cls_icon)
                document.querySelector('.side-menu a[href*=' + sectionId + '] i').classList.add(f_cls)
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)


/* DARK LIGHT THEME */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-fill'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/* COLOR THEME */
let colorInput = document.querySelectorAll('input[name="color-theme"]');

let colorTheme = localStorage.getItem('colorTheme')

if (colorTheme) {
    document.documentElement.style.setProperty('--hue-color', colorTheme);
}

for (i = 0, length = colorInput.length; i < length; i++) {
    if (colorInput[i].value == colorTheme) {
        colorInput[i].checked = true;
        break;
    }
}

colorInput.forEach(radio => radio.addEventListener('change', () => {
    localStorage.setItem('colorTheme', radio.value)
    document.documentElement.style.setProperty('--hue-color', radio.value);
}));

/* SELECT COLOR THEME */
document.querySelector('.custom-select-wrapper').addEventListener('click', function () {
    this.querySelector('.custom-select').classList.toggle('open');
})

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
}

window.addEventListener('click', function (e) {
    const select = document.querySelector('.custom-select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});

/* SHOW SCROLL UP */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp)

/* PROGRESS BAR */
let progressLine = document.querySelector('.progress-line')
let progressBar = document.querySelector('.progress-bar')


function updateProgressBar() {
    progressBar.style.height = `${getScrollPercentage()}%`
    requestAnimationFrame(updateProgressBar)
}

function getScrollPercentage() {
    return ((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100)
}

updateProgressBar()

/* ROTATOR TEXT */
let rt_text = document.getElementById('rotator-text')
let rt_item = rt_text.getElementsByTagName('span')

let l = 0

function rotator_text() {
    rt_item[l].classList.remove('is-visible')
    l = (l + 1) % rt_item.length
    rt_item[l].classList.add('is-visible')
}
setInterval(rotator_text, 1500)

/* LINER GRD */
const containers = document.querySelectorAll('.liner-grd');

containers.forEach(f => f.addEventListener('mouseenter', function () {
    containers.forEach(e => {
        e.classList.add('is-not-active');
        e.classList.remove('is-active');
    })
    this.classList.add('is-active')
}))

/* TYPE WRITE */
let TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap";
    document.body.appendChild(css);
};

/* TESTIMONIAL */
let swiper = new Swiper(".testimonial--slider", {
    pagination: {
        el: ".swiper-pagination",
        type: "custom",
        renderCustom: function (swiper, current, total) {
            return current + '<span class="line-pagination"></span>' + (total);
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }
});
