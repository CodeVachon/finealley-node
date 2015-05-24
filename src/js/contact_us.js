/*
var _contactForm = $('<form>',{action:'post', method:'/send'}).on('submit', function(e) {
    e.preventDefault();
    var _form = $(this);
    var _data = _form.serialize();
    var _button = _form.find('button');
    console.log("Send Message!!!");
    console.log(_data);

    _form.find('.has-error').removeClass('has-error');
    _form.find('.help-block').remove();

    _button.html("Sending...").addClass('disabled');
    $.post('/send',_data,function(response) {
        console.log("Message Sent!");
        _form.find("input,textarea").val("");
        _alert = $('<div>')
            .addClass("alert alert-success")
            .html("Message Sent!")
            .append('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>')
        ;
        _form.before(_alert.hide().slideDown("fast", function() {
            setTimeout(function() {
                _alert.slideUp("fast", function() {
                    _alert.remove();
                });
            }, 5000);
        }));
    }).fail(function(errors) {
        console.log(errors.responseJSON);
        _alert = $('<div>')
            .addClass("alert alert-danger")
            .html("Sorry, an Error Occured!")
            .append('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>')
        ;
        _form.before(_alert.hide().slideDown("fast", function() {
            setTimeout(function() {
                _alert.slideUp("fast", function() {
                    _alert.remove();
                });
            }, 5000);
        }));
        var errorKeys = Object.keys(errors.responseJSON.errors);
        for (var i=0, x=errorKeys.length; i<x; i++) {

            var key = errorKeys[i];
            console.log("error key: " + key);
            $('[name="'+key+'"]')
                .after($('<span>').addClass('help-block').html(errors.responseJSON.errors[key]))
                .closest('.form-group').addClass('has-error')
            ;
        }
    }).always(function() {
        _button.html("Send").removeClass('disabled');
    });

}).append(
    $('<div>').addClass('form-group')
        .append($('<label>',{for:"name"}).html("Your Name"))
        .append($('<input>',{type:"text",name:"name",placeholder:"Lover of Fine Music"}).addClass("form-control"))
).append(
    $('<div>').addClass('form-group')
        .append($('<label>',{for:"emailAddress"}).html("Email Address"))
        .append($('<input>',{type:"email",name:"emailAddress",placeholder:"Your Email Address"}).addClass("form-control"))
).append(
    $('<div>').addClass('form-group')
        .append($('<label>',{for:"subject"}).html("Subject"))
        .append($('<input>',{type:"text",name:"subject",placeholder:"I Love Your Band!"}).addClass("form-control"))
).append(
    $('<div>').addClass('form-group')
        .append($('<label>',{for:"message"}).html("Your Message to Fine Alley"))
        .append($('<textarea>',{name:"message",rows:6}).addClass("form-control"))
).append(
    $('<button>',{type:"submit"}).addClass('btn btn-primary btn-lg').html("Send")
);

$('#contact-us')
    .append($('<h2>').html("Send Us a Message!"))
    .append(_contactForm)
;
*/
