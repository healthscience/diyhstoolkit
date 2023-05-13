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
    dataFeedback: {},
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
    SET_SAVED_CONTEXT: (state, inVerified) => {
      Vue.set(state.savedLayout, 'context', inVerified)
    },
    SET_INITAL_CELLS (state, inVerified) {
      // check save location info?
      if (state.savedLayout.start) {
        if (state.savedLayout.start[inVerified.board] === undefined) {
          // first time setup solospace
          let modHash = Object.keys(inVerified.position)
          let modCount = 1
          Vue.set(state.liveSpaceCoord, inVerified.board, {})
          Vue.set(state.initialGrid, inVerified.board, {})
          for (let mitem of modHash) {
            Vue.set(state.initialGrid[inVerified.board], mitem, [])
            Vue.set(state.liveSpaceCoord[inVerified.board], mitem, [])
            // check mitem is string
            let positionTrack = state.ctx.startPositionCellspace(modCount, inVerified.position[mitem], { x: 200, y: 300 }, 'cell')
            modCount++
            Vue.set(state.liveSpaceCoord[inVerified.board], mitem, positionTrack)
            Vue.set(state.initialGrid[inVerified.board], mitem, positionTrack)
            state.ctx.miniMapSoloLocations(state.initialGrid[inVerified.board][mitem])
          }
        } else if (Object.keys(state.savedLayout.start[inVerified.board]).length === 0) {
          console.log('live but 2')
        } else {
          let arrA = Object.keys(inVerified.position)
          let arrB = Object.keys(state.savedLayout.start[inVerified.board])
          // compare what data is already here ie module data and what to ask for starting layout?
          let differenceStart = arrA.filter(x => !arrB.includes(x)).concat(arrB.filter(x => !arrA.includes(x)))
          // match to the saved compute context
          let matchContext = []
          for (let saveContext of state.savedLayout.context) {
            for (let dif of differenceStart) {
              if (saveContext.mod === dif) {
                matchContext.push(saveContext)
              }
            }
          }
          // ask HOP for data
          let soloNeededMod = {}
          soloNeededMod.board = inVerified.board
          soloNeededMod.modules = differenceStart
          soloNeededMod.context = matchContext
          this.dispatch('actionStartLayout', soloNeededMod, { root: true })
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
      let newCelladded = {}
      newCelladded.cell = {}
      newCelladded.cell.i = inVerified.mData.toString()
      newCelladded.x = 120
      newCelladded.y = 1900
      state.initialGrid[inVerified.nxpCNRL][inVerified.moduleCNRL].push(newCelladded)
    },
    SET_COPYSOLOCELL_POSITION: (state, inVerified) => {
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
    SET_STARTSOLO_ZOOM: (state, inVerified) => {
      state.soloZoom = inVerified
    },
    SET_SOLOZOOM_MAP: (state, inVerified) => {
      let updateZoom = state.ctx.setZoom(state.soloZoom, inVerified)
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
    SET_DATA_FEEDBACK (state, inVerified) {
      Vue.set(state.dataFeedback, inVerified.context.input.outhash, inVerified.data)
      // turn off progress message
      let progressDetail = {}
      progressDetail.module = inVerified.context.input.outhash
      progressDetail.device = '3'
      this.dispatch('actionCellFeedbackUpdate', progressDetail, { root: true })
    },
    SET_CLEAR_FEEDBACK (state, inVerified) {
      Vue.set(state.dataFeedback, inVerified, '')
    },
    SET_ADD_SOLOSPACE (state, inVerified) {
      // need unquie identifer for grid
      let random = Math.random()
      let deviceUUID = random.toString()
      // path for bentospace  path for soloSpace
      let spaceType = this.state.solospace.soloState.active
      if (spaceType === true) {
        let newCellNumber = 0
        // set the compHolder for date
        this.dispatch('actionSetCompHolder', inVerified, { root: true })
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
                // add copy as property of device and add as array
                state.boardModulesList[inVerified.nxpCNRL].push(copyMod)
                state.copyModuleList.push(copyMod)
                Vue.set(state.soloData, copyMod, {})
                Vue.set(state.dataFeedback, copyMod, { message: 'copied' })
                /* let soloCopyData = {}
                soloCopyData.data = state.soloData[modl].data[cell]
                Vue.set(state.soloData[copyMod]['data'][inVerified.mData], 'copy', soloCopyData)
                console.log('copy added')
                console.log(state.soloData) */
                // add copy as property of device object
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
      state.trackOut.push(inVerified)
    },
    SET_REMOVETRACK_OUT: (state, inVerified) => {
      let indexRem = state.trackOut.filter((el) => el.moduleCNRL !== inVerified.moduleCNRL)
      state.trackOut = indexRem
    },
    SET_COPY_UPDATE (state, inVerified) {
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
        matchOutBack = inVerified.context
        let updateModuleInfo = matchOutBack // inVerified
        // temp use outhash as module UUiD or use device and expand to array and loop over
        let copyMod = inVerified.context.input.outhash
        updateModuleInfo.moduleCNRL = copyMod
        // add to solospace holder
        // Vue.set(state.soloData, copyMod, {})
        // Vue.set(state.soloData[copyMod], 'data', [])
        // Vue.set(state.soloData[copyMod], 'prime', {})
        Vue.set(state.soloData[copyMod].data, matchOutBack.mData, inVerified.data)
        // state.soloData[copyMod].data.push(inVerified.data)
        let contextPlacer = { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }
        Vue.set(state.soloData[copyMod], 'prime', contextPlacer)
        // set the progress bar info
        let setProgress = {}
        setProgress = { text: 'Updating visualisation', active: false }
        // Vue.set(this.state.visProgress, copyMod, {})
        Vue.set(this.state.visProgress[copyMod], matchOutBack.mData, setProgress)
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
        state.liveCopy = matchOutBack.moduleCNRL
        state.liveTempOuthash = inVerified.context.input.outhash
        // is the match a copy or existing cell?
        let stringCopycheck = matchOutBack.moduleCNRL.slice(0, 4)
        if (stringCopycheck === 'copy') {
          // remove from module list
          let updateListmods = []
          for (let mli of state.boardModulesList[matchOutBack.nxpCNRL]) {
            if (mli !== matchOutBack.moduleCNRL) {
              updateListmods.push(mli)
            } else {
              console.log('match')
            }
          }
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
          // format will be vis modules key - compute module key (note the compute key is unique not generic for board i.e. link compute module contract this gurantees uniqueness and how enough info to retrieve from library)
          let copyMod = inVerified.context.moduleorder.visualise.key + '-' + inVerified.data.context.hash // use dataPrint for now inVerified.context.moduleorder.compute.key // inVerified.context.input.outhash
          updateModuleInfo.moduleCNRL = copyMod
          if (inVerified.context.moduleorder.compute.value.type === 'compute') { // contract or value  is consistent?
            // compModuleHolder
            console.log('----2---compute back set date update')
            // remove the copy compModuleHolder
            Vue.delete(this.state.compModuleHolder, 'copy-' + inVerified.context.moduleorder.visualise.key)
            let startCompControls = {}
            startCompControls.date = inVerified.context.moduleorder.compute.value.info.controls.date
            // set to vis module ID and device ID
            let liveDevice = inVerified.data.context.triplet.device
            let modUpdate = this.state.compModuleHolder[inVerified.context.moduleorder.visualise.key]
            modUpdate[liveDevice] = startCompControls
            Vue.set(this.state.compModuleHolder, copyMod, {})
            Vue.set(this.state.compModuleHolder, copyMod, modUpdate)
          }
          // add to solospace holder
          Vue.set(state.soloData, copyMod, {})
          Vue.set(state.soloData[copyMod], 'data', [])
          Vue.set(state.soloData[copyMod], 'prime', {})
          Vue.set(state.soloData[copyMod].data, matchOutBack.mData, inVerified.data)
          // state.soloData[copyMod].data.push(inVerified.data)
          let contextPlacer = { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }
          Vue.set(state.soloData[copyMod], 'prime', contextPlacer)
          // set the progress bar info
          let setProgress = {}
          setProgress = { text: 'Updating visualisation', active: false }
          Vue.set(this.state.visProgress, copyMod, {})
          Vue.set(this.state.visProgress[copyMod], matchOutBack.mData, setProgress)
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
          console.log('solo2--B')
          let updateModuleInfo = matchOutBack // inVerified
          // temp use outhash as module UUiD or use device and expand to array and loop over
          let copyMod = inVerified.context.input.outhash
          updateModuleInfo.moduleCNRL = copyMod
          // add to solospace holder
          // Vue.set(state.soloData, copyMod, {})
          // Vue.set(state.soloData[copyMod], 'data', [])
          // Vue.set(state.soloData[copyMod], 'prime', {})
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
    },
    SET_CELL_UPDATE (state, inVerified) {
      // cell update could be first or upate?
      // console.log('cell update')
      // console.log(inVerified)
      let modVis = inVerified.context.input.outhash
      if (inVerified.context.moduleorder.compute.value.type === 'compute') { // contract or value  is consistent?
        // compModuleHolder
        let startCompControls = {}
        startCompControls.date = inVerified.context.moduleorder.compute.value.info.controls.date
        // set to vis module ID and device ID
        let liveDevice = inVerified.data.context.triplet.device
        let modUpdate = {} // this.state.compModuleHolder[inVerified.context.moduleorder.visualise.key]
        modUpdate[liveDevice] = startCompControls
        // does the solo cell already exist?
        if (this.state.compModuleHolder[modVis] === undefined) {
          Vue.set(this.state.compModuleHolder, modVis, {})
          Vue.set(state.soloData, modVis, {})
          Vue.set(state.soloData[modVis], 'data', {})
          // add module to dispaly list
          state.boardModulesList[inVerified.context.input.key].push(modVis)
        }
        Vue.set(this.state.compModuleHolder, modVis, modUpdate)
      }
      // update data
      console.log('update data')
      console.log(inVerified.data)
      Vue.set(state.soloData[modVis].data, inVerified.data.context.triplet.device, inVerified.data)
      // state.soloData[copyMod].data.push(inVerified.data)
      let contextPlacer = { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }
      Vue.set(state.soloData[modVis], 'prime', contextPlacer)
      // set the progress bar info
      let setProgress = {}
      setProgress = { text: 'Updating visualisation', active: false }
      Vue.set(this.state.visProgress, modVis, {})
      Vue.set(this.state.visProgress[modVis], inVerified.data.context.triplet.device, setProgress)
      // console.log(this.state.visProgress)
      // set toolbars
      let setVisTools = {}
      setVisTools = { text: 'open tools', active: true }
      Vue.set(this.state.toolbarVisStatus, modVis, {})
      Vue.set(this.state.toolbarVisStatus[modVis], inVerified.data.context.triplet.device, setVisTools)
      // set the open data tools
      let setOPenDataToolbar = { text: 'open data', active: false }
      Vue.set(this.state.opendataTools, modVis, {})
      Vue.set(this.state.opendataTools[modVis], inVerified.data.context.triplet.device, setOPenDataToolbar)
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
    actionSavedContext (context, update) {
      context.commit('SET_SAVED_CONTEXT', update)
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
    actionOuthashRemove (context, update) {
      context.commit('SET_REMOVETRACK_OUT', update)
    },
    actionUpdateCopy (context, update) {
      context.commit('SET_COPY_UPDATE', update)
    },
    actionUpdateCell (context, update) {
      context.commit('SET_CELL_UPDATE', update)
    },
    actionSavedSoloZoom (context, update) {
      context.commit('SET_STARTSOLO_ZOOM', update)
    },
    actionSoloScalewheel (context, update) {
      context.commit('SET_SOLOZOOM_MAP', update)
    },
    actionSoloZoomscale (context, update) {
      context.commit('SET_SOLOSCALE_MOUSE', update)
    },
    actionDataFeedback (context, update) {
      context.commit('SET_DATA_FEEDBACK', update)
    },
    actionClearCellFeedback (context, update) {
      context.commit('SET_CLEAR_FEEDBACK', update)
    }
  }
}
