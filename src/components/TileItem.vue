<template>
  <td
    :class="checkMine"
    @click.exact="clickTile"
    @click.right.prevent="rightClickTile"
  ></td>
</template>

<script>
export default {
  name: 'TileItem',
  props: {
    rowIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    activeState: {
      type: String,
      required: true
    },
  },
  data: function() {
    return {
      mined: Math.random() * 6 > 5,
    };
  },
  computed: {
    checkMine() {
      return this.mined ? 'mine' : 'unopened';
    }
  },
  methods: {
    /**
     * click tile
     * @function
     * @return {Event} click-tile - click tile event
     */
    clickTile: function() {
      this.$emit('click-tile', this);
    },
    /**
     * right click tile
     * @function
     * @return {Event} right click tile - right click tile event
     */
    rightClickTile: function() {
      this.$emit('right-click-tile',this);
    }
  },
  created: function() {
    console.log('tile created');
    return this.$emit('created-tile', this);
  },
  updated: function() {
    console.log('tile updated');
  },
  mounted: function() {
    console.log('tile mounted');
  },
  destroyed: function() {
    console.log('tile destroyed');
  }
};
</script>

<style>
td.unopened {
  background: url('../assets/unopened.svg');
  cursor: pointer;
}

td.opened {
  background: url('../assets/opened.svg');
}

td.flagged {
  background: url('../assets/flag.svg');
  cursor: pointer;
}

td.mine {
  background: url('../assets/mine.png');
}

td.mine-neighbor-1 {
  background: url('../assets/1.svg');
}

td.mine-neighbor-2 {
  background: url('../assets/2.svg');
}

td.mine-neighbor-3 {
  background: url('../assets/3.svg');
}

td.mine-neighbor-4 {
  background: url('../assets/4.svg');
}

td.mine-neighbor-5 {
  background: url('../assets/5.svg');
}

td.mine-neighbor-6 {
  background: url('../assets/6.svg');
}

td.mine-neighbor-7 {
  background: url('../assets/7.svg');
}

td.mine-neighbor-8 {
  background: url('../assets/8.svg');
}
</style>
