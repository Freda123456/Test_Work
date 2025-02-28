function send_mail(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way
    var name = jQuery("#name").val();
    var email = jQuery("#email").val();
    var subject = jQuery("#subject").val();
    var message = jQuery("#message").val();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var flag = 0;

    // Form Validation
    if (name == "") {
        jQuery("#name").addClass('invalid');
        jQuery("#val_user_name").html("Your Name is Required");
        flag = 1;
    } else {
        jQuery("#name").removeClass('invalid');
        jQuery("#val_user_name").html("");
    }

    if (email == "") {
        jQuery("#email").addClass('invalid');
        jQuery("#val_user_email").html("Please Enter Email");
        flag = 1;
    } else if (!email.match(mailformat)) {
        jQuery("#email").addClass('invalid');
        jQuery("#val_user_email").html("Please Enter Valid Email");
        flag = 1;
    } else {
        jQuery("#email").removeClass('invalid');
        jQuery("#val_user_email").html("");
    }

    if (subject == "") {
        jQuery("#subject").addClass('invalid');
        jQuery("#val_subject").html("Subject is Required");
        flag = 1;
    } else {
        jQuery("#subject").removeClass('invalid');
        jQuery("#val_subject").html("");
    }

    if (message == "") {
        jQuery("#message").addClass('invalid');
        jQuery("#val_message").html("Please Describe your thoughts");
        flag = 1;
    } else {
        jQuery("#message").removeClass('invalid');
        jQuery("#val_message").html("");
    }

    // If any validation fails, stop the function and prevent form submission
    if (flag == 1) {
        return false; // Stop if validation fails
    }

    // Prepare the data to send via AJAX
    var data = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
    };

    // Send form data via AJAX to Formspree
    jQuery.ajax({
        type: "POST",
        url: "https://formspree.io/f/mwpvyyrd",  // Formspree endpoint
        data: data,
        success: function(response) {
            // Handle successful submission
            jQuery('#suce_message').show();
            jQuery('#suce_message').text("Message Sent Successfully");  // Success message text
            jQuery("#contact-form")[0].reset();  // Reset form fields

            // Delay page refresh for 2 seconds after success message
            setTimeout(function() {
                location.reload();  // Refresh the page after 2 seconds
            }, 2000);  // 2 seconds delay before page refresh
        },
        error: function(xhr, status, error) {
            // No error message will be shown if AJAX fails
            console.error("Error details: ", xhr.responseText);  // Log error in console for debugging
        }
    });
}

// Attach form submit event to the form submit button
jQuery("#contact-form").submit(send_mail);  // Call the send_mail function on form submit
