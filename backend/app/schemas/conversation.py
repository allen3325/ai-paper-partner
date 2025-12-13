from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any, Optional
from datetime import datetime
from uuid import UUID

# ========== 嵌套 Schema ==========
class MessageSchema(BaseModel):
    """訊息 schema"""
    role: str = Field(..., pattern="^(user|assistant)$", description="角色：user 或 assistant")
    content: str = Field(..., min_length=1, description="訊息內容")
    timestamp: datetime = Field(..., description="時間戳記")


# ========== Base Schema ==========
class ConversationBase(BaseModel):
    """Conversation 基礎 schema"""
    messages: List[MessageSchema] = Field(default_factory=list, description="訊息列表")


# ========== Request Schemas ==========
class ConversationCreate(BaseModel):
    """建立 Conversation 的 request schema"""
    project_id: UUID = Field(..., description="所屬專案 ID")
    user_id: str = Field(..., min_length=1, max_length=255, description="使用者 ID")
    messages: List[MessageSchema] = Field(default_factory=list, description="初始訊息")


class ConversationUpdate(BaseModel):
    """更新 Conversation 的 request schema"""
    messages: Optional[List[MessageSchema]] = Field(None, description="訊息列表")


class MessageAdd(BaseModel):
    """新增單一訊息的 request schema"""
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1)


# ========== Response Schemas ==========
class ConversationResponse(BaseModel):
    """Conversation 的基本 response schema"""
    conv_id: UUID
    project_id: UUID
    user_id: str
    messages: List[Dict[str, Any]]  # JSONB 欄位直接返回
    last_updated: datetime
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class ConversationDetail(ConversationResponse):
    """Conversation 詳細資訊"""
    message_count: Optional[int] = Field(None, description="訊息數量")
    
    model_config = ConfigDict(from_attributes=True)


# ========== 包含 Project 資訊的 Response（需要手動 join）==========
class ConversationWithProject(ConversationResponse):
    """Conversation 包含 Project 資訊"""
    project_name: str = Field(..., description="專案名稱")
    
    model_config = ConfigDict(from_attributes=True)