<template>
  <div id="module-board">
    <header
      class="modal-header"
      id="modalTitle"
    >
      <slot name="header">
        Display being prepared
      </slot>
    </header>
    <section
      class="board-body"
      id="nxpDescription"
    >
      <slot name="body">
        N=1 network experiment summary
      </slot>
    </section>
    <!-- <footer class="board-footer">
      <slot name="footer">
      </slot>
    </footer> -->
  </div>
</template>

<script>
export default {
  name: 'module-board',
  components: {
  },
  computed: {
  },
  data: () => ({
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
#module-board {
  border: 0px solid red;
  background-color: #E9EDF0;
}

.modal-header {
  display: grid;
  grid-template-columns: 1fr;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
}

.modal-body {
  position: relative;
  padding: 10px 5px;
}
</style>
