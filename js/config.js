/**
 * 游戏相关配置
 * @type {Object}
 */
var CONFIG = {
  BOSS:"boss1",
  BOSSArray:["boss1","boss2","boss3","boss4","boss5","boss6"],
  BOSSwave:1,
  bgOrder:1,
  //升级参数

  bulletDamage: [2,1,1,1,1,1,1,1,1,1,1], // 子弹伤害
  bulletDamageMax: 10,
  bulletIntBase: 400, //初始攻击间隔定值
  bulletInt: [400,400,400,400,400,400,400,400,400,400,400], //初始攻击间隔
  bulletMinAttckTime: 350, //最小攻击间隔
  bulletDecrease: 10, //每次升级攻击间隔减少的数值
  bulletSizeIncrease: 0.5, //子弹大小升级
  bulletSizeIncreaseMax: 15, //子弹大小升级最大值
  bulletSpeed: 10, // 默认子弹的移动速度
  offset: [0,19,-19,38,-38,57,-57,76,-76,95,-95],
  offsetFan: [0,0,0,0,0,0,0,0,0,0,0],
  //offsetFan: [0,1,-1,2,-2,3,-3,4,-4,5,-5],
  //            0 1  2 3  4  5 6 7  8 9  10
  shootGun:[true,false,false,false,false,false,false,false,false,false,false],
  //shootGun:[true,true,true,true,true,true,true,true,true,true,true],
  gunTemp:[true,false,false,false,false,false,false,false,false,false,false],

  getScore:10,//摧毁敌机获得分数
  planeLive:100,//主机目前生命
  lifeBackTime:1000,//主机生命恢复间隔，1000 = 1秒
  lifeBackPoint:1,//主机每次生命恢复点数
  planeMaxLife:100,//主机最大生命
  planeCrashDamage:2,//撞击伤害
  generateInterval:500,//敌人刷新基础间隔
  enemySpeed: 4, // 默认敌人移动距离
  enemyMaxNum: 50, // 敌人最大梳理
  enemyBaseLive: 1, //敌人基础生命
  enemyBaseScore:10,

  buffDuration:30000,//物品效果持续时间
  itemSize:{
    width: 45,
    height: 45
  },
  itemInt:5000,//物品刷新时间
  itemSpeed:2,
  itemType:['disperse','concentrate','umbrella','health','healthUp','energy','energyUp'],

  energyMax:100,
  energy:50,
  energyBackPoint:1,
  energyBackTime:500,
  energyMultiple:2,

  planeType: 'bluePlaneIcon', // 默认是蓝色
  planeSize: {
    width: 60,
    height: 45
  },
  laserSize: {
    width: 90,
    height: 355
  },
  bulletSize: [{
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  },
  {
    width: 10,
    height: 20
  }],

  enemySmallSize: {
    width: 49,
    height: 36
  },
  enemyBigSize: {
    width: 130,
    height: 100
  },
  enemyBoss1Size: {
    width: 360,
    height: 200
  },
  enemyBoss2Size: {
    width: 432,
    height: 240
  },
  enemyBoss3Size: {
    width: 504,
    height: 280
  },
  enemyBoss4Size: {
    width: 576,
    height: 320
  },
  enemyBoss5Size: {
    width: 648,
    height: 360
  },
  enemyBoss6Size: {
    width: 720,
    height: 400
  },

  resources: {
    images: [
      {
        src: './img/item/energy_up.png',
        name: 'energyUpIcon'
      },
      {
        src: './img/item/health_up.png',
        name: 'healthUpIcon'
      },
      {
        src: './img/item/energy_05.png',
        name: 'energyIcon'
      },
      {
        src: './img/shield.png',
        name: 'shieldIcon'
      },
      {
        src: './img/item/item_02.png',
        name: 's'
      },
      {
        src: './img/item/item_06.png',
        name: 'health'
      },
      {
        src: './img/item/item_10.png',
        name: 'up'
      },
      {
        src: './img/item/item_13.png',
        name: 'dia'
      },
      {
        src: './img/item/disperse.png',
        name: 'disperse'
      },
      {
        src: './img/item/concentrate.png',
        name: 'concentrate'
      },
      {
        src: './img/item/umbrella.png',
        name: 'umbrella'
      },
      {
        src: './img/plane_1.png',
        name: 'bluePlaneIcon'
      },
      {
        src: './img/plane_2.png',
        name: 'pinkPlaneIcon'
      },
      {
        src: './img/plane_3.png',
        name: 'greenPlaneIcon'
      },
      {
        src: './img/fire.png',
        name: 'fireIcon'
      },
      {
        src: './img/fire2.png',
        name: 'fireIcon2'
      },
      {
        src: './img/fire3.png',
        name: 'fireIcon3'
      },
      {
        src: './img/fire4.png',
        name: 'fireIcon4'
      },
      {
        src: './img/fire5.png',
        name: 'fireIcon5'
      },
      {
        src: './img/enemy_big.png',
        name: 'enemyBigIcon'
      },
      {
        src: './img/enemy_small.png',
        name: 'enemySmallIcon'
      },
      {
        src: './img/boom_big.png',
        name: 'enemyBigBoomIcon'
      },
      {
        src: './img/boom_small.png',
        name: 'enemySmallBoomIcon'
      },
      {
        src: './img/boss1.png',
        name: 'enemyBoss1Icon'
      },
      {
        src: './img/boss2.png',
        name: 'enemyBoss2Icon'
      },
      {
        src: './img/boss3.png',
        name: 'enemyBoss3Icon'
      },
      {
        src: './img/boss4.png',
        name: 'enemyBoss4Icon'
      },
      {
        src: './img/boss5.png',
        name: 'enemyBoss5Icon'
      },
      {
        src: './img/boss6.png',
        name: 'enemyBoss6Icon'
      }
    ],
    sounds: [{
        src: './sound/biubiubiu.mp3',
        name: 'shootSound'
      },
      {
        src: './sound/music.mp3',
        name: 'gameSound'
      },
      {
        src: './sound/die.mp3',
        name: 'dieSound'
      },
      {
        src: './sound/button.mp3',
        name: 'buttonSound'
      },
      {
        src: './sound/boom.mp3',
        name: 'boomSound'
      },
    ]
  }
};