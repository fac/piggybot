/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element);
    this.options       = $.extend({}, Collapse.DEFAULTS, options);
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = $(this.options.parent);
    }
    if (this.options.toggle) {
      this.toggle();
    }
  };

  Collapse.DEFAULTS = {
    toggle: true
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) {
      return;
    }

    var startEvent = $.Event('show.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) {
      return;
    }

    var actives   = this.$parent && this.$parent.find('> .accordion-group > .in');

    if (actives && actives.length) {
      var hasData = actives.data('collapse');
      if (hasData && hasData.transitioning) {
        return;
      }
      actives.collapse('hide');
      hasData || actives.data('collapse', null);
    }

    var dimension = this.dimension();

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0);

    this.transitioning = 1;

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto');
      this.transitioning = 0;
      this.$element.trigger('shown.collapse');
    };

    if (!$.support.transition) {
      return complete.call(this);
    }

    var scrollSize = $.camelCase(['scroll', dimension].join('-'));

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize]);
  };

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) {
      return;
    }

    var startEvent = $.Event('hide.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) {
      return;
    }

    var dimension = this.dimension();

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight;

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in');

    this.transitioning = 1;

    var complete = function () {
      this.transitioning = 0;
      this.$element
        .trigger('hidden.collapse')
        .removeClass('collapsing')
        .addClass('collapse');
    };

    if (!$.support.transition) {
      return complete.call(this);
    }

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350);
  };

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse;

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data('collapse', (data = new Collapse(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  };

  $.fn.collapse.Constructor = Collapse;


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href;
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
    var $target = $(target);
    var data    = $target.data('collapse');
    var option  = data ? 'toggle' : $this.data();
    var parent  = $this.attr('data-parent');
    var $parent = parent && $(parent);

    if (!data || !data.transitioning) {
      if ($parent) {
        $parent.find('[data-toggle=collapse][data-parent=' + parent + ']').not($this).addClass('collapsed');
      }
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
    }

    $target.collapse(option);
  });

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle   = '[data-toggle=dropdown]';
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) {
      return;
    }

    var $parent  = getParent($this);
    var isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'));

      if (e.isDefaultPrevented()) {
        return;
      }

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown');
    }

    $this.focus();

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) {
      return;
    }

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) {
      return;
    }

    var $parent  = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive || (isActive && e.keyCode === 27)) {
      if (e.which === 27) {
        $parent.find(toggle).focus();
      }
      return $this.click();
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent);

    if (!$items.length) {
      return;
    }

    var index = $items.index($items.filter(':focus'));

    if (e.keyCode === 38 && index > 0){
      index--; // up
    }
    if (e.keyCode === 40 && index < $items.length - 1){
      index++; // down 
    }
    if (!index){
      index=0;
    }

    $items.eq(index).focus();
  };

  function clearMenus() {
    $(backdrop).remove();
    $(toggle).each(function (e) {
      var $parent = getParent($(this));
      if (!$parent.hasClass('open')) {
        return;
      }
      $parent.trigger(e = $.Event('hide.bs.dropdown'));
      if (e.isDefaultPrevented()) {
        return;
      }
      $parent.removeClass('open').trigger('hidden.bs.dropdown');
    });
  }

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown;

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('dropdown');

      if (!data) {
        $this.data('dropdown', (data = new Dropdown(this)));
      }
      if (typeof option === 'string') {
        data[option].call($this);
      }
    });
  };

  $.fn.dropdown.Constructor = Dropdown;


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation(); })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown);

}(window.jQuery);



$(document).ready(function(){
  
  // Replace hard-coded .no-js class on <html> with .js if JavaScript is enabled 
  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + ' js ';
  
  // Change handler for mobile docs navigation dropdown
  $('#subnavigation select').change(function() {
    window.location='/docs/'+$(this).val();
  });

  // Min height for docs page
  var fixed_subnav = function() {
    var fixed_css;
    var view_w = $(window).width();
    var view_h = $(window).height();
    var subnav_height = $('#subnavigation').height();

    if (view_w >= 1024 && view_h - 60 >= subnav_height) {
      $('#primary_content').css('min-height', subnav_height + 20);
      fixed_css = {
        'padding-top': '5em',
        'position': 'fixed',
        'top': '0'
      };
    } else if (view_w >= 1024) {
      $('#primary_content').css('min-height', subnav_height + 20);
      fixed_css = {
        'padding-top': '2em',
        'position': 'relative',
        'text-align': 'left',
        'top': '0',
        'width': '18em'
      };
    } else {
      fixed_css = {
        'padding-top':'0px',
        'position':'relative',
        'text-align': 'center',
        'top': '0',
        'width':'auto'
      };

    }
    $('#subnavigation').css(fixed_css);
  };

  $(window).resize(fixed_subnav);
  fixed_subnav();


  // Set up scrollspy
  $('body').scrollSpy('[data-scrollspy] li > a');
	
	// Add .navbar_fixed class to <html> if navbar has class of .fixed and viewport is wider than 768px
  var navbar_fixed = function() {
    var viewport_width = $(window).width();
		if (($('.navbar').hasClass('fixed')) && (viewport_width >= 768)) {
			$('html').addClass('navbar_fixed');
		} else {
			$('html').removeClass('navbar_fixed');
		}
	};
  $(window).resize(navbar_fixed);
  navbar_fixed();
	
});
