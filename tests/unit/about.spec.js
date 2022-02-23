import { mount } from '@vue/test-utils'
// import App from '@/App.vue'
import AboutPage from '@/views/About.vue'

// then we mount (wrap) the component
const wrapper = mount(AboutPage)

describe('Logic new type lifeboard or experiment', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(AboutPage)

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
