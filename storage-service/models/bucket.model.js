const db = require('../utils/dbConfig')
const table_name = 'bucket'

module.exports = {
    async all() {
        return db(table_name)
    },

    async getById(id) {
        const buckets = await db(table_name).where('id', id)
        if(buckets.length === 0)
            return null;
        return buckets[0]
    },

    async add(bucket)
    {
        return db(table_name).insert(bucket).returning('id')
    },

    async delete(id) {
        return db(table_name).where('id', id).del()
    },

    async getByUserId (user_id)
    {
        if(user_id != null){
            const buckets = await db(table_name).where('user_id', user_id).orWhere("root_id", user_id)
            if(buckets.length === 0)
                return null;
            return buckets
        }
        return null
    }
}