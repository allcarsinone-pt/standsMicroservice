const pg = require('pg'); // PostgreSQL
const dotenv = require('dotenv'); // variável de ambiente

dotenv.config();

class Stand {

    static async registerStand(name, location, phone, mobilephone, schedule) {
        const connection = new pg.Client(process.env.DATABASE_URL);
        await connection.connect();
        
        if(!name || !location || !phone || !mobilephone || !schedule) {
            throw new Error("All fields are required.");
        }

        const stand = new Stand(name, location, phone, mobilephone, schedule);
        const query = "INSERT INTO stand (name, location, phone, mobilephone, schedule) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [stand.name, stand.location, stand.phone, stand.mobilephone, stand.schedule];
        const result = await connection.query(query, values);
        await connection.end();

        const newStand = new Stand(result.rows[0].name, result.rows[0].location, result.rows[0].phone, result.rows[0].mobilephone, result.rows[0].schedule, result.rows[0].standid);

        return newStand;
    }

     /**
     * Edits a stand in the database.
     *
     * @param {string} name - The new name of the stand.
     * @param {string} location - The new location of the stand.
     * @param {string} phone - The new phone number of the stand.
     * @param {string} mobilephone - The new mobile phone number of the stand.
     * @param {string} schedule - The new schedule of the stand.
     * @param {number} standID - The ID of the stand to edit.
     * @return {Stand} The updated stand.
     */
    static async editStand(name, location, phone, mobilephone, schedule, standID) {
      const connection = new pg.Client(process.env.DATABASE_URL);
      await connection.connect();
  
      if (!standID || !name || !location || !phone || !mobilephone || !schedule) {
          throw new Error("All fields are required.");
      }
  
      const query = `
          UPDATE stand 
          SET name = $1, location = $2, phone = $3, mobilephone = $4, schedule = $5 
          WHERE standid = $6 
          RETURNING *`;
      const values = [name, location, phone, mobilephone, schedule, standID];
      const result = await connection.query(query, values);
      await connection.end();
  
      if (result.rows.length === 0) {
          throw new Error("Stand not found.");
      }
  
      const updatedStand = new Stand(
          result.rows[0].name,
          result.rows[0].location,
          result.rows[0].phone,
          result.rows[0].mobilephone,
          result.rows[0].schedule,
          result.rows[0].standid
      );
  
      return updatedStand;
    }
    
    /**
    * Deletes a stand from the database based on the stand name.
    *
    * @param {string} name - Name of the stand to be deleted.
    * @return {Stand} - The deleted stand object.
    */
    static async deleteStand(name) {
      const connection = new pg.Client(process.env.DATABASE_URL);
      await connection.connect();

      if (!name) {
          throw new Error("Stand name is required.");
      }

      const query = `
          DELETE FROM stand 
          WHERE name = $1 
          RETURNING *`;

      const values = [name];
      
      const result = await connection.query(query, values);
      await connection.end();

      if (result.rows.length === 0) {
          throw new Error("Stand not found.");
      }

      const deletedStand = new Stand(
          result.rows[0].name,
          result.rows[0].location,
          result.rows[0].phone,
          result.rows[0].mobilephone,
          result.rows[0].schedule,
          result.rows[0].standid
      );

      return deletedStand;

    }

    /**
       * @description Constructor of stand entity
       * @param {*} name stand name
       * @param {*} location stand location
       * @param {*} phone stand phone
       * @param {*} mobilephone stand mobile phone
       * @param {*} schedule stand schedule
       * @param {*} standid id of stand, can be a integer, an uuid or a string
       */
    constructor (name, location, phone, mobilephone, schedule, standid = undefined) {
      this.standid = standid
      this.name = name
      this.location = location
      this.phone = phone
      this.mobilephone = mobilephone
      this.schedule = schedule
    }
  
    toJson () {
      return { name: this.name, location: this.location, phone: this.phone, mobilephone: this.mobilephone, standid: this.standid }
    }
  
  }
  
  module.exports = Stand
  