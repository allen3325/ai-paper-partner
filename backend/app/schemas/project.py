from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

# ========== Base Schema ==========
class ProjectBase(BaseModel):
    """Project 基礎 schema"""
    name: str = Field(..., min_length=1, max_length=255, description="專案名稱")
    description: Optional[str] = Field(None, description="專案描述")
    objectives: Optional[Dict[str, Any]] = Field(None, description="專案目標")
    project_tags: Optional[List[str]] = Field(None, description="專案標籤")


# ========== Request Schemas ==========
class ProjectCreate(ProjectBase):
    """建立 Project 的 request schema"""
    user_id: str = Field(..., min_length=1, max_length=255, description="使用者 ID")


class ProjectUpdate(BaseModel):
    """更新 Project 的 request schema"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    objectives: Optional[Dict[str, Any]] = None
    project_tags: Optional[List[str]] = None


# ========== Response Schemas ==========
class ProjectResponse(ProjectBase):
    """Project 的基本 response schema"""
    project_id: UUID
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)


class ProjectDetail(ProjectResponse):
    """Project 詳細資訊（包含統計資訊）"""
    paper_count: Optional[int] = Field(None, description="論文數量")
    conversation_count: Optional[int] = Field(None, description="對話數量")
    
    model_config = ConfigDict(from_attributes=True)