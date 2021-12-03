

$(".page-header .top-header .md-toggle-menu .md-open").click(function(){
  $(".page-header .top-header .main-menu-mb").addClass('active');
});

$(".page-header .top-header .md-close").click(function(){
  $(".page-header .top-header .main-menu-mb").removeClass('active');
});

$('.md-slide .owl-carousel').owlCarousel({
    stagePadding: 50,
    loop:true,
    margin:0,
    nav:true,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

var height_1 = $('.page-footer .md-contact .md-content .md-row-1').outerHeight();
$('.page-footer .md-contact .md-content .md-row-2').css('height',height_1);

new WOW().init();
// $("#md-tk").fancybox().trigger('click');

$(".md-button-lienhe").click(function() {
    $('html,body').animate({
        scrollTop: $(".md-contact").offset().top},
        'slow');
    $(".page-header .top-header .main-menu-mb").removeClass('active');
});

