
// tab animation
$('.section-tab').click(function () {
    $('.active-tab').removeClass('active-tab');
    $(this).addClass('active-tab');

    var classToShow = $(this).data('class');
    $('.section-active').slideUp(function () {
        $(this).removeClass('section-active');
        $('.' + classToShow).slideDown(function () {
            $(this).addClass('section-active');
        });
    });
})

// click to scroll animation
$(".click-down-link").click(function() {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 800, function(){
    
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
    });
    } // End if
});

// copy to clipboard
function copyToClipboard() {
    var copyText = document.getElementById("copy-this");
    copyText.select();
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  }
