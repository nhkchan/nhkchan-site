$(document).ready(function() {

  var c = Cookies.get();
  var logon = Cookies.get('isLoggedIn');
  var userNameCookie = Cookies.get('userName');
  console.log(c);

  if (logon == 1) {
    $('nav #nhkchan-prof').empty();
    var profNHK = '<a href="/">' + userNameCookie + '</a>';
    $('nav #nhkchan-prof').prepend(profNHK);
  }

  /*******************

        Functions

  *******************/

  $("#signinform").submit(function(e) {

      var url = "http://192.168.1.159:8080/login"; // the script where you handle the form input.

      var formData = {
          'username': $('input[name=username]').val(),
          'password': $('input[name=password]').val()
      };

      $.ajax({
             type: "POST",
             url: url,
             //data: $("#signinform").serialize(), // serializes the form's elements.
             data: formData,
             dataType: 'json',
             encode: true
           })
      .done(function(data){
        if (data.nhkchanStat == 'Success') {
          var sucAlert = '<div class="alert alert-success"> <strong>Success!</strong> ' + data.statReason + '</div>';
          $(".alert.alert-danger").remove();
          $(".container").prepend(sucAlert);
          Cookies.set('isLoggedIn', 1, {expires: 1});
          Cookies.set('userName', formData.username, {expires: 1});
          Cookies.remove('failedAttempt', { path: '/login' });
          window.location.href = '/';
        }
        else if (data.nhkchanStat == 'Fail') {
          var negAlert = '<div class="alert alert-danger"> <strong>Error!</strong> ' + data.statReason + '</div>';
          $(".alert.alert-danger").remove();
          $(".container").prepend(negAlert)
          //if ($('.alert-danger').length == 0) {$(".container").prepend(negAlert)};
          Cookies.set('failedAttempt', 1, { expires: 30, path: '/login'});
        }
        else {
          console.log('unexpected');
        }
        console.log(data);
        //var jresp = $.parseJSON(data);
        //console.log(jresp.nhkchanStat);
      });

      e.preventDefault(); // avoid to execute the actual submit of the form.
  });

});  