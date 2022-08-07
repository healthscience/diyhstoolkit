import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { initialiseStores } from 'Vuex'
// import App from '@/App.vue'
import App from '@/App.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

describe('Render home page bb-ds', () => {
  // mock the store
  let store
  const state = {
    aiInterface: {
      statusCALE:
      {
        text: 'off',
        active: false
      }
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state
    })
  })

  // Now mount the component and you have the wrapper
  const wrapper = shallowMount(App, {
    mocks: {
      $t: key => key
    },
    store,
    localVue
  })

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
