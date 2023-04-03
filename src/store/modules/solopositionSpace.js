import Vue from 'vue'
import VisPositionUtility from '@/mixins/positionSoloUtility.js'
const PositionUtility = new VisPositionUtility()

export default {
  state: {
    boardid: '',
    liveSpaceCoord: {},
    c: {},
    ctx: PositionUtility,
    soloZoom: 1,
    spaceClick: true,
    minmapClick: false,
    mouseClickCount: 0,
    soloGrid: {},
    initialGrid: {},
    savedLayout: {},
    boardModulesList: [],
    copyModuleList: [],
    soloData: {},
    trackOut: [],
    liveCopy: '',
    liveTempOuthash: '',
    scaleMouse: false
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
      let layoutCheck = []
      if (state.savedLayout?.start !== undefined) {
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
        // first time setup solospace
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
      console.log('add cel++++++++++++++++++++++l')
      console.log(inVerified)
      let newCelladded = {}
      newCelladded.cell = {}
      newCelladded.cell.i = inVerified.mData.toString()
      newCelladded.x = 120
      newCelladded.y = 1900
      console.log('new cell to add')
      state.initialGrid[inVerified.nxpCNRL][inVerified.moduleCNRL].push(newCelladded)
    },
    SET_COPYSOLOCELL_POSITION: (state, inVerified) => {
      console.log('cell position set')
      console.log(inVerified)
      let removeCopy = inVerified.moduleCNRL.slice(5)
      // match to box to place near by
      let keysMods = Object.keys(state.initialGrid[inVerified.nxpCNRL])
      let positionOrigin = {}
      let deviceMatch = {}
      for (let keymo of keysMods) {
        if (keymo === removeCopy) {
          positionOrigin = state.initialGrid[inVerified.nxpCNRL][keymo]
          for (let posD of positionOrigin) {
            if (posD.cell.i === inVerified.mData) {
              deviceMatch = posD
            }
          }
        }
      }
      let newCelladded = {}
      newCelladded.cell = {}
      newCelladded.cell.i = inVerified.mData.toString()
      newCelladded.mod = inVerified.moduleCNRL
      newCelladded.x = deviceMatch.cell.x + 100
      newCelladded.y = deviceMatch.cell.y + 1000
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
    SET_SOLOSCALE_MOUSE: (state, inVerified) => {
      state.scaleMouse = !state.scaleMouse
    },
    SET_SOLOZOOM_MAP: (state, inVerified) => {
      let updateZoom = state.ctx.setZoom(inVerified)
      state.soloZoom = updateZoom
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
      state.boardModulesList = inVerified
    },
    SET_CLONE_SOLODATA: (state, inVerified) => {
      state.soloData = inVerified
    },
    SET_ADD_SOLOSPACE (state, inVerified) {
      // add to BentoSpace or SoloSpace?
      console.log('solospace add')
      console.log(inVerified)
      console.log(this.state.solospace.soloState)
      console.log(state.initialGrid)
      // need unquie identifer for grid
      let random = Math.random()
      let deviceUUID = random.toString()
      // path for bentospace  path for soloSpace
      let spaceType = this.state.solospace.soloState.active
      if (spaceType === true) {
        let newCellNumber = 0
        // need to add new visualise module and give it unique compute contract or update to unqiue
        // identify base module to be copied
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
                state.copyModuleList.push(copyMod)
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
    },
    SET_TRACK_OUT: (state, inVerified) => {
      console.log('tracked OUT')
      state.trackOut.push(inVerified)
    },
    SET_COPY_UPDATE (state, inVerified) {
      console.log('update copy with UUID+++++++++++++++++++')
      console.log(inVerified)
      console.log(state.initialGrid)
      // switch copy Module for now hash ID but keep all location info.
      // match outid to in ID
      let matchOutBack = {}
      for (let outMat of state.trackOut) {
        if (outMat.outhash === inVerified.context.input.outhash) {
          matchOutBack = outMat
        }
      }
      // check if establish cell
      let existingCheck = Object.keys(matchOutBack)
      if (existingCheck.length === 0) {
        console.log('existing')
        matchOutBack = inVerified.context
        console.log('Existing cell ---> update visualisation+++++++')
        let updateModuleInfo = matchOutBack // inVerified
        console.log(updateModuleInfo)
        // temp use outhash as module UUiD or use device and expand to array and loop over
        let copyMod = inVerified.context.input.outhash
        updateModuleInfo.moduleCNRL = copyMod
        // add to solospace holder
        // Vue.set(state.soloData, copyMod, {})
        // Vue.set(state.soloData[copyMod], 'data', [])
        // Vue.set(state.soloData[copyMod], 'prime', {})
        console.log(state.soloData)
        console.log(copyMod)
        console.log(matchOutBack.mData)
        console.log(inVerified.data)
        Vue.set(state.soloData[copyMod].data, matchOutBack.mData, inVerified.data)
        // state.soloData[copyMod].data.push(inVerified.data)
        let contextPlacer = { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }
        Vue.set(state.soloData[copyMod], 'prime', contextPlacer)
        // set the progress bar info
        let setProgress = {}
        setProgress = { text: 'Updating visualisation', active: false }
        // Vue.set(this.state.visProgress, copyMod, {})
        Vue.set(this.state.visProgress[copyMod], matchOutBack.mData, setProgress)
        // console.log(this.state.visProgress)
        // set toolbars
        let setVisTools = {}
        setVisTools = { text: 'open tools', active: true }
        // Vue.set(this.state.toolbarVisStatus, copyMod, {})
        Vue.set(this.state.toolbarVisStatus[copyMod], matchOutBack.mData, setVisTools)
        // set the open data tools
        let setOPenDataToolbar = { text: 'open data', active: false }
        // Vue.set(this.state.opendataTools, copyMod, {})
        Vue.set(this.state.opendataTools[copyMod], matchOutBack.mData, setOPenDataToolbar)
        // this.dispatch('actionCopycell', updateModuleInfo)
        let newCelladded = {}
        newCelladded.cell = {}
        newCelladded.cell.i = matchOutBack.mData.toString()
        newCelladded.mod = matchOutBack.moduleCNRL
        newCelladded.x = 120
        newCelladded.y = 1900
        // Vue.set(state.initialGrid[matchOutBack.nxpCNRL], matchOutBack.moduleCNRL, [])
        // state.initialGrid[matchOutBack.nxpCNRL][matchOutBack.moduleCNRL].push(newCelladded)
        // state.boardModulesList[matchOutBack.nxpCNRL].push(copyMod)
      } else {
        console.log('from COPYPCOPYCPYCPY')
        state.liveCopy = matchOutBack.moduleCNRL
        state.liveTempOuthash = inVerified.context.input.outhash
        // is the match a copy or existing cell?
        console.log(matchOutBack)
        let stringCopycheck = matchOutBack.moduleCNRL.slice(0, 4)
        if (stringCopycheck === 'copy') {
          // remove from module list
          let updateListmods = []
          for (let mli of state.boardModulesList[matchOutBack.nxpCNRL]) {
            console.log(mli)
            console.log(matchOutBack.moduleCNRL)
            if (mli !== matchOutBack.moduleCNRL) {
              updateListmods.push(mli)
            } else {
              console.log('match')
            }
          }
          console.log('list mouldes not match')
          console.log(updateListmods)
          state.boardModulesList[matchOutBack.nxpCNRL] = updateListmods
          let copyPostionLocation = state.initialGrid[matchOutBack.nxpCNRL][matchOutBack.moduleCNRL]
          // remove the copy
          Vue.delete(state.initialGrid[matchOutBack.nxpCNRL], matchOutBack.moduleCNRL)
          // remove frol soloData ie main data holder
          Vue.delete(state.soloData, matchOutBack.moduleCNRL)
          Vue.delete(this.state.NXPexperimentData[matchOutBack.nxpCNRL], matchOutBack.moduleCNRL)
          // delete from track list  TODO
          // now create new cell on solospace
          let updateModuleInfo = matchOutBack // inVerified
          // temp use outhash as module UUiD or use device and expand to array and loop over
          let copyMod = inVerified.context.input.outhash
          console.log(copyMod)
          updateModuleInfo.moduleCNRL = copyMod
          // add to solospace holder
          Vue.set(state.soloData, copyMod, {})
          Vue.set(state.soloData[copyMod], 'data', [])
          Vue.set(state.soloData[copyMod], 'prime', {})
          Vue.set(state.soloData[copyMod].data, matchOutBack.mData, inVerified.data)
          console.log(state.soloData)
          // state.soloData[copyMod].data.push(inVerified.data)
          let contextPlacer = { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }
          Vue.set(state.soloData[copyMod], 'prime', contextPlacer)
          // set the progress bar info
          let setProgress = {}
          setProgress = { text: 'Updating visualisation', active: false }
          Vue.set(this.state.visProgress, copyMod, {})
          Vue.set(this.state.visProgress[copyMod], matchOutBack.mData, setProgress)
          // console.log(this.state.visProgress)
          // set toolbars
          let setVisTools = {}
          setVisTools = { text: 'open tools', active: true }
          Vue.set(this.state.toolbarVisStatus, copyMod, {})
          Vue.set(this.state.toolbarVisStatus[copyMod], matchOutBack.mData, setVisTools)
          // set the open data tools
          let setOPenDataToolbar = { text: 'open data', active: false }
          Vue.set(this.state.opendataTools, copyMod, {})
          Vue.set(this.state.opendataTools[copyMod], matchOutBack.mData, setOPenDataToolbar)
          // this.dispatch('actionCopycell', updateModuleInfo)
          console.log('cell postion info')
          console.log(copyPostionLocation)
          console.log(state.initialGrid)
          let newCelladded = {}
          newCelladded.cell = {}
          newCelladded.cell.i = matchOutBack.mData.toString()
          newCelladded.mod = matchOutBack.moduleCNRL
          newCelladded.x = copyPostionLocation[0].x
          newCelladded.y = copyPostionLocation[0].y
          Vue.set(state.initialGrid[matchOutBack.nxpCNRL], matchOutBack.moduleCNRL, [])
          state.initialGrid[matchOutBack.nxpCNRL][matchOutBack.moduleCNRL].push(newCelladded)
          state.boardModulesList[matchOutBack.nxpCNRL].push(copyMod)
        } else {
          console.log('Existing cell ---> update visualisation+++++++')
          let updateModuleInfo = matchOutBack // inVerified
          console.log(updateModuleInfo)
          // temp use outhash as module UUiD or use device and expand to array and loop over
          let copyMod = inVerified.context.input.outhash
          updateModuleInfo.moduleCNRL = copyMod
          // add to solospace holder
          // Vue.set(state.soloData, copyMod, {})
          // Vue.set(state.soloData[copyMod], 'data', [])
          // Vue.set(state.soloData[copyMod], 'prime', {})
          console.log(state.soloData)
          console.log(copyMod)
          console.log(matchOutBack.mData)
          console.log(inVerified.data)
          Vue.set(state.soloData[copyMod].data, matchOutBack.mData, inVerified.data)
          // state.soloData[copyMod].data.push(inVerified.data)
          let contextPlacer = { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }
          Vue.set(state.soloData[copyMod], 'prime', contextPlacer)
          // set the progress bar info
          let setProgress = {}
          setProgress = { text: 'Updating visualisation', active: false }
          // Vue.set(this.state.visProgress, copyMod, {})
          Vue.set(this.state.visProgress[copyMod], matchOutBack.mData, setProgress)
          // console.log(this.state.visProgress)
          // set toolbars
          let setVisTools = {}
          setVisTools = { text: 'open tools', active: true }
          // Vue.set(this.state.toolbarVisStatus, copyMod, {})
          Vue.set(this.state.toolbarVisStatus[copyMod], matchOutBack.mData, setVisTools)
          // set the open data tools
          let setOPenDataToolbar = { text: 'open data', active: false }
          // Vue.set(this.state.opendataTools, copyMod, {})
          Vue.set(this.state.opendataTools[copyMod], matchOutBack.mData, setOPenDataToolbar)
          // this.dispatch('actionCopycell', updateModuleInfo)
          let newCelladded = {}
          newCelladded.cell = {}
          newCelladded.cell.i = matchOutBack.mData.toString()
          newCelladded.mod = matchOutBack.moduleCNRL
          newCelladded.x = 120
          newCelladded.y = 1900
          // Vue.set(state.initialGrid[matchOutBack.nxpCNRL], matchOutBack.moduleCNRL, [])
          // state.initialGrid[matchOutBack.nxpCNRL][matchOutBack.moduleCNRL].push(newCelladded)
          // state.boardModulesList[matchOutBack.nxpCNRL].push(copyMod)
        }
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
    actionSoloZoomset: (context, update) => {
      context.commit('SET_SOLOZOOM_MAP', update)
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
      context.commit('SET_ADD_SOLOSPACE', update)
    },
    actionOuthashTrack (context, update) {
      context.commit('SET_TRACK_OUT', update)
    },
    actionUpdateCopy (context, update) {
      context.commit('SET_COPY_UPDATE', update)
    },
    actionSoloScalewheel (context, update) {
      context.commit('SET_SOLOZOOM_MAP', update)
    },
    actionSoloZoomscale (context, update) {
      context.commit('SET_SOLOSCALE_MOUSE', update)
    }
  }
}
