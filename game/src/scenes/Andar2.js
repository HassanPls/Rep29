import CenaAndar from "./CenaAndar.js";

export default class Andar2 extends CenaAndar {
  constructor() {
    super("Andar2");
  }

  init() {
    this.estaEmGameOver = false;
  }

  preload() {
    this.load.tilemapTiledJSON("mapa_casa2", "assets/Casa/mapa_casa2.json");
    this.load.image("ovo_imagem", "assets/ovo.png");
    this.load.audio("som_ovo", "assets/ovo_som.mp3");
    this.load.image("seta_imagem", "assets/seta-0001.png");

    this.load.spritesheet("inimigo_spritesheet", "assets/enemy-0001.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(data) {
    this.cameras.main.fadeIn(400, 0, 0, 0);

    const mapa = this.make.tilemap({ key: "mapa_casa2" });
    const tileset = mapa.addTilesetImage("Tileset_casa", "tiles_imagem");

    mapa.createLayer("chao", tileset, 0, 0);
    mapa.createLayer("moveis", tileset, 0, 0);

    const spawnX = data.spawnX || 2 * 32;
    const spawnY = data.spawnY || 16;

    this.player = this.physics.add.sprite(spawnX, spawnY, "player_spritesheet");
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setSize(20, 20);

    this.carregarColisoes(mapa);
    this.criarSetasEInputs();

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(3);

    this.configurarEscadaDescida();
    this.gerenciarOvo();

    this.inimigos = [];

    this.inimigos.push(
      this.criarInimigo(3 * 32 + 16, 2 * 32 + 16, [
      { x: 3 * 32 + 16, y: 2 * 32 + 16 },
      { x: 6 * 32 + 16, y: 2 * 32 + 16 },
      { x: 6 * 32 + 16, y: 8 * 32 + 16 },
      { x: 3 * 32 + 16, y: 8 * 32 + 16 },
      { x: 3 * 32 + 16, y: 2 * 32 + 16 },
      ])
    );
  }

  configurarEscadaDescida() {
    const escadaDescida = this.add.zone(2 * 32, 0 * 32, 64, 8);
    this.physics.add.existing(escadaDescida, true);

    let mudandoDeCena = false;

    this.physics.add.overlap(this.player, escadaDescida, () => {
      if (!mudandoDeCena) {
        mudandoDeCena = true;
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          () => {
            this.scene.start("Andar1", {
              spawnX: 33 * 32,
              spawnY: 30 * 32 + 8,
            });
          },
        );
      }
    });
  }

  update() {
    this.tratarMovimento();

    const dadosOvo = this.registry.get("posicaoOvo");
    const mX = this.mapaX || 0;
    const mY = this.mapaY || 0;

    if (dadosOvo) {
      if (dadosOvo.andar === "Andar2") {
        this.atualizarSetaGuia(dadosOvo.x + mX, dadosOvo.y + mY);
      } else {
        const escadaX = 1 * 32 + 32 + mX;
        const escadaY = 0 * 32 + 4 + mY;
        this.atualizarSetaGuia(escadaX, escadaY);
      }
    }
    
    if (this.inimigos) {
      this.inimigos.forEach((inimigo) => this.atualizarInimigo(inimigo));
    }
  }
}
