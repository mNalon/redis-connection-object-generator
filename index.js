const extractRedisConf = (url, options) => {
  if (typeof url != 'string') {
    throw new TypeError('redis url must be a string')
  }

  let splittedUrl = url.split('://:')
  const schema = splittedUrl[0]
  let connectionObject = {}

  if (['redis', 'sentinel'].indexOf(schema) == -1) {
    throw new Error(`invalid redis schema: ${schema}`)
  }

  if (!splittedUrl[1]) {
    throw new Error('invalid redis url')
  }

  splittedUrl = splittedUrl[1].split('@')
  const password = splittedUrl[0]

  if (!splittedUrl[1]) {
    throw new Error('invalid redis url')
  }

  switch (schema) {
    case 'sentinel': {
      const sentinelSplitted = splittedUrl[1].split('/service_name:')
      const name = sentinelSplitted[1]
      const sentinels = sentinelSplitted[0].split(',').map((endp) => {
        const endpSplited = endp.split(':')
        return {
          host: endpSplited[0],
          port: parseInt(endpSplited[1], 10)
        }
      })
      connectionObject = { name, sentinels, password }
      break
    }
    case 'redis': {
      let redisSplitted = splittedUrl[1].split('/')
      const family = parseInt(redisSplitted[1], 10)
      redisSplitted = redisSplitted[0].split(':')
      const host = redisSplitted[0]
      const port = parseInt(redisSplitted[1], 10)
      const db = 0
      connectionObject = {
        host, port, family, password, db
      }
      break
    }
    default:
      break
  }
  return Object.assign(connectionObject, options)
}

export default extractRedisConf
