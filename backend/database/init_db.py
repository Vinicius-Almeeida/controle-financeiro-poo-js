import sqlite3

def criar_tabela():
    conn = sqlite3.connect('backend/database/database.db')
    cursor = conn.cursor()
    cursor.execute("""
                   CREATE TABLE IF NOT EXISTS lancamentos (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   data TEXT NOT NULL,
                   tipo TEXT NOT NULL,
                   valor REAL NOT NULL,
                   descricao TEXT NOT NULL
                   )
             """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    criar_tabela()