module.exports = {
    users: {
        name: { type: String, required: true },
        pwd: { type: String, required: true },
        introinfo: {type:String}
    },
    articles: {
        name: { type: String, required: true },
        content: { type: String, required: true },
        updateTime: { type: String, required: true }
    }

};