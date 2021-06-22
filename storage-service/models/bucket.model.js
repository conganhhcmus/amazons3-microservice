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

    async update (bucket_id,bucket)
    {
        return db(table_name).where("id", bucket_id).update(bucket)
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
    },

    async getRootByUserId (user_id)
    {
        if(user_id != null){
            const buckets = await db(table_name).where('user_id', user_id)
            if(buckets.length === 0)
                return null
            const bucket = buckets[0]
            const root_id = bucket.root_id
            if(root_id == null)
                return user_id
            return root_id
        }
        return null
    }
}