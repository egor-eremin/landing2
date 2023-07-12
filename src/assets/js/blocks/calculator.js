import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import { definesLanguage } from './global'; // хук для определения языка
import __TABLE_JSON from './json/table.json'; // таблица коитровок приходящих из вдапи
import __TRANSLATE_CALC from './json/calc_translate.json'; // перевод
import __RATES from './json/rates.json'; // рейты по умолчанию
import __INSTRUMENTS from './json/instruments.json'; // все инструменты для калькулятора

/**
 * Генерация калькулятора
 */
;
(function(window) {

    var getCalculate = {
        defaultBlock: "tradeCalculator",
        defaultLang: __CONFIG_GLOBAL.defaultLanguage,
        defaultBlockResult: "resultTrade",
        defaultCurency: "standart",
        defaultGroupInstrument: "Forex",
        defaultValueVolume: "0.01",
        defaultValuePrices: "0.000",
        defaultCurrencyValue: "USD",
        defaultInterval: null,
        defaultClickInterval: null,
        defaultTitles: __TRANSLATE_CALC,
        currency: {
            standart: ['USD', 'EUR'],
            gold: ['XAU'],
            bitcoin: ['BTC']
        },
        lots: {
            'Forex': 100000,
            'Cryptocurrencies': 100000,
            'Metals': 100,
            'Stocks': 1,
            'Indices': 1,
            'ETFs': 1,
            'Commodities': 1
        },
        leverage: ['1:1', '1:10', '1:20', '1:50', '1:100', '1:200', '1:500'],
        groupInstrument: ['Forex', 'Metals', 'Stocks', 'Commodities', 'Indices', 'ETFs', 'Cryptocurrencies'],
        lot_size: 100000,
        rates: __RATES,
        allInstruments: __INSTRUMENTS,
        numberChange: function(element) {
            var dolya = Number(element.getAttribute('dolya')),
                valueInput = element.value.replace(/[^0-9\.]/g, '');
            valueInput = Number(valueInput).toFixed(dolya);
            valueInput = valueInput.replace(/,/, '.');
            clearTimeout(this.defaultInterval);
            this.defaultInterval = setTimeout(function() { element.value = valueInput; }, 10000);
        },
        selectTypeAccount: function(value) {
            var selectElement = document.getElementById('_account_currency');
            var buildElements = this.takeObjClass('_account_currency_build');
            selectElement.setAttribute("value-data", this.currency[value.toLowerCase()][0]);
            selectElement.value = this.currency[value.toLowerCase()][0];
            buildElements[0].innerHTML = this.buildOptions(this.currency[value.toLowerCase()], '_account_currency', 3);
        },
        selectGroupInstrument: function(value) {
            var selectElement = document.getElementById('_instrument');
            var buildElements = this.takeObjClass('_instrument_build');
            selectElement.setAttribute("value-data", this.allInstruments[value][0].id);
            selectElement.value = this.allInstruments[value][0].id;
            buildElements[0].innerHTML = this.buildOptionsInstrument(value, '_instrument', 3);
        },
        editInput: function(element) {
            this.defaultClickInterval = setInterval(this.stepsEdit, 50, element);
        },
        stopeditInput: function() {
            clearInterval(this.defaultClickInterval);
        },
        stepsEdit: function(element) {
            var inputField = element.parentNode.getElementsByTagName('input')[0],
                newValue = 0,
                dolya = Number(inputField.getAttribute('dolya'));
            if (element.innerText == '+') {
                newValue = Number(inputField.value) + Number(inputField.step);
            } else {
                newValue = Number(inputField.value) - Number(inputField.step);
            }
            newValue = (newValue < Number(inputField.min)) ? Number(inputField.min) : newValue;
            newValue = (newValue > Number(inputField.max)) ? Number(inputField.max) : newValue;
            inputField.value = newValue.toFixed(dolya).replace(/[^0-9\.]/g, '').replace(/,/, '.');
        },
        cleanAll: function(langBuild) {
            if (this.takeObjClass('clc-tradeCalculator').length > 0) {
                return this.getBuild(langBuild);
            } else {
                return this.getError('Блок калькулятора не найден!');
            }
        },
        cleanResult: function() {
            var currencyBlocks = this.takeObjClass('__tr_val_switch');
            for (var i = 0; i < currencyBlocks.length; i++) {
                currencyBlocks[i].innerHTML = this.defaultCurrencyValue;
            }
            this.cleanResultData();
            this.getData();
            return false;
        },
        cleanResultData: function() {
            var resultBox = this.takeObjClass('#clc-tableResults clc-tableResults');
            if (resultBox.length > 0) resultBox[0].remove();
        },
        takeObjClass: function(classFind) {
            var allElem, arrE = [],
                i;
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(classFind);
            } else if (document.querySelectorAll) {
                return document.querySelectorAll("." + FindClass);
            }
            allElem = document.body.getElementsByTagName('*');
            i = allElem.length;
            while (i--) {
                if (allElem[i].className == FindClass) arrE.push(allElem[i]);
            };
            return arrE;
        },
        destructPreloader: function() {
            var preloader = this.takeObjClass('clc-preloader');
            setTimeout(function() {
                preloader[0].classList.remove('clc-showPreloader');
            }, 1000);
        },
        buildOptions: function(data, className, funct) {
            var optionsHtml = '';
            for (var i = 0; i < data.length; i++) {
                optionsHtml += '<li onclick="getCalculate.selectit(this,' + funct + ')" for="' + className + '" class="' + className + '" value="' + data[i] + '">' + data[i] + '</li>';
            }
            return optionsHtml;
        },
        buildOptionsInstrument: function(data, className, funct) {
            var optionsHtml = '';
            for (var i = 0; i < this.allInstruments[data].length; i++) {
                optionsHtml += '<li onclick="getCalculate.selectit(this,' + funct + ')" for="' + className + '" class="' + className + '" value="' + this.allInstruments[data][i].id + '">' + this.allInstruments[data][i].id + '</li>';
            }
            return optionsHtml;
        },
        getcurrentInstrumentElement: function(group, instrument, element) {
            var ObjInstrument = this.allInstruments[group];
            for (var i = 0; i < ObjInstrument.length; i++) {
                if (ObjInstrument[i].id == instrument) {
                    return ObjInstrument[i][element];
                }
            }
        },
        getThisRate: function(currentInstrument, accountCurrency, instrument) {
            var ObjInstrument = this.allInstruments[currentInstrument],
                rateInstrument,
                thisrate = { rate: 0.0004 },
                thisquotationCurrency = this.getcurrentInstrumentElement(currentInstrument, instrument, 'quotationCurrency');
            if (thisquotationCurrency !== accountCurrency) {
                rateInstrument = thisquotationCurrency + "/" + accountCurrency;
                for (var i = 0; i < this.rates.length; i++) {
                    if (this.rates[i].id == rateInstrument) {
                        thisrate = this.rates[i];
                    }
                }
            } else {
                thisrate = { rate: 0.0004 };
            }
            return thisrate;
        },
        setCalculator: function(data) {
            data.swapBuy = +this.getcurrentInstrumentElement(data.group, data.instrument, 'swapBuy');
            data.swapSell = +this.getcurrentInstrumentElement(data.group, data.instrument, 'swapSell');

            var point = 0.0001,
                LOTSIZE = Number(this.lots[data.group]),
                leverage = data.leverage.split(':')[1],
                rate = this.getThisRate(data.group, data.currency, data.instrument),
                swapBuy = (LOTSIZE * data.volume * point) * rate.rate * data.swapBuy / 10,
                swapSell = (LOTSIZE * data.volume * point) * rate.rate * data.swapSell / 10,
                firstInstrument = data.instrument.split('/')[0],
                secondInstrument = data.instrument.split('/')[1],
                front = ( firstInstrument == data.currency ) ? true : ( secondInstrument == data.currency ? false : null );

            if ( front == null ) {
                // крос курс
                data.margin = data.volume * LOTSIZE / leverage * data.price_open / rate.rate;
                if (data.typeorder === "Buy") {
                    data.currentSwap = data.swapBuy;
                    data.currentSwapAccountCurrency = swapBuy;
                    data.profit = data.price_close !== 0 ? (( data.price_close - data.price_open ) / data.price_close) * ( data.volume * LOTSIZE ) : 0;
                } else {
                    data.currentSwap = data.swapSell;
                    data.currentSwapAccountCurrency = swapSell;
                    data.profit = data.price_close !== 0 ? (( data.price_open - data.price_close ) / data.price_close) * ( data.volume * LOTSIZE ) : 0;
                }
            } else if ( front ) {
                // для расчет маржи - это прямая котировка
                // для расчета профит лос - это обратная котировка
                data.margin = data.volume * LOTSIZE / leverage;
                if (data.typeorder === "Buy") {
                    data.currentSwap = data.swapBuy;
                    data.currentSwapAccountCurrency = swapBuy;
                    data.profit = data.price_close !== 0 ? (( data.price_close - data.price_open ) / data.price_close) * ( data.volume * LOTSIZE ) : 0;
                } else {
                    data.currentSwap = data.swapSell;
                    data.currentSwapAccountCurrency = swapSell;
                    data.profit = data.price_close !== 0 ? (( data.price_open - data.price_close ) / data.price_close) * ( data.volume * LOTSIZE ) : 0;
                }
            } else {
                // для расчет маржи - это обратная котировка
                // для расчета профит лос - это прямая котировка
                data.margin = data.volume * LOTSIZE / leverage * data.price_open;
                if (data.typeorder === "Buy") {
                    data.currentSwap = data.swapBuy;
                    data.currentSwapAccountCurrency = swapBuy;
                    data.profit = ( data.price_close - data.price_open ) * ( data.volume * LOTSIZE );
                } else {
                    data.currentSwap = data.swapSell;
                    data.currentSwapAccountCurrency = swapSell;
                    data.profit = ( data.price_open - data.price_close ) * ( data.volume * LOTSIZE );
                }
            }
            return data;
        },
        closestEl: function(el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        },
        selectit: function(el, funct) {
            var elementThis = document.getElementById(el.getAttribute('for'));
            elementThis.value = el.innerText;
            elementThis.setAttribute("value-data", el.getAttribute('value'));
            switch (funct) {
                case 1:
                    this.selectTypeAccount(el.getAttribute('value'));
                    break;
                case 2:
                    this.selectGroupInstrument(el.getAttribute('value'));
                    break;
                default:
                    break;
            }
        },
        resetSelect: function(el) {
            var varsSUB = this.takeObjClass(el.getAttribute("id"));
            for (var i = 0; i < varsSUB.length; i++) {
                varsSUB[i].classList.remove('__tr_hide');
            }
            // el.nextElementSibling.classList.add('active')
        },
        findValue: function(el) {
            var varsSUB = this.takeObjClass(el.getAttribute("id")),
                textSUB = [],
                newSUB = [];
            for (var i = 0; i < varsSUB.length; i++) {
                varsSUB[i].classList.remove('__tr_hide');
                textSUB.push(varsSUB[i].innerText.toLowerCase());
            }
            if (!this.getFindDiff(textSUB, el.value)) {
                newSUB = this.getFindDiffDef(textSUB, el.value.toLowerCase());
                if (newSUB.length != 0) {
                    for (var i = 0; i < varsSUB.length; i++) {
                        if (!this.getFindDiff(newSUB, varsSUB[i].innerText)) {
                            varsSUB[i].classList.add('__tr_hide');
                        }
                    }
                }
            } else {
                for (var i = 0; i < varsSUB.length; i++) {
                    if (varsSUB[i].innerText.toLowerCase() == el.value.toLowerCase()) {
                        varsSUB[i].click();
                    }
                }
            }
        },
        getFindDiff: function(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].toLowerCase() == val.toLowerCase()) return true;
            }
            return false;
        },
        getFindDiffDef: function(arr, val) {
            var textval = val.split(''),
                returnArrya = [];
            for (var i = 0; i < arr.length; i++) {
                var textmass = arr[i].split(''),
                    newtext = '';
                for (var j = 0; j < textval.length; j++) {
                    if (textmass[j] !== 'undefined') {
                        newtext += textmass[j];
                    }
                }
                if (newtext == val) {
                    returnArrya.push(arr[i]);
                }
            }
            return returnArrya;
        },
        getBuild: function(lang, idBlock) {
            var buttonPlusPC = '<button class="clc-controlBox__button clc-controlBox__button--max" onmousedown="getCalculate.editInput(this);" onmouseup="getCalculate.stopeditInput(this);" onmousemove="getCalculate.stopeditInput(this);">+</button>';
            var buttonMinusPC = '<button class="clc-controlBox__button clc-controlBox__button--min" onmousedown="getCalculate.editInput(this);" onmouseup="getCalculate.stopeditInput(this);" onmousemove="getCalculate.stopeditInput(this);">-</button>';
            var buttonPlusGad = '<button class="clc-controlBox__button clc-controlBox__button--max" onclick="getCalculate.stepsEdit(this);">+</button>';
            var buttonMinusGad = '<button class="clc-controlBox__button clc-controlBox__button--min" onclick="getCalculate.stepsEdit(this);">-</button>';
            var buttonMinus = '';
            var buttonPlus = '';
            var langBuild = (lang) ? lang : this.defaultLang;
            var blockBuild = (idBlock) ? idBlock : this.defaultBlock;
            var mainBlock = document.getElementById(blockBuild);
            if (mainBlock) {
                this.getDestroy(blockBuild);
                if (this.defaultTitles[lang]) {
                    // создаем базовый класс для конструктора
                    mainBlock.classList.add('clc-tradeCalculator');
                    // создаем блок прелоадера и добавляем его в конец блока
                    var preloader = document.createElement('div');
                    preloader.className = 'clc-preloader clc-showPreloader';
                    preloader.innerHTML = '<span></span>';
                    mainBlock.append(preloader);
                    // определяем устройство
                    if (window.innerWidth < 800) {
                        buttonMinus = buttonMinusGad;
                        buttonPlus = buttonPlusGad;
                    } else {
                        buttonMinus = buttonMinusPC;
                        buttonPlus = buttonPlusPC;
                    }
                    // создаем основной блок калькулятора
                    var mainContent = document.createElement('div');
                    var innerHTMLcontent = '<div class="clc-calculator">';
                    innerHTMLcontent += '<section class="clc-accountSettings clc-calculator__section">';
                    innerHTMLcontent += '<h3 class="clc-calculator__heading h3-title">' + this.defaultTitles[langBuild].accParametrs + ': </h3>';
                    innerHTMLcontent += '<div class="clc-calculator__row">';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].group_instrument + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_group_instrument" value="' + this.groupInstrument[0] + '" value-data="' + this.groupInstrument[0] + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field">' + this.buildOptions(this.groupInstrument, '_group_instrument', 2) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].type_account + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_type_account" value="' + this.defaultTitles[langBuild].standart + '" value-data="' + this.defaultTitles.en.standart + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field">';
                    innerHTMLcontent += '<li onclick="getCalculate.selectit(this,1)" for="_type_account" class="_type_account" value="' + this.defaultTitles.en.standart + '">' + this.defaultTitles[langBuild].standart + '</li>';
                    innerHTMLcontent += '<li onclick="getCalculate.selectit(this,1)" for="_type_account" class="_type_account" value="' + this.defaultTitles.en.gold + '">' + this.defaultTitles[langBuild].gold + '</li>';
                    innerHTMLcontent += '<li onclick="getCalculate.selectit(this,1)" for="_type_account" class="_type_account" value="' + this.defaultTitles.en.bitcoin + '">' + this.defaultTitles[langBuild].bitcoin + '</li>';
                    innerHTMLcontent += '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].account_currency + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_account_currency" value="' + this.currency[this.defaultCurency][0] + '" value-data="' + this.currency[this.defaultCurency][0] + '">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field _account_currency_build">' + this.buildOptions(this.currency[this.defaultCurency], '_account_currency', 3) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].leverage + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_leverage" value="' + this.leverage[0] + '" value-data="' + this.leverage[0] + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field">' + this.buildOptions(this.leverage, '_leverage', 3) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</section>';

                    innerHTMLcontent += '<section class="clc-positionParameters clc-calculator__section">';
                    innerHTMLcontent += '<h3 class="clc-calculator__heading h3-title">' + this.defaultTitles[langBuild].posParametrs + ': </h3>';
                    innerHTMLcontent += '<div class="clc-calculator__row">';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--select">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].instrument + ': </p>';
                    innerHTMLcontent += '<div class="clc-selectBox">';
                    innerHTMLcontent += '<input type="text" class="clc-selectBox__input clc-field" id="_instrument" value="' + this.allInstruments[this.defaultGroupInstrument][0].id + '" value-data="' + this.allInstruments[this.defaultGroupInstrument][0].id + '" onkeyup="getCalculate.findValue(this)" onclick="getCalculate.resetSelect(this)">';
                    innerHTMLcontent += '<div class="clc-arrowSelect"></div>';
                    innerHTMLcontent += '<ul class="clc-selectBox__submenu clc-field _instrument_build">' + this.buildOptionsInstrument(this.defaultGroupInstrument, '_instrument', 3) + '</ul>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--control clc-calculator__block--control-volume">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].order_transaction_volume + ': </p>';
                    innerHTMLcontent += '<div class="clc-controlBox clc-field">';
                    innerHTMLcontent += buttonMinus;
                    innerHTMLcontent += '<input class="clc-controlBox__input" type="number" name="_tr_order_transaction_volume" id="_tr_order_transaction_volume" onkeyup="getCalculate.numberChange(this)" step="0.01" max="1000000" min="0" dolya="2" value="' + this.defaultValueVolume + '">';
                    innerHTMLcontent += buttonPlus;
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--radio">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].type_order + ': </p>';
                    innerHTMLcontent += '<div class="clc-radioBox">';
                    innerHTMLcontent += '<input class="clc-radioBox__input clc-field" type="radio" name="_tr_type_order" id="__tr_sell" value="Sell">';
                    innerHTMLcontent += '<label class="clc-radioBox__label" for="__tr_sell">Sell</label>';
                    innerHTMLcontent += '<input class="clc-radioBox__input clc-field" type="radio" name="_tr_type_order" id="__tr_buy" value="Buy" checked="">';
                    innerHTMLcontent += '<label class="clc-radioBox__label" for="__tr_buy">Buy</label>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--control clc-calculator__block--control-opening">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].price_open + ': </p>';
                    innerHTMLcontent += '<div class="clc-controlBox clc-field">';
                    innerHTMLcontent += buttonMinus;
                    innerHTMLcontent += '<input class="clc-controlBox__input" type="number" name="_tr_price_open" id="_tr_price_open" onkeyup="getCalculate.numberChange(this)" step="0.00001" max="1000000" min="0.00000" dolya="5" value="' + this.defaultValuePrices + '">';
                    innerHTMLcontent += buttonPlus;
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '<div class="clc-calculator__block clc-calculator__block--control clc-calculator__block--control-closing">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].price_close + ': </p>';
                    innerHTMLcontent += '<div class="clc-controlBox clc-field">';
                    innerHTMLcontent += buttonMinus;
                    innerHTMLcontent += '<input class="clc-controlBox__input" type="number" name="_tr_price_close" id="_tr_price_close" onkeyup="getCalculate.numberChange(this)" step="0.00001" max="1000000" min="0.00000" dolya="5" value="' + this.defaultValuePrices + '">';
                    innerHTMLcontent += buttonPlus;
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</section>';

                    innerHTMLcontent += '<div class="clc-buttonsCta">';
                    innerHTMLcontent += '<button class="clc-buttonsCta__btn btn btn-main js--btn-calculate" onclick="getCalculate.getData();">' + this.defaultTitles[langBuild].submitBtn + '</button>';
                    innerHTMLcontent += '<button class="clc-buttonsCta__btn btn btn_black btn-second js--btn-clean" onclick="getCalculate.cleanAll(\'' + langBuild + '\');">' + this.defaultTitles[langBuild].resetBtn + '</button>';
                    innerHTMLcontent += '</div>';

                    innerHTMLcontent += '<section class="clc-results">';
                    innerHTMLcontent += '<p class="clc-caption">' + this.defaultTitles[langBuild].resultText + '</p>';
                    innerHTMLcontent += '<div id="resultTrade" class="clc-table clc-field">';

                    innerHTMLcontent += '<div class="clc-tableTitles">';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].instrument + '</div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].price_open + '</div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].order_transaction_volume + '</div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].spread + ', ' + this.defaultTitles[langBuild].in + this.defaultTitles[langBuild].inpoints + '</div>';
                    // innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].swop + ', ' + this.defaultTitles[langBuild].in + '<span class="__tr_val_switch"> USD</span></div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].margin + ' ' + this.defaultTitles[langBuild].in + '<span class="__tr_val_switch"> USD</span></div>';
                    innerHTMLcontent += '<div class="clc-tableTitles__item clc-table__item">' + this.defaultTitles[langBuild].profit + this.defaultTitles[langBuild].in + '<span class="__tr_val_switch"> USD</span></div>';
                    innerHTMLcontent += '</div>';

                    innerHTMLcontent += '<div id="clc-tableResults" class="#clc-tableResults clc-tableResults">';
                    innerHTMLcontent += '<div class="clc-tableResults__item clc-table__item">AUD/CAD Buy</div>';
                    innerHTMLcontent += '<div class="clc-tableResults__item clc-table__item">0.0000</div>';
                    innerHTMLcontent += '<div class="clc-tableResults__item clc-table__item">0.00</div>';
                    innerHTMLcontent += '<div class="clc-tableResults__item clc-table__item">0.0000</div>';
                    innerHTMLcontent += '<div class="clc-tableResults__item clc-table__item">0.00</div>';
                    innerHTMLcontent += '<div class="clc-tableResults__item clc-table__item">0.00</div>';
                    innerHTMLcontent += '<div class="clc-tableResults__item clc-table__item">0.00</div>';
                    innerHTMLcontent += '</div>';

                    innerHTMLcontent += '</div>';
                    innerHTMLcontent += '</section>';



                    innerHTMLcontent += '</div>';

                    mainContent.className = 'clc-tradeCalculator__inner';
                    mainContent.innerHTML = innerHTMLcontent;
                    mainContent.oncontextmenu = function () {
                        // отключение контекстного меню на калькуляторе
                        return false
                    }
                    mainBlock.prepend(mainContent);
                    this.getRates();
                    this.getData();
                    return this.destructPreloader();
                } else {
                    return this.getError('Такого языка в конструкторе нет!');
                }
            }
        },
        httpGet: function() {
            var xmlHttp = new XMLHttpRequest();
            var xmlHttpSecond = new XMLHttpRequest();
            xmlHttp.open( "GET", 'https://trade.' + __CONFIG_GLOBAL.companyData.domain + ':8887/history/quotesnapshot', false );
            xmlHttp.onerror = function () {
                xmlHttpSecond.open( "GET", __CONFIG_GLOBAL.javascript.table.reservserver, false );
                xmlHttpSecond.onerror = function () {
                    status = true;
                }
                xmlHttpSecond.send( null );
            };
            xmlHttp.send( null );
            return xmlHttp.responseText ? xmlHttp.responseText : xmlHttpSecond.responseText;
        },
        getRates: function() {
            var rates = JSON.parse( this.httpGet() );
            var forex = __TABLE_JSON.forex.map(item => {
                let convetfactname = item.facktname.split('/').reverse().join('/'),
                    realconvetfactname = item.realname.split('/').reverse().join('/');
                if ( rates[ item.facktname ] !== undefined ) {
                    return {
                        instrument: item.realname,
                        ask: rates[ item.facktname ][0].Ask,
                        bid: rates[ item.facktname ][1].Bid
                    }
                } else if ( rates[ convetfactname ] !== undefined ) {
                    return {
                        instrument: realconvetfactname,
                        ask: rates[ convetfactname ][0].Ask,
                        bid: rates[ convetfactname ][1].Bid
                    }
                }
            });
            var crypt = __TABLE_JSON.crypto.map(item => {
                let convetfactname = item.facktname.split('/').reverse().join('/'),
                    realconvetfactname = item.realname.split('/').reverse().join('/');
                if ( rates[ item.facktname ] !== undefined ) {
                    return {
                        instrument: item.realname,
                        ask: rates[ item.facktname ][0].Ask,
                        bid: rates[ item.facktname ][1].Bid
                    }
                } else if ( rates[ convetfactname ] !== undefined ) {
                    return {
                        instrument: realconvetfactname,
                        ask: rates[ convetfactname ][0].Ask,
                        bid: rates[ convetfactname ][1].Bid
                    }
                }
            });

            var allrates = [ ...forex, ...crypt ].filter(item => { return item !== undefined });

            allrates = allrates.map(item => {
                this.rates.forEach(rate => {
                    if ( rate.id === item.instrument ) {
                        let rateThis = Number( ( ( item.ask + item.bid ) / 2 ).toFixed(11) );
                        item = { ...item, rate: rateThis, ask: item.ask, bid: item.bid, status: true }
                    } else {
                        let inst = rate.id.split('/').reverse().join('/');
                        if ( inst === item.instrument ) {
                            let rateThis = Number( ( 1 / ( ( item.ask + item.bid ) / 2 ) ).toFixed(11) ),
                                ask = 1 / item.ask,
                                bid = 1 / item.bid;
                            item = { ...item, rate: rateThis, ask: ask, bid: bid, status: false };
                            item.instrument = rate.id;
                        }
                    }
                })
                return item;
            }).filter(item => {
                return item.status !== undefined;
            });

            this.rates = this.rates.map(item => {
                allrates.forEach(el => {
                    if ( item.id === el.instrument ) {
                        let arr = item.id.split('/');
                        item = { ...item, rate:el.rate, ask:el.ask, bid:el.bid, status: true, firts:arr[0], second:arr[1] };
                    }
                })
                return item;
            });

            let nonetrue = this.rates.filter(item => { return item.status === undefined });

            nonetrue = nonetrue.map(item => {
                let newid = item.id.split('/').reverse().join('/');
                this.rates.forEach(el => {
                    if ( el.id === newid ) {
                        let newrate = Number( ( 1 / el.rate ).toFixed(11) ),
                            arr = item.id.split('/');
                        if ( el.ask !== undefined && el.bid  !== undefined ) {
                            let newask = Number( ( 1 / el.ask ).toFixed(11) ),
                                newbid = Number( ( 1 / el.bid ).toFixed(11) );
                            item = { ...item, rate:newrate, ask:newask, bid:newbid, status:true, firts:arr[0], second: arr[1] };
                        } else {
                            item = { ...item, rate:newrate, status:true, firts:arr[0], second: arr[1] };
                        }
                    }
                })
                return item;
            });

            this.rates = this.rates.map(item => {
                nonetrue.forEach(el => {
                    if ( item.id === el.id ) {
                        item = el;
                    }
                })
                return item;
            });

            nonetrue = this.rates.filter(item => { return item.status === undefined });

            nonetrue = nonetrue.map(item => {
                let first = item.id.split('/')[0],
                    second = item.id.split('/')[1],
                    arr = ['USD', 'EUR', 'RUB', 'XAU', 'BTC'],
                    firstneed = arr.indexOf(first) ? first : second,
                    secondneed = arr.indexOf(second) ? second : first,
                    newaskone,
                    newasktwo,
                    newbidone,
                    newbidtwo,
                    elementone,
                    elementtwo;

                this.rates.forEach(el => {
                    if ( el.status !== undefined ) {
                        if ( el.id == firstneed + '/USD' ) {
                            elementone = el.rate;
                            newaskone = el.ask;
                            newbidone = el.bid;
                        }
                        if ( el.id == secondneed + '/USD' ) {
                            elementtwo = el.rate;
                            newasktwo = el.ask;
                            newbidtwo = el.bid;
                        }
                    }
                })

                if ( elementone !== undefined && elementtwo !== undefined ) {
                    let newrate = Number( ( elementone / elementtwo ).toFixed(11) ),
                        newask = Number( ( newaskone / newasktwo ).toFixed(11) ),
                        newbid = Number( ( newbidone / newbidtwo ).toFixed(11) );
                    item = { ...item, rate:newrate, aks: newask, bid: newbid, status:true, firts:first, second:second }
                }

                return item;

            });

            this.rates = this.rates.map(item => {
                nonetrue.forEach(el => {
                    if ( item.id === el.id ) {
                        item = el;
                    }
                })
                return item;
            });

            // биткойны конвертируем
            nonetrue = this.rates.filter(item => { return ( item.status === undefined || item.id == 'USD/BTC' ) });

            let usdbtc,
                usdbtcask,
                usdbtcbid;

            nonetrue = nonetrue.map(item => {
                let name = item.id.split('/').reverse().join('/'),
                    rate = Number( ( 1 / item.rate ).toFixed(11) );

                if ( item.id == 'USD/BTC' ) {
                    usdbtc = rate;
                    usdbtcask = Number( ( 1 / item.ask ).toFixed(11) );
                    usdbtcbid = Number( ( 1 / item.bid ).toFixed(11) );
                    return { ...item, id:name, ask:usdbtcask, bid:usdbtcbid, rate:rate }
                }

                return { ...item, id:name, rate:rate }
            });

            nonetrue = nonetrue.filter(item => { return item.id !== 'BTC/USD' });

            nonetrue = nonetrue.map(item => {
                let first = item.id.split('/')[1],
                    second = item.id.split('/')[0],
                    newrate;
                this.rates.forEach(el => {
                    if ( el.id == first + '/USD' ) {
                        newrate = Number( ( usdbtc / el.rate ).toFixed(11) );
                    }
                })
                return { ...item, rate:newrate, ask:newrate, bid:newrate, status:true, first:first, second:second }
            }).map(item => {
                let newid = item.id.split('/').reverse().join('/');
                let newrate = Number( ( 1 / item.rate ).toFixed(50) );
                return { ...item, id:newid, rate:newrate, ask:newrate, bid:newrate };
            });

            this.rates = this.rates.map(item => {
                nonetrue.forEach(el => {
                    if ( item.id === el.id ) {
                        item = el;
                    }
                })
                return item;
            });

            return true;
            // вывести новые рейты
            //console.log( this.rates );
        },
        getDestroy: function() {
            if (this.takeObjClass('clc-tradeCalculator').length > 0) {
                var blockDest = this.takeObjClass('clc-tradeCalculator')[0];
                if (blockDest) {
                    blockDest.classList.remove('clc-tradeCalculator');
                    blockDest.innerHTML = '';
                }
            } else {
                return this.getError('Блок калькулятора не найден!');
            }
        },
        getDefault: function() {
            return this.cleanAll();
        },
        getNumberStamp: function(number) {
            var realNumber = number.toString(),
                arrayNumber = realNumber.split('.'),
                newText = arrayNumber[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return newText + '.' + arrayNumber[1];
        },
        getData: function() {
            var enterData = {},
                typeorder = document.getElementsByName('_tr_type_order');
            enterData.group = document.getElementById('_group_instrument').value;
            enterData.typeacc = document.getElementById('_type_account').value;
            enterData.currency = document.getElementById('_account_currency').value;
            enterData.leverage = document.getElementById('_leverage').value;
            enterData.instrument = document.getElementById('_instrument').value;
            enterData.volume = Number(document.getElementById('_tr_order_transaction_volume').value);
            enterData.price_open = Number(document.getElementById('_tr_price_open').value);
            enterData.price_close = Number(document.getElementById('_tr_price_close').value);
            for (var i = 0; i < typeorder.length; i++) {
                if (typeorder[i].checked) {
                    enterData.typeorder = typeorder[i].value;
                }
            }
            enterData = this.setCalculator(enterData);
            return this.getResult(enterData);
        },
        getError: function(mess) {
            var message = (mess) ? mess : 'Неизвестная ошибка!';
            console.log(message);
        },
        getResult: function(data) {
            this.cleanResultData();
            var boxResult = document.getElementById('resultTrade'),
                divResult = document.createElement('div'),
                htmlResult = '',
                currencyBlocks = this.takeObjClass('__tr_val_switch');
            for (var i = 0; i < currencyBlocks.length; i++) {
                currencyBlocks[i].innerHTML = data.currency;
            }
            divResult.className = '#clc-tableResults clc-tableResults';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + data.instrument + ' ' + data.typeorder + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.price_open.toFixed(4)) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.volume.toFixed(2)) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.currentSwapAccountCurrency.toFixed(4)) + '</div>';
            // htmlResult += '<div class="clc-tableResults__item clc-table__item">' + ((data.typeorder === "Buy") ? this.getNumberStamp(data.swapBuy.toFixed(4)) : this.getNumberStamp(data.swapSell.toFixed(4))) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.margin.toFixed(2)) + '</div>';
            htmlResult += '<div class="clc-tableResults__item clc-table__item">' + this.getNumberStamp(data.profit.toFixed(2)) + '</div>';
            divResult.innerHTML = htmlResult;
            boxResult.append(divResult);
            // скролл на таблицу
        }
    }

    window.getCalculate = getCalculate;

})(window);

(function addedCalculator() {
    if ($("div").is('#tradeCalculator')) {
        var langData;

        langData = definesLanguage() == 'zh' ? 'cn' : definesLanguage();
        getCalculate.getBuild(langData);
    }
})();

(function activeSelect() {
    document.addEventListener('click', event => {
        let selectItem = document.querySelectorAll('.clc-selectBox__input'),
            target = event.target;

        if (target.classList.contains('clc-selectBox__input')) {
            selectItem.forEach(e => {
                if (e !== target) {
                    e.classList.remove('active')
                }
            } );

            target.classList.toggle('active')
        } else {
            selectItem.forEach(e => e.classList.remove('active'));
        };
    });
})();

(function showEffectOnCalculate() {
    $('.clc-calculator').on('click', event => {
        if ($(event.target).hasClass('js--btn-calculate')) {
            $('.clc-calculator .clc-tableResults__item').removeClass('calculated');

            $('.clc-calculator .clc-tableResults__item').addClass('calculated');

        } else if ($(event.target).hasClass('js--btn-clear')) {
            $('.clc-calculator .clc-tableResults__item').removeClass('calculated');
        }
    });
})();

// if ($('div').is('.clc-arrowSelect')) {
//     $(".clc-arrowSelect").click(function() {
//         if ($(this).hasClass('active')){
//             $(this).removeClass('active')
//         }
//     });
// }
