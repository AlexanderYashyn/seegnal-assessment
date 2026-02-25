import { getDatabase } from './connection';

export function initDbSchema(): void {
    const db = getDatabase();

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        email         TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name          TEXT NOT NULL DEFAULT '',
        created_at    TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS drugs (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE INDEX IF NOT EXISTS idx_drugs_name ON drugs(name);

        CREATE TABLE IF NOT EXISTS interactions (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        drug1_id  INTEGER NOT NULL REFERENCES drugs(id),
        drug2_id  INTEGER NOT NULL REFERENCES drugs(id),
        severity  TEXT NOT NULL CHECK (severity IN ('MAJOR', 'MODERATE')),
        message   TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_interactions_pair     ON interactions(drug1_id, drug2_id);
        CREATE INDEX IF NOT EXISTS idx_interactions_pair_rev ON interactions(drug2_id, drug1_id);
    `);

    // Migration: add name column to existing databases
    try {
        db.exec(`ALTER TABLE users ADD COLUMN name TEXT NOT NULL DEFAULT ''`);
    } catch {
        // Column already exists — safe to ignore
    }

    console.log('Database schema initialized');
}