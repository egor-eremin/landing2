import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import __FORMS_GLOBAL from './json/forms.json'; // статичные элементы для форм + переводы
import { definesLanguage } from './global'; // хук для определения языка
import { countryErrorPopup } from '../construct';
import CryptoJS from 'crypto-js'; // билеотека для SHA256 шифрования

(function openCallbackForm() {
    if ($('.callback-open-js').length) {
        $('.callback-open-js').magnificPopup({
            items: {
                src: '#callback',
                type: 'inline'
            },
            // mainClass: "callback-modal"
        });
    }
})();
(function addClassInput() {
    if ($('.callback-form, .main-form').length) {
        $(".form-input").each(function () {
            if ($(this).val().trim().length) {
                $(this).addClass("hide-placeholder");
            } else {
                $(this).removeClass("hide-placeholder");
            }
        });
        $(".form-input").change(function() {
            if ($(this).val().trim().length) {
                $(this).addClass("hide-placeholder");
            } else {
                $(this).removeClass("hide-placeholder");
            }
        });
    }
})();
(function addCustomSelectCountry() {
    if ($('.select-custom-wrapper').length) {
        var data = [
            { id: 'Afghanistan', text: 'Afghanistan'},
            { id: 'Aland Islands', text: 'Aland Islands'},
            { id: 'Albania', text: 'Albania'},
            { id: 'Algeria', text: 'Algeria'},
            { id: 'American Samoa', text: 'American Samoa'},
            { id: 'Andorra', text: 'Andorra'},
            { id: 'Angola', text: 'Angola'},
            { id: 'Anguilla', text: 'Anguilla'},
            { id: 'Antarctica', text: 'Antarctica'},
            { id: 'Antigua And Barbuda', text: 'Antigua And Barbuda'},
            { id: 'Argentina', text: 'Argentina'},
            { id: 'Armenia', text: 'Armenia'},
            { id: 'Aruba', text: 'Aruba'},
            { id: 'Australia', text: 'Australia'},
            { id: 'Austria', text: 'Austria'},
            { id: 'Azerbaijan', text: 'Azerbaijan'},
            { id: 'Bahamas', text: 'Bahamas'},
            { id: 'Bahrain', text: 'Bahrain'},
            { id: 'Bangladesh', text: 'Bangladesh'},
            { id: 'Barbados', text: 'Barbados'},
            { id: 'Belarus', text: 'Belarus'},
            { id: 'Belgium', text: 'Belgium'},
            { id: 'Belize', text: 'Belize'},
            { id: 'Benin', text: 'Benin'},
            { id: 'Bermuda', text: 'Bermuda'},
            { id: 'Bhutan', text: 'Bhutan'},
            { id: 'Bolivia', text: 'Bolivia'},
            { id: 'Bosnia And Herzegovina', text: 'Bosnia And Herzegovina'},
            { id: 'Botswana', text: 'Botswana'},
            { id: 'Bouvet Island', text: 'Bouvet Island'},
            { id: 'Brazil', text: 'Brazil'},
            { id: 'British Indian Ocean Territory', text: 'British Indian Ocean Territory'},
            { id: 'Brunei Darussalam', text: 'Brunei Darussalam'},
            { id: 'Bulgaria', text: 'Bulgaria'},
            { id: 'Burkina Faso', text: 'Burkina Faso'},
            { id: 'Burundi', text: 'Burundi'},
            { id: 'Cambodia', text: 'Cambodia'},
            { id: 'Cameroon', text: 'Cameroon'},
            { id: 'Canada', text: 'Canada'},
            { id: 'Cape Verde', text: 'Cape Verde'},
            { id: 'Cayman Islands', text: 'Cayman Islands'},
            { id: 'Central African Republic', text: 'Central African Republic'},
            { id: 'Chad', text: 'Chad'},
            { id: 'Chile', text: 'Chile'},
            { id: 'China', text: 'China'},
            { id: 'Christmas Island', text: 'Christmas Island'},
            { id: 'Cocos (Keeling) Islands', text: 'Cocos (Keeling) Islands'},
            { id: 'Colombia', text: 'Colombia'},
            { id: 'Comoros', text: 'Comoros'},
            { id: 'Congo', text: 'Congo'},
            { id: 'Congo, Democratic Republic', text: 'Congo, Democratic Republic'},
            { id: 'Cook Islands', text: 'Cook Islands'},
            { id: 'Costa Rica', text: 'Costa Rica'},
            { id: 'Cote D\'Ivoire', text: 'Cote D\'Ivoire'},
            { id: 'Croatia', text: 'Croatia'},
            { id: 'Cuba', text: 'Cuba'},
            { id: 'Cyprus', text: 'Cyprus'},
            { id: 'Czech Republic', text: 'Czech Republic'},
            { id: 'Denmark', text: 'Denmark'},
            { id: 'Djibouti', text: 'Djibouti'},
            { id: 'Dominica', text: 'Dominica'},
            { id: 'Dominican Republic', text: 'Dominican Republic'},
            { id: 'Ecuador', text: 'Ecuador'},
            { id: 'Egypt', text: 'Egypt'},
            { id: 'El Salvador', text: 'El Salvador'},
            { id: 'Equatorial Guinea', text: 'Equatorial Guinea'},
            { id: 'Eritrea', text: 'Eritrea'},
            { id: 'Estonia', text: 'Estonia'},
            { id: 'Ethiopia', text: 'Ethiopia'},
            { id: 'Falkland Islands (Malvinas)', text: 'Falkland Islands (Malvinas)'},
            { id: 'Faroe Islands', text: 'Faroe Islands'},
            { id: 'Fiji', text: 'Fiji'},
            { id: 'Finland', text: 'Finland'},
            { id: 'France', text: 'France'},
            { id: 'French Guiana', text: 'French Guiana'},
            { id: 'French Polynesia', text: 'French Polynesia'},
            { id: 'French Southern Territories', text: 'French Southern Territories'},
            { id: 'Gabon', text: 'Gabon'},
            { id: 'Gambia', text: 'Gambia'},
            { id: 'Georgia', text: 'Georgia'},
            { id: 'Germany', text: 'Germany'},
            { id: 'Ghana', text: 'Ghana'},
            { id: 'Gibraltar', text: 'Gibraltar'},
            { id: 'Greece', text: 'Greece'},
            { id: 'Greenland', text: 'Greenland'},
            { id: 'Grenada', text: 'Grenada'},
            { id: 'Guadeloupe', text: 'Guadeloupe'},
            { id: 'Guam', text: 'Guam'},
            { id: 'Guatemala', text: 'Guatemala'},
            { id: 'Guernsey', text: 'Guernsey'},
            { id: 'Guinea', text: 'Guinea'},
            { id: 'Guinea-Bissau', text: 'Guinea-Bissau'},
            { id: 'Guyana', text: 'Guyana'},
            { id: 'Haiti', text: 'Haiti'},
            { id: 'Heard Island & Mcdonald Islands', text: 'Heard Island & Mcdonald Islands'},
            { id: 'Holy See (Vatican City State)', text: 'Holy See (Vatican City State)'},
            { id: 'Honduras', text: 'Honduras'},
            { id: 'Hong Kong', text: 'Hong Kong'},
            { id: 'Hungary', text: 'Hungary'},
            { id: 'Iceland', text: 'Iceland'},
            { id: 'India', text: 'India'},
            { id: 'Indonesia', text: 'Indonesia'},
            { id: 'Iran', text: 'Iran'},
            { id: 'Iraq', text: 'Iraq'},
            { id: 'Ireland', text: 'Ireland'},
            { id: 'Isle Of Man', text: 'Isle Of Man'},
            { id: 'Israel', text: 'Israel'},
            { id: 'Italy', text: 'Italy'},
            { id: 'Jamaica', text: 'Jamaica'},
            { id: 'Japan', text: 'Japan'},
            { id: 'Jersey', text: 'Jersey'},
            { id: 'Jordan', text: 'Jordan'},
            { id: 'Kazakhstan', text: 'Kazakhstan'},
            { id: 'Kenya', text: 'Kenya'},
            { id: 'Kiribati', text: 'Kiribati'},
            { id: 'Korea', text: 'Korea'},
            { id: 'Kuwait', text: 'Kuwait'},
            { id: 'Kyrgyzstan', text: 'Kyrgyzstan'},
            { id: 'Lao People\'s Democratic Republic', text: 'Lao People\'s Democratic Republic'},
            { id: 'Latvia', text: 'Latvia'},
            { id: 'Lebanon', text: 'Lebanon'},
            { id: 'Lesotho', text: 'Lesotho'},
            { id: 'Liberia', text: 'Liberia'},
            { id: 'Libyan Arab Jamahiriya', text: 'Libyan Arab Jamahiriya'},
            { id: 'Liechtenstein', text: 'Liechtenstein'},
            { id: 'Lithuania', text: 'Lithuania'},
            { id: 'Luxembourg', text: 'Luxembourg'},
            { id: 'Macao', text: 'Macao'},
            { id: 'Macedonia', text: 'Macedonia'},
            { id: 'Madagascar', text: 'Madagascar'},
            { id: 'Malawi', text: 'Malawi'},
            { id: 'Malaysia', text: 'Malaysia'},
            { id: 'Maldives', text: 'Maldives'},
            { id: 'Mali', text: 'Mali'},
            { id: 'Malta', text: 'Malta'},
            { id: 'Marshall Islands', text: 'Marshall Islands'},
            { id: 'Martinique', text: 'Martinique'},
            { id: 'Mauritania', text: 'Mauritania'},
            { id: 'Mauritius', text: 'Mauritius'},
            { id: 'Mayotte', text: 'Mayotte'},
            { id: 'Mexico', text: 'Mexico'},
            { id: 'Micronesia, Federated States Of', text: 'Micronesia, Federated States Of'},
            { id: 'Moldova', text: 'Moldova'},
            { id: 'Monaco', text: 'Monaco'},
            { id: 'Mongolia', text: 'Mongolia'},
            { id: 'Montenegro', text: 'Montenegro'},
            { id: 'Montserrat', text: 'Montserrat'},
            { id: 'Morocco', text: 'Morocco'},
            { id: 'Mozambique', text: 'Mozambique'},
            { id: 'Myanmar', text: 'Myanmar'},
            { id: 'Namibia', text: 'Namibia'},
            { id: 'Nauru', text: 'Nauru'},
            { id: 'Nepal', text: 'Nepal'},
            { id: 'Netherlands', text: 'Netherlands'},
            { id: 'Netherlands Antilles', text: 'Netherlands Antilles'},
            { id: 'New Caledonia', text: 'New Caledonia'},
            { id: 'New Zealand', text: 'New Zealand'},
            { id: 'Nicaragua', text: 'Nicaragua'},
            { id: 'Niger', text: 'Niger'},
            { id: 'Nigeria', text: 'Nigeria'},
            { id: 'Niue', text: 'Niue'},
            { id: 'Norfolk Island', text: 'Norfolk Island'},
            { id: 'Northern Mariana Islands', text: 'Northern Mariana Islands'},
            { id: 'Norway', text: 'Norway'},
            { id: 'Oman', text: 'Oman'},
            { id: 'Pakistan', text: 'Pakistan'},
            { id: 'Palau', text: 'Palau'},
            { id: 'Palestinian Territory', text: 'Palestinian Territory'},
            { id: 'Panama', text: 'Panama'},
            { id: 'Papua New Guinea', text: 'Papua New Guinea'},
            { id: 'Paraguay', text: 'Paraguay'},
            { id: 'Peru', text: 'Peru'},
            { id: 'Philippines', text: 'Philippines'},
            { id: 'Pitcairn', text: 'Pitcairn'},
            { id: 'Poland', text: 'Poland'},
            { id: 'Portugal', text: 'Portugal'},
            { id: 'Puerto Rico', text: 'Puerto Rico'},
            { id: 'Qatar', text: 'Qatar'},
            { id: 'Reunion', text: 'Reunion'},
            { id: 'Romania', text: 'Romania'},
            { id: 'Russian Federation', text: 'Russian Federation'},
            { id: 'Rwanda', text: 'Rwanda'},
            { id: 'aint Barthelemy', text: 'Saint Barthelemy'},
            { id: 'Saint Helena', text: 'Saint Helena'},
            { id: 'Saint Kitts And Nevis', text: 'Saint Kitts And Nevis'},
            { id: 'Saint Lucia', text: 'Saint Lucia'},
            { id: 'Saint Martin', text: 'Saint Martin'},
            { id: 'Saint Pierre And Miquelon', text: 'Saint Pierre And Miquelon'},
            { id: 'Saint Vincent And Grenadines', text: 'Saint Vincent And Grenadines'},
            { id: 'Samoa', text: 'Samoa'},
            { id: 'San Marino', text: 'San Marino'},
            { id: 'Sao Tome And Principe', text: 'Sao Tome And Principe'},
            { id: 'Saudi Arabia', text: 'Saudi Arabia'},
            { id: 'Senegal', text: 'Senegal'},
            { id: 'Serbia', text: 'Serbia'},
            { id: 'Seychelles', text: 'Seychelles'},
            { id: 'Sierra Leone', text: 'Sierra Leone'},
            { id: 'Singapore', text: 'Singapore'},
            { id: 'Slovakia', text: 'Slovakia'},
            { id: 'Slovenia', text: 'Slovenia'},
            { id: 'Solomon Islands', text: 'Solomon Islands'},
            { id: 'Somalia', text: 'Somalia'},
            { id: 'South Africa', text: 'South Africa'},
            { id: 'South Georgia And Sandwich Isl.', text: 'South Georgia And Sandwich Isl.'},
            { id: 'Spain', text: 'Spain'},
            { id: 'Sri Lanka', text: 'Sri Lanka'},
            { id: 'Sudan', text: 'Sudan'},
            { id: 'Suriname', text: 'Suriname'},
            { id: 'Svalbard And Jan Mayen', text: 'Svalbard And Jan Mayen'},
            { id: 'Swaziland', text: 'Swaziland'},
            { id: 'Sweden', text: 'Sweden'},
            { id: 'Switzerland', text: 'Switzerland'},
            { id: 'Syrian Arab Republic', text: 'Syrian Arab Republic'},
            { id: 'Taiwan', text: 'Taiwan'},
            { id: 'Tajikistan', text: 'Tajikistan'},
            { id: 'Tanzania', text: 'Tanzania'},
            { id: 'Thailand', text: 'Thailand'},
            { id: 'Timor-Leste', text: 'Timor-Leste'},
            { id: 'Togo', text: 'Togo'},
            { id: 'Tokelau', text: 'Tokelau'},
            { id: 'Tonga', text: 'Tonga'},
            { id: 'Trinidad And Tobago', text: 'Trinidad And Tobago'},
            { id: 'Tunisia', text: 'Tunisia'},
            { id: 'Turkey', text: 'Turkey'},
            { id: 'Turkmenistan', text: 'Turkmenistan'},
            { id: 'Turks And Caicos Islands', text: 'Turks And Caicos Islands'},
            { id: 'Tuvalu', text: 'Tuvalu'},
            { id: 'Uganda', text: 'Uganda'},
            { id: 'Ukraine', text: 'Ukraine'},
            { id: 'United Arab Emirates', text: 'United Arab Emirates'},
            { id: 'United Kingdom', text: 'United Kingdom'},
            { id: 'United States', text: 'United States'},
            { id: 'United States Outlying Islands', text: 'United States Outlying Islands'},
            { id: 'Uruguay', text: 'Uruguay'},
            { id: 'Uzbekistan', text: 'Uzbekistan'},
            { id: 'Vanuatu', text: 'Vanuatu'},
            { id: 'Venezuela', text: 'Venezuela'},
            { id: 'Viet Nam', text: 'Viet Nam'},
            { id: 'Virgin Islands, British', text: 'Virgin Islands, British'},
            { id: 'Virgin Islands, U.S.', text: 'Virgin Islands, U.S.'},
            { id: 'Wallis And Futuna', text: 'Wallis And Futuna'},
            { id: 'Western Sahara', text: 'Western Sahara'},
            { id: 'Yemen', text: 'Yemen'},
            { id: 'Zambia', text: 'Zambia'},
            { id: 'Zimbabwe', text: 'Zimbabwe'}
        ];

        $('#select-country').select2({
            data: data,
            dropdownParent: '.select-wrapper-country',
            tags: true,
        }).on('change', function() {
            $(this).addClass('label-top');
            $(this).valid();
        });
    }
})();
(function addCustomSelectLang() {
    if ($('.select-custom-wrapper').length) {
        $('#select-lang').select2({
            dropdownParent: '.select-wrapper-lang',
        }).on('change', function() {
            $(this).addClass('label-top');
            $(this).valid();
        });
    }
})();
(function showSuccesText() {
    $(document).on('form_submitted', function(e) {
        $('form').find('input').val('').removeClass('valid');
        $('form').find('select').removeClass('valid');
        $('form').find('select').val('').removeClass("label-top");
        $('#select-lang').select2({
            dropdownParent: '.select-wrapper-lang',
        }).on('change', function() {
            $(this).valid();
        });
        $('#select-country').select2({
            dropdownParent: '.select-wrapper-country',
        }).on('change', function() {
            $(this).valid();
        });
        $('form').find('input').removeClass('hide-placeholder');
        $.magnificPopup.close();
        $.magnificPopup.open({
            items: {
                src: '.saccess-popup'
            },
            type: 'inline'
        }, 0);
    });
    $(document).on('click', '.js-btn-close', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
})();
(function showPassword() {
    if ($('.form-input-pass').length) {
        $('.show-icon').on("click", function () {

            let thisInput = $(this).parent('.input-wrapper-password').find('.form-input-pass');

            if (!thisInput.hasClass('show')) {
                thisInput.addClass('show');
                thisInput.attr("type", "text");
                thisInput.focus();
            } else {
                thisInput.removeClass('show');
                thisInput.attr("type", "password");
                thisInput.focus();
            }

        });
    }
})();


if ( $('.form-wrapper').length ) {
    // хосты для запросов
    var hosts = {
            web: {
                host: 'https://trade.' + __CONFIG_GLOBAL.companyData.domain + ':8884/web',
                type: 'dispatchregister'
            },
            createacc: {
                host: 'https://trade.' + __CONFIG_GLOBAL.companyData.domain + ':8892/api/',
            },
            auth2: {
                host: 'https://trade.' + __CONFIG_GLOBAL.companyData.domain + '/#/?key=',
                endhost: '#/auth',
            },
        },
        sendType = 'POST',
        contentType = 'application/json; charset=utf-8',
        // все возможные типы полей, которые принимает API (id - это уникальный идентификато id поля в форме!!!!)
        field = [
            { id: 'submit-name', name: 'FirstName', required: 'true', default: '' },
            { id: 'submit-lastname', name: 'LastName', required: 'true', default: '' },
            { id: 'submit-email', name: 'Email', required: 'true', default: '' },
            { id: 'submit-pass-show', name: 'Password', required: 'true', default: '' },
            { id: 'submit-phone', name: 'PhoneNumber', required: 'true', default: '' },
            { id: 'submit-promo', name: 'PromoCode', required: 'false', default: '' },
            { id: '', name: 'AffiliateCode', required: 'false', default: '' },
            { id: '', name: 'PartnerLink', required: 'false', default: '' },
            { id: '', name: 'Key', required: 'false', default: CryptoJS.SHA256(__CONFIG_GLOBAL.javascript.forms.sha).toString() },
            { id: '', name: 'Language', required: 'false', default: __CONFIG_GLOBAL.defaultLanguage },
            { id: 'submit-email', name: 'Login', required: 'false', default: '' },
            { id: '', name: 'ConfirmUrl', required: 'false', default: '' },
            { id: '', name: 'CreateAutoLoginUrl', required: 'false', default: true },
            { id: '', name: 'SubscribeMails', required: 'false', default: 1 },
            { id: 'submit-name', name: 'MiddleName', required: 'false', default: '' }
        ],
        fieldAuth = [
            { id: 'auth-code', name: 'Code', required: 'false', default: '' },
            { id: '', name: 'Key', required: 'false', default: CryptoJS.SHA256(__CONFIG_GLOBAL.javascript.forms.sha).toString() },
            { id: 'submit-email', name: 'Login', required: 'true', default: '' },
            { id: 'submit-pass-show', name: 'Password', required: 'true', default: '' },
            { id: '', name: 'PasswordHashed', required: 'false', default: true },
            { id: '', name: 'TwoFAToken', required: 'false', default: null }
        ],
        fieldResetPassword = [
            { id: '', name: 'Key', required: 'false', default: CryptoJS.SHA256(__CONFIG_GLOBAL.javascript.forms.sha).toString() },
            { id: 'submit-email', name: 'Login', required: 'true', default: '' }
        ],
        // используемые методы для регистрации, авторизации и восстановления пароля в глобальном файле конфигурации
        methods = __CONFIG_GLOBAL.javascript.forms.methods,
        mainHostMethods,
        submitData = {},
        authData = {},
        resetData = {},
        info = __FORMS_GLOBAL.info,
        currentLanguge = definesLanguage(),
        errorText = __FORMS_GLOBAL.errorText,
        openTwoauthstepPopupFlag = false;

    /**
     * Валидация формы авторизации. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#enter-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                newEmailRules: true
            },
            password: {
                required: true,
                // excludingRussian: true
            }
        },
        messages: {
            email: {
                email: errorText.emailText[currentLanguge],
                newEmailRules: errorText.emailText[currentLanguge]
            },
        }
    });

    /**
     * Валидация формы восстановление пароля. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#restore-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                newEmailRules: true
            },
        },
        messages: {
            email: {
                email: errorText.emailText[currentLanguge],
                newEmailRules: errorText.emailText[currentLanguge]
            },
        }
    });

    /**
     * Валидация формы регистрации. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#form-signup').validate({
        rules: {
            first_name: {
                required: true,
                excludingRussian: true,
                minlength: 2,
                maxlength: 30
            },
            last_name: {
                required: true,
                excludingRussian: true,
                minlength: 2,
                maxlength: 40
            },
            email: {
                required: true,
                email: true,
                newEmailRules: true
            },
            phone_number: {
                required: true,
                minlength: 7,
                maxlength: 50
            },
            password: {
                required: true,
                // excludingRussian: true,
                minlength: 8,
                newPasswordRules: true,
            },
            confirm_password: {
                required: true,
                // excludingRussian: true,
                newPasswordRules: true,
                equalTo: "#submit-pass-show"
            },
            user_agreement: "required",
            refund_cancellation: "required"
        },
        messages: {
            first_name: {
                minlength: errorText.minlength_2[currentLanguge],
                maxlength: errorText.maxlength_30[currentLanguge]
            },
            last_name: {
                minlength: errorText.minlength_2[currentLanguge],
                maxlength: errorText.maxlength_40[currentLanguge]
            },
            email: {
                email: errorText.emailText[currentLanguge],
                newEmailRules: errorText.emailText[currentLanguge]
            },
            phone_number: {
                minlength: errorText.minlength_7[currentLanguge],
                maxlength: errorText.maxlength_50[currentLanguge],
            },
            password: {
                minlength: errorText.minlength_8[currentLanguge],
                equalTo: errorText.equalToText[currentLanguge],
            },
            confirm_password: {
                minlength: errorText.minlength_8[currentLanguge],
                equalTo: errorText.equalToText[currentLanguge],
            }
        }
    });

    /**
     * Валидация формы двухэтапной авторизации. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#twoauthstep-form').validate({
        rules: {
            code: {
                required: true,
            }
        }
    });

    /**
     * Событие на кнопке регистрации
     */
    $('.js--submit-form').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#form-signup").valid()) {
            sumbitform(this);
        } else {
            $('form-item_input.error').focus();
        }
    });

    /**
     * Событие на кнопке двухэтапной авторизации
     */
    $('.js--send-authcode').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#twoauthstep-form").valid()) {
            loginform(this);
        } else {
            $('form-item_input.error').focus();
        }
    });

    /**
     * Событие на кнопке авторизации
     */
    $('.js--login-form').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#enter-form").valid()) {
            loginform(this);
        } else {
            $('form-item_input.error').focus();
        }

    });

    /**
     * Событие на кнопке восстановления пароля
     */
    $('.js--repass').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#restore-form").valid()) {
            repass(this);
        } else {
            $('form-item_input.error').focus();
        }

    });

    /**
     * Основная фукнция восстановления пароля
     */
    function repass(el) {
        // массив для полуения токена
        for (var i = 0; i < fieldResetPassword.length; i++) {
            if (fieldResetPassword[i].id != '') {
                if (fieldResetPassword[i].required == 'true' && $('#' + fieldResetPassword[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + fieldResetPassword[i].id).closest('.group-input').addClass('error');
                    break;
                } else {
                    resetData[fieldResetPassword[i].name] = $('#' + fieldResetPassword[i].id).val();
                }
            } else {
                resetData[fieldResetPassword[i].name] = fieldResetPassword[i].default;
            }
        }
        mainHostMethods = hosts.createacc.host;
        $.ajax({
            url: mainHostMethods + methods.reset,
            type: sendType,
            data: JSON.stringify(resetData),
            contentType: contentType,
            success: function(data) {
                if (data.Error != null) {
                    if (data.Error == '1101') {
                        infomessage('errorUserNotFound');
                    } else {
                        infomessage('errorGlobal');
                    }
                } else {
                    infomessage('successRepass', 'succesRepass');
                    // чистим поля после восстановления
                    fieldResetPassword.forEach( (fieldreset) => {
                        $('#' + fieldreset.id).val('');
                    })
                }
            },
            error: function() {
                if (__CONFIG_GLOBAL.javascript.ip_restrictions.ip_restrictions_flag === true) {
                    if( __CONFIG_GLOBAL.javascript.ip_restrictions.ip_countries.indexOf( localStorage.getItem('countryCode') ) !== -1 ) {
                        countryErrorPopup(__CONFIG_GLOBAL.javascript.ip_restrictions.ip_countries, localStorage.getItem('countryCode'));
                    } else {
                        infomessage('errorGlobal');
                    }
                } else {
                    infomessage('errorGlobal');
                }
            }
        });
    };

    /**
     * Основная фукнция авторизации
     */
    function loginform(el) {
        // массив для полуения токена
        for (var i = 0; i < fieldAuth.length; i++) {
            if (fieldAuth[i].id != '') {
                if (fieldAuth[i].required == 'true' && $('#' + fieldAuth[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + fieldAuth[i].id).closest('.group-input').addClass('error');
                    break;
                } else {
                    authData[fieldAuth[i].name] = $('#' + fieldAuth[i].id).val();
                }
            } else {
                authData[fieldAuth[i].name] = fieldAuth[i].default;
            }
        }
        // md5 пароль пользователя для авторизации
        authData.Password = CryptoJS.MD5(authData.Password).toString();

        mainHostMethods = hosts.createacc.host;
        $.ajax({
            url: mainHostMethods + methods.createtoken,
            type: sendType,
            data: JSON.stringify(authData),
            contentType: contentType,
            success: function(data) {
                try {
                    if (data.Error != null) {
                        // всплывающее окно о ошибке
                        // коды ошибок?
                        if (data.Error == '1801') {
                            // двух этапная авторизация
                            // показываем диалоговое окно с полем #auth-code

                            if (openTwoauthstepPopupFlag == true) {
                                showTwoauthstepMessage();
                            } else {
                                openTwoauthstepPopup();
                            }
                        } else if (data.Error == '1101' || data.Error == '1800') {
                            infomessage('errorPassword');
                        } else {
                            // ошибка
                            infomessage('errorGlobal');
                        }
                    } else {
                        // чистим поля после восстановления
                        fieldAuth.forEach( (fieldauths) =>{
                            if (fieldauths.id != '') {
                                $('#' + fieldauths.id).val('');
                            }
                        });
                        // запускам редирект на платформу
                        var two_fa_token = '';

                        if (data.Result.TwoFAToken) {
                            two_fa_token = '&two_fa_token=' + data.Result.TwoFAToken.toString();
                        }

                        window.location.href = hosts.auth2.host + data.Result.AccessToken.toString() + two_fa_token;
                    }
                } catch (e) {
                    // ошибка обработки ответа
                    infomessage('errorGlobal');
                }
            },
            error: function() {
                if (__CONFIG_GLOBAL.javascript.ip_restrictions.ip_restrictions_flag === true) {
                    if( __CONFIG_GLOBAL.javascript.ip_restrictions.ip_countries.indexOf( localStorage.getItem('countryCode') ) !== -1 ) {
                        countryErrorPopup(__CONFIG_GLOBAL.javascript.ip_restrictions.ip_countries, localStorage.getItem('countryCode'));
                    } else {
                        infomessage('errorGlobal');
                    }
                } else {
                    infomessage('errorGlobal');
                }
            }
        });
    };

    /**
     * Основная фукнция регистрации
     */
    function sumbitform(el) {
        for (var i = 0; i < field.length; i++) {
            if (field[i].id != '') {
                if (field[i].required == 'true' && $('#' + field[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + field[i].id).closest('.group-input').addClass('error');
                    infomessage('errorInput');
                    break;
                } else {
                    submitData[field[i].name] = $('#' + field[i].id).val();
                }
            } else {
                submitData[field[i].name] = field[i].default;
            }
        }
        // массив для полуения токена
        for (var i = 0; i < fieldAuth.length; i++) {
            if (fieldAuth[i].id != '') {
                if (fieldAuth[i].required == 'true' && $('#' + fieldAuth[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + fieldAuth[i].id).closest('.group-input').addClass('error');
                    break;
                } else {
                    authData[fieldAuth[i].name] = $('#' + fieldAuth[i].id).val();
                }
            } else {
                authData[fieldAuth[i].name] = fieldAuth[i].default;
            }
        }
        // md5 пароль пользователя для авторизации
        authData.Password = CryptoJS.MD5(authData.Password).toString();

        mainHostMethods = hosts.createacc.host;
        $.ajax({
            url: mainHostMethods + methods.createacc,
            type: sendType,
            data: JSON.stringify(submitData),
            contentType: contentType,
            success: function(data) {
                try {
                    if (data.Error != null) {
                        if (data.Error == "1102") {
                            infomessage('errorUserExist');
                        } else if (data.Error == "1105") {
                            infomessage('errorPhoneExist');
                        } else {
                            // всплывающее окно о ошибке
                            // коды ошибок?
                            infomessage('errorGlobal');
                        }
                    } else {
                        // успешная регистрация
                        if (data.Result.RegistrationTime == 0) {
                            // запуск авторизации
                            // authData.Result.UserId - id пользователя
                            // authData.Result.AutoLoginUrl - ссылка автологина
                            $.ajax({
                                url: mainHostMethods + methods.createtoken,
                                type: sendType,
                                contentType: contentType,
                                data: JSON.stringify(authData),
                                success: function(data) {
                                    try {
                                        if (data.Error != null) {
                                            // всплывающее окно о ошибке
                                            // коды ошибок?
                                            infomessage('errorGlobal');
                                        } else {
                                            // запускам редирект на платформу
                                            window.location.href = hosts.auth2.host + data.Result.AccessToken.toString() + hosts.auth2.endhost;
                                        }
                                    } catch (e) {
                                        // ошибка обработки ответа
                                        console.log(e);
                                        infomessage('errorGlobal');
                                    }
                                },
                                error: function() {
                                    infomessage('errorGlobal');
                                }
                            });
                        } else {
                            // сообщение о том что пользователь встал на очередь регистрации и скоро будет зарегестрирован, пусь подождет какое то время
                            // authData.Result.RegistrationTime - указывает сколько времени надо ждать
                            infomessage('errorSubmitTime');
                        }
                    }
                } catch (e) {
                    // ошибка обработки ответа
                    console.log(e);
                    infomessage('errorGlobal');
                }
            },
            error: function() {
                if (__CONFIG_GLOBAL.javascript.ip_restrictions.ip_restrictions_flag === true) {
                    if( __CONFIG_GLOBAL.javascript.ip_restrictions.ip_countries.indexOf( localStorage.getItem('countryCode') ) !== -1 ) {
                        countryErrorPopup(__CONFIG_GLOBAL.javascript.ip_restrictions.ip_countries, localStorage.getItem('countryCode'));
                    } else {
                        infomessage('errorGlobal');
                    }
                } else {
                    infomessage('errorGlobal');
                }
            }
        });
    };

    /**
     * Основная фукнция открытия диологово окна о сообщение с упехом или не успехом выполнения выше указанных функций
     */
    function infomessage(mess, classAdditional) {
        var lang = definesLanguage();
        $.magnificPopup.open({
            items: {
                src: '#information-popup'
            },
            type: 'inline',
            mainClass: classAdditional !== undefined ? classAdditional : "",
            callbacks: {
                open: function() {
                    $('.js-text').html(info[lang][mess]);

                },
            }

        }, 0);
    };

    /**
     * Открытия формы двух этапной авторизации
     */
    function openTwoauthstepPopup() {
        openTwoauthstepPopupFlag = true;
        $.magnificPopup.open({
            items: {
                src: '#twoauthstep-popup'
            },
            type: 'inline',
            callbacks: {
                close: function() {
                    openTwoauthstepPopupFlag = false;
                }
            }
        });
    }

    /**
     * Открытия модального окна о двух этапной авторизации
     */
    function showTwoauthstepMessage() {
        $('#auth-code').addClass('error');
        $('#auth-code').after('<label class="error" id="auth-code-error" class="error" for="auth-code" style="">' + errorText.openTwoauthstepPopupRules[currentLanguge] + '</label>');

        setTimeout(function() {
            if ($('#auth-code-error').html() == errorText.openTwoauthstepPopupRules[currentLanguge]) {
                $('#auth-code').removeClass('error');
                $('#auth-code-error').detach();
            }
        }, 2700);
    }

    /**
     * Переопределяем сообщение по умолчанию-
     */
    $.extend($.validator.messages, {
        required: errorText.requiredText[currentLanguge],
        excludingRussian: errorText.excludingRussian[currentLanguge],
    });
    $.extend($.validator.messages, {
        required: errorText.requiredText[currentLanguge],
        newPasswordRules: errorText.errorPasswordText[currentLanguge],
    });
};

/**
 * Новые правила для validation plagin
 */
$.validator.addMethod("phoneMethod", function(value, element) {
    return this.optional(element) || /^[0-9\(\)\-\+\.\,\ ]+$/.test(value);
});
$.validator.addMethod("excludingRussian", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\.\,\!\?\:\…\_\-\/\"\$\@\#\&\^\(\)\%\~\|]*$/.test(value);
});
$.validator.addMethod("newEmailRules", function(value, element) {
    return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
});
$.validator.addMethod("newPasswordRules", function(value, element) {
    return this.optional(element) || /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]{8,}$/.test(value);
});

/**
 * Маски на почту
 */
if ($('input[name="email"]').length) {
    $('input[name="email"]').mask('AB', {
        translation: {
            'A': {
                pattern: /[^\s\.\/]/
            },
            'B': {
                pattern: /\S/,
                recursive: true
            }
        },
    });
}
/**
 * Маски на телефон
 */
if ($('input[name="phone_number"]').length) {
    $('input[name="phone_number"]').mask('Z', {
        translation: {
            'Z': {
                pattern: /^[0-9\(\)\-\+\ ]+$/,
                recursive: true
            }
        },
    });
}
