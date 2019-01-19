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
          :active-state="column"
          @click-tile="openTile"
          @right-click-tile="setFlag"
        />
      </tr>
    </table>
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
      return Array.from(
        new Array(rows), () => Array(columns).fill('unopened')
      );
    },
    /**
     * initialize tiles
     * @function
     * @return {undefined}
     */
    initTiles: function() {
      this.tiles = this.createTileArray(TILE_RANGE.ROWS, TILE_RANGE.COLUMNS);
    },
    /**
     * game start
     * @function
     * @return {undefined}
     */
    startGame: function() {
      this.initTiles();
    },
    /**
     * open tile
     * @function
     * @tile
     * @return {undefined}
     */
    openTile: function() {
      // if the tile is mined
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
    showMine: function(tile) {
      //show mine
    },
    /**
     * show all tiles
     * @function
     * @return {undefined}
     */
    showAllTiles: function(tile) {
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
    },
    /**
     * show the number of mines
     * @function
     * @param {Number} - the number of mines
     * @return {String} - tile activeState
     */
    setNumber: function() {
      //set Number class
    },
    /**
     * opens a tile
     * @function
     * @param {Object} - tile component
     * @return {undefined}
     */
    setOpen: function() {
      //set open
    },
    /**
     * open a neighbors
     * @function
     * @param {Object} - tile component
     * @return {undefined}
     */
    setOpenNeighbor: function() {
      //set open neighbors
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
