$(document).ready(function(){
    $("#loginButton").click(function(){
        let form = document.getElementById("loginForm");
        let data = new FormData(form);
        let login = {};
        data.forEach((value, key) => {login[key] = value});
        $.post("https://reqres.in/api/login", login, {headers: {'content-type': 'application/json'}}).done(function() {
                window.location.assign("members.html");
            }).fail(function() {
                    $('#loginError').html('Invalid login credentials');
                    $('#email').attr('class', "invalidLogin");
                    $('#password').attr('class', "invalidLogin");
                });
        });
});