import { mount } from '@vue/test-utils'
import RefreshButton from './RefreshButton.vue'

describe('RefreshButton', () => {
  test('Check props', () => {
    const props = {
      loading: true,
    }
    const wrapper = mount(RefreshButton, {
      propsData: props,
    })

    expect(wrapper.props('loading')).toBe(props.loading)
  })

  test('Click', () => {
    const props = {
      loading: true,
    }
    const wrapper = mount(RefreshButton, {
      propsData: props,
    })

    wrapper.find('.v-btn').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
