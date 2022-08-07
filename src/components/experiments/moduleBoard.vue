<template>
  <div id="module-board">
    <header
      class="modal-header"
      id="modalTitle"
    >
      <slot name="header">
        Display being prepared

        <button
          type="button"
          class="btn-close"
          @click="close"
          aria-label="Close modal"
        >
          Edit
        </button>
      </slot>
    </header>
    <section
      class="board-body"
      id="nxpDescription"
    >
      <div class="network-experiment">
        <slot name="body">
          N=1 network experiment summary
        </slot>
      </div>
      <div id="edit-submit">
        <slot name="submit-edit">
          <!-- no default button -->
        </slot>
      </div>
    </section>
    <footer class="board-footer">
      <slot name="footer">
        <!-- <button
          type="button"
          class="btn-green"
          @click="close"
          aria-label="Close board"
        >
          Close
        </button> -->
      </slot>
    </footer>
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
  background-color: #E9EDF0;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
</style>
