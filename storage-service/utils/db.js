
module.exports = function (dbEngine) {
  if(dbEngine == "development")
    return {
        client: 'pg',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          port: + process.env.DB_PORT
        },
        pool: { min: 0, max: 50 }
    }
    if(dbEngine == "production")
      return {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: { min: 0, max: 50 }
      }
}
  