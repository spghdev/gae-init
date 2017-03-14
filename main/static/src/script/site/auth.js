window.initAuth = function() {
  $('.remember').change(function() {
    var buttons = $('.btn-social').toArray().concat($('.btn-social-icon').toArray());
    var results = [];
    var index = 0;
    var len = buttons.length;
    while (index < len) {
      var button = buttons[index];
      var href = $(button).prop('href');
      if ($('.remember input').is(':checked')) {
        $(button).prop('href', href + "&remember=true");
        results.push($('#remember').prop('checked', true));
      } else {
        $(button).prop('href', href.replace('&remember=true', ''));
        results.push($('#remember').prop('checked', false));
      }
      index++;
    }
  });
  $('.remember').change();
};
