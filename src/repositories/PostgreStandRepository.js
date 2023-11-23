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
    await client.end()
    return new Stand(result.rows[0].name, result.rows[0].location, result.rows[0].phone, result.rows[0].mobilephone, result.rows[0].schedule, result.rows[0].standid)
  }

  async deleteStand (standId) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM stand WHERE standid = $1`, [standId])
    await client.end()
    return ''
  }

  async editStand (stand) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`UPDATE stand SET name = $1, location = $2, phone = $3, mobilephone = $4, schedule = $5 WHERE standid = $6 RETURNING *`,
    [stand.name, stand.location, stand.phone, stand.mobilephone, stand.schedule, stand.id])
    await client.end()
    return new Stand(stand.name, stand.location, stand.phone, stand.mobilephone, stand.schedule, stand.id)
  }

  async wipe () {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    await client.query(`DELETE FROM stand`)
    await client.end()
  }

  async findByName (name) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT * FROM stand WHERE name = $1`, [name])
    await client.end()
    if (result.rows.length === 0) {
      return undefined
    }
    return new Stand(result.rows[0].name, result.rows[0].location, result.rows[0].phone, result.rows[0].mobilephone, result.rows[0].schedule, result.rows[0].standid)
  }

  async findByID (standid) {
    const client = new pg.Client(this.baseURI)
    await client.connect()
    const result = await client.query(`SELECT * FROM stand WHERE standid = $1`, [standid])
    await client.end()
    if (result.rows.length === 0) {
      return undefined
    }
    return new Stand(result.rows[0].name, result.rows[0].location, result.rows[0].phone, result.rows[0].mobilephone, result.rows[0].schedule, result.rows[0].standid)
  }

}

module.exports = PostgreStandRepository