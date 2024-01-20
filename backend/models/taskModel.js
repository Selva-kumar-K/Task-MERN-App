const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        text : {
            type : String,
            required: [true, 'Please type the value.']
        },

        user : {
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref : 'User'         
        }
    },
    {
        timestamps : true
    }
)

module.exports = new mongoose.model('Task', taskSchema)