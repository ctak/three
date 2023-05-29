export class KeyController {
  constructor() {
    this.keys = [];

    window.addEventListener('keydown', e => {
      console.log(e.code + ' 누름');
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', e => {
      console.log(e.code + ' 떔');
      delete this.keys[e.code];
    });
  }
}