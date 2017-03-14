$(function() {
  initCommon();

  $('html.auth').each(function() {
    initAuth();
  });

  $('html.user-list').each(function() {
    initUserList();
  });

  $('html.user-merge').each(function() {
    initUserMerge();
  });
});
