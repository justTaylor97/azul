const assert = require("chai").assert;
const azul = require("../src/js/game");

describe("game setup", () => {
  describe("game setup", () => {
    let game = new azul.AzulGame([{}, {}, {}]);
    const sumTiles = (game, color) => {
      let tileSum = 0;
      tileSum += game.bag[color];
      tileSum += game.center[color];
      tileSum += game.box[color];
      game.factoryDisplays.forEach((factoryDisplay) => {
        tileSum += factoryDisplay[color];
      });

      return tileSum;
    };

    // checks there are exactly 20 tiles of each color
    it("should have 20 red tiles ", () => {
      assert.strictEqual(sumTiles(game, "red"), 20);
    });
    it("should have 20 blue tiles ", () => {
      assert.strictEqual(sumTiles(game, "blue"), 20);
    });
    it("should have 20 yellow tiles ", () => {
      assert.strictEqual(sumTiles(game, "yellow"), 20);
    });
    it("should have 20 black tiles ", () => {
      assert.strictEqual(sumTiles(game, "black"), 20);
    });
    it("should have 20 white tiles ", () => {
      assert.strictEqual(sumTiles(game, "white"), 20);
    });

    // checks that all factory displays have exactly 4 tiles
    it("all factory displays should have exactly 4 tiles", () => {
      game.factoryDisplays.forEach((factoryDisplay) => {
        let tileSum = 0;
        tileSum += factoryDisplay.red;
        tileSum += factoryDisplay.blue;
        tileSum += factoryDisplay.yellow;
        tileSum += factoryDisplay.black;
        tileSum += factoryDisplay.white;
        assert.strictEqual(tileSum, 4);
      });
    });

    it("a two player game should have 5 factory displays", () => {
      let twoPlayerGame = new azul.AzulGame([{}, {}]);
      assert.strictEqual(twoPlayerGame.factoryDisplays.length, 5);
    });

    it("a three player game should have 7 factory displays", () => {
      let twoPlayerGame = new azul.AzulGame([{}, {}, {}]);
      assert.strictEqual(twoPlayerGame.factoryDisplays.length, 7);
    });

    it("a four player game should have 9 factory displays", () => {
      let twoPlayerGame = new azul.AzulGame([{}, {}, {}, {}]);
      assert.strictEqual(twoPlayerGame.factoryDisplays.length, 9);
    });
  });
});
