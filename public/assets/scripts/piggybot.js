window.Piggybot = {
  Models: {},
  Views: {},
  Collections: {}
};

$('body').on("focus", "input", function(e) {
  // The mousedown event deselects the text in safari, so use a timeout to
  // trigger select
  setTimeout(function() {
    $(e.target).select();
  }, 0);
});
