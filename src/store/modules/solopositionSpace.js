import Vue from 'vue'
import VisPositionUtility from '@/mixins/positionSoloUtility.js'
// import { invert } from 'lodash'
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
    initialGrid: {},
    savedLayout: {},
    boardModulesList: [],
    soloData: {}
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
    SET_SAVED_LAYOUT: (state, inVerified) => {
      Vue.set(state.savedLayout, 'start', inVerified)
    },
    SET_INITAL_CELLS: (state, inVerified) => {
      console.log('set solo cells')
      let layoutCheck = []
      console.log(inVerified)
      if (state.savedLayout?.start !== undefined) {
        console.log(state.savedLayout.start[inVerified.board])
        layoutCheck = Object.keys(state.savedLayout.start[inVerified.board])
        Vue.set(state.liveSpaceCoord, inVerified.board, {})
        Vue.set(state.initialGrid, inVerified.board, {})
      } else {
        layoutCheck = []
      }
      if (layoutCheck.length > 0) {
        for (let mitem of layoutCheck) {
          Vue.set(state.initialGrid[inVerified.board], mitem, [])
          Vue.set(state.liveSpaceCoord[inVerified.board], mitem, [])
          Vue.set(state.liveSpaceCoord[inVerified.board], mitem, state.savedLayout.start[inVerified.board][mitem])
          Vue.set(state.initialGrid[inVerified.board], mitem, state.savedLayout.start[inVerified.board][mitem])
          state.ctx.miniMapSoloStartLoc(state.savedLayout.start[inVerified.board][mitem])
        }
      } else {
        let modHash = Object.keys(inVerified.position)
        let modCount = 1
        Vue.set(state.liveSpaceCoord, inVerified.board, {})
        Vue.set(state.initialGrid, inVerified.board, {})
        for (let mitem of modHash) {
          Vue.set(state.initialGrid[inVerified.board], mitem, [])
          Vue.set(state.liveSpaceCoord[inVerified.board], mitem, [])
          let positionTrack = state.ctx.startPositionCellspace(modCount, inVerified.position[mitem], { x: 200, y: 300 }, 'cell')
          modCount++
          Vue.set(state.liveSpaceCoord[inVerified.board], mitem, positionTrack)
          Vue.set(state.initialGrid[inVerified.board], mitem, positionTrack)
          state.ctx.miniMapSoloLocations(state.initialGrid[inVerified.board][mitem])
        }
      }
    },
    SET_SPACEPOSITIONSOLO_STATE: (state, inVerified) => {
      let positionTrack = state.ctx.startPositionSpace(inVerified.nxp, inVerified.coord, inVerified.type)
      Vue.set(state.liveSpaceCoord, inVerified.nxp, positionTrack)
      // update the minimap
      // state.ctx.miniMapSoloLocations(state.initialGrid[mitem])
    },
    SET_SPACEPOSITION_REFRESH: (state, inVerified) => {
      console.log(inVerified)
    },
    SET_ADDSOLOCELL_POSITION: (state, inVerified) => {
      let newCelladded = {}
      newCelladded.cell = {}
      newCelladded.cell.i = inVerified.mData.toString()
      newCelladded.x = 120
      newCelladded.y = 1900
      console.log('new cell to add')
      state.initialGrid[inVerified.nxpCNRL][inVerified.moduleCNRL].push(newCelladded)
    },
    SET_COPYSOLOCELL_POSITION: (state, inVerified) => {
      let newCelladded = {}
      newCelladded.cell = {}
      newCelladded.cell.i = inVerified.mData.toString()
      newCelladded.mod = inVerified.moduleCNRL
      newCelladded.x = 120
      newCelladded.y = 1900
      Vue.set(state.initialGrid[inVerified.nxpCNRL], inVerified.moduleCNRL, [])
      state.initialGrid[inVerified.nxpCNRL][inVerified.moduleCNRL].push(newCelladded)
    },
    SET_UPDATESOLOMMAP_POSITION: (state, inVerified) => {
      let updateCOORD = state.ctx.updateSoloMMapSpace(inVerified, state.initialGrid[inVerified.cell.board])
      state.initialGrid[inVerified.cell.board][inVerified.cell.moduleCNRL] = []
      Vue.set(state.initialGrid[inVerified.cell.board], inVerified.cell.moduleCNRL, updateCOORD)
      // need to update SOLO minimap
      let modHash = Object.keys(state.initialGrid[inVerified.cell.board])
      for (let mitem of modHash) {
        state.ctx.miniMapSoloLocations(state.initialGrid[inVerified.cell.board][mitem])
      }
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
    },
    SET_BOARD_MODULES: (state, inVerified) => {
      // console.log('board modules')
      // console.log(inVerified)
      state.boardModulesList = inVerified
    },
    SET_CLONE_SOLODATA: (state, inVerified) => {
      state.soloData = inVerified
    },
    SET_ADD_VISSPACE (state, inVerified) {
      // add to BentoSpace or SoloSpace?
      // console.log(this.state.solospace.soloState)
      // need unquie identifer for grid
      let random = Math.random()
      let deviceUUID = random.toString()
      // path for bentospace  path for soloSpace
      let spaceType = this.state.solospace.soloState.active
      if (spaceType === true) {
        let newCellNumber = 0
        // need to add new visualise module and give it unique compute contract or update to unqiue
        // identify base module to be cloned
        let modKeys = Object.keys(state.soloData)
        for (let modl of modKeys) {
          if (modl === inVerified.moduleCNRL) {
            let mItems = Object.keys(state.soloData[modl].data)
            for (let cell of mItems) {
              if (cell === inVerified.mData) {
                newCellNumber = parseInt(cell) + 0
                // give copy module UUID
                let copyMod = 'copy-' + modl
                // create new data holder and solospace holder
                let updateModuleInfo = inVerified
                updateModuleInfo.moduleCNRL = copyMod
                this.dispatch('actionCopycell', updateModuleInfo)
                state.boardModulesList[inVerified.nxpCNRL].push(copyMod)
                Vue.set(state.soloData, copyMod, {})
                Vue.set(state.soloData[copyMod], 'data', {})
                Vue.set(state.soloData[copyMod], 'prime', {})
                Vue.set(state.soloData[copyMod].data, newCellNumber, state.soloData[modl].data[cell])
                Vue.set(state.soloData[copyMod], 'prime', state.soloData[modl].prime)
                // set the progress bar info
                let setProgress = {}
                setProgress = { text: 'Updating visualisation', active: false }
                Vue.set(this.state.visProgress, copyMod, {})
                Vue.set(this.state.visProgress[copyMod], cell, setProgress)
                // set toolbars
                let setVisTools = {}
                setVisTools = { text: 'open tools', active: true }
                Vue.set(this.state.toolbarVisStatus, copyMod, {})
                Vue.set(this.state.toolbarVisStatus[copyMod], cell, setVisTools)
                // set the open data tools
                let setOPenDataToolbar = { text: 'open data', active: false }
                Vue.set(this.state.opendataTools, copyMod, {})
                Vue.set(this.state.opendataTools[copyMod], cell, setOPenDataToolbar)
              }
            }
          }
        }
        // update solo positionSpace store and solominiMap
        inVerified.mData = newCellNumber
        // this.dispatch('actionAddcell', inVerified, { root: true })
      } else {
        console.log('bentospace')
        let modG = inVerified.mData + deviceUUID.slice(2, 8)
        let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': modG, static: false }
        state.boardModulesList[inVerified.moduleCNRL].push(newGriditem)
        // set setting holder
        let visSettings =
        {
          devices: null,
          data: null,
          compute: null,
          visualise: null,
          category: [],
          timeperiod: null,
          xaxis: null,
          yaxis: [],
          resolution: null,
          setTimeFormat: null
        }
        Vue.set(this.state.visModuleHolder, modG, visSettings)
        // set toolbars
        let setVisTools = {}
        setVisTools = { text: 'open tools', active: true }
        Vue.set(this.state.toolbarVisStatus[inVerified.moduleCNRL], modG, setVisTools)
        // set the open data toolbar
        let setOPenDataToolbar = {}
        setOPenDataToolbar = { text: 'open data', active: false }
        Vue.set(this.state.opendataTools[inVerified.moduleCNRL], modG, setOPenDataToolbar)
        // set the data for the visualisation
        let repeatDataBundle = state.soloData[inVerified.moduleCNRL].data[inVerified.mData]
        Vue.set(state.soloData[inVerified.moduleCNRL].data, modG, repeatDataBundle)
        let contextPlacer = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': modG, 'data': repeatDataBundle }
        Vue.set(this.state.soloData[inVerified.moduleCNRL], 'prime', contextPlacer.prime)
        // set a placer for any subsequent updates
        let setProgress = {}
        setProgress = { text: 'Updating visualisation', active: false }
        Vue.set(this.state.visProgress[inVerified.moduleCNRL], modG, setProgress)
      }
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
    },
    actionSavedLayout (context, update) {
      context.commit('SET_SAVED_LAYOUT', update)
    },
    actionAddcell (context, update) {
      context.commit('SET_ADDSOLOCELL_POSITION', update)
    },
    actionCopycell (context, update) {
      context.commit('SET_COPYSOLOCELL_POSITION', update)
    },
    actionSoloModules (context, update) {
      context.commit('SET_BOARD_MODULES', update)
    },
    actionSoloBoardData (context, update) {
      context.commit('SET_CLONE_SOLODATA', update)
    },
    actionVisSpaceAdd (context, update) {
      context.commit('SET_ADD_VISSPACE', update)
    }
  }
}
