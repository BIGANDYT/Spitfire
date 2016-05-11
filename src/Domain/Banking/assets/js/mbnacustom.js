/* Custom */
// Prevent rogue console logs from breaking IE
if (typeof console === 'undefined' || typeof console.log === 'undefined') {
    var console = { log: function () {} };
}
var $mbna = jQuery.noConflict();
$mbna(function(){   
    /* Draw */
    $mbna('.dropdown-toggle').on('click', function() {
        $mbna('.draw').slideToggle('fast').toggleClass('inline-block');
        if($mbna(this).text() == "Read more"){
            $mbna(this).text("Read less");
        }
        else
        {
            $mbna(this).text("Read more");
        }
    });

    // make icon toggle draw

    $mbna('.dropdown-icon').on('click', function(e) {
        e.preventDefault();
        $mbna('.dropdown-toggle').trigger('click');
    });

    (function () {

        function detectIE() {
            var ua = window.navigator.userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
               // IE 12 => return version number
               return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        }

        var calculator  = $mbna('#calculator'),
            balance     = $mbna('.balance-transfer', calculator),
            interest    = $mbna('.interest-rate', calculator),
            saving      = $mbna('.saving'),
            cls         = '.calculator-slider',
            options     = {},
            calculate   = function () {
                var defaultDebtAmount       = $mbna('input', balance).val().replace(/[^\d\.]/g, ''),
                    apr                     = $mbna('input', interest).val().replace("%", "") / 100,
                    twelfth                 = 1 / 12,
                    calculated              = Math.pow((apr + 1), twelfth),
                    minimumRepaymentGBP     = parseFloat(calculator.data('minimum-repayment')),
                    minimumRepaymentPercent = parseFloat(calculator.data('minimum-repayment-percent')),
                    arrayMax                = new Array(),
                    arrayMax2               = new Array(),
                    interestSaved           = 0,
                    prevBalance             = defaultDebtAmount,
                    btPeriod                = parseFloat(calculator.data('bt-period')),
                    btFee                   = parseFloat(calculator.data('bt-fee')),
                    arrayMaxLargest,
                    arrayMax2Largest,
                    max1,
                    max2v1,
                    max2v2,
                    amountSavedIncFee;

                for (var i = 1; i <= btPeriod; i++) {
                    arrayMaxLargest     = 0;
                    arrayMax2Largest    = 0;
                    max1                = prevBalance * calculated;
                    max2v1              = prevBalance * minimumRepaymentPercent;
                    max2v1              += prevBalance * (calculated - 1);
                    max2v2              = minimumRepaymentGBP;

                    arrayMax2[0]        = max2v1;
                    arrayMax2[1]        = max2v2;
                    arrayMax2[2]        = 0;
                    arrayMax2Largest    = Math.max.apply(Math, arrayMax2);

                    arrayMax[0]         = max1 - arrayMax2Largest;
                    arrayMax[1]         = 0;
                    arrayMaxLargest     = Math.max.apply(Math, arrayMax);

                    interestSaved       += prevBalance * (calculated - 1);
                    prevBalance         = arrayMaxLargest;
                }

                amountSavedIncFee = Math.round(interestSaved - (defaultDebtAmount * btFee));

                if (amountSavedIncFee < 0) {
                    amountSavedIncFee = 0;
                }
                // saving.val( '\u00A3' +numberFormat(amountSavedIncFee, ','));
                saving.val( numberFormat(amountSavedIncFee, ','));
            };

        $mbna(cls, balance).slider($mbna.extend(options, {
            range: "min",
            step: 100,
            max: 15000,
            slide: function (event, ui) {
                // $mbna('input', balance).val('\u00A3' + numberFormat(ui.value, ','));
                $mbna('input', balance).val(numberFormat(ui.value, ','));
                calculate();
            }
        }));

        $mbna(cls, interest).slider($mbna.extend(options, {
            range: "min",
            step: 0.1,
            max: 40,
            slide: function (event, ui) {
                // $mbna('input', interest).val(ui.value + "%");
                $mbna('input', interest).val(ui.value);
                calculate();
            }
        }));

        var _event = 'input';
        if ( detectIE() !== false ) {
            _event = 'change';
        }

        $mbna('input', balance).on('change', function (e) {
            var value = $mbna(this).val().replace(/[^\d\.]/g, '');
            if(value > 15000)
            {
                 value = 15000;
            }

            // $mbna(this).val('\u00A3' + numberFormat(value, ','));
            $mbna(this).val(numberFormat(value, ','));

            $mbna(cls, balance).slider('value', value);

            calculate();
        });

        $mbna('input', interest).on('change', function (e) {
            // var value = $mbna(this).val().replace("%", "");
            var value = $mbna(this).val();
            newValue = value.replace(/[^\d\.]/g, '');

            if(newValue > 40)
            {
                 newValue = 40;
            }

            // $mbna(this).val(newValue+"%");
            $mbna(this).val(newValue);
            $mbna(cls, interest).slider('value', newValue);

            calculate();
        });

        $mbna('input', balance).trigger('change');
        $mbna('input', interest).trigger('change');

        function numberFormat(number, decimals, dec_point, thousands_sep) {
            number = (number + '')
                .replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k)
                        .toFixed(prec);
                };

            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                .split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1)
                    .join('0');
            }
            return s.join(dec);
        }

    })();

    $mbna('.right-image-accordion li').wrapInner('<span></span>');

    $mbna('.right-image-accordion .content').on('collapse.toggle', function () {
        var item        = $mbna(this).parents('.item'),
            readmore    = $mbna('.readmore', item);

        readmore.toggleClass('hide');
    });

    $mbna('.image-accordion .content').on('collapse.shown', function (e) {
        var item = $mbna(this).parent('.item');

        $mbna('.readMoreLink', item).text('Read less...');
    });

    $mbna('.image-accordion .content').on('collapse.closed', function (e) {
        var item = $mbna(this).parent('.item');

        $mbna('.readMoreLink', item).text('Read more...');
    });

    var glossaryIndex = $mbna('.glossary-index');

    if (glossaryIndex.length) {

        $mbna(window).on('load resize scroll', function () {
            var offset  = parseInt($mbna('.nice-footer').outerHeight()) + parseInt($mbna('#copyright').outerHeight());

            if ($mbna(window).scrollTop() + $mbna(window).height() == $mbna(document).height()) {
                glossaryIndex.css('bottom', offset + 'px');
            } else {
                glossaryIndex.css('bottom', '0px');
            }
        })

        $mbna('a', glossaryIndex).on('click', function (e) {
            e.preventDefault();

            var id      = $mbna(this).data('id'),
                offset  = 165;

            if ($mbna('.menu').hasClass('nav-sticky')) {
                offset = 87;
            }

            $mbna('html, body').animate({
                scrollTop: ($mbna('#' + id).offset().top - offset)
            }, 500);
        });

    }

    // Collapse
    var collapse = (function () {

        $mbna('[data-toggle="collapse"]').on('click', function (e) {
            e.preventDefault();

            var cta         = $mbna(this),
                target      = cta.data('target'),
                duration    = cta.data('duration'),
                icontoggle  = cta.data('icontoggle'),
                el          = $mbna(target),
                showing     = true,
                classes     = {
                    sliding: 'sliding'
                },
                params;

            // Don't do anything if we are already sliding
            if (el.hasClass(classes.sliding)) {
                return;
            }
            // Otherwise add it, we will move this once the animation is complete
            else {
                el.addClass(classes.sliding);
            }

            // Are we hiding the target
            if (el.css('display') !== 'none') {
                showing = false;
            }

            // Ensure that duration is set and that it is a number
            if (duration === undefined || duration === false) {
                duration = 300;
            } else {
                duration = parseInt(duration);
            }

            // Ensure we have an icontoggle
            if (icontoggle !== false) {
                icontoggle = true;
            }

            // Fire events
            params = [el, cta, showing];

            el.trigger('collapse.toggle', params);

            if (showing) {
                el.trigger('collapse.show', params);
            } else {
                el.trigger('collapse.close', params);
            }

            el.slideToggle(duration, function () {

                // Remove the sliding class
                $mbna(this).removeClass(classes.sliding);

                // Fire events
                el.trigger('collapse.toggled', params);

                if (showing) {
                    el.trigger('collapse.shown', params);
                } else {
                    el.trigger('collapse.closed', params);
                }

                // Do we have an icon to update?
                var icon = $mbna('.fa', cta);

                if (icon.length && icontoggle) {
                    if (showing) {
                        icon.removeClass('fa-plus')
                            .addClass('fa-minus');
                    } else {
                        icon.removeClass('fa-minus')
                            .addClass('fa-plus');
                    }
                }

            });
        });

    })();

    
    // CONC
    (function () {

        // this is for the card table and is not rerally related to product masthead
        $mbna('body').on('click', '.standard-rates', function (e) {
            e.preventDefault();

            var table       = $mbna(this).parents('table'),
                row         = $mbna(this).parents('tr'),
                card        = row.data('card'),
                title       = $mbna('.card-title', row),
                contents    = $mbna('.standard-rates-content[data-card="' + card + '"]', table),
                icon        = $mbna('.fa', $mbna(this));

            if (contents.hasClass('hide')) {
                contents.removeClass('hide');
                title.attr('rowspan', '4');
                icon.removeClass('fa-plus').addClass('fa-minus');
            } else {
                contents.removeAttr('style').addClass('hide');
                title.attr('rowspan', '2');
                icon.removeClass('fa-minus').addClass('fa-plus');
            }
        });

    })();

    //Replace BR in Card Content
    if ($mbna(".product-masthead .card-content").length) {
        var cardContent = $mbna(".product-masthead .card-content").html();
        var cardContentReplaced = cardContent.replace(/<br>/g, "<hr>");
        $mbna(".product-masthead .card-content").html(cardContentReplaced);
    }

    var pathArray = window.location.pathname.split('/');
    if(pathArray[1] == "compare-credit-cards" && pathArray[2] != "" && pathArray[3] != "")
    {
        var breadcrumb = '<li><a href="/'+pathArray[1]+'/'+pathArray[2]+'/">'+ucwords(pathArray[2].replace(/\-/g, " "))+'</a><span class="icon icon-chevron"></span></li>';
        $mbna(breadcrumb).insertBefore("#breadcrumbs .last");
    }

    //News
    $mbna(".news-col article:gt(7)").hide();

    $mbna(".load-articles").on("click", function()
    {
        var newsHiddenCounter = 0;
        $mbna(".news-col article:hidden").each(function(){
            if(newsHiddenCounter < 6){
                $mbna(this).slideDown(400);
            }
            newsHiddenCounter++;
        });
        var hiddenArticleCount = $mbna(".news-col article:hidden").length;
        if(hiddenArticleCount == 0){
            $mbna(".load-articles").hide();
        }
    });

    $mbna(".news-categories .item").on("click", function(){
        var categoryID = $mbna(this).data("category-id");

        $mbna("article").each(function(){
           $mbna(this).hide();
        });

        $mbna("article").each(function(){
            if($mbna(this).hasClass("cat"+categoryID)){
                $mbna(this).show();
            }
        });
        $mbna(".load-articles").hide();
    });

});

/* Functions */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//Sort Object
var sort_by = function(field, reverse, primer){

   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
}

/* Functions */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//Sort Object
var sort_by = function(field, reverse, primer){

   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
}

///////////////////////
// Eligibility check form
// Includes form validation, modal, timeout messaging etc
///////////////////////

$mbna(function () {

    // trim text on all fields
    $mbna(".eligibility-form input").on("blur", function(){
        $mbna(this).val($mbna.trim($mbna(this).val()));
    });

    // reset buttons for address lookup
    $mbna("body").on("click", ".address-results-one a.reset", function(e) {
        e.preventDefault();
        $mbna('.address-results-one').hide();
        $mbna('.address-search.one').show();
    });

    $mbna("body").on("click", ".address-results-two a.reset", function(e) {
        e.preventDefault();
        $mbna('.address-results-two').hide();
        $mbna('.address-search.two').show();
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var category = getUrlParameter('category');
    if (typeof category !== 'undefined') {
        $mbna("*[data-category='" + category + "']").addClass('active');
        $mbna('#card-category').val(category);
        $mbna('#product').val(category);

        var href = '/understanding-credit/eligibility-check?category=' + category;
        $mbna('.pws-modal.timeout .modal-buttons a:first-child').attr('href', href);

        var ele = $mbna('.eligibility-form');
        $mbna(window).scrollTop(ele.offset().top);

    }

    // disable mousewheel on a input number field when in focus (to prevent Cromium browsers change the value when scrolling)
    $mbna('form.eligibility-check-form').on('focus', 'input[type=number]', function (e) {
        $mbna(this).on('mousewheel.disableScroll', function (e) {
            e.preventDefault();
        });
    });

    $mbna('form.eligibility-check-form').on('blur', 'input[type=number]', function (e) {
        $mbna(this).off('mousewheel.disableScroll');
    });
    $mbna('.box').on('click', function() {
        // hide the choose category error message
        $mbna('.cat-error').hide();
        // set variable to get category
        var getCat = $mbna(this).attr('data-category');
        // populate input with category name
        $mbna('#card-category').val(getCat);
        $mbna('#product').val(getCat);
        $mbna('#product').siblings('.icon-tick-success').show();

        var href = '/understanding-credit/eligibility-check?category=' + getCat;
        $mbna('.pws-modal.timeout .modal-buttons a:first-child').attr('href', href);
    });

    $mbna('select').on('change' , function() {
        $mbna(this.form).validate().element(this);
    });

    $mbna('select').on('blur' , function() {
        $mbna(this.form).validate().element(this);
    });

    // category selection
    $mbna('.categories .box').on('click' , function() {
        $mbna('.box').removeClass('active');
        $mbna(this).addClass('active');
    });

    // Show first manual address area when button is clicked
    $mbna('.btn-address.one').on('click', function(e) {
        var addBtn = $mbna('.btn-address.one');
        // hide the address search area for manual selection
        $mbna('.address-search.one').fadeOut(400);
        $mbna('.address-results-one').hide();

        e.preventDefault();
        $mbna(this).toggleClass('active');
        $mbna('.manual-address.one').slideToggle(400);

        if ($mbna(this).hasClass('active')) {
            setTimeout(function() {
                addBtn.html('Back to postcode search');
            }, 400);
        } else {
            setTimeout(function() {
                addBtn.html('Enter address manually');
            }, 400);
            //reshow the address search area if user goes back to address search
            $mbna('.address-search.one').fadeIn(400);
        }
    });

    // Show second manual address area when button is clicked
    $mbna('.btn-address.two').on('click', function(e) {
        var addBtn = $mbna('.btn-address.two');
        // hide the second address search area for manual selection
        $mbna('.address-search.two').fadeOut(400);
        $mbna('.address-results-two').hide();

        e.preventDefault();
        $mbna(this).toggleClass('active');
        $mbna('.manual-address.two').slideToggle(400);

        if ($mbna(this).hasClass('active')) {
            setTimeout(function() {
                addBtn.html('Back to postcode search');
            }, 400);
        } else {
            setTimeout(function() {
                addBtn.html('Enter address manually');
            }, 400);
            //reshow the address search area if user goes back to second address search
            $mbna('.address-search.two').fadeIn(400);
        }
    });

    function loadLightbox (title, content, buttons, url) {
        var lightbox = $mbna(".lightbox");

        lightbox.find(".title").html("Thank you for your application");
        lightbox.find(".content").html("<p>We are now processing your details. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>");

        if(typeof buttons === 'undefined'){
            lightbox.find(".buttons").hide();
        }
        else
        {
            lightbox.find(".buttons").show();
            lightbox.find(".leaving-second").attr({"href": url, "target": "_blank"});
        }
        lightbox.fadeIn(400);
    }

    function closeLightbox() {
        var lightbox = $mbna(".lightbox");
        lightbox.fadeOut(100);
        lightbox.find(".title").html("");
        lightbox.find(".content").html("");
    }

    // show transfer amount if 'yes' selected
    $mbna('#transfer').on('change', function() {
        $mbna('.transfer-amount').hide();

        if($mbna(this).val() == 'yes'){
            $mbna('.transfer-amount').fadeIn();
        }
    });

    // help messaging prompt
    $mbna('.input-group.has-help > .input-area > input, .input-group.has-help > .input-area >  select').on('focus', function() {
        $mbna(this).parent().siblings('.help-message').show();
    });

    // help messaging prompt
    $mbna('.input-group.has-help > .input-area > input, .input-group.has-help > .input-area >  select').on('blur', function() {
        $mbna(this).parent().siblings('.help-message').hide();
    });

    //only show previous address details based on value in previous field
    var timeout;
    $mbna('#period-years').on('change', function() {

        clearTimeout(timeout);

        timeout = setTimeout(function () {

            $mbna('.previous-address').hide();
            $mbna('.address-months').hide();

            if ($mbna('#period-years').val() == '0') {
                $mbna('.previous-address').fadeIn();
                $mbna('.address-months').show();
            }

            if ($mbna('#period-years').val() == '1') {
                $mbna('.previous-address').fadeIn();
            }

        }, 500);
    });

    $mbna('#product').on('change', function() {
        var href = '/understanding-credit/eligibility-check?category=' + $mbna(this).val();
        $mbna('.pws-modal.timeout .modal-buttons a:first-child').attr('href', href);
        $mbna('#card-category').val($mbna(this).val());
        $mbna('.categories .box').removeClass('active');
        $mbna("*[data-category='" + $mbna(this).val() + "']").addClass('active');
    });

    $mbna('#period-years-two').on('change', function() {
        $mbna('.address-months-two').hide();

        if ($mbna(this).val() == '0') {
            $mbna('.address-months-two').show();
        }
    });

    $mbna('.btn-find-address').on('click', function(e) {
        var level = $mbna(this).attr('data-level');
        var houseNumber = $mbna("#houseNumber").val();
        var postcode = $mbna("#post-code").val();
        var postcodeE = $mbna("#post-code");

        if (level === 'two') {
            houseNumber = $mbna("#houseNumberTwo").val();
            postcode = $mbna("#post-codeTwo").val();
            postcodeE = $mbna("#post-codeTwo");
        }

        if (jQuery.trim(houseNumber) === '') {
            houseNumber = '1';
        }

        if (jQuery.trim(postcode) === '') {
            $mbna("#eligibility-check-form").validate().element(postcodeE);
        } else {
            $mbna(this).children('.fa-spin').show();
            $mbna.ajax({
                url:"/verifyAddress.php",
                data:
                    {
                        "houseNumber": jQuery.trim(houseNumber),
                        "postalCode": jQuery.trim(postcode),
                        "csrf": generateCsrfToken()
                    },
                type: 'POST',
                dataType: 'json',
                success: function(data){
                    $mbna('.btn-find-address .fa-spin').hide();
                    var addressData = $mbna.parseJSON(data),
                        addresses = addressData.addresses,
                        addressesCounter = addresses.length,
                        address,
                        formatted;

                    // Remember the results
                    this.addresses = addresses;

                    // Clear the item list
                    $mbna('.address-results-' + level).empty();
                    $mbna('.address-results-' + level).show();

                    if (addressesCounter > 0) {
                        $mbna(".address-search." + level).hide();
                        $mbna('.address-results-' + level).append('<p>Select an address. <a href="#" class="reset">Reset Search</a></p>');
                        for (var i in addresses) {
                          if (addresses.hasOwnProperty(i)) {
                            address = addresses[i];
                            formatted = formatAddress(address);

                            // Add the item
                            $mbna('.address-results-' + level).append('<div class="your-address" style="display: block;">'+formatted+'</div>');
                          }
                        }
                    } else {
                       $mbna('.address-results-' + level).append('<p>No address matches found.</p>');
                    }

                    if (addressesCounter == 1) {
                        $mbna('.address-results-' + level + ' .your-address').trigger('click');
                    }
                },
                error: function(){
                    $mbna('.btn-find-address .fa-spin').hide();
                }
            });
        }
    });

    function generateCsrfToken () {

        var token   = md5(Math.floor((Math.random() * 99999999) + 1)),
            date    = new Date(),
            expiry  = date.setTime(date.getTime() + (3600 * 1000)),
            expires = '; expires="' + date.toGMTString();

        document.cookie = 'csrf=' + token + expires + '; path=/; domain=.mbna.co.uk';

        return token;

    }

    function formatAddress(address) {
        var formatted = '';
        var houseflat = '';

        if (address.houseNumber !== '') {
            houseflat = address.houseNumber;
        }

        // House Name
        if (address.houseName !== '') {
            formatted += '<span>' + address.houseName + '</span><br>';
            houseflat += ' ' + address.houseName;
        }

        // Flat
        if (address.flat !== '') {
            formatted += '<span>Flat ' + address.flat + '</span><br>';
            houseflat += ' Flat ' + address.houseName;
        }

        formatted += '<span class="houseflat" style="display:none;">' + jQuery.trim(address.flat) + '</span>';
        formatted += '<span class="housename" style="display:none;">' + jQuery.trim(address.houseName) + '</span>';
        formatted += '<span class="housenumber" style="display:none;">' + jQuery.trim(address.houseNumber) + '</span>';

        // House name and number
        if (address.houseNumber !== '' || address.street !== '') {
            formatted += '<span>' + address.houseNumber + ' ' + address.street + '</span><br>';
            formatted += '<span class="address1" style="display:none;">' + address.street + '</span>';
        }

        // District
        if (address.district !== '') {
            formatted += '<span class="address2">' + address.district + '</span><br>';
        }

        // Town
        if (address.town !== '') {
            formatted += '<span class="town">' + address.town + '</span><br>';
        }

        // County
        if (address.county !== '') {
            formatted += '<span class="county">' + address.county + '</span><br>';
        }

        // Post code
        if (address.postCode !== '') {
            formatted += '<span class="postcode">' + address.postCode + '</span><br>';
        }

        return formatted;
    }


    // hide alert message on error result page
    $mbna('.alert-close').on('click', function() {
       $mbna(this).parent().fadeOut(400);
    });

    // scroll down when a category is selected
    $mbna(".categories > .box").click(function () {
        var sT = $mbna(document).scrollTop();
        var offS = 200;
        if (sT > 87) {
            offS = 100;
        }

        $mbna('html, body').animate({
            scrollTop: $mbna(".details-header").offset().top - offS
        }, 500);
    });

    // scroll down to terms & conditions if form exists on page
    $mbna('.terms-link').on('click', function(e) {
        if ($mbna(".eligibility-form").length) {
             e.preventDefault();
             $mbna('html, body').animate({
                 scrollTop: $mbna("#caveats").offset().top - 55
             }, 1000);
        }
    });

    // Timeout function
    $mbna(".eligibility-form input").on('focus', function(){
        if ($mbna('.timeout-trigger').length) {
            $mbna.idleTimer(1800000); // 30 minutes
            //$mbna.idleTimer(20000); // 2 minutes
            // test time $mbna.idleTimer(20000);
        }
    });

    // modals for eligibility check form
    $mbna('.pws-modal.timeout a.leave').on('click', function(e) {
        e.preventDefault();
        window.location.href = 'http://mbna.co.uk';
    });

    $mbna('.pws-modal.timeout a.close').on('click', function(e) {
        e.preventDefault();
        $mbna('.pws-modal.timeout').fadeOut(200);
        $mbna('.modal-overlay').hide();
        $mbna('body').css('overflow','');
        $mbna('a.scrollup').show();
        $mbna('.menu.nav-sticky').css('z-index','');
    });

    // prompts for annual income
    $mbna("#income").blur(function () {
        var amount = parseFloat($mbna(this).val());

        if (amount <= 7000) {
            $mbna('.below-7000').show();
        }

        if (amount >= 100000) {
            $mbna('.above-100000').show();
        }
    });

    $mbna("#income").focus(function () {
        $mbna('.below-7000').hide();
        $mbna('.above-100000').hide();
    });

    // Function to allow only numbers to be typed
    $mbna(".number-only").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($mbna.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))) {
            e.preventDefault();
        }

    });

    $mbna(".number-only").keypress(function (e) {
         // Prevent tel symbols on iOS
        if (e.keyCode == 35 || e.keyCode == 42 || e.keyCode == 43) {
            e.preventDefault();
        }
    });

    $mbna("#eligibility-check-form input").blur(function() {
        var thisId = $mbna(this).attr('id');
        if (thisId !== 'houseNumber' && thisId !== 'post-code' &&
            thisId !== 'houseNumberTwo' && thisId !== 'post-codeTwo') {
            $mbna(this.form).validate().element(this);
        }
    });

    $mbna("input.money").blur(function() {
        var money = $mbna(this).val();

        if (money !== '') {
            var output = parseFloat(money).toFixed(2);
            output = output.replace('.00', '');
            $mbna(this).val(output);
        }

        var limit = 1000000000000;
        var outVal = limit;
        if ($mbna(this).attr("id") === 'transfer-amount'){
            limit = 10000;
            outVal = '';
        }

        if (parseFloat(money) > limit) {
            $mbna(this).val(outVal);
            if (outVal === '') {
                $mbna(this.form).validate().element(this);
                $mbna('#transfer-amount-error').html('This value must be less than &pound;10000.');
            }
        }
    });


    function ucwords(str) {
        // http://phpjs.org/functions/ucwords/
        return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($mbna1) { return $mbna1.toUpperCase(); });
    }

    //Elig Default Option
    var sourceParameter = getParameterByName('source');
    if (sourceParameter !== '') {
        $mbna(".eligibility-form .no-source").remove();
        if (sourceParameter == "balance-transfer") {
            $mbna("#card-category").val("31D3ZPVA");
        }
        else if (sourceParameter == "money-transfer") {
            $mbna("#card-category").val("31D3ZQVA");
        }
        else if (sourceParameter == "balance-transfers-and-purchases") {
            $mbna("#card-category").val("31D3ZRVA");
        }
        else if (sourceParameter == "low-rate") {
            $mbna("#card-category").val("31D3ZSVA");
        }
        else if (sourceParameter == "football") {
            $mbna("#card-category").val("31D3ZTVA");
        }
        else if (sourceParameter == "charities") {
            $mbna("#card-category").val("31D3ZUVA");
        }

        var btnRestartHREF = $mbna(".btn.restart").attr("href");
        $mbna(".btn.restart").attr("href", btnRestartHREF+"?source="+sourceParameter)
    }
});

// Page timeout function
$mbna(document).bind("idle.idleTimer", function() {
    $mbna('.modal-overlay').show();
    $mbna('.pws-modal.timeout').fadeIn(200);
    $mbna('body').css('overflow','hidden');
    $mbna('a.scrollup').hide();
    $mbna('.menu.nav-sticky').css('z-index','9977');
    $mbna("#eligibility-check-form").trigger('reset');
    $mbna("#eligibility-check-form .input-group").removeClass('error');
    $mbna("#eligibility-check-form .input-group span.icon-tick-success").hide();
    $mbna("#eligibility-check-form .input-group label.error").remove();
});
