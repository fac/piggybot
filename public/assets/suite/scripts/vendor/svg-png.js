// Modified from original source:
// http://toddmotto.com/mastering-svg-use-for-a-retina-web-fallbacks-with-png-script/
(function($) {
  $(function() {
    "use strict";

    var $body = $(document.body);

    var browserSupportsSVG = function() {
      return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;
    };

    var changeSvgPathsToPng = function() {
      var $imgs = $('img');
      $imgs.each(function() {
        var $this = $(this);
        $this.attr('src', $this.attr('src').replace(/(.*)(.svg)(\?\d*)?/, '$1.png$3'));
      });
    };

    if (browserSupportsSVG()) {
      $body.addClass('svg');
    } else {
      $body.addClass('no_svg');
      changeSvgPathsToPng();
      $(document).on('pjax:success', changeSvgPathsToPng);
    }
  });
}(jQuery));
