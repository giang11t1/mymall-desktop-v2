function number_format(e, t, n, i) {
    e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
    var a = isFinite(+e) ? +e : 0,
        r = isFinite(+t) ? Math.abs(t) : 0,
        s = "undefined" == typeof i ? "," : i,
        o = "undefined" == typeof n ? "." : n,
        l = "",
        u = function(e, t) {
            var n = Math.pow(10, t);
            return "" + (Math.round(e * n) / n).toFixed(t)
        };
    return l = (r ? u(a, r) : "" + Math.round(a)).split("."), l[0].length > 3 && (l[0] = l[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, s)), (l[1] || "").length < r && (l[1] = l[1] || "", l[1] += new Array(r - l[1].length + 1).join("0")), l.join(o)
}
function keyupFunction() {
    var str = $("#input-search").val();
    if(str!=''){
        document.getElementById("show-result").style.display = "block";
    }else {
        document.getElementById("show-result").style.display = "none";
    }
}
function malert(msg, title, callback, sbcallback) {
    title = title || 'Thông báo';
    callback = callback || function (e) {};

    if (jQuery("#modal_alert").attr('id') != 'modal_alert') {
        var html = ''+
            '<div class="modal fade" id="modal_alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title" id="myModalLabel">Thông báo</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>Thành công!</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-success">Đồng ý</button>' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Thoát</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        jQuery( "body" ).append(html); 
    }
    $("#modal_alert .btn-success").unbind( "click" );
    if (sbcallback) {
        $("#modal_alert .modal-footer").show();
        $("#modal_alert .btn-success").bind( "click", sbcallback );
    } else {
        $("#modal_alert .modal-footer").hide();
    }

    jQuery("#myModalLabel").html(title);
    jQuery("#modal_alert .modal-body").html('<p>'+msg+'</p>');

    jQuery('#modal_alert').modal('show');
    jQuery('#modal_alert').on('hidden.bs.modal', callback);
}

function readURL(input) {
	if (input.files && input.files[0]) {
	  	var reader = new FileReader();

	  	reader.onload = function (e) {
	  		$('#blah').attr('src', e.target.result)
		    	.width(150)
		    	.height(200);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function init_account_info() {
    $('.birth-date').datepicker({});

    $('input[type="file"]').change(function(e) {
      var fileName = e.target.files[0].name;
      if(fileName!=""){
        $(".upload_img").hide();
        $(".update_img").show();
      }
      else {
        $(".upload_img").show();
        $(".update_img").hide();
      }
    });

    $('#male').click(function(){
      $(this).attr('class','active-btn');
      $('#female').attr('class','');
      
      $('#gender_value').val($(this).attr('value'));
    });

    $('#female').click(function(){
      $(this).attr('class','active-btn');
      $('#male').attr('class','');

      $('#gender_value').val($(this).attr('value'));
    });
    $('#txtEmail').keyup(function(){
      $('#Email-error').remove();
    });
    $('form.account-information').validate({
      errorElement: 'p',
      rules: {
          txtName: {
              required: true,
              maxlength: 50
          },
          BirthDate: {
              required: true,
          },
          txtPhone: {
              required : true,
              number: true,
              minlength: 10, 
              maxlength:11,             
          },
          txtEmail: {
              required: true,
              remote: {
                url: "/profile/ajaxCheckEmail",
                type: "post",
                complete:function(d){
                  console.log(d);
                  if(d.responseText == 'true'){
                    $('.btn-update').trigger('click');
                  }
                }
              }
          }
      },
      messages: {
          txtName: {
              required: 'Vui lòng nhập Họ và tên',
              maxlength: 'Họ tên không được vượt quá 50 ký tự'
          },
          BirthDate: {
              required: 'Vui lòng chọn ngày sinh',
          },
          txtPhone: {
              required: 'Vui lòng nhập số điện thoại',
              number: 'Số điện thoại phải là số',
              minlength: 'Số điện thoại ít nhất là 10 số',
              maxlength: 'Số điện thoại không được vượt quá 11 số',
          },
          txtEmail: {
              required: 'Vui lòng nhập email',
              email : 'Email sai định dạng',
              remote : 'Email này đã được sử dụng'
          }
      },
    });
}		