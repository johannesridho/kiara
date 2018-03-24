require('dotenv').config()

const config = {
  server: {},
  db: {
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    name: process.env.DB_NAME || '',
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS || '',
  },
  logger: {
    isFile: process.env.IS_FILE || 'false',
    isPapertrail: process.env.IS_PAPERTRAIL || 'false',
    papertrail: {
      host: process.env.PAPERTRAIL_HOST || 'host',
      port: process.env.PAPERTRAIL_PORT || 'port',
    },
  },
  btn: {
    host: 'http://mortgtech-eval-prod.apigee.net/btn-mortgtech',
    apikey: '7UDvsFMGq3eMrueLX2ZKyrhiEuzkGGSx'
  }
}

module.exports = config