/**
 * 子类 Item 射击目标对象
 */
var Item = function (options) {
  var opts = options || {};
  // 调用父类方法
  Element.call(this, opts);

  // 特有属性状态和图标
  this.status = 'normal'; // 可为 normal、booming、boomed
  this.icon = opts.icon;
  this.type = opts.Type;
};
// 继承Element的方法
Item.prototype = new Element();


/**
 * 方法: down 向下移动一个身位 
 */
Item.prototype.down = function() {
  this.move(0, this.speed);
};

/**
 * 方法: booming 爆炸中
 */
Item.prototype.gotten = function() {
  // 设置状态为 booming
  this.status = 'gotten';
}

// 方法: draw 方法
Item.prototype.draw = function() {
  // context.fillRect(this.x, this.y, this.width, this.height);
  // 绘制怪兽
  switch(this.status) {
    case 'normal':
      context.drawImage(this.icon, this.x, this.y, this.width, this.height);
      // context.fillRect(this.x, this.y, this.width, this.height);
      break;
  }
};
