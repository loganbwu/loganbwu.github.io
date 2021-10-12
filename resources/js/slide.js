(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function() {
    
      var $t            = $(this),
          $w            = $(window),
          viewBottom    = $w.scrollTop() + $w.height(),
          elTop         = $t.offset().top
    
  return elTop <= viewBottom;

  };
    
})($);

var win = $(window);

var allMods = $(".section");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible()) {
    el.addClass("already-visible"); 
  } 
});

win.scroll(function(event) {
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible()) {
      el.addClass("come-in"); 
    } 
  });
  
});