const { models } = require('mongoose');
const { Day }= require('./day.model');
const {Task} =require('./task.model');

module.exports={
    Day,
    Task
}