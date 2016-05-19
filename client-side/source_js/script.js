$('.carousel').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

/* Smooth scrolling */
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 100
    }, 500);
    return false;
});

/* Navigation highlighting */

$(document).scroll(function() {
  var scroll_top = $(document).scrollTop();
  var nav = $('#nav');
  var nav_bottom = nav.position().top + nav.outerHeight(true) + scroll_top;

  var details_top = $('#details').position().top - 150;
  var search_top = $('#search').position().top - 150;


  /* Details */
  if (nav_bottom < search_top && nav_bottom > details_top) {
    $('#details-header').css('color', '#40826D');
    $('#details-header').css('font-weight', 'bold');

    $('#search-header').css('color', '#000000');
    $('#search-header').css('font-weight', 'normal');
  }
  /* Search */
  else if (nav_bottom > search_top) {
    $('#details-header').css('color', '#000000');
    $('#details-header').css('font-weight', 'normal');

    $('#search-header').css('color', '#40826D');
    $('#search-header').css('font-weight', 'bold');
  }

  /* Header */
  else {
    $('#details-header').css('color', '#000000');
    $('#details-header').css('font-weight', 'normal');

    $('#search-header').css('color', '#000000');
    $('#search-header').css('font-weight', 'normal');
  }

  /* Navbar resizing */
  if (scroll_top > 54) {
    $('.top-bar').css('height', '36.4px');
    $('.top-bar').css('padding', '0');
    $('#nav li').css('font-size', '15px');
  } else {
    $('.top-bar').css('height', '54px');
    $('.top-bar').css('padding', '0.5rem');
    $('#nav li').css('font-size', '16px');
  }
});

/* Mobile nav */
$('#menu-icon').click(function() {
  $('.mobile-menu').toggle();
});

$(window).resize(function(){
  var width = $(this).width(); 
  if (width > 640) {
    $('.mobile-menu').hide();
  }
});

$('.mobile-menu a').click(function() {
  $('.mobile-menu').hide();
});

