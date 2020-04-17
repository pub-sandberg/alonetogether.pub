import { writable } from 'svelte/store'

// default value is passed as first arg to writable()
export const fullScreen = writable(false)
export const isMobile = writable(false)