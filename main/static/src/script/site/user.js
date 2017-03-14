window.initUserList = function() {
  initUserSelections();
  initUserDeleteBtn();
  initUserMergeBtn();
};


var initUserSelections = function() {
  $('input[name=user_db]').each(function() {
    userSelectRow($(this));
  });
  $('#select-all').change(function() {
    $('input[name=user_db]').prop('checked', $(this).is(':checked'));
    $('input[name=user_db]').each(function() {
      userSelectRow($(this));
    });
  });
  $('input[name=user_db]').change(function() {
    userSelectRow($(this));
  });
};


var userSelectRow = function($element) {
  updateUserSelections();
  $('input[name=user_db]').each(function() {
    $("#" + $element.val()).toggleClass('warning', $element.is(':checked'));
  });
};


var updateUserSelections = function() {
  var selected = $('input[name=user_db]:checked').length;
  $('#user-actions').toggleClass('hidden', selected === 0);
  $('#user-merge').toggleClass('hidden', selected < 2);
  if (selected === 0) {
    $('#select-all').prop('indeterminate', false);
    $('#select-all').prop('checked', false);
  } else if ($('input[name=user_db]:not(:checked)').length === 0) {
    $('#select-all').prop('indeterminate', false);
    $('#select-all').prop('checked', true);
  } else {
    $('#select-all').prop('indeterminate', true);
  }
};


var initUserDeleteBtn = function() {
  $('#user-delete').click(function(event) {
    clearNotifications();
    event.preventDefault();
    var confirmMessage = ($(this).data('confirm')).replace('{users}', $('input[name=user_db]:checked').length);
    if (confirm(confirmMessage)) {
      var user_keys = [];
      $('input[name=user_db]:checked').each(function() {
        $(this).attr('disabled', true);
        user_keys.push($(this).val());
      });
      var deleteUrl = $(this).data('api-url');
      var successMessage = $(this).data('success');
      var errorMessage = $(this).data('error');
      apiCall('DELETE', deleteUrl, {
        user_keys: user_keys.join(',')
      }, function(err, result) {
        if (err) {
          $('input[name=user_db]:disabled').removeAttr('disabled');
          showNotification(errorMessage.replace('{users}', user_keys.length), 'danger');
          return;
        }
        $("#" + (result.join(', #'))).fadeOut(function() {
          $(this).remove();
          updateUserSelections();
          showNotification(successMessage.replace('{users}', user_keys.length), 'success');
        });
      });
    }
  });
};


window.initUserMerge = function() {
  var user_keys = $('#user_keys').val();
  var apiUrl = $('.api-url').data('api-url');
  apiCall('GET', apiUrl, {
    user_keys: user_keys
  }, function(error, result) {
    if (error) {
      LOG('Something went terribly wrong');
      return;
    }
    window.user_dbs = result;
    $('input[name=user_db]').removeAttr('disabled');
  });
  $('input[name=user_db]').change(function(event) {
    selectDefaultUser($(event.currentTarget).val());
  });
};


var selectDefaultUser = function(user_key) {
  $('.user-row').removeClass('success').addClass('danger');
  $("#" + user_key).removeClass('danger').addClass('success');
  var results = [];
  for (var index = 0, len = user_dbs.length; index < len; index++) {
    var user_db = user_dbs[index];
    if (user_key === user_db.key) {
      $('input[name=user_key]').val(user_db.key);
      $('input[name=username]').val(user_db.username);
      $('input[name=name]').val(user_db.name);
      $('input[name=email]').val(user_db.email);
      break;
    }
  }
};


var initUserMergeBtn = function() {
  $('#user-merge').click(function(event) {
    event.preventDefault();
    var user_keys = [];
    $('input[name=user_db]:checked').each(function() {
      user_keys.push($(this).val());
    });
    var userMergeUrl = $(this).data('user-merge-url');
    window.location.href = userMergeUrl + "?user_keys=" + (user_keys.join(','));
  });
};
