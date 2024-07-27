let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

let slider = document.querySelector(".main");
let sliderList = slider.querySelector(".main .list");
let thumbnail = document.querySelector(".main .thumbnail");
let thumbnailItems = thumbnail.querySelectorAll(".item");

thumbnail.appendChild(thumbnailItems[0]);

nextBtn.onclick = function () {
  moveSlider("next");
};

prevBtn.onclick = function () {
  moveSlider("prev");
};

//Slider Function
function moveSlider(direction) {
  let sliderItems = sliderList.querySelectorAll(".item");
  let thumbnailItems = document.querySelectorAll(".thumbnail .item");

  if (direction === "next") {
    sliderList.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    sliderList.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
    slider.classList.add("prev");
  }

  slider.addEventListener(
    "animationend",
    function () {
      if (direction === "next") {
        slider.classList.remove("next");
      } else {
        slider.classList.remove("prev");
      }
    },
    { once: true }
  );
}

//Touch Functionality for Mobile Devices
let startX = 0;
let currentX = 0;
let threshold = 50;
let isSwiping = false;

thumbnail.addEventListener("touchstart", function (event) {
  startX = event.touches[0].clientX;
  isSwiping = true;
});

thumbnail.addEventListener("touchmove", function (event) {
  if (!isSwiping) return;
  currentX = event.touches[0].clientX;
});

thumbnail.addEventListener("touchend", function (event) {
  if (!isSwiping) return;
  let diffX = startX - currentX;
  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      moveSlider("next");
    } else {
      moveSlider("prev");
    }
  }
  isSwiping = false;
});
