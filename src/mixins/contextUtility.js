'use strict'
/**
*  prepare the settings context for out
*
*
* @class contextUtility
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var contextUtility = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(contextUtility, events.EventEmitter)

/**
* update setting out
* @method prepareSettings
*
*/
contextUtility.prototype.prepareSettings = function (module, time, update, toolbar) {
  // compute controls
  console.log('toolbar update')
  module.value.info.controls.date = time[0]
  module.value.info.controls.rangedate = time
  // context toolbar
  module.value.info.settings.date = time[0]
  module.value.info.settings.timeseg = update.startperiodchange
  module.value.info.settings.category = toolbar.category
  module.value.info.settings.compute = toolbar.compute
  module.value.info.settings.devices = toolbar.devices
  // module.value.info.settings.single = true
  // module.value.info.settings.resolution = this.state.visModuleHolder.resolution
  module.value.info.settings.xaxis = toolbar.xaxis
  module.value.info.settings.yaxis = toolbar.yaxis
  return module
}

/**
* update setting out
* @method prepareSettingsTime
*
*/
contextUtility.prototype.prepareSettingsTime = function (module, time, update, toolbar) {
  // compute controls
  module.value.info.controls.date = time[0]
  module.value.info.controls.rangedate = time
  // context toolbar
  module.value.info.settings.date = time[0]
  return module
}

/**
* update setting out
* @method prepareVisSettings
*
*/
contextUtility.prototype.prepareVisSettings = function (module, time, update, toolbar) {
  // context toolbar
  module.value.info.settings.date = time[0]
  module.value.info.settings.timeseg = update.startperiodchange
  module.value.info.settings.category = toolbar.category
  module.value.info.settings.compute = toolbar.compute
  module.value.info.settings.devices = toolbar.devices
  // module.value.info.settings.resolution = this.state.visModuleHolder.resolution
  module.value.info.settings.xaxis = toolbar.xaxis
  module.value.info.settings.yaxis = toolbar.yaxis
  return module
}

/**
* update setting out
* @method prepareSettingsVisTime
*
*/
contextUtility.prototype.prepareSettingsVisTime = function (module, time, update, toolbar) {
  // vis settings
  // console.log(update)
  module.value.info.settings.date = time[0]
  // reset single or multiple charts asked for?
  if (update.singlechart !== undefined) {
    module.value.info.settings.single = update.singlechart
  }
  return module
}
export default contextUtility
