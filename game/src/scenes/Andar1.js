import CenaAndar from "./CenaAndar.js";

export default class Andar1 extends CenaAndar {
  constructor() {
    super("Andar1");
  }

  init() {
    this.estaEmGameOver = false;
  }

  preload() {
    this.load.image("tiles_imagem", "assets/Casa/Tileset_casa.png");
    this.load.tilemapTiledJSON("mapa_andar1", "assets/Casa/mapa_casa.json");
    this.load.spritesheet(
      "player_spritesheet",
      "assets/Marola/Marola-0001.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.image("ovo_imagem", "assets/ovo.png");
    this.load.audio("som_ovo", "assets/ovo_som.mp3");
    this.load.audio("som_lose", "assets/lose.mp3");
    this.load.image("seta_imagem", "assets/seta-0001.png");

    this.load.spritesheet("inimigo_spritesheet", "assets/enemy-0001.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(data) {
    this.cameras.main.fadeIn(400, 0, 0, 0);

    const mapa = this.make.tilemap({ key: "mapa_andar1" });
    const tileset = mapa.addTilesetImage("tileset_casa", "tiles_imagem");

    mapa.createLayer("chao", tileset, 0, 0);
    mapa.createLayer("moveis", tileset, 0, 0);

    const spawnX = data.spawnX || 36 * 32 + 16;
    const spawnY = data.spawnY || 26 * 32 + 16;

    this.player = this.physics.add.sprite(spawnX, spawnY, "player_spritesheet");
    this.player.body.setCollideWorldBounds(true);
    this.player.body.setSize(20, 20);

    this.carregarColisoes(mapa);
    this.criarAnimacoes();
    this.criarSetasEInputs();

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
    this.physics.world.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
    this.cameras.main.setZoom(3);

    this.configurarEscadaSubida();
    this.gerenciarOvo();

    this.inimigos = [];

    this.inimigos.push(
      this.criarInimigo(39 * 32 + 16, 28 * 32 + 16, [
        { x: 39 * 32 + 16, y: 28 * 32 + 16 },
        { x: 34 * 32 + 16, y: 28 * 32 + 16 },
        { x: 34 * 32 + 16, y: 33 * 32 + 16 },
        { x: 39 * 32 + 16, y: 33 * 32 + 16 },
        { x: 39 * 32 + 16, y: 38 * 32 + 16 },
        { x: 35 * 32 + 16, y: 38 * 32 + 16 },
        { x: 35 * 32 + 16, y: 33 * 32 + 16 },
        { x: 34 * 32 + 16, y: 33 * 32 + 16 },
        { x: 34 * 32 + 16, y: 28 * 32 + 16 },
        { x: 39 * 32 + 16, y: 28 * 32 + 16 },
      ])
    );

    this.inimigos.push(
      this.criarInimigo(41 * 32 + 16, 37 * 32 + 16, [
        { x: 41 * 32 + 16, y: 37 * 32 + 16 },
        { x: 49 * 32 + 16, y: 37 * 32 + 16 },
        { x: 41 * 32 + 16, y: 37 * 32 + 16 },
      ])
    );

    this.inimigos.push(
      this.criarInimigo(21 * 32 + 16, 32 * 32 + 16, [
        { x: 21 * 32 + 16, y: 32 * 32 + 16 },
        { x: 31 * 32 + 16, y: 32 * 32 + 16 },
        { x: 21 * 32 + 16, y: 32 * 32 + 16 },
      ])
    );

    this.inimigos.push(
      this.criarInimigo(21 * 32 + 16, 18 * 32 + 16, [
        { x: 21 * 32 + 16, y: 18 * 32 + 16 },
        { x: 39 * 32 + 16, y: 18 * 32 + 16 },
        { x: 21 * 32 + 16, y: 18 * 32 + 16 },
      ])
    );

    this.inimigos.push(
      this.criarInimigo(34 * 32 + 16, 19 * 32 + 16, [
        { x: 34 * 32 + 16, y: 19 * 32 + 16 },
        { x: 38 * 32 + 16, y: 19 * 32 + 16 },
        { x: 38 * 32 + 16, y: 23 * 32 + 16 },
        { x: 34 * 32 + 16, y: 23 * 32 + 16 },
        { x: 34 * 32 + 16, y: 19 * 32 + 16 },
      ])
    );

    this.inimigos.push(
      this.criarInimigo(18 * 32 + 16, 14 * 32 + 16, [
        { x: 18 * 32 + 16, y: 14 * 32 + 16 },
        { x: 41 * 32 + 16, y: 14 * 32 + 16 },
        { x: 41 * 32 + 16, y: 23 * 32 + 16 },
        { x: 61 * 32 + 16, y: 23 * 32 + 16 },
        { x: 61 * 32 + 16, y: 42 * 32 + 16 },
        { x: 12 * 32 + 16, y: 42 * 32 + 16 },
        { x: 12 * 32 + 16, y: 23 * 32 + 16 },
        { x: 18 * 32 + 16, y: 23 * 32 + 16 },
        { x: 18 * 32 + 16, y: 14 * 32 + 16 },
      ])
    );

    this.inimigos.push(
      this.criarInimigo(44 * 32 + 16, 28 * 32 + 16, [
        { x: 44 * 32 + 16, y: 28 * 32 + 16 },
        { x: 49 * 32 + 16, y: 28 * 32 + 16 },
        { x: 49 * 32 + 16, y: 31 * 32 + 16 },
        { x: 44 * 32 + 16, y: 31 * 32 + 16 },
        { x: 44 * 32 + 16, y: 28 * 32 + 16 },
      ])
    );
  }

  configurarEscadaSubida() {
    const escadaSubida = this.add.zone(33 * 32, 30 * 32 + 26, 64, 8);
    this.physics.add.existing(escadaSubida, true);

    let mudandoDeCena = false;

    this.physics.add.overlap(this.player, escadaSubida, () => {
      if (!mudandoDeCena) {
        mudandoDeCena = true;
        this.cameras.main.fadeOut(400, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          () => {
            this.scene.start("Andar2", { spawnX: 2 * 32, spawnY: 16 });
          },
        );
      }
    });
  }

  update() {
    this.tratarMovimento();

    const dadosOvo = this.registry.get("posicaoOvo");

    if (dadosOvo) {
      if (dadosOvo.andar === "Andar1") {
        this.atualizarSetaGuia(dadosOvo.x, dadosOvo.y);
      } else {
        const escadaX = 32 * 32 + 32;
        const escadaY = 30 * 32 + 26;
        this.atualizarSetaGuia(escadaX, escadaY);
      }
    }

    if (this.inimigos) {
      this.inimigos.forEach((inimigo) => this.atualizarInimigo(inimigo));
    }
  }
}
