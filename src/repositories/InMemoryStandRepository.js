/**
 * @description This is a in-memory repository, it can be a mysql, postgres, mongodb, etc
 * @see https://martinfowler.com/bliki/InMemoryTestDatabase.html
 */

class InMemoryStandRepository {
    constructor () {
      this.stands = []
    }
  
    /**
     * @description Creates a stand on the repository
     * @param {*} stand Stand object
     * @returns the added object
     */
    async create (stand) {
      this.stands.push(stand)
      return stand
    }
  
    /**
     * @description Find a stand by name on the repository
     * @param {*} name stand name
     * @returns stand or undefined
     */
    async findByName (name) {
      return this.stands.find((stand) => stand.name === name)
    }
  }
  
  module.exports = InMemoryStandRepository