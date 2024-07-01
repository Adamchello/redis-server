import { handlePing } from '../../src/commands/ping.js'
import { serialize } from '../../src/utils/serialization.js'

describe('Ping command function', () => {
  it('should answer with PONG response', () => {
    const result = handlePing()
    const expectedResult = serialize('PONG', 'simpleString')

    expect(result).toBe(expectedResult)
  })
})
