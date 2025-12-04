// Get the button element
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down, show or hide the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollToTopBtn.style.display = "block"; // Show the button
  } else {
    scrollToTopBtn.style.display = "none"; // Hide the button
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling animation
  });
};
