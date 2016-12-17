/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {
  var privateVar = 1;

  function privateMethod1() {
    // todo
  }
  return {
    publicVar: 1,
    publicObj: {
      var1: 1,
      var2: 2
    },
    publicMethod1: privateMethod1
  };

})(jQuery, window);
jQuery(function() {
  if ($(".scrollbar").length > 0) {
    $(".scrollbar").mCustomScrollbar();
  }
  
  if ($(".all-box-check").length > 0) {
    $('.all-box-check').mCustomScrollbar();
  }
  
  var $widthContainer = $(".container").width() ;

  var $widthNextPre = $(".next-pre").innerWidth() ;
  var $widthSlider = $widthContainer - $widthNextPre - 30;
  $(".slider").width($widthSlider);
  
  function myfunction() {
    if ( this.itemsAmount > this.visibleItems.length ) {
      $('.next').show();
      $('.prev').show();

      $('.next').removeClass('disabled');
      $('.prev').removeClass('disabled');
      if ( this.currentItem === 0 ) {
        $('.prev').addClass('disabled');
      }
      if ( this.currentItem === this.maximumItem ) {
        $('.next').addClass('disabled');
      }

    } else {
      $('.next').hide();
      $('.prev').hide();
    }

    var $widthContainer = $(".container").width() ;

    var $widthNextPre = $(".next-pre").innerWidth() ;
    var $widthSlider = $widthContainer - $widthNextPre - 30;
    $(".slider").width($widthSlider);
  }

  var owl = $("#owl-demo"); 
  owl.owlCarousel({
      items : 8, //10 items above 1000px browser width
      autoWidth:true,
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
      afterAction: myfunction
  });
  var owlone = $("#owl-one-slide");

  owlone.owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });
  $(".owl-next").click(function(){
    owlone.trigger('owl.next');
  });
   $(".owl-prev").click(function(){
    owlone.trigger('owl.prev');
  });

   $("#owl-top-promotion").owlCarousel({
 
      //autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
 
  });
$("#owl-top-good").owlCarousel({
 
      //autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 5,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4]
 
  });
var owlpriceshock = $("#owl-price-shock");
owlpriceshock.owlCarousel({
      //autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]
 
  });
$(".next-price").click(function(){
    owlpriceshock.trigger('owl.next');
  });
   $(".prev-price").click(function(){
    owlpriceshock.trigger('owl.prev');
  });

   var owlbuy1 = $("#owl-buy1");
owlbuy1.owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 5,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4]
 
  });
$(".buy1-next").click(function(){
    owlbuy1.trigger('owl.next');
  });
   $(".buy1-prev").click(function(){
    owlbuy1.trigger('owl.prev');
  });

    var owlbuy2 = $("#owl-buy2");
owlbuy2.owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 5,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4]
 
  });
$(".buy2-next").click(function(){
    owlbuy2.trigger('owl.next');
  });
   $(".buy2-prev").click(function(){
    owlbuy2.trigger('owl.prev');
  });

    var owlbuy3 = $("#owl-buy3");
owlbuy3.owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 5,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4]
 
  });
$(".buy3-next").click(function(){
    owlbuy3.trigger('owl.next');
  });
   $(".buy3-prev").click(function(){
    owlbuy3.trigger('owl.prev');
  });

    var owlbuy4 = $("#owl-buy4");
owlbuy4.owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 5,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [979,4]
 
  });
$(".buy4-next").click(function(){
    owlbuy4.trigger('owl.next');
  });
   $(".buy4-prev").click(function(){
    owlbuy4.trigger('owl.prev');
  });
  
   
    // Custom Navigation Events
 $(".next").click(function(){
      owl.trigger('owl.next');
      $(".next-pre .prev").css("display","inline-block ");
      var $widthContainer = $(".container").width() ;

  var $widthNextPre = $(".next-pre").innerWidth() ;
  var $widthSlider = $widthContainer - $widthNextPre - 30;
  $(".slider").width($widthSlider);

    });
  $(".prev").click(function(){
      owl.trigger('owl.prev');
      $(".next-pre .next").css("display","inline-block ");
      var $widthContainer = $(".container").width() ;

  var $widthNextPre = $(".next-pre").innerWidth() ;
  var $widthSlider = $widthContainer - $widthNextPre - 30;
  $(".slider").width($widthSlider);
  });

  $("header").mouseleave(function(){
      $(".sub-content").removeClass("active");
      $("header .item  a").css("border-bottom","0");
  });


/*$(".humburger").click(function() {

    var x = $(window).scrollTop();

   if($(window).scroll()) {
    alert("áds");
     if($(window).scrollTop() < (x-100)) {
      alert("scrollup");
     }
     else if($(window).scrollTop() > (x+100)) {
      alert("scrolldown");
     }
   }

});*/
$('.positionfixed2 .collapse').collapse();

});
(function($){
  
  
    var hoverAndClick = function() {
      var valueDataId = $(this).attr("data-id");
        $(".menu-content .sub-content").removeClass("active");
        $(".menu-content .sub-content.sub_"+valueDataId).addClass("active");
        $("header .item  a").css("border-bottom","0");
        $(this).css("border-bottom","3px solid #2bc5f8");
    } ;
      Site.publicMethod1();

    $("header .item  a").hover( hoverAndClick ).click( hoverAndClick ).focus( hoverAndClick) ;
       //Firefox
    var lastScrollTop = 0;
    
    $(window).on('scroll', function() {
        $("#collapseExample").addClass("collapse");
        $("#collapseExample").removeClass("in");
        // $(".humburger").addClass("collapsed");
        var st = $(this).scrollTop();
       /* console.log($(document).height());
        console.log($(window).height());
        console.log($(window).scrollTop());*/
        if((st>=70 )&& (st<=1090)) {
          $("#collapseExample").addClass("collapse");
          $("#collapseExample").removeClass("in");
          
        }
        if((st>=990 )&& (st<=1090)) {
          $("#first-header").css("display","none");
          $("#collapse-scroll").css("display","block");
        }
        if(st<990) {
          $("#collapse-scroll").css("display","none");
          $("#first-header").css("display","block");
        }

        if(st>lastScrollTop) {
            if(st > 50) {
              $("header").addClass("positionfixed");
            /*  if((st>=70) &&(st<=1090)) {
                $("#collapseExample").addClass("collapse");
              }*/
              if(st>100) {
                $("header").addClass("positionfixed2");
                $("#collapseExample").addClass("collapse");
              }
              else {
                $("header").removeClass("positionfixed2");
                $("#collapseExample").addClass("collapse");
              }
              if(st>1090) {

                $("header").addClass("positionfixed3");
                $("#collapseExample").addClass("collapse");
                $('.header-detail a.logo').hide();
              }
              else {
                $("header").removeClass("positionfixed3");
                $("#collapseExample").addClass("collapse");
                $('.header-detail a.logo').show();
              }
          }

          else {
              $("header").removeClass("positionfixed");
              $("#collapseExample").removeClass("collapse");
          }
        }

        else {
          if((st>=50 )&& (st<=1090)) {
            $("#collapseExample").addClass("collapse");

          }
          if(st<1090) {
            $("#collapseExample").addClass("collapse");
            $("#collapseExample").addClass("in");
          }
        }
        var documentheight = $(document).height() - 83 - $(window).height();
        if(st > documentheight ) {
          $(".group-mycheese").css("display","block");
        }
        else {
          $(".group-mycheese").css("display","none");
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    
    

})(jQuery);
$(".checkbox input[type=checkbox]").on("click",function(){
      if($(this).is(":checked")) {
         var idcurrent = $(this).attr("id");
         var  html = $(this).next().html();
         var taglabel ="<label class='text-filter'>" + html + "</label>";
         $(".show-filter").append(taglabel + " ");
      }
  });
if($(".clock-sale").length > 0){
    $(".clock-sale").countdown('2020/10/10').on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime('' + '<div><label><span class="number">%H</span><span class="space">:</span></label></div>' + '<div><label><span class="number">%M</span><span class="space">:</span></label></div>' + '<div><label><span class="number">%S</span></label><span class="text">Giây</span></div>'));
    });
}

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'plugin';
  var privateVar = null;
  var privateMethod = function() {

  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

    },
    publicMethod: function(params) {

    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    option: 'value'
  };
  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
  // reply answer=========================
  $("#first-click").click(function(){
    $("#first-reply").toggle();
  });

   $("#second-click").click(function(){
    $("#second-reply").toggle();
  });

    $("#third-click").click(function(){
    $("#third-reply").toggle();
  });
    $(".first-cancel").click(function(){
      $("#first-reply").fadeOut("slow");
    });
    $(".second-cancel").click(function(){
      $("#second-reply").fadeOut("slow");
    });
    $(".third-cancel").click(function(){
      $("#third-reply").fadeOut("slow");
    });
    // dislike, like======
    $(".commend-detail #like-command1").click(function(){
      $(this).css("display","none");
      $(".commend-detail #liked-command1").css("display","block");
    });

    $(".commend-detail #like-command2").click(function(){
      $(this).css("display","none");
      $(".commend-detail #liked-command2").css("display","block");
    });
    $(".commend-detail #like-command3").click(function(){
      $(this).css("display","none");
      $(".commend-detail #liked-command3").css("display","block");
    });

    $(".commend-detail #liked-command1").click(function(){
      $(this).css("display","none");
      $(".commend-detail #like-command1").css("display","block");
    });

    $(".commend-detail #liked-command2").click(function(){
      $(this).css("display","none");
      $(".commend-detail #like-command2").css("display","block");
    });
    $(".commend-detail #liked-command3").click(function(){
      $(this).css("display","none");
      $(".commend-detail #like-command3").css("display","block");
    });
  // tab========================
  $("ul.tab li:nth-child(2) a").click(function(){
    $("ul.tab li:first-child a").css("border-bottom","none");
  });
  $("ul.tab li:nth-child(3) a").click(function(){
    $("ul.tab li:first-child a").css("border-bottom","none");
  });
  $("ul.tab li:first-child a").click(function(){
    $("ul.tab li:first-child a").css("border-bottom","2px solid #2bc5f8");
  });
  // see more================
  $("#seemore").click(function(){
    $(this).hide();
    $("#collapse").show();
    $(".des ul").css({"height":"auto","overflow":"nomal"});
  });
   $("#collapse").click(function(){
    $(this).hide();
    $("#seemore").show();
    $(".des ul").css({"height":"120px","overflow":"hidden"});
  });
// resize selection option==============
  $('#resizing_select').change(function(){
    $("#width_tmp_option").html($('#resizing_select option:selected').text()); 
    $(this).width($("#width_tmp_select").width());  
  });

  $('#sel1').change(function(){
    $("#width_option").html($('#sel1 option:selected').text()); 
    $(this).width($("#width_select").width());  
  });
// choose size change border-color -----------------------------------
$('.total-btn li').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    // only do the following if the clicked link isn't already active
    if(!$(this).closest('li').hasClass('active_')) {
      $(this).closest('ul').find('.active_').removeClass('active_');
      // $(this).css("border","none");
      $(this).closest('li').addClass('active_');
      $(".total-btn li a div").css("border","none");
      $(this).unbind("mouseenter mouseleave");
    }
});

$('.total-btn2 li').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  // only do the following if the clicked link isn't already active
  if(!$(this).closest('li').hasClass('active_')) {
    $(this).closest('ul').find('.active_').removeClass('active_');
    $(this).closest('li').addClass('active_');
    $(".total-btn li a div").css("border","none");
    $(this).unbind("mouseenter mouseleave");
  }
});
// click arrow input number ===============================
$("#increase").click(function(){
  var number = $("#number").val();
  number++;
  $("#number").val(number);
});
$("#decrease").click(function(){
  var number = $("#number").val();
  number--;
  $("#number").val(number);
});
// zoom main picture =======================
//if($('.picZoomer').length > 0){
//    $(function() {
//        if ($('.picZoomer').length > 0) {
//            $('.picZoomer').picZoomer();
//        }
//        $('.piclist li').on('click',function(event){
//            var $pic = $(this).find('img');
//            $('.picZoomer-pic').attr('src',$pic.attr('src'));
//        });
//    });
//}
// next & previous button =====================================
$('#next').click(function() {
  document.getElementById('Gallery').scrollLeft+=77;
});

 $('#prev').click(function() {
  document.getElementById('Gallery').scrollLeft-=77;
});

$('#Gallery li').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  // only do the following if the clicked link isn't already active
  if(!$(this).closest('li').hasClass('active-img')) {
    $(this).closest('ul').find('.active-img').removeClass('active-img');
    $(this).closest('li').addClass('active-img');
    $(this).unbind("mouseenter mouseleave");
  }
});
// click menu cs center =====================
$("#first-menu").click(function(){
  $("#contentcs1").slideToggle( "slow" );
  $(this).find(".fa-angle-up, .fa-angle-down").toggle();
});
$("#second-menu").click(function(){
  $("#contentcs2").slideToggle( "slow" );
  $(this).find(".fa-angle-up, .fa-angle-down").toggle();
});
$("#third-menu").click(function(){
  $("#contentcs3").slideToggle( "slow" );
  $(this).find(".fa-angle-up, .fa-angle-down").toggle();
});

// active left menu cs center----
$('.box-check ul li').on('click', function (e) {
  // only do the following if the clicked link isn't already active
  if(!$(this).closest('li').children().hasClass('active-menu')) {
    $(this).closest('ul').children().find('.active-menu').removeClass('active-menu');
    $(this).closest('li').children().addClass('active-menu');
    $(this).unbind("mouseenter mouseleave");
  }
});
// list quetion page frequently answer and question ===================
$("#list-question li .accordion-section-title").click(function(){
  $(this).parent().find(".fa-sort-desc, .fa-sort-asc").toggle();
});
// datepicker==========================
    if ($('.birth-date, .input-date').length > 0) {
        $('.birth-date, .input-date').datepicker();
    }
// 
$("#male").click(function(){
  $("#male").addClass('active-btn');
  $("#female").removeClass('active-btn');
});
$("#female").click(function(){
  $(this).addClass("active-btn");
  $("#male").removeClass("active-btn");
});
$("td.order- .buy").click(function(){
  $(this).css("background","#ff9000");
});
// payment address=========================
$(document).on( "mouseenter", ".tb-address td.form .first" , function() {
    $(this).find(".edit-address").css("display","block");
  });
$(document).on( "mouseleave", ".tb-address td.form .first", function() {
    $(this).find(".edit-address").css("display","none");
  });

 $('input[type="radio"]').click(function() {
  $(".edit-address").removeClass("display");
  $( ".tb-address td.form .first" ).css("background","#fff");
       if($(this).attr('id') == 'radio2'||$(this).attr('id') == 'radio3'||$(this).attr('id') == 'radio1') {
            $(this).parent().find(".edit-address").addClass("display");
            $(this).parent().css("background","#f8f8f8");
       }

       else {
            $(this).find(".edit-address").removeClass("display");
       }
   });
 // add other address -------------------
 $(document).on('click', "#click-add", function() {
    $("#other-address").slideDown("slow");
    $(this).hide();
 });
 $(document).on('click',"#cancel-continue", function(){
    $("#other-address").slideUp("slow");
    $("#click-add").show();
 });
  // add other address -------------------
 $("#btn-address-plus").click(function(){
    $("#address-plus").slideDown("slow");
    $(this).hide();
 });
 $("#cancel-plus").click(function(){
    $("#address-plus").slideUp("fast");
    $("#btn-address-plus").show();
    return false;
 });
// edit address =================
$("#edit1").click(function(){
  $("#edit-form1").slideDown("slow");
});
$("#edit2").click(function(){
  $("#edit-form2").slideDown("slow");
});
$("#edit3").click(function(){
  $("#edit-form3").slideDown("slow");
});
$("#cancel1").click(function(){
  $("#edit-form1").slideUp("slow");
});
$("#cancel2").click(function(){
  $("#edit-form2").slideUp("slow");
});
$("#cancel3").click(function(){
  $("#edit-form3").slideUp("slow");
});
// search form show when press key input-------
$("#input-search input").click(function(){
  $("#show-result").css("display","block");
});
// choose one sale product ===========
//    default gift 1
    $( document ).ready(function() {
        $('.goods-together ul.list-sale li').first().addClass('active-sale');
        $('.goods-together ul.list-sale li .icon-check').first().show();
    });
// $(".goods-together .list-sale .sale-item i.icon-check").hide();
$('.goods-together ul.list-sale li').on('click', function (e) {
  // only do the following if the clicked link isn't already active
  if(!$(this).closest('li').hasClass('active-sale')) {
    $(this).closest('ul').find('.active-sale').removeClass('active-sale');
    $(this).closest('li').addClass('active-sale');
    $(this).unbind("mouseenter mouseleave");
  }
});
/*$('.goods-together ul.list-sale li').on('click', function (e) {
  $(this).find(".icon-check").slideDown("slow");
});*/
$('input[type="radio"]').click(function() {
    if ($(this).is(':checked')) {
        if($(this).attr('id') == 'choose1') {
            $('#choose2').prop('checked', false);
            $('#choose2').removeAttr( "checked" );
        }else{
            $('#choose1').removeAttr( "checked" );
            $('#choose1').prop('checked', false);
        }
    }
    var id_radio = $(this).attr('id');
    $('.goods-together ul.list-sale li .icon-check').hide();
    if($(this).attr('id') == 'choose1'||$(this).attr('id') == 'choose2') {
        $('#'+id_radio+'').attr('checked', 'checked');
        $(this).parent().find(".icon-check").show();
    }
    else {
        $(this).parent().find(".icon-check").hide();
    }
});

}(jQuery, window));

$(document).ready(function(){
var count_li = $("#Gallery li").length;
// alert(count_li);
if(count_li < 8){
  $("#prev").css("display","none");
  $("#next").css("display","none");
}
else{
  $("#prev").css("display","block");
  $("#next").css("display","block");
}

  $("#styled").on('change keyup paste', function(){
    var length = $(this).val().length;
    if(length > 0) {
      $(".text-area").css("display", "none");
    }
    else{
      $(".text-area").css("display","block");
    }
  });
  $("ul.tab li:nth-child(2) a").click(function(){
    $("ul.tab li:nth-child(1) a").css("border-bottom","none");
  });

  function truncateText(selector, maxLength) {
    var element = document.querySelector(selector),
      truncated = element.innerText;
    if (truncated.length > maxLength) {
      truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
  }
    if($('.id-text').length > 0){
        document.querySelector('.id-text').innerText = truncateText('.id-text', 30);
    }
});

$(function() {
    if($("img.lazy").length > 0){
        $("img.lazy").lazyload({
            effect : "fadeIn",
            threshold   : 800
        });
    }
});

$(document).ready(function() {
    // Configure/customize these variables.
    // var showChar = 300;  // How many characters are shown by default
    // var ellipsestext = "...";
    // var moretext = '<span class="text">Xem thêm </span><span class="fa fa-angle-right"></span>';
    // var lesstext = '<span class="fa fa-angle-left"></span><span class="text"> Thu gọn</span>';
    

    // $('#more').each(function() {
    //     var content = $(this).html();
 
    //     if(content.length > showChar) {
 
    //         var c = content.substr(0, showChar);
    //         var h = content.substr(showChar, content.length - showChar);
 
    //         var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="link">' + moretext + '</a></span>';
 
    //         $(this).html(html);
    //     }
 
    // });
 
    // $(".link").click(function(){
    //     if($(this).hasClass("less")) {
    //         $(this).removeClass("less");
    //         $(this).html(moretext);
    //     } else {
    //         $(this).addClass("less");
    //         $(this).html(lesstext);
    //     }
    //     $(this).parent().prev().slideToggle(300);
    //     $(this).prev().slideToggle(300);
    //     return false;
    // });
    // brand ========
    /*var length = $('.sidebar .box-check .menu-sidebar li a span').text().length;
    alert(length);*/
   
});
//sort
$(document).ready(function(){
  $('.sort').change(function(){
    location = $(this).val();
  })
});

//search
var timer;
$("#input-search").on('keyup', function() {
    clearTimeout(timer);  //clear any running timeout on key up
    if ($(this).val() != '') {
        timer = setTimeout(function () { //then give it a second to see if the user is finished
            $.get("/new_search/es_suggest", {txtSearch: $('#input-search').val()}, function (data) {
                if (data.number > 0) {
                    $('ul.list-result').html('');
                    for (var i = 0; i < data.number; i++) {
                        if(data.list_product[i].price !== data.list_product[i].site_price){
                            site_price = '<span>'+number_format(data.list_product[i].site_price,0,'.','.')+'₫</span>';
                        }else{
                            site_price = '';
                        }
                        $('ul.list-result').append('<li class="item-result">\
                                                    <a href="' + data.list_product[i].alias + '-' + data.list_product[i].product_id + '.html">\
                                                        <div class="wrap-img">\
                                                            <img src="' + data.list_product[i].image_link + '' + data.list_product[i].image + '" alt="recommend">\
                                                        </div>\
                                                        <div class="information">\
                                                            <p>' + data.list_product[i].name + '</p>\
                                                            <p class="price">' + number_format(data.list_product[i].price,0,'.','.') + '₫</p> '+site_price+'\
                                                        </div>\
                                                    </a>\
                                                </li>');
                    }
                } else {
                    $('ul.list-result').html('');
                }
            }, 'json');

            return;
        }, 500);
    } else {
        $('ul.list-result').html('');
    }
});

function updateUrlParameter(key, value, url){
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

$(document).ready(function(){
    if($('#content4 .checkbox').length>0){
      $('#content4 .checkbox input').click(function(){
        data = [];
        $('#content4 .checkbox input[type=checkbox]:checked').each(function(){          
          data.push($(this).val());
        });
        data = data.toString();        
        url = updateUrlParameter('brands',data);
        url = updateUrlParameter('page',1,url);
        setTimeout(function(){       
          location = url;
        },1000);
        console.log(data);
      });
    }
})


$(".form-inputsearch > .form-control").keyup(function(){

    // Retrieve the input field text and reset the count to zero
    var filter = $(this).val(), count = 0;
    // Loop through the comment list
    $(".scrollbar .checkbox label").each(function(){

        // If the list item does not contain the text phrase fade it out
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).parent().fadeOut();

            // Show the list item if the phrase matches and increase the count by 1
        } else {
            //console.log($(this).parent());return false;
            $(this).parent().show();
            count++;
        }
    });

    // Update the count
    var numberItems = count;
    $("#filter-count").text("Number of Comments = "+count);
});