const asyncHandler = require('express-async-handler');
const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Chapter = require('../models/Chapter');
const Batch = require('../models/Batch');
const RecordedClass = require('../models/RecordedClass');
const LiveClass = require('../models/LiveClass');
const Assignment = require('../models/Assignment');
const Test = require('../models/Test');

// @desc    Get dashboard summary for student
// @route   GET /api/student/dashboard
// @access  Private (Student)
const getDashboard = asyncHandler(async (req, res) => {
    const studentId = req.user._id;

  const studentBatch = await Batch.findOne({ students: studentId }).populate('studyClass instructor').lean();
  let assignedSubjects = [];
  if (studentBatch) {
    assignedSubjects = await Subject.find({ assignedTo: studentBatch._id }).lean();
  }

  const studentDetails = await Student.findById(studentId).select('hasPaid').lean();

  const recordedCount = await RecordedClass.countDocuments({ status: 'published' });
  const liveCount = await LiveClass.countDocuments({ status: { $in: ['upcoming', 'ongoing'] } });
  
  const totalAssignments = await Assignment.countDocuments();
  const assignmentsData = await Assignment.find({ 'submissions.studentId': studentId });
  const completedAssignments = assignmentsData.length;
  const pendingAssignments = totalAssignments - completedAssignments;

  res.status(200).json({
    success: true,
    data: {
      recordedClassesAvailable: recordedCount,
      upcomingLiveClasses: liveCount,
      pendingAssignments: pendingAssignments >= 0 ? pendingAssignments : 0,
      completionRate: totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0,
      
      hasPaid: studentDetails?.hasPaid || false,
      batch: studentBatch ? {
        id: studentBatch._id,
        name: studentBatch.name,
        className: studentBatch.studyClass?.name
      } : null,
      faculty: studentBatch?.instructor ? {
        id: studentBatch.instructor._id,
        name: studentBatch.instructor.name,
        email: studentBatch.instructor.email
      } : null,
      subjects: assignedSubjects.map(s => ({
        id: s._id,
        name: s.name,
        progress: Math.floor(Math.random() * 60) + 20
      }))
    }
  });
});

// @desc    Get all published recorded classes
// @route   GET /api/student/recorded-classes
// @access  Private (Student)
const getRecordedClasses = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const studentBatch = await Batch.findOne({ students: studentId });
  
  if (!studentBatch) {
    return res.status(200).json({ success: true, count: 0, data: [] });
  }

  const batchId = studentBatch._id;

  // 1. Find all subjects assigned to this batch
  const subjects = await Subject.find({ assignedTo: batchId }).lean();
  const subjectIds = subjects.map(s => s._id);

  // 2. Find all chapters assigned to this batch OR belonging to assigned subjects
  const chapters = await Chapter.find({
      $or: [
          { assignedTo: batchId },
          { subject: { $in: subjectIds } }
      ]
  }).lean();
  const chapterIds = chapters.map(c => c._id);

  // 3. Find only published videos specifically assigned to this batch
  const videos = await RecordedClass.find({
      status: 'published',
      assignedTo: batchId
  }).lean();

  // Combine into hierarchy matching MOCK_SUBJECTS format
  const colors = [
    { color: 'var(--color-primary)', bg: 'var(--color-primary-light)', icon: '📚' },
    { color: 'var(--color-success)', bg: 'var(--color-success-light)', icon: '🔬' },
    { color: 'var(--color-warning)', bg: 'var(--color-warning-light)', icon: '💻' },
    { color: 'var(--color-danger)', bg: 'var(--color-danger-light)', icon: '📐' }
  ];

  const hierarchy = subjects.map((sub, index) => {
    const cTheme = colors[index % colors.length];
    
    // Filter chapters belonging to this subject
    const subChapters = chapters.filter(c => c.subject?.toString() === sub._id.toString());
    
    const mappedChapters = subChapters.map(chap => {
       // Filter videos belonging to this chapter
       const chapVideos = videos.filter(v => v.chapter?.toString() === chap._id.toString());
       
       return {
         id: chap._id,
         title: chap.name,
         progress: 0, 
         videos: chapVideos.filter(v => v.contentType !== 'faq').map(v => ({
           id: v._id,
           title: v.title,
           duration: 'Varies',
           date: new Date(v.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
           videoUrl: v.videoUrl,
           description: v.description,
           type: 'lecture'
         })),
         faqs: chapVideos.filter(v => v.contentType === 'faq').map(v => ({
           id: v._id,
           title: v.title,
           date: new Date(v.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
           videoUrl: v.videoUrl,
           description: v.description,
           type: 'faq'
         })),
         notes: chap.notes || [],
         liveNotes: chap.liveNotes || [],
         dpps: chap.dpps || [],
         pyqs: chap.pyqs || []
       };
    });

    return {
      id: sub._id,
      title: sub.name,
      icon: cTheme.icon,
      color: cTheme.color,
      bg: cTheme.bg,
      chapters: mappedChapters
    };
  });

  res.status(200).json({ success: true, count: hierarchy.length, data: hierarchy });
});

// @desc    Get upcoming and past live classes
// @route   GET /api/student/live-classes
// @access  Private (Student)
const getLiveClasses = asyncHandler(async (req, res) => {
  const upcoming = await LiveClass.find({ status: 'upcoming' }).sort('scheduledAt');
  const past = await LiveClass.find({ status: { $in: ['completed', 'cancelled'] } }).sort('-scheduledAt');

  res.status(200).json({
    success: true,
    data: { upcoming, past }
  });
});

// @desc    Get student assignments
const getAssignments = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const studentBatch = await Batch.findOne({ students: studentId });
  if (!studentBatch) return res.status(200).json({ success: true, count: 0, data: [] });

  // Strictly filter by published items assigned to this batch
  const allAssignments = await Assignment.find({ 
    status: 'published',
    assignedBatches: studentBatch._id 
  }).sort('deadline');

  const data = allAssignments.map(a => {
    const doc = a.toObject();
    const submission = doc.submissions.find(s => s.studentId === studentId.toString());
    delete doc.submissions; 
    if (submission) {
      doc.studentStatus = (submission.marks != null) ? 'Graded' : 'Submitted';
      doc.mySubmission = submission;
    } else {
      doc.studentStatus = new Date(doc.deadline) < new Date() ? 'Overdue' : 'Pending';
    }
    return doc;
  });

  res.status(200).json({ success: true, count: data.length, data });
});

// @desc    Get student tests
const getTests = asyncHandler(async (req, res) => {
    const studentId = req.user._id;
    const studentBatch = await Batch.findOne({ students: studentId });
    if (!studentBatch) return res.status(200).json({ success: true, count: 0, data: [] });

    const tests = await Test.find({ 
        status: 'published',
        assignedTo: studentBatch._id 
    }).sort('deadline');

    res.status(200).json({ success: true, count: tests.length, data: tests });
});

// @desc    Get Main (Root) Assessments
const getMainAssessments = asyncHandler(async (req, res) => {
    const studentId = req.user._id;
    const studentBatch = await Batch.findOne({ students: studentId });
    if (!studentBatch) return res.status(200).json({ success: true, data: { tests: [], assignments: [] } });

    const tests = await Test.find({ 
        status: 'published', 
        isMain: true,
        assignedTo: studentBatch._id 
    }).lean();

    const assignments = await Assignment.find({ 
        status: 'published', 
        isMain: true,
        assignedBatches: studentBatch._id 
    }).lean();

    res.status(200).json({ success: true, data: { tests, assignments } });
});

const updateProfile = async (req, res) => {
    try {
        const user = await Student.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.school = req.body.school || user.school;
            user.studentClass = req.body.studentClass || user.studentClass;
            user.parentName = req.body.parentName || user.parentName;
            user.parentPhone = req.body.parentPhone || user.parentPhone;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                school: updatedUser.school,
                studentClass: updatedUser.studentClass,
                parentName: updatedUser.parentName,
                parentPhone: updatedUser.parentPhone,
                profilePhoto: updatedUser.profilePhoto, 
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get live FAQ sessions (Upcoming, Ongoing, Past)
const getLiveFaqSessions = asyncHandler(async (req, res) => {
    const studentId = req.user._id;
    const studentBatch = await Batch.findOne({ students: studentId });
    
    if (!studentBatch) {
        return res.status(200).json({ success: true, data: [] });
    }

    const sessions = await LiveClass.find({
        batch: studentBatch._id,
        type: 'faq'
    })
    .populate('faculty', 'name')
    .sort({ scheduledAt: -1 });

    res.status(200).json({ success: true, data: sessions });
});

const mockPayment = asyncHandler(async (req, res) => {
  const user = await Student.findById(req.user._id);
  if (user) {
    user.hasPaid = true;
    await user.save();
    res.status(200).json({ success: true, message: 'Payment successful! Dashboard unlocked.' });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

module.exports = {
  getDashboard,
  getRecordedClasses,
  getLiveClasses,
  getAssignments,
  getTests,
  getMainAssessments,
  getLiveFaqSessions,
  updateProfile,
  mockPayment
};
