require('dotenv').config({path:'../.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const StudyClass = require('../models/StudyClass');
  
  const classes = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  for (let c of classes) {
      await StudyClass.findOneAndUpdate(
          { name: c },
          { name: c, targetGrade: c, instructor: null },
          { upsert: true, new: true }
      );
  }
  
  // Clean up any dynamic classes that are NOT the global 5
  await StudyClass.deleteMany({ name: { $nin: classes } });
  
  console.log('Successfully seeded global standard classes and pruned dynamic ones.');
  process.exit(0);
});
