/* function sobe(elemento){
    elemento.style.transform = "translateY(-10%)";
}

function desce(elemento){
    elemento.style.transform = "translateY(0%)";
}

let pontos = Array.from(document.querySelectorAll(".pontos"));
pontos.forEach(elemento => {
    elemento.addEventListener("mouseenter", () => sobe(elemento));
    elemento.addEventListener("mouseleave", () => desce(elemento));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); 
    }
  });
}, {
  threshold: 0.15 
});

pontos.forEach((el) => observer.observe(el));


let fotos_casa = Array.from(document.querySelectorAll(".fotos_casa"));
let btnLeft = document.getElementById("desliza_esquerda");
let btnRight = document.getElementById("desliza_direita");
let container_fotos = document.getElementById("container_fotos_casa");
let pos = 0;

function atualiza(){
    fotos_casa.forEach(foto => foto.classList.remove("active"));
    
    fotos_casa[pos].classList.add("active");
    const centroDaTela = window.innerWidth / 2;
    
    const dadosDaFoto = fotos_casa[pos].getBoundingClientRect();
    const centroDaFoto = dadosDaFoto.left + (dadosDaFoto.width / 2);
    
    const diferencaParaOCentro = centroDaFoto - centroDaTela;

    container_fotos.scrollBy({
        left: diferencaParaOCentro,
        behavior: "smooth"
    });
}

btnRight.addEventListener("click", () => {
    if (pos < fotos_casa.length - 1) {
        pos++;
    } else {
        pos = 0; 
    }
    atualiza();
});

btnRight.addEventListener("mouseenter",()=>{
    btnRight.style.opacity = "1"
});

btnRight.addEventListener("mouseleave",()=>{
    btnRight.style.opacity = "60%"
});

btnLeft.addEventListener("mouseenter",()=>{
    btnLeft.style.opacity = "1"
});

btnLeft.addEventListener("mouseleave",()=>{
    btnLeft.style.opacity = "60%"
});

btnLeft.addEventListener("click", () => {
    if (pos > 0) {
        pos--;
    } else {
        pos = fotos_casa.length - 1;
    }
    atualiza();
});

window.addEventListener("load", () => {
    atualiza();
});


let moradores = Array.from(document.querySelectorAll(".moradores"));
moradores.forEach(morador => {
    morador.addEventListener("mouseenter", () => sobe(morador));
    morador.addEventListener("mouseleave", () => desce(morador));
})

moradores.forEach((el) => observer.observe(el)); */