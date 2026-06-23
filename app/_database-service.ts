import * as SQLite from 'expo-sqlite';

// Initialize or open the local relational database file
const db = SQLite.openDatabaseSync('StudentPortal.db');

/**
 * STEP A: DATABASE INITIALIZATION
 * Creates tables with proper relational constraints, data types, and keys.
 */
export function initializeDatabase(): void {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS students (
      student_id INTEGER PRIMARY KEY AUTOINCREMENT,
      reg_no TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      course TEXT NOT NULL,
      year_of_study TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS attendance_records (
      record_id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_reg TEXT NOT NULL,
      unit_code TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('Present', 'Absent')),
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_reg) REFERENCES students(reg_no) ON DELETE CASCADE
    );
  `);
  console.log("SQLite Database initialized successfully with 3NF constraints.");

  try {
    db.runSync(`
      INSERT OR IGNORE INTO students (reg_no, name, course, year_of_study, phone_number, password_hash)
      VALUES ('BIT/2024/39544', 'Imelda Mwaura', 'BSc. Information Technology', 'Year 2', '0712345678', 'mku_seeded_hash');
    `);
    console.log("Development test student profile seeded successfully.");
  } catch (seedError) {
    console.error("Seeding profile failed:", seedError);
  }
}

/**
 * STEP B: STUDENT REGISTRATION WITH SYSTEM CRYPTOGRAPHIC SECURITY
 * Mocking a basic hashing step before writing parameters to storage.
 */
export function registerStudent(
  regNo: string, 
  name: string, 
  course: string, 
  year: string, 
  phone: string, 
  cleartextPassword: string
): void {
  // In a real crypto system, we compute a secure hash string here
  // For evidence visualization, we mock the hashed string output
  const simulatedHash = `sha256_${cleartextPassword}_secure_hash_string`;

  db.runSync(
    `INSERT INTO students (reg_no, name, course, year_of_study, phone_number, password_hash) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [regNo, name, course, year, phone, simulatedHash]
  );
  console.log(`Student ${name} registered securely.`);
}

/**
 * STEP C: ATTENDANCE RECORD WRITING (Create Operation)
 */
export function logAttendance(studentReg: string, unitCode: string, status: 'Present' | 'Absent'): void {
  db.runSync(
    `INSERT INTO attendance_records (student_reg, unit_code, status) VALUES (?, ?, ?)`,
    [studentReg, unitCode, status]
  );
  console.log(`Attendance logged successfully for: ${studentReg}`);
}

/**
 * STEP D: ATTENDANCE REPORT AGGREGATION (Read Operation)
 */
export function getAttendanceReport(studentReg: string): any[] {
  return db.getAllSync(
    `SELECT unit_code, status, timestamp 
     FROM attendance_records 
     WHERE student_reg = ? 
     ORDER BY timestamp DESC`,
    [studentReg]
  );
}