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
    SET_SPACEPOSITION_STATE: (state, inVerified) => {
      let positionTrack = state.ctx.startPositionSpace(inVerified, state.liveSpaceCoord)
      Vue.set(state.liveSpaceCoord, inVerified, positionTrack)
      // update the minimap
      state.ctx.miniMapLocations()
    },
    SET_UPDATEMMAP_POSITION: (state, inVerified) => {
      state.ctx.updateMMapSpace(inVerified)
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
      state.liveSpaceCoord = clearCoord
    }
  },
  actions: {
    actionSetminmap: (context, update) => {
      context.commit('SET_CANVAS_SPACE', update)
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
    actionMMapMove: (context, update) => {
      context.commit('SET_SCROLLTO_POSITION', update)
    },
    actionDashBmove: (context, update) => {
      context.commit('SET_UPDATEMMAP_POSITION', update)
    },
    actionZoomset: (context, update) => {
      context.commit('SET_ZOOM_MAP', update)
    }

  }
}
