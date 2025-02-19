import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NStep, NSteps } from '../index'
import { NIcon } from '../../icon'

describe('n-steps', () => {
  it('should work with import on demand', () => {
    mount(NSteps)
  })

  it('should work with `current` prop', async () => {
    const processStyle =
      '--description-text-color: rgb(51, 54, 57); --header-text-color: rgb(31, 34, 37); --indicator-border-color: #18a058; --indicator-color: #18a058;'
    const waitStyle =
      '--description-text-color: rgba(194, 194, 194, 1); --header-text-color: rgba(194, 194, 194, 1); --indicator-border-color: rgba(194, 194, 194, 1); --indicator-color: #0000;'
    const finishStyle =
      ' --description-text-color: rgba(194, 194, 194, 1); --header-text-color: rgba(194, 194, 194, 1); --indicator-border-color: #18a058; --indicator-color: #0000;'
    const wrapper = mount(NSteps, {
      props: {
        current: 1
      },
      slots: {
        default: () => [
          h(NStep, { title: 'test1', description: 'test1', internalIndex: 1 }),
          h(NStep, { title: 'test2', description: 'test2', internalIndex: 2 }),
          h(NStep, { title: 'test3', description: 'test3', internalIndex: 3 })
        ]
      }
    })
    expect(wrapper.findAll('.n-step')[0].attributes('style')).toContain(
      processStyle
    )
    expect(wrapper.findAll('.n-step')[1].attributes('style')).toContain(
      waitStyle
    )
    expect(wrapper.findAll('.n-step')[2].attributes('style')).toContain(
      waitStyle
    )

    await wrapper.setProps({ current: 2 })
    expect(wrapper.findAll('.n-step')[0].attributes('style')).toContain(
      finishStyle
    )
    expect(wrapper.findAll('.n-step')[1].attributes('style')).toContain(
      processStyle
    )
    expect(wrapper.findAll('.n-step')[2].attributes('style')).toContain(
      waitStyle
    )

    await wrapper.setProps({ current: 3 })
    expect(wrapper.findAll('.n-step')[0].attributes('style')).toContain(
      finishStyle
    )
    expect(wrapper.findAll('.n-step')[1].attributes('style')).toContain(
      finishStyle
    )
    expect(wrapper.findAll('.n-step')[2].attributes('style')).toContain(
      processStyle
    )
  })

  it('should work with `size` prop', async () => {
    const mediumStyle =
      '--indicator-icon-size: 18px; --indicator-index-font-size: 16px; --indicator-size: 28px;'
    const smallStyle =
      '--indicator-icon-size: 14px; --indicator-index-font-size: 14px; --indicator-size: 22px;'
    const wrapper = mount(NSteps, {
      props: {
        current: 1
      },
      slots: {
        default: () =>
          h(NStep, { title: 'test1', description: 'test1', internalIndex: 1 })
      }
    })
    expect(wrapper.find('.n-step').attributes('style')).toContain(mediumStyle)
    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-step').attributes('style')).toContain(smallStyle)
  })

  it('should work with `vertical` prop', async () => {
    const wrapper = mount(NSteps, {
      props: {
        current: 1
      },
      slots: {
        default: () =>
          h(NStep, { title: 'test1', description: 'test1', internalIndex: 1 })
      }
    })
    expect(wrapper.find('.n-steps').classes()).not.toContain(
      'n-steps--vertical'
    )
    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('.n-steps').classes()).toContain('n-steps--vertical')
  })

  it('should work with `finish-icon` and `error-icon` slots', async () => {
    const wrapper = mount(NSteps, {
      props: {
        status: 'finish',
        current: 1
      },
      slots: {
        'finish-icon': () =>
          h(NIcon, null, {
            default: () => 'finish'
          }),
        'error-icon': () =>
          h(NIcon, null, {
            default: () => 'error'
          }),
        default: () =>
          h(NStep, { title: 'test', description: 'test', internalIndex: 1 })
      }
    })

    expect(wrapper.find('.n-icon').exists()).toBe(true)
    expect(wrapper.find('.n-icon').text()).toBe('finish')

    await wrapper.setProps({ status: 'error' })
    expect(wrapper.find('.n-icon').exists()).toBe(true)
    expect(wrapper.find('.n-icon').text()).toBe('error')
  })
})
