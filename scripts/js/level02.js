
var X = 800, Y=600;

var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'game2', {preload: preload, create: create, update: update, render: render} );

var floor1, floor2, platform1, platform2, counterGreen = 0, counterBlue=0;

var textGreen, textBlue;

var correctInput_i = false, correctInput_j = false;

var player, upKey, downKey, leftKey, rightKey;


function preload() {

	game.scale.maxWidth = X;
    game.scale.maxHeight = Y;

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize();
	
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

	game.load.image('green', 'images/lvl1.jpg');
	game.load.image('blue', 'images/lvl3.jpg');
	game.load.image('floor', 'images/lvl2.jpg');
	game.load.image('player', 'images/level2pic.png');
}

function create() {

	game.stage.backgroundColor = '#000';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 300;


    textGreen = game.add.text(8*X/9, Y/30, "i="+counterGreen, { font: "40px Verdana", fill: "#4AE057", align: "center" });
    textGreen.anchor.set(0.5);

    textBlue = game.add.text(X/9, 14*Y/15, "j="+counterBlue, { font: "40px Verdana", fill: "#1B38AB", align: "center" });
    textBlue.anchor.set(0.5);

	floor1 = game.add.sprite(0, Y/2, 'floor');
	floor1.width = X/9;
	floor1.height = Y/30;
	game.physics.arcade.enable([floor1]);
	floor1.body.allowGravity = false;
	floor1.body.immovable = true;

	floor2 = game.add.sprite(8*X/9, Y/2, 'floor');
	floor2.width = X/9;
	floor2.height = Y/30;
	game.physics.arcade.enable([floor2]);
	floor2.body.allowGravity = false;
	floor2.body.immovable = true;

	platform1 = game.add.sprite(X/9, 7*Y/10, 'floor');
	platform1.width = 4*X/9;
	platform1.height = Y/30;
	game.physics.arcade.enable([platform1]);
	platform1.body.allowGravity = false;
	platform1.body.immovable = true;

	platform2 = game.add.sprite(5*X/9, 3*Y/10, 'floor');
	platform2.width = 3*X/9;
	platform2.height = Y/30;
	game.physics.arcade.enable([platform2]);
	platform2.body.allowGravity = false;
	platform2.body.immovable = true;

	player = game.add.sprite(X/20, Y/10, 'player');
	game.physics.arcade.enable([player]);
	player.anchor.setTo(0.5, 0.5);
	player.width=50;
	player.height=50;
}

function update() {

game.physics.arcade.collide(player, [floor1, floor2, platform1, platform2]);

if (upKey.isDown) player.y-=3;
if (downKey.isDown) player.y+=2;
if (leftKey.isDown) player.x-=2;
if (rightKey.isDown) player.x+=2;

if(correctInput_i) game.physics.arcade.collide(platform2, green, collisionHandlerGreen, null, this);
if(correctInput_j) game.physics.arcade.collide(platform1, blue, collisionHandlerBlue, null, this);

}

function render() {

}

function collisionHandlerGreen() {

	game.add.tween(platform2).to({ y: platform2.y + X/16 }, 750, Phaser.Easing.Linear.None, true);
	green.destroy();
	counterGreen--;
	textGreen.setText("i="+counterGreen);

    if(counterGreen>0) createGreen();
}

function collisionHandlerBlue() {

	game.add.tween(platform1).to({ y: platform1.y - Y/12 }, 750, Phaser.Easing.Linear.None, true);
	blue.destroy();
	counterBlue++;
	textBlue.setText("j="+counterBlue);

    if(counterBlue<0) createBlue();
}

function createGreen() {

	green = game.add.sprite(7*X/10, Y/16, 'green');
	green.width=20;
	green.height=20;
	game.physics.arcade.enable([green]);
	green.body.allowGravity = false;
	green.body.velocity.y = 100;
	green.body.bounce.set(0);

	correctInput_i = true;
}

function createBlue() {

	blue = game.add.sprite(5*X/16, 530, 'blue');
	blue.width=20;
	blue.height=20;
	game.physics.arcade.enable([blue]);
	blue.body.allowGravity = false;
	blue.body.velocity.y = -100;
	blue.body.bounce.set(0);

	correctInput_j = true;
}

function input() {

	counterGreen = 3;
	textGreen.setText("i="+counterGreen);
	createGreen();

	counterBlue = -3;
	textBlue.setText("j="+counterBlue);
	createBlue();
}
