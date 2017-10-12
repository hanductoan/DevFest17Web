// When the DOM is ready, run this function
$(document).ready(function() {

    //Set the carousel options
    $('#quote-carousel').carousel({
        pauseOnHover: true,
        interval: 4000,
    });
    // Add scrollspy to <body>
    $('body').scrollspy({ target: ".navbar", offset: 85 });

    // Add smooth scrolling on all links inside the navbar

    $("#top-navbar a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 83
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $(".to-top").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 85
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    var run_status = 0;
    $(window).scroll(function() {
        if ($('body').scrollTop() < $("#intro-section").offset().top - 800) {
            $("#top-navbar li").removeClass("active");
        } else {
            $("#top-navbar>li").addClass("active");
        }
        if ($('body').scrollTop() > $("#intro-section").offset().top - 500) {
            if (run_status == 0) {
                run_status = 1;
                $('.navbar').addClass("navbar-fixed-top").animate({ top: 0 }, 500);
            }
        } else {
            if (run_status == 1) {
                run_status = 0;
                $('.navbar').removeClass("navbar-fixed-top", 1000, "easeOutQuint");
            }
        }
    });

    // $("#reg-form-submit").click(function() {
    //     $('#reg-form-submit').fadeOut(500, function() {
    //         $('.loader').fadeIn(2000, function() {
    //             $('.loader').fadeOut("slow", function() {
    //                 $('#thankyou_message').fadeIn(1000);
    //             });
    //         });
    //     });
    // });


    $(document).ready(function() {
        var date_input = $('input[name="date"]'); //our date input has the name "date"
        var container = $('.register-form form').length > 0 ? $('.register-form form').parent() : "body";
        date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        });
    });

});