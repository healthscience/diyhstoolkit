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
  let gridDatapeer = {}
  let question2 = {}
  for (const mod of peerExpModules.modules) {
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
  let contractKey = ''
  let objectTest = typeof refCont
  if (objectTest === 'object') {
    contractKey = refCont.key
  } else {
    contractKey = refCont
  }
  let matchKey = {}
  for (const rc of allContracts) {
    if (contractKey.trim() === rc.key) {
      matchKey = rc
    }
  }
  return matchKey
}

/**
* prepare grid layout for display per module type.
* @method displayModules
*
*/
ToolkitUtility.prototype.displayModules = function (modules, entityData) {
  console.log('DISPLAYmodulesPrepare---')
  // console.log(modules)
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
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': dgrid, 'data': entityData.devices, 'message': 'compute-complete' }
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
      gridPerModule[mod.key] = cgrid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-compute', 'text': 'Compute', 'active': true }, 'grid': cgrid, 'message': 'compute-complete' }
    } else if (mod.value.type === 'Errors') {
      // gridPerModule[mod.cnrl] = mod.grid
      // [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} }], '1': { 'chartPackage': { 'labels': [2, 4] }, { 'datasets': [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} } }, 'message': 'compute-complete'
    } else if (mod.value.type === 'visualise') {
      moduleObject.visualise = mod.key
      // loop over data vis read
      mod.grid = []
      let makeGrid = []
      // what to chart, device, datatypes, time  or what combinations?
      for (let dl of entityData.devices) {
        if (entityData.data.liveVislist[dl.device_mac]) {
          for (let dr of entityData.data.liveVislist[dl.device_mac]) {
            // need to add to grid for multi charts asked for
            // structre for new grid item  { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': 'cnrl-8856388711', static: false }
            let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': dr, static: false }
            makeGrid.push(newGriditem)
          }
        } else {
          console.log('no data for that device')
        }
        // gridPerModule = {}
        gridPerModule[mod.key] = makeGrid
        testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': entityData.data.visualData }
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
* extract out module make objects
* @method matchExpModulesDetail
*
*/
ToolkitUtility.prototype.matchExpModulesDetail = function (expContract, allContract) {
  let matchContract = {}
  for (let rcontract of allContract) {
    if (expContract === rcontract.exp.key) {
      matchContract = rcontract
    }
  }
  return matchContract
}

/**
* extract type of module
* @method matchModuleType
*
*/
ToolkitUtility.prototype.matchModuleType = function (mType, modules) {
  let matchContract = {}
  for (let mod of modules) {
    if (mType === mod.value.type) {
      matchContract = mod
    }
  }
  return matchContract
}

/**
* prepare multi datasets one chart
* @method displayUpdateSingle
*
*/
ToolkitUtility.prototype.displayUpdateSpaceSingle = function (liveData, entityData) {
  let singleBundle = {}
  let moduleKeys = Object.keys(liveData)
  // loop over the modules in the NXP and match to compute and update data
  for (let mod of moduleKeys) {
    if (liveData[mod].prime.text === 'Visualise') {
      // single chart per device by now if two or more Datatypes merge
      let dataMerge = {}
      dataMerge.data = this.mergeDataSets(entityData.visualData, false)
      singleBundle.update = dataMerge
      singleBundle.module = mod
      singleBundle.identifier = Object.keys(liveData[mod].data)
    }
  }
  return singleBundle
}

/**
* prepare grid layout for display and set data ids and data for visualisation e.g. charts etc.
* @method diplayFilter
*
*/
ToolkitUtility.prototype.displaySpaceUpdate = function (liveData, entityData) {
  // setup return vis Object
  console.log('TKU##spaceupdate')
  let moduleKeys = Object.keys(liveData)
  let updateVisData = {}
  // loop over the modules in the NXP and match to compute and update data
  for (let mod of moduleKeys) {
    if (liveData[mod].prime.text === 'Visualise') {
      updateVisData.update = entityData.visualData
      updateVisData.module = mod
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
      setVistoolbar[dr] = { text: 'open tools', active: true }
      setOpendata[dr] = { text: 'open data', active: false }
    }
  }
  updateVisData.grid = updateGrid
  updateVisData.vistoolbar = setVistoolbar
  updateVisData.opendata = setOpendata
  console.log('data strcture')
  console.log(updateVisData)
  return updateVisData
}

/**
* prepare grid layout for many device space  many data types in single chart.
* @method displayManySpaceUpdate
*
*/
ToolkitUtility.prototype.displayManySpaceUpdate = function (liveData, entityData, matchModeType, updateComputeContract) {
  // setup return vis Object
  console.log('TKU##many devices many dts single chart')
  console.log(updateComputeContract)
  let moduleKeys = Object.keys(liveData)
  let updateVisData = {}
  // loop over the modules in the NXP and match to compute and update data
  for (let mod of moduleKeys) {
    console.log(liveData[mod].prime.text)
    if (liveData[mod].prime.text === 'Visualise') {
      updateVisData.module = mod
    }
  }
  // pair device data to time range groupings
  console.log(matchModeType)
  let devicesList = Object.keys(entityData.liveVislist)
  // split into device data groupings
  let deviceMatch = {}
  // let keyMatch = {}
  let dataMerged = {}
  let dataKeys = Object.keys(entityData.visualData)
  for (let dd of devicesList) {
    for (let dk of dataKeys) {
      if (entityData.visualData[dk].context.device === dd) {
        deviceMatch[dk] = entityData.visualData[dk]
        // keyMatch
      } else {
        console.log('no device match')
      }
      /* for () {
        if (entityData.visualData[dk].context.time === dd) {
          timeMatch[dk] =
        } else {

        }
      } */
    }
    dataMerged[dd] = this.mergeDataSets(deviceMatch, updateComputeContract)
    deviceMatch = {}
  }
  // now build data structure for display
  // structure require  key (uuit of data hash)  .context  .data chartData Chart Options
  let dataDisplayStructure = {}
  // for ()
  // make new grid
  let updateGrid = []
  // make updated tools settings
  let setOpendata = {}
  let setVistoolbar = {}
  for (let dl of devicesList) {
    // nB temp measure
    let unique = Array.from(new Set(entityData.liveVislist[dl]))
    dataDisplayStructure[unique[0]] = {}
    dataDisplayStructure[unique[0]].data = dataMerged[dl]
    let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': unique[0], static: false }
    updateGrid.push(newGriditem)
    setOpendata[unique[0]] = { text: 'open data', active: false }
    setVistoolbar[unique[0]] = { text: 'open tools', active: true }
  }
  updateVisData.update = dataDisplayStructure
  updateVisData.grid = updateGrid
  updateVisData.vistoolbar = setVistoolbar
  updateVisData.opendata = setOpendata
  return updateVisData
}

/**
* take a list of data and make the one for chartint
* @method mergeDataSets
*
*/
ToolkitUtility.prototype.mergeDataSets = function (liveData, computeModule) {
  console.log('merage data sets')
  console.log(liveData)
  console.log(computeModule)
  let chartOptions = {}
  let singleData = {}
  // how many data sets to merge?
  let listDataLength = Object.keys(liveData)
  // split out data and labels and update colors
  let dataPairs = {}
  let dataY = []
  let dataX = []
  let count = 0
  for (let dui of listDataLength) {
    if (count === 0) {
      chartOptions = liveData[dui].data.chartOptions
      dataY.push(liveData[dui].data.chartPackage.datasets[0])
      dataX.push(liveData[dui].data.chartPackage.labels)
      let tempPair = {}
      tempPair.dataset = dataY[0].data
      tempPair.labelset = dataX[0]
      dataPairs.first = tempPair
      count++
    } else if (count === 1) {
      // need to normalise data for length of longest timestamp ie fill in gaps
      let colorUpdate = this.setColourDataset(liveData[dui].data.chartPackage.datasets[0])
      dataY.push(colorUpdate)
      dataX.push(liveData[dui].data.chartPackage.labels)
      let tempPair = {}
      tempPair.dataset = dataY[1].data
      tempPair.labelset = dataX[1]
      dataPairs.second = tempPair
      count++
    } else if (count === 2) {
      // need to normalise data for length of longest timestamp ie fill in gaps
      let colorUpdate = this.setColourDataset(liveData[dui].data.chartPackage.datasets[0])
      dataY.push(colorUpdate)
      dataX.push(liveData[dui].data.chartPackage.labels)
      let tempPair = {}
      tempPair.dataset = dataY[1].data
      tempPair.labelset = dataX[1]
      dataPairs.third = tempPair
      count++
    } else if (count === 3) {
      // need to normalise data for length of longest timestamp ie fill in gaps
      let colorUpdate = this.setColourDataset(liveData[dui].data.chartPackage.datasets[0])
      dataY.push(colorUpdate)
      dataX.push(liveData[dui].data.chartPackage.labels)
      let tempPair = {}
      tempPair.dataset = dataY[1].data
      tempPair.labelset = dataX[1]
      dataPairs.forth = tempPair
      count++
    } else if (count === 4) {
      // need to normalise data for length of longest timestamp ie fill in gaps
      let colorUpdate = this.setColourDataset(liveData[dui].data.chartPackage.datasets[0])
      dataY.push(colorUpdate)
      dataX.push(liveData[dui].data.chartPackage.labels)
      let tempPair = {}
      tempPair.dataset = dataY[1].data
      tempPair.labelset = dataX[1]
      dataPairs.fifth = tempPair
      count++
    } else if (count === 5) {
      // need to normalise data for length of longest timestamp ie fill in gaps
      let colorUpdate = this.setColourDataset(liveData[dui].data.chartPackage.datasets[0])
      dataY.push(colorUpdate)
      dataX.push(liveData[dui].data.chartPackage.labels)
      let tempPair = {}
      tempPair.dataset = dataY[1].data
      tempPair.labelset = dataX[1]
      dataPairs.sixth = tempPair
      count++
    } else {
      // need to normalise data for length of longest timestamp ie fill in gaps
      let colorUpdate = this.setColourDataset(liveData[dui].data.chartPackage.datasets[0])
      dataY.push(colorUpdate)
      dataX.push(liveData[dui].data.chartPackage.labels)
      let tempPair = {}
      tempPair.dataset = dataY[1].data
      tempPair.labelset = dataX[1]
      dataPairs.seventh = tempPair
    }
  }
  // console.log(dataPairs)
  let updateChartOptions = {}
  updateChartOptions = chartOptions
  // need to merge x axis time list to single array
  let paddedData = this.timestampMatcher(dataPairs)
  dataY[0].data = paddedData[0]
  dataY[1].data = paddedData[1]
  //  is the time ie xaxis for one or more time periods?
  let flatten = []
  let unique = []
  if (typeof (computeModule.value.info.controls.date) !== 'object') {
    flatten = dataX[0].concat(dataX[1])
    unique = flatten.filter((v, i, a) => a.indexOf(v) === i)
  } else {
    // many time periods to normalise time
    console.log('many time peirods to normalise')
    unique = dataX[0]
  }
  let updatePackage = {}
  updatePackage.datasets = dataY
  updatePackage.labels = unique
  singleData.chartPackage = updatePackage
  singleData.chartOptions = updateChartOptions
  return singleData
}

/**
*  timestampMatcher padding to unify array data with nulls
* @method timestampMatcher
*
*/
ToolkitUtility.prototype.timestampMatcher = function (dataPairs) {
  console.log('timestampMatcher')
  console.log(dataPairs)
  let updateDatasets = []
  let matchList = []
  let count = 0
  for (let tsi of dataPairs.second.labelset) {
    // console.log(tsi)
    let include = dataPairs.first.labelset.includes(tsi)
    if (include === true) {
      // console.log(include)
      matchList.push(dataPairs.first.dataset[count])
      count++
    } else {
      // console.log('not included')
      matchList.push(null)
    }
  }
  updateDatasets.push(matchList)
  updateDatasets.push(dataPairs.second.dataset)
  return updateDatasets
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
  let colourRGB = ['rgb(255, 99, 132)', 'rgb(37, 56, 70)', 'rgb(45, 119, 175)', 'rgb(0, 100, 0)', 'rgb(41, 20, 80)', 'rgb(46, 143, 22)', 'rgb(38,15,187)', 'rgb(255, 20, 147)']
  let max = 5
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
  let newStartTime = []
  if (timeIN === 0) {
    let freshStart = Date.now() + update.startperiodchange
    newStartTime.push(freshStart)
  } else {
    // time state available
    if (update.startperiod !== 0 && update.rangechange.length === 0) {
      newStartTime.push(update.startperiod)
    } else if (update.rangechange.length > 0) {
      newStartTime = update.rangechange
    } else if (update.startperiod === 0 && update.startperiodchange) {
      let timeCon = new Date(timeIN)
      let convertTime = timeCon.getTime()
      let updateT = parseInt(convertTime) + update.startperiodchange
      newStartTime.push(updateT)
    } else {
      let updateSum = parseInt(timeIN) + update.startperiodchange
      newStartTime.push(updateSum)
    }
  }
  return newStartTime
}

export default ToolkitUtility
