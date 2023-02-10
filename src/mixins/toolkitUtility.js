'use strict'

// import { update } from 'lodash'

// import { all } from 'core-js/fn/promise'

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
const moment = require('moment')

var ToolkitUtility = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ToolkitUtility, events.EventEmitter)

/**
* Prepare table for peer Lifeboard list
* @method prepareLifeboardList
*
*/
ToolkitUtility.prototype.prepareLifeboardList = function (lifeboardIN) {
  let lifeboardList = []
  let lbMembersList = []
  // need to splt into lifeboard and members and link members to lifeboar ids
  for (let lfb of lifeboardIN) {
    if (lfb.value.refcontract === 'lifeboard') {
      lifeboardList.push(lfb)
    } else if (lfb.value.refcontract === 'member') {
      lbMembersList.push(lfb)
    }
  }
  let listColumns = ['id', 'name', 'description', 'action']
  let listDatapeer = []
  for (let lb of lifeboardList) {
    listDatapeer.push({ id: lb.key, name: lb.value.concept.name, description: '--', action: 'View' })
  }
  let listLBPeer = {}
  listLBPeer.columns = listColumns
  listLBPeer.data = listDatapeer
  listLBPeer.members = lbMembersList
  return listLBPeer
}

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
  for (let modules of peerExpModules) {
    // look up question
    for (let mod of modules.modules) {
      if (typeof mod.value.info === 'object' && Object.keys(mod.value.info).length > 0) {
        if (mod.value.info.type === 'question') {
          question2 = mod.value.info.question
        } else {
          question2 = 'none'
        }
      }
      if (question2 !== 'none') {
        gridDatapeer.push({ id: modules.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'View' })
      }
    }
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
*  look at all the compute module contract for this prime id and return newest
* @method refcontractLookupCompute
*
*/
ToolkitUtility.prototype.refcontractLookupCompute = function (refCont, allContracts) {
  let contractKey = ''
  let objectTest = typeof refCont
  if (objectTest === 'object') {
    contractKey = refCont.key
  } else {
    contractKey = refCont
  }

  let matchKey = {}
  let matchList = []
  for (const rc of allContracts) {
    if (contractKey.trim() === rc.value.link) {
      matchList.push(rc)
    }
  }
  // if no match then start with first compute contract
  if (matchList.length > 0) {
    let newestContract = this.orderNewestContract(matchList)
    matchKey = newestContract
  } else {
    matchKey = refCont
  }
  return matchKey
}

/**
* orderNewestContract
* @method orderNewestContract
*
*/
ToolkitUtility.prototype.orderNewestContract = function (contractList) {
  contractList.sort((a, b) => (a.value.info.controls.date < b.value.info.controls.date) ? 1 : -1)
  // check to see if date is in the future?  if yes, make todays date i.e. 00 00 00
  let contractNewest = contractList[0]
  let startToday = moment().startOf('day').valueOf()
  if (contractList[0].value.info.controls.date > startToday) {
    // in future set last contract or today if none then today
    if (contractList[1].value.info.controls.date < startToday) {
      contractNewest.value.info.controls.date = contractList[1].value.info.controls.date
      contractNewest.value.info.controls.rangedate = []
      contractNewest.value.info.controls.rangedate.push(contractList[1].value.info.controls.date)
    } else {
      contractNewest.value.info.controls.date = startToday
      contractNewest.value.info.controls.rangedate = []
      contractNewest.value.info.controls.rangedate.push(startToday)
    }
  } else {
    // no need to change contract
  }
  return contractNewest
}

/**
* update contract with UUID in local memory
* @method updateContractList
*
*/
ToolkitUtility.prototype.updateContractList = function (board, expContract, allContract) {
  let updateList = []
  for (let modContract of allContract) {
    if (expContract === modContract.key) {
      // set local state exp expaneded
      // let newFormed = {}
      // newFormed.key = expContract
      // newFormed.value = expContract.modules
      // let addExpMod = {}
      // addExpMod.exp = newFormed
      // addExpMod.modules = expContract.modules
      updateList.push(modContract)
    } else {
      updateList.push(modContract)
    }
  }
  return updateList
}

/**
* extract out module make objects
* @method matchExpModulesDetail
*
*/
ToolkitUtility.prototype.matchExpModulesDetail = function (expContract, allContract) {
  let matchContract = {}
  for (let rcontract of allContract) {
    if (expContract === rcontract.key) {
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
* extract type of module by ID
* @method matchModuleType
*
*/
ToolkitUtility.prototype.matchModuleRefcontractID = function (modID, modules) {
  let matchContract = {}
  for (let mod of modules) {
    if (modID === mod.key) {
      matchContract = mod
    }
  }
  return matchContract
}

/**
* prepare multi datasets one chart
* @method displayUpdateSpaceSingle
*
*/
ToolkitUtility.prototype.displayUpdateSpaceSingle = function (entityData, liveData) {
  let singleBundle = {}
  singleBundle.update = 1
  singleBundle.module = 1 // mod
  singleBundle.identifier = 1
  return singleBundle
}

/**
* prepare grid layout for display and set data ids and data for visualisation e.g. charts etc.
* @method displaySpaceUpdate
*
*/
ToolkitUtility.prototype.displaySpaceUpdate = function (liveData, entityData) {
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
      let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': dr, static: false }
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
ToolkitUtility.prototype.displayManySpaceUpdate = function (liveData, entityData, matchModeType, updateComputeContract) {
  // setup return vis Object
  let moduleKeys = Object.keys(liveData)
  let updateVisData = {}
  // loop over the modules in the NXP and match to compute and update data
  for (let mod of moduleKeys) {
    if (liveData[mod].prime.text === 'Visualise') {
      updateVisData.module = mod
    }
  }
  // pair device data to time range groupings
  let devicesList = Object.keys(entityData.liveVislist)
  // split into device data groupings
  let deviceMatch = {}
  // let keyMatch = {}
  let dataMerged = {}
  let dataKeys = Object.keys(entityData.visualData)
  for (let dd of devicesList) {
    for (let dk of dataKeys) {
      if (Object.keys(entityData.visualData[dk]).length !== 0) {
        if (entityData.visualData[dk].context.device === dd) {
          deviceMatch[dk] = entityData.visualData[dk]
          // keyMatch
        } else {
          console.log('no device match')
        }
      }
    }
    if (Object.keys(deviceMatch).length !== 0) {
      dataMerged[dd] = this.mergeDataSets(deviceMatch, updateComputeContract)
    } else {
      dataMerged[dd] = []
    }
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
*
* @method timeCheck
*
*/
ToolkitUtility.prototype.timeCheck = function (moduleDate) {
  let dateCheck = 0
  let future = false
  if (moduleDate !== undefined) {
    if (typeof moduleDate === 'object') {
      dateCheck = moduleDate[0]
    }
    if (dateCheck > moment().valueOf()) {
      future = true
    } else {
    }
  }
  return future
}

/**
* take a list of data and make the one for chartint
* @method mergeDataSets
*
*/
ToolkitUtility.prototype.mergeDataSets = function (liveData, computeModule) {
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
  let updateChartOptions = {}
  updateChartOptions = chartOptions
  // need to merge x axis time list to single array
  let paddedData = this.timestampMatcher(dataPairs)
  dataY[0].data = paddedData[0]
  dataY[1].data = paddedData[1]
  //  is the time ie xaxis for one or more time periods?
  let flatten = []
  let unique = []
  if (typeof (computeModule.value.info.controls.rangedate) !== 'object') {
    flatten = dataX[0].concat(dataX[1])
    unique = flatten.filter((v, i, a) => a.indexOf(v) === i)
  } else {
    // many time periods to normalise time
    flatten = dataX[0].concat(dataX[2])
    unique = flatten.filter((v, i, a) => a.indexOf(v) === i)
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
  let updateDatasets = []
  let matchList = []
  let count = 0
  for (let tsi of dataPairs.second.labelset) {
    let include = dataPairs.first.labelset.includes(tsi)
    if (include === true) {
      matchList.push(dataPairs.first.dataset[count])
      count++
    } else {
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
