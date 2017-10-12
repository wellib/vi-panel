(function ($) {
  Drupal.behaviors.vipanel = {
    attach: function (context) {
      cookieOptions = {path: drupalSettings.path.baseUrl, expires: 365};

      if (Cookies.get('vi_panel_enabled')) {
        if (!$('body').hasClass('vi_panel')) {
          $('.special_mode').addClass('special_on');
          $('.vi-panel').show();
          save_options = [];
          if (Cookies.get('vi_panel_options')) {
            save_options = Cookies.getJSON('vi_panel_options');
          }
          $.fn.viPanel('init', save_options);
          $.fn.viPanel('changeStyles', save_options);
        }
      }

      // click vi-settings
      $('.vi-settings a', context).click(function () {
        $('.vi-settings-block').toggle();
        return false;
      });

      // click closepopped
      $('.closepopped', context).click(function () {
        $('.vi-settings-block').hide();
        return false;
      });

      // click restore_special
      $('.restore_special', context).click(function () {
        $('.special_mode').removeClass('special_on');
        $('.vi-panel').hide();
        $.fn.viPanel('destroy');
        return false;
      });

      // click manage link
      $('.special_mode', context).click(function () {
        if (Cookies.get('vi_panel_enabled')) {
          $(this).removeClass('special_on');
          $('.vi-panel').hide();
          $.fn.viPanel('destroy');
        }
        else {
          $(this).addClass('special_on');
          $('.vi-panel').show();
          Cookies.set('vi_panel_enabled', 'on', cookieOptions);
          save_options = [];
          if (Cookies.get('vi_panel_options')) {
            save_options = Cookies.getJSON('vi_panel_options');
          }
          options = {
            'fontSize': save_options.fontSize || false,
            'imgOnOff': save_options.imgOnOff || false,
            'kern': save_options.kern || false,
            'lineHeight': save_options.lineHeight || false,
            'font': save_options.font || false,
            'bg': save_options.bg || '#fff',
            'color': save_options.color || '#000',
          };
          $.fn.viPanel('init', options);
          $.fn.viPanel('changeStyles', options);
        }
        return false;
      });

    }
  };
})(jQuery);


//jQuery.viPanel
(function ($) {
  var methods;
  methods = {
    init: function (options) {

      $('body').addClass('vi_panel');

      //add wrapper
      $('body').children().wrapAll('<div id="vi-panel-wrapper"></div>');

      // Change style click
      $('.vi-panel a').click(function () {
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
        save_options = [];
        if (Cookies.get('vi_panel_options')) {
          save_options = Cookies.getJSON('vi_panel_options');
          options = {
            'styles': 'special',
            'fontSize': $(this)
              .attr('vi-font-size') || ( save_options.fontSize || false ),
            'imgOnOff': $(this)
              .attr('vi-img') || ( save_options.imgOnOff || false ),
            'kern': $(this).attr('vi-kern') || ( save_options.kern || false ),
            'lineHeight': $(this)
              .attr('vi-line-height') || ( save_options.lineHeight || false ),
            'font': $(this).attr('vi-font') || ( save_options.font || false ),
            'bg': $(this).attr('vi-bg') || ( save_options.bg || false ),
            'color': $(this)
              .attr('vi-color') || ( save_options.color || false ),
          };
        }
        $.fn.viPanel('changeStyles', options);
        return false;

      });

    },
    destroy: function () {

      $('#vi-panel-wrapper').children().each(
        function () {
          $(this).insertBefore($('#vi-panel-wrapper'))
        });
      $('#vi-panel-wrapper').remove();

      $('*').each(function () {
        if ($(this).attr('original-font-size')) {
          $(this).css('font-size', $(this).attr('original-font-size'));
        }
        if ($(this).attr('original-line-height')) {
          $(this).css('line-height', $(this).attr('original-line-height'));
        }
        if ($(this).attr('original-img-display')) {
          $(this).css('display', $(this).attr('original-img-display'));
        }
        if ($(this).attr('original-kern')) {
          $(this).css('letter-spacing', $(this).attr('original-kern'));
        }
        if ($(this).attr('original-font')) {
          $(this).css('font-family', $(this).attr('original-font'));
        }
        if ($(this).attr('original-bg')) {
          $(this).css('background', $(this).attr('original-bg'));
        }
        if ($(this).attr('original-color')) {
          $(this).css('color', $(this).attr('original-color'));
        }
      });

      Cookies.remove('vi_panel_enabled');
      Cookies.remove('vi_panel_options');

    },
    changeStyles: function (options) {

      $('#vi-panel-wrapper *').not(noChangeStyles).each(function () {
        if (!$(this).attr('original-font-size')) {
          $(this).attr('original-font-size', $(this).css('font-size'));
        }
        if (!$(this).attr('original-line-height')) {
          $(this).attr('original-line-height', $(this).css('line-height'));
        }
        if (!$(this).attr('original-kern')) {
          $(this).attr('original-kern', $(this).css('letter-spacing'));
        }
        if (!$(this).attr('original-font')) {
          $(this).attr('original-font', $(this).css('font-family'));
        }
        if (!$(this).attr('original-bg')) {
          $(this).attr('original-bg', $(this).css('background'));
        }
        if (!$(this).attr('original-color')) {
          $(this).attr('original-color', $(this).css('color'));
        }
      });

      var noChangeStyles = '.vi-panel, .vi-panel *, #admin-menu, #admin-menu *, #toolbar, #toolbar *, .toolbar, .toolbar *, .fa';

      if (options.fontSize) {
        save_options.fontSize
        $('#vi-panel-wrapper *').not(noChangeStyles).each(function () {
          originalfontSize = $(this).attr('original-font-size').slice(0, -2);
          $(this)
            .css({'font-size': Math.round(originalfontSize * options.fontSize) + 'px'});
        });
      }

      if (options.bg) {
        $('body *').not(noChangeStyles).each(function () {
          $(this).css({'background': options.bg});
        });
      }

      if (options.color) {
        $('body *').not(noChangeStyles).each(function () {
          $(this).css({'color': options.color});
        });
      }

      if (options.imgOnOff) {
        $('#vi-panel-wrapper img').each(function () {
          if (options.imgOnOff == 'off') {
            $(this).css({'display': 'none'});
            if (!$(this).attr('original-img-display')) {
              $(this).attr('original-img-display', 'initial');
            }
          }
          else {
            if ($(this).attr('original-img-display')) {
              $(this).css({'display': $(this).attr('original-img-display')});
            }
          }
        });
      }

      if (options.kern) {
        $('#vi-panel-wrapper *').not(noChangeStyles).each(function () {
          $(this).css({'letter-spacing': options.kern});
        });
      }

      if (options.lineHeight) {
        $('#vi-panel-wrapper *').not(noChangeStyles).each(function () {
          $(this).css({'line-height': options.lineHeight});
        });
      }

      if (options.font) {
        $('#vi-panel-wrapper *').not(noChangeStyles).each(function () {
          $(this).css({'font-family': options.font});
        });
      }

      cookieOptions = {path: drupalSettings.path.baseUrl, expires: 365};
      Cookies.set('vi_panel_options', options, cookieOptions);

    }
  };

  $.fn.viPanel = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else {
      if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      }
      else {
        $.error('Method named ' + method + ' exists for jQuery.viPanel');
      }
    }
  };

})(jQuery);
