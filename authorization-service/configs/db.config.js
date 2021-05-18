DB_CONNECT_URL="mongodb://conganhhcmus:conganhhcmus@13.59.198.136:27017/test?authSource=admin";
DB_TEST = "mongodb+srv://admin:admin@testcluster.zj6mn.mongodb.net/test?authSource=admin";

const mongodbUrl = (process.env.NODE_ENV === 'test') ? DB_TEST : DB_CONNECT_URL;

module.exports = {
    mongodbUrl:mongodbUrl
};
