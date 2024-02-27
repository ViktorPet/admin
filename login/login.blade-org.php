<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title> | User Admin</title>
    <link href="/images/upload/logo/favicon.png" rel="icon" />
    <link rel='stylesheet' href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'>
    <style>
        body{
            background-color: #d3d3d3;
        }
        .container-fluid {
            background-position: center center;
            background-size: cover;
        }
        .login-containder {
            width: 300px;
            height: 320px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -160px;
            margin-left: -150px;
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
            height: 50px;
            border-radius: 25px;
            background-color: rgba(255, 255, 255, .8);
            background-repeat: no-repeat;
            background-position: 14px 14px;
            padding: 0 50px;
            color: #444;
        }
        .login-containder #email {
            background-image: url('/kipo_admin/images/user.svg');
        }
        .login-containder .col-lg-4 {
            width: auto;
        }
        .login-containder #password {
            background-image: url('/kipo_admin/images/pass.svg');
        }
        .login-containder .timer {
            font-size: 100px;
        }
        .login-containder input[type="submit"] {
            width: 150px;
            display: block;
            margin: auto;
            margin-top: 40px;
            background-color: #00b5ff;
            text-transform: uppercase;
            font-size: 18px;
            font-weight: 400;
            color: #fff;
        }
        .login-containder .brute-force-prevent {
            color: #fff;
            text-align: center;
        }
        #copyright {
            position: absolute;
            text-align: center;
            bottom: 2%;
            left: 50%;
            width: 200px;
            margin-left: -100px;
            color: white;
            font-size: 12px;
        }
        #copyright a {
            color: white;
        }
    </style>
</head>
<body>

<div class='container-fluid' style="background-image: url('https://source.unsplash.com/user/kipo/likes/1600x1000');">
    <div class="login-containder">
        <img src='/images/kipo-logo.svg' alt="Kipo Logo"/>
        <form>
            <div class='form-group'>
                <input type="email" name="email" id="email" placeholder="E-mail" value="" class="form-control" />
            </div>
            <div class='form-group'>
                <input type="password" name="password" id="password" placeholder="Password" class="form-control" />
            </div>
            <div class='form-group'>
                <input type="submit" value="Log In"class="btn btn-primary" />
            </div>
        </form>
    </div>
    <div id="copyright">&copy; 2020 <a href="http://kipo.bg">KipoEngine</a></div>
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
    });

</script>
</body>
</html>