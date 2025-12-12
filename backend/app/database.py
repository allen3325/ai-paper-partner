from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')

Base = declarative_base()
engine = create_engine(DATABASE_URL,echo=True)
DBSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()



