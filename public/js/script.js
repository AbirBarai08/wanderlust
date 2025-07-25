const navbarCollapse = document.getElementById('navbarSupportedContent');
const mainContainer = document.querySelector(".main-container");
const showReviewFormBtn = document.getElementById("show-review-form-btn");
const reviewFormContainer = document.getElementById("review-form-container");
const submitReviewFormBtn = document.getElementById("submit-review-form-btn");
const taxSwitch = document.querySelector("#switchCheckDefault");
const taxInfo = document.querySelectorAll(".tax-info");

navbarCollapse.addEventListener('show.bs.collapse', function () {
  mainContainer.classList.add("navbar-expanded");
});

navbarCollapse.addEventListener('hide.bs.collapse', function () {
  mainContainer.classList.remove("navbar-expanded");
});

//show.bs.collapse is a Bootstrap event that is triggered just before a collapsible element (like your navbar menu) is shown (expanded).
//show.bs.collapse — before the element is shown
// shown.bs.collapse — after the element is shown
// hide.bs.collapse — before the element is hidden
// hidden.bs.collapse — after the element is hidden

(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//Hide the review form container when the submit button is clicked
if(submitReviewFormBtn) {
  submitReviewFormBtn.addEventListener("click" , () => {
  reviewFormContainer.style.display = "none";
})
}

//Show the review form conatiner when the button is clicked
if(showReviewFormBtn) {
  showReviewFormBtn.addEventListener("click" , (e) => {
  e.preventDefault();
  if(isLoggedIn === 'false') {
    window.location.href = "/user/login";
  } else {
    reviewFormContainer.style.display = "block";
  }
})
}

if(taxSwitch) {
  taxSwitch.addEventListener("click" , () => {
    taxInfo.forEach(el => {
        el.classList.toggle("tax-info");
    });
  });
}

window.addEventListener("load" , () => {
  mainContainer.classList.remove("navbar-expanded");
})
