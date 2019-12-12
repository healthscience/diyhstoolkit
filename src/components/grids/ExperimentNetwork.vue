<template>
  <div id="live-network-grid">
    <!-- component template -->
    <div id="grid-template">
      <table>
        <thead>
          <tr>
            <th v-for="key in columns" :key="key.id"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredExperiments" :key="entry.id">
            <td v-for="key in columns" :key="key.id">
              <div v-if="key !== 'join'">
              {{entry[key]}}
              </div>
              <div v-else>
                <button type="button" class="btn" @click="joinExperiment(entry.id, entry)">{{ entry[key] }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <join-experiment v-show="isModalJoinVisible" @close="closeModalJoin">
        <template v-slot:header>
        <!-- The code below goes into the header slot -->
          N=1 Network Experiment {{ joinKBundle.name }} {{ joinKBundle.description }}
        </template>
        <template v-slot:body>
        <!-- The code below goes into the header slot -->
          <header>DOWNLOAD MOBILE APPLICACTION & CONNECT DEVICE</header>
        </template>
        <template v-slot:connect>
          <div>Devices required: {{ joinKBundle.dapps }}  Compatible Devices: {{ joinKBundle.device }}</div>
        </template>
        <template v-slot:dashboard>
          <div>
            DASHBOARD preview - other templates
          </div>
        </template>
      </join-experiment>
    </div>
  </div>
</template>

<script>
import JoinExperiment from '@/components/experiments/JoinExperiment.vue'

export default {
  name: 'ExperimentNetwork',
  components: {
    JoinExperiment
  },
  props: {
    experiments: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
      isModalJoinVisible: false,
      joinKBundle: {}
    }
  },
  computed: {
    filteredExperiments: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var experiments = this.experiments
      if (filterKey) {
        experiments = experiments.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        experiments = experiments.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return experiments
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    joinExperiment (expCNRL, KBundle) {
      console.log('join experiment wizard or modal?')
      console.log(expCNRL)
      console.log(KBundle)
      this.joinKBundle = KBundle
      this.isModalJoinVisible = true
    },
    closeModalJoin () {
      this.isModalJoinVisible = false
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b4b9;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b4b9;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
