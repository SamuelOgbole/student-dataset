const fs = require('fs');

const NUM_RECORDS = 50;
const DEPARTMENTS = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Cyber Security',
  'Data Science'
];
const LEVELS = [100, 200, 300, 400];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateDataset(count) {
  const students = [];

  for (let i = 1; i <= count; i++) {
    const studentId = `STU${String(i).padStart(3, '0')}`;
    const department = getRandomElement(DEPARTMENTS);
    const level = getRandomElement(LEVELS);
    
    const attendancePercentage = `${getRandomInt(60, 100)}%`;
    
    const avgExamScore = getRandomInt(45, 98);

    students.push({
      studentId,
      department,
      level,
      attendancePercentage,
      avgExamScore
    });
  }

  return students;
}

function convertToCSV(data) {
  const headers = ['Student ID', 'Department', 'Level', 'Attendance Percentage', 'Average Examination Score'];
  const rows = data.map(item => [
    item.studentId,
    `"${item.department}"`,
    item.level,
    item.attendancePercentage,
    item.avgExamScore
  ]);

  return [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
}

const studentData = generateDataset(NUM_RECORDS);
const csvContent = convertToCSV(studentData);

fs.writeFileSync('students_dataset.csv', csvContent, 'utf8');
console.log(`✅ Successfully generated ${NUM_RECORDS} student records in 'students_dataset.csv'`);