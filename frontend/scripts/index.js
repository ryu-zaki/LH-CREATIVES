

/* Slider Images */
const sliderWrapper = document.querySelector(".slider__wrapper");
const imgsNum = ["1", "2", "3"];
const sliderArr = imgsNum.map(num => `<img src="assets/visual/slide0${num}.jpg" alt="">`);


const sliderBtns = document.querySelectorAll("[data-slider-btns]")

sliderBtns.forEach(btn => {
    btn.addEventListener('click', ({target}) => {
      const {id} = target;

      if (id == "next") {
        sliderArr.push(sliderArr[0]);
        sliderArr.shift();
      } else {
        sliderArr.unshift(sliderArr[sliderArr.length - 1]);
        sliderArr.pop();
      }
      
      sliderWrapper.innerHTML = sliderArr.join("");
    })
})

sliderWrapper.innerHTML = sliderArr.join("");






