import 'dotenv/config';
import bcrypt from 'bcrypt';
import { initDbSchema } from './schema';
import { getDatabase } from './connection';

initDbSchema();

const db = getDatabase();

db.exec(`DELETE FROM interactions; DELETE FROM drugs; DELETE FROM users;`);

const passwordHash = bcrypt.hashSync('Abcd1234!', 10);
db.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)')
.run(
  'yura.zharkovsky@seegnal.com',
  passwordHash,
  'Yura Zharkovsky',
);

console.log('[Seed] User inserted');

const drugNames = [
  'Sitagliptin 50 mg / Metformin 500 mg',
  'Metformin 850 mg',
  'Apixaban 5 mg',
  'Acalabrutinib 100 mg',
  'Pantoprazole 20 mg',
  'Amlodipine 5 mg',
  'Simvastatin 40 mg',
];

const insertDrug = db.prepare('INSERT INTO drugs (name) VALUES (?)');
for (const name of drugNames) {
  insertDrug.run(name);
}
console.log('[Seed] Drugs inserted');

const getDrugId = (name: string): number => {
  const row = db.prepare('SELECT id FROM drugs WHERE name = ?').get(name) as { id: number };
  return row.id;
};

const insertInteraction = db.prepare(
  'INSERT INTO interactions (drug1_id, drug2_id, severity, message) VALUES (?, ?, ?, ?)',
);

insertInteraction.run(getDrugId('Simvastatin 40 mg'),   getDrugId('Amlodipine 5 mg'),      'MAJOR',    'Risk of Myopathy');
insertInteraction.run(getDrugId('Apixaban 5 mg'),       getDrugId('Acalabrutinib 100 mg'), 'MAJOR',    'Increased Bleeding Risk');
insertInteraction.run(getDrugId('Metformin 850 mg'),    getDrugId('Pantoprazole 20 mg'),   'MODERATE', 'Increased Metformin Plasma Concentration'); // not real, just for testing purposes
console.log('[Seed] Interactions inserted');

console.log('[Seed] Completed');