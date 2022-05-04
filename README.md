## Download Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Installing NPM

After cloning the repo, run `npm install` from your IDE's terminal.

## Running Code using NPM

You can now start the local development server by running `npm start` at any time.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Packages and Resources used in our Comp-225 Phaser Project
- Phaser's Project template by Richard Davey from Photon Storm: `https://github.com/photonstorm/phaser3-project-template`
- Box2D Physics Engine by Erin Catto: `https://box2d.org/`
- LiquidFun Fluid Engine by Google: `https://google.github.io/liquidfun/`
- Paul Cantrell's LiquidFun to Phaser Engine Conversion Code

## How is our code organized?
For our game's code, we have divided each of the game's mechanics into their own indivdual file classes for ease of access. For example, the `jello.js` file creates the jello object using LiquidFun and the methods associated with the jello object.

In terms of how the acutal game operates, the `scenes` folder contains our code for implemting our game's objects into each of our scenes. For example, the `Game.js` file uses Phaser's scene library in order to create our game's objects and update the game continously.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
