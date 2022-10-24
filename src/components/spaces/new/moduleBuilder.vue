<template>
  <div id="module-builder">
    <div class="nxp-builder">
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
        <h3>Experiment - drag modules across <a href="" id="network-library-damahub" @click.prevent="networLibrary()">Network Library</a></h3>
        <networklibrary-modal v-show="isModalNLib" @closenl="closeModalNLib">
          <template v-slot:header>
          <!-- The code below goes into the header slot -->
            Network Library
          </template>
          <template v-slot:body>
          </template>
        </networklibrary-modal>
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
import NetworklibraryModal from '@/components/bentoboard/networklibrary/networklibraryModal.vue'
import draggable from 'vuedraggable'
import NxpQuestion from '@/components/bentoboard/nxpQuestion.vue'
import NxpDevice from '@/components/bentoboard/nxpDevice.vue'
import NxpDapp from '@/components/bentoboard/nxpDapp.vue'
import NxpCompute from '@/components/bentoboard/nxpCompute.vue'
import NxpControl from '@/components/bentoboard/nxpControl.vue'
import NxpVisualise from '@/components/bentoboard/nxpBuildVisualise.vue'
import NxpSciencereview from '@/components/bentoboard/nxpSciencereview.vue'
import nxpLifestylemedicine from '@/components/bentoboard/nxpLifestylemedicine.vue'
import NxpPrescription from '@/components/bentoboard/nxpPrescription.vue'
import NxpCommunicate from '@/components/bentoboard/nxpCommunicate.vue'
import NxpEvolve from '@/components/bentoboard/nxpEvolve.vue'

export default {
  name: 'ModuleBuilder',
  components: {
    NetworklibraryModal,
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
      isModalNLib: false
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
    },
    networLibrary () {
      // open modal
      this.isModalNLib = true
    },
    closeModalNLib () {
      this.isModalNLib = false
      // refresh the networklibrary contract to access new contracts
      // this.$store.dispatch('actionRrefreshRefContracts')
    }
  }
}
</script>

<style>
#module-builder {
  height: 100%;
}

.nxp-builder {
  display: grid;
  grid-template-columns: 1fr 2fr;
  border: 4px solid green;
  min-height: 2em;
}

.col-3 {
  display: grid;
  grid-template-columns: 1fr;
  vertical-align: text-top;
  min-height: inherit;
  border: 1px solid grey;
  margin-right: 4em;
}

.col-4 {
  display: grid;
  grid-template-columns: 1fr;
  vertical-align: text-top;
  min-height: inherit;
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
