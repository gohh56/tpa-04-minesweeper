export default {
  methods: {
    createTileArray: function(rows, columns) {
      return Array.from(
        new Array(rows), () => Array(columns).fill('unopened')
      );
    }
  }
};