'use strict'
/**
*  Prepare modules ref contracts for HOP out
*
*
* @class HOPprepare
* @package    HOP
* @copyright  Copyright (c) 2022 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import EventEmitter from 'events'
import ToolkitUtility from '@/mixins/toolkitUtility.js'
const moment = require('moment')
const ToolUtility = new ToolkitUtility()

class HOPprepare extends EventEmitter {
  constructor () {
    super()
    this.input = {}
  }

  /**
  * take existing input prepare
  * @method savePrepare
  *
  */
  savePrepare = function (input, boardmods) {
    let checkPosition = this.checkPositionObject(input)
    let connectRefContracts = this.prepHOPmodules(input, boardmods)
    let outMessageHOP = {}
    outMessageHOP.futureTimeCheck = false
    outMessageHOP.board = checkPosition
    outMessageHOP.modules = connectRefContracts
    return outMessageHOP
  }

  /**
  * take save solospace mod context and add date, device, dt to compute contract
  * @method saveSoloPrepare
  *
  */
  saveSoloPrepare = function (input, boardmods, saveContext) {
    let checkPosition = this.checkPositionObject(input)
    let connectRefContracts = this.prepSoloHOPmodules(input, boardmods, saveContext)
    let outMessageHOP = {}
    outMessageHOP.futureTimeCheck = false
    outMessageHOP.board = checkPosition
    outMessageHOP.modules = connectRefContracts
    return outMessageHOP
  }

  /**
  * check position
  * @method checkPositionObject
  *
  */
  checkPositionObject = function (update) {
    if (typeof update !== 'object') {
      let positionStartInfo = {}
      positionStartInfo.nxp = update
      positionStartInfo.coord = {}
      positionStartInfo.type = 'new'
      // context.dispatch('actionPostionCoord', positionStartInfo, { root: true })
    } else {
      update = update.nxp
    }
    return update
  }

  /**
  * take existing input prepare
  * @method assessTime
  *
  */
  assessTime = function (update) {
    let timeContext = {}
    timeContext.device = update.mData
    timeContext.timerange = []
  }

  /**
  * build the modules for out HOP message
  * @method prepHOPmodules
  *
  */
  prepHOPmodules = function (update, networkPeerExpModules) {
    // build the safeFLOW-ECS input bundle
    let matchExp = {}
    for (let nxp of networkPeerExpModules) {
      if (nxp.key === update) {
        matchExp = nxp
      }
    }
    return matchExp
  }

  /**
  * build the SOLOSPACE modules for out HOP message
  * @method prepSoloHOPmodules
  *
  */
  prepSoloHOPmodules = function (update, networkPeerExpModules, saveContext) {
    // build the safeFLOW-ECS input bundle
    let matchExp = {}
    for (let nxp of networkPeerExpModules) {
      if (nxp.key === update) {
        matchExp = nxp
      }
    }
    console.log(saveContext)
    for (let mod of matchExp.modules) {
      if (mod.value.type === 'compute') {
        // update the controls
        mod.value.info.controls.date = saveContext.context.triplet.timeout
        mod.value.info.controls.rangedate = []
        mod.value.info.controls.rangedate.push(saveContext.context.triplet.timeout)
        mod.value.info.controls.device = saveContext.context.triplet.device
      }
    }
    return matchExp
  }

  /**
  * expand the ref contract hash to full contract (NOW HOP DOED THIS)
  * @method expandRefContract
  *
  */
  expandRefContract = function (update, matchExp, liveRefContIndex, livePeerRefContIndex) {
    let futureTimeCheck = false
    // prepare ECS inputs- lookup peer selected module options
    let peerOptions = []
    for (let pmod of matchExp.modules) {
      // for each type of module look up ref contract
      if (pmod.value.type === 'question') {
        peerOptions.push(pmod)
      } else if (pmod.value.type === 'data') {
        let peerDataRC = ToolUtility.refcontractLookup(pmod.value.info.data, liveRefContIndex.packaging)
        pmod.value.info.data = peerDataRC
        peerOptions.push(pmod)
      } else if (pmod.value.type === 'compute') {
        // get the latest refcontract nB. link compute ie one to many, sort many list and this used in presentation
        let peerDataRC = ToolUtility.refcontractLookup(pmod.value.info.compute, liveRefContIndex.compute)
        pmod.value.info.compute = peerDataRC
        let newestContract = ToolUtility.refcontractLookupCompute(pmod, livePeerRefContIndex.module)
        // set key to master ref contract key
        newestContract.key = pmod.key
        // check if data is not in the future
        let timeModule = newestContract.value.info.controls.date
        // futureTimeCheck = ToolUtility.timeCheck(timeModule)
        if (futureTimeCheck === true) {
          // flag to peer to ask if they want future or if yes what data to use ie CALE/ other
          let feedbackMessage = {}
          feedbackMessage.type = 'future'
          feedbackMessage.active = true
          feedbackMessage.feedback = 'The time period is in the future. Need data picker or select CALE etc'
          feedbackMessage.refcontract = update
          feedbackMessage.data = moment.utc(timeModule).format('dddd, MMMM Do YYYY')
          // context.commit('SET_FEEDBACK_MESSAGE', feedbackMessage)
        } else {
          // set default time for toolkit
          // context.commit('setTimeAsk', timeModule)
          let setTimerangeLocal = []
          setTimerangeLocal.push(timeModule)
          peerOptions.push(newestContract)
        }
      } else if (pmod.value.type === 'visualise') {
        pmod.value.info.settings.single = true
        let peerDataRC = ToolUtility.refcontractLookup(pmod.value.info.visualise, liveRefContIndex.visualise)
        if (pmod.value.info.settings.yaxis.length > 1) {
          pmod.value.info.settings.multidata = true
        } else {
          pmod.value.info.settings.multidata = false
        }
        pmod.value.info.visualise = peerDataRC
        peerOptions.push(pmod)
      }
    }
    return peerOptions
  }
}

export default HOPprepare
