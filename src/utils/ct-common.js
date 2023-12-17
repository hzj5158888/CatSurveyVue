// ct-role
import Vue from 'vue'
import CtAuthorized from './ct-authorized'

function changeHasRole (el, binding) {
  if (!roleCheck(binding.value)) {
    el.parentNode.removeChild(el)
  }
  function roleCheck (value) {
    const authority = CtAuthorized.getAuthority()
    for (let i=0; i<authority.length; i++) {
      if (value === authority[i]) {
        return true
      }
    }
    return false
  }
}
Vue.directive('hasCtRole', {
  inserted: function (el, binding) {
    changeHasRole(el, binding)
  }
})
