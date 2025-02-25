// filepath: /c:/Users/Windows/Documents/Code/real_projects/PaginaPersonal/src/components/test_NavBar.vue
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'

describe('NavBar.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NavBar)
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('toggles menu on button click', async () => {
    const button = wrapper.find('button')
    expect(wrapper.vm.isMenuOpen).toBe(false)
    await button.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)
    await button.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })

  it('scrolls to section on link click', async () => {
    const link = wrapper.find('a[href="#services"]')
    const scrollToSection = vi.spyOn(wrapper.vm, 'scrollToSection')
    await link.trigger('click')
    expect(scrollToSection).toHaveBeenCalledWith('#services')
  })

  it('renders all menu items', () => {
    const menuItems = wrapper.findAll('nav ul li')
    expect(menuItems.length).toBe(6)
  })

  it('toggles menu visibility when button is clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(true)
    await button.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })

  it('closes menu when a menu item is clicked', async () => {
    wrapper.vm.isMenuOpen = true
    await wrapper.vm.$nextTick()
    const menuItem = wrapper.find('nav ul li a')
    await menuItem.trigger('click')
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })
})