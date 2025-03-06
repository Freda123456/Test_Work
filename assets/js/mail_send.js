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
            console.log("Message Sent Successfully");  // Log success to the console
            console.log("Response from Formspree:", response);  // Log Formspree response
           

            // Show success message on the page
            jQuery('#suce_message').show();  // Show success message
            jQuery('#suce_message').text("Message Sent Successfully");  // Success message text
            jQuery("#contact-form")[0].reset();  // Reset form fields

            // Auto-refresh the page after 0.3 seconds
            setTimeout(function() {
                location.reload();  // Refresh the page after 0.3 seconds
            }, 300);  // 0.3 seconds delay before page refresh
        },
        error: function(xhr, status, error) {
            // Log detailed error to the console
            console.error("AJAX Error:", xhr, status, error);

            // Show error message on the page
            jQuery('#err_message').hide();
            jQuery('#err_message').text("Something went wrong. Please try again later.");  // Error message
            // Optionally reset the form after an error
            jQuery("#contact-form")[0].reset(); 
        }
    });
}

// Attach form submit event to the form submit button
jQuery("#contact-form").submit(send_mail);  // Call the send_mail function on form submit
