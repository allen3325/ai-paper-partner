# project.py
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Project(Base):
    """projects table"""
    __tablename__ = "projects"
    
    project_id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4,
        index=True
    )
    
    user_id = Column(String(255), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    
    # 用 JSONB
    objectives = Column(JSONB)
    
    project_tags = Column(ARRAY(String))
    
    created_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(),
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True), 
        onupdate=func.now()
    )
    
    # Relationships
    papers = relationship(
        "Paper",                      # 目標 Model
        cascade="all, delete-orphan"  # 刪除專案時刪除所有論文
    )
    conversations = relationship(
        "Conversation",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self):
        return f"<Project(project_id={self.project_id}, name='{self.name}')>"