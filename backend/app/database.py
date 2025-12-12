from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

Base = declarative_base()
DATABASE_URL = "postgresql://ai_paper_partner:password@localhost:5432/ai_paper_partner_db"
engine = create_engine(DATABASE_URL,echo=True)
DBSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

session = DBSession()

def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()



