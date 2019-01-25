const TILE_RANGE = Object.freeze({
  ROWS: 10,
  COLUMNS: 19,
});

const COUNT_RANGE = Object.freeze([
  {toAddRow: -1, toAddColumn: -1},
  {toAddRow: -1, toAddColumn: 0},
  {toAddRow: -1, toAddColumn: 1},
  {toAddRow: 0, toAddColumn: -1},
  {toAddRow: 0, toAddColumn: 1},
  {toAddRow: 1, toAddColumn: -1},
  {toAddRow: 1, toAddColumn: 0},
  {toAddRow: 1, toAddColumn: 1},
]);
  
export {
  TILE_RANGE,
  COUNT_RANGE
};
  