document.addEventListener("DOMContentLoaded", () => {
  const videoButton = document.getElementById("video-button");
  const video = document.querySelector(".video"); // FIXED
  const overlay = document.querySelector(".overlay");

  let clicked = false;
  let isPlaying = false;

  videoButton.addEventListener("click", () => {
    clicked = !clicked;

    if (clicked) {
      overlay.style.transitionDuration = "1s";
      overlay.style.transitionTimingFunction = "ease-out";
      video.style.transitionDuration = "3s";
    } else {
      overlay.style.transitionDuration = "3s";
      overlay.style.transitionTimingFunction = "ease-in";
      video.style.transitionDuration = "1s";
    }

    overlay.classList.toggle("active");
    video.classList.toggle("active");

    video.pause();
    isPlaying = false;

    setTimeout(() => {
      if (clicked && !isPlaying) {
        video.play();
        isPlaying = true;
      }
    }, 3000);
  });
});

/* Script for Fade in */
ScrollReveal().reveal(".punchline1", { delay: 1000, duration: 1500 });
ScrollReveal().reveal(".punchline2", { delay: 1750, duration: 1500 });
ScrollReveal().reveal(".punchline", { delay: 1250, duration: 1500 });
