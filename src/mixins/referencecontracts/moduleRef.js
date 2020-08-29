'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class PackagingReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
const util = require('util')
const events = require('events')

var ModuleReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ModuleReferenceContract, events.EventEmitter)

/**
* prepare a module template reference contract
* @method modulePrepare
*
*/
ModuleReferenceContract.prototype.modulePrepare = function (inputRC) {
  console.log('module comps')
  console.log(inputRC)
  let newModule = {}
  // what type of modules is it?
  if (inputRC.reftype === 'module') {
    newModule = this.prepareTemplateModule(inputRC)
  } else if (inputRC.moduleinfo.name === 'question') {
    newModule = this.prepareQuestion(inputRC)
  } else if (inputRC.moduleinfo.name === 'data') {
    newModule = this.prepareData(inputRC)
  } else if (inputRC.moduleinfo.name === 'compute') {
    newModule = this.prepareCompute(inputRC)
  } else if (inputRC.moduleinfo.name === 'visualise') {
    newModule = this.prepareVisulise(inputRC)
  } else if (inputRC.moduleinfo.name === 'education') {
    newModule = 1
  }
  return newModule
}

/**
* prepare template module
* @method prepareTemplateModule
*
*/
ModuleReferenceContract.prototype.prepareTemplateModule = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare question module
* @method prepareQuestion
*
*/
ModuleReferenceContract.prototype.prepareQuestion = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare data module
* @method prepareData
*
*/
ModuleReferenceContract.prototype.prepareData = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare compute module
* @method prepareCompute
*
*/
ModuleReferenceContract.prototype.prepareCompute = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare Visulise module
* @method prepareVisulise
*
*/
ModuleReferenceContract.prototype.prepareVisulise = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

export default ModuleReferenceContract
