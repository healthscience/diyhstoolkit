<template>
  <div id='dashboard'>Dashboard
    <div>
        <div class='layoutJSON'>
            Displayed as <code>[x, y, w, h]</code>
            <div class='columns'>
                <div class='layoutItem' v-for='item in layout' :key='item.id'>
                    <b>{{item.i}}</b>:  [{{item.x}}, {{item.y}}, {{item.w}}, {{item.h}}]
                </div>
            </div>
        </div>
    </div>
    <div id='content'>
        <!--<button @click='decreaseWidth'>Decrease Width</button>
        <button @click='increaseWidth'>Increase Width</button>-->
        <button @click='addItem'>Add an item</button>
        <input type='checkbox' v-model='draggable'/> Draggable
        <input type='checkbox' v-model='resizable'/> Resizable
        <br/>
        <grid-layout :layout='layout'
                     :col-num='12'
                     :row-height='30'
                     :is-draggable='draggable'
                     :is-resizable='resizable'
                     :vertical-compact='true'
                     :use-css-transforms='true'
        >
            <grid-item v-for='item in layout' :key='item.id'
                       :static='item.static'
                       :x='item.x'
                       :y='item.y'
                       :w='item.w'
                       :h='item.h'
                       :i='item.i'
                    >
                <span class='text'>{{itemTitle(item)}}</span>
            </grid-item>
        </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
const testLayout = [
  { 'x': 0, 'y': 0, 'w': 20, 'h': 2, 'i': '0', static: true },
  { 'x': 0, 'y': 0, 'w': 2, 'h': 5, 'i': '1', static: false },
  { 'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2', static: false }
]

export default {
  name: 'dashboard-page',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  created () {
  },
  mounted () {
  },
  data () {
    return {
      layout: testLayout,
      draggable: true,
      resizable: true,
      index: 0
    }
  },
  methods: {
    itemTitle (item) {
      var result = item.i
      if (item.static) {
        result += ' - Static'
      }
      return result
    },
    /*
    increaseWidth: function (item) {
        var width = document.getElementById('content').offsetWidth;
        width += 20;
        document.getElementById('content').style.width = width+'px';
    },
    decreaseWidth: function (item) {

        var width = document.getElementById('content').offsetWidth;
        width -= 20;
        document.getElementById('content').style.width = width+'px';
    },
    removeItem: function(item) {
        //console.log('### REMOVE ' + item.i);
        this.layout.splice(this.layout.indexOf(item), 1);
    }, */
    addItem () {
      // console.log('### LENGTH: ' + this.layout.length);
      var item = { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': this.index + '', whatever: 'bbb' }
      this.index++
      this.layout.push(item)
    }
  }
}
</script>

<style>
#dashboard {
 margin: 1em;
}

#content {
    width: 100%;
}

.vue-grid-layout {
    background: #eee;
}

.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}

.eventsJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
    height: 100px;
    overflow-y: scroll;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}

/*.vue-resizable-handle {
    z-index: 5;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
}*/

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
}

.vue-grid-item.resizing {
    opacity: 0.9;
}

.vue-grid-item.static {
    background: #cce;
}

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}

</style>
