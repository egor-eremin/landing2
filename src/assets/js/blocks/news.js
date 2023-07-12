import { definesLanguage } from './global'; // хук для определения языка
import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import __NEWS_JSON from './json/news.json'; // подключение объекта со всеми статичными переводами для новостей
import 'jquery-rss'; // подключение плагина для подгрузки rss новостей

let rssUrl = isbeta();

function isbeta(name) {

    let url = name; // путь к файлу - если у вас другой - то его и указываете
    let pathname = location.pathname.split('/');
    for (let i = 0; i < pathname.length; i++) {
        if (pathname[i] == 'beta') url = '/beta' + name; // если мы на бете, то добавляем подддомен 'beta' к пути
    }
    return url;
}

(function getnewsrss() {
    let newsImg = __CONFIG_GLOBAL.javascript.news.imgblock
    let langData = definesLanguage(),
        baseDir = langData == __CONFIG_GLOBAL.defaultLanguage ? '' : '../';
    langData = (langData === 'zh') ? 'cn' : langData;
    var html = '';
    $.ajax({
        url: isbeta('/rssrequest.php'),
        method: 'GET',
        data: {
            lang: langData
        },
        type: 'json',
        success: function success(data) {

            var res = JSON.parse(data);
            var img
            for (var i = 0; i < res.length; i++) {
                // var author = res[i].author != '' ? textLang[langData].authors + ': ' + res[i].author : '',
                //     date = res[i].date != '' ? textLang[langData].date + ': ' + res[i].date : '';
                var author = res[i].author != '' ? res[i].author : '',
                    date = res[i].date != '' ? res[i].date : '',
                    classNotImg = res[i].img_url == '' ? 'notImg' : '';
                img = res[i].img_url != '' ? res[i].img_url : isbeta(newsImg);

                html += '\
		<div class="news-item">\
			<a class="news-wrapper-inner ' + classNotImg + '" target="_blank" href="' + res[i].link + '" >\
			        <div class="news-content">\
                    <img class="news-item__img" src="' + img + '">\
                     <div class="news-text">\
                        <div class="news-item__text news-item__author">' + author + '</div>\
                        <div class="news-item__title h3-title">' + res[i].title + '</div>\
                        <div class="news-item__text news-item__date">' + date + '</div>\
                     </div>\
			        </div>\
			</a>\
		</div>\
		';
            }


            $('.news-slider').html(html);

            // $('.news-slider').on('init', onSliderInit);
            // $('.news-slider').on('afterChange', onSliderInit);

            $('.news-slider').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                // centerMode: true,
                // variableWidth: true,
                // touchThreshold: 10,
                dots: true,
                arrows: true,
                appendDots: '.dots-wrapper-news-init-js',
                appendArrows: '.arrow-wrapper-news-init-js',
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
                infinite: true,
                responsive: [
                    {
                        breakpoint: 901,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    },
                    {
                        breakpoint: 761,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            fade: true,
                            dots: false,
                        }
                    }
                ]
            });

            $('[data-dot]').dotdotdot();
            $(window).resize(function() {
                $('[data-dot]').dotdotdot();
            });
            function onSliderInit(event, slick) {
                var countSlide = $(this).parents('.wrapper').find('.navigation-wrapper').find('.slick-dots li:last-child button').text();
                var activeSlide = $(this).parents('.wrapper').find('.navigation-wrapper').find('.slick-dots .slick-active button').text();

                $(this).parents('.wrapper').find('.current-slide').text(activeSlide + "/");
                $(this).parents('.wrapper').find('.number-of-slides').text(countSlide);
            };


        },
        error: function error() {
            console.log('error');
        }
    });

})();
