'use strict'
/**
*  toolkit Utilitiy functions
*
*
* @class ToolkitUtility
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var ToolkitUtility = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ToolkitUtility, events.EventEmitter)

/**
* Prepare table list view of experiments joined
* @method prepareJoinedNXPlist
*
*/
ToolkitUtility.prototype.prepareJoinedNXPlist = function (peerExpModules) {
  let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
  let gridDatapeer = this.prepareExperimentSummary(peerExpModules)
  let gridPeer = {}
  gridPeer.columns = gridColumns
  gridPeer.data = gridDatapeer
  return gridPeer
}

/**
* Prepare experiment data list
* @method prepareExperimentSummary
*
*/
ToolkitUtility.prototype.prepareExperimentSummary = function (peerExpModules) {
  let gridDatapeer = []
  let question2 = {}
  for (let nxp of peerExpModules) {
    // look up question
    for (const mod of nxp.modules) {
      if (typeof mod.value.info === 'object' && Object.keys(mod.value.info).length > 0) {
        if (mod.value.info.type === 'question') {
          question2 = mod.value.info.question
        } else {
          question2 = 'none'
        }
      }
    }
    gridDatapeer.push({ id: nxp.exp.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'View' })
  }
  return gridDatapeer
}

/**
* Prepare experiment data list
* @method prepareExperimentSummarySingle
*
*/
ToolkitUtility.prototype.prepareExperimentSummarySingle = function (peerExpModules) {
  console.log(peerExpModules)
  let gridDatapeer = {}
  let question2 = {}
  for (const mod of peerExpModules.modules) {
    console.log(mod)
    if (typeof mod.value.info === 'object' && Object.keys(mod.value.info).length > 0) {
      if (mod.value.info.type === 'question') {
        question2 = mod.value.info.question
      } else {
        question2 = 'none'
      }
    }
  }
  gridDatapeer = { id: peerExpModules.exp.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'View' }
  return gridDatapeer
}

/**
* Prepare experiment data list
* @method prepareExperimentSummarySingleGenesis
*
*/
ToolkitUtility.prototype.prepareExperimentSummarySingleGenesis = function (peerExpModules) {
  let gridDatapeer = {}
  let question2 = {}
  for (const mod of peerExpModules.modules) {
    if (typeof mod.value.info === 'object' && Object.keys(mod.value.info).length > 0) {
      if (mod.value.info.moduleinfo.name === 'question') {
        question2 = mod.value.info.question
      } else {
        question2 = 'none'
      }
    }
  }
  gridDatapeer = { id: peerExpModules.exp.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'Preview/ Join' }
  return gridDatapeer
}

/**
* Prepare table list view of experiments
* @method prepareAnnonNXPlist
*
*/
ToolkitUtility.prototype.prepareAnnonNXPlist = function (peerExpModules) {
  let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
  let gridData = []
  let question = {}
  for (let nxp of peerExpModules) {
    // look up question
    for (const mod of nxp.modules) {
      if (mod.value.info.moduleinfo.name === 'question') {
        question = mod.value.info.question
      }
    }
    gridData.push({ id: nxp.exp.key, name: question.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'Preview / Join' })
  }
  let gridAnnon = {}
  gridAnnon.columns = gridColumns
  gridAnnon.data = gridData
  return gridAnnon
}

/**
* Check if ref contract is in toolkit if not ask network library via peerlink
* @method refcontractLookup
*
*/
ToolkitUtility.prototype.refcontractLookup = function (refCont, allContracts) {
  let matchKey = {}
  for (const rc of allContracts) {
    if (refCont.trim() === rc.key) {
      matchKey = rc
    }
  }
  return matchKey
}

/**
* prepare grid layout for display and set data ids and data for visualisation e.g. charts etc.
* @method diplayFilter
*
*/
ToolkitUtility.prototype.displayFilter = function (modules, entityData) {
  console.log('DISPLAYflitttter')
  // console.log(shellID)
  // console.log(modules)
  // console.log(time)
  // console.log(entityData)
  let testDataBundle = {}
  let gridPerModule = {}
  let moduleObject = {}
  for (let mod of modules) {
    // need to match each modules to Component Data
    if (mod.value.type === 'question') {
      moduleObject.question = mod.key
      let qgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: true }]
      gridPerModule[mod.key] = qgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-plain', 'text': 'Question', 'active': true }, 'grid': qgrid, 'data': [{ 'form': 'html' }, { 'content': 'Movement Summary' }], 'message': 'compute-complete' }
    } else if (mod.value.type === 'device') {
      moduleObject.device = mod.key
      let dgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }]
      gridPerModule[mod.key] = dgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': dgrid, 'data': entityData.liveDeviceC.devices, 'message': 'compute-complete' }
    } else if (mod.value.type === 'dapp') {
      moduleObject.dapp = mod.key
      let ddgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }]
      gridPerModule[mod.key] = ddgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-dapp', 'text': 'Dapp', 'active': true }, 'grid': ddgrid, 'data': [{ 'content': 'Gadgetbridge android' }, { 'content2': 'Xdrip android' }], 'message': 'compute-complete' }
    } else if (mod.value.type === 'data') {
      moduleObject.data = mod.key
      moduleObject.packaging = mod.value.info.data.key
    } else if (mod.value.type === 'compute') {
      moduleObject.compute = mod.key
      moduleObject.computerefcont = mod.value.info.compute.key
      let cgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }]
      gridPerModule[mod.key] = cgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-compute', 'text': 'Compute', 'active': true }, 'grid': cgrid, 'message': 'compute-complete' }
    } else if (mod.value.type === 'Errors') {
      // gridPerModule[mod.cnrl] = mod.grid
      // [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} }], '1': { 'chartPackage': { 'labels': [2, 4] }, { 'datasets': [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} } }, 'message': 'compute-complete'
    } else if (mod.value.type === 'visualise') {
      moduleObject.visualise = mod.key
      // loop over data vis read
      mod.grid = []
      let makeGrid = []
      // let dataIndex = Object.keys(entityData.liveVisualC.visualData)
      if (entityData.liveVisualC.singlemulti.chartPackage) {
        // single chart multi datasets
        let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': 'singlemulti', static: false }
        makeGrid.push(newGriditem)
        // gridPerModule = {}
        gridPerModule[mod.key] = makeGrid
        testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': { 'singlemulti': entityData.liveVisualC.singlemulti } }
      } else {
        // normal display indivduals charts
        let devicesList = Object.keys(entityData.liveVisualC.liveVislist)
        for (let dl of devicesList) {
          for (let dr of entityData.liveVisualC.liveVislist[dl]) {
            // need to add to grid for multi charts asked for
            // structre for new grid item  { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': 'cnrl-8856388711', static: false }
            let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': dr, static: false }
            makeGrid.push(newGriditem)
          }
        }
        // gridPerModule = {}
        gridPerModule[mod.key] = makeGrid
        testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': entityData.liveVisualC.visualData }
      }
    }
  }
  let displayData = {}
  displayData.modules = moduleObject
  displayData.grid = gridPerModule
  displayData.data = testDataBundle
  return displayData
}

/**
* prepare grid layout for display and set data ids and data for visualisation e.g. charts etc.
* @method diplayFilter
*
*/
ToolkitUtility.prototype.displayUpdate = function (liveData, entityData) {
  // setup return vis Object
  console.log('update Visual data start')
  let moduleKeys = Object.keys(liveData)
  let updateVisData = {}
  // loop over the modules in the NXP and match to compute and update data
  for (let mod of moduleKeys) {
    if (liveData[mod].prime.text === 'Visualise') {
      updateVisData.update = entityData.visualData
      updateVisData.module = mod
      // }
    }
  }
  // make new grid
  let updateGrid = []
  // make updated tools settings
  let setOpendata = {}
  let setVistoolbar = {}
  let devicesList = Object.keys(entityData.liveVislist)
  for (let dl of devicesList) {
    // nB temp measure
    let unique = Array.from(new Set(entityData.liveVislist[dl]))
    for (let dr of unique) {
      let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': dr, static: false }
      updateGrid.push(newGriditem)
      setOpendata[dr] = { text: 'open data', active: false }
      setVistoolbar[dr] = { text: 'open tools', active: true }
    }
  }
  updateVisData.grid = updateGrid
  updateVisData.vistoolbar = setVistoolbar
  updateVisData.opendata = setOpendata
  return updateVisData
}

/**
* prepare multi datasets one chart
* @method displayUpdateSingle
*
*/
ToolkitUtility.prototype.displayUpdateSingle = function (liveData, entityData) {
  let singleBundle = {}
  let moduleKeys = Object.keys(liveData)
  // loop over the modules in the NXP and match to compute and update data
  for (let mod of moduleKeys) {
    if (liveData[mod].prime.text === 'Visualise') {
      let dataMerge = {}
      dataMerge.data = this.mergeDataSets(entityData.visualData)
      singleBundle.update = dataMerge
      singleBundle.module = mod
      singleBundle.identifier = Object.keys(liveData[mod].data)
    }
  }
  return singleBundle
}

/**
* take a list of data and make the one for chartint
* @method mergeDataSets
*
*/
ToolkitUtility.prototype.mergeDataSets = function (liveData) {
  let chartOptions = {}
  let singleData = {}
  // how many data sets to merge?
  let listDataLength = Object.keys(liveData)
  // split out data and labels and update colors
  let dataY = []
  let dataX = []
  let count = 0
  for (let dui of listDataLength) {
    if (count === 0) {
      chartOptions = liveData[dui].data.chartOptions
      console.log('first data item')
      dataY.push(liveData[dui].data.chartPackage.datasets[0])
      dataX.push(liveData[dui].data.chartPackage.labels)
    } else {
      console.log('need tupdate colors settings')
      let colorUpdate = this.setColourDataset(liveData[dui].data.chartPackage.datasets[0])
      dataY.push(colorUpdate)
      dataX.push(liveData[dui].data.chartPackage.labels)
    }
  }
  let updateChartOptions = {}
  updateChartOptions = chartOptions
  updateChartOptions.title = 'two dts'
  // need to merge x axis time list to single array
  let flatten = dataX[0].concat(dataX[1])
  let unique = flatten.filter((v, i, a) => a.indexOf(v) === i)
  let updatePackage = {}
  updatePackage.datasets = dataY
  updatePackage.labels = unique
  singleData.chartPackage = updatePackage
  singleData.chartOptions = updateChartOptions
  return singleData
}

/**
*  allocate new color to each dataset
* @method setColourDataset
*
*/
ToolkitUtility.prototype.setColourDataset = function (dataSet) {
  let colourUpdated = dataSet
  let newColour = this.colourList()
  colourUpdated.borderColor = newColour
  colourUpdated.fillColor = newColour
  return colourUpdated
}

/**
*  list of chart colours
* @method colourList
*
*/
ToolkitUtility.prototype.colourList = function () {
  let colourRGB = ['rgb(255, 99, 132)', 'rgb(181, 212, 234)', 'rgb(45, 119, 175 )', 'rgb(90, 45, 175)', 'rgb(41, 20, 80)', 'rgb(46, 143, 22)', 'rgb(21, 81, 7)', 'rgb(153, 18, 186)']
  let max = 6
  let min = 0
  let colorNumber = Math.floor(Math.random() * (max - min + 1)) + min
  let selectColour = colourRGB[colorNumber]
  return selectColour
}

/**
* givin input time and context work work current time data request
* @method prepareTime
*
*/
ToolkitUtility.prototype.prepareTime = function (timeIN, update) {
  // console.log('PREPARE timmmmee')
  // console.log(timeIN)
  // console.log(update)
  let newStartTime = []
  if (timeIN === 0) {
    let freshStart = Date.now() + update.startperiodchange
    newStartTime.push(freshStart)
  } else {
    // time state available
    if (update.startperiod !== 0 && update.rangechange.length === 0) {
      // console.log('update starp0 but range above 1')
      newStartTime.push(update.startperiod)
    } else if (update.rangechange.length > 0) {
      // console.log('chage range above zero')
      newStartTime = update.rangechange
      // mmod.value.info.settings.timeseg = update.startperiodchange
    } else if (update.startperiod === 0 && update.startperiodchange) {
      // console.log('update starp0 but range above 1')
      // console.log(timeIN)
      let timeCon = new Date(timeIN)
      // console.log(timeCon)
      // console.log(timeCon.getTime())
      let convertTime = timeCon.getTime()
      let updateT = parseInt(convertTime) + update.startperiodchange
      newStartTime.push(updateT)
      // mmod.value.info.settings.timeseg = update.startperiodchange
    } else {
      // console.log('elas all otehr opieons')
      let updateSum = parseInt(timeIN) + update.startperiodchange
      newStartTime.push(updateSum)
      // mmod.value.info.settings.timeseg = update.startperiodchange
    }
  }
  return newStartTime
}

export default ToolkitUtility
