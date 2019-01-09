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
    const rowsInit = 10;
    const columnsInit = 19;
    //const tilesArray = Array.from(
    //  new Array(rows), () => Array(columns).fill('unopened')
    //);
    const tilesArray = this.createTileArray(rowsInit, columnsInit);
    return {
      rows: rowsInit,
      columns: columnsInit,
      tiles: tilesArray,
    };
  },
  methods: {
    startGame: function() {
      try{
        this.tiles = this.createTileArray(this.rows, this.columns);
      }
      catch(e) {
        console.log(e);
      }
      
    }
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
