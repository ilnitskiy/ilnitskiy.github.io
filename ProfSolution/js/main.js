
/*  BURGER MENU
------------------------------------------------- */
function Menu() {
    let btn = document.querySelector('.menu');
    let nav = document.querySelector('.nav');
    let close = document.querySelectorAll('.close-menu');
    let ovelay = document.querySelector('.popup-overlay');

    btn.onclick = function(e) {
        e.preventDefault();
        ovelay.classList.toggle('active');
        nav.classList.toggle('active');
        btn.classList.toggle('active');
    };

    ovelay.onclick = function() {
        ovelay.classList.remove('active');
        nav.classList.remove('active');
        btn.classList.remove('active');
    }
}

new Menu();

/*  SELECT
----------------------------------------------  */
function select() {
    let select = document.querySelectorAll('.select');

    for (let i = 0; i < select.length; i++) {
        let view = select[i].querySelector('.view');

        view.onclick = function() {
            let parent = this.closest('.select');
            let ul = parent.querySelector('ul');
            let li = ul.querySelectorAll('li');
            let view = parent.querySelector('.view');
                
            ul.classList.toggle('active');
            parent.classList.toggle('open');

            for (let j = 0; j < li.length; j++) {
                li[j].onclick = function() {
                    view.innerHTML = this.innerHTML;

                    ul.classList.remove('active');
                    parent.classList.remove('open');
                }
            }
        }
    }
}
select();

/* SHOW SECTION
---------------------------------------------------- */
function showSection(count) {
    let showAll = document.querySelectorAll('.show-all');

    for (let i = 0; i < showAll.length; i++) {
        showAll[i].onclick = function() {
            let parentEl = this.previousElementSibling;

            let hiddenEl = parentEl.querySelectorAll('.hidden');

            if (count >= hiddenEl.length) {
                count = hiddenEl.length;
                this.style.background = '#eee';
            }

            for (let i = 0; i < count; i++) {
                hiddenEl[i].classList.remove('hidden');
            }
        }
    }
}

let show1 = new showSection(4);

/*  REQUIRED INPUT 
------------------------------------------------- */
function focus() {
    let input = document.querySelectorAll('input');

    input.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focus');
      });

      input.addEventListener('blur', function() {
            if (this.value == '') {
                setTimeout(function(btn) {
                    btn.parentElement.classList.remove('focus');
            }, 100 ,this);  
        } 
         
      });
    });
}
focus();


/*  SCROLL TOP
------------------------------------------------- */
window.onload = function() {
    let scrolled;
    let timer;
    let btnUp = document.querySelectorAll('.btn-up');

    for (let i = 0; i < btnUp.length; i++) {
            btnUp[i].onclick = function() {
            scrolled = window.pageYOffset;
            window.scrollTo(0, 0);
            scrollToTop();
        }
    }

    function scrollToTop() {
        if (scrolled >= 0) {
            window.scrollTo(0, scrolled);
            scrolled = scrolled - 30;
            timer = setTimeout(scrollToTop, 1);
        }
        else {
            clearInterval(timer);
            window.scrollTo(0, 0);
        }
    }
}

/* SLIDER
---------------------------------------------------- */
function Slider(options) {

    let slider = document.querySelectorAll(options.elem);

    for (let i = 0; i < slider.length; i++) {
        let slideContainer = slider[i].querySelector('.slide-container');
        let track = slider[i].querySelector('.track');
        let slideItem = slider[i].querySelectorAll('.slide-item');

        let next = slider[i].querySelector('.next').addEventListener('click', nextSlid);
        let prew = slider[i].querySelector('.prew').addEventListener('click', prewSlid);

        let dots;

        let countDot = 0;

        let count = slideItem.length;

        let slidesToShow = options.slidesToShow;
        let slidesToScroll = options.slidesToScroll;
        let responsive = options.responsive;

        /*  ADD-DOT 
        ------------------------------------------------- */
        function addDots() {
            let slideDots = document.createElement('div');

            for (let i = 0; i < slideItem.length / slidesToScroll; i++) {
                slideContainer.appendChild(slideDots);
                slideDots.classList.add('slide-dots');
                let span = document.createElement('span');
                slideDots.appendChild(span);
            }

            dots = slider[i].querySelectorAll('.slide-dots span');
            dotsAddActive(0);

            dotsClick();
        }

        /*  DOTS-CLICK 
        ------------------------------------------------- */
        function dotsClick() {
            for (let i = 0; i < dots.length; i++) {
                dots[i].onclick = function() {

                    slideSpeed(options.speed);
                    
                    for (let i = 0; i < dots.length; i++) {
                        dotsRemoveActive(i);
                    }

                    dotsAddActive(i);

                    countDot = i;

                    count = slideItem.length + i * slidesToScroll;

                    setTransform();
                }
            }
        }

        function dotsAddActive(index) {
            if (options.dots) {
                dots[index].classList.add('active');
            }
        }

        function dotsRemoveActive(index) {
            if (options.dots) {
                dots[index].classList.remove('active');
            }
        }

        /*  SLIDE-CLONE
        ------------------------------------------------- */
        function slideClone() {
            for (let i = 0; i < slideItem.length; i++) {
                let cloneStart = slideItem[slideItem.length - slideItem.length + i].cloneNode(true);
                cloneStart.classList.add('cloned');
                track.insertBefore(cloneStart, slideItem[0]);
            }

            for (let i = 0; i < slideItem.length; i++) {
                let cloneEnd = slideItem[i].cloneNode(true);
                cloneEnd.classList.add('cloned');
                track.appendChild(cloneEnd);
            }
        }
        slideClone();

        let slideItems = slider[i].querySelectorAll('.slide-item');

        for (let i = 0; i < slideItems.length; i++) {
            slideItems[i].onmousedown = function(e) {
                e.preventDefault();
            }
        }
        
        function swipeSlider() {

            let desc = 0;

            let widthItem = 0;

            let proc = 0;

            let drob = 0;

            /*  SWIPE DESCTOP
            ------------------------------------------------- */
            function swiperDesctop(e) {
                track.addEventListener("mousedown", swipeStart);

                let shiftX = 0;

                function swipeStart(e) {
                    track.removeEventListener("mousedown", swipeStart);

                    widthItem = slideItem[0].clientWidth;

                    proc = widthItem / 3;

                    drob = this.clientWidth / 100;

                    shiftX = e.pageX;

                    track.addEventListener("mouseup", swipeEnd);

                    track.addEventListener("mousemove", swipeMove);

                    track.addEventListener("mouseleave", swipeEnd);

                    setTimeout(function() {
                        track.addEventListener("mousedown", swipeStart);
                    }, options.speed);
                }

                function swipeMove(e) {
                    slideSpeed(0);

                    desc = e.pageX - shiftX;

                    let swipe = count * 100 / -slidesToShow + desc / drob;

                    track.style.transform = 'translate3d(' + swipe + '%,0,0)';
                }

                function swipeEnd(e) {
                    slideSpeed(options.speed);

                    track.style.transform = 'translate3d(' + count * 100 / -slidesToShow + '%,0,0)';

                    if (desc < -proc) {
                        nextSlid();
                        desc = 0;
                    }else if (desc > proc) {
                        prewSlid();
                        desc = 0;
                    }

                    track.removeEventListener("mousemove", swipeMove);
                    track.removeEventListener("mouseleave", swipeEnd);
                    track.removeEventListener("mouseup", swipeEnd);
                 };
            }
            swiperDesctop();

            /*  SWIPE MOBILE
            ------------------------------------------------- */
            function swipeMobile() {
                track.addEventListener("touchstart", swipeStart);
                
                let touchX = 0;

                function swipeStart(e) {
                    track.removeEventListener("touchstart", swipeStart);

                    widthItem = slideItem[0].clientWidth;

                    proc = widthItem / 3;

                    drob = this.clientWidth / 100;

                    touchX = e.changedTouches[0].screenX;

                    track.addEventListener("touchend", swipeEnd);

                    track.addEventListener("touchmove", swipeMove);

                    track.addEventListener("touchleave", swipeEnd);

                    setTimeout(function() {
                        track.addEventListener("touchstart", swipeStart);
                    }, options.speed);
                }

                function swipeMove(e) {
                    slideSpeed(0);

                    desc = e.changedTouches[0].screenX - touchX;

                    let swipe = count * 100 / -slidesToShow + desc / drob;
                   
                    track.style.transform = 'translate3d(' + swipe + '%,0,0)';
                }

                function swipeEnd(e) {
                    slideSpeed(options.speed);

                    track.style.transform = 'translate3d(' + count * 100 / -slidesToShow + '%,0,0)';

                    if (desc < -proc) {
                        nextSlid();
                        desc = 0;
                    }else if (desc > proc) {
                        prewSlid();
                        desc = 0;
                    }
                    track.removeEventListener("touchmove", swipeMove);
                    track.removeEventListener("touchleave", swipeEnd);
                    track.removeEventListener("touchend", swipeEnd);
                }
            }
            swipeMobile();
        }
        

        function setTransform() {

            if (responsive) {
                const allResponsive = responsive.map(item => item.breakpoint);
                const maxResponse = Math.max(...allResponsive);
                const widthWindow = window.innerWidth;

                if (widthWindow < maxResponse) {
                    for (let i = 0; i < allResponsive.length; i++) {
                        if (widthWindow < allResponsive[i] ) {
                            slidesToShow = responsive[i].slidesToShow;
                        }
                    }
                }else if (widthWindow > maxResponse) {
                    slidesToShow = options.slidesToShow;
                }
            }

            for (let i = 0; i < slideItems.length; i++) {
                slideItems[i].style.minWidth = 100 / slidesToShow + '%';
            }

             
            track.style.transform = 'translate3d(-' + count * 100 / slidesToShow + '%,0,0)';
        }
        setTransform();

        /*  SPEED-SLIDE 
        ------------------------------------------------- */
        function slideSpeed(seconds) {
            track.style.cssText = "transition: transform "+ seconds +"ms ease";
            
        }

        /*  CONTROL-POSITION 
        ------------------------------------------------- */
        function controlPosition() {
            setTimeout(function() {
                slideSpeed(0);

                setTransform();
            }, options.speed);
        }

        /*  BTN-DISABLED 
        ------------------------------------------------- */
        function btnDisabled(btn) {
            btn.disabled = true;

            setTimeout(function() {
                btn.disabled = false;
            }, options.speed, btn);
        }
        
        function autoplaySlide() {
            nextSlid();
        }
        

        function nextSlid() {
            
            dotsRemoveActive(countDot);

            slideSpeed(options.speed);

            btnDisabled(this);

            countDot ++;

            count = count + slidesToScroll;

            setTransform();

            if (count >= slideItem.length + slideItem.length) {
                countDot = 0;

                count = slideItem.length;

                controlPosition();
            }

            dotsAddActive(countDot);
        }

        function prewSlid() {
            dotsRemoveActive(countDot);

            slideSpeed(options.speed);

            btnDisabled(this);

            countDot --;

            count = count - slidesToScroll;

            setTransform();

            if (count < slideItem.length ) {
                countDot = slideItem.length / slidesToScroll -1;

                count = slideItem.length + slideItem.length - slidesToScroll;

                controlPosition();
            }

            dotsAddActive(countDot);
        }


        function init() {
            if (options.dots) {
                addDots();
            }
            if (options.swipe) {
                swipeSlider();
            }
            if (options.autoplay) {
                setInterval(autoplaySlide, options.autoplaySpeed);
            }


            window.addEventListener('resize', setTransform);
        }

        init();
    }
}

if (document.querySelectorAll('.slider').length) {
    let slider = new Slider({
        elem: '.slider',
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        swipe: true,
        speed: 300,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                slidesToShow: 3,
            },
            {
                breakpoint: 768,
                slidesToShow: 2,
            }
        ]
    });
}


/*  SCROLL PAGE 
------------------------------------------------- */
function scrollPage() {

    let scrollPage = document.querySelector('.scroll-page');

    let trackScroll = scrollPage.querySelector('.track-scroll');

    let section = scrollPage.querySelectorAll('.section');

    let container = scrollPage.querySelectorAll('.container');

    let btn = document.querySelectorAll('.btn-scroll');

    let dots;
    let z = 0;

    let count = 0;
    let countDot = 0;

    function scrollBtn() {

        for (let i = 0; i < btn.length; i++) {
            btn[i].onclick = function(e) {
                e.preventDefault();
                count = 0;
                countDot = 0;

                for (let i = 0; i < dots.length; i++) {
                    dots[i].classList.remove('active');
                }

                dots[0].classList.add('active');

                for (let i = 0; i < container.length; i++) {
                    container[i].classList.remove('active');
                
                };

                container[count].classList.add('active');

                setTransform();
            }
        }
    }
    scrollBtn();


    /*  ADD DOTS 
    ------------------------------------------------- */
    function navDots() {
        let navDots = document.createElement('div');

        for (let i = 0; i < section.length; i++) {
            scrollPage.appendChild(navDots);
            navDots.classList.add('nav-dots');

            let span = document.createElement('span');
            navDots.appendChild(span);
        }

        dots = scrollPage.querySelectorAll('.nav-dots span');
        dots[0].classList.add('active');

    }
    navDots();

    /*  DOTS-CLICK 
    ------------------------------------------------- */
    function dotsClick() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].onclick = function() {
                z = 0;

                for (let i = 0; i < dots.length; i++) {
                    dots[i].classList.remove('active');
                }

                dots[i].classList.add('active');

                count = i;
                countDot = i;

                for (let i = 0; i < container.length; i++) {
                    container[i].classList.remove('active');
                
                };

                container[count].classList.add('active');

                setTransform();
            }
        }
    }
    dotsClick();


    /*  SET TRANSFORM 
    ------------------------------------------------- */
    function setTransform() {
        trackScroll.style.transform = 'translateY(-' + 100 * count / section.length + '%)';
    }

    /*  SCROLL SECTION 
    ------------------------------------------------- */
    for (let i = 0; i < container.length; i++) {
        container[i].addEventListener('wheel', ScrollSection);
        container[0].classList.add('active');
    };

    function ScrollSection(e) {
        z++;

        if (z > 2) {
            z = 0;

            let num = parseInt(this.scrollHeight - this.scrollTop - this.clientHeight);

            if (this.scrollHeight > this.clientHeight) {

                if (this.scrollTop <= 0 && e.deltaY < 0) {
                   document.addEventListener('wheel', transformScroll); 
                }

                if (num <= 0 && e.deltaY > 0) {
                    document.addEventListener('wheel', transformScroll);
                }

            } else {
                document.addEventListener('wheel', transformScroll); 
            }
        }

    }

    function transformScroll(e) {


        document.removeEventListener('wheel', transformScroll);

        if (e.deltaY > 0) {
            dots[countDot].classList.remove('active');

            count = count +1;
            countDot = countDot +1;

            if (count > section.length -1) {
                count = section.length -1;
                countDot = section.length -1;
            }

            dots[countDot].classList.add('active');

            for (let i = 0; i < container.length; i++) {
                container[i].classList.remove('active');
                
            };

            container[count].classList.add('active');

        } else {
            dots[countDot].classList.remove('active');

            count = count -1;
            countDot = countDot -1;

            if (count < 0) {
                count = 0;
                countDot = 0;
            }

            dots[countDot].classList.add('active');

            for (let i = 0; i < container.length; i++) {
                container[i].classList.remove('active');
                
            };

            container[count].classList.add('active');
        }

        setTransform();
    }

    window.addEventListener('resize', deActive);

    function deActive() {
        if( window.innerWidth < 900 ){
            for (let i = 0; i < container.length; i++) {
                container[i].removeEventListener('wheel', ScrollSection);
            }
        } else {
              for (let i = 0; i < container.length; i++) {
                container[i].addEventListener('wheel', ScrollSection);
            }
        } 
    }

    deActive();
}

if (document.querySelector('.scroll-page')) scrollPage();