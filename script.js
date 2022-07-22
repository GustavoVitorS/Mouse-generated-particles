;((main) => {
  var args = {};
  main(args);
})(function(args) {

  newFunction();

  var c = document.getElementById('c');
  var ctx = c.getContext('2d');
  var WIDTH = c.width = window.innerWidth;
  var HEIGHT = c.height = window.innerHeight;
  var mouse = {
    x: WIDTH / 2,
    y: HEIGHT / 2
  };

  class Circle {
    constructor(x, y, r, c) {
      this.x = x;
      this.y = y;
      this.ox = x;
      this.oy = y;
      this.r = r;
      this.c = c;
      this.alpha = Math.random() * 1;
    }
    update(target) {

      var dx = target.x - this.x;
      var dy = target.y - this.y;
      var d = Math.sqrt(dx * dx + dy * dy);

      this.x += dx / d;
      this.y += dy / d;

      var vx = this.x - this.ox;
      var vy = this.y - this.oy;

      this.ox = this.x;
      this.oy = this.y;

      this.x += vx;
      this.y += vy;

      this.c += 1;

    }
    render(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = 'hsla(' + this.c + ', 200%, 70%, 2)';
      ctx.translate(this.x, this.y);
      ctx.beginPath();
      ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = 'hsla(' + this.c + ', 200%, 70%, 2)';
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.ox, this.oy);
      ctx.stroke();
    }
  }


  var circle = null;
  var circleList = [];
  var circleCount = 700;
  var color = Math.random() * 460

  for(var i = 0; i < circleCount; i++) {
    circle = new Circle(
      WIDTH / 2 + Math.cos(Math.random() * Math.PI * 2) * 400 * Math.random(),
      HEIGHT / 2 + Math.sin(Math.random() * Math.PI * 2) * 400 * Math.random(),
      Math.random() * 8,
      color
    );			
    circleList.push(circle);
  }

  c.addEventListener('mousemove', function(e) {
    var rect = c.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.globalCompositeOperation = 'lighter';
    for(var i = 1; i < circleCount; i++) {
      circle = circleList[i];
      circle.update(mouse);
      circle.render(ctx);				
    }
  });


  function newFunction() {
    'use strict';
  }
});