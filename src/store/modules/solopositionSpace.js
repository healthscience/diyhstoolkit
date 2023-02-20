import Vue from 'vue'
import VisPositionUtility from '@/mixins/positionSoloUtility.js'
const PositionUtility = new VisPositionUtility()

export default {
  state: {
    boardid: '',
    liveSpaceCoord: {},
    c: {},
    ctx: PositionUtility,
    spaceClick: true,
    minmapClick: false,
    mouseClickCount: 0,
    soloGrid: {},
    initialGrid: {}
  },
  getters: {
  },
  mutations: {
    SET_CANVASSOLO_SPACE: (state, inVerified) => {
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
      // Vue.set(state.initialGrid, inVerified)
      let modHash = Object.keys(inVerified)
      let modCount = 1
      for (let mitem of modHash) {
        Vue.set(state.initialGrid, mitem, {})
        Vue.set(state.liveSpaceCoord, mitem, {})
        let positionTrack = state.ctx.startPositionCellspace(modCount, inVerified[mitem], { x: 200, y: 300 }, 'cell')
        modCount++
        Vue.set(state.liveSpaceCoord, mitem, positionTrack)
        Vue.set(state.initialGrid, mitem, positionTrack)
        state.ctx.miniMapSoloLocations(state.initialGrid[mitem])
      }
    },
    SET_SPACEPOSITIONSOLO_STATE: (state, inVerified) => {
      let positionTrack = state.ctx.startPositionSpace(inVerified.nxp, inVerified.coord, inVerified.type)
      Vue.set(state.liveSpaceCoord, inVerified.nxp, positionTrack)
      // update the minimap
      // state.ctx.miniMapSoloLocations()
    },
    SET_SPACEPOSITION_REFRESH: (state, inVerified) => {
      console.log(inVerified)
    },
    SET_UPDATESOLOMMAP_POSITION: (state, inVerified) => {
      let updateCOORD = state.ctx.updateSoloMMapSpace(inVerified, state.initialGrid)
      state.initialGrid[inVerified.cell.moduleCNRL] = []
      Vue.set(state.initialGrid, inVerified.cell.moduleCNRL, updateCOORD)
      // need to update SOLO minimap
      // state.ctx.miniMapSoloLocations(state.initialGrid)
    },
    SET_REMOVEMMAP_POSITION: (state, inVerified) => {
      // let updateCOORD = state.ctx.removeMMapSpace(inVerified)
      state.ctx.removeMMapSpace(inVerified)
      /* let updateXY = {}
      updateXY.x = updateCOORD.x
      updateXY.y = updateCOORD.y
      Vue.set(state.liveSpaceCoord, inVerified.nxp, updateXY) */
    },
    SET_SCROLLTOCELL_POSITION: (state, inVerified) => {
      state.ctx.scrollTODashboard(inVerified, state.initialGrid)
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
    },
    SET_ACTIVE_SOLOI: (state, inVerified) => {
      console.log('set active solo cell')
      console.log(inVerified)
    }
  },
  actions: {
    actionSetsolominmap: (context, update) => {
      context.commit('SET_CANVASSOLO_SPACE', update)
    },
    actionAllSoloCells: (context, update) => {
      context.commit('SET_INITAL_CELLS', update)
    },
    actionResetMmap: (context) => {
      context.commit('SET_RESET_MMAP')
    },
    actionPostionCoordMouse: (context, update) => {
      context.commit('SET_POSITION_MOUSE', update)
    },
    actionPostionSoloCoord: (context, update) => {
      // keep track of position in bento space
      context.commit('SET_SPACEPOSITIONSOLO_STATE', update)
    },
    actionClearPosition: (context, update) => {
      context.commit('SET_CLEAR_POSITION', update)
    },
    actionMMapSoloMove: (context, update) => {
      context.rootState.activeScalevalue = 1
      context.commit('SET_SCROLLTOCELL_POSITION', update)
    },
    actionSoloBmove: (context, update) => {
      context.commit('SET_UPDATESOLOMMAP_POSITION', update)
    },
    actionDashBRemove: (context, update) => {
      context.commit('SET_REMOVEMMAP_POSITION', update)
    },
    actionZoomset: (context, update) => {
      context.commit('SET_ZOOM_MAP', update)
    },
    actionRefreshminimap: (context, update) => {
      context.commit('SET_SPACEPOSITION_REFRESH', update)
    },
    actionActiveSoloSelect (context, update) {
      context.commit('SET_ACTIVE_SOLOI', update)
    }
  }
}
