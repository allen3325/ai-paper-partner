# paper.py
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Paper(Base):
    """papers table"""
    __tablename__ = "papers"
    
    paper_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True
    )
    
    project_id = Column(
        UUID(as_uuid=True),
        ForeignKey("projects.project_id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    title = Column(String(500), nullable=False)
    authors = Column(String(1000))
    source_file_path = Column(String(500), nullable=False)
    upload_user = Column(String(255), nullable=False)
    upload_time = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    
    # Relationships
    chunks = relationship(
        "Chunk",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self):
        return f"<Paper(paper_id={self.paper_id}, title='{self.title}')>"