require('dotenv').config({path:'../.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const User = require('../models/User');
  const Batch = require('../models/Batch');
  
  const u = await User.findOne({name: 'Abhaidev'});
  if(!u) { console.log('no user'); process.exit(0);}
  
  const targetB = await Batch.findOne({name: 'Batch 2'});
  if(!targetB) { 
    console.log('target batch not found'); 
    process.exit(0); 
  }
  
  await Batch.updateOne({ _id: targetB._id }, { $addToSet: { students: u._id } }); 
  console.log('Added Abhaidev to', targetB.name, 'successfully.');
  process.exit(0);
});
