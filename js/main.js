$(document).ready(() => {
  /* -----------------------------------------------------
                    Events slider
----------------------------------------------------- */

  var $events_slider = $(".events-slider");
  $events_slider.slick({
    slidesToShow: 3,
    dots: false,
    slidesToScroll: 1,
    speed: 400,
    loop: true,
    autoplay: false,
    prevArrow:
      '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
    nextArrow:
      '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
    appendArrows: $(".events-slider-controls .slider-nav"),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10px"
        }
      }
    ]
  });
  //active progress
  var $progressBar = $(".e-list-progress");
  var $progressBarLabel = $(".slider__label");
  $events_slider.on("beforeChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    var calc = (nextSlide / (slick.slideCount - 1)) * 100;
    $progressBar
      .css("background-size", calc + "% 100%")
      .attr("aria-valuenow", calc);
    $progressBarLabel.text(calc + "% completed");
  });
  //active count list
  $(".events-slider").on("beforeChange", function (
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    var firstNumber = check_number(++nextSlide);
    $(".events-slider-controls .slider-extra .text .first").text(firstNumber);
  });
  var smSlider = $(".events-slider").slick("getSlick");
  var smSliderCount = smSlider.slideCount;
  $(".events-slider-controls .slider-extra .text .last").text(
    check_number(smSliderCount)
  );
  function check_number(num) {
    // var IsInteger = /^[0-9]+$/.test(num);
    // return IsInteger ? "0" + num : null;
    return isNaN(num) ? null : num.toString();
  }

  /* -----------------------------------------------------
                    Showcase/hall of fame slider
----------------------------------------------------- */
  $(".hall-of-fame-slider").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 2,
    autoplay: true,

    prevArrow:
      '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
    nextArrow:
      '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  });

  /* -----------------------------------------------------
                    Team slider
----------------------------------------------------- */
  $(".team-slider").slick({
    slidesToShow: 4,
    autoplay: true,

    prevArrow:
      '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
    nextArrow:
      '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ]
  });

  /*------------------------------------------------------
        back to top
-------------------------------------------------------*/
  $(document).on("click", ".back-to-top", function () {
    $("html,body").animate(
      {
        scrollTop: 0
      },
      1000
    );
  });

  /* -------------------------------------------------------------
        inner linking js
    ------------------------------------------------------------- */
  if ($('.scroll-down a[href^="#"]').length) {
    $('.scroll-down a[href^="#"]')
      .not("#scrollUp")
      .on("click", function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $target.offset().top
            },
            900,
            "swing"
          );
      });
  }

  $("header nav .nav-item").click(function (e) {
    $("header nav .nav-item.active").removeClass("active");

    var $parent = $(this);
    $parent.addClass("active");
    e.preventDefault();
  });
});

/* -------------------------------------------------------------
      Toggle Bootstrap Light/Dark mode
  ------------------------------------------------------------- */

let userSetTheme = '';

function bsLightMode() {
  // document.body.dataset.bsTheme = "light";
  // document.getElementById('theme-fab').innerText = "🌑";
  document.getElementById('theme-fab').onclick = bsDarkMode;
  console.log("Loading light theme");
  setTheme("light");
  setStoredTheme("light");
}

function bsDarkMode() {
  // document.body.dataset.bsTheme = "dark";
  // document.getElementById('theme-fab').innerText = "☀";
  document.getElementById('theme-fab').onclick = bsLightMode;
  console.log("Loading dark theme");
  setTheme("dark");
  setStoredTheme("dark");
}

function toggleBsThemeMode() {

}

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

const getStoredTheme = () => localStorage.getItem('theme')
const setStoredTheme = theme => localStorage.setItem('theme', theme)

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme()
  if (storedTheme) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = theme => {
  if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
}

setTheme(getPreferredTheme())

const showActiveTheme = (theme, focus = false) => {
  const themeSwitcher = document.querySelector('#bd-theme')

  if (!themeSwitcher) {
    return
  }

  const themeSwitcherText = document.querySelector('#bd-theme-text')
  const activeThemeIcon = document.querySelector('.theme-icon-active use')
  const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
  const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

  document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    element.classList.remove('active')
    element.setAttribute('aria-pressed', 'false')
  })

  btnToActive.classList.add('active')
  btnToActive.setAttribute('aria-pressed', 'true')
  activeThemeIcon.setAttribute('href', svgOfActiveBtn)
  const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
  themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

  if (focus) {
    themeSwitcher.focus()
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const storedTheme = getStoredTheme()
  if (storedTheme !== 'light' && storedTheme !== 'dark') {
    setTheme(getPreferredTheme())
  }
})

window.addEventListener('DOMContentLoaded', () => {
  showActiveTheme(getPreferredTheme())

  document.querySelectorAll('[data-bs-theme-value]')
    .forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value')
        setStoredTheme(theme)
        setTheme(theme)
        showActiveTheme(theme, true)
      })
    })
})