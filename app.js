new Vue ({
  el: '#app',
  data: {
    rodando: false,
    life1: 100,
    life2: 100,
    logs: [],
  },
  computed: {
    resultado() {
      return this.life1 == 0 || this.life2 == 0
    },
    // ataqueMon() {

    // }
  },
  methods: {
    comecaJogo() {
      this.rodando = true;
      this.life1 = 100;
      this.life2 = 100;
      this.logs = [];
    },
    ataque(especial) {    
      this.dano('life2', 5, 10, especial, 'Jogador', 'Monstro', 'jogador' );
      if(this.life2 > 0) {
        this.dano('life1', 7, 12, false, 'Monstro', 'Jogador', 'monstro');
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

    }
  },
  watch: {
    resultado(value) {
      if (value) this.rodando = false; 
    }
  }
})