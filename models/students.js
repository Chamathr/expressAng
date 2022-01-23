const mongoose = require('mongoose');

 studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    comment: {
        type: Array,
        required: true
    }
});

const Student = module.exports = mongoose.model('Students', studentSchema);