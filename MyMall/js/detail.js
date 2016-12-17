$(function () {
    // Bach comment visitor
    if ($('form#comment_visitor').length > 0) {
        $('form#comment_visitor').validate({
            errorElement: "p",
            onkeyup: false,
            ignore: [],
            "rules" : {
                "comment"      : {
                    "required"  : true,
                },
                "fullname_visitor"      : {
                    "required"  : true,
                    "maxlength" : 50,
                },
                "email_visitor" : {
                    "required"  : true,
                    "email"     : true,
                },
            },
            "messages" : {
                "comment"      : {
                    "required"  : 'Bạn chưa nhập nội dung bình luận !',
                },
                "fullname_visitor"      : {
                    "required"  : "Bạn chưa nhập họ tên !",
                    "maxlength" : "Bạn chỉ được phép nhập tối đa 50 ký tự",
                },
                "email_visitor"    : {
                    "required"  : "Bạn chưa nhập địa chỉ email !",
                    "email"     : "Email không đúng định dạng",
                },
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "comment" ) {
                    error.insertBefore($(".style-textarea"));
                }else{
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                var fullname_visitor  = $('#fullname_visitor').val();
                var email_visitor     = $('#email_visitor').val();
                var comment_visitor   = $('#styled').val();
                
                $.ajax({
                    type: "POST",
                    url: "product_detail/comment_visitor",
                    data: {fullname:fullname_visitor,email:email_visitor,comment:comment_visitor,product_id:product_id},
                    success: function (data) {
                        data = JSON.parse(data);
                        if(data.done == 'true'){
                            var hr = '';
                            if(data.number_comment > 1){
                                var hr = '<hr>';
                            }
                            setTimeout(function(){
                                $('#comment_visitor').after(' <div class="commend-detail">\
                                        <p class="name-person">'+data.fullname+'</p> <span class="date"> - lúc '+data.date_create+'</span>\
                                        <p class="idea">'+data.comment+'</p>\
                                        <div onclick="open_reply('+data.id_product+');return false;" class="reply" id="first-click_'+data.id_product+'">\
                                        <i class="fa fa-reply" aria-hidden="true"></i> <span>Trả lời</span>\
                                        </div>\
                                        <div class="sub-reply" id="first-reply_'+data.id_product+'">\
                                            <form class="form_reply" id="frm_reply_'+data.id_product+'" method="" action="">\
                                                <input name="parent_id" value="'+data.id_product+'" class="input-text" type="hidden">\
                                                <input name="product_id" value="'+product_id+'" class="input-text" type="hidden">\
                                                <div class="txtarea-reply">\
                                                    <textarea name="comment_reply" class="bg-textarea" placeholder="Nhập nội dung trả lời ..."></textarea>\
                                                </div>\
                                                <div class="input col-md-12">\
                                                    <div class="col-md-6">\
                                                        <input name="fullname" class="input-text" type="text" placeholder="Nhập họ tên bạn (bắt buộc)">\
                                                    </div>\
                                                    <div class="col-md-6">\
                                                        <input name="email" class="input-text" type="email" placeholder="Email">\
                                                    </div>\
                                                </div>\
                                                <a href="#" class="third-cancel">Bỏ qua</a>\
                                                <input class="btn-reply" type="submit" value="Trả lời">\
                                            </form>\
                                        </div>\
                                        <div class="phoney_reply"></div>\
                                    </div>\
                                    '+hr+'').fadeIn();
                                $('#fullname_visitor').val('');
                                $('#email_visitor').val('');
                                $('#styled').val('');

                                validate_frm_reply('#frm_reply_'+data.id_product);
                            }, 1000);
                        }
                    }
                },'json');
                return false;
            }
        });
    }
});

function validate_frm_reply(element) {
    $(element).validate({
        errorElement: "p",
        onkeyup: false,
        ignore: '',
        "rules": {
            "comment_reply": {
                "required": true,
            },
            "fullname": {
                "required": true,
                "maxlength": 50,
            },
            "email": {
                "required": true,
                "email": true,
            },
        },
        "messages": {
            "comment_reply": {
                "required": 'Bạn chưa nhập nội dung trả lời !',
            },
            "fullname": {
                "required": "Bạn chưa nhập họ tên !",
                "maxlength": "Bạn chỉ được phép nhập tối đa 50 ký tự",
            },
            "email": {
                "required"  : "Bạn chưa nhập địa chỉ email !",
                "email"     : "Email không đúng định dạng",
            },
        },
        submitHandler: function (form) {
            var datastring = $(form).serialize();
            $.ajax({
                type: "POST",
                url: '/product_detail/reply_comment_visitor',
                data: datastring, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                dataType: 'json',
                success: function (data) {
                    if (data.done == 'true') {
                        setTimeout(function () {
                            $(form)[0].reset();
                            $(form).closest( ".sub-reply" ).hide();
                            $(form).closest( ".sub-reply" ).parent().children('.phoney_reply').after('<div class="subreply-person first-reply">\
                                            <p class="name-person reply-person ">' + data.fullname + '</p> <span class="date"> - lúc ' + data.date_create + '</span>\
                                            <p>' + data.comment + '</p>\
                                            </div>').fadeIn();
                        }, 1000);
                    }
                },
            });
            return false;
        }
    });
}

// function shared facebook
function fbShare(url, title, image, winWidth, winHeight) {
    try {
        ga('send', 'event', {eventCategory: 'Facebook interaction', eventAction: 'Share'});
    } catch (err) {
        console.log(err);
    }
    var descr = $('.seo_description').text();
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}
function CheckAmount(num) {
    var result = num;
    if (isNaN(num)) result = 1;
    if (num > 20) result  = 1;
    if (num < 0)   result  = 1;
    return result;
}
// function addcart
function myAddCart() {
    var target = $("div#attribute").offset();
    $('a.add-to-cart-btn').attr("disabled", true);
    $('a.add-to-cart-btn').removeAttr("onclick");
    var size = '', color = '', use_for = '';
    if ($('input#cacheSize').val() && $('input#cacheSize').val() == 'empty') {
        //alert('vui lòng chọn kích thước');
        $('[data-toggle="tooltip_size"]').tooltip('show');
        $('a.add-to-cart-btn').removeAttr("disabled");
        $('a.add-to-cart-btn').attr("onclick", "myAddCart()");
        window.scrollTo(target.left, target.top);
        return false;
    } else if ($('input#cacheSize').val() && $('input#cacheSize').val() != 'empty') {
        var size = $('input#cacheSize').val();
        $('[data-toggle="tooltip_size"]').tooltip('hide');
    }
    if ($('input#cacheColor').val() && $('input#cacheColor').val() == 'empty') {
        //alert('vui lòng chọn màu sắc');
        $('[data-toggle="tooltip_color"]').tooltip('show');
        $('a.add-to-cart-btn').removeAttr("disabled");
        $('a.add-to-cart-btn').attr("onclick", "myAddCart()");
        window.scrollTo(target.left, target.top);
        return false;
    } else if ($('input#cacheColor').val() && $('input#cacheColor').val() != 'empty') {
        var color = $('input#cacheColor').val();
        $('[data-toggle="tooltip_color"]').tooltip('hide');
    }

    if ($('input#cacheUseFor').val() && $('input#cacheUseFor').val() == 'empty') {
        $('[data-toggle="tooltip_userfor"]').tooltip('show');
        $('a.add-to-cart-btn').removeAttr("disabled");
        $('a.add-to-cart-btn').attr("onclick", "myAddCart()");
        window.scrollTo(target.left, target.top);
        return false;
    } else if ($('input#cacheUseFor').val() && $('input#cacheUseFor').val() != 'empty') {
        use_for = $('input#cacheUseFor').val();
        $('[data-toggle="tooltip_userfor"]').tooltip('hide');
    }

    var amount       = $('#txtsl').val();
    try {
        ga('send', 'event', {eventCategory: 'Add to cart', eventAction: 'Add'});
    } catch (err) {
        console.log(err);
    }
    /** CHECK-OUT PROCESS AS A PAGEVIEW **/
    ga("send", "pageview", "http://local.mymall-v2.vn/chuot-chuyen-game-cao-cap-venr-6d-eagle-m1-den-70845.html/"+cate_name+"/" + product_name);
    addProductIntoOrder(product_id, product_name, size, color, amount, use_for);
    $('a.add-to-cart-btn').removeAttr("disabled");
}
//reply answer=========================
function open_reply(id){
    $('#first-reply_'+id+'').toggle();
}
function addProductIntoOrder(product_id, product_name, size, color, amount,use_for) { 
    //Xử lý khi người dùng nhập tào lao
    if (isNaN(amount) || amount < 0 || amount > 100){
        amount = 1;
    }
    var price_p = $('span#Price-mymall').text();
    // check Package 8
    var isPackage8='';
    if (package8 == 1) {
        if (Promotion_package(8,cateid,price,amount,'')!='') {
            isPackage8 = Promotion_package(8,cateid,price,amount,'');
        }
    }
    // xử lý GA GOOGLE
    ga('ec:addCart', {               // Provide product details in a productFieldObject.
        'id'      : product_id,                   // Product ID (string).
        'name'    : product_name,   // Product name (string).
        'category': cateid,            // Product category (string).
        'brand'   : '',           // Product brand (string).
        'variant' : color,       // Product variant (string).
        'price'   : price,    // Product price (currency).
        'quantity': amount    // Product quantity (number).
    });
    var key_shoppingCart = 'spcart';
    var shoppingcart = [];
    if (localStorage.getItem(key_shoppingCart) != null){
        shoppingcart = JSON.parse(localStorage.getItem(key_shoppingCart));
    }
    var is_exist = 0;

    for(var i=0;i<shoppingcart.length;i++){
        if (!shoppingcart[i].hasOwnProperty('is_gift')) {
            if (shoppingcart[i].id == product_id && undefinedToString(shoppingcart[i].size) == undefinedToString(size) && undefinedToString(shoppingcart[i].color) == undefinedToString(color) && undefinedToString(shoppingcart[i].use_for) == undefinedToString(use_for) ) {
                is_exist = 1;
                shoppingcart[i].amount += parseInt(amount);
            }
        }
    }

    if (is_exist == 0){
        var product = {
            id         : product_id,
            size       : size,
            color      : color ,
            use_for    : use_for,
            amount     : parseInt(amount),
            total      : 0,
            discount   : discount, // for Promotion
            cateid     : cateid,
            price      : price,
            ispackage8 : isPackage8,
            cate_apply : giftCate9,
            brand_10   : brand10
        };
        shoppingcart.push(product);
    }
    localStorage.setItem(key_shoppingCart, JSON.stringify(shoppingcart));

    /** Add Package 12 **/
    var inputRdoPackage = $("input[name=rdoSelect12]").length;
    if (inputRdoPackage != 0) {
        var chooseItem  = $("input[name=rdoSelect12]:checked").val();
        $.ajax({
            "url"  : "/cart/addProductIdPackage12?chooseItem="+chooseItem+'&pid='+product_id,
            "type" : "get",
            "data" : {
                "chooseItem" : chooseItem,
                "pid"        : product_id
            },
            "async"   : false,
            "success" : function(response){
                console.log(response);
            }
        });
    }
    // return false;

    /** Add Package 13 **/
    if (package13 == 1) {
    addPromotionpackage(13,brand10);
    }
    window.location = "/cart/index";
}
function undefinedToString(a){
    if (a == undefined)
        return 'undefined';
    else
        return a;
}
// heart like product=======================
function addFavorite(product_id) {       
    if (login) {
        $('.success_wish_list').hide();
        $('.header-order > .order').css({"display": "none"});
        $('.header-order > .like').css({"display": "none"});
        $(".fa-heart-o").css({"display": "none"});
        $(".fa-heart").css({"display": "block"});
        $(".product-info .like").css({"box-shadow": "inset 0 0 0 1px #ff9000", "border-radius":"23px"});
        try {
            //tracking code Google
            ga('send', 'event', {eventCategory: 'Wish list', eventAction: 'Add'});
        } catch (err) {
            console.log(err);
        }
        $.post('products/addwishlist', {
            ajax: 'yes',
            product_id: encodeURI(product_id)
        }, function (text) {
            $('.success_wish_list').html(text).show();
            // $('.btnAddWL').before('<div class="success_mess" style="display:block;">'+text+'</div>');
            setTimeout(function () {
                $('.success_wish_list').html('').css({"display": "none"});
            }, '5000');
            setTimeout(function () {
                $('.header-order > .order').show();
            }, '5000');
            setTimeout(function () {
                $('.header-order > .like').show();
            }, '5000');
            $('.success_mess').html(text).show();
            // $('.btnAddWL').before('<div class="success_mess" style="display:block;">'+text+'</div>');
            setTimeout(function () {
                $('.success_mess').html('').css({"display": "none"});
            }, '5000');
        });
    } else {
        window.location.href = "/login.html";
    }
}
(function($, window, undefined) {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top -117
                }, 1000);
                return false;
            }
        }
    });
}(jQuery, window));
$(document).ready(function(){
    $("#zoom_03").elevateZoom({
        gallery: 'gallery_01',
        cursor: 'pointer',
        galleryActiveClass: 'active'
    });

    // Zoom Image
    $("#zoom_03").bind("click", function (e) {
        var ez = $('#zoom_03').data('elevateZoom');
        $.fancybox(ez.getGalleryList());
        return false;
    });

    $('#upSL').click(function () {
        var amount = parseInt($('#txtsl').val()) + 1;
        var num = CheckAmount(amount);
        if (num == 0) num = 1;
        $('#txtsl').val(num);
    });
    $('#txtsl').change(function () {
        var amount = parseInt($('#txtsl').val());
        var num = CheckAmount(amount);
        if (num == 0) num = 1;
        $('#txtsl').val(num);
    });
    $('#downSL').click(function () {
        var amount = parseInt($('#txtsl').val()) - 1;
        var num = CheckAmount(amount);
        if (num == 0) num = 1;
        $('#txtsl').val(num);
    });

    // For color
    $('.ColorLink').click(function () {
        $('a.ColorLink').parent().removeClass("active");
        $(this).parent().addClass("active");
        $('#cacheColor').val($(this).attr('rel'));
        $('[data-toggle="tooltip_color"]').tooltip('hide');
        $('[data-toggle="tooltip_color"]').tooltip('disable');
    });
    // For size
    $('.sizeLink').click(function () {
        $('a.sizeLink').parent().removeClass("active");
        $(this).parent().addClass("active");
        $('#cacheSize').val($(this).text());
        $('[data-toggle="tooltip_size"]').tooltip('hide');
        $('[data-toggle="tooltip_size"]').tooltip('disable');
    });
    // For use_for
    $('.UseForLink').click(function () {
        $('a.UseForLink').parent().removeClass('active');
        $(this).parent().addClass("active");
        $('#cacheUseFor').val($(this).attr('rel'));
        $('[data-toggle="tooltip_userfor"]').tooltip('hide');
        $('[data-toggle="tooltip_userfor"]').tooltip('disable');
    });
    $('form.form_reply').each(function () {
        validate_frm_reply('#'+$(this).attr('id'));
    });
});
$(document).on('change', 'select#resizing_select', function () {
    var value = $(this).val();
    $('span#ordercolfee').html(value);
});
