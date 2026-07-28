import { config } from "./config.js";

const game = new Phaser.Game(config);

if (game.registry.get("ovosColetados") === undefined) {
  game.registry.set("ovosColetados", 0);
}

game.registry.events.on("changedata-ovosColetados", (parent, value) => {
  const elContador = document.getElementById("contador-ovos");
  if (elContador) {
    elContador.innerText = value;
  }
});
