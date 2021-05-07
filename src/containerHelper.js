import { RESOLVER } from 'awilix'
export const define = (name, fn) => {
  fn[RESOLVER] = {
    name
  }
  return fn
}
