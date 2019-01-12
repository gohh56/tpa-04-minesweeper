<template>
  <div id="app">
    <button @click="startGame">Start Game</button>
    <table class="minesweeper">
      <tr
        v-for="(row, rowIndex) in tiles"
        :key="rowIndex"
      >
        <Tile
          v-for="(column, columnIndex) in row"
          :key="columnIndex"
          :row-index="rowIndex"
          :column-index="columnIndex"
          :action-state="column"
          @open-tile="openTile"
          @set-flag="setFlag"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import Tile from './components/Tile.vue';
import { TILE_RANGE } from './constants/constant.js';

export default {
  name: 'App',
  components: {
    Tile
  },
  data: () => {
    return {
      tiles: [],
    };
  },
  methods: {
    createTileArray: function(rows, columns) {
      return Array.from(
        new Array(rows), () => Array(columns).fill('unopened')
      );
    },
    startGame: function() {
      this.initTiles();
    },
    initTiles: function() {
      this.tiles = this.createTileArray(TILE_RANGE.ROWS, TILE_RANGE.COLUMNS);
    },
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
    setFlag: function(tile) {
      tile = 'flagged';
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
