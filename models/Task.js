const {Schema,model} = require('mongoose');

const TaskSchema = Schema({
    name: {
        type: String,
        required:true,
    },
    description: {
        type:String,
        required:true
    },
    dateInitial:{
        type: Date,
        required:true
    },
    dateFinal: {
        type: Date,
        required: true
    },
    studenId:{
        type:String,
    },
    status: {
        type: String,
        require: true,
        enum: ['accepted', 'rejected', 'waiting'],
        default: 'waiting',
    }
});

module.exports = model("Task",TaskSchema);