window.LOG = function() {
  typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log.apply(console, arguments) : void 0 : void 0;
};


window.initCommon = function() {
  initLoadingButton();
  initConfirmButton();
  initPasswordShowButton();
  initTime();
  initAnnouncement();
  initRowLink();
};


window.initLoadingButton = function() {
  $('body').on('click', '.btn-loading', function() {
    $(this).button('loading');
  });
};


window.initConfirmButton = function() {
  $('body').on('click', '.btn-confirm', function() {
    if (!confirm($(this).data('message') || 'Are you sure?')) {
      event.preventDefault();
    }
  });
};


window.initPasswordShowButton = function() {
  $('body').on('click', '.btn-password-show', function() {
    var $target;
    $target = $($(this).data('target'));
    $target.focus();
    if ($(this).hasClass('active')) {
      $target.attr('type', 'password');
    } else {
      $target.attr('type', 'text');
    }
  });
};


window.initTime = function() {
  if ($('time').length > 0) {
    var recalculate = function() {
      $('time[datetime]').each(function() {
        var date, diff;
        date = moment.utc($(this).attr('datetime'));
        diff = moment().diff(date, 'days');
        if (diff > 25) {
          $(this).text(date.local().format('YYYY-MM-DD'));
        } else {
          $(this).text(date.fromNow());
        }
        $(this).attr('title', date.local().format('dddd, MMMM Do YYYY, HH:mm:ss Z'));
      });
      setTimeout(arguments.callee, 1000 * 45);
    };
    recalculate();
  }
};


window.initAnnouncement = function() {
  $('.alert-announcement button.close').click(function() {
    typeof sessionStorage !== "undefined" && sessionStorage !== null ? sessionStorage.setItem('closedAnnouncement', $('.alert-announcement').html()) : void 0;
  });
  if ((typeof sessionStorage !== "undefined" && sessionStorage !== null ? sessionStorage.getItem('closedAnnouncement') : void 0) !== $('.alert-announcement').html()) {
    $('.alert-announcement').show();
  }
};


window.initRowLink = function() {
  $('body').on('click', '.row-link', function() {
    window.location.href = $(this).data('href');
  });
  $('body').on('click', '.not-link', function(e) {
    e.stopPropagation();
  });
};


window.clearNotifications = function() {
  $('#notifications').empty();
};


window.showNotification = function(message, category) {
  if (category == null) {
    category = 'warning';
  }
  clearNotifications();
  if (!message) {
    return;
  }
  $('#notifications').append("<div class=\"alert alert-dismissable alert-" + category + "\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n  " + message + "\n</div>");
};
