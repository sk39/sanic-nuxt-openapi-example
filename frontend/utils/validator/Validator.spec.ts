import Validator, { ValidateType } from './Validator'
import ViewUtils from '~/utils/ViewUtils'

describe('Validator', () => {
  describe('rules', () => {
    test('arg=type', () => {
      const rules = Validator.rules([ValidateType.required])
      expect(rules.length).toBe(1)
      const rule = rules[0]
      expect(rule('')).toBe(ViewUtils.t('error.required'))
      expect(rule('aaa')).toBeTruthy()
    })

    test('arg=object', () => {
      const rules = Validator.rules([{ type: ValidateType.required }])
      expect(rules.length).toBe(1)
      const rule = rules[0]
      expect(rule('')).toBe(ViewUtils.t('error.required'))
      expect(rule('aaa')).toBeTruthy()
    })
  })

  test('required', () => {
    const errMsg = ViewUtils.t('error.required')
    expect(Validator.required('')).toBe(errMsg)
    expect(Validator.required(null)).toBe(errMsg)
    expect(Validator.required('ああああ')).toBeTruthy()
  })

  test('maxlength', () => {
    const errMsg = ViewUtils.t('error.maxlength')
    expect(Validator.maxlength('ああああ', { length: 3 })).toBe(errMsg)
    expect(Validator.maxlength('ああああ', { length: 4 })).toBeTruthy()
  })
})
