const mongoose = require('mongoose');
const Student = require('./models/Student');
const Batch = require('./models/Batch');
const StudyClass = require('./models/StudyClass');
const Instructor = require('./models/Instructor');
const LiveClass = require('./models/LiveClass');
const Faculty = require('./models/Faculty');
const dotenv = require('dotenv');

dotenv.config();

async function seedLiveFAQ() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Get or Create a valid Batch
    let batch = await Batch.findOne({ studyClass: { $ne: null }, instructor: { $ne: null } });
    
    if (!batch) {
        console.log('Valid batch not found. Creating one...');
        let studyClass = await StudyClass.findOne({});
        let instructor = await Instructor.findOne({});
        
        if (!studyClass || !instructor) {
            console.error('StudyClass or Instructor missing from DB. Run other seeds first.');
            process.exit(1);
        }
        
        batch = await Batch.create({
            name: 'Test Batch',
            studyClass: studyClass._id,
            instructor: instructor._id,
            students: []
        });
    }

    // 2. Assign student to this batch
    let student = await Student.findOne({ email: 'abhinavabhaidev@gmail.com' });
    if (!student) {
        console.error('Student abhinavabhaidev@gmail.com not found');
        process.exit(1);
    }

    student.batch = batch._id;
    await student.save();
    console.log(`✅ Student ${student.email} assigned to batch ${batch.name}`);

    if (!batch.students.includes(student._id)) {
        batch.students.push(student._id);
        await batch.save();
    }

    // 3. Seed FAQ Sessions
    await LiveClass.deleteMany({ batch: batch._id, type: 'faq' });
    const faculty = await Faculty.findOne({});
    
    await LiveClass.create({
        title: 'Thermodynamics Live Q&A',
        subject: 'Physics',
        faculty: faculty._id,
        batch: batch._id,
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        scheduledAt: new Date(Date.now() - 5 * 60 * 1000), // Ongoing
        duration: 60,
        status: 'ongoing',
        type: 'faq'
    });

    await LiveClass.create({
        title: 'Equation Solving Workshop',
        subject: 'Maths',
        faculty: faculty._id,
        batch: batch._id,
        meetingLink: 'https://meet.google.com/xyz-pdqr-stuv',
        scheduledAt: new Date(Date.now() + 10 * 60 * 60 * 1000), // Upcoming
        duration: 90,
        status: 'upcoming',
        type: 'faq'
    });

    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedLiveFAQ();
