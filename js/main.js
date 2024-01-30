(function ($) {
  "use strict";

  /*---------------------
    Scrollbar
  ---------------------*/
  if ($("body").hasClass("scroll")) {
    var ele = document.querySelector(".wrapper");
    var scrollbar = Scrollbar.init(ele,
    {
      damping:0.05
    });
  }
  
  /*----------------------------
    Mouse Cursor
  ------------------------------ */
  var e = {x: 0, y: 0}, t = {x: 0, y: 0}, n = .25, o = !1, a = document.getElementById("cursor"),
  i = document.getElementById("cursor-ball");
  TweenLite.set(a, {xPercent: -50, yPercent: -50}), document.addEventListener("mousemove", function (t) {
    var n = window.pageYOffset || document.documentElement.scrollTop;
    e.x = t.pageX, e.y = t.pageY - n
  }), TweenLite.ticker.addEventListener("tick", function () {
    o || (t.x += (e.x - t.x) * n, t.y += (e.y - t.y) * n, TweenLite.set(a, {x: t.x, y: t.y}))
  }),

  /*------------------------------------
    Search Option
  ------------------------------------- */
  $('.search-btn-area .input-group').hide();
  $(".main-search").on('click', function(event) {
    event.preventDefault();
    $('.search-btn-area .input-group').animate( {
      height: 'toggle',
    });
  });

  /*---------------------
    Selectize
  ---------------------*/
  if($('select').length){
    $('select').selectize();
  }

  /*--------------------------
    Scroll Sticky
  ---------------------------- */
  var windows = $(window);
  var Header = $(".header-bottom");  
  if (Header.length) {
    windows.on('scroll', function() {
      var scroll = windows.scrollTop();
      if (scroll > 200) {
        $(".header-bottom").addClass('stick');
      }
      else {
        $(".header-bottom").removeClass('stick');
      }
    });
  }

  if ($(window).width() < 992) {
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');

      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
      });
      return false;
    });
  }

  /*--------------------------
    Intro Title Text Effect
  ---------------------------- */
  var str = '共学习共成长，探索AI的边界！';
  var spans = '<span>' + str.split('').join('</span><span>') + '</span>';
  $(spans).hide().appendTo('.intro-title').each(function (i) {
    $(this).delay(100 * i).css({
      display: 'inline',
      opacity: 0
    }).animate({
      opacity: 1
    }, 300);
  });

  /*--------------------------
    ScrollUp
  ---------------------------- */
  $('.back-to-top').on('click', function(event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: 0
    }, 1000);
  });

  /*--------------------------
    Mouse Move
  ---------------------------- */
  var nodes = [].slice.call(document.querySelectorAll('.mouse-move'), 0);
  var directions  = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
  var classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));

  var getDirectionKey = (ev, node) => {
    var { width, height, top, left } = node.getBoundingClientRect();
    var l = ev.pageX - (left + window.pageXOffset);
    var t = ev.pageY - (top + window.pageYOffset);
    var x = (l - (width/2) * (width > height ? (height/width) : 1));
    var y = (t - (height/2) * (height > width ? (width/height) : 1));
    return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  }

  class Item {
    constructor(element) {
      this.element = element;    
      this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
      this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
    }
    
    update(ev, prefix) {
      this.element.classList.remove(...classNames);
      this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
    }
  }

  nodes.forEach(node => new Item(node));

  /*----------------------------
    Venobox Popup
  ------------------------------ */
  $('.venobox').venobox( {
    border: '3px', titleattr: 'data-title', numeratio: true, infinigall: true
  });

  /*---------------------
    Counter
  ---------------------*/
  var timer = $('.timer');
  if(timer.length) {
    timer.appear(function () {
      timer.countTo();
    })
  }
  
  /*---------------------
    Blog carousel
  ---------------------*/
  var BlogSlider = $('.blog-slider');
  BlogSlider.owlCarousel( {
    items: 3, 
    loop:true, 
    nav:true, 
    margin: 30, 
    dots:false, 
    autoplay:false,
    navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"], 
    responsive: {
      0: {
        items: 1,
        autoplay:true,
      }
      , 768: {
        items: 2
      }
      , 992: {
        items: 2
      }
      , 1200: {
        items: 3
      }
    }
  });
  $('.blog-slider .owl-nav').removeClass('disabled');

  $('.blog-slider .owl-nav').on('click', function(event) {
    $(this).removeClass('disabled');
  });  
  
  /*---------------------
    Blog carousel
  ---------------------*/
  var Blog = $('.single-news-slider');
  Blog.owlCarousel( {
    items: 1, 
    loop:true, 
    nav:true, 
    margin: 0, 
    dots:false, 
    autoplay:true,
    navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"]
  });
  $('.single-news-slider .owl-nav').removeClass('disabled');

  $('.single-news-slider .owl-nav').on('click', function(event) {
    $(this).removeClass('disabled');
  });
  
  /*---------------------
    Client Logo carousel
  ---------------------*/
  var ClientLogo = $('.client-logo-slider');
  ClientLogo.owlCarousel( {
    items: 4, 
    loop:true, 
    nav:true,
    dots:false,
    margin: 150, 
    autoplay:true, 
    responsive: {
      0: {
        items: 1,
        margin: 0
      }
      , 768: {
        items: 2,
        margin: 150
      }
      , 992: {
        items: 3,
        margin: 150
      }
      , 1200: {
        items: 4
      }
    }
  });

  /*---------------------
    LoadMore Projects
  ---------------------*/
  if(('.project-one .grid').length) {
    jQuery('.project-one .grid').loadMoreResults({
      tag: {
        name: 'div',
        'class': 'col-md-3'
      },
      button: {
        'class': 'btn',
        text: 'Load More Project'
      },
      displayedItems: 8,
      showItems: 1
    });
  }

  /*---------------------
    Video
  ---------------------*/  
  $(".cd-popup-trigger").on("click", function(p) {
    p.preventDefault(), $(".cd-popup").addClass("is-visible")
  }), $(".cd-popup").on("click", function(p) {
    ($(p.target).is(".cd-popup-close") || $(p.target).is(".cd-popup")) && (p.preventDefault(), $(this).removeClass("is-visible"))
  });

  /*---------------------
    WOW
  ---------------------*/ 
  if ($('.wow').length) {
    var wow = new WOW({
      mobile: false
    });
    wow.init();
  };

  /*---------------------
    icheck
  ---------------------*/  
  var inputCheckBox = $('.form-check');

  if (inputCheckBox.length) {
    inputCheckBox.iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass: 'iradio_minimal-blue'
    });
  }

  /*---------------------
   Mail Ajax
  ---------------------*/
  if($('.contact-form').length) {
    var form = $('#ajax-contact');
    var formMessages = $('.form-messages');
    $(form).submit(function(e) {
      e.preventDefault();
      var formData = $(form).serialize();
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      }).done(function(response) {
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');
        $(formMessages).text(response);
        $(this).find("input").val("");
        $(form).trigger("reset");
      }).fail(function(data) {
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occured and your message couldn\'t be sent.');
        }
      });
    });
  }
  
  
})(jQuery);