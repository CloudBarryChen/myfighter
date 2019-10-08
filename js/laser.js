


/**
 * 子类 Laser 子弹对象
 */
var Laser = function (opts) {
  var opts = opts || {};
  Element.call(this, opts);
  this.icon = opts.icon;
};

// 继承Element的方法
Laser.prototype = new Element();

/**
 * 方法：fly 向上移动
 */
Laser.prototype.flyLaser = function() {
  this.follow(GAME.laserX, GAME.laserY);
  return this;
};

/**
 * 方法: 判断是否和物体碰撞
 * @return Boolean
 */
Laser.prototype.hasCrash = function(target) {
  var crash = false;
  // 判断四边是否都没有空隙
  if (!(this.x + this.width < target.x) &&
  !(target.x + target.width < this.x) &&
  !(this.y + this.height < target.y) &&
  !(target.y + target.height < this.y)) {
    // 物体碰撞了
    crash = true;
  }
  return crash;
};

// 方法: draw 方法
Laser.prototype.draw = function() {
  // 绘画一个线条
  context.drawImage(this.icon, this.x, this.y, this.width, this.height);
  return this;
};
