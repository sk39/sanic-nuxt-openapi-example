import s from 'underscore.string'
import { ValidateParam, ValidateType } from './model'
import ViewUtils from '~/utils/ViewUtils'

export { ValidateType }

export default class Validator {
  static rules(params: (ValidateType | ValidateParam)[]) {
    return params.map((p: any) => {
      if (p.type) {
        return (value) => this[p.type](value, p.arg)
      }
      return this[p]
    })
  }

  static required(value) {
    if (s.isBlank(value)) {
      return ViewUtils.t('error.required')
    }
    return true
  }

  static maxlength(value, { length }) {
    if (value && value.length > length) {
      return ViewUtils.t('error.maxlength')
    }
    return true
  }
}
