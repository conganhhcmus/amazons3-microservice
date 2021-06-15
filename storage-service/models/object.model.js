const db = require('../utils/db')
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

    async add(bucket)
    {
        return db(table_name).insert(bucket)
    },

    async delete(id) {
        return db(table_name).where('id', id).del()
    }
}