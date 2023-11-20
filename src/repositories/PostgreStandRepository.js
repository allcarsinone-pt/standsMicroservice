const pg = require('pg')
const Stand = require('../entities/Stand')

class PostgreStandRepository {
  constructor (baseURI) {
    this.baseURI = baseURI
  }

  async create (stand) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`INSERT INTO stand (name, location, phone, mobilephone, schedule) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [stand.name, stand.location, stand.phone, stand.mobilephone, stand.schedule])
    console.log(result);
    await client.end()
    return new Stand(result.rows[0].name, result.rows[0].location, result.rows[0].phone, result.rows[0].mobilephone, result.rows[0].schedule, result.rows[0].standid)
  }

  async wipe () {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM stand`)
    await client.end()
  }

  async deleteStand (standId) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM stand WHERE StandID = $1`, [standId])
    await client.end()
  }

  async findByName (name) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT name, location, phone, mobilephone, schedule FROM stand WHERE name = $1`, [name])
    await client.end()
    if (result.rows.length === 0) {
      return undefined
    }
    return new Stand(result.rows[0].name, result.rows[0].location, result.rows[0].phone, result.rows[0].mobilephone, result.rows[0].schedule, result.rows[0].id)
  }
}

module.exports = PostgreStandRepository