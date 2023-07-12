(function addedLicensesSlider() {
    if ($('.licenses-list-js').length) {
        $('.licenses-list-js').slick({
            arrows: true,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            appendArrows: '.arrow-wrapper-licenses-init-js',
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
            responsive: [
                {
                    breakpoint: 1161,
                    settings: {
                        slidesToShow: 2,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });
    }
})();
