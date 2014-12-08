
var X = 800, Y=600;

var game = new Phaser.Game(X, Y, Phaser.CANVAS, '', {preload: preload, create: create, update: update, render: render} );

var floor1, floor2, platform1, counter = 0;

var text;

var numberOfBoxes = 0;

bool boxFalling = false;

var correctInput = false;

var player, upKey, downKey, leftKey, rightKey;

function preload() {

	game.scale.maxWidth = X;
    game.scale.maxHeight = Y;

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.setScreenSize();

	game.load.image('eko', 'pictures/ekoX.jpg');
	game.load.image('floor', 'textures/Walls01.jpg');
	game.load.image('player', 'player/player.jpg');

	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function create() {

	game.stage.backgroundColor = '#000';
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 300;


    text = game.add.text(9*X/10, Y/15, "i="+counter, { font: "40px Verdana", fill: "#4AE057", align: "center" });
    text.anchor.set(0.5);

	floor1 = game.add.sprite(0, Y/60*39, 'floor');
	floor1.width = X/9;
	floor1.height = Y/30;
	game.physics.arcade.enable([floor1]);
	floor1.body.allowGravity = false;
	floor1.body.immovable = true;

	floor2 = game.add.sprite(8*X/9, Y/60*39, 'floor');
	floor2.width = X/9;
	floor2.height = Y/30;
	game.physics.arcade.enable([floor2]);
	floor2.body.allowGravity = false;
	floor2.body.immovable = true;

	platform1 = game.add.sprite(X/9, Y/4, 'floor');
	platform1.width = 7*X/9;
	platform1.height = Y/30;
	game.physics.arcade.enable([platform1]);
	platform1.body.allowGravity = false;
	platform1.body.immovable = true;

	player = game.add.sprite(X/20, Y/10, 'player');
	game.physics.arcade.enable([player]);
	player.anchor.setTo(0.5, 0.5);
	player.width=50;
	player.height=50;
}

function update() {

game.physics.arcade.collide(player, [floor1, floor2, platform1]);

if (upKey.isDown) player.y-=3;
if (downKey.isDown) player.y+=2;
if (leftKey.isDown) player.x-=2;
if (rightKey.isDown) player.x+=2;

if(!boxFalling && counter > 0)
{
	createGreen();
	counter--;
}

if(correctInput) game.physics.arcade.collide([floor1, floor2, platform1], green, collisionHandler, null, this);

}

function render() {

}

function collisionHandler() {

	game.add.tween(platform1).to({ y: platform1.y + Y/10 }, 750, Phaser.Easing.Linear.None, true);
	green.destroy();
	boxFalling = false;
	counter--;
	text.setText("i="+counter);

	if(counter>0) createGreen();
}

function createGreen() {
	boxFalling = true;
	green = game.add.sprite(X/2-Y/60, Y/30, 'eko');
	green.width=Y/30;
	green.height=Y/30;
	game.physics.arcade.enable([green]);
	green.body.allowGravity = false;
	green.body.velocity.y = 100;
	green.body.bounce.set(0);

	correctInput = true;
}

function input(i) {

	counter = i - numberOfBoxes;
	numberOfBoxes += i - numberOfBoxes;
	text.setText("numberOfBoxes = "+counter);
}
