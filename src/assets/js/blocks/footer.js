import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import { definesLanguage } from './global'; // хук для определения языка

/**
 * Автоматическая генерация футера
 */
(function() {
    var lang = definesLanguage(), // получение языка сайта
        blockid = '#page-footer',
        baseDir = lang == __CONFIG_GLOBAL.defaultLanguage ? '' : '../'; // определение корня сайта для ссылок

    let vars = {
        name: __CONFIG_GLOBAL.companyData.title,
        adr: __CONFIG_GLOBAL.companyData.adres,
        phoneNumber: __CONFIG_GLOBAL.companyData.phone,
        phone: "<a href='tel:" + __CONFIG_GLOBAL.companyData.phone + "'>" + __CONFIG_GLOBAL.companyData.phone + "</a>",
        mail: "<a href='mailto:" + __CONFIG_GLOBAL.companyData.email + "'>" + __CONFIG_GLOBAL.companyData.email + "</a>",
        lic: __CONFIG_GLOBAL.companyData.license.lls1,
        lic2: __CONFIG_GLOBAL.companyData.license.lls2,
        lic3: __CONFIG_GLOBAL.companyData.license.lls3,
            getCurrentYear() {
                let currentDate = new Date();
                return currentDate.getFullYear();
            }

    };


    let fDatas = {
        address: {
            ru: "<span>Компания " + vars.name + " зарегистрирована по адресу:</span> <span>" + vars.adr + '.</span>',
            en: "<span>" +vars.name + " is registered at </span> <span>" + vars.adr + '.</span>',
            es: "<span>" + vars.name + " está registrada en </span> <span>" + vars.adr + '.</span>',
            de: "<span>" + vars.name + " ist registriert i </span> <span>" + vars.adr + '.</span>',
            fr: "<span>" + vars.name + " est enregistré au </span> <span>" + vars.adr + '.</span>',
            it: "<span>" + vars.name + " è registrato al </span> <span>" + vars.adr + '.</span>',
            pl: vars.name + " jest zarejestrowany w " + vars.adr,
            zh: "<span>" + vars.name + "註冊於 </span><span>" + vars.adr + '。</span>'
        },
        info: {
            en: "The company operates under the requirements of the Cyprus Securities and Exchange Commission" + (vars.lic ? " (Licence Number: " + vars.lic + ")" : "") + ", the International Financial Services Commission (IFSC)" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + " and the Financial Services Commission of the Republic of Mauritius" + (vars.lic3 ? " (Investment Dealer Licence Number: " + vars.lic3 + ")" : "") + ".",
            ru: "Деятельность компании осуществляется в соответствии с требованиями Кипрской комиссии по ценным бумагам и биржам" + (vars.lic ? " (номер лицензии: " + vars.lic + ")" : "") + ", Комиссии по международным финансовым услугам (IFSC)" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + " и Комиссии по финансовым услугам Республики Маврикия" + (vars.lic3 ? " (номер лицензии инвестиционного дилера: " + vars.lic3 + ")" : "") + ".",
            de: "Das Unternehmen betreibt unter den Anforderungen der Cysec" + (vars.lic ? " (Lizenznummer: " + vars.lic + ")" : "") + ", die International Financial Services Commission (IFSC)" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + " und der Financial Services Commission der Republik Mauritius" + (vars.lic3 ? " (Investment Dealer Lizenznummer: " + vars.lic3 + ")" : "") + ".",
            es: "La compañía opera bajo los requerimientos de la Comisión de Valores de Chipre" + (vars.lic ? " (número de licencia: " + vars.lic + ")" : "") + ", la Comisión Internacional de Servicios Financieros (IFSC)" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + " y la Comisión de Servicios Financieros de la República de Mauricio" + (vars.lic3 ? " (inversión Licencia distribuidor Número: " + vars.lic3 + ")" : "") + ".",
            fr: "La société exerce ses activités sous les exigences de la Commission des valeurs mobilières de Chypre et d'échange" + (vars.lic ? " (Numéro de licence: " + vars.lic + ")" : "") + ", la Commission internationale des services financiers (IFSC)" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + " et la Commission des services financiers de la République de Maurice" + (vars.lic3 ? " (investissement Licence de concessionnaire Numéro: " + vars.lic3 + ")" : "") + ".",
            it: "La società opera con i requisiti della Cyprus Securities and Exchange Commission" + (vars.lic ? " (numero di licenza: " + vars.lic + ")" : "") + ", la Commissione Financial Services International (IFSC)" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + " e alla Commissione servizi finanziari della Repubblica di Mauritius" + (vars.lic3 ? " (Investment Dealer Licenza Numero: " + vars.lic3 + ")" : "") + ".",
            pl: "Firma działa zgodnie z wymogami Cypryjskiej Komisji Papierów Wartościowych i Giełd" + (vars.lic ? " (Numer licencyjny: " + vars.lic + ")" : "") + ", Międzynarodowa Komisja Usług Finansowych (IFSC)" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + " oraz Komisja ds Usług Finansowych Republiki Mauritiusa" + (vars.lic3 ? " (Numer licencji dealera inwestycyjnego: " + vars.lic3 + ")" : "") + ".",
            zh: "該公司在塞浦路斯證券交易委員會的要求下運營" + (vars.lic ? " (許可證號: " + vars.lic + ")" : "") + " 国际金融服务委员会（IFSC）" + (vars.lic2 ? " (" + vars.lic2 + ")" : "") + "和毛里求斯共和国金融服务委员会" + (vars.lic3 ? " (本公司根据塞浦路斯证券交易委员会的要求工作投资经销商许可证编号: " + vars.lic3 + ")" : "") + "。"
        },
        copy: {
            ru: "Защищено SSL. Авторское право © " + (vars.getCurrentYear() - 3) + " - " + vars.getCurrentYear() + " " + vars.name + ". Все права защищены.",
            en: "Secured by SSL. Copyright © " + (vars.getCurrentYear() - 3) + " - " + vars.getCurrentYear() + " " + vars.name + ". All rights reserved.",
            es: "Asegurado por SSL. Copyright © " + (vars.getCurrentYear() - 3) + " - " + vars.getCurrentYear() + " " + vars.name + ". Todos los derechos reservados.",
            de: "Gesichert durch SSL. Urheberrecht © " + (vars.getCurrentYear() - 3) + " - " + vars.getCurrentYear() + " " + vars.name + ". Alle Rechte vorbehalten.",
            fr: "Sécurisé par SSL. Copyright © " + (vars.getCurrentYear() - 3) + " - " + vars.getCurrentYear() + " " + vars.name + ". Tous droits réservés.",
            it: "Protetto da SSL. Copyright © " + (vars.getCurrentYear() - 3) + " - " + vars.getCurrentYear() + " " + vars.name + ". Tutti i diritti riservati.",
            pl: "Zabezpieczone przez SSL. Prawa autorskie © " + (vars.getCurrentYear() - 3) + " - " + vars.getCurrentYear() + " " + vars.name + ". Wszelkie prawa zastrzeżone.",
            zh: "受SSL保護。版權所有©" + (vars.getCurrentYear() - 3) + "-" + vars.getCurrentYear() + " " + vars.name + "。版權所有",
        },
    };

    var footer = "<div class='footer-js footer-information-wrapper'>\
                        <div class='footer-content-wrapper'>\
                        <p class='footer-p'>"+fDatas.info[lang] + "</p>\
                        <p class='footer-p footer-p_address'>" + fDatas.address[lang] + "</p>\
                        </div>\
                        <p class='footer-p footer-p_copy'>"+fDatas.copy[lang]+"</p>\
				</div>",
        m = footer,
        fs = blockid;
    if (typeof jQuery === 'function') { jQuery(function() { jQuery(fs).html(m).on('copy', function(e) { e.preventDefault(); return !1 }) }) } else {
        var da = document.addEventListener,
            c = function() {
                if (da || window.event.type === 'load' || document.readyState === 'complete') {
                    d();
                    r()
                }
            };
        var n = function(e) {
            var a = e || window.event;
            a.preventDefault();
            return !1
        };
        var r = function() {
            var e = document.querySelector(fs);
            if (e) {
                e.innerHTML = m;
                if (da) e.addEventListener('copy', n);
                else e.attachEvent("oncopy", n)
            }
        };
        var d = function() {
            if (da) {
                document.removeEventListener('DOMContentLoaded', c);
                window.removeEventListener('load', c)
            } else {
                document.detachEvent('onreadystatechange', c);
                window.detachEvent('onload', c)
            }
        };
        if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) { window.setTimeout(r) } else if (da) {
            da("DOMContentLoaded", c);
            window.addEventListener("load", c)
        } else {
            document.attachEvent("onreadystatechange", c);
            window.attachEvent("onload", c)
        }
    }
})();
