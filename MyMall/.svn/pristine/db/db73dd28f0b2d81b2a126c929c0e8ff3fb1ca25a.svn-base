function get_html_gift_product(pid, image, link, name, price, amount) {
    return '' +
    '<div class="row wrap-gift gpid_'+pid+'">' +
        '<div class="wrap-img-gift">' +
            '<img style="max-width: 46px; max-height:46px;" src="' + image + '" title="Quà tặng miễn phí đi kèm">' +
            '<i class="fa fa-gift" aria-hidden="true" title="Quà tặng miễn phí đi kèm"></i>' +
        '</div>' +
        '<p class="detail"><a title="Quà tặng miễn phí đi kèm" href="' + link + '">' + name + '</a></p>' +
        '<p class="number-gift">' + amount + '</p>' +
        '<p class="price-gift">' + number_format(price * amount, 0, '.', '.') + ' <sup>đ</sup></p>' +
    '</div>';
}
function get_html_gift_product_right(name, amount){
    return '' +
        '<div class="gift">' +
            '<i class="fa fa-gift" aria-hidden="true"></i> <span>'+amount+' X '+name+'</span>' +
        '</div>';
}
$(document).on('click', '.alert_available', function(){
    if ($("#modal_alert_available").attr('id') != 'modal_alert_available') {
        var html = ''+
        '<div class="modal fade" id="modal_alert_available" role="dialog">'+
            '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                    '<button type="button" class="close" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i></button>'+
                    '<i class="fa fa-paper-plane-o " aria-hidden="true"></i>'+
                    '<p class="title">' +
                        '<i class="fa fa-check"></i>Sản phẩm: <span class="msg_product"></span> vừa được thêm vào thông báo khi có hàng.' +
                        '<br>Khi có hàng MyMall sẽ gửi thông báo cho bạn. Cảm ơn bạn đã ủng hộ!' +
                    '</p>'+
                    '<button type="button" class="send">Tiếp tục</button>'+
                '</div>'+
            '</div>'+
        '</div>';

        $( ".container.hascart" ).append(html);
    }
    var msg = decodeURI($(this).attr('data-msg'));
    $('#modal_alert_available .msg_product').html( msg );
    $('#modal_alert_available').modal('show');
});
$(document).on('click', '.show-error-box span.close', function(){
    $(this).closest('div').remove();
});
// function update shopping cart
function updateAmountProductInCart(product_id, product_name, size, color,item_element,use_for){
    resetMyXu();
    // Clear coupon
    $.post('/cart/clear_order_info_ajax');
    $('#coupon_discount').html('-0đ');
    $('#coupon_code').val('');
    $('#coupon_msg').hide();
    $('#total_fee').html('Chưa có');

    //Lấy số lượng amount sẽ update
    var new_amount = parseInt($('#' + item_element).find('input.amount-enter').val());
    //Xử lý khi người dùng nhập tào lao
    new_amount = CheckAmount(new_amount);
    $('#' + item_element).find('input.amount-enter').val(new_amount);

    //Lưu localstorage trước
    var key_shoppingCart = 'spcart';
    var shoppingcart = [];
    if (localStorage.getItem(key_shoppingCart) != null){
        shoppingcart = JSON.parse(localStorage.getItem(key_shoppingCart));
    }
    var mainProduct = null,discount_product = 0; // use for clear promotion if amount is 0
    for(var i=0;i<shoppingcart.length;i++){
        /**
         * Check exists for gifts
         */
        if (shoppingcart[i].id == product_id
            && undefinedToString(shoppingcart[i].size) == undefinedToString(size)
            && undefinedToString(shoppingcart[i].use_for) == undefinedToString(use_for)
            && undefinedToString(shoppingcart[i].color) == undefinedToString(color)
            && shoppingcart[i].hasOwnProperty('is_gift') == false
        ) {
            // xử lý vé xem phim voi id = x?
            if (new_amount != 0){
                if (!shoppingcart[i].hasOwnProperty('is_gift')) {
                    shoppingcart[i].amount = new_amount;
                    break;
                }
            } else {
                mainProduct = shoppingcart[i];
                //Remove item này nếu số lượng bằng 0
                shoppingcart.splice(i,1);
                break;
            }
        }
    }
    localStorage.setItem(key_shoppingCart, JSON.stringify(shoppingcart));
    ShowShoppingCart();
}
function undefinedToString(a){
    if (a == undefined)
        return 'undefined';
    else
        return a;
}
function saveTotalTmpToSess(param) {
    $.get(base_url+"my_xu/setSessTmpTotal?currentprice="+param,function(response){
        // console.log(response);
    });
}
function checkCoupon_ajax(){
    $('div.loading').show();

    var coupon_code = $('#coupon_code').val();
    if(coupon_code.length > 0){

        $('#btn_checkCoupon').prop("disabled",true);

        var shoppingcart = [];
        if (localStorage.getItem('spcart') != null){
            shoppingcart = JSON.parse(localStorage.getItem('spcart'));
        }

        $.post("/cart/checkCoupon_ajax", {
            coupon_code     : encodeURI(JSON.stringify(coupon_code)),
            shoppingcart    : encodeURI(JSON.stringify(shoppingcart))
        }, function(data){
            data = JSON.parse(data);

            if(data.coupon_id){
                if(data.coupon_type == 'fee'){
                    $('#coupon_discount').html('-'+ number_format(data.coupon_discount,0,'.','.') + 'đ');
                    $('#total_fee').html('Miễn phí');
                } else {

                    $('#coupon_discount').html('-'+ number_format(data.coupon_discount,0,'.','.') + 'đ');

                    var tmp_total = parseInt(data.tmp_total) - parseInt(data.coupon_discount);
                    saveTotalTmpToSess(tmp_total);
                    tmp_total = parseInt(tmp_total) - parseInt(resultDiscoutXu());
                    $('#tmp_total').html(number_format(tmp_total,0,'.','.') + 'đ');
                    $('#total_fee').html('Chưa có');
                }

                $('#coupon_msg').html(data.msg).show();
            } else {

                $('#coupon_discount').html('-'+ number_format(data.coupon_discount,0,'.','.') + 'đ');
                var tmp_total = parseInt(data.tmp_total) - parseInt(data.coupon_discount);
                saveTotalTmpToSess(tmp_total);
                tmp_total = parseInt(tmp_total) - parseInt(resultDiscoutXu());
                $('#tmp_total').html(number_format(tmp_total,0,'.','.') + 'đ');
                $('#total_fee').html('Chưa có');

                $('#coupon_msg').html(data.msg).show();
            }
        });

        $('#btn_checkCoupon').prop("disabled",false);
    }

    $('div.loading').hide();

}
function init_cart_payment_login_yes() {
    $(document).on('click','.edit-address', function(){
        var gid = $(this).attr('data-gid');
        $('#city_'+gid).trigger('change');
    });
    
    $(document).on('change','.address-form .city select',function(){
        select_tmp = $(this).parent().parent('.address-form').children('.district-ward').children('.district').children('select.form-control');
        $(this).parent().parent('.address-form').children('.district-ward').children('.village').children('select.form-control').html('<option>Chọn Phường/Xã</option>');
        city_id = $(this).val();
        var gid = $(this).attr('data-gid');
        option = $('option:selected', this).text();
        $('#city_name_'+gid).val(option);
        var d_val = $('#district_'+gid).attr('data-value');
        $.ajax({
            type:'post',
            data:{city_id:city_id},
            //url : '/cart/ajax_getDistrict',
            url : '/cart/ajax_district',
            dataType:'json',
            success:function(d){
                html = '<option value="">Chọn Quận/Huyện</option>';
                if(Object.keys(d).length>0){
                    $.each(d,function(key,value){
                        html += '<option value="'+value.district_id+'" dis-type="'+value.type+'" >'+value.district_name+'</option>';
                    });
                }
                else{
                    html += '<option value="0">Không có</option>';
                }
                if (gid) {
                    $('#district_' + gid).html(html).val(d_val).trigger('change');
                } else {                                  
                    select_tmp.html(html);
                }
            }
        });
    });
    
    $(document).on('change','.address-form .district select',function(){
        select_tmp = $(this).parent().parent('.district-ward').children('.village').children('select.form-control');
        district_id = $(this).val();
        var gid = $(this).attr('data-delivery');
        var w_val = $('#ward_' + gid).attr('data-value');
        option = $('option:selected', this).attr('dis-type');
        $('#district_type_'+gid).val(option);
        $('#district_name_'+gid).val($('option:selected', this).text());
        $.ajax({
            type:'post',
            data:{district_id:district_id},
            //url : '/cart/ajax_getWard',
            url : '/cart/ajax_ward',
            dataType: 'json',
            success:function(d){
                html = '<option value="">Chọn Phường/Xã</option>';
                if(Object.keys(d).length>0){
                    $.each(d,function(key,value){
                        html += '<option value="'+value.ward_id+'" ward-type="'+value.type+'" >'+value.ward_name+'</option>';
                    });
                }
                else{
                    html += '<option value="0">Không có</option>';
                }
                if(gid){                
                    $('#ward_'+gid).html(html).val(w_val).trigger('change');
                }else{
                    select_tmp.html(html);
                }              
            }
        });
    });

    $(document).on('change','.address-form .village select',function(){
        var gid = $(this).attr('data-delivery');
        option = $('option:selected', this).attr('ward-type');
        $('#ward_type_'+gid).val(option);
        $('#ward_name_'+gid).val($('option:selected', this).text());
    });

    $('.form-address .address-form').hide();
    $(document).on('click','.edit-address',function(){
        $(this).parent('li').children('.address-form').show(400);
    });
    $(document).on('click','.cancel-plus',function(){
        $(this).parent().parent().hide(400);
        $("#other-address").slideUp("fast");
        $(".other-address").show();
        return false;
    });
}
function init_cart_payment_login_no(){
        // get distrects
    $('#form-address .city select').change(function(){
      $('#form-address .district-ward .village select.form-control').html('<option>Chọn Phường/Xã</option>');
      city_id = $(this).val();
      $.ajax({
        type:'post',
        data:{city_id:city_id},
        url : '/cart/ajax_getDistrict',
        success:function(d){
        $('#form-address .district-ward .district select').html(d);
        }
      });
    });

    $('#form-address .district select').change(function(){
      district_id = $(this).val();
      $.ajax({
        type:'post',
        data:{district_id:district_id},
        url : '/cart/ajax_getWard',
        success:function(d){
          $('#form-address .district-ward .village select.form-control').html(d);
        }
      });
    });

    $('#form-address').validate({  
        rules: {
            name: {
                required: true,
                maxlength: 50
            },
            phone: {
                required: true,
                minlength: 10,
                number: true,
                maxlength:11
            },
            email: {
                required : true
            },
            city: {
                required: true,
            },
            district: {
                required: true,
            },
            wards: {
                required: true,
            },
            street:{
              required:true,
            }
        },
        messages: {
            name: {
                required: 'Vui lòng nhập họ tên',
                maxlength:'Vui lòng không nhập quá 50 ký tự'
            },
            phone: {
                required: 'Vui lòng nhập số điện thoại',
                number: 'Số điện thoại phải là số',
                minlength: 'Số điện thoại phải là 10 - 11 số',
                maxlength: 'Số điện thoại phải là 10 - 11 số'
            },
            email: {
                required : 'Vui lòng nhập email',
                email : 'Email sai định dạng'
            },
            city: {
                required: 'Vui lòng chọn Tỉnh/Thành phố',
            },
            district: {
                required: 'Vui lòng chọn Quận/Huyện',
            },
            wards: {
                required: 'Vui lòng chọn Phường/Xã',
            },
            street:{
              required: 'Vui lòng nhập tên đường, số nhà...'
            }
        },
        submitHandler: function(form) {
            $.ajax({
                url: '/cart/ajax_delivery',
                type: 'post',
                data: $(form).serialize(),
                dataType: 'json',
                success: function(response) {
                    console.log(response);
                    if(response.result == 1){                        
                        location.reload();
                    }else{
                        malert(response.msg);
                    }
                    //console.log(response);               
                }            
            });
        }
    });
}

function init_cart_payment_register(){
    $('.frm-register').validate({
        errorElement: "p",
        rules: {
            txtName: {
                required :true,
            },
            email:{
                required: true,
                remote   : {
                    ajax: 'yes',
                    'url'  : "/check-email",
                    'type' : "post",
                    'dataType': "json",
                    'data'    : {
                        txtEmail : function() {
                            return $("#txtEmail").val();
                        }

                    }
                }
            },
            password: {
              required: !0,
              minlength: 6,
              maxlength: 20
            },
            rePassword: {
              required: !0,
              equalTo: "#textPassword"
            },
            agree:{
                required: true,
            }
        },
        messages: {
            txtName: {
                required: 'Vui lòng nhập họ tên',
            },
            email:{
                required: 'Bạn cần phải nhập email',
                email : 'Email sai định dạng',
                remote   : 'Email này đã được sử dụng !',
            },
            password: {
                required: "Vui lòng nhập mật khẩu!",
                minlength: "Mật khẩu ít nhất 6 kí tự !",
                maxlength: "Mật khẩu tối đa 20 kí tự !"                
            },
            rePassword: {
                required: "Vui lòng nhập lại mật khẩu!",
                equalTo: "Mật khẩu nhập lại không đúng !",
            },
            agree:{
                required: 'Bạn cần phải đồng ý với Điều khoản sử dụng của myMall.',
            }
        },
        submitHandler:function(form){
            $('#td-register div.error').remove();
            $.post('/cart/register',$(form).serialize(),function(d){
                if(d.result == 1){
                    //Thành công
                    location.reload();
                }else{
                    //Thất bại
                    $('#td-register h2').after('<div class="error">'+d.msg+'</div>');
                } 
            },'json');
        }
    });
}

function init_cart_payment() {
    // get shopping cart from local storage.
    var shoppingcart = [];
    if (localStorage.getItem('spcart') != null){
        shoppingcart = JSON.parse(localStorage.getItem('spcart'));
    }
    // Set shoppingcart to from for submit
    $('#shoppingcart').val(encodeURI(JSON.stringify(shoppingcart)));

    $("#payment_1").click(function(){
        getTotalFee_ajax(1);
        $("#id_payment").val(1);
        $("#payment_1").addClass("active");

        $("#payment_6").removeClass("active");
        $("#payment_13").removeClass("active");
        $("#payment_14").removeClass("active");
        $("#payment_15").removeClass("active");
    });

    $("#payment_13").click(function(){
        getTotalFee_ajax(13);
        $("#id_payment").val(13);
        $("#payment_13").addClass("active");

        $("#payment_1").removeClass("active");
        $("#payment_6").removeClass("active");
        $("#payment_14").removeClass("active");
        $("#payment_15").removeClass("active");
    });

    $("#payment_6").click(function(){
        getTotalFee_ajax(6);
        $("#id_payment").val(6);
        $("#payment_6").addClass("active");

        $("#payment_1").removeClass("active");
        $("#payment_13").removeClass("active");
        $("#payment_14").removeClass("active");
        $("#payment_15").removeClass("active");
    });

    $("#payment_14").click(function(){
        getTotalFee_ajax(14);
        $("#id_payment").val(14);
        $("#payment_14").addClass("active");

        $("#payment_1").removeClass("active");
        $("#payment_6").removeClass("active");
        $("#payment_13").removeClass("active");
        $("#payment_15").removeClass("active");
    });

    $("#payment_15").click(function(){
        getTotalFee_ajax(15);
        $("#id_payment").val(15);
        $("#payment_15").addClass("active");

        $("#payment_1").removeClass("active");
        $("#payment_6").removeClass("active");
        $("#payment_13").removeClass("active");
        $("#payment_14").removeClass("active");
    });
    $('.btn-cart-login-no,#td-register .back').on('click', function(){
        $('#td-login').hide();
        $('#td-login-no').show();
        $('#td-register').hide();
    });
    $('.btn-cart-login,#td-register .login').on('click', function(){
        $('#td-login').show();
        $('#td-login-no').hide();
        $('#td-register').hide();
    });
    $('#td-login a.register').click(function(){
        $('#td-register').show();
        $('#td-login').hide();
        $('#td-login-no').hide(); 
        return false;
    });
    $(document).on('click', '.id_delivery', function(){
        $('#id_delivery-error').remove();
        $('#id_delivery').val($(this).val());
        getTotalFee_ajax();
    })

    $('form#cartpayment').validate({
        debug: true,
        ignore: "",
        errorElement: 'p',
          invalidHandler: function(event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
            if (errors) {        
                if(errors == 1){
                    $('html, body').animate({
                        scrollTop: 0
                    }, 400);
                }                  
            }
          },
        //   showErrors: function (errorMap, errorList) {
        //       // errorList[0].element; // <- index "0" is the first element with an error
        //       alert(1);
        //       console.log(errorList);
        //       if (typeof errorList[0] != "undefined") {
        //           var position = $(errorList[0].element).offset().top;
        //           alert(position);
        //           $('html, body').animate({
        //               scrollTop: position
        //           }, 300);
        //       }
        //       this.defaultShowErrors(); // keep error messages next to each input element   
        // },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "id_delivery" ) {
                $("#td_id_delivery").find('.error').remove();
                $("#td_id_delivery").append(error);
            }
            else if (element.attr("name") == "id_payment" ) {
                $("#td_id_payment").find('.error').remove();
                $("#td_id_payment").append(error);
            }
            else if (element.attr("name") == "vat_name" ) {                
                $("#div_vat_name").find('.error').remove();
                $("#div_vat_name").append(error);
            }
            else if (element.attr("name") == "vat_code" ) {
                $("#div_vat_code").find('.error').remove();
                $("#div_vat_code").append(error);
            }
            else if (element.attr("name") == "vat_address" ) {
                $("#div_vat_address").find('.error').remove();
                $("#div_vat_address").append(error);
            }
            else {
                 error.append($('.errorTxt span'));
            }
        },
        success: function(label,element) {
            label.parent().removeClass('error');
            label.remove();
        },
        rules: {
            id_delivery: {
                required: true,
            },
            id_payment: {
                required: true
            }
        },
        messages: {
            id_delivery: {
                required: $('#td_id_delivery').attr('data-title'),
            },
            id_payment: {
                required: 'Vui lòng nhập số điện thoại',
            },
            vat_name: {
                required: 'Vui lòng nhập Tên công ty',
            },
            vat_code: {
                required: 'Vui lòng nhập Mã số thuế',
            },
            vat_address: {
                required: 'Vui lòng nhập Địa chỉ công ty',
            },
        },
        submitHandler: function(form) {
            if(isoffProductCart() == true) {
                window.location.href = '/cart/index';
            } else {                
                form.submit(); 
            }
            return false;
        }
    });

    $('#is_vat').on('click', function() {
        var action = $(this).is(':checked') ? "add" : "remove";
        $('#VAT-info .error').remove();
        $('#value_vat').val($(this).is(':checked') ? 1 : 0);

        $('input[name="vat_name"]').rules(action, "required");
        $('input[name="vat_code"]').rules(action, "required");
        $('input[name="vat_address"]').rules(action, "required");
    });

    $('.input_vat').on('change', function() {
        $($(this).attr('data-target')).val($(this).val()).valid();
    });    
}

function getTotalFee_ajax(user_payment)
{
    $.post("/cart/getTotalFee_ajax", {
        shoppingcart    : $('#shoppingcart').val(),
        user_payment    : encodeURI(JSON.stringify(user_payment)),
    }, function(data) {
        // var data = JSON.parse(data);
        console.log(data);
        var isfree = '';

        if (package1) {

            var total_dis = $('input[name=valuedis]').val();
            isfree = IsFreeShipping(total_dis);

        }
        
        if (isfree!="true") { //if set package doesn't free shipping
            if(data != 'coupon_fee') {
                var tmp_total  = parseInt(data.total_order) + parseInt(data.transport_fee);
              
                /**
                * Description get value discount MyXu
                * @author wallace.hao
                * @date   20.4.2016
                */
                var discountXu = resultDiscoutXu();
                    tmp_total  = parseInt(tmp_total) - parseInt(discountXu);
                $('#total_fee').text('+' + number_format(data.transport_fee,0,'.','.') + 'đ');
                $('#tmp_total').html(number_format(tmp_total,0,'.','.') + 'đ');
                ga('ec:setAction', 'purchase', {
                    'id': '0',
                    'affiliation': '',
                    'revenue': '',
                    'tax': '',
                    'shipping': number_format(data.transport_fee, ".", ","),
                    'coupon': ''
                });
            }
        } else {
            $.ajax({
                "url"     : "/cart/checkFreeShipping",
                "type"    : "post",
                "data"    : {"isfreeshipping":1},
                "success" : function(response) {
                    if (response == 'done'){
                        $('#total_fee').text('Miễn phí');
                        ga('ec:setAction', 'purchase', {
                            'id': '0',
                            'affiliation': '',
                            'revenue': '',
                            'tax': '',
                            'shipping': 0,
                            'coupon': ''
                        });
                    }
                }
            });
        }
    }, 'json');
}

function clear_localStorage () {
    
    // remove item in cart
    localStorage.removeItem('spcart');
}
function isoffProductCart() {
    var shoppingcart = [];
    if (localStorage.getItem('spcart') != null){
        shoppingcart = JSON.parse(localStorage.getItem('spcart'));
    }
    var result = false;
    $.ajax({
        'url'     : encodeURI('/products/getlistproductorder/'),
        'type'    : 'POST',
        'async' : false,
        'data'    : 'order_info=' + JSON.stringify(shoppingcart),
        'success': function (data) {
            var obj  = JSON.parse(data);
            var cart = obj.products;
            for (var j=0;j<shoppingcart.length;j++) {
                for (var i=0;i<cart.length;i++) {
                    if (shoppingcart[j].hasOwnProperty('is_gift') == false) {
                        if ((shoppingcart[j].id == cart[i].product_id) && cart[i].product_count == 0) {
                            result= true;
                            break;
                        }
                        if ((shoppingcart[j].id == cart[i].product_id) && (shoppingcart[j].amount > cart[i].product_count)) {
                            result= true;
                            break;
                        }
                    }
                }
            }
        }
    });
    return result;
}
/**
 * @function CheckAmount
 * @params number
 */
function CheckAmount(num) {
    if (isNaN(num) || num=='0') return 0;

    var result = num;

    if (num=="" || num > 20 || num < 0) result  = 1;

    return result;
}
function html_error(message, mclass) {
    mclass = mclass || '';
    return '' +
    '<div class="show-error-box '+mclass+'">' +
        '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>' +
        '<p class="nomal">'+message+'</p>' +
        '<span class="close"><i class="fa fa-times" aria-hidden="true"></i></span>' +
    '</div>';
}
/**
 * @function html_gift step 1
 * @return html gift for order
 */
function html_gift() {
    return '' +
    '<div id="reponse_gift_order" class="gift-all-product" style="display: none;">' +
        '<div class="row">' +
            '<div class="col-md-12 title-qtk">' +
                '<label><i class="fa fa-gift" aria-hidden="true"></i>Quà tặng miễn phí đính kèm</label>' +
            '</div>' +
        '</div>' +
    '</div><!-- end gift for all -->';
}
function get_item_gift_right(image, link, name, amount) {
    return ''+
    '<ul class="infor-product">' +
        '<li class="infor1">' +
            '<div class="wrap-img">' +
                '<img src="'+image+'" alt="' + name + '" alt="">' +
            '</div>' +
            '<div class="infor-detail">' +
                '<a class="title" href="' + link + '">' + name + '</a>' +
            '</div>' +
        '</li>' +
        '<li class="infor2">x ' + amount + '</li>' +
        '<li class="infor3">' +
            '<p>0<sup>đ</sup></p>' +
        '</li>' +
    '</ul>';
}
function get_item_gift(image, link, name, amount, price) {
    return ''+
    '<div class="row gift-order">'+
        '<div class="col-md-7 gift-title">'+
            '<div class="wrap-img">'+
                '<img src="'+image+'" alt="">'+
            '</div>'+
            '<div class="descript">'+
                '<a href="'+link+'" class="title" title="">'+name+'</a>'+
            '</div>'+
        '</div>'+
        '<div class="col-md-2 gift-number">'+
            '<input type="number" class="number-cart" value="'+amount+'">'+
        '</div>'+
        '<div class="col-md-1 price">'+
            '<p>'+price+'đ</p>'+
        '</div>'+
        '<div class="col-md-2 money">'+
            '<p>0đ</p>'+
        '</div>'+
    '</div>';
}
/**
 * @function CheckProductCount
 * @for step 3 if not enough products,auto remove it from cart
 */
function CheckProductCount() {
    var shoppingcart = [];
    if (localStorage.getItem('spcart')!=null) {
        shoppingcart = JSON.parse(localStorage.getItem('spcart'));
    }
    var id_clear = new Array();
    var count_remove  = 0;
    $.ajax({
        "url"     : encodeURI('/products/getlistproductorder/'),
        "type"    : "post",
        "data"    : "order_info=" + JSON.stringify(shoppingcart),
        "async"   : false,
        "success" : function(data){
            data = JSON.parse(data);
            data = data.products;
            if (data.length > 0) {
                for (var i=0;i<data.length;i++) {
                    for (var j=0;j<data.length;j++) {
                        if (!shoppingcart[i].hasOwnProperty('is_gift')) {
                            if (shoppingcart[i].id == data[j].product_id) {
                                if (data[j].product_count == 0) {
                                    id_clear[count_remove] = data[j].product_id;
                                    count_remove++;
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    var is_remove = false;
    var promotion = [], main_product=[],count_main = 0,count =0;
    // Find cart and promotion
    for (var i=0;i<shoppingcart.length;i++) {
        if (shoppingcart[i].hasOwnProperty("is_gift")) {
            for (var j=0;j<id_clear.length;j++) {
                if (shoppingcart[i].is_apply == id_clear[j]) {
                    promotion[count] = shoppingcart[i];
                    count++;
                }
            }
        } else {
            if (jQuery.inArray(shoppingcart[i].id,id_clear) !== -1) {
                main_product[count_main] = shoppingcart[i];
                count_main++;
            }
        }
    }
    // Clear Gift
    for (var i=0;i<shoppingcart.length;i++){
        for (var j=0;j<promotion.length;j++) {
            if (promotion[j].is_apply == shoppingcart[i].is_apply) {
                shoppingcart.splice(i,count);
                is_remove = true;
            }
        }
    }
    // Clear Main Product
    for (var i=0;i<shoppingcart.length;i++){
        for (var j=0;j<main_product.length;j++) {
            if (main_product[j].id == shoppingcart[i].id) {
                shoppingcart.splice(i,count_main);
                is_remove = true;
            }
        }
    }
    if(is_remove) localStorage.setItem("spcart",JSON.stringify(shoppingcart));
}

function create_html_delivery(d,cities,name,value){
    html = '<li class="first first_" id="lidelivery_'+d.id+'">'+
            '<div class="edit-address" data-gid="'+d.id+'">'+
            '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>'+
            '<span> Sửa địa chỉ</span></div>'+
            '<input type="radio" name="defaut" class="id_delivery" value="'+d.id+'" >'+
            '<label class="name">'+d.name+'</label>'+
            '<p class="ad address">'+d.street+', '+d.ward_type+' '+d.ward_name+', '+d.district_type+' '+
            d.district_name+', '+d.city_name+
            '</p>'+
            '<p class="ad pphone">Đt: '+d.phone+'</p>'+
            '<form class="address-form" method="post" action="" id="frm_'+d.id+'" >'+
                '<div class="form-group ">'+
                  '<label>Họ tên người nhận hàng</label>'+
                  '<div class="row">'+
                    '<select class="form-control gender" name="gender">';
                    if(0 == d.gender) {
                        html += '<option value="0" selected>Nam</option>';
                        html += '<option value="1">Nữ</option>';
                    }
                    else{
                        html += '<option value="0">Nam</option>';
                        html += '<option value="1" selected>Nữ</option>';
                    }
                html += '</select>'+
                    '<input type="text" placeholder="VD: Nguyễn Văn A" name="name" value="'+d.name+'"></input>'+
                  '</div>'+
                '</div>'+
                '<div class="form-group row col-md-12">'+
                  '<div class="input-phone col-md-6">'+
                    '<label>Điện thoại</label>'+
                    '<input type="text" class="numeric" placeholder="Vd: 01234567899" name="phone" value="'+d.phone+'"></input>'+
                  '</div>'+
                  '<div class="input-email col-md-6">'+
                    '<label>Email <span>(để gửi thông tin đơn hàng)</span></label>'+
                    '<input type="email" placeholder="Vd: nguyenvanan@gmail.com" name="email" value="'+d.email+'"></input>'+
                  '</div>'+
                '</div>'+
                '<div class="form-group row city">'+
                  '<label>Địa chỉ</label>'+
                  '<select class="form-control" name="city" id="city_'+d.id+'" data-gid="'+d.id+'">'+
                    '<option value="">Chọn Tỉnh/Thành Phố</option>';
                    $.each(cities, function(key,value){
                        if(value.city_id == d.id_city){
                            html += '<option value="'+value.city_id+'" selected>'+value.city_name+'</option>';
                        }else{
                            html += '<option value="'+value.city_id+'">'+value.city_name+'</option>';
                        }
                    });                                                                    
                html += '</select>'+
                '<input type="hidden" name="city_name" id="city_name_'+d.id+'" >'+
                '</div>'+
                '<div class="form-group row district-ward">'+
                  '<div class="district">'+
                    '<select class="form-control" name="district" data-value="'+d.id_district+'" id="district_'+d.id+'" data-delivery="'+d.id+'">'+
                    '<option>Chọn Quận/Huyện </option>'+
                    '</select>'+
                    '<input type="hidden" name="district_type" id="district_type_'+d.id+'" >'+
                    '<input type="hidden" name="district_name" id="district_name_'+d.id+'" >'+
                  '</div>'+
                  '<div class="village">'+
                    '<select class="form-control" name="wards" data-value="'+d.id_ward+'" id="ward_'+d.id+'" data-delivery="'+d.id+'" >'+
                     '<option>Chọn Phường/Xã </option>'+
                    '</select>'+
                    '<input type="hidden" name="ward_type" id="ward_type_'+d.id+'" >'+
                    '<input type="hidden" name="ward_name" id="ward_name_'+d.id+'" >'+
                  '</div>'+
                '</div>'+
                '<div class="form-group row">'+
                  '<input type="text" class="street" placeholder="Đường/ Phố, số nhà, ngõ ngách, hẻm..." name="street" value="'+d.street+'"></input>'+
                '</div>'+
                '<input type="hidden" class="check" name="'+name+'" value="'+value+'">'+
                '<input type="hidden" name="deliveryId" value="'+d.id+'">'+
                '<button class="continue" type="submit" value="continue">Tiếp tục</button>'+
                '<span class="cancel-continue"><a href="#" class="cancel-plus">Hủy bỏ</a></span>'+
            '</form>'+            
        '</li>';
    return html;
}

function cart_payment_form_delivery_login(cities){
    $('.address-form').each(function() {
        $(this).validate({  
        rules: {
            name: {
                required: true,
                maxlength: 50
            },
            phone: {
                required: true,
                minlength: 10,
                number: true,
                maxlength: 11,
                digits: true
            },
            email: {
                required : true
            },
            city: {
                required: true,
            },
            district: {
                required: true,
            },
            wards: {
                required: true,
            },
            street:{
              required:true,
            }
        },
        messages: {
            name: {
                required: 'Vui lòng nhập họ tên',
                maxlength: 'Vui lòng không nhập quá 50 ký tự'
            },
            phone: {
                required: 'Vui lòng nhập số điện thoại',
                number: 'Số điện thoại phải là số',
                minlength: 'Số điện thoại phải là 10 - 11 số',
                maxlength: 'Số điện thoại phải là 10 - 11 số',
            },
            email: {
                required : 'Vui lòng nhập email',
                email : 'Email sai định dạng'
            },
            city: {
                required: 'Vui lòng chọn Tỉnh/Thành phố',
            },
            district: {
                required: 'Vui lòng chọn Quận/Huyện',
            },
            wards: {
                required: 'Vui lòng chọn Phường/Xã',
            },
            street:{
              required: 'Vui lòng nhập tên đường, số nhà...'
            }
        },
        submitHandler: function(form) {
            $.post('/cart/ajax_address_login', $(form).serialize(), 
                function(response) {
                    $('input.check').attr('name',response.name);
                    $('input.check').val(response.value);                
                    console.log(response.result); 
                    console.log(response);  
                    var data = {};
                    $(form).serializeArray().map(function(x){data[x.name] = x.value;}); 
                    console.log(data);                    
                    if(response.result == 1){
                        //cập nhật thành công                              
                        $(form).slideUp("slow");
                        $('#district_'+data.deliveryId).attr('data-value',data.district);                       
                        $('#ward_'+data.deliveryId).attr('data-value',data.wards);
                        $('#lidelivery_'+data.deliveryId+' .name').html(data.name);
                        $('#lidelivery_'+data.deliveryId+' .address').html(data.street+', '+data.ward_type+' '+data.ward_name+', '+data.district_type+' '+
            data.district_name+', '+data.city_name);
                        $('#lidelivery_'+data.deliveryId+' .pphone').html(data.phone);                          
                        $('#lidelivery_'+data.deliveryId+' input[type="radio"]').trigger('click');
                        $('#id_delivery').val(data.deliveryId);
                    }else if(response.result == 2){
                        //Thêm thành công
                        console.log(data);
                        $(form)[0].reset();
                        $(form).slideUp("slow");
                        $("#click-add").show();
                        var data_del = {};
                        data_del.id             =   response.deliveryId;
                        data.id_user            =   response.id_user; 
                        data_del.id_city        =   data.city;
                        data_del.id_district    =   data.district;
                        data_del.id_ward        =   data.wards;
                        data_del.email          =   data.email;
                        data_del.name           =   data.name;
                        data_del.phone          =   data.phone;
                        data_del.street         =   data.street;
                        data_del.gender         =   data.gender;
                        data_del.city_name      =   data.city_name;
                        data_del.district_type  =   data.district_type;
                        data_del.ward_type      =   data.ward_type;
                        data_del.ward_name      =   data.ward_name;
                        data_del.district_name  =   data.district_name;
                        console.log(data_del);
                        html = create_html_delivery(data_del,cities,response.name,response.value);
                        
                        if($('td.form-address ul.radio-form li').length>0){
                            
                            $('td.form-address ul.radio-form li').first().after(html);                            

                        }else{
                            
                            $('td.form-address ul.radio-form').prepend(html);
                            
                        } 
                        $('#lidelivery_'+response.deliveryId+' form.address-form').hide();
                        if($('td.form-address ul.radio-form li').length>3){
                            $('td.form-address ul.radio-form li').last().remove();
                        }       
                        
                        $('#lidelivery_'+response.deliveryId+' input[type="radio"]').trigger('click');
                        $('#id_delivery').val(response.deliveryId);
                        // data_validate = {};
                        // data_validate.id = response.deliveryId;
                        // data_validate.cities={};
                        // data_validate.cities = cities;
                        validate_form_delivery('#frm_'+response.deliveryId);
                    }else{
                        malert('Đã xảy ra lỗi, hãy thử lại');
                    }            
                }, 
            'json');
            return false;
        }
      });
    });
}
function validate_form_delivery(frm){
    // frm = '#frm_'+data.id;
    // cities = data.cities;
    // console.log(frm);
    // console.log(cities);
    $(frm).validate({  
        rules: {
            name: {
                required: true,
                maxlength:50
            },
            phone: {
                required: true,
                minlength: 10,
                number: true,
                maxlength:11,
                digits: true
            },
            email: {
                required : true
            },
            city: {
                required: true,
            },
            district: {
                required: true,
            },
            wards: {
                required: true,
            },
            street:{
              required:true,
            }
        },
        messages: {
            name: {
                required: 'Vui lòng nhập họ tên',
                maxlength: 'Vui lòng không nhập quá 50 ký tự'
            },
            phone: {
                required: 'Vui lòng nhập số điện thoại',
                number: 'Số điện thoại phải là số',
                minlength: 'Số điện thoại phải là 10 - 11 số',
                maxlength: 'Số điện thoại phải là 10 - 11 số'
            },
            email: {
                required : 'Vui lòng nhập email',
                email : 'Email sai định dạng'
            },
            city: {
                required: 'Vui lòng chọn Tỉnh/Thành phố',
            },
            district: {
                required: 'Vui lòng chọn Quận/Huyện',
            },
            wards: {
                required: 'Vui lòng chọn Phường/Xã',
            },
            street:{
              required: 'Vui lòng nhập tên đường, số nhà...'
            }
        },
        submitHandler: function(form) {
            $.post('/cart/ajax_address_login', $(form).serialize(), 
                function(response) {
                    $('input.check').attr('name',response.name);
                    $('input.check').val(response.value);                
                    console.log(response.result); 
                    console.log(response);  
                    var data = {};
                    $(form).serializeArray().map(function(x){data[x.name] = x.value;}); 
                    console.log(data);
                    if(response.result == 1){                                                
                        $(form).slideUp("slow");
                        $('#district_'+data.deliveryId).attr('data-value',data.district);                       
                        $('#ward_'+data.deliveryId).attr('data-value',data.wards);
                        $('#lidelivery_'+data.deliveryId+' .name').html(data.name);
                        $('#lidelivery_'+data.deliveryId+' .address').html(data.street+', '+data.ward_type+' '+data.ward_name+', '+data.district_type+' '+
            data.district_name+', '+data.city_name);
                        $('#lidelivery_'+data.deliveryId+' .pphone').html(data.phone);    
                        $('#lidelivery_'+data.deliveryId+' input[type="radio"]').trigger('click');
                        $('#id_delivery').val(data.deliveryId);
                    }else{
                        malert('Đã xảy ra lỗi, hãy thử lại');
                    }            
                }, 
            'json');
            return false;
        }
    });
}

$(document).on('keypress','.numeric', function(event){
    if (!event.which || (48 <= event.which && event.which <= 57) ) { 
        return;
    } else {
        event.preventDefault();
    }
});
