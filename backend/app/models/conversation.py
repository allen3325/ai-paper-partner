# conversation.py
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Conversation(Base):
    """conversations table"""
    __tablename__ = "conversations"
    
    conv_id = Column(
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
    
    user_id = Column(String(255), nullable=False, index=True)
    
    # 使用 JSONB 儲存訊息陣列
    messages = Column(JSONB, default=list)
    
    last_updated = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
    
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    
    def __repr__(self):
        return f"<Conversation(conv_id={self.conv_id}, user_id='{self.user_id}')>"