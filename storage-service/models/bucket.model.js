const db = require('../utils/dbConfig')
const table_name = 'bucket'

module.exports = {
    async all() {
        return db(table_name)
    },

    async getById(id) {
        const users = await db(table_name).where('id', id)
        if(users.length === 0)
            return null;
        return users[0]
    },

    async add(bucket)
    {
        return db(table_name).insert(bucket).returning('id')
    },

    async delete(id) {
        return db(table_name).where('id', id).del()
    }
}