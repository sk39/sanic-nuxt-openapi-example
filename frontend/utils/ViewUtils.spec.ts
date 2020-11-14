import ViewUtils from './ViewUtils'

describe('ViewUtils', () => {
  describe('t', () => {
    test('normal', () => {
      const msg = ViewUtils.t('error.required')
      expect(msg.length).toBeGreaterThan(1)
    })
  })
})
