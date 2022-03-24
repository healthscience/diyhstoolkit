// import Vue from 'vue'
// const PostionUtility = new VisPositionUtility()

export default {
  state: {
    c: {},
    ctx: {},
    firstClick: false,
    mouseHistory: {}
  },
  getters: {
  },
  mutations: {
    SET_CANVAS_SPACE: (state, inVerified) => {
      state.c = inVerified
      state.ctx = state.c.getContext('2d')
    },
    SET_POSITION_MOUSE: (state, inVerified) => {
      if (state.firstClick !== true) {
        // state.ctx.clearRect(0, 0, 200, 200)
        state.ctx.beginPath()
        state.ctx.strokeStyle = 'lightgrey'
        state.ctx.lineWidth = '3'
        state.ctx.rect(state.mouseHistory.x, state.mouseHistory.y, 10, 10)
        state.ctx.stroke()
      } else {
        state.firstClick = false
      }
      let xStart = inVerified.x / 42
      let yStart = inVerified.y / 42
      let mousePair = {}
      mousePair.x = xStart
      mousePair.y = yStart
      state.mouseHistory = mousePair
      state.ctx.beginPath()
      state.ctx.strokeStyle = '#FF0000'
      state.ctx.lineWidth = '1'
      state.ctx.rect(xStart, yStart, 10, 10)
      state.ctx.stroke()
    },
    SET_POSITION_STATE: (state, inVerified) => {
      function placeBBox (box) {
        let xStart = box.x / 42
        let yStart = box.y / 42
        state.ctx.beginPath()
        state.ctx.strokeStyle = '#000000'
        state.ctx.rect(xStart, yStart, 15, 30)
        state.ctx.stroke()
      }
      let liveBBox = Object.keys(inVerified.position)
      liveBBox.forEach(
        element => placeBBox(inVerified.position[element]))
    }
  },
  actions: {
    actionSetminmap: (context, update) => {
      context.commit('SET_CANVAS_SPACE', update)
    },
    actionPostionCoordMouse: (context, update) => {
      context.commit('SET_POSITION_MOUSE', update)
    },
    actionPostionCoord: (context, update) => {
      let updatePosition = {}
      updatePosition.bbox = update
      updatePosition.position = context.rootState.liveSpaceCoord
      context.commit('SET_POSITION_STATE', updatePosition)
    }
  }
}
