
import motor.motor_async_client
import os

# In a production app, use environment variables
MONGODB_URL = os.environ.get("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = "algoviz_db"

class Database:
    client: motor.motor_async_client.AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    db_instance.client = motor.motor_async_client.AsyncIOMotorClient(MONGODB_URL)
    db_instance.db = db_instance.client[DB_NAME]
    print("Connected to MongoDB")

async def close_mongo_connection():
    db_instance.client.close()
    print("Closed MongoDB connection")

def get_database():
    return db_instance.db
