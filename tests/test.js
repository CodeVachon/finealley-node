var assert = require('assert'),
    validation = require("./../bin/validateEmailForm")
;

describe("Validation of Email Form", function() {
    it("Returns null when everything is ok", function(done) {
        var testValues = {
            emailAddress: "test@test.test",
            name: "Test Name",
            subject: "Test Subject",
            message: "This is a Test Message"
        };
        var errors = validation.validate(testValues);
        assert.equal(errors, null);
        assert.ok(!errors);
        done();
    });

    describe("Missing Form Data", function() {
        it("Returns that Email Address is Missing", function(done) {
            var testValues = {
                name: "Test Name",
                subject: "Test Subject",
                message: "This is a Test Message"
            };
            var errors = validation.validate(testValues);
            assert.ok(errors);
            assert.ok(errors.emailAddress)
            done();
        });

        it("Returns that Name is Missing", function(done) {
            var testValues = {
                emailAddress: "test@test.test",
                subject: "Test Subject",
                message: "This is a Test Message"
            };
            var errors = validation.validate(testValues);
            assert.ok(errors);
            assert.ok(errors.name)
            done();
        });

        it("Returns that Message is Missing", function(done) {
            var testValues = {
                emailAddress: "test@test.test",
                name: "Test Name",
                subject: "Test Subject",
            };
            var errors = validation.validate(testValues);
            assert.ok(errors);
            assert.ok(errors.message)
            done();
        });

        it("Returns that Email and Name is Missing", function(done) {
            var testValues = {
                subject: "Test Subject",
                message: "This is a Test Message"
            };
            var errors = validation.validate(testValues);
            assert.ok(errors);
            assert.ok(errors.emailAddress)
            assert.ok(errors.name)
            done();
        });

        it("Returns that Email, Name, and Message is Missing", function(done) {
            var testValues = {
                subject: "Test Subject"
            };
            var errors = validation.validate(testValues);
            assert.ok(errors);
            assert.ok(errors.emailAddress)
            assert.ok(errors.message)
            assert.ok(errors.name)
            done();
        });

        it("Returns that Name, and Message is Missing", function(done) {
            var testValues = {
                emailAddress: "test@test.test",
                subject: "Test Subject"
            };
            var errors = validation.validate(testValues);
            assert.ok(errors);
            assert.ok(errors.message)
            assert.ok(errors.name)
            done();
        });

        it("Returns that Email, and Message is Missing", function(done) {
            var testValues = {
                name: "Test Name",
                subject: "Test Subject"
            };
            var errors = validation.validate(testValues);
            assert.ok(errors);
            assert.ok(errors.emailAddress)
            assert.ok(errors.message)
            done();
        });
    });

    describe("Email Address Validation", function() {
        it("Returns error with Bad Email Address", function(done) {
            var testValues = {
                emailAddress: "test@test.test",
                name: "Test Name",
                subject: "Test Subject",
                message: "This is a Test Message"
            };
            var errors, testAddresses = [
                "3sdf@cows.fuckme",
                "plainaddress",
                "#@%^%#$@#$@#.com",
                "@example.com",
                "Joe Smith <email@example.com>",
                "email.example.com",
                "email@example@example.com",
                ".email@example.com",
                "email.@example.com",
                "email..email@example.com",
                "あいうえお@example.com",
                "email@example.com (Joe Smith)",
                "email@example",
                "email@-example.com",
                "email@111.222.333.44444",
                "email@example..com",
                "Abc..123@example.com"
            ];

            for (var i=0, x=testAddresses.length; i<x; i++) {
                testValues.emailAddress = testAddresses[i];
                errors = validation.validate(testValues);
                if (!errors) {
                    throw new Error("Expected ["+testAddresses[i]+"] to Fail");
                }
                assert.ok(errors.emailAddress);
            }
            done();
        });
        it("Returns null with Good Email Address", function(done) {
            var testValues = {
                emailAddress: "test@test.test",
                name: "Test Name",
                subject: "Test Subject",
                message: "This is a Test Message"
            };
            var errors, testAddresses = [
                "email@example.com",
                "firstname.lastname@example.com",
                "email@subdomain.example.com",
                "firstname+lastname@example.com",
                "email@123.123.123.123",
                "email@example-one.com",
                "email@example.name",
                "email@example.museum",
                "email@example.co.jp",
                "firstname-lastname@example.com"
            ];

            for (var i=0, x=testAddresses.length; i<x; i++) {
                testValues.emailAddress = testAddresses[i];
                errors = validation.validate(testValues);
                assert.equal(errors, null);
                assert.ok(!errors);
            }
            done();
        });
    });
});
