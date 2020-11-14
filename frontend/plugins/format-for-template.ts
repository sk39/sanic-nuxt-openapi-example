import Vue from 'vue'
import moment from 'moment'
import s from 'underscore.string'

Vue.use({
  install(Vue) {
    Vue.prototype.formatDate = (value, format?: string) => {
      if (!value) return ''
      return moment(value).format(format || 'YYYY/MM/DD')
    }
    Vue.prototype.isBlank = (value) => {
      return s.isBlank(value)
    }
  },
})
