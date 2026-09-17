

$(window).on('scroll', function() {
    if($(this).scrollTop() > 0 ) {
    $(".tea__header").addClass("fixed-top");

    } else {
    $(".tea__header").removeClass("fixed-top");

    }

});

document.addEventListener("DOMContentLoaded", function () {

    const thumbSlider = new Swiper(".tea__thumb-slider", {
        spaceBetween: 15,
        slidesPerView: 3,
     

        breakpoints: {
            0: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 15
            }
        }
    });


    const mainSlider = new Swiper(".tea__main-slider", {
        spaceBetween: 10,
   effect: 'fade',
        thumbs: {
            swiper: thumbSlider
        },

       
        speed: 700
    });

});

const brewedSlider = new Swiper(".tea__brewed-slider", {
  loop: true,
  loopAdditionalSlides: 6,
  allowTouchMove: false,

  speed: 8000,

  freeMode: {
    enabled: true,
    momentum: false,
  },

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    576: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 24,
    }
  }

});

  const testiSlider = new Swiper(".tea__testi-slider", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,

        navigation: {
            nextEl: ".tea__testi-next",
            prevEl: ".tea__testi-prev",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 24,
            }
        }
    });

   const collectionSlider = new Swiper(".collection__shop-slider", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,

        navigation: {
            nextEl: ".tea__testi-next",
            prevEl: ".tea__testi-prev",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 24,
            }
        }
    });

document.addEventListener("DOMContentLoaded", function () {


    const thumbSlider = new Swiper(".shop__thumb-slider", {
        spaceBetween: 15,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,

        breakpoints: {
            0: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 4,
                spaceBetween: 15,
            }
        }
    });

    const shopDetailsSlider = new Swiper(".shop__details-slider", {
        spaceBetween: 15,
        slidesPerView: 1,

        navigation: {
            nextEl: ".shop-details-next",
            prevEl: ".shop-details-prev",
        },

        thumbs: {
            swiper: thumbSlider,
        },

    
        speed: 600,
        effect: "slide",
    });

});