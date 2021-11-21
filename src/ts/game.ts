const _number = require("lodash/number");

type Tile = "red" | "blue" | "yellow" | "black" | "white";

interface TileContainer {
  red: number;
  blue: number;
  yellow: number;
  black: number;
  white: number;
}

class FactoryDisplay implements TileContainer {
  red: number;
  blue: number;
  yellow: number;
  black: number;
  white: number;
  constructor() {
    this.red = 0;
    this.blue = 0;
    this.yellow = 0;
    this.black = 0;
    this.white = 0;
  }
  addTile(newTile: Tile) {
    switch (newTile) {
      case "red":
        ++this.red;
        break;
      case "blue":
        ++this.blue;
        break;
      case "yellow":
        ++this.yellow;
        break;
      case "black":
        ++this.black;
        break;
      case "white":
      default:
        ++this.white;
        break;
    }
  }
}

class Bag implements TileContainer {
  red: number;
  blue: number;
  yellow: number;
  black: number;
  white: number;
  constructor() {
    this.red = 20;
    this.blue = 20;
    this.yellow = 20;
    this.black = 20;
    this.white = 20;
  }
  draw(): Tile {
    let availableTiles = [];
    if (this.red != 0) {
      availableTiles.push("red");
    }
    if (this.blue != 0) {
      availableTiles.push("blue");
    }
    if (this.yellow != 0) {
      availableTiles.push("yellow");
    }
    if (this.black != 0) {
      availableTiles.push("black");
    }
    if (this.white != 0) {
      availableTiles.push("white");
    }

    switch (availableTiles[_number.random(0, availableTiles.length - 1)]) {
      case "red":
        --this.red;
        return "red";
      case "blue":
        --this.blue;
        return "blue";
      case "yellow":
        --this.yellow;
        return "yellow";
      case "black":
        --this.black;
        return "black";
      case "white":
        --this.white;
      default:
        return "white";
    }
  }
  fill(tiles: TileContainer) {
    this.red = tiles.red;
    this.blue = tiles.blue;
    this.yellow = tiles.yellow;
    this.black = tiles.black;
    this.white = tiles.white;
  }
  empty(): boolean {
    if (this.red != 0) {
      return false;
    }
    if (this.blue != 0) {
      return false;
    }
    if (this.yellow != 0) {
      return false;
    }
    if (this.black != 0) {
      return false;
    }
    if (this.white != 0) {
      return false;
    }
    return true;
  }
}

class Box implements TileContainer {
  red: number;
  blue: number;
  yellow: number;
  black: number;
  white: number;
  constructor() {
    this.red = 0;
    this.blue = 0;
    this.yellow = 0;
    this.black = 0;
    this.white = 0;
  }
  dump() {
    let boxTiles = {
      red: this.red,
      blue: this.blue,
      yellow: this.yellow,
      black: this.black,
      white: this.white,
    };

    this.red = 0;
    this.blue = 0;
    this.yellow = 0;
    this.black = 0;
    this.white = 0;

    return boxTiles;
  }
}

export interface Player {}

export class AzulGame {
  bag: Bag;
  box: Box;
  player: Player[];
  factoryDisplays: FactoryDisplay[];
  center: FactoryDisplay;
  constructor(players: Player[]) {
    this.player = players;
    this.bag = new Bag();
    this.box = new Box();

    // create factory displays
    switch (players.length) {
      case 4:
        this.factoryDisplays = Array(9);
        break;
      case 3:
        this.factoryDisplays = Array(7);
        break;
      case 2:
      default:
        this.factoryDisplays = Array(5);
        break;
    }
    for (let i = 0; i < this.factoryDisplays.length; ++i) {
      this.factoryDisplays[i] = new FactoryDisplay();
    }
    this.center = new FactoryDisplay();

    // fill the factory tiles for the first round
    this.dealTiles();
  }
  dealTiles() {
    // TODO: check to make sure all factory displays are empty
    for (let i = 0; i < this.factoryDisplays.length; ++i) {
      let tileCount = 0;
      while (tileCount < 4) {
        if (this.bag.empty()) {
          this.bag.fill(this.box.dump());
          if (this.bag.empty()) {
            tileCount = 4;
          }
        } else {
          this.factoryDisplays[i].addTile(this.bag.draw());
          ++tileCount;
        }
      }
    }
  }
}

// TODO: handle turns and order?

// TODO: "ask" a player for a move
