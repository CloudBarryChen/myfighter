/**
 * 子类 Plane 飞机
 * 1、继承 Element
 * 2、依赖 Bullet
 */


var Plane = function (options) {
  var opts = options || {};
  // 调用父类方法
  Element.call(this, opts);

  // 特有属性
  this.status = 'normal';
  this.icon = opts.icon;
  this.buff = false;
  this.energyUsing = false;
  this.energy = opts.energy;
  // 子弹相关
  this.lasers=[];
  this.bullets = [
    []
  ];
  this.bullets.length = GAME.opts.shootGun.length;
  for (var i = 0; i < GAME.opts.shootGun.length; i++) {
    this.bullets[i] = [];
  }

  this.bulletSize = opts.bulletSize;
  this.bulletSpeed = opts.bulletSpeed;
  this.bulletIcon = opts.bulletIcon;
  // 特有属性，爆炸相关
  this.boomIcon = opts.boomIcon;
  this.boomCount = 0;
  this.hitGun = 1;
};

// 继承Element的方法
Plane.prototype = new Element();

/**
 * 方法: hasCrash 判断是否撞到当前元素 
 * @param  {target}  target 目标元素实例
 */
Plane.prototype.hasCrash = function (target) {
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

/**
 * 方法: hasHit 判断是否击中当前元素 
 * @param  {target}  target 目标元素实例
 */
Plane.prototype.hasHit = function (target) {

  var bullets = [
    []
  ];
  bullets.length = GAME.opts.shootGun.length;

  for (let i = 0; i < GAME.opts.shootGun.length; i++) {
    bullets[i] = this.bullets[i];
    let hasHit = false;
    for (let j = bullets[i].length - 1; j >= 0; j--) {
      // 如果子弹击中的是目标对象的范围，则销毁子弹
      if (bullets[i][j].hasCrash(target)) {
        // 清除子弹实例
        this.bullets[i].splice(j, 1);
        hasHit = true;
        this.hitGun = i + 1;
        return hasHit;
        break;
      }
    }
  }



};

/**
 * 方法: setPosition 修改飞机当前位置
 */
Plane.prototype.setPosition = function (newPlaneX, newPlaneY) {
  this.x = newPlaneX;
  this.y = newPlaneY;
  return this;
};

/**
 * 方法: startShoot 方法
 */
Plane.prototype.startShoot = function (offset) {
  var self = this;
  var offset = offset;
  this.offset = offset || 0;

  // 定时发射子弹
  this.shootingInterval = [];
  this.shootingInterval.length = GAME.opts.shootGun.length;

  for (let i = 0; i < GAME.opts.shootGun.length && GAME.opts.shootGun[i]; i++) {
    let bulletInt = GAME.opts.bulletInt[i];
    this.shootingInterval[i] = setInterval(function () {
      let bulletWidth = GAME.opts.bulletSize[i].width;
      let bulletHeight = GAME.opts.bulletSize[i].height;

      // 创建子弹,子弹位置是居中射出
      let bulletX = self.x + self.width / 2 - bulletWidth / 2 + offset[i];
      let bulletY = self.y - bulletHeight;
      //音效
      if (window.musicControl === '1') {
        // GAME.biu.play();
        AUDIOS.plane.blue.shoot();
      }

      // 创建子弹
      self.bullets[i].push(new Bullet({
        x: bulletX,
        y: bulletY,
        width: bulletWidth,
        height: bulletHeight,
        speed: self.bulletSpeed,
        icon: self.bulletIcon,
      }));
    }, bulletInt);
  }
};

// 方法： drawBullets 画子弹
Plane.prototype.drawBullets = function () {

  var n = [];
  var bullets = [
    []
  ];
  bullets.length = GAME.opts.shootGun.length;
  for (let i = 0; i < GAME.opts.shootGun.length; i++) {
    bullets[i] = this.bullets[i];
    n[i] = bullets[i].length;

    while (n[i]--) {
      var bullet = [];
      var offset = GAME.opts.offsetFan[i]
      bullet.length = bullets.length;
      bullet[i] = bullets[i][n[i]];
      // 更新子弹的位置
      bullet[i].fly(offset); // 更新和绘制耦合在一起了
      // 如果子弹对象超出边界,则删除
      if (bullet[i].y <= 0) {
        //如果子弹实例下降到底部，则需要在drops数组中清除该子弹实例对象
        bullets[i].splice(n[i], 1);
      } else {
        // 未超出的则绘画子弹
        bullet[i].draw();
      }
    }

  }


};



/**
 * 方法: booming 爆炸中
 */
Plane.prototype.booming = function () {
  this.status = 'booming';
  this.boomCount += 1;
  if (window.musicControl === '1') {
    GAME.die.play();
  }
  if (this.boomCount > 10) {
    this.status = 'boomed';
    clearInterval(this.shooting);
  }

  return this;

}

// 方法: draw 方法
Plane.prototype.draw = function () {
  // 绘制飞机
  switch (this.status) {
    case 'booming':
      context.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
      break;
    default:
      context.drawImage(this.icon, this.x, this.y, this.width, this.height);
      break;
  }
  // 绘制子弹
  this.drawBullets();
  return this;
};






//Laser
/**
 * 方法: hasHit 判断是否击中当前元素 
 * @param  {target}  target 目标元素实例
 */
Plane.prototype.hasHitLaser = function (target) {

  var lasers = this.lasers;
  let hasHit = false;

  if (lasers.hasCrash(target)) {
    // 清除子弹实例
    hasHit = true;
    return hasHit;
  }
};


Plane.prototype.startShootLaser = function () {
  var self = this;

  let laserWidth = GAME.opts.laserSize.width;
  let laserHeight = GAME.opts.laserSize.height;

  // 创建子弹,子弹位置是居中射出
  let bulletX = self.x + self.width / 2 - laserWidth / 2;
  let bulletY = self.y - laserHeight;
  //音效
  if (window.musicControl === '1') {
    GAME.biu.play();
  }

  // 创建子弹
  self.lasers= new Laser({
    x: bulletX,
    y: bulletY,
    width: laserWidth,
    height: laserHeight,
    icon: self.bulletIcon,
  });

};


// 方法： drawBullets 画子弹
Plane.prototype.drawLaser = function () {
  var lasers = this.lasers;
  lasers.flyLaser();
  lasers.draw();

};