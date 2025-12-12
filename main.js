/*
add event handler on video-button
*/
document.addEventListener("DOMContentLoaded", () => {
  const videoButton = document.getElementById("video-button");
  const figure = document.querySelector(".landing header figure");
  const video = document.querySelector(".landing video");
  const overlay = document.querySelector(".overlay");
  let clicked = false;
  let isPlaying = false;
  const clickHandler = () => {
    clicked = !clicked;
    if (clicked) {
      /*
      the static image is faded in faster than the video
      */
      overlay.style.transitionDuration = "1s";
      overlay.style.transitionTimingFunction = "ease-out";
      video.style.transitionDuration = "3s";
    } else {
      /*
      the video is faded out faster than the static image
      */
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
  };
  videoButton.addEventListener("click", clickHandler);
  figure.addEventListener("click", clickHandler);
});
