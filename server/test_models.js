require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Batch = require('./models/Batch');
const Notification = require('./models/Notification');
const RecordedClass = require('./models/RecordedClass');

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        // 1. Create Instructor
        const instructor = new User({
            name: "Test Instructor",
            email: `instructor_${Date.now()}@test.com`,
            password: "password123",
            role: "instructor"
        });
        await instructor.save();
        console.log("Instructor created:", instructor._id);

        // 2. Create Student
        const student = new User({
            name: "Test Student",
            email: `student_${Date.now()}@test.com`,
            password: "password123",
            role: "student",
            instructorNotes: []
        });
        await student.save();
        console.log("Student created:", student._id);

        // 3. Create Batch
        const batch = new Batch({
            name: "Test Batch",
            instructor: instructor._id,
            students: [student._id]
        });
        await batch.save();
        console.log("Batch created:", batch._id);

        // 4. Create Notification
        const notif = new Notification({
            message: "Test message",
            recipient: "all",
            sender: instructor._id
        });
        await notif.save();
        console.log("Notification created:", notif._id);

        // 5. Add Note to Student
        student.instructorNotes.push({ note: "Needs to watch recordings" });
        await student.save();
        console.log("Note added to student:", student.instructorNotes.length);
        
        console.log("All DB model tests passed successfully!");
    } catch(err) {
        console.error("Test failed:", err);
    } finally {
        await mongoose.disconnect();
    }
}

run();
