import os
import psycopg2


class VectorStore:

    def __init__(self):
        self.db_url = os.getenv("DATABASE_URL")

    def search(self, query_embedding):

        conn = None
        cursor = None

        try:
            # open fresh connection
            conn = psycopg2.connect(self.db_url)
            cursor = conn.cursor()

            cursor.execute(
                """
                SELECT content
                FROM documents
                ORDER BY embedding <-> %s::vector
                LIMIT 5
                """,
                (query_embedding.tolist(),)
            )

            rows = cursor.fetchall()

            return [row[0] for row in rows]

        except Exception as e:
            print("Vector search error:", e)
            return []

        finally:
            if cursor:
                cursor.close()

            if conn:
                conn.close()