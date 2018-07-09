$(document).ready(function (){
    // 设置为主页
    function SetHome(obj,vrl){
        try{
            obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
            if(window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage',vrl);
            }
            else{
                alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。");
            }
        }
    }
// 加入收藏 兼容360和IE6
    function shoucang(sTitle,sURL) {
        try
        {
            window.external.addFavorite(sURL, sTitle);
        }
        catch (e)
        {
            try
            {
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch (e)
            {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }
    function getClass(className) { //className指class的值
        var tagname = document.getElementsByTagName('*');  //获取指定元素
        var tagnameAll = [];     //这个数组用于存储所有符合条件的元素
        for (var i = 0; i < tagname.length; i++) {     //遍历获得的元素
            if (tagname[i].className.indexOf(className)>=0){     //如果获得的元素中的class的值等于指定的类名，就赋值给tagnameAll
                tagnameAll[tagnameAll.length] = tagname[i];
            }
        }
        return tagnameAll;
    }
    window.onload=function(){//载入事件
        var btn=getClass('tab_btn');//获取按钮数组
        var div=getClass('tab_div');//获取div数组
        for(i=0;i<btn.length;i++){
            btn[i].onmouseover=function(){//按钮点击事件
                var index=(this.getAttribute('index')-0);//获取是第几个按钮按下
                if(btn[index].className.indexOf('curr_btn')>=0) return;//如果按下的按钮为当前选中的按钮则无反应
                for(i=0;i<btn.length;i++){
                    if(index==i){
                        btn[i].className='tab_btn curr_btn';
                        div[i].className='tab_div curr_div';
                    }else{
                        btn[i].className='tab_btn';
                        div[i].className='tab_div';
                    }
                }
            }
        }
    };
    var ascenHover=$(".ascendancy_hover ul li");
    var ascenBtns=$(".ascendancy_btn li");
    //悬浮显示封装
    function showInfo(obj1,obj2){
        for(var i=0;i<6;i++){
            obj1.eq(i).mouseenter(function () {
                $(".ascendancy_hover").css("display","block");
                obj2.eq($(this).index()).css("display","block")
}
            );
            obj1.eq(i).mouseleave(
                function () {
                    $(".ascendancy_hover").css("display","none");
                    obj2.eq($(this).index()).css("display","none")
                }
            );
        }
    }
    showInfo(ascenBtns,ascenHover);//优势内容悬浮显示
    //切换函数封装
    function tab(objList1,objList2,className) {
        for(var i=0;i<objList1.length;i++){
            objList1.eq(i).mouseenter(function () {
                objList1.removeClass(className);
                $(this).addClass(className);
                objList2.removeClass(className);
                objList2.eq($(this).index()).addClass(className);
            })
        }
    }
    tab($(".priceBtn1 .priceBtnUp li"),$(".priceConList1 .priceCon"),"active");//价格切换
    tab($(".priceBtn2 .priceBtnUp li"),$(".priceConList2 .priceCon"),"active");//策略切换
    //导航悬浮显示函数封装
    function hoverShow(objList1) {
        for (var i=0;i<objList1.length;i++){
            objList1.eq(i).mouseenter(function () {
                objList1.each(function () {
                    $(this).removeClass('f-show')
                });
                $(this).addClass("f-show")
            });
            objList1.eq(i).mouseleave(function () {
                $(this).removeClass('f-show')
            });

        }
    }
    hoverShow($(".nav-item"));//导航集合调用
    $("#header-language").hover(function () {
        $(this).addClass("show")
    }, function () {
        $(this).removeClass("show")
    })
    var infoList=[
        {name:"首席分析师 Joker.k 康sir",intro:"资深CFA分析师在金融领域有长期的实战经验..."},
        {name:"金牌分析师Jasson sir",intro:"以深厚的专业分析和实战交易中高端培训经验为辅，擅长中短线波段交易..."},
        {name:"金牌分析师彭 sir",intro:"10余年的从业经验和投行经历，先后从事职业操盘手、量化投资策略分析师..."},
        {name:"金牌分析师唐程刚",intro:"毕业于国内著名财经学府，铸造了深厚的技术功底和敏锐的盘面感觉..."},
        {name:"精英分析师方海伟",intro:"对全球经济动向，外汇和黄金白银的联动性有着深厚的认知..."},
        {name:"精英分析师吴乔",intro:"熟悉期货、黄金白银、外汇等国内国际金融投资市场，投资实战经验丰富..."}
    ]//分析师简介
    var $teamInfosInner=$(".teamInfosInner").eq(0);//外部显示框
    var nextIndex=0;
    //分析师简介下一张
    $("#next").click(function () {
        var teamInfositem=$(".teamInfosInner dl:first-child").clone();
        $teamInfosInner.append(teamInfositem)
        $teamInfosInner.animate({ left:'-166px'},100,function () {
            $(".teamInfosInner dl:first-child").remove();
            $teamInfosInner.animate({ left:'0'}, 0);

        });
        if(nextIndex<infoList.length-1){
            nextIndex++;
        }
        else {
            nextIndex=0;
        }
        for(var i=0;i<infoList.length;i++){
            $("#analystTitle").text("")
            $("#analystTitle").text(infoList[nextIndex].name);
            $("#analystCon").text("")
            $("#analystCon").text(infoList[nextIndex].intro);
        }
    })
    //分析师简介上一张
    $("#prev").click(function () {
        var teamInfositem=$(".teamInfosInner dl:last-child").clone();
        $teamInfosInner.animate({left:'-166px'},0)
        teamInfositem.prependTo($teamInfosInner)
        $teamInfosInner.animate({ left:'0px'}, 100,function () {
            $(".teamInfosInner dl:last-child").remove();
        });
        if(nextIndex==0){
            nextIndex=5;
        }
        else {
            nextIndex--;
        }
        for(var i=0;i<infoList.length;i++){
            $("#analystTitle").text(infoList[nextIndex].name);
            $("#analystCon").text(infoList[nextIndex].intro);
        }
    })


    /*$.getJSON('http://www.hj9999.hk/index.php?m=jingcai&c=index&a=getpro',function(data){
        $.each(data, function(i, v){
            syb = $('#'+ i);
            syb.find('.lcount').html(v + '%');
            syb.find('.up-fon').css({width:v + '%'});
            syb.find('.rcount').html(100 - v  + '%');
        });
    })
    //$("input[name='phone']").val($.cookie('loginid') ? $.cookie('loginid') : '');
    $(".inputT input").blur(function () {
        testnum();
    });
    $(".u-submit").click(function () {
        if ( !testnum() ) return;
        postGuess();
    })
    //验证用户电话号码是否为空
    function testnum(){
        var num=$("input[name='phone']").val();
        if(num==null||num=="")
        {
            $(".u-warn2").text("*电话不能为空");
            return false;
        }
        else{
            $(".u-warn2").text("");
            return true;
        }
    }
    //投票表隐藏
    $(".item-cls").click(function () {
        $(".g-form").hide();
    })*/
    
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 300) {
            $(".gotop").fadeIn();
        }
        else {
            $(".gotop").fadeOut();
        }
    })
    /* 回到顶部 */
    $(".gotop").click(function () {
        $('html,body').stop(true, true).animate({scrollTop: '0px'}, 800);
    })
    $(".rightIcon .onlineServices").eq(0).hover(
        function () {
            $(".rightIcon .kefu").css("display","block")
    },function () {
            $(".rightIcon .kefu").eq(0).css("display","none")
        })
    $(".rightIcon .kefu").eq(0).hover(
        function () {
            $(this).css("display","block")
    },function () {
            $(this).css("display","none")
        })

    $('.nav-list .nav-item:eq(6)').hide();
    $('.nav-list .nav-item:eq(7)').hide();
})
/*var symbolData = {
    LLG : '国际金',
    LLS : '国际银',
    CL : '原油',
    EURUSD : '欧元/美元'
}
var directionData = {
    up : '多头',
    down : '空头'
}
function showguess(symbol, direction){
    //弹出登陆窗口
    $("input[name='symbol']").val(symbol);
    $("input[name='direction']").val(direction);
    $('.m-form .content').html(symbolData[symbol] + ' ' + directionData[direction]);
    $(".g-form").show();
}
function postGuess(){
    $.ajax({
        type : "GET",
        url : "http://www.hj9999.hk/index.php?m=jingcai&c=index&a=send",
        data : {
            uname  : 'index',
            phone  : $("input[name='phone']").val(),
            symbol  : $("input[name='symbol']").val(),
            direction  : $("input[name='direction']").val()
        },
        dataType : "json",
        success : function(data){
            if(data.status){
                //添加cookie
                //$.cookie('loginid', $("input[name='phone']").val(), { expires: 31 });
                alert(data.msg);
                location.reload();
            } else {
                alert(data.msg);
            }
        }
    });
    return false;
}*/



