<template>
  <div id="grid-contracts">
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
        <tr class="alternate-bk" v-for="entry in filteredLifeboards" :key="entry.id">
          <td v-for="key in columns" :key="key.id">
            <div v-if="key !== 'action'">
            {{entry[key]}}
            </div>
            <div v-else>
              <button type="button" class="btn" @click="actionLifeboard(entry.id, entry)">{{ entry[key] }}</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'list-contracts',
  components: {
  },
  beforeMount () {
  },
  created () {
  },
  mounted () {
  },
  props: {
    lifeboards: Array,
    columns: Array,
    filterKey: String
  },
  computed: {
    filteredLifeboards: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var experiments = this.lifeboards
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
      this.setactiveLBlist(experiments)
      return experiments
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      shellContract: '',
      sortKey: '',
      sortOrders: sortOrders,
      actionKBundle: {},
      previewSeen: false,
      type: 'chart.js',
      shellID: null,
      moduleCNRL: '',
      moduleType: '',
      mData: '',
      visualRefCont: '',
      messageRemove: false,
      removeNXPid: ''
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    refContractLookup () {
      // create new temp shellID
      this.shellID = '7654321'
      this.mData = '8855332211'
    },
    setactiveLBlist (lb) {
      this.$store.dispatch('actionLiveLBlist', lb)
    },
    actionLifeboard (lbCNRL, LBcontract) {
      this.shellContract = lbCNRL
      this.actionKBundle = LBcontract
      if (LBcontract.action === 'View') {
        this.$store.dispatch('actionLBState', lbCNRL)
      }
    }
  }
}
</script>

<style scoped>
#grid-template {
  position: relative;
  border: 0px solid blue;
  text-align: center;
}

table {
  border: 1px solid #42b4b9;
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
  /* background-color: #f9f9f9; */
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

.alternate-bk:nth-child(even) {
  background-color: #ffefd5;
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

.scale-space.active {
  background-color: #4CAF50; /* Green */
}
</style>
