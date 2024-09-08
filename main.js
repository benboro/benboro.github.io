
// tab animation
$('.section-tab').click(function () {
    window.location.hash = $(this).data('class');

    $('.active-tab').removeClass('active-tab');
    $(this).addClass('active-tab');

    var classToShow = $(this).data('class');
    $('.section-active').slideUp(function () {
        $(this).removeClass('section-active');
        $('.' + classToShow).slideDown(function () {
            $(this).addClass('section-active');
        });
    });
    $("#PageRefresh").load(" #PageRefresh > *");
})

// click to scroll animation
$(".click-down-link").click(function(event) {
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
};

// modals
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-target]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active-modal')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelectorAll('.modal.active-modal')[0]
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active-modal')
    overlay.classList.add('active-modal')

    document.querySelector("#overlay").classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active-modal')
    overlay.classList.remove('active-modal')
    document.querySelector("#overlay").classList.remove('active')
}

// Code that runs on page load
$(function() {
    const hash = window.location.hash.substring(1)
    const tab = document.querySelector("[data-class=\"" + hash + "\"]")

    if (tab) {
        $('.active-tab').removeClass('active-tab');
        $(tab).addClass('active-tab');

        var classToShow = $(tab).data('class');
        $('.section-active').toggle(0, function () {
            $(this).removeClass('section-active');
            $('.' + classToShow).toggle(0, function () {
                $(this).addClass('section-active');
            });
        });
    }
})();

// Code for Read More/Less button
function changeReadMore() { 
    const mycontent = document.getElementById('mybox1id'); 
    const mybutton = document.getElementById('mybuttonid'); 
  
    if (mycontent.style.display === 'none' || mycontent.style.display === '') { 
        mycontent.style.display = 'block'; 
        mybutton.textContent = 'Read Less'; 
    } else { 
        mycontent.style.display = 'none'; 
        mybutton.textContent = 'Read More'; 
    } 
}