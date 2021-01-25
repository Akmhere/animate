

class Particle {
    constructor(svg, coordinates, friction) {
      this.svg = svg;
      this.steps = $(window).height() / 2;
      this.item = null;
      this.friction = friction;
      this.coordinates = coordinates;
      this.position = this.coordinates.y;
      this.dimensions = this.render();
      this.rotation = Math.random() > 0.5 ? "-" : "+";
      this.scale = 0.5 + Math.random();
      this.siner = 200 * Math.random();
    }
  
    destroy() {
      this.item.remove();
    }
  
    move() {
      this.position = this.position - this.friction;
      let top = this.position;
      let left =
      this.coordinates.x +
      Math.sin(this.position * Math.PI / this.steps) * this.siner;
      this.item.css({
        transform:
        "translateX(" +
        left +
        "px) translateY(" +
        top +
        "px) scale(" +
        this.scale +
        ") rotate(" +
        this.rotation + (
        this.position + this.dimensions.height) +
        "deg)" });
  
  
      if (this.position < -this.dimensions.height) {
        this.destroy();
        return false;
      } else {
        return true;
      }
    }
  
    render() {
      this.item = $(this.svg, {
        css: {
          transform:
          "translateX(" +
          this.coordinates.x +
          "px) translateY(" +
          this.coordinates.y +
          "px)" } });
  
  
      $("body").append(this.item);
      return {
        width: this.item.width(),
        height: this.item.height() };
  
    }}
  
  
  const heart =
  '<svg viewBox="0 0 100.1 86.8"> <path d="M85.3,2.7c-13-5.8-29.5,0-35.3,12.2C44.3,1.9,27-3.8,14.8,2.7C1.2,9.1-5.3,25,5.5,44.4C13.4,58,27,68.1,50,86.8 C73.8,68.1,87.4,58,94.6,44.4C105.4,25.7,98.9,9.1,85.3,2.7z" fill="#d62d20 "/> </svg>';
  
  // const circle =
  // '<svg viewBox="0 0 67.4 67.4"><circle class="circle" cx="33.7" cy="33.7" r="33.7"/></svg>';
  
  const ring =
  '<svg x="0px" y="0px" viewBox="0 0 13 12"> <path class="ring" d="M6.5,0.1C3.4,0.1,0.8,2.8,0.8,6s2.6,5.9,5.7,5.9s5.7-2.7,5.7-5.9S9.7,0.1,6.5,0.1L6.5,0.1z M6.5,8.8 C5,8.8,3.8,7.6,3.8,6S5,3.2,6.5,3.2S9.2,4.4,9.2,6S8,8.8,6.5,8.8L6.5,8.8z"/> </svg>';
  
  const point =
  '<svg viewBox="0 0 12 12"> <path class="point" d="M6,7.5L6,7.5C5.1,7.5,4.5,6.9,4.5,6v0c0-0.9,0.7-1.5,1.5-1.5h0c0.9,0,1.5,0.7,1.5,1.5v0C7.5,6.9,6.9,7.5,6,7.5z "/> </svg>';
  // const x =
  // '<svg viewBox="0 0 12 12"> <path class="x" d="M10.3,4.3H7.7V1.7C7.7,0.8,7,0,6,0S4.3,0.8,4.3,1.7v2.5H1.7C0.8,4.3,0,5,0,6s0.8,1.7,1.7,1.7h2.5v2.5 C4.3,11.2,5,12,6,12s1.7-0.8,1.7-1.7V7.7h2.5C11.2,7.7,12,7,12,6S11.2,4.3,10.3,4.3z"/></svg>';
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  const data = [point, heart,  ring];
  
  let isPaused = false;
  window.onblur = function () {
    isPaused = true;
  }.bind(this);
  window.onfocus = function () {
    isPaused = false;
  }.bind(this);
  
  let particles = [];
  
  setInterval(function () {
    if (!isPaused) {
      particles.push(
      new Particle(
      data[randomInt(0, data.length - 1)],
      {
        x: Math.random() * $(window).width(),
        y: $(window).height() },
  
      Math.random() * 3));
  
  
    }
  }, 300);
  
  function update() {
    particles = particles.filter(function (p) {
      return p.move();
    });
    requestAnimationFrame(update.bind(this));
  }
  update();
