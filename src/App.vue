<template>
  <div id="app">
    <button @click="startGame">Start Game</button>
    <table class="minesweeper">
      <tr
        v-for="(row, rowIndex) in tiles"
        :key="rowIndex"
      >
        <TileItem
          v-for="(tileState, columnIndex) in row"
          :key="columnIndex"
          :row-index="rowIndex"
          :column-index="columnIndex"
          :tile-class="tileState.class"
          @click-tile="openTile"
          @right-click-tile="setFlag"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import TileItem from './components/TileItem.vue';
import { TILE_RANGE, COUNT_RANGE } from './constants/constant.js';

export default {
  name: 'App',
  components: {
    TileItem
  },
  data: () => {
    return {
      tiles: []
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
      const tileArray = [];
      for (let i = 0; i < rows; i += 1) {
        tileArray.push([]);
        for (let j = 0; j < columns; j += 1) {
          const tileElement = {
            class: 'unopened',
            mined: Math.random() * 6 > 5
          };
          tileArray[i].push(tileElement);
        }
      }
      return tileArray;
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
     * @param {Object} tile - TileItem component
     * @return {undefined}
     */
    openTile: function(rowIndex, columnIndex) {
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
 
      if (this.tiles[rowIndex][columnIndex].mined) {
        this.setMine(rowIndex, columnIndex);
        this.showAll();
      } else {
        let countOfMine = this.collectInfomationNeighbors(rowIndex, columnIndex, COUNT_RANGE);
        if (countOfMine > 0) {
          this.setNumber(rowIndex, columnIndex, countOfMine);
        } else {
          this.setOpen(rowIndex, columnIndex);
          COUNT_RANGE.forEach((range, rangeIndex) => {
            let toCheckRow = rowIndex + range.toAddRow;
            let toCheckColumn = columnIndex + range.toAddColumn;
            if (this.isNotOpened(toCheckRow, toCheckColumn)) {
              this.openTile(toCheckRow, toCheckColumn);
            }
          })
        }
      }
    },
    /** 
     * show mine
     * @function
     * @param {Object} tile - TileItem component
     * @return {undefined}
     */
    setMine: function(rowIndex, columnIndex) {
      this.tiles[rowIndex][columnIndex].class = 'mine';
    },
    /**
     * show all tiles
     * @function
     * @return {undefined}
     */
    showAll: function() {
      for (let rowIndex = 0; rowIndex < this.tiles.length; rowIndex += 1) {
        for (let columnIndex = 0; columnIndex < this.tiles[rowIndex].length; columnIndex += 1) {
          if (this.tiles[rowIndex][columnIndex].class === 'unopened' || 'flagged') {
            if (this.tiles[rowIndex][columnIndex].mined) {
              this.setMine(rowIndex, columnIndex);
            } else {
              let countOfMine = this.collectInfomationNeighbors(rowIndex, columnIndex, COUNT_RANGE);
              if (countOfMine > 0) {
                this.setNumber(rowIndex, columnIndex, countOfMine);
              } else {
                this.setOpen(rowIndex, columnIndex);
              }
            }
          }
        }
      }
    },
    /**
     * check target tile is in tile's range
     * @function
     * @param {Number} toCheckRow - check tile's row
     * @param {Number} toCheckColumn - check tile's column
     * @return {Boolean} - if target tile is in range, return true
     */
    isInRange: function(toCheckRow, toCheckColumn) {
      if (toCheckRow < 0) return false;
      if (toCheckRow >= TILE_RANGE.ROWS) return false;
      if (toCheckColumn < 0) return false;
      if (toCheckColumn >= TILE_RANGE.COLUMNS) return false;
      return true;
    },
    /**
     * check target tile is mine or not
     * @function
     * @param {Number} row - check tile's row
     * @param {Number} column - check tile's column
     * @return {Number} - if target tile is mine, return 1
     */
    isMine: function(rowIndex, columnIndex) {
      return this.tiles[rowIndex][columnIndex].mined;
    },
    /**
     * collect information on its neighbors
     * @function
     * @param {Object} tile - TileItem component
     * @param {Array} countRange - around tiles of click tile
     * @return {Number} - count how many mines surround the tile
     */
    collectInfomationNeighbors: function(rowIndex, columnIndex, countRange) {
      let countOfMine = 0;
      for (let rangeIndex = 0; rangeIndex < countRange.length; rangeIndex += 1) {
        let toCheckRow = rowIndex + countRange[rangeIndex].toAddRow;
        let toCheckColumn = columnIndex + countRange[rangeIndex].toAddColumn;
        if (this.isInRange(toCheckRow, toCheckColumn)) {
          countOfMine += this.isMine(toCheckRow, toCheckColumn) ? 1 : 0;
        }
      }
      return countOfMine;
    },
    /**
     * show the number of mines
     * @function
     * @param {Object} tile - TileItem component
     * @param {Number} countOfMine - the number of mines
     * @return {String} - tile activeState
     */
    setNumber: function(rowIndex, columnIndex, countOfMine) {
      this.tiles[rowIndex][columnIndex].class = 'mine-neighbor-' + countOfMine;
      //this.tiles[tile.rowIndex].splice(tile.columnIndex, 1, 'mine-neighbor-' + countOfMine);
    },
    /**
     * opens a tile
     * @function
     * @param {Object} - tile component
     * @return {undefined}
     */
    setOpen: function(rowIndex, columnIndex) {
      this.tiles[rowIndex][columnIndex].class = 'opened';
    },
    /**
     * check tile is not opened
     * @function
     * @param {Number} rowIndex - target tile rowIndex
     * @param {Number} columnIndex - target tile columnIndex
     * @return {Boolean} isUnopened - return true if tile is not opened
    */
    isNotOpened: function(rowIndex, columnIndex) {
      if (this.isInRange(rowIndex, columnIndex)) {
        return (this.tiles[rowIndex][columnIndex].class === "unopened" || "flagged")
      }
    },
    /**
     * flags a tile
     * @function
     * @param {Object} tile - TileItem component
     * @return {undefined}
     */
    setFlag: function(rowIndex, columnIndex) {
      if (this.tiles[rowIndex][columnIndex].class === 'unopened') {
        this.tiles[rowIndex][columnIndex].class = 'flagged';
      } else if (this.tiles[rowIndex][columnIndex].class === 'flagged') {
        this.tiles[rowIndex][columnIndex].class = 'unopened';
      }
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
