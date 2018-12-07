(function ($) {
    function scrollTop() {
        $(function () {
            // scroll body to 0px on click
            $('#scroll-toparr').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });
        });

    }

    function showMenu() {
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 500) {
                    $('.pcst-megamenu').addClass('active');
                    $('.mobilest-megamenu').addClass('active');
                    // $("#megamenu-show").fadeOut();
                } else {
                    $('.pcst-megamenu').removeClass('active');
                    $('.mobilest-megamenu').removeClass('active');
                    // $("#megamenu-show").fadeIn();
                }
            });
        });
    }

    /* ----------------------------------------------- */
    /* ----------------------------------------------- */
    /* OnLoad Page */
    $(document).ready(function ($) {
        scrollTop();
        showMenu();
//        getNumberOfNewMessages();
        appendQueryStringToElements();
    });

    /* OnLoad Window */
    var init = function () {
    };
    window.onload = init;


//    function getNumberOfNewMessages() {
//        $.getJSON(api_url + "/public/message/getNumberOfNewMessages", function (response) {
//            var number = response.result;
//            if (number != 0) {
//                if (number > 9) {
//                    $('.bell i').html('N');
//                } else {
//                    $('.bell i').html(number);
//                }
//
//            } else {
//                $('.bell').hide();
//            }
//        });
//    }

    function appendQueryString(url, queryString) {
        if (url == null || url == '#' || url.startsWith("javascript")) {
            return url;
        }

        var hash = "";
        if (url.indexOf("#") !== -1) {
            hash = url.substring(url.indexOf('#'));
            url = url.substring(0, url.indexOf('#'));
        }
        var separator = (url.indexOf("?") === -1) ? "?" : "&";
        return url + separator + queryString + hash;
    }

    function appendQueryStringToElements() {
        if (location.href.indexOf('?') === -1) {
            return;
        }

        var queryString = location.search.slice(location.search.indexOf('?') + 1);
        if (!queryString) {
            return;
        }

        $("a").each(function () {
            var that = this;
            var old = $(that).attr("href");
            $(that).attr("href", appendQueryString(old, queryString));
        });
    }


})(jQuery);