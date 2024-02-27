<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title> | User Admin</title>
    <link href="/images/upload/logo/favicon.png" rel="icon" />
    <link rel='stylesheet' href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'>
    <link href="http://fonts.cdnfonts.com/css/acari-sans" rel="stylesheet">

    <style>
        body{
            background-color: #d3d3d3;
            font-family: 'Acari Sans', sans-serif;
        }
        .container-fluid {
            background-position: center center;
            background-size: cover;
        }
        .login-containder {
            width: 320px;
            height: 492px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -246px;
            margin-left: -160px;
            background: white;
            padding: 30px 30px 0 30px;
            border-radius: 20px;
        }
        .login-containder img {
            display: block;
            width: auto;
            margin: auto;
            margin-bottom: 50px;
        }
        .login-containder #email,
        .login-containder #password,
        .login-containder input[type="submit"] {
            height: 44px;
            border-radius: 25px;
            background-color: rgba(255, 255, 255, .8);
            background-repeat: no-repeat;
            background-position: 14px 14px;
            padding: 0 20px;
            color: #444;
        }
        .login-containder #email,
        .login-containder #password {
            border: 1px solid #F0F0F1;
            box-sizing: border-box;
            border-radius: 40px;
            background: #F8F9FA url('/kipo_admin/images/user.svg');
            margin-top: 10px;
        }

        .login-containder #email:focus,
        .login-containder #password:focus{
            outline: none !important;
            box-shadow: none;
        }

        .login-containder .col-lg-4 {
            width: auto;
        }
        .login-containder #password {
            background: #F8F9FA url('/kipo_admin/images/pass.svg');
        }
        .login-containder .timer {
            font-size: 100px;
        }
        .login-containder input[type="submit"] {
            width: 115px;
            display: block;
            margin: auto;
            margin-top: 40px;
            background-color: #00ADEE;
            font-size: 16px;
            line-height: 46px;
            color: #fff;
            padding: 0;
            border: none;
        }
        .login-containder .brute-force-prevent {
            color: #fff;
            text-align: center;
        }

        label {
            position: relative;
            font-size: 16px;
            margin-bottom: 0;
            color: #5B626B;
            font-weight: normal;
            width: 100%;
        }

        span,.eye {
            display: inline-block;
            width: 18px;
            height: 18px;
            position: absolute;
            right: 20px;
            margin: 0;
            top: 46px;
            background: url("/images/eye-closed.svg") no-repeat;
        }
        span:hover {
            cursor: pointer;
        }
        .eye {
            background-image: url("/images/eye-open.svg");
        }
        .form-group:not(:last-of-type) {
            margin-bottom: 20px;
        }
        #copyright {
            color: #999999;
            font-size: 12px;
            margin-top: 50px;
            text-align: center;
        }
        #copyright a {
            color: #999999;
        }
    </style>
</head>
<body>

<div class='container-fluid' style="background-image: url('https://source.unsplash.com/user/kipo/likes/1600x1000');">
    <div class="login-containder">
        <img src='/images/kipo-logo.svg' alt="Kipo Logo"/>
        <form>
            <div class='form-group'>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="E-mail" value="" class="form-control" />
            </div>
            <div class='form-group'>
                <label for="password">Password
                    <input type="password"
                           name="password"
                           id="password"
                           placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                           class="form-control " />
                    <span></span>
                </label>

            </div>
            <div class='form-group'>
                <input type="submit" value="Login" class="btn btn-primary" />
            </div>
        </form>
        <div id="copyright">&copy; <a href="http://kipo.bg">KipoEngine 2021</a></div>
    </div>

</div>

<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script>
    $.ajaxSetup({
        xhrFields: { withCredentials: true }
    });

    var token = '{{ csrf_token() }}';

    $('form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);


        var success = form.prev('.success');

        var formData = form.serializeArray();

        success.html('');

        for (var i in formData) {
            form.find('[name="' + formData[i].name + '"]').css('border-color', 'rgba(255, 255, 255, .8)');
        }

        $.ajax({
            url: '{{ route('post.login') }}',
            data: form.serialize(),
            headers: {
                'X-CSRF-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest'
            },
            dataType: "json",
            type: 'POST',
            success: function(response){
                location.href = response.redirect;
            }, error: function(jqXHR, textStatus, errorThrown) {

                if(jqXHR.status == 422) {
                    var response = JSON.parse(jqXHR.responseText);

                    for(var i in response.errors) {
                        console.log(form.find('[name="' + i + '"]'));
                        form.find('[name="' + i + '"]').css('border-color', 'red');
                    }
                }

            }

        });
    });
    $(document).ready(function() {
        var $windowHeight = $(document).height();
        $('body').css('height', $windowHeight);
        $('.container-fluid').css({'height': $windowHeight});

        $('span').on('click', function () {

            $(this).toggleClass('eye')

            var passwordFieldType = $(this).prev().attr('type');
            if(passwordFieldType === 'password') {
                $(this).prev().attr('type', 'text');
                $(this).addClass('eye');
            } else {
                $(this).removeClass('eye');
                $(this).prev().attr('type', 'password');

            }
        })
    });

</script>
</body>
</html>