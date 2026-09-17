/* =========================================================
   GSAP + ScrollTrigger
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       Check GSAP
    ----------------------------------------------------- */
    if (typeof gsap === "undefined") {
        console.error("GSAP is not loaded.");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.warn("ScrollTrigger is not loaded.");
    }


    /* =====================================================
       COMMON SCROLL TRIGGER
    ===================================================== */

    function createScrollTrigger(triggerElement, timeline) {

        if (!triggerElement || !timeline) return;

        if (typeof ScrollTrigger === "undefined") {
            timeline.play();
            return;
        }

        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",

            onLeaveBack: function () {
                timeline.progress(0);
                timeline.pause();
            }
        });

        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 80%",

            onEnter: function () {
                timeline.play();
            }
        });
    }


    /* =====================================================
       WORDS SLIDE FROM RIGHT
    ===================================================== */

    if (typeof SplitType !== "undefined") {

        gsap.utils
            .toArray(".words-slide-from-right p")
            .forEach(function (paragraph) {

                if (!paragraph) return;

                const tl = gsap.timeline({
                    paused: true
                });

                new SplitType(paragraph, {
                    types: "words, chars",
                    tagName: "span"
                });

                const words = paragraph.querySelectorAll(".word");

                if (!words.length) return;

                tl.from(words, {
                    opacity: 0,
                    x: "1em",
                    duration: 1,
                    ease: "power2.out",
                    stagger: {
                        amount: 0.2
                    }
                });

                createScrollTrigger(paragraph, tl);
            });


        /* =================================================
           WORDS SLIDE UP
        ================================================= */

        gsap.utils
            .toArray(
                ".words-slide-up p, " +
                ".words-slide-up > *, " +
                ".fari__heading > *, " +
                ".fari__content p"
            )
            .forEach(function (element) {

                if (!element) return;

                const tl = gsap.timeline({
                    paused: true
                });

                new SplitType(element, {
                    types: "words, chars",
                    tagName: "span"
                });

                const words = element.querySelectorAll(".word");

                if (!words.length) return;

                tl.from(words, {
                    opacity: 0,
                    yPercent: 100,
                    duration: 0.8,
                    ease: "back.out(2)",
                    stagger: {
                        amount: 0.3
                    }
                });

                createScrollTrigger(element, tl);
            });

    } else {

        console.warn(
            "SplitType is not loaded. Word animations skipped."
        );

    }


    /* =====================================================
       VERTICAL PARALLAX
    ===================================================== */

    function initialiseParallaxVertical() {

        if (typeof ScrollTrigger === "undefined") return;

        if (window.innerWidth <= 639) return;

        const parallaxVerticals =
            gsap.utils.toArray(".parallax_vertical");

        parallaxVerticals.forEach(function (element) {

            const offset =
                parseFloat(
                    element.getAttribute(
                        "data-parallax-vertical"
                    )
                ) || 20;

            gsap.fromTo(
                element,

                {
                    yPercent: offset
                },

                {
                    yPercent: -offset,
                    ease: "none",

                    scrollTrigger: {
                        trigger: element,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

        });
    }


    /* =====================================================
       HORIZONTAL PARALLAX
       
       Original code was calling this function but the
       function itself was missing.
    ===================================================== */

    function initialiseParallaxHorizontal() {

        if (typeof ScrollTrigger === "undefined") return;

        if (window.innerWidth <= 639) return;

        const elements =
            gsap.utils.toArray(".parallax_horizontal");

        elements.forEach(function (element) {

            const offset =
                parseFloat(
                    element.getAttribute(
                        "data-parallax-horizontal"
                    )
                ) || 20;

            gsap.fromTo(
                element,

                {
                    xPercent: offset
                },

                {
                    xPercent: -offset,
                    ease: "none",

                    scrollTrigger: {
                        trigger: element,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

        });
    }


    initialiseParallaxVertical();
    initialiseParallaxHorizontal();


    /* =====================================================
       REVEAL UP
    ===================================================== */

    if (typeof ScrollTrigger !== "undefined") {

        gsap.utils
            .toArray(".revealUp > *")
            .forEach(function (elem) {

                if (!elem) return;

                ScrollTrigger.create({

                    trigger: elem,

                    start: "top 100%",
                    end: "bottom 20%",

                    onEnter: function () {

                        gsap.fromTo(
                            elem,

                            {
                                y: 100,
                                autoAlpha: 0
                            },

                            {
                                duration: 1.25,
                                y: 0,
                                autoAlpha: 1,
                                ease: "back",
                                overwrite: "auto"
                            }
                        );

                    },

                    onLeave: function () {

                        gsap.to(elem, {
                            autoAlpha: 0,
                            overwrite: "auto"
                        });

                    },

                    onEnterBack: function () {

                        gsap.fromTo(
                            elem,

                            {
                                y: -100,
                                autoAlpha: 0
                            },

                            {
                                duration: 1.25,
                                y: 0,
                                autoAlpha: 1,
                                ease: "back",
                                overwrite: "auto"
                            }
                        );

                    },

                    onLeaveBack: function () {

                        gsap.to(elem, {
                            autoAlpha: 0,
                            overwrite: "auto"
                        });

                    }

                });

            });

    }


    /* =====================================================
       UKIYO PARALLAX
    ===================================================== */

    if (typeof Ukiyo !== "undefined") {

        const els =
            document.querySelectorAll(".ukiyo");

        els.forEach(function (el) {

            try {

                new Ukiyo(el);

            } catch (error) {

                console.warn(
                    "Ukiyo initialization failed:",
                    error
                );

            }

        });

    } else {

        console.warn(
            "Ukiyo is not loaded. Ukiyo effect skipped."
        );

    }


    /* =====================================================
       LENIS SMOOTH SCROLL
    ===================================================== */

    if (typeof Lenis !== "undefined") {

        try {

            const lenis = new Lenis({
                smooth: true,
                lerp: 0.07
            });


            function raf(time) {

                lenis.raf(time);

                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);


            /* ---------------------------------------------
               GSAP ScrollTrigger + Lenis sync
            --------------------------------------------- */

            if (typeof ScrollTrigger !== "undefined") {

                lenis.on(
                    "scroll",
                    ScrollTrigger.update
                );

                gsap.ticker.add(function (time) {

                    lenis.raf(time * 1000);

                });

                gsap.ticker.lagSmoothing(0);

            }

        } catch (error) {

            console.warn(
                "Lenis initialization failed:",
                error
            );

        }

    } else {

        console.warn(
            "Lenis is not loaded. Smooth scroll skipped."
        );

    }


    /* =====================================================
       ARROW ANIMATION - RIGHT
    ===================================================== */

    const arrowSection =
        document.getElementById("arrowSection");

    const dottedPath =
        document.getElementById("dottedPath");

    const arrow =
        document.getElementById("arrow");


    if (
        arrowSection &&
        dottedPath &&
        arrow
    ) {

        try {

            const pathLength =
                dottedPath.getTotalLength();


            function resetArrowAnimation() {

                arrowSection.classList.remove(
                    "startAnimation"
                );

                dottedPath.style.strokeDasharray =
                    pathLength;

                dottedPath.style.strokeDashoffset =
                    pathLength;

                arrow.style.opacity = "0";
            }


            resetArrowAnimation();


            const observer =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                arrowSection.classList.add(
                                    "startAnimation"
                                );

                            } else {

                                resetArrowAnimation();

                            }

                        });

                    },
                    {
                        threshold: 0.4
                    }
                );


            observer.observe(arrowSection);

        } catch (error) {

            console.warn(
                "Right arrow animation failed:",
                error
            );

        }

    }


    /* =====================================================
       ARROW ANIMATION - LEFT
    ===================================================== */

    const arrowSectionLeft =
        document.getElementById(
            "arrowSectionleft"
        );

    const dottedPathLeft =
        document.getElementById(
            "dottedPathleft"
        );

    const arrowLeft =
        document.getElementById(
            "arrowleft"
        );


    if (
        arrowSectionLeft &&
        dottedPathLeft &&
        arrowLeft
    ) {

        try {

            const pathLength =
                dottedPathLeft.getTotalLength();


            function resetLeftArrowAnimation() {

                arrowSectionLeft.classList.remove(
                    "startAnimation"
                );

                dottedPathLeft.style.strokeDasharray =
                    pathLength;

                dottedPathLeft.style.strokeDashoffset =
                    pathLength;

                arrowLeft.style.opacity = "0";
            }


            resetLeftArrowAnimation();


            const observerLeft =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                arrowSectionLeft.classList.add(
                                    "startAnimation"
                                );

                            } else {

                                resetLeftArrowAnimation();

                            }

                        });

                    },
                    {
                        threshold: 0.4
                    }
                );


            observerLeft.observe(
                arrowSectionLeft
            );

        } catch (error) {

            console.warn(
                "Left arrow animation failed:",
                error
            );

        }

    }


    /* =====================================================
       TEA BANNER DRAW PATH
    ===================================================== */

    const banner =
        document.querySelector(".tea__banner");

    const drawPath =
        document.querySelector(".draw-path");


    if (banner && drawPath) {

        try {

            const pathLength =
                drawPath.getTotalLength();


            drawPath.style.strokeDasharray =
                pathLength;

            drawPath.style.strokeDashoffset =
                pathLength;


            function animateBannerPath() {

                const rect =
                    banner.getBoundingClientRect();

                const windowHeight =
                    window.innerHeight;


                let progress =
                    (windowHeight - rect.top) /
                    (windowHeight * 0.8);


                progress =
                    Math.max(
                        0,
                        Math.min(1, progress)
                    );


                drawPath.style.strokeDashoffset =
                    pathLength -
                    (pathLength * progress);

            }


            window.addEventListener(
                "scroll",
                animateBannerPath,
                {
                    passive: true
                }
            );


            animateBannerPath();

        } catch (error) {

            console.warn(
                "Banner draw path failed:",
                error
            );

        }

    }


    /* =====================================================
       MARQUEE
    ===================================================== */

    if (typeof ScrollTrigger !== "undefined") {

        const marquee =
            document.querySelector(
                ".tea__marquee-banner"
            );

        const textPath =
            marquee
                ? marquee.querySelector("#marqueeText")
                : null;


        if (marquee && textPath) {

            gsap.to(textPath, {

                attr: {
                    startOffset: "-35%"
                },

                ease: "none",

                scrollTrigger: {

                    trigger: marquee,

                    start: "top bottom",
                    end: "bottom top",

                    scrub: 1.5
                }

            });

        }

    }


    /* =====================================================
       TEA PROMISE BACKGROUND REVEAL
    ===================================================== */

    const promiseBg =
        document.querySelector(
            ".tea__promise-bg"
        );


    if (
        promiseBg &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.fromTo(

            promiseBg,

            {
                clipPath:
                    "inset(0 100% 0 0)"
            },

            {
                clipPath:
                    "inset(0 0% 0 0)",

                duration: 4.8,

                ease: "power2.out",

                scrollTrigger: {

                    trigger:
                        "#tea__promise",

                    start: "top 70%",

                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       TEA BREWED BACKGROUND REVEAL
    ===================================================== */

    const brewedBg =
        document.querySelector(
            ".tea__brewed-bg"
        );


    if (
        brewedBg &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.fromTo(

            brewedBg,

            {
                clipPath:
                    "inset(0 100% 0 0)"
            },

            {
                clipPath:
                    "inset(0 0% 0 0)",

                duration: 4.8,

                ease: "power2.out",

                scrollTrigger: {

                    trigger:
                        "#tea__brewed",

                    start: "top 70%",

                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       GLOBAL GSAP REVEAL
    ===================================================== */

    if (typeof ScrollTrigger !== "undefined") {

        gsap.utils
            .toArray(".gsap-reveal")
            .forEach(function (el) {

                gsap.from(el, {

                    y: 70,

                    opacity: 0,

                    duration: 1.2,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: el,

                        start: "top 85%",

                        toggleActions:
                            "play none none reverse"
                    }

                });

            });


        /* =================================================
           IMAGE REVEAL
        ================================================= */

        gsap.utils
            .toArray(".gsap-img")
            .forEach(function (img) {

                gsap.fromTo(

                    img,

                    {
                        scale: 1.15
                    },

                    {
                        scale: 1,

                        duration: 1.5,

                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: img,

                            start: "top 85%",

                            end: "bottom 20%",

                            scrub: 1
                        }
                    }

                );

            });


        /* =================================================
           STAGGER CARDS
        ================================================= */

        gsap.utils
            .toArray(".gsap-card-wrap")
            .forEach(function (section) {

                const cards =
                    section.querySelectorAll(
                        ".gsap-card"
                    );

                if (!cards.length) return;


                gsap.from(cards, {

                    y: 80,

                    opacity: 0,

                    stagger: 0.12,

                    duration: 1,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: section,

                        start: "top 80%",

                        toggleActions:
                            "play none none reverse"
                    }

                });

            });


        /* =================================================
           PARALLAX IMAGE
        ================================================= */

        gsap.utils
            .toArray(".gsap-parallax")
            .forEach(function (img) {

                gsap.to(img, {

                    yPercent: -12,

                    ease: "none",

                    scrollTrigger: {

                        trigger: img,

                        start: "top bottom",

                        end: "bottom top",

                        scrub: true
                    }

                });

            });

    }


    /* =====================================================
       REFRESH SCROLLTRIGGER
    ===================================================== */

    if (typeof ScrollTrigger !== "undefined") {

        setTimeout(function () {

            ScrollTrigger.refresh();

        }, 300);

    }

});