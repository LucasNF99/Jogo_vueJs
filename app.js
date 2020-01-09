new Vue ({
  el: '#app',
  data: {
    rodando: false,
    life1: 100,
    life2: 100,
    logs: [],
    player1: 'img/s-1.png',
    player2: 'img/z-1.png',
  },
  computed: {
    resultado() {
      return this.life1 == 0 || this.life2 == 0;
    },
  },
  methods: {
    comecaJogo() {
      this.rodando = true;
      this.life1 = 100;
      this.life2 = 100;
      this.logs = [];
      this.player1 = 'img/s-1.png';
      this.player2 = 'img/z-1.png';
      this.ataqueMon(); 
    },
    ataque(especial) { 
      this.dano('life2', 5, 10, especial, 'Jogador', 'Monstro', 'jogador' );
      if(this.life2 > 0) {
        this.dano('life1', 7, 12, false, 'Monstro', 'Jogador', 'monstro');
      }
      this.mudarImg();
    },
    ataqueMon() {
      while (this.life1 <= 0) {
        setTimeout(()=>{
          this.dano('life1', 7, 12, false, 'Monstro', 'Jogador', 'monstro');
        }, 200);
      }
    },
    dano(atributo, min, max, especial, fonte, alvo, clas) {
      const maiorDano = especial ? 5 : 0;
      const dano = this.getRandom(min + maiorDano, max + maiorDano);
      this[atributo] = Math.max(this[atributo] - dano, 0);
      this.registrarLog(`${fonte} atingiu ${alvo} com ${dano}.`, clas);
    },
    getRandom(min,max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);

    },
    curaeDano() {
      this.cura(10, 15);
      this.dano('life1', 7, 12, false, 'Monstro', 'Jogador', 'monstro');
    },
    cura(max, min) {
      const  cura = this.getRandom(min, max);
      this.life1 = Math.min(this.life1 + cura, 100);
      this.registrarLog(`Jogador recuperou ${cura} de vida.`, 'jogador');
    },
    registrarLog(text, clas) {
      this.logs.unshift({text, clas});
    },
    mudarImg() {
      this.player1 = 'img/s-2.png';
      this.player2 = 'img/z-2.png';
      setTimeout(() => {
        this.player1 = 'img/s-1.png';
        this.player2 = 'img/z-1.png';
      }, 350);
    },
    verifica() {
      if(this.life1 == 0) {
        this.player1 = 'img/s-3.png';
        return this.life1 == 0
      } else if (this.life2 == 0) {
        this.player2 = 'img/z-3.png';
        return this.life2 == 0;
      }
    }
  },
  watch: {
    resultado(value) {
      if (value) this.rodando = false;
    }
  }
})