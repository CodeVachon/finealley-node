var _contactForm = $('<form>',{action:'post', method:'/send'}).on('submit', function(e) {
    e.preventDefault();
    var _data = $(this).serialize();
    var _button = $(this).find('button');
    console.log("Send Message!!!");
    console.log(_data);
    _button.html("Sending...").addClass('disabled');
    $.post('/send',_data,function(response) {
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
