<template>
  <div id="module-builder">
    <div class="row">
      <div class="col-3">
        <h3>Modules available</h3>
        <draggable class="list-group" :list="nxpModulesList" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element) in nxpModulesList"
            :key="element.name"
          >
          {{ element.name }}
          </div>
        </draggable>
      </div>
      <div class="col-4">
        <h3>Experiment - drag modules across</h3>
        <draggable class="list-group" :list="nxpMakeList" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element) in nxpMakeList"
            :key="element.name"
          >
            <component v-bind:is="moduleNXPTemplate[element.name].prime.type" :modData="element" ></component>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import NxpQuestion from '@/components/experiments/nxpQuestion.vue'
import NxpDevice from '@/components/experiments/nxpDevice.vue'
import NxpDapp from '@/components/experiments/nxpDapp.vue'
import NxpCompute from '@/components/experiments/nxpCompute.vue'
import NxpControl from '@/components/experiments/nxpControl.vue'
import NxpVisualise from '@/components/experiments/nxpBuildVisualise.vue'
import NxpSciencereview from '@/components/experiments/nxpSciencereview.vue'
import nxpLifestylemedicine from '@/components/experiments/nxpLifestylemedicine.vue'
import NxpPrescription from '@/components/experiments/nxpPrescription.vue'
import NxpCommunicate from '@/components/experiments/nxpCommunicate.vue'
import NxpEvolve from '@/components/experiments/nxpEvolve.vue'

export default {
  name: 'ModuleBuilder',
  components: {
    draggable,
    NxpQuestion,
    NxpDevice,
    NxpDapp,
    NxpCompute,
    NxpVisualise,
    NxpControl,
    NxpSciencereview,
    nxpLifestylemedicine,
    NxpPrescription,
    NxpCommunicate,
    NxpEvolve
  },
  props: {
  },
  computed: {
    testHolder: function () {
      return this.$store.state.moduleHolder
    },
    nxpMakeList: function () {
      return this.$store.state.nxpMakeList
    },
    nxpModulesList: function () {
      return this.$store.state.nxpModulesList
    },
    moduleNXPTemplate: function () {
      return this.$store.state.moduleNXP
    }
  },
  data () {
    return {
    }
  },
  methods: {
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function (evt) {
      // window.console.log(evt)
    }
  }
}
</script>

<style>
#module-builder {

}

.row {
  border: 0px solid green;
  min-height: 2em;
}

.col-3 {
  display: inline-block;
  vertical-align: text-top;
  min-height: inherit;
  width: 15%;
  border: 1px solid grey;
  margin-right: 4em;
}

.col-4 {
  display: inline-block;
  vertical-align: text-top;
  min-height: inherit;
  width: 80%;
  border: 0px solid grey;
}

.list-group {
  border: 1px solid orange;
  min-height: 400px;
  background-color: #ffefd5;
}

.list-group-item {
  display: block;
  width: 80%;
  padding: .5em;
  margin: 1em;
  border: 0px solid lightgrey;
  background-color: #E6ECEC;
}
</style>
