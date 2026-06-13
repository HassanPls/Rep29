const button = document
  .getElementById("localizacao")
  .getElementsByClassName("card-button")[0];
const textoBenefits = document
  .getElementById("localizacao")
  .getElementsByClassName("card-description")[0];

const textos = [
    "Excelente localização, a apenas 10 minutos de caminhada da entrada principal da USP e do ponto de onde partem os ônibus intercampi com destino ao Campus 2.",
    "Situado bem em frente a um parque público que oferece diversas atividades de lazer semanais, além de contar com espaço adequado para corrida e aparelhos de musculação ao ar livre.",
    "A apenas 15 minutos de distância do Shopping Passeio, um centro comercial completo que dispõe de academia, supermercado, farmácia e diversos outros serviços essenciais.",
    "Localização privilegiada para estudantes, a apenas 10 minutos de distância do restaurante universitário da USP (popularmente conhecido como bandeco)."
]

let index = 0
textoBenefits.innerHTML = textos[index]

button.addEventListener("click", () => {
    index = index == 3 ? 0 : index + 1
    textoBenefits.innerHTML = textos[index]
});

