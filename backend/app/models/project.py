# models.py
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSON
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Project(Base):
    """專案表"""
    __tablename__ = "projects"
    
    # PostgreSQL 原生 UUID 類型
    project_id = Column(
        UUID(as_uuid=True), 
        primary_key=True, 
        default=uuid.uuid4,
        index=True
    )
    
    user_id = Column(String(255), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    
    # PostgreSQL JSON/JSONB 類型
    objectives = Column(JSON)
    
    # PostgreSQL 原生 ARRAY 類型
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
    
    def __repr__(self):
        return f"<Project(project_id={self.project_id}, name='{self.name}')>"