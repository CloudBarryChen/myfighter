// 常用的元素和变量
var $body = $(document.body);

// 画布相关
var $canvas = $('#game');
var canvas = $canvas.get(0);
var context = canvas.getContext("2d");
// 设置画布的宽度和高度
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 获取画布相关信息
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;

// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 30);
  };
var musicControl = '1';
window.musicControl = musicControl;
/**
 * 基本事件绑定
 */
function bindEvent() {
  // 绑定事件
  var self = this;
  // 点击开始按钮
  $body.on('click', '.js-start', function () {
    $body.attr('data-status', 'choice');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  // 选择战机
  $body.on('click', '.js-plane1', function () {
    $body.attr('data-status', 'start');
    // 开始游戏
    GAME.planeType = "bluePlaneIcon";
    GAME.planeBulletIcon = 'fireIcon';
    GAME.start();
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  $body.on('click', '.js-plane2', function () {
    $body.attr('data-status', 'start');
    // 开始游戏
    GAME.planeType = "pinkPlaneIcon";
    GAME.planeBulletIcon = 'fireIcon2';
    GAME.start();
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  $body.on('click', '.js-plane3', function () {
    $body.attr('data-status', 'start');
    // 开始游戏
    GAME.planeType = "greenPlaneIcon";
    GAME.planeBulletIcon = 'fireIcon3';
    GAME.start();
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });


  // 点击说明按钮
  $body.on('click', '.js-rule', function () {
    $body.attr('data-status', 'rule');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  // 点击排行榜按钮
  $body.on('click', '.js-board', function () {
    GAME.read();
    $body.attr('data-status', 'board');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  // 点击设置按钮
  $body.on('click', '.js-setting', function () {
    $body.attr('data-status', 'setting');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  $body.on('click', '.js-dead', function () {
    $body.attr('data-status', 'index');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  $body.on('click', '.js-win', function () {
    $body.attr('data-status', 'index');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }
  });

  // 点击确认设置按钮
  $body.on('click', '.js-confirm-setting', function () {
    $body.attr('data-status', 'index');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }



    // 设置游戏
    GAME.init();
    //改变背景
    var bgimg = document.getElementById('setting-bg');
    switch (bgimg.value) {
      case '1':
        document.body.style.backgroundImage = "url(./img/bg_1.jpg)";
        break;
      case '2':
        document.body.style.backgroundImage = "url(./img/bg_2.jpg)";
        break;
      case '3':
        document.body.style.backgroundImage = "url(./img/bg_3.jpg)";
        break;
      case '4':
        document.body.style.backgroundImage = "url(./img/bg_4.jpg)";
        break;
    };

    //音乐开关
    var musicControl = document.getElementById('setting-music').value;
    window.musicControl = musicControl;
  });

  // 点击我知道了规则的按钮
  $body.on('click', '.js-confirm-rule', function () {
    $body.attr('data-status', 'index');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }

  });

  // 点击确定 排行榜
  $body.on('click', '.js-confirm-board', function () {
    $body.attr('data-status', 'index');
    if (window.musicControl === '1') {
      GAME.buttonM.play();
    }

  });

  $body.on('click', '.energyUse', function () {
    GAME.energyEffect();
    GAME.cleInV();
  });
}


/**
 * 游戏对象
 */
var GAME = {

  finalBossWave: function () {
    this.createBossFinalEnemyInterval = setInterval(function () {
      var ranNum = Math.floor(Math.random() * 6);
      GAME.createEnemy(GAME.opts.BOSSArray[ranNum]);
    }, 1000);
    GAME.boss.loop = true;
    GAME.boss.play();
  },

  /**
   * 游戏初始化
   */
  init: function (options) {
    //设置opts
    //var opts = Object.assign({}, options, CONFIG);
    var opts = JSON.parse(JSON.stringify(CONFIG));
    this.opts = opts;


    // 计算飞机初始坐标
    this.planePosX = canvasWidth / 2 - opts.planeSize.width / 2;
    this.planePosY = canvasHeight - opts.planeSize.height - 50;

    // console.log(this.opts);
    this.music();

  },

  /**
   * 游戏开始需要设置
   */
  /********************************************************************* */
  start: function () {
    this.init();

    // 获取游戏初始化 level
    var self = this; // 保存函数调用对象（即Game）
    var opts = this.opts;
    var images = this.images;
    // 清空射击目标对象数组和分数设置为 0
    this.enemies = [];
    this.score = 0;

    //物品
    this.items = [];

    var musicControl = document.getElementById('setting-music').value;
    window.musicControl = musicControl;

    // 随机生成大小敌机
    this.createSmallEnemyInterval = setInterval(function () {
      self.createEnemy('normal');
    }, opts.generateInterval);
    this.createBigEnemyInterval = setInterval(function () {
      self.createEnemy('big');
    }, opts.generateInterval * 3);

    //生成物品
    this.createItemInterval = setInterval(function () {
      let ranNum = Math.floor(Math.random() * opts.itemType.length)
      self.createItem(opts.itemType[ranNum]);
    }, opts.itemInt);

    // setTimeout(function(){
    //   let ranNum = Math.floor(Math.random() * opts.itemType.length)
    //   self.createItem(opts.itemType[ranNum]);
    //   setTimeout(arguments.callee,opts.itemInt);
    // },opts.itemInt);

    // GAME.ITEM.timeout = false;
    // GAME.ITEM.first = true;
    // GAME.ITEM.createItemInterval();



    //BOSS生成
    this.createBossEnemyInterval = setInterval(function () {
      switch (GAME.opts.BOSSwave) {
        case 1:
          GAME.opts.BOSS = "boss1";
          break;
        case 2:
          GAME.opts.BOSS = "boss2";
          break;
        case 3:
          GAME.opts.BOSS = "boss3";
          break;
        case 4:
          GAME.opts.BOSS = "boss4";
          break;
        case 5:
          GAME.opts.BOSS = "boss5";
          break;
        case 6:
          GAME.opts.BOSS = "boss6";
          break;
      }
      GAME.createEnemy(GAME.opts.BOSS);
      GAME.boss.play();
      if (GAME.opts.BOSSwave < 6) {
        GAME.opts.BOSSwave++;
      }
    }, 45000);

    //主机生命恢复
    this.lSlot = document.getElementsByClassName("lifeSlot-in");
    this.ldelayColor = document.getElementsByClassName("ldelayColor");
    this.lSlotText = document.getElementsByClassName('lifeText');
    this.planeRevive = setInterval(function () {
      if (GAME.opts.planeLive <= GAME.opts.planeMaxLife) {
        GAME.opts.planeLive += GAME.opts.lifeBackPoint;
      }
      if (GAME.opts.planeLive > GAME.opts.planeMaxLife) {
        GAME.opts.planeLive = GAME.opts.planeMaxLife;
      }

    }, GAME.opts.lifeBackTime);

    //主机能量恢复
    //this.eSlot = document.getElementById("slot");
    this.eSlot = document.getElementsByClassName("energySlot-in");
    this.edelayColor = document.getElementsByClassName("edelayColor");
    this.eSlotText = document.getElementsByClassName('energyText');
    this.planeEnergy = setInterval(function () {
      if (self.plane.energy <= self.opts.energyMax) {
        self.plane.energy += self.opts.energyBackPoint;
      }
      if (self.plane.energy > self.opts.energyMax) {
        self.plane.energy = self.opts.energyMax;
      }
      if (self.plane.energy <= 0 && self.plane.energyUsing) {
        self.energyEffect();
      }

    }, self.opts.energyBackTime);

    //飞机射击状态
    this.planeStatus = document.getElementsByClassName("planeStatus");
    this.pSCooldown = document.getElementsByClassName("pSCooldown");


    //背景轮换
    this.bgExchange = setInterval(function () {
      if (GAME.opts.bgOrder < 4) {
        GAME.opts.bgOrder++;
      } else {
        GAME.opts.bgOrder = 1;
      }
      switch (GAME.opts.bgOrder) {
        case 1:
          document.body.style.backgroundImage = "url(./img/bg_1.jpg)";
          break;
        case 2:
          document.body.style.backgroundImage = "url(./img/bg_2.jpg)";
          break;
        case 3:
          document.body.style.backgroundImage = "url(./img/bg_3.jpg)";
          break;
        case 4:
          document.body.style.backgroundImage = "url(./img/bg_4.jpg)";
          break;
      };
      // document.body.style.backgroundPosition = "0" + " " + "+" + GAME.opts.bgOrder + "00vh";
      GAME.opts.bgOrder++;
    }, 60000);

    //改变主机颜色
    var colorSelected = GAME.planeType;
    var planeBulletIcon = GAME.planeBulletIcon;
    // this.colorSelected = colorSelected;
    // switch (colorSelected.value) {
    //   case 'pinkPlaneIcon':
    //     colorSelected = 'pinkPlaneIcon';
    //     break;
    //   case 'bluePlaneIcon':
    //     colorSelected = 'bluePlaneIcon';
    //     break;
    // };




    // 创建主角英雄
    this.plane = new Plane({
      x: this.planePosX,
      y: this.planePosY,
      width: opts.planeSize.width,
      height: opts.planeSize.height,
      // 子弹尺寸速度
      bulletSize: opts.bulletSize,
      bulletSpeed: opts.bulletSpeed,
      buff: false,
      energy: opts.energy,
      energyUsing: false,

      // 图标相关
      icon: resourceHelper.getImage(colorSelected),
      bulletIcon: resourceHelper.getImage(planeBulletIcon),
      boomIcon: resourceHelper.getImage('enemyBigBoomIcon')
    });
    // 飞机开始射击
    this.plane.startShoot(opts.offset);
    //this.plane.startShootLaser();



    // 开始更新游戏
    this.update();

    if (window.musicControl === '1') {
      GAME.bgm.play();
    }

  },
  /********************************************************* */
  // time:function(fun,tim,condition){
  //   if(condition) return;

  //   setTimeout(GAME.time,tim);
  // },

  // ITEM: {
  //   //生成物品
  //   timeout: false,
  //   first: true,
  //   // time:function(){
  //   //   if(this.timeout) return;
  //   //   setTimeout(this.createItemInterval,GAME.opts.itemInt)
  //   // },
  //   createItemInterval: function () {

  //     if (GAME.ITEM.timeout) return;
  //     var ranNum = Math.floor(Math.random() * GAME.opts.itemType.length);
  //     if (GAME.ITEM.first) {
  //       GAME.ITEM.first = false;
  //     } else {
  //       GAME.createItem(GAME.opts.itemType[ranNum]);
  //     }
  //     GAME.ITEM.tcount = setTimeout(GAME.ITEM.createItemInterval, GAME.opts.itemInt);
  //     //GAME.time(GAME.ITEM.createItemInterval,GAME.opts.itemInt[0],GAME.ITEM.timeout[0]);
  //   },

  //   // this.createItemInterval = setInterval(function () {
  //   //   let ranNum = Math.floor(Math.random() * opts.itemType.length)
  //   //   self.createItem(opts.itemType[ranNum]);
  //   // }, opts.itemInt);
  // },

  music: function () {
    var bgm = document.getElementById('bGM');
    this.bgm = bgm;
    this.bgm.loop = false;
    var biu = document.getElementById('biu');
    this.biu = biu;
    var boomM = document.getElementById('boomM');
    this.boomM = boomM;
    var buttonM = document.getElementById('buttonM');
    this.buttonM = buttonM;
    var die = document.getElementById('die');
    this.die = die;
    var boss = document.getElementById('boss');
    this.boss = boss;
    this.boss.loop = false;

  },


  update: function () {
    var self = this;
    var opts = this.opts;
    // 更新飞机、敌人
    this.updateElement();

    // 先清理画布
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    if (this.plane.status === 'boomed') {
      this.end();
      return;
    }

    if (GAME.score == 1000000) {
      this.win();
      return;
    }

    // 绘制画布
    this.draw();

    //分数
    context.font = '20px arial';
    context.fillText('分数 ' + GAME.score, 0, 20);
    context.fillText('HP ', 0, 45);
    context.fillText('EP ', 0, 70);
    // context.font = '15px arial';
    // context.fillText('射击速度 ' + GAME.opts.bulletInt[0] / 1000 + 's,' + GAME.opts.bulletInt[1] / 1000 + 's,' + GAME.opts.bulletInt[2] / 1000 + 's,' + GAME.opts.bulletInt[3] / 1000 + 's,' + GAME.opts.bulletInt[4] / 1000 + 's,' + GAME.opts.bulletInt[5] / 1000 + 's,' + GAME.opts.bulletInt[6] / 1000 + 's,' + GAME.opts.bulletInt[7] / 1000 + 's,' + GAME.opts.bulletInt[8] / 1000 + 's,' + GAME.opts.bulletInt[9] / 1000 + 's,' + GAME.opts.bulletInt[10] / 1000 + 's', 0, 40);
    // context.font = '15px arial';
    // context.fillText('射击伤害 ' + GAME.opts.bulletDamage[0] + ',' + GAME.opts.bulletDamage[1] + ',' + GAME.opts.bulletDamage[2] + ',' + GAME.opts.bulletDamage[3] + ',' + GAME.opts.bulletDamage[4] + ',' + GAME.opts.bulletDamage[5] + ',' + GAME.opts.bulletDamage[6] + ',' + GAME.opts.bulletDamage[7] + ',' + GAME.opts.bulletDamage[8] + ',' + GAME.opts.bulletDamage[9] + ',' + GAME.opts.bulletDamage[10], 0, 55);
    // context.font = '20px arial';
    // context.fillText('生命值' + GAME.opts.planeLive + '/100', 0, 75);
    context.fillStyle = "#fff";

    self.lPercent = parseInt((self.opts.planeLive / self.opts.planeMaxLife) * 100);
    self.lSlot[0].style.width = self.lPercent + "%";
    self.ldelayColor[0].style.width = self.lPercent + "%";
    self.lSlotText[0].innerHTML = self.opts.planeLive + '/' + self.opts.planeMaxLife;
    self.ePercent = parseInt((self.plane.energy / self.opts.energyMax) * 100);
    self.eSlot[0].style.width = self.ePercent + "%";
    self.edelayColor[0].style.width = self.ePercent + "%";
    self.eSlotText[0].innerHTML = self.plane.energy + '/' + self.opts.energyMax;
    self.pSCooldown[0].style.height = self.cooldown / self.opts.buffDuration * 100 + "%";

    // 不断循环 update
    requestAnimFrame(function () {
      self.update()
    });
  },

  /**
   * 战机升级
   */
  upgrade: function () {
    var opts = this.opts;
    var plane = this.plane;
    GAME.score += opts.getScore;

    switch (GAME.score) {
      case 1000:
        GAME.opts.shootGun[1] = true;
        opts.gunTemp[1] = true;
        GAME.opts.getScore = 20;
        //GAME.opts.enemySpeed++
        GAME.opts.enemyBaseLive = 5;
        GAME.opts.generateInterval = 460;
        GAME.opts.bulletDamageMax = 20;
        GAME.opts.bulletMinAttckTime = 300;
        GAME.opts.bulletSpeed = 10;
        GAME.opts.bulletSizeIncreaseMax = 20;
        reCreate();
        break;
      case 3000:
        GAME.opts.shootGun[2] = true;
        opts.gunTemp[2] = true;
        GAME.opts.getScore = 25;
        //GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 25;
        GAME.opts.generateInterval = 420;
        GAME.opts.bulletDamageMax = 30;
        GAME.opts.bulletMinAttckTime = 250;
        GAME.opts.bulletSpeed = 10;
        GAME.opts.bulletSizeIncreaseMax = 25;
        reCreate();
        break;
      case 5500:
        GAME.opts.shootGun[3] = true;
        opts.gunTemp[3] = true;
        GAME.opts.getScore = 50;
        //GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 50;
        GAME.opts.generateInterval = 380;
        GAME.opts.bulletDamageMax = 40;
        GAME.opts.bulletMinAttckTime = 200;
        GAME.opts.bulletSpeed = 10;
        GAME.opts.bulletSizeIncreaseMax = 30;
        reCreate();
        break;
      case 10500:
        GAME.opts.shootGun[4] = true;
        opts.gunTemp[4] = true;
        GAME.opts.getScore = 75;
        //GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 75;
        GAME.opts.generateInterval = 340;
        GAME.opts.bulletDamageMax = 50;
        GAME.opts.bulletMinAttckTime = 150;
        GAME.opts.bulletSpeed = 10;
        GAME.opts.bulletSizeIncreaseMax = 35;
        reCreate();
        break;
      case 18000:
        GAME.opts.shootGun[5] = true;
        opts.gunTemp[5] = true;
        GAME.opts.getScore = 100;
        //GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 100;
        GAME.opts.generateInterval = 300;
        GAME.opts.bulletDamageMax = 60;
        GAME.opts.bulletMinAttckTime = 100;
        GAME.opts.bulletSpeed = 10;
        GAME.opts.bulletSizeIncreaseMax = 40;
        reCreate();
        break;
      case 28000:
        GAME.opts.shootGun[6] = true;
        opts.gunTemp[6] = true;
        GAME.opts.shootGun[7] = true;
        opts.gunTemp[7] = true;
        GAME.opts.getScore = 150;
        GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 125;
        GAME.opts.generateInterval = 260;
        GAME.opts.bulletDamageMax = 70;
        GAME.opts.bulletMinAttckTime = 80;
        GAME.opts.bulletSpeed = 10;
        GAME.opts.bulletSizeIncreaseMax = 45;
        reCreate();
        break;
      case 43000:
        GAME.opts.shootGun[8] = true;
        opts.gunTemp[8] = true;
        GAME.opts.shootGun[9] = true;
        opts.gunTemp[9] = true;
        GAME.opts.getScore = 200;
        GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 400;
        GAME.opts.generateInterval = 220;
        GAME.opts.bulletDamageMax = 80;
        GAME.opts.bulletMinAttckTime = 70;
        GAME.opts.bulletSpeed = 10;
        GAME.opts.bulletSizeIncreaseMax = 50;
        GAME.opts.itemInt = 7000;
        reCreate();
        break;
      case 63000:
        GAME.opts.shootGun[10] = true;
        opts.gunTemp[10] = true;
        GAME.opts.getScore = 400;
        GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 500;
        GAME.opts.generateInterval = 180;
        GAME.opts.bulletDamageMax = 90;
        GAME.opts.bulletMinAttckTime = 60;
        GAME.opts.bulletSpeed = 11;
        GAME.opts.bulletSizeIncreaseMax = 55;
        GAME.opts.itemInt = 5000;
        reCreate();
        break;
      case 103000:
        GAME.opts.getScore = 1000;
        GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 600;
        GAME.opts.generateInterval = 140;
        GAME.opts.bulletDamageMax = 100;
        GAME.opts.bulletMinAttckTime = 50;
        GAME.opts.bulletSpeed = 12;
        GAME.opts.bulletSizeIncreaseMax = 60;
        GAME.opts.itemInt = 3000;
        reCreate();
        break;
      case 203000:
        GAME.opts.getScore = 5000;
        GAME.opts.enemySpeed++;
        GAME.opts.enemyBaseLive = 700;
        GAME.opts.generateInterval = 100;
        GAME.opts.bulletDamageMax = 110;
        GAME.opts.bulletMinAttckTime = 40;
        GAME.opts.bulletSpeed = 13;
        GAME.opts.bulletSizeIncreaseMax = 60;
        reCreate();
        break;
    }

    for (let i = 0; i < GAME.opts.shootGun.length && opts.gunTemp[i]; i++) {
      //子弹射速
      if (GAME.score % (GAME.opts.getScore * 10) == 0 && opts.bulletInt[i] > opts.bulletMinAttckTime) {
        GAME.opts.bulletInt[i] -= opts.bulletDecrease;
        this.cleInV();
      }
      //子弹伤害升级
      if (GAME.score % (GAME.opts.getScore * 6) == 0 && opts.bulletDamage[i] < opts.bulletDamageMax) {
        GAME.opts.bulletDamage[i]++;
        //子弹大小升级
        if (opts.bulletSize[i].width < opts.bulletSizeIncreaseMax) {
          GAME.opts.bulletSize[i].width += opts.bulletSizeIncrease;
          GAME.opts.bulletSize[i].height = opts.bulletSize[i].width * 2;
        }
      }


    }

    function reCreate() {
      clearInterval(GAME.createSmallEnemyInterval);
      clearInterval(GAME.createBigEnemyInterval);
      GAME.createSmallEnemyInterval = setInterval(function () {
        GAME.createEnemy('normal');
      }, GAME.opts.generateInterval);
      GAME.createBigEnemyInterval = setInterval(function () {
        GAME.createEnemy('big');
      }, GAME.opts.generateInterval * 3);
    }

  },

  cleInV: function () {
    var opts = this.opts;
    for (let i = 0; i < this.opts.shootGun.length; i++) {
      clearInterval(this.plane.shootingInterval[i]);
    }
    this.plane.startShoot(opts.offset);
  },


  /**
   * 物品效果
   */
  itemEffect: function (itemType) {
    var opts = this.opts;
    var self = this;

    switch (itemType) {
      case 'disperse':
        clearInterval(self.itemCooldownImg);
        clearTimeout(this.itemEffectDuration);
        this.plane.buff = true;
        for (let i = 1; i < GAME.opts.shootGun.length; i++) {
          GAME.opts.offset[i] = CONFIG.offset[i];
          GAME.opts.offset[i] *= 1.8;
          GAME.opts.offsetFan[i] = 0;
        }
        //this.cleInV();
        self.planeStatus[0].style.backgroundImage = "url(./img/item/disperse.png)";
        self.planeStatus[0].style.display = "block";
        this.itemInterval();
        break;
      case 'concentrate':
        clearInterval(self.itemCooldownImg);
        clearTimeout(this.itemEffectDuration);
        this.plane.buff = true;
        for (let i = 1; i < GAME.opts.shootGun.length; i++) {
          GAME.opts.offset[i] = CONFIG.offset[i];
          GAME.opts.offset[i] *= 0.4;
          GAME.opts.offsetFan[i] = 0;
        }
        //this.cleInV();
        self.planeStatus[0].style.backgroundImage = "url(./img/item/concentrate.png)";
        self.planeStatus[0].style.display = "block";
        this.itemInterval();
        break;
      case 'umbrella':
        clearInterval(self.itemCooldownImg);
        clearTimeout(this.itemEffectDuration);
        this.plane.buff = true;
        for (let i = 0; i < GAME.opts.shootGun.length; i++) {
          GAME.opts.offset[i] = CONFIG.offset[i];
          GAME.opts.offsetFan[i] = 0;
          GAME.opts.offset[i] *= 0;
        }
        //this.cleInV();
        self.planeStatus[0].style.backgroundImage = "url(./img/item/umbrella.png)";
        self.planeStatus[0].style.display = "block";
        this.itemInterval();
        GAME.opts.offsetFan[0] = 0;
        GAME.opts.offsetFan[1] = 1;
        GAME.opts.offsetFan[2] = -1;
        GAME.opts.offsetFan[3] = 2;
        GAME.opts.offsetFan[4] = -2;
        GAME.opts.offsetFan[5] = 3;
        GAME.opts.offsetFan[6] = -3;
        GAME.opts.offsetFan[7] = 4;
        GAME.opts.offsetFan[8] = -4;
        GAME.opts.offsetFan[9] = 5;
        GAME.opts.offsetFan[10] = -5;
        for (let i = 0; i < GAME.opts.shootGun.length; i++) {
          GAME.opts.offsetFan[i] *= 3;
        }
        break;
      case 'health':
        GAME.opts.planeLive += 100;
        if (GAME.opts.planeLive > GAME.opts.planeMaxLife) {
          GAME.opts.planeLive = GAME.opts.planeMaxLife;
        }
        break;
      case 'healthUp':
        GAME.opts.planeMaxLife += 50;
        GAME.opts.planeLive += 50;
        break;
      case 'energy':
        GAME.plane.energy += 50;
        if (GAME.plane.energy >= GAME.opts.energyMax) {
          GAME.plane.energy = GAME.opts.energyMax;
        }
        break;
      case 'energyUp':
        GAME.opts.energyMax += 25;
        GAME.plane.energy += 25;
        break;
    }




  },

  energyEffect: function () {
    this.eUseBox = document.getElementsByClassName("energyUse");
    var opts = this.opts;
    var eUsing = this.plane.energyUsing;
    if (eUsing == true) {

      this.opts.shootGun = JSON.parse(JSON.stringify(this.opts.gunTemp));
      for (let i = 0; i < GAME.opts.shootGun.length; i++) {
        GAME.opts.bulletInt[i] *= opts.energyMultiple;
        GAME.opts.bulletDamage[i] /= opts.energyMultiple;
        GAME.opts.bulletSize[i].width /= opts.energyMultiple;
        GAME.opts.bulletSize[i].height /= opts.energyMultiple;
      }
      this.opts.energyBackPoint = 1;
      this.cleInV();
      this.eUseBox[0].style.borderColor = 'rgb(100, 100, 100)';
      this.plane.energyUsing = false;
    } else if ((this.plane.energy / opts.energyMax) >= 0.1) {
      this.gunTemp = JSON.parse(JSON.stringify(this.opts.shootGun));
      for (let i = 0; i < GAME.opts.shootGun.length; i++) {
        this.opts.shootGun[i] = true;
        GAME.opts.bulletInt[i] /= opts.energyMultiple;
        GAME.opts.bulletDamage[i] *= opts.energyMultiple;
        GAME.opts.bulletSize[i].width *= opts.energyMultiple;
        GAME.opts.bulletSize[i].height *= opts.energyMultiple;
      }
      this.opts.energyBackPoint = -5;
      this.cleInV();
      this.eUseBox[0].style.borderColor = 'white';
      this.plane.energyUsing = true;
    }
  },

  itemInterval: function () {
    var self = this;
    this.cooldown = self.opts.buffDuration;
    self.itemCooldownImg = setInterval(function () {
      self.cooldown -= 1000;
      if (self.cooldown == 0) {
        clearInterval(self.itemCooldownImg);
      }
    }, 1000)
    this.itemEffectDuration = setTimeout(function () {
      self.plane.buff = false;
      for (let i = 1; i < GAME.opts.shootGun.length; i++) {
        GAME.opts.offset[i] = CONFIG.offset[i];
        GAME.opts.offsetFan[i] = 0;
      }
      self.planeStatus[0].style.display = "none";
    }, self.opts.buffDuration)
  },

  /**
   * 更新当前所有元素的状态
   */
  updateElement: function () {
    var opts = this.opts;
    var enemySize = opts.enemySize;
    var enemies = this.enemies;
    var items = this.items;
    var k = items.length;
    var plane = this.plane;
    var i = enemies.length;

    if (plane.status === 'booming') {
      plane.booming();
      return;
    }


    // 循环更新敌人
    while (i--) {
      var enemy = enemies[i];
      enemy.down();

      if (enemy.y >= canvasHeight) {
        this.enemies.splice(i, 1);
      } else {
        // 判断飞机状态
        if (plane.status === 'normal') {
          if (plane.hasCrash(enemy)) {
            // 
            if (opts.planeLive <= 0) {
              plane.booming();
            } else {
              opts.planeLive -= opts.planeCrashDamage;
              context.fillStyle = "red";
            }
          }
        }
        // 根据怪兽状态判断是否被击中
        switch (enemy.status) {
          case 'normal':
            if (plane.hasHit(enemy)) {
              for (let i = 1; i < GAME.opts.shootGun.length + 1 && GAME.opts.shootGun[i - 1]; i++) {
                switch (plane.hitGun) {
                  case i:
                    enemy.live -= opts.bulletDamage[i - 1];
                    break;
                }
              }

              if (enemy.live <= 0) {
                enemy.booming();
                if (window.musicControl === '1') {
                  GAME.boomM.play();
                }
                this.upgrade();
              }
            }
            break;
          case 'booming':
            enemy.booming();
            break;
          case 'boomed':
            enemies.splice(i, 1);
            break;
        }
        //分数

      }
    }
    // 循环更新物品
    while (k--) {
      var item = items[k];
      item.down();

      if (item.y >= canvasHeight) {
        this.items.splice(k, 1);
      } else {
        // 判断飞机状态
        if (plane.status === 'normal') {
          if (plane.hasCrash(item)) {
            // 
            this.items.splice(k, 1);
            this.itemEffect(item.type);
            if (window.musicControl === '1') {
              GAME.buttonM.play();
            }
          }
        }
      }
    }
  },
  /**
   * 绑定手指触摸
   */
  bindTouchAction: function () {
    var opts = this.opts;
    var self = this;
    // 飞机极限横坐标、纵坐标
    var planeMinX = 0;
    var planeMinY = 0;
    var planeMaxX = canvasWidth - opts.planeSize.width;
    var planeMaxY = canvasHeight - opts.planeSize.height;
    // 手指初始位置坐标
    var startTouchX;
    var startTouchY;
    // 飞机初始位置
    var startPlaneX;
    var startPlaneY;

    // 首次触屏
    $canvas.on('touchstart', function (e) {
      var plane = self.plane;
      // 记录首次触摸位置
      startTouchX = e.touches[0].clientX;
      startTouchY = e.touches[0].clientY;
      // console.log('touchstart', startTouchX, startTouchY);
      // 记录飞机的初始位置
      startPlaneX = plane.x;
      startPlaneY = plane.y;

    });
    // 滑动屏幕
    $canvas.on('touchmove', function (e) {
      var newTouchX = e.touches[0].clientX;
      var newTouchY = e.touches[0].clientY;
      // console.log('touchmove', newTouchX, newTouchY);

      // 新的飞机坐标等于手指滑动的距离加上飞机初始位置
      var newPlaneX = startPlaneX + newTouchX - startTouchX;
      var newPlaneY = startPlaneY + newTouchY - startTouchY;
      GAME.laserX = newPlaneX;
      GAME.laserY = newPlaneY;
      // 判断是否超出位置
      if (newPlaneX < planeMinX) {
        newPlaneX = planeMinX;
      }
      if (newPlaneX > planeMaxX) {
        newPlaneX = planeMaxX;
      }
      if (newPlaneY < planeMinY) {
        newPlaneY = planeMinY;
      }
      if (newPlaneY > planeMaxY) {
        newPlaneY = planeMaxY;
      }
      // 更新飞机的位置
      self.plane.setPosition(newPlaneX, newPlaneY);
      // 禁止默认事件，防止滚动屏幕
      e.preventDefault();
    });
  },

  /**
   * 生成怪兽
   */
  /*************************************************************************************************** */
  createEnemy: function (enemyType) {
    var enemies = this.enemies;
    var opts = this.opts;
    var images = this.images || {};
    var enemySize = opts.enemySmallSize;
    var enemySpeed = opts.enemySpeed;
    var enemyIcon = resourceHelper.getImage('enemySmallIcon');
    var enemyBoomIcon = resourceHelper.getImage('enemySmallBoomIcon');
    var enemyLive = opts.enemyBaseLive;

    // 大型敌机参数
    if (enemyType === 'big') {
      enemySize = opts.enemyBigSize;
      enemyIcon = resourceHelper.getImage('enemyBigIcon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = opts.enemySpeed * 0.6;
      enemyLive = opts.enemyBaseLive * 5;
    }
    if (enemyType === 'boss1') {
      enemySize = opts.enemyBoss1Size;
      enemyIcon = resourceHelper.getImage('enemyBoss1Icon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = 0.5;
      enemyLive = opts.enemyBaseLive * 250;
    }
    if (enemyType === 'boss2') {
      enemySize = opts.enemyBoss2Size;
      enemyIcon = resourceHelper.getImage('enemyBoss2Icon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = 0.5;
      enemyLive = opts.enemyBaseLive * 222;
    }
    if (enemyType === 'boss3') {
      enemySize = opts.enemyBoss3Size;
      enemyIcon = resourceHelper.getImage('enemyBoss3Icon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = 0.5;
      enemyLive = opts.enemyBaseLive * 113;
    }
    if (enemyType === 'boss4') {
      enemySize = opts.enemyBoss4Size;
      enemyIcon = resourceHelper.getImage('enemyBoss4Icon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = 0.5;
      enemyLive = opts.enemyBaseLive * 114;
    }
    if (enemyType === 'boss5') {
      enemySize = opts.enemyBoss5Size;
      enemyIcon = resourceHelper.getImage('enemyBoss5Icon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = 0.5;
      enemyLive = opts.enemyBaseLive * 139;
    }
    if (enemyType === 'boss6') {
      enemySize = opts.enemyBoss6Size;
      enemyIcon = resourceHelper.getImage('enemyBoss6Icon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = 0.5;
      enemyLive = opts.enemyBaseLive * 180;
    }

    // 综合元素的参数
    var initOpt = {
      x: Math.floor(Math.random() * (canvasWidth - enemySize.width)),
      y: -enemySize.height,
      Type: enemyType,
      live: enemyLive,
      width: enemySize.width,
      height: enemySize.height,
      speed: enemySpeed,
      icon: enemyIcon,
      boomIcon: enemyBoomIcon
    }

    // 怪兽的数量不大于最大值则新增
    if ((enemies.length < opts.enemyMaxNum) || (initOpt.Type === 'boss6' || initOpt.Type === 'boss5' || initOpt.Type === 'boss4' || initOpt.Type === 'boss3' || initOpt.Type === 'boss2' || initOpt.Type === 'boss1')) {
      enemies.push(new Enemy(initOpt));
    }
    // else if 
    // (initOpt.Type === 'boss6'||initOpt.Type === 'boss5'||initOpt.Type === 'boss4'||initOpt.Type === 'boss3'||initOpt.Type === 'boss2'||initOpt.Type === 'boss1') {
    //   enemies.push(new Enemy(initOpt));
    // }


    // console.log(enemies);
  },


  /******************************************************************************************************** */
  /**
   * 生成物品
   */
  /*************************************************************************************************** */
  createItem: function (itemType) {
    var items = this.items;
    var opts = this.opts;
    var images = this.images || {};
    var itemSize = opts.itemSize;
    var itemSpeed = opts.itemSpeed;

    switch (itemType) {
      case 'disperse':
        var itemIcon = resourceHelper.getImage('disperse');
        break;
      case 'concentrate':
        var itemIcon = resourceHelper.getImage('concentrate');
        break;
      case 'umbrella':
        var itemIcon = resourceHelper.getImage('umbrella');
        break;
      case 'health':
        var itemIcon = resourceHelper.getImage('health');
        break;
      case 'healthUp':
        var itemIcon = resourceHelper.getImage('healthUpIcon');
        break;
      case 'energy':
        var itemIcon = resourceHelper.getImage('energyIcon');
        break;
      case 'energyUp':
        var itemIcon = resourceHelper.getImage('energyUpIcon');
        break;
    }

    // 综合元素的参数
    var initOpt = {
      x: Math.floor(Math.random() * (canvasWidth - itemSize.width)),
      y: -itemSize.height,
      Type: itemType,
      width: itemSize.width,
      height: itemSize.height,
      speed: itemSpeed,
      icon: itemIcon,
    }

    // 怪兽的数量不大于最大值则新增
    items.push(new Item(initOpt));
    console.log(this.items);
  },
  /******************************************************************************************************** */

  end: function () {
    //alert('游戏结束');
    this.save();
    this.read();
    $body.attr('data-status', 'dead');
    GAME.init2();
    GAME.boss.pause();
    GAME.boss.load();
    GAME.bgm.load();

  },

  save: function () {
    saveData(GAME.score);
  },

  read: function () {
    var getScore = document.getElementById("getScore");
    getScore.innerHTML = GAME.score;
    var scores = readData();
    var lis = document.getElementById("board").children;
    var lis2 = document.getElementById("board-index").children;
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] != null) {
        lis[i].innerHTML = scores[i]
        lis2[i].innerHTML = scores[i]
      }
    }
  },

  init2: function () {
    document.body.style.backgroundImage = "url(./img/bg_1.jpg)";
    this.planeStatus[0].style.display = "none";
    clearInterval(GAME.createSmallEnemyInterval);
    clearInterval(GAME.createBigEnemyInterval);
    clearInterval(GAME.bgExchange);
    //clearInterval(this.itemEffectDuration);
    clearTimeout(this.itemEffectDuration);
    clearInterval(this.planeEnergy);
    clearInterval(this.itemCooldownImg);
    //clearInterval(this.updateSlot);
    clearInterval(GAME.createItemInterval);
    clearInterval(GAME.planeRevive);
    clearInterval(GAME.createBossEnemyInterval);
    clearInterval(GAME.createBossFinalEnemyInterval);
    for (let i = 0; i < GAME.opts.shootGun.length; i++) {
      clearInterval(GAME.plane.shootingInterval[i]);
    }
    //GAME.ITEM.timeout = true;

  },

  win: function () {
    //alert('游戏结束');
    $body.attr('data-status', 'win');
    GAME.init2();
    GAME.boss.pause();
    GAME.boss.load();
    GAME.bgm.load();
  },


  draw: function () {
    this.enemies.forEach(function (enemy) {
      enemy.draw();
    });
    this.items.forEach(function (item) {
      item.draw();
    });
    this.plane.draw();
  }
};

/**
 * 页面主入口
 */
function init() {
  // 加载图片资源，加载完成才能交互
  resourceHelper.load(CONFIG.resources, function (resources) {
    // 加载完成
    GAME.init();
    // 绑定手指事件
    GAME.bindTouchAction();
    bindEvent();
  });

}

init();