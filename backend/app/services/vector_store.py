import psycopg2
from app.core.config import DATABASE_URL


class VectorStore:

    def __init__(self):
        """
        Initialize Neon PostgreSQL connection
        """
        self.conn = psycopg2.connect(DATABASE_URL)


    def insert(self, content, embedding):
        """
        Insert document and embedding into vector DB
        """

        cursor = self.conn.cursor()

        # Convert numpy vector -> pgvector string format
        vector_str = "[" + ",".join(map(str, embedding.tolist())) + "]"

        query = """
        INSERT INTO documents (content, embedding)
        VALUES (%s, %s::vector)
        """

        cursor.execute(query, (content, vector_str))

        self.conn.commit()

        cursor.close()


    def search(self, embedding, limit=3):
        """
        Perform vector similarity search
        """

        cursor = self.conn.cursor()

        vector_str = "[" + ",".join(map(str, embedding.tolist())) + "]"

        query = """
        SELECT content
        FROM documents
        ORDER BY embedding <-> %s::vector
        LIMIT %s
        """

        cursor.execute(query, (vector_str, limit))

        rows = cursor.fetchall()

        cursor.close()

        return [row[0] for row in rows]


    def get_all_documents(self):
        """
        Fetch all stored documents (useful for debugging)
        """

        cursor = self.conn.cursor()

        cursor.execute("SELECT id, content FROM documents")

        rows = cursor.fetchall()

        cursor.close()

        return rows


    def delete_all(self):
        """
        Remove all documents
        """

        cursor = self.conn.cursor()

        cursor.execute("DELETE FROM documents")

        self.conn.commit()

        cursor.close()