# chunk.py
from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Chunk(Base):
    """chunks table"""
    __tablename__ = "chunks"
    
    chunk_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )
    
    paper_id = Column(
        UUID(as_uuid=True),
        ForeignKey("papers.paper_id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    chunk_index = Column(Integer, nullable=False)
    text = Column(Text, nullable=False)
    char_start = Column(Integer, nullable=False)
    char_end = Column(Integer, nullable=False)
    page_start = Column(Integer)
    page_end = Column(Integer)
    milvus_vector_id = Column(String(255), index=True)
    
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    
    def __repr__(self):
        return f"<Chunk(chunk_id={self.chunk_id}, chunk_index={self.chunk_index})>"