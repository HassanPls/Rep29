const track = document.getElementById("carousel-track");
const slides = Array.from(track.children); 
const indicatorsContainer = document.getElementById("carousel-indicators");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let i = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = `carousel-dot ${index === 0 ? "active" : "inactive"}`;
  dot.addEventListener("click", () => irParaSlide(index));
  indicatorsContainer.appendChild(dot);
});

const dots = indicatorsContainer.children;

function atualizarCarrossel() {
  track.style.transform = `translateX(-${i * 100}%)`;

  Array.from(dots).forEach((dot, index) => {
    if (index === i) {
      dot.classList.add("active");
      dot.classList.remove("inactive");
    } else {
      dot.classList.remove("active");
      dot.classList.add("inactive");
    }
  });
}

function irParaSlide(index) {
  i = index;
  atualizarCarrossel();
}

nextBtn.addEventListener("click", () => {
  i = (i + 1) % slides.length;
  atualizarCarrossel();
});

prevBtn.addEventListener("click", () => {
  i = (i - 1 + slides.length) % slides.length;
  atualizarCarrossel();
});

setInterval(() => {
  nextBtn.click();
}, 5000);
