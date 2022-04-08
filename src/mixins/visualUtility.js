'use strict'
/**
*  toolkit Utilitiy functions
*
*
* @class VisualUtility
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')
const moment = require('moment')

var VisualUtility = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(VisualUtility, events.EventEmitter)

/**
* prepare grid layout for display per module type.
* @method displayPrepareModules
*
*/
VisualUtility.prototype.displayPrepareModules = function (modules, entityData) {
  let testDataBundle = {}
  let gridPerModule = {}
  let moduleObject = {}
  for (let mod of modules) {
    // need to match each modules to Component Data
    if (mod.value.type === 'question') {
      moduleObject.question = mod.key
      let qgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: true }]
      gridPerModule[mod.key] = qgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-plain', 'text': 'Question', 'active': true }, 'grid': qgrid, 'data': [{ 'form': 'html' }, { 'content': mod.value.info.question.text }], 'message': 'compute-complete' }
    } else if (mod.value.type === 'device') {
      moduleObject.device = mod.key
      let dgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '2', static: false }]
      gridPerModule[mod.key] = dgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': dgrid, 'data': entityData.devices, 'message': 'compute-complete' }
    } else if (mod.value.type === 'dapp') {
      moduleObject.dapp = mod.key
      let ddgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }]
      gridPerModule[mod.key] = ddgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-dapp', 'text': 'Dapp', 'active': true }, 'grid': ddgrid, 'data': [{ 'content': 'Gadgetbridge android' }, { 'content2': 'Xdrip android' }], 'message': 'compute-complete' }
    } else if (mod.value.type === 'data') {
      // moduleObject.data = mod.key
      // moduleObject.packaging = mod.value.info.data.key
      let dgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '2', static: false }]
      gridPerModule[mod.key] = dgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': dgrid, 'data': entityData.devices, 'message': 'compute-complete' }
    } else if (mod.value.type === 'compute') {
      moduleObject.compute = mod.key
      moduleObject.computerefcont = mod.value.info.compute.key
      let cgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }]
      gridPerModule[mod.key] = cgrid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-compute', 'text': 'Compute', 'active': true }, 'grid': cgrid, 'data': [{ data: 'none' }], 'message': 'compute-complete' }
    } else if (mod.value.type === 'Errors') {
      // error management module
    } else if (mod.value.type === 'visualise') {
      moduleObject.visualise = mod.key
      // prepared a chart placer per device
      mod.grid = []
      let makeGrid = []
      let newGriditem = {}
      if (entityData.data !== 'none') {
        newGriditem = { 'x': 0, 'y': 0, 'w': 20, 'h': 14, 'i': entityData.data.context.triplet.device, static: false }
      } else {
        // but does a device exist? entityData.devices[0].device_mac
        if (entityData.devices.length > 0) {
          newGriditem = { 'x': 0, 'y': 0, 'w': 20, 'h': 14, 'i': entityData.devices[0].device_mac, static: false }
        } else {
          newGriditem = { 'x': 0, 'y': 0, 'w': 20, 'h': 14, 'i': 'none', static: false }
        }
      }
      makeGrid.push(newGriditem)
      let visDataHold = {}
      if (entityData.data !== 'none') {
        visDataHold[entityData.data.context.triplet.device] = entityData.data
        gridPerModule[mod.key] = makeGrid
        testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': visDataHold }
      } else {
        visDataHold = {}
        visDataHold[entityData.devices[0].device_mac] = {}
        gridPerModule[mod.key] = makeGrid
        testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': visDataHold }
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
* take the modules and put them in question, vis, compute, etc order.
* @method orderModules
*
*/
VisualUtility.prototype.orderModules = function (modulesGrid, peerContext) {
  let newDisplayOrder = []
  if (peerContext === 'public') {
    // first match for question
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'question') {
        newDisplayOrder.push(mod)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'visualise') {
        newDisplayOrder.push(mod)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'compute') {
        newDisplayOrder.push(mod)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'data') {
        newDisplayOrder.push(mod)
      }
    }
    // second match for visualisation
    // third match for compute
    // forth devices and then other modules as added
  } else if (peerContext === 'private') {
    // first match for question
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'question') {
        newDisplayOrder.push(mod)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'visualise') {
        newDisplayOrder.push(mod)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'compute') {
        newDisplayOrder.push(mod)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'data') {
        newDisplayOrder.push(mod)
      }
    }
    // second match for visualisation
    // third match for compute
    // forth devices and then other modules as added
  }
  return newDisplayOrder
}

/**
* grid already produce but new data added to visualisation.
* @method addVisData
*
*/
VisualUtility.prototype.addVisData = function (visModule, liveGrid, existingData, newData) {
  let gridUpdate = []
  let visPackageback = {}
  let addedVisData = {}
  // an existing device or new placer for vis placer require?
  let checkDevice = newData.data.context.triplet.device
  let existingGrid = liveGrid
  let placerAlready = []
  for (let gid of existingGrid) {
    placerAlready.push(gid.i)
  }
  let placerSet = placerAlready.includes(checkDevice)
  if (placerSet === false) {
    let newGriditem = { 'x': 0, 'y': 0, 'w': 20, 'h': 14, 'i': checkDevice, static: false }
    gridUpdate.push(newGriditem)
  }
  // add prime info context data placer
  let updateVisData = {} // this.mergeDataSets(existingData, newData.data)
  // update grid and chart data
  visPackageback.grid = gridUpdate
  visPackageback.data = updateVisData
  // vis
  addedVisData.module = visModule.key
  addedVisData.dataplace = null
  addedVisData.update = visPackageback
  return addedVisData
}

/**
* extract out module make objects
* @method matchExpModulesDetail
*
*/
VisualUtility.prototype.matchExpModulesDetail = function (expContract, allContract) {
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
VisualUtility.prototype.matchModuleType = function (mType, modules) {
  let matchContract = {}
  for (let mod of modules) {
    if (mType === mod.value.type) {
      matchContract = mod
    }
  }
  return matchContract
}

/**
*
* @method timeCheck
*
*/
VisualUtility.prototype.timeCheck = function (moduleDate) {
  let future = false
  if (moduleDate.isArray === true) {
    moduleDate = moduleDate[0]
  }
  if (moduleDate > moment().valueOf()) {
    future = true
  } else {
  }
  return future
}

/**
* take a list of data and make the one for chartint
* @method mergeDataSets
*
*/
VisualUtility.prototype.mergeDataSets = function (liveData, newData) {
  let deviceData = {}
  // let newDeviceadd = {}
  // data primary holder is device then context data dataPrint, need to match device to incoming data ie what device?
  // need to combined data sets and update colors and y-axis scaling side etc.
  // ie. split out data and labels and update colors
  // let assessInfo = {}
  // has this vis placer ie device had its options set?
  if (liveData.data[newData.context.triplet.device] === undefined) {
    let newPlacerData = this.addNewPlacerData(newData.context.triplet.device, liveData, newData)
    deviceData = {}
    deviceData = newPlacerData.data
  } else {
  }
  return deviceData
}

/**
*  add new placer device data to vis data structure for display
* @method addNewPlacerData
*
*/
VisualUtility.prototype.addNewPlacerData = function (device, liveData, newData) {
  let extractData = {}
  extractData.data = newData.data
  let newPlacerData = liveData
  newPlacerData.data[device] = extractData
  return newPlacerData
}

/**
*  assess data for order and length of x and y axis is normalisation requried?
* @method assessChartData
*
*/
VisualUtility.prototype.assessChartData = function (liveData, newData) {
  // assess the length of label i.e x axis length
  let assessedDataInfo = {}
  let existingLabel = liveData.chartPackage.labels.length
  // new data back from SF-ECS
  let newLabel = newData.chartPackage.labels.length
  if (existingLabel > newLabel) {
    // order OK
    // assessedDataInfo.first = liveData
    // assessedDataInfo.second = newData
    assessedDataInfo = liveData
  } else {
    // order needs reversed
    // assessedDataInfo.first = newData
    // assessedDataInfo.second = liveData
    assessedDataInfo = newData
  }
  return assessedDataInfo
}

/**
*  take in two data set labels ie xaxis time series and return one
* @method mergeLabelData
*
*/
VisualUtility.prototype.mergeLabelData = function (longLabel, liveData, newData) {
  //  is the time ie xaxis for one or more time periods?
  // based on whether new data set is long or shorter re do existing as neccessary
  let uniqueXaxis = []
  // for (let visDat of liveData.chartPackage.datase) {
  let flatten = [...longLabel.chartPackage.labels, ...newData.chartPackage.labels]
  uniqueXaxis.push(flatten.filter((v, i, a) => a.indexOf(v) === i))
  // }
  return uniqueXaxis
}

/**
*  timestampMatcher padding to unify array data with nulls
* @method timestampMatcher
*
*/
VisualUtility.prototype.timestampMatcher = function (mergedLabel, liveData, newData) {
  let paddedData = []
  // padd out each exising dataset y
  // check if dataset of right length if not padd the dataset
  let matchList = []
  let count = 0
  // check per existing datasets
  for (let vdata of liveData.chartPackage.datasets) {
    let newVisObject = vdata
    for (let tsi of mergedLabel[0]) {
      let include = liveData.chartPackage.labels.includes(tsi)
      if (include === true) {
        matchList.push(vdata.data[count])
        count++
      } else {
        matchList.push(null)
      }
    }
    count = 0
    newVisObject.data = matchList
    matchList = []
    paddedData.push(newVisObject)
  }
  // repeat for the new dataset
  // check if dataset of right length if not padd the dataset
  let newVisObject = newData.chartPackage.datasets[0]
  let newMatchList = []
  let countTwo = 0
  for (let tsi of mergedLabel[0]) {
    let include = newData.chartPackage.labels.includes(tsi)
    if (include === true) {
      newMatchList.push(newData.chartPackage.datasets[0].data[countTwo])
      countTwo++
    } else {
      newMatchList.push(null)
    }
  }
  newVisObject.data = newMatchList
  paddedData.push(newVisObject)
  return paddedData
}

/**
*  need to update chart colors and even scaing of axsis etc
* @method chartColorUpdate
*
*/
VisualUtility.prototype.chartColorUpdate = function (datasetsList) {
  let colorUpdated = []
  // for each data set required charting prepare new unique colors
  for (let daty of datasetsList) {
    let dataUpdate = {}
    let newColour = this.colourList()
    dataUpdate.type = daty.type
    dataUpdate.borderColor = newColour
    dataUpdate.fillColor = newColour
    dataUpdate.fill = false
    dataUpdate.data = daty.data
    dataUpdate.label = daty.label
    colorUpdated.push(dataUpdate)
  }
  return colorUpdated
}

/**
*  allocate new color to each dataset
* @method setColourDataset
*
*/
VisualUtility.prototype.setColourDataset = function (dataSet) {
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
VisualUtility.prototype.colourList = function () {
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
VisualUtility.prototype.prepareTime = function (timeIN, update) {
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

/**
* prepare multi datasets one chart
* @method displayUpdateSpaceSingle
*
*/
VisualUtility.prototype.displayUpdateSpaceSingle = function (entityData, liveData) {
  let singleBundle = {}
  singleBundle.update = 1
  singleBundle.module = 1 // mod
  singleBundle.identifier = 1
  return singleBundle
}

/**
* prepare grid layout for display and set data ids and data for visualisation e.g. charts etc.
* @method diplayFilter
*
*/
VisualUtility.prototype.displaySpaceUpdate = function (liveData, entityData) {
  // setup return vis Object
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
      let newGriditem = { 'x': 0, 'y': 0, 'w': 1, 'h': 1, 'i': dr, static: false }
      updateGrid.push(newGriditem)
      setVistoolbar[dr] = { text: 'open tools', active: true }
      setOpendata[dr] = { text: 'open data', active: false }
    }
  }
  updateVisData.grid = updateGrid
  updateVisData.vistoolbar = setVistoolbar
  updateVisData.opendata = setOpendata
  return updateVisData
}

/**
* prepare grid layout for many device space  many data types in single chart.
* @method displayManySpaceUpdate
*
*/
VisualUtility.prototype.displayManySpaceUpdate = function (liveData, entityData, matchModeType, updateComputeContract) {
}

export default VisualUtility
