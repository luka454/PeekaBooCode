
var X = 800, Y=600;

var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'game3', {preload: preload, create: create, update: update, render: render} );

var floor1, floor2, platform1, platform2, counterGreen = 0, counterBlue=0, counterRed_p=0, counterRed_q=0;

var textGreen, textBlue, textRed_p, textRed_q;

var correctInput_i = false, correctInput_j = false, correctInput_p = false, correctInput_q = false;

var player, upKey, downKey, leftKey, rightKey;


function preload() {

	game.scale.maxWidth = X;
    game.scale.maxHeight = Y;

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize();

	game.load.image('green', 'images/lvl2.jpg');
	game.load.image('blue', 'images/lvl1.jpg');
	game.load.image('red_p', 'images/lvl3.jpg');
	game.load.image('red_q', 'images/lvl1.jpg');
	game.load.image('floor', 'images/lvl2.jpg');
	game.load.image('player', 'images/level1pic.png');

	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function create() {

	game.stage.backgroundColor = '#000';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 300;


    textGreen = game.add.text(X/9, 14*Y/15, "i="+counterGreen, { font: "40px Verdana", fill: "#4AE057", align: "center" });
    textGreen.anchor.set(0.5);

    textBlue = game.add.text(8*X/9, Y/30, "j="+counterBlue, { font: "40px Verdana", fill: "#1B38AB", align: "center" });
    textBlue.anchor.set(0.5);

    textRed_p = game.add.text(X/9, Y/12, "p="+counterRed_p, { font: "40px Verdana", fill: "#F20000", align: "center" });
    textRed_p.anchor.set(0.5);

    textRed_q = game.add.text(8*X/9, 11*Y/12, "q="+counterRed_q, { font: "40px Verdana", fill: "#F20000", align: "center" });
    textRed_q.anchor.set(0.5);

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

	platform1 = game.add.sprite(3*X/8, 8*Y/10, 'floor');
	platform1.width = 3*X/10;
	platform1.height = Y/30;
	game.physics.arcade.enable([platform1]);
	platform1.body.allowGravity = false;
	platform1.body.immovable = true;

	platform2 = game.add.sprite(3*X/10, 140, 'floor');
	platform2.width = 3*X/10;
	platform2.height = Y/30;
	game.physics.arcade.enable([platform2]);
	platform2.body.allowGravity = false;
	platform2.body.immovable = true;

	player = game.add.sprite(20, 20, 'player');
	game.physics.arcade.enable([player]);

}

function update() {

game.physics.arcade.collide(player, [floor1, floor2, platform1, platform2]);


if (upKey.isDown) player.y-=2;
if (downKey.isDown) player.y+=2;
if (leftKey.isDown) player.x-=2;
if (rightKey.isDown) player.x+=2;


if(correctInput_i) game.physics.arcade.collide(platform2, green, collisionHandlerGreenInverse, null, this);
if(correctInput_j) game.physics.arcade.collide(platform1, blue, collisionHandlerBlueInverse, null, this);
if(correctInput_p) game.physics.arcade.collide(platform2, red_p, collisionHandlerRed_pANDplatform2, null, this);
if(correctInput_q) game.physics.arcade.collide(platform1, red_q, collisionHandlerRed_qANDplatform1, null, this);

if(correctInput_i) game.physics.arcade.collide(platform1, green, collisionHandlerGreen, null, this);
if(correctInput_j) game.physics.arcade.collide(platform2, blue, collisionHandlerBlue, null, this);

}

function render() {

}

function collisionHandlerGreen() {

	game.add.tween(platform1).to({ y: platform1.y - Y/12 }, 750, Phaser.Easing.Linear.None, true);
	green.destroy();
	counterGreen++;
	textGreen.setText("i="+counterGreen);

    if(counterGreen<0) createGreen();
}

function collisionHandlerBlue() {

	game.add.tween(platform2).to({ y: platform2.y + Y/12 }, 750, Phaser.Easing.Linear.None, true);
	blue.destroy();
	counterBlue--;
	textBlue.setText("j="+counterBlue);

    if(counterBlue>0) createBlue();
}

function collisionHandlerGreenInverse() {

	game.add.tween(platform2).to({ y: platform2.y - Y/12 }, 750, Phaser.Easing.Linear.None, true);
	green.destroy();
	counterGreen++;
	textGreen.setText("i="+counterGreen);

    if(counterGreen<0) createGreen();
}

function collisionHandlerBlueInverse() {

	game.add.tween(platform1).to({ y: platform1.y + Y/12 }, 750, Phaser.Easing.Linear.None, true);
	blue.destroy();
	counterBlue--;
	textBlue.setText("j="+counterBlue);

    if(counterBlue>0) createBlue();
}

function collisionHandlerRed_p() {

	game.add.tween(platform2).to({ y: platform1.y - Y/12 }, 750, Phaser.Easing.Linear.None, true);
	red_p.destroy();
	counterRed_p--;
	textRed_p.setText("p="+counterRed_p);

    if(counterRed_p>0) createRed_p();
}

function collisionHandlerRed_q() {

	game.add.tween(platform1).to({ y: platform1.y - Y/12 }, 750, Phaser.Easing.Linear.None, true);
	red_q.destroy();
	counterRed_q++;
	textRed_q.setText("q="+counterRed_q);

    if(counterRed_q<0) createRed_q();
}

function collisionHandlerRed_pANDplatform2() {

	game.add.tween(platform2).to({ x: platform2.x+X/16}, 750, Phaser.Easing.Linear.None, true);
	red_p.destroy();
	counterRed_p--;
	textRed_p.setText("p="+counterRed_p);

	if(counterRed_p>0) createRed_p();
}

function collisionHandlerRed_qANDplatform1() {

	game.add.tween(platform1).to({ x: platform1.x-X/16}, 750, Phaser.Easing.Linear.None, true);
	red_q.destroy();
	counterRed_q++;
	textRed_q.setText("q="+counterRed_q);

	if(counterRed_q<0) createRed_q();
}

function createGreen() {

	green = game.add.sprite(200, 530, 'green');
	green.width=20;
	green.height=20;
	game.physics.arcade.enable([green]);
	green.body.allowGravity=false;
	green.body.velocity.y = -100;
	green.body.bounce.set(0);

	correctInput_i = true;
}

function createBlue() {

	blue = game.add.sprite(550, 20, 'blue');
	blue.width=20;
	blue.height=20;
	game.physics.arcade.enable([blue]);
	blue.body.allowGravity=false;
	blue.body.velocity.y = 100;
	blue.body.bounce.set(0);

	correctInput_j = true;
}

function createRed_p() {

	red_p = game.add.sprite(3*X/16, 140, 'red_p');
	red_p.width=20;
	red_p.height=20;
	game.physics.arcade.enable([red_p]);
	red_p.body.allowGravity=false;
	red_p.body.velocity.x = 100;
	red_p.body.bounce.set(0);

	correctInput_p = true;
}

function createRed_q() {

	red_q = game.add.sprite(13*X/16, 4*Y/5, 'red_q');
	red_q.width=20;
	red_q.height=20;
	game.physics.arcade.enable([red_q]);
	red_q.body.allowGravity=false;
	red_q.body.velocity.x = -100;
	red_q.body.bounce.set(0);

	correctInput_q = true;
}

function input() {


	counterGreen = -4;
	textGreen.setText("i="+counterGreen);
	createGreen();

	counterBlue = 3;
	textBlue.setText("j="+counterBlue);
	createBlue();

	counterRed_p = 4;
	textRed_p.setText("p="+counterRed_p);
	createRed_p();

	counterRed_q = -3;
	textRed_q.setText("q="+counterRed_q);
	createRed_q();
}
