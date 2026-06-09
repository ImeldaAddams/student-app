// app/database.ts
import * as SQLite from 'expo-sqlite';

// Open or automatically generate the database file asynchronously
export const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('student_records.db');
};

/**
 * Week 4 Data Management Task: Table Schema Creation
 * Generates a permanent local SQLite table matching your requirements 
 */
export const initializeDatabase = async () => {
  const db = await openDatabase();
  
  // Create table structure using strict database primitives 
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      course TEXT NOT NULL
    );
  `);
};

/**
 * CRUD: CREATE Operation
 * Inserts a new record into local storage using parameterized input queries 
 */
export const insertStudent = async (name: string, course: string) => {
  const db = await openDatabase();
  const result = await db.runAsync(
    'INSERT INTO Students (name, course) VALUES (?, ?);',
    [name, course]
  );
  return result.lastInsertRowId; // Returns the autoincremented record primary key 
};

/**
 * CRUD: READ Operation
 * Retrieves the full permanent database array to populate a dynamic UI list [cite: 3, 7]
 */
export const fetchStudents = async () => {
  const db = await openDatabase();
  const allRows = await db.getAllAsync('SELECT * FROM Students ORDER BY id DESC;');
  return allRows as { id: number; name: string; course: string }[];
};