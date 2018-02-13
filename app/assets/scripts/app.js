/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

'use strict';
var Site = (function($, window, undefined) {

  var publicMethod = function(){
    // alert(1);
  };

  return {
    publicMethod: publicMethod
  };

})(jQuery, window);

jQuery(function() {
  Site.publicMethod();
});

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'validation-form';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this,
          ele = that.element,
          eleUsername = ele.find('#username'),
          eleSubmit = ele.find('.btn-submit'),
          eleInputRequire = ele.find('[data-requirement]');

      eleSubmit.on('click.' + pluginName, function() {
        var elePassword = ele.find('#password'),
            eleConPassword = ele.find('[data-confirm-password]');

        that.inputRequirmentMethod(eleInputRequire);
        that.confirmPasswordMethod(elePassword, eleConPassword);
      });
    },

    inputRequirmentMethod: function(eleInputRequire) {
      eleInputRequire.each(function() {
        var valInputRequire = $(this).val();
        if(!!valInputRequire) {
          $(this).addClass('pass-infor');
          $(this).removeClass('error-infor');
        } else {
          $(this).removeClass('pass-infor');
          $(this).addClass('error-infor');
        }
      });

    },

    confirmPasswordMethod: function(elePassword, eleConPassword) {
      var valPass = elePassword.val(),
          valConPass = eleConPassword.val(),
          showMess = eleConPassword.siblings('.show-message');
      if(valConPass === valPass) {
        showMess.html('Your Passwords Must Match');
        showMess.removeClass('show-mess');
      } else {
        showMess.addClass('show-mess');
      }
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
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));
