const chai = require('chai')

const extractRedisConf = require('../index')

const { expect } = chai

const testSentinelURL = 'sentinel://:HCs2jsskRK@devredisgl-01-144079041913.sentinel.globoi.com:26379,devredisgl-02-144079041913.sentinel.globoi.com:26379,devredisgl-03-144079041913.sentinel.globoi.com:26379/service_name:devredisgl144079041913'
const testRedisURL = 'redis://:@127.0.0.1:6379/0'

describe('utils/extract-redis-conf', () => {
  it('given a sentinel url scheme then it should return a connection object', () => {
    const connectionObject = extractRedisConf(testSentinelURL)
    expect(connectionObject).to.be.a('object')
    expect(connectionObject).to.have.property('name', 'devredisgl144079041913')
    expect(connectionObject).to.have.property('sentinels')
    expect(connectionObject.sentinels.map((e) => e.host)).to.have.members([
      'devredisgl-01-144079041913.sentinel.globoi.com',
      'devredisgl-02-144079041913.sentinel.globoi.com',
      'devredisgl-03-144079041913.sentinel.globoi.com'
    ])
    expect(connectionObject.sentinels.map((e) => e.port)).to.have.members([
      26379, 26379, 26379
    ])
    expect(connectionObject).to.have.property('password', 'HCs2jsskRK')
  })

  it('given a redis url scheme then it should return a connection object', () => {
    const connectionObject = extractRedisConf(testRedisURL)
    expect(connectionObject).to.be.a('object')
    expect(connectionObject).to.have.property('host', '127.0.0.1')
    expect(connectionObject).to.have.property('port', 6379)
    expect(connectionObject).to.have.property('family', 0)
    expect(connectionObject).to.have.property('password', '')
  })
})
