import auth from './auth'

export default (Vue) => {
  Vue.directive('auth', {
    inserted: auth
  })
}