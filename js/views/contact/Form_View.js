define(['backbone', 'jquery', 'underscore', 'text!templates/formTemplate.html'],
    function (Backbone, $, _, formTemplate) {

        var $contactForm, $statusFrame, $status;

        var Form_View = Backbone.View.extend({

            events: {
                'click #contact-submit': 'onFormSubmitted'
            },

            initialize: function () {
                _.bindAll(this, 'onFormSubmitted', 'validateFormData', 'insertErrorMsg', 'removeErrorMsg', 'submitFormData', 'onSuccess','resetForm');
            },

            render: function () {
                $(this.el).html(formTemplate); //not really being used as a template

                $contactForm = $('#contact-form');
                $statusFrame = $('#status-frame');
                $status = $('#status');

                return this;
            },

            onFormSubmitted: function () {
                this.validateFormData();
            },

            validateFormData: function () {

                var $nameField = $('#contact-name'),
                    $companyField = $('#contact-company'),
                    $emailField = $('#contact-email'),
                    $phoneField = $('#contact-phone'),
                    $messageField = $('#contact-message'),
                    $applesField = $('#contact-apples');

                if ($nameField.val().match(/^\s*$/)) { //check if the field is empty or contains only spaces
                    this.insertErrorMsg($nameField, "Please fill in your name.");
                } else {
                    this.removeErrorMsg($nameField);
                }

                if ($companyField.val().match(/^\s*$/)) {
                    $companyField.val('');
                }

                if ($emailField.val().match(/^\s*$/)) {
                    this.insertErrorMsg($emailField, "Please provide an email address.");
                } else if (!$emailField.val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) { //checks to see if email DOESN'T match
                    this.insertErrorMsg($emailField, "The email address you've provided is invalid.");
                } else {
                    this.removeErrorMsg($emailField);
                }

                if ($phoneField.val().match(/^\s*$/)) {
                    $phoneField.val('');
                    this.removeErrorMsg($phoneField);
                } else if (!$phoneField.val().match(/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/)) { //checks to see if phone # DOESN'T match
                    this.insertErrorMsg($phoneField, 'Please make sure your phone number follows this pattern: (###) ###-####.');
                }

                if ($messageField.val().match(/^\s*$/)) {
                    this.insertErrorMsg($messageField, "Please include a message so I'll know why you're contacting me.");
                } else {
                    this.removeErrorMsg($messageField);
                }

                if ($applesField.val().match(/^\s*$/)) {
                    this.insertErrorMsg($applesField, "Hmm... Could it be that you really <em><strong>are</strong></em> a robot?");
                } else {
                    this.removeErrorMsg($applesField);
                }

                this.submitFormData();
            },

            insertErrorMsg: function ($fieldName, errorMsg) {
                //check if the field already has the error class
                if ($fieldName.hasClass('error')) {
                    //yes: update the error div with the new message
                    $fieldName.next().val(errorMsg);
                } else {
                    //no: update the field with error style;
                    $fieldName.addClass('error');
                    //insert the error div after the field with the error message inside
                    $fieldName.after('<div class="error-message">' + errorMsg + '</div>');
                }
            },

            removeErrorMsg: function ($fieldName) {
                //remove any error styling from the field
                $fieldName.removeClass('error');
                //remove the first error div in place after the field
                if ($fieldName.next().hasClass('error-message')) {
                    $fieldName.next().remove();
                }
            },

            submitFormData: function () {
                if (!$contactForm.children().hasClass('error')) {
                    $contactForm.addClass('hidden');
                    $statusFrame.removeClass('hidden');

                    $.post("contact.php", $contactForm.serialize(), this.onSuccess);
                }

                return false;
            },

            //TODO: Add message for error/failure as well

            onSuccess: function () {
                $contactForm.trigger('reset');
                $status.html("Thanks so much for contacting me. I'll do what I can to get back to you as soon as possible, usually in no more than a couple of days.");
            },

            resetForm: function() {
                if ($contactForm.hasClass('hidden')) {
                    $contactForm.removeClass('hidden').trigger('reset');
                    $statusFrame.addClass('hidden');
                    $status.html("Sending...")
                }

            },

            disableForm:function() {

            }
        });
        return Form_View;
    })
;