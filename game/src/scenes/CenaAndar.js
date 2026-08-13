import { sortearNovoOvo } from "../utils/OvoManager.js";

export default class CenaAndar extends Phaser.Scene {
  constructor(key) {
    super({ key });
    this.estaEmGameOver = false;

    this.staminaMax = 100;
    this.staminaAtual = 100;
    this.custoStamina = 0.5;
    this.recuperacaoStamina = 0.25;
    this.velocidadeNormal = 150;
    this.velocidadeCorrida = 220;
  }

  criarSetasEInputs() {
    this.teclado = this.input.keyboard.createCursorKeys();

    this.teclasWASD = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    });

    this.criarBarraStamina();

    this.seta = this.add.image(this.player.x, this.player.y, "seta_imagem");
    this.seta.setOrigin(0.5, 0.5);
    this.seta.setScale(0.3, 0.3);
    this.seta.setDepth(10);
  }

  criarBarraStamina() {
    this.barraStaminaGraphics = this.add.graphics();
    this.barraStaminaGraphics.setScrollFactor(0);
    this.barraStaminaGraphics.setDepth(999);

    this.atualizarBarraStamina();
  }

  atualizarBarraStamina() {
    const elBarra = document.getElementById("preenchimento-stamina");
    if (elBarra) {
      const porcentagem = (this.staminaAtual / this.staminaMax) * 100;
      elBarra.style.width = `${porcentagem}%`;
      elBarra.style.backgroundColor =
        this.staminaAtual > 30 ? "#00ff88" : "#ffcc00";
    }
  }

  criarAnimacoes() {
    if (!this.anims.exists("andar")) {
      this.anims.create({
        key: "andar",
        frames: this.anims.generateFrameNumbers("player_spritesheet", {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  carregarColisoes(mapa) {
    const grupoColisoes = this.physics.add.staticGroup();
    const objetosColisao = mapa.getObjectLayer("colisoes");

    if (objetosColisao) {
      objetosColisao.objects.forEach((objeto) => {
        const zona = this.add.zone(
          objeto.x,
          objeto.y,
          objeto.width,
          objeto.height,
        );
        zona.setOrigin(0, 0);
        this.physics.add.existing(zona, true);
        grupoColisoes.add(zona);
      });
    }

    this.physics.add.collider(this.player, grupoColisoes);
  }

  tratarMovimento() {
    const velocidade = 180;
    this.player.body.setVelocity(0);

    let movendoX = 0;
    let movendoY = 0;

    if (this.teclado.left.isDown || this.teclasWASD.left.isDown) movendoX = -1;
    else if (this.teclado.right.isDown || this.teclasWASD.right.isDown)
      movendoX = 1;

    if (this.teclado.up.isDown || this.teclasWASD.up.isDown) movendoY = -1;
    else if (this.teclado.down.isDown || this.teclasWASD.down.isDown)
      movendoY = 1;

    const estaMovendo = movendoX !== 0 || movendoY !== 0;
    const querCorrer =
      this.teclasWASD.shift.isDown || this.teclado.shift.isDown;

    let velocidadeAtual = this.velocidadeNormal;

    if (estaMovendo && querCorrer && this.staminaAtual > 0) {
      velocidadeAtual = this.velocidadeCorrida;
      this.staminaAtual = Math.max(0, this.staminaAtual - this.custoStamina);
    } else {
      this.staminaAtual = Math.min(
        this.staminaMax,
        this.staminaAtual + this.recuperacaoStamina,
      );
    }

    if (estaMovendo) {
      this.player.body.setVelocity(
        movendoX * velocidadeAtual,
        movendoY * velocidadeAtual,
      );
      this.player.body.velocity.normalize().scale(velocidadeAtual);

      const anguloRadianos = Math.atan2(
        this.player.body.velocity.y,
        this.player.body.velocity.x,
      );
      this.player.angle = Phaser.Math.RadToDeg(anguloRadianos);

      const frameRate = velocidadeAtual === this.velocidadeCorrida ? 16 : 10;
      this.player.anims.timeScale = frameRate / 10;
      this.player.play("andar", true);
    } else {
      this.player.anims.stop();
      this.player.setFrame(1);
    }

    this.atualizarBarraStamina();
  }

  gerenciarOvo(mapaX = 0, mapaY = 0) {
    let dadosOvo = this.registry.get("posicaoOvo");

    if (!dadosOvo) {
      sortearNovoOvo(this.game);
      dadosOvo = this.registry.get("posicaoOvo");
    }

    if (dadosOvo && dadosOvo.andar === this.scene.key) {
      const posX = dadosOvo.x + mapaX;
      const posY = dadosOvo.y + mapaY;

      this.ovo = this.physics.add.sprite(posX, posY, "ovo_imagem");

      this.physics.add.overlap(this.player, this.ovo, () => {
        this.sound.play("som_ovo", { volume: 0.8 });
        this.ovo.destroy();

        const totalAtual = this.registry.get("ovosColetados") || 0;
        this.registry.set("ovosColetados", totalAtual + 1);

        sortearNovoOvo(this.game);
        this.gerenciarOvo(mapaX, mapaY);
      });
    }
  }

  atualizarSetaGuia(posicaoAlvoX, posicaoAlvoY) {
    if (!this.seta || !this.player) return;

    const raioOrbita = 25;
    const angulo = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      posicaoAlvoX,
      posicaoAlvoY,
    );

    const setaX = this.player.x + Math.cos(angulo) * raioOrbita;
    const setaY = this.player.y + Math.sin(angulo) * raioOrbita;

    this.seta.setPosition(setaX, setaY);
    this.seta.rotation = angulo;
  }

  criarInimigo(x, y, pontosPatrulha = []) {
    const inimigo = this.physics.add.sprite(x, y, "inimigo_spritesheet");
    inimigo.setDepth(10);
    inimigo.setOrigin(0.5, 0.5);

    inimigo.pontosPatrulha = pontosPatrulha; 
    inimigo.indiceAlvo = 0;
    inimigo.velocidade = 80;
    inimigo.alcanceVisao = 100;
    inimigo.anguloVisao = 50; 

    inimigo.coneVisaoGraphics = this.add.graphics();
    inimigo.coneVisaoGraphics.setDepth(9); 

    return inimigo;
  }

  atualizarInimigo(inimigo) {
    if (!inimigo.active) return;

    if (inimigo.pontosPatrulha.length > 0) {
      const alvo = inimigo.pontosPatrulha[inimigo.indiceAlvo];

      const distancia = Phaser.Math.Distance.Between(
        inimigo.x,
        inimigo.y,
        alvo.x,
        alvo.y,
      );

      if (distancia < 5) {
        inimigo.indiceAlvo =
          (inimigo.indiceAlvo + 1) % inimigo.pontosPatrulha.length;
      } else {
        const angulo = Phaser.Math.Angle.Between(
          inimigo.x,
          inimigo.y,
          alvo.x,
          alvo.y,
        );
        inimigo.body.setVelocity(
          Math.cos(angulo) * inimigo.velocidade,
          Math.sin(angulo) * inimigo.velocidade,
        );
        inimigo.rotation = angulo;
      }
    }

    const g = inimigo.coneVisaoGraphics;
    g.clear();

    g.fillStyle(0xffff00, 0.3);

    const anguloInicio =
      inimigo.rotation - Phaser.Math.DegToRad(inimigo.anguloVisao / 2);
    const anguloFim =
      inimigo.rotation + Phaser.Math.DegToRad(inimigo.anguloVisao / 2);

    g.beginPath();
    g.moveTo(inimigo.x, inimigo.y);
    g.arc(
      inimigo.x,
      inimigo.y,
      inimigo.alcanceVisao,
      anguloInicio,
      anguloFim,
      false,
    );
    g.closePath();
    g.fillPath();

    this.checarVisaoPlayer(inimigo);
  }

  checarVisaoPlayer(inimigo) {
    if (this.estaEmGameOver || !this.player) return;

    const distancia = Phaser.Math.Distance.Between(
      inimigo.x,
      inimigo.y,
      this.player.x,
      this.player.y,
    );

    if (distancia > inimigo.alcanceVisao) return;

    const anguloAtePlayer = Phaser.Math.Angle.Between(
      inimigo.x,
      inimigo.y,
      this.player.x,
      this.player.y,
    );

    const diferencaAngulo = Phaser.Math.Angle.ShortestBetween(
      Phaser.Math.RadToDeg(inimigo.rotation),
      Phaser.Math.RadToDeg(anguloAtePlayer),
    );

    if (Math.abs(diferencaAngulo) <= inimigo.anguloVisao / 2) {
      this.gameOver();
    }
  }

  gameOver() {
    if (this.estaEmGameOver) return;
    this.estaEmGameOver = true;

    this.physics.pause(); 
    this.sound.play("som_lose", { volume: 0.8 });

    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "VOCÊ FOI PEGO!",
        {
          fontSize: "32px",
          color: "#ff0000",
          fontStyle: "bold",
        },
      )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.time.delayedCall(2000, () => {
      this.registry.set("ovosColetados", 0);

      const elOvos = document.getElementById("contador-ovos");
      if (elOvos) {
        elOvos.textContent = "0";
      }

      if (this.ovo) {
        this.ovo.destroy();
      }

      if (typeof sortearNovoOvo === "function") {
        sortearNovoOvo(this.game);
      }

      this.gerenciarOvo();

      this.player.setPosition(36 * 32 + 16, 26 * 32 + 16);
      this.player.body.setVelocity(0, 0);
      this.staminaAtual = this.staminaMax; 
      this.atualizarBarraStamina();

      this.scene.restart("Andar1", {});
    });
  }
}
