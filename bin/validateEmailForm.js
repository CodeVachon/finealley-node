exports.validate = function(formfields) {
    var errors = {};

    if (formfields.emailAddress) {

        if (
            (formfields.emailAddress.replace(/\.{1,}/,".") != formfields.emailAddress) ||
            (!/^[a-zA-Z][a-zA-Z0-9\+\._-]{1,}[a-zA-Z0-9]@([a-zA-Z][a-zA-Z0-9\._-]{2,}\.[a-zA-Z]{2,10}|\[?[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]?)$/.test(formfields.emailAddress))
        ) {
            errors.emailAddress = "Invalid Email Address ["+formfields.emailAddress+"]";
        }
    } else {
        errors.emailAddress = "Email Address is Required";
    }

    if (formfields.message) {
        if (formfields.message.length < 10) {
            errors.message = "Message Length is too Short";
        }
    } else {
        errors.message = "A Message is Required";
    }

    if (formfields.name) {
        if (formfields.name.length < 3) {
            errors.name = "Name is too Short";
        }
    } else {
        errors.name = "Name is Required";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return null;
    }
} // close validate
