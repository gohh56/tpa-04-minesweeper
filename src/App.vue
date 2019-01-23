<template>
  <div id="app">
    <button @click="startGame">Start Game</button>
    <table class="minesweeper">
      <tr
        v-for="(row, rowIndex) in tiles"
        :key="rowIndex"
      >
        <TileItem
          v-for="(column, columnIndex) in row"
          :key="columnIndex"
          :row-index="rowIndex"
          :column-index="columnIndex"
          :active-state="column.class"
          @click-tile="console.log(TileItem.mined)"
          @right-click-tile="setFlag"
          @created-tile="setMine"
        />
      </tr>
    </table>
    {{ $data }}
  </div>
</template>

<script>
import TileItem from './components/TileItem.vue';
import { TILE_RANGE } from './constants/constant.js';

export default {
  name: 'App',
  components: {
    TileItem
  },
  data: () => {
    return {
      tiles: [],
      column: null,
      tileMines: [],
    };
  },
  methods: {
    /**
     * create tiles
     * @function
     * @param {Number} rows - count of tiles row.
     * @param {Number} columns - count of tiles column. 
     * @return {Array}
     */
    createTileArray: function(rows, columns) {
      const tileElement = {
        class: 'unopened',
        isMine: false
      };
      return Array.from(
        new Array(rows), () => 
          Array(columns).fill(tileElement)
      );
    },
    /**
     * initialize tiles
     * @function
     * @return {undefined}
     */
    initTiles: function() {
      console.log('init tiles');
      this.tiles = this.createTileArray(TILE_RANGE.ROWS, TILE_RANGE.COLUMNS);
    },
    /**
     * game start
     * @function
     * @return {undefined}
     */
    startGame: function() {
      console.log('start game');
      this.initTiles();
    },
    /**
     * open tile
     * @function
     * @param {Object} tile - TileItem component
     * @return {undefined}
     */
    openTile: function(tile) {
      // if the tile is mined
      console.log(tile.mined);
      console.log(this.tileMines);
      if (this.tileMines === true) {
        console.log('this is mine');
        this.setMine(tile);
      }
        // show a mine
        // reveal all other tiles
      // if its not mined
        // collect information on its neighbors
        // count how many mines surround the tile
        // if there are mines
          // reveal the number of mines that surround the tile
        // if there are no mines
          // show the tile as 'opened'
          // (for each neighbor)
            // (if the neighbor has not been opened yet)
              // (open the neighbor)
    },
    /** 
     * show mine
     * @function
     * @param {Object} tile - TileItem component
     * @return {undefined}
     */
    setMine: function(tile) {
      let setTile = {
        class: 'unopened',
        isMine: tile.mined
      }
      this.tiles[tile.rowIndex].splice(tile.columnIndex, 1, setTile);
    },
    /**
     * show all tiles
     * @function
     * @return {undefined}
     */
    showAll: function(tile) {
      //show All Tiles
    },
    /**
     * collect information on its neighbors
     * @function
     * @param {Object} tile - TileItem component
     * @return {Boolean} - tile is mine 
     */
    isMine: function(tile) {
      //is Mine?
      if (tile.mined) return 1;
    },
    /**
     * show the number of mines
     * @function
     * @param {Object} tile - TileItem component
     * @param {Number} countOfMine - the number of mines
     * @return {String} - tile activeState
     */
    setNumber: function(tile, countOfMine) {
      this.tiles[tile.rowIndex].splice(tile.columnIndex, 1, 'mine-neighbor-' + countOfMine);
    },
    /**
     * opens a tile
     * @function
     * @param {Object} - tile component
     * @return {undefined}
     */
    setOpen: function(tile) {
      this.tiles[tile.rowIndex].splice(tile.columnIndex, 1, 'opened');
    },
    /**
     * flags a tile
     * @function
     * @param {Object} tile - TileItem component
     * @return {undefined}
     */
    setFlag: function(tile) {
      this.tiles[tile.rowIndex].splice(tile.columnIndex, 1, 'flagged');
    },
  },
  created: function() {
    this.initTiles();
  }
};
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  background: #333;
  color: #fff;
}

button {
  margin: 20px auto;
  display: block;
}

table.minesweeper {
  margin: auto;
  border: 1px solid #999;
  border-collapse: collapse;
  background-color: #ddd;
}

table.minesweeper td {
  width: 24px;
  height: 24px;
  background-size: cover;
}
</style>
