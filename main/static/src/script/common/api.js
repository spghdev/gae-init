window.apiCall = function(method, url, params, data, callback) {
  callback = callback || data || params;
  data = data || params;
  if (arguments.length === 4) {
    data = void 0;
  }
  if (arguments.length === 3) {
    params = void 0;
    data = void 0;
  }
  params = params || {};
  for (var index in params) {
    if (params[index] == null) {
      delete params[index];
    }
  }
  var separator = url.search('\\?') >= 0 ? '&' : '?';
  $.ajax({
    type: method,
    url: "" + url + separator + ($.param(params)),
    contentType: 'application/json',
    accepts: 'application/json',
    dataType: 'json',
    data: data ? JSON.stringify(data) : void 0,
    success: function(data) {
      var more;
      if (data.status === 'success') {
        more = void 0;
        if (data.next_url) {
          more = function(callback) {
            apiCall(method, data.next_url, {}, callback);
          };
        }
        typeof callback === "function" ? callback(void 0, data.result, more) : void 0;
      } else {
        typeof callback === "function" ? callback(data) : void 0;
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      var error = {
        error_code: 'ajax_error',
        text_status: textStatus,
        error_thrown: errorThrown,
        jqXHR: jqXHR
      };
      try {
        if (jqXHR.responseText) {
          error = $.parseJSON(jqXHR.responseText);
        }
      } catch (e) {
        error = e;
      }
      LOG('apiCall error', error);
      typeof callback === "function" ? callback(error) : void 0;
    }
  });
};
