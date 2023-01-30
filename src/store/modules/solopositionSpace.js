import Vue from 'vue'
import VisPositionUtility from '@/mixins/positionUtility.js'
const PositionUtility = new VisPositionUtility()

export default {
  state: {
    liveSpaceCoord: {},
    c: {},
    ctx: PositionUtility,
    spaceClick: true,
    minmapClick: false,
    mouseClickCount: 0
  },
  getters: {
  },
  mutations: {
    SET_CANVAS_SPACE: (state, inVerified) => {
      state.ctx.setCanvas(inVerified)
    },
    SET_RESET_MMAP: (state, inVerified) => {
      state.ctx.clearMMap()
    },
    SET_POSITION_MOUSE: (state, inVerified) => {
      // has the minimouse area been clicked?
      state.ctx.mousePointer(inVerified)
    },
    SET_INITAL_CELLS: (state, inVerified) => {
      let modHash = Object.keys(inVerified)
      for (let mitem of modHash) {
        for (let mcell of inVerified[mitem]) {
          let positionTrack = state.ctx.startPositionSpace(mcell, { x: 200, y: 300 }, 'cell')
          Vue.set(state.liveSpaceCoord, mcell, positionTrack)
        }
      }
      console.log('cell space coo rod set')
      console.log(state.liveSpaceCoord)
    },
    SET_SPACEPOSITION_STATE: (state, inVerified) => {
      let positionTrack = state.ctx.startPositionSpace(inVerified.nxp, inVerified.coord, inVerified.type)
      Vue.set(state.liveSpaceCoord, inVerified.nxp, positionTrack)
      // update the minimap
      state.ctx.miniMapLocations()
    },
    SET_SPACEPOSITION_REFRESH: (state, inVerified) => {
      console.log(inVerified)
    },
    SET_UPDATEMMAP_POSITION: (state, inVerified) => {
      let updateCOORD = state.ctx.updateMMapSpace(inVerified)
      let updateXY = {}
      updateXY.x = updateCOORD.x
      updateXY.y = updateCOORD.y
      Vue.set(state.liveSpaceCoord, inVerified.nxp, updateXY)
    },
    SET_REMOVEMMAP_POSITION: (state, inVerified) => {
      console.log('remove coor postion')
      console.log(inVerified)
      // let updateCOORD = state.ctx.removeMMapSpace(inVerified)
      state.ctx.removeMMapSpace(inVerified)
      /* let updateXY = {}
      updateXY.x = updateCOORD.x
      updateXY.y = updateCOORD.y
      Vue.set(state.liveSpaceCoord, inVerified.nxp, updateXY) */
    },
    SET_SCROLLTO_POSITION: (state, inVerified) => {
      state.ctx.scrollTODashboard(inVerified)
    },
    SET_ZOOM_MAP: (state, inVerified) => {
      state.ctx.setZoom(inVerified)
    },
    SET_CLEAR_POSITION: (state, inVerified) => {
      let coordKeys = Object.keys(state.liveSpaceCoord)
      const clearCoord = { ...state.liveSpaceCoord }
      for (let ck of coordKeys) {
        delete clearCoord[ck]
      }
    }
  },
  actions: {
    actionSetsolominmap: (context, update) => {
      context.commit('SET_CANVAS_SPACE', update)
    },
    actionAllCells: (context, update) => {
      console.log('module cells')
      console.log(update)
      context.commit('SET_INITAL_CELLS', update)
    },
    actionResetMmap: (context) => {
      context.commit('SET_RESET_MMAP')
    },
    actionPostionCoordMouse: (context, update) => {
      context.commit('SET_POSITION_MOUSE', update)
    },
    actionPostionCoord: (context, update) => {
      // keep track of position in bento space
      context.commit('SET_SPACEPOSITION_STATE', update)
    },
    actionClearPosition: (context, update) => {
      context.commit('SET_CLEAR_POSITION', update)
    },
    actionMMapSoloMove: (context, update) => {
      context.rootState.activeScalevalue = 1
      context.commit('SET_SCROLLTO_POSITION', update)
    },
    actionSoloBmove: (context, update) => {
      context.commit('SET_UPDATEMMAP_POSITION', update)
    },
    actionDashBRemove: (context, update) => {
      context.commit('SET_REMOVEMMAP_POSITION', update)
    },
    actionZoomset: (context, update) => {
      context.commit('SET_ZOOM_MAP', update)
    },
    actionRefreshminimap: (context, update) => {
      context.commit('SET_SPACEPOSITION_REFRESH', update)
    }
  }
}
