/**
 * auth指令 v-auth="Array or String"
 * 传入的权限码可以是数组或者是字符串
 * 此外还有两个修饰符 some 和 every
 * v-auth.some="Array" 表示满足其中一个资源即可（不设置修饰符情况下默认为some）
 * v-auth.every= "Array" 表示列表的所资源必须存在
 * 调用实例：
 *  <span v-auth.some="['editor', 'visitor']"></span>
 *  <span v-auth.every="['editor', 'visitor']"></span>
 *  <span v-auth="'admin1'"></span>
 */

import store from '../store/index'
const auth = (el, binding) => {
  let valueArr = binding.value
  console.log("authorities", store.getters)
  console.log("valueArr", valueArr)
  let authorities = store.getters.roles

  let rules = true
  let arg = binding.arg || 'every'
  if (arg === 'every') {
    rules = valueArr.every(item => {
      return authorities.includes(item)
    })
  } else if (arg === 'some') {
    rules = valueArr.some(item => {
      return authorities.includes(item)
    })
  }
  !rules && el.parentNode.removeChild(el)
}

export default auth