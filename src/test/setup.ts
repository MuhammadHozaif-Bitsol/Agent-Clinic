import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

// jsdom does not implement scrolling; useRouteFocus calls it on navigation.
vi.stubGlobal('scrollTo', vi.fn())
