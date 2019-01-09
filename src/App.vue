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
import createTileArray from './mixins/util/createTileArray.js';

export default {
  name: 'App',
  components: {
    Tile
  },
  mixins: [createTileArray],
  data: () => {
    return {
      tiles: [],
    };
  },
  methods: {
    startGame: function() {
      const rows = 10;
      const columns = 19;
      this.tiles = this.createTileArray(rows, columns);
    }
  },
  created: function() {
    const rows = 10;
    const columns = 19;
    this.tiles = this.createTileArray(rows, columns);
    this.tiles[1][1] = 'mine';
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
