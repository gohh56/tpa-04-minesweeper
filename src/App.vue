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
          :action-state="column"
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
    }
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
