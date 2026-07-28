export const POSICOES_OVO = [
  { andar: "Andar1", x: 30 * 32 + 16, y: 20 * 32 + 16 }, //✅ churrasqueira
  { andar: "Andar1", x: 38 * 32 + 16, y: 31 * 32 + 16 }, //✅ meio da sala
  { andar: "Andar1", x: 23 * 32 + 16, y: 22 * 32 + 16 }, //✅ banheiro de fora
  { andar: "Andar1", x: 36 * 32 + 16, y: 21 * 32 + 16 }, //✅ área de integra
  { andar: "Andar1", x: 52 * 32 + 16, y: 30 * 32 + 16 }, //✅ quarto da frente
  { andar: "Andar1", x: 37 * 32 + 16, y: 37 * 32 + 16 }, //✅ sala de jantar
  { andar: "Andar1", x: 45 * 32 + 16, y: 37 * 32 + 16 }, //✅ cozinha
  { andar: "Andar1", x: 54 * 32 + 16, y: 39 * 32 + 16 }, //✅ lavanderia
  { andar: "Andar1", x: 27 * 32 + 16, y: 37 * 32 + 16 }, //✅ quarto do meio
  { andar: "Andar1", x: 18 * 32 + 16, y: 37 * 32 + 16 }, //✅ quarto de 3
  { andar: "Andar1", x: 17 * 32 + 16, y: 28 * 32 + 16 }, //✅ suíte
  { andar: "Andar1", x: 27 * 32 + 16, y: 28 * 32 + 16 }, //✅ banheiro do meio
  { andar: "Andar2", x: 3 * 32 + 16, y: 2 * 32 + 16 }, //✅
  { andar: "Andar2", x: 5 * 32 + 16, y: 5 * 32 + 16 }, //✅
];

export function sortearNovoOvo(game) {
  const posicaoSorteada = Phaser.Math.RND.pick(POSICOES_OVO);
  game.registry.set("posicaoOvo", posicaoSorteada);
}