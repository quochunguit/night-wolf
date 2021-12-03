var App = App || {};

//---MAIN----
jQuery(function () {
    App.Dev.nightwolfValidate();
    App.Dev.getCurrentDate();
});

//--All site
App.Dev = function(){
    var flag = 1;

    var getCookie = function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let conversion_id;
    var getTrackData = function() {
        let tracking_id = getCookie('_aff_sid');

        return {
        conversion_id: conversion_id,
        tracking_id: tracking_id
        }
    }

    var trackUser = function() {
        let data = getTrackData();

        jQuery.ajax({
            url: "post.php",
            type: "post",
            dataType:'json',
            data: data,
            success: function (response) {
                console.log(response);
                // You will get response from your PHP page (what you echo or print)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    var register = function(){
        if (jQuery('form#nightwolf').valid() && flag) {
            var data = jQuery('form#nightwolf').serialize();
            console.log(data);
            jQuery('#form-submit').val('ĐANG GỬI...');
            
            flag = 0;

            jQuery.ajax({
                type : 'GET',
                url : 'https://script.google.com/macros/s/AKfycbya9BsVAU1cIyXN10EULnKQwiUK1qTrdJFjXAOE5oAhs3ccxAb1jGtdSIJQBD0R7IPm/exec',
                dataType:'json',
                crossDomain : true,
                data : data,
                success : function(data)
                {
                    if(data == 'false')
                    {
                        alert('ERROR, Please try again later!');
                    }else{
                        flag = 1;
                        jQuery('#form-submit').val('ĐẶT HÀNG NGAY');
                        
                        /* if(data.result == 'PHONE_EXIST')
                        {
                            alert('Số điện thoại của bạn đã được đăng ký. \r\nChúng tôi sẽ liên hệ lại với bạn.');
                            return;
                        } */

                        if (data.result == "success") {
                            jQuery('form#nightwolf')[0].reset();

                            $("#md-tk").fancybox().trigger('click');
                        }
                    }
                }
            });
        }
    }

    var nightwolfValidate = function(){

        var nightwolf = jQuery('form#nightwolf');
        if (nightwolf.length < 1) {
            return;
        }

        jQuery.validator.addMethod("validatePhone", function (value, element) {
            var flag = false;
            var phone = value;
            phone = phone.replace('(+84)', '0');
            phone = phone.replace('+84', '0');
            phone = phone.replace('0084', '0');
            phone = phone.replace(/ /g, '');
            if (phone != '') {
                var firstNumber = phone.substring(0, 3);
                var validNumber = ["099","095","092","086","088","096","097","098","032","033","034","035","036","037","038","039","089","090","093","070","079","077","076","078","091","094","083","084","085","081","082","092","056","058"];
                if ((jQuery.inArray(firstNumber,validNumber)!='-1') && phone.length == 10) {
                    if (phone.match(/^\d{10}/)) {
                        flag = true;
                    }
                }
            }
            return flag;
        }, "Vui lòng nhập đúng định dạng");

        nightwolf.validate({
            ignore: "",
            rules: {
                'name': {
                    required: true,
                },
                'phone': {
                    required: true,
                    validatePhone:true,
                },
                'address': {
                    required: true
                }
            },
            messages: {
                'name': {
                    required: "Vui lòng nhập tên của bạn"

                },
                'phone': {
                    required:"Vui lòng nhập số điện thoại",

                },
                'address': {
                    required: "Vui lòng nhập địa chỉ"

                }
            },
            errorElement : 'p',
            errorClass: 'error',
            errorPlacement: function(error, element) {

                error.insertAfter(element.parent());

            },
            highlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').addClass('error');
            },
            unhighlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').removeClass('error');
            },
        });
    }

    var getCurrentDate = function() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        
        $('#current-date').val(today);
    }

    return {
        register: register,
        nightwolfValidate: nightwolfValidate,
        getCurrentDate: getCurrentDate
    };

}();    
//--End All site