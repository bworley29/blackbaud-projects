(function($) {

  $(document).ready(function() {
          
    $('#global-navigation').removeClass('uojs--no-js');
    $('.uos--navigation--global').removeClass('uojs--no-js');
    $('.uoe--menu-link').removeClass('uojs--open');
    $('.uoe--meganav').removeClass('uojs--shown');

    var viewport = function() {
      var e = window, a = 'inner';
      if (!('innerWidth' in window )) {
          a = 'client';
          e = document.documentElement || document.body;
      }
      return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    }();
    
    $(window).on('orientationchange resize', function() {
      var e = window, a = 'inner';
      if (!('innerWidth' in window )) {
          a = 'client';
          e = document.documentElement || document.body;
      }
      viewport = { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    });
    
    

    //Top Level Hover
    $('.uos--navigation--global > .uoe--menu-item').hoverIntent({
      sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
      interval: 150,  // number = milliseconds for onMouseOver polling interval     
      timeout: 150,   // number = milliseconds delay before onMouseOut
      over: function() {
        $(this).addClass('uojs--hover');
        if ( viewport.width > 735 ) {
          $(this).children('.uoe--menu-link').addClass('uojs--open');
          $('.uos--navigation--global > .uoe--menu-item > .uoe--meganav').removeClass('uojs--shown');
          $(this).children('.uoe--meganav').addClass('uojs--shown');
        }
      },  
      out: function() {
        $(this).children('.uoe--menu-link').removeClass('uojs--open');
        $('.uos--navigation--global > .uoe--menu-item > .uoe--meganav').removeClass('uojs--shown');
        $(this).removeClass('uojs--hover');
        
      }
    },viewport);

    //Top Level Click//
    $('.uos--navigation--global > .uoe--menu-item > .uoe--menu-link').on('click touchend', function (event) {
      if ( viewport.width > 735 ) {
        if (!$(this).hasClass('uojs--open')) {
          event.preventDefault();
          $('.uoe--menu-link').removeClass('uojs--open');
          $(this).addClass('uojs--open');
          $('.uoe--meganav').removeClass('uojs--shown');
          $(this).parent('.uoe--menu-item').children('.uoe--meganav').addClass('uojs--shown');
        }
      }
    });
    
    $('body').on('click touchend', function(event) {    
      var target = $($.makeArray(event.target));
  
      if (!target.parents().is('.uos--navigation--global')) {
        $('.uos--navigation--global .uoe--menu-link').removeClass('uojs--open');
        $('.uos--navigation--global .uoe--meganav').removeClass('uojs--shown');
      }
    });
    
    var menuCounter = 0;
    
    $('.uos--navigation--global .uojs--is-left-flyout').each(function() {
      $(this).removeClass('uojs--is-left-flyout').addClass('uojs--is-top-flyout');
      $(this).parent().parent().append('<div class="uoe--menu-container"><ul class="uoe--flyout-top"></ul></div>');
      $(this).parent().parent().append('<div class="uoe--flyout-bottom"></div>');
      var topTarget = $(this).parent().parent().find('.uoe--flyout-top');
      var bottomTarget = $(this).parent().parent().find('.uoe--flyout-bottom');
      
      $(this).children('.uoe--menu-item').each(function() {
        $(this).attr('id', 'flyout_menu_' + menuCounter);
        $(this).remove().appendTo(topTarget);
        $(this).children('.uoe--menu-container').remove().appendTo(bottomTarget).attr('id', 'flyout_menu_' + menuCounter + '_child').addClass('uojs--hidden');
        menuCounter++;
      });
      
      $(this).parent().parent().children('.uoe--menu-container--one-column').remove();
    });
    
    if ( uOSupportsCSS('columns') ) {
      $('.uoe--flyout-top').addClass('uol--columns--3');
      $('.uoe--flyout-bottom ul').addClass('uol--columns--3');
      
    } else {
      var flyoutTopCount = $('ul.uoe--flyout-top').children('li').length;
      var flyoutTopCountLanding = $('nav.uos--navigation--landing ul.uoe--flyout-top').children('li').length; 

      var flyoutTopCountGlobal = flyoutTopCount - flyoutTopCountLanding;

      var firstColumn = Math.ceil(flyoutTopCountGlobal / 3);
      var secondColumn = Math.ceil((flyoutTopCountGlobal - firstColumn) / 2);
      var thirdColumn = flyoutTopCountGlobal - firstColumn - secondColumn;

      var menuItemCounter = 0;

      $('.uos--navigation--global ul.uoe--flyout-top li').each(function() {

        if (menuItemCounter < firstColumn) {
          $(this).addClass('uojs--first-col');
        } else if (menuItemCounter < (firstColumn + secondColumn)) {
          var top = (menuItemCounter - firstColumn) * 18;
          $(this).addClass('uojs--second-col uojs--meganav--pos-abs uojs--meganav--left-333').css('top',top);
        } else {
          var top = (menuItemCounter - (firstColumn + secondColumn)) * 18;
          $(this).addClass('uojs--third-col uojs--meganav--pos-abs uojs--meganav--left-666').css('top',top);
        }

        menuItemCounter++;

      });

      $('nav.uos--navigation--landing ul.uoe--flyout-top li').each(function() {
        $(this).removeClass('uojs--first-col uojs--second-col uojs--third-col uojs--meganav--pos-abs uojs--meganav--left-333 uojs--meganav--left-666');
        $(this).css('top','');
      });

      $('.uoe--flyout-bottom .uoe--menu-container').each(function() {
        if ($(this).find('li').length > 0) {
          $(this).append('<div class="uoe--flyout-bottom--wrapper"><ul class="uoe--flyout-bottom--first-column"></ul><ul class="uoe--flyout-bottom--second-column"></ul><ul class="uoe--flyout-bottom--third-column"></ul></div>');
        }
      });


      $('.uoe--flyout-bottom ul.uoe--menu').each(function() {

        var flyoutBottomCount = $(this).children('li').length;

        var firstColumn = Math.ceil(flyoutBottomCount / 3);
        var secondColumn = Math.ceil((flyoutBottomCount - firstColumn) / 2);
        var thirdColumn = flyoutBottomCount - firstColumn - secondColumn;

        var menuItemCounter = 0;
        targetFirst = $(this).parent('.uoe--menu-container').find('.uoe--flyout-bottom--first-column');
        targetSecond = $(this).parent('.uoe--menu-container').find('.uoe--flyout-bottom--second-column');
        targetThird = $(this).parent('.uoe--menu-container').find('.uoe--flyout-bottom--third-column');   

        $(this).children('li').each(function() {
          if (menuItemCounter < firstColumn) {
            //$(this).addClass('uojs--first-col');
            $(this).appendTo(targetFirst);
          } else if (menuItemCounter < (firstColumn + secondColumn)) {
            //var top = (menuItemCounter - firstColumn) * 18;
            //$(this).addClass('uojs--second-col uojs--meganav--pos-abs uojs--meganav--left-333').css('top',top);
            $(this).appendTo(targetSecond);
          } else {
            //var top = (menuItemCounter - (firstColumn + secondColumn)) * 18;
            //$(this).addClass('uojs--third-col uojs--meganav--pos-abs uojs--meganav--left-666').css('top',top);
            $(this).appendTo(targetThird);
          }

          menuItemCounter++;
        });

        $(this).css('margin', '0');

      });

      $('nav.uos--navigation--landing .uoe--flyout-bottom ul.uoe--menu li').each(function() {
        $(this).removeClass('uojs--first-col uojs--second-col uojs--third-col uojs--meganav--pos-abs uojs--meganav--left-333 uojs--meganav--left-666');
        $(this).css('top','');
      });
    
    }    
    
    $('.uoe--flyout-top .uoe--menu-item').click(function (event) {
        event.preventDefault();
    });
    
    $('.uoe--flyout-top .uoe--menu-item').hoverIntent({
      timeout: 200,
      over: function() {
        $(this).parent().parent().parent().find('.uoe--flyout-bottom .uoe--menu-container').addClass('uojs--hidden');
        $("#" + $(this).attr('id') + '_child').removeClass('uojs--hidden');
        $(".uoe--menu-container.uoe--flyout-bottom").css("border-top", "1px solid rgba(255,255,255,0.15)");
      },
      out: function() {}
    });
        
    $('.uoe--flyout-top').parents('.uoe--meganav').hoverIntent({
      timeout: 200,
      over: function() {},
      out: function() {
        $(this).find('div.uoe--flyout-bottom .uoe--menu-container').addClass('uojs--hidden');
        $(".uoe--menu-container.uoe--flyout-bottom").css("border-top", "none");
      }
    });
    
//    $('.uos--navigation--global').hoverIntent({
//      timeout: 200,
//      over: function() {},
//      out: function() {
//        $('.uos--navigation--global > .uoe--menu-item > .uoe--meganav').hide();
//      }
//    });

    //DTC Changes (Start)
    $('.uoe--meganav-subtitle').on('mouseover', function() {
      $('.uoe--menu--horizontal > li:last-of-type > a').addClass('uojs--hover');
    });
    $('.uoe--meganav-subtitle').on('mouseout', function() {
      $('.uoe--menu--horizontal > li:last-of-type > a').removeClass('uojs--hover');
    });
    //DTC Changes (End)
    
  });
})(jQuery);