import { mount } from 'svelte'
import SvelteApp from './App.svelte'

const app = mount(SvelteApp, {
  target: document.getElementById('app'),
})
