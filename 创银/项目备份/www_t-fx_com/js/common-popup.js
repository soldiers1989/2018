var popup = popup || {};

// close popup function
popup.closePopup = function(idName, className) {
    var winClose = $(className + " .win-close");
    $(idName).click(function() {
        $(className).removeClass('show').addClass('hide');
        $(this).css({
            display: 'none',
            left: '0'
        });
    });
    winClose.click(function() {
        $(className).hide();
        $(idName).hide();
    });
};
(function($) {

    function timer(element, time) {
        var countDown = setInterval(function() {
            var days = Math.floor(time / 24 / 60 / 60);
            var hoursLeft = Math.floor((time) - (days * 86400));
            var hours = Math.floor(hoursLeft / 3600);
            var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
            var minutes = Math.floor(minutesLeft / 60);
            var remainingSeconds = time % 60;
            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (days < 10) {
                days = "0" + days;
            }
            element.innerHTML = '<span class="days time-text">' +  days  +''+ '<span class="text-day ">天  &nbsp;</span></span><span class="hours time-text">' + hours +''+'<span class="text-hours ">时  &nbsp;</span>' +'</span><span class="minute time-text">' + minutes +'' +'<span class="text-hours ">分  &nbsp;</span>' + '</span><span class="seconds time-text">'+ remainingSeconds + '</span>'+'<span class="text-seconds">秒 </span>'; // "Ngày: " + days + "Giờ: " + hours + "Phút: " + minutes + "Giây: " + remainingSeconds;
            if (time <= 0) {
                element.innerHTML = '<span class="days">已结束</span>';
                $(element).closest('.parent-box').addClass('inactive');
                $(element).closest('.parent-box').find('.rest').css('display', 'none');
                clearInterval(countDown);
                // console.log("cfd countdown running");
            } else {
                time--;
                // console.log("cfd countdown stoped");
            }
        }, 1000);
    }

    function startClock(element, time) {
        if (isNaN(time) == true) {
            console.log("Thời gian nhập vào không phải số");
            return false;

        } else {
            timer(element, time)
        }
    }

    function convert(date, timezone) {
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * timezone));
    }

    $('.reload').click(function() {
        $(this).hide();
        show4Items(2);
    });

    function show4Items(time) {
        $('.container > .col-md-12 > .col-md-4').each(function( index ) {
            if(index < (time*4)) {
                $(this).show();
            }
        });
    }

    /**
     * START - ONLOAD - JS
     */
    /* ----------------------------------------------- */
    /* ------------- FrontEnd Functions -------------- */
    /* ----------------------------------------------- */


    /* ----------------------------------------------- */
    /* ----------------------------------------------- */
    /* OnLoad Page */
    $(document).ready(function($) {
        // show four items in first time
        show4Items(1);

        var current = convert(new Date(), 8);
        $(".clock-popup").each(function(){
            var that = this;
            var end = convert(new Date($(that).find('input[type=hidden]').val()), 8);
            var remain = Math.floor((end.getTime() - current.getTime()) / 1000);
            startClock(that, remain);
        });
    });

})(jQuery);

