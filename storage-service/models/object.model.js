const db = require('../utils/dbConfig')
const table_name = 'object'

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

    async getByBucketWithParent(bucket_id, parent) {
        const objects = await db(table_name).where('bucket_id', bucket_id).where('parent', parent)
        if(objects.length === 0)
            return null
        return objects
    },

    async getByBucket(bucket_id){
        const objects = await db(table_name).where('bucket_id', bucket_id)
        if(objects.length === 0)
            return null
        return objects
    },

    async add(bucket)
    {
        return db(table_name).insert(bucket).returning('id')
    },

    async delete(id) {
        return db(table_name).where('id', id).del()
    }
}