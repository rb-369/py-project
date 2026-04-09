import sqlite3
import config # type: ignore
from tkinter import messagebox
import typing

class Database:
    def __init__(self):
        self.connection: typing.Any = None
        self.cursor: typing.Any = None
        self.connect()

    def connect(self):
        """Establish a connection to the SQLite database."""
        try:
            self.connection = sqlite3.connect(config.DB_PATH)
            self.connection.row_factory = sqlite3.Row
            self.connection.execute("PRAGMA foreign_keys = ON")
            self.cursor = self.connection.cursor()
            print("DEBUG: Successfully connected to SQLite database")
        except sqlite3.Error as e:
            messagebox.showerror("Database Error", f"Failed to connect to SQLite database.\nError: {e}")
            print(f"Error while connecting to SQLite: {e}")
            self.connection = None
            self.cursor = None

    @staticmethod
    def _normalize_query(query: str) -> str:
        """Allow legacy MySQL parameter style (%s) to run on SQLite."""
        return query.replace("%s", "?")

    @staticmethod
    def _row_to_dict(row: typing.Any) -> typing.Any:
        if isinstance(row, sqlite3.Row):
            return dict(row)
        return row

    def execute_query(self, query, params=None):
        """Execute a single query (INSERT, UPDATE, DELETE)."""
        if self.connection:
            try:
                self.cursor.execute(self._normalize_query(query), params or ())
                self.connection.commit()
                return self.cursor.lastrowid
            except sqlite3.Error as e:
                print(f"Error executing query: {e}")
                self.connection.rollback()
                return None
        return None

    def fetch_all(self, query, params=None):
        """Fetch multiple rows from a SELECT query."""
        if self.connection:
            try:
                self.cursor.execute(self._normalize_query(query), params or ())
                return [self._row_to_dict(row) for row in self.cursor.fetchall()]
            except sqlite3.Error as e:
                print(f"Error fetching data: {e}")
                return []
        return []

    def fetch_one(self, query, params=None):
        """Fetch a single row from a SELECT query."""
        if self.connection:
            try:
                self.cursor.execute(self._normalize_query(query), params or ())
                return self._row_to_dict(self.cursor.fetchone())
            except sqlite3.Error as e:
                print(f"Error fetching data: {e}")
                return None
        return None

    def close(self):
        """Close the database connection and cursor."""
        try:
            if self.cursor:
                self.cursor.close()
            if self.connection:
                self.connection.close()
            print("SQLite connection is closed.")
        except Exception as e:
            print(f"Error during database close: {e}")
