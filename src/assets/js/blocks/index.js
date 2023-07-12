(function initMainSlider() {
    if( $('div').is('.js-main-slider') ) {

        $('.js-main-slider').on('init', function (slick) {
            $(this).parents('.main-header').addClass('slide-0');
        });
        $('.js-main-slider').on('beforeChange', function (slick, currentSlide, nextSlide) {
            $(this).parents('.main-header').removeClass('slide-' + currentSlide.currentSlide);
        })
        $('.js-main-slider').on('afterChange', function (slick, currentSlide) {
            $(this).parents('.main-header').addClass('slide-' + currentSlide.currentSlide);
        })

        $('.js-main-slider').slick({
            arrows: true,
            dots: false,
            fade: true,
            speed: 0,
            autoplay: true,
            autoplaySpeed: 4000,
            appendArrows: '.arrow-wrapper-main-init-js',
            appendDots: '.dots-wrapper-main-init-js',
            // asNavFor: '.js-bg-main',
            pauseOnHover: false,
            pauseOnFocus: false,
            prevArrow: '<button type="button" class="slick-prev slick-main-slider">' +
                '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M8.71729 9.00006L2.00021 16.0001L8.71729 23.0001" stroke="#CFCFCF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M3.26709 16.0318L30.0001 16.0318" stroke="#CFCFCF" stroke-width="2" stroke-linecap="round"/>\n' +
                '</svg>' +
                '</button>',
            nextArrow: '<button type="button" class="slick-next slick-main-slider">' +
                '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M23.2827 9.00006L29.9998 16.0001L23.2827 23.0001" stroke="#CFCFCF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
                '<path d="M28.7329 16.0318L1.99985 16.0318" stroke="#CFCFCF" stroke-width="2" stroke-linecap="round"/>\n' +
                '</svg>' +
                '</button>',
        });
    }
    // $('.js-bg-main').slick({
    //     asNavFor: '.js-main-slider',
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     fade: true,
    //     arrows: false,
    //     dots: false,
    // });
})();
(function initAccountSlider() {
    if ( $('div').is('.accounts-list') ) {
        // $('.accounts-slider-js').on('init', onSliderInit);
        // $('.accounts-slider-js').on('afterChange', onSliderInit);
        $('.accounts-list-tabs-js').slick({
            arrows: false,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
            focusOnSelect: true,
            asNavFor: '.accounts-slider-js',
        });
        $('.accounts-slider-js').slick({
            arrows: false,
            dots: false,
            fade: true,
            initialSlide: 1,
            asNavFor: '.accounts-list-tabs-js',
            pauseOnHover: false,
            pauseOnFocus: false,
            appendDots: '.dots-wrapper-accounts-init-js',
            appendArrows: '.arrow-wrapper-accounts-init-js',
            prevArrow: '<button type="button" class="slick-prev slick-main-slider">' +
                '<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M10.5714 4.5C10.8476 4.5 11.0714 4.27614 11.0714 4C11.0714 3.72386 10.8476 3.5 10.5714 3.5V4.5ZM1.07502 3.64645C0.879753 3.84171 0.879753 4.15829 1.07502 4.35355L4.257 7.53553C4.45226 7.7308 4.76884 7.7308 4.9641 7.53553C5.15936 7.34027 5.15936 7.02369 4.9641 6.82843L2.13568 4L4.9641 1.17157C5.15936 0.976311 5.15936 0.659728 4.9641 0.464466C4.76884 0.269204 4.45226 0.269204 4.257 0.464466L1.07502 3.64645ZM10.5714 3.5L1.42857 3.5V4.5L10.5714 4.5V3.5Z" fill="white"/>\n' +
                '</svg>' +
                '</button>',
            nextArrow: '<button type="button" class="slick-next slick-main-slider">' +
                '<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M1.42847 4.5C1.15232 4.5 0.928467 4.27614 0.928467 4C0.928467 3.72386 1.15232 3.5 1.42847 3.5V4.5ZM10.9249 3.64645C11.1201 3.84171 11.1201 4.15829 10.9249 4.35355L7.7429 7.53553C7.54764 7.7308 7.23105 7.7308 7.03579 7.53553C6.84053 7.34027 6.84053 7.02369 7.03579 6.82843L9.86422 4L7.03579 1.17157C6.84053 0.976311 6.84053 0.659728 7.03579 0.464466C7.23105 0.269204 7.54764 0.269204 7.7429 0.464466L10.9249 3.64645ZM1.42847 3.5L10.5713 3.5V4.5L1.42847 4.5V3.5Z" fill="white"/>\n' +
                '</svg>' +
                '</button>',
        });
    }
})();

function onSliderInit(event, slick) {
    var countSlide = $(this).parents('.wrapper').find('.navigation-wrapper').find('.slick-dots li:last-child button').text();
    var activeSlide = $(this).parents('.wrapper').find('.navigation-wrapper').find('.slick-dots .slick-active button').text();

    $(this).parents('.wrapper').find('.current-slide').text(activeSlide + "/");
    $(this).parents('.wrapper').find('.number-of-slides').text(countSlide);
};
