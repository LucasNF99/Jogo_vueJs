new Vue ({
  el: '#app',
  data: {
    life1: 0,
    life2: 100
  },
  computed: {
    resultado() {
      return this.life1 == 0 || this.life2 == 0
    }
  },
  methods: {
    ataque() {
      let dano1, dano2

      dano2 = Math.floor(Math.random() *(10 - 1)) + 1;
      this.life1 = this.life1 - dano2;
    }
  },
  watch: {

  }
})