from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

# ========== Base Schema ==========
class PaperBase(BaseModel):
    """Paper 基礎 schema"""
    title: str = Field(..., min_length=1, max_length=500, description="論文標題")
    authors: Optional[str] = Field(None, max_length=1000, description="作者")
    source_file_path: str = Field(..., min_length=1, max_length=500, description="檔案路徑")


# ========== Request Schemas ==========
class PaperCreate(PaperBase):
    """建立 Paper 的 request schema"""
    project_id: UUID = Field(..., description="所屬專案 ID")
    upload_user: str = Field(..., min_length=1, max_length=255, description="上傳者")


class PaperUpdate(BaseModel):
    """更新 Paper 的 request schema"""
    title: Optional[str] = Field(None, min_length=1, max_length=500)
    authors: Optional[str] = Field(None, max_length=1000)


# ========== Response Schemas ==========
class PaperResponse(PaperBase):
    """Paper 的基本 response schema"""
    paper_id: UUID
    project_id: UUID
    upload_user: str
    upload_time: datetime
    
    model_config = ConfigDict(from_attributes=True)


class PaperDetail(PaperResponse):
    """Paper 詳細資訊（包含統計資訊）"""
    chunk_count: Optional[int] = Field(None, description="文本塊數量")
    
    model_config = ConfigDict(from_attributes=True)


# ========== 包含 Project 資訊的 Response（需要手動 join）==========
class PaperWithProject(PaperResponse):
    """Paper 包含 Project 資訊"""
    project_name: str = Field(..., description="專案名稱")
    project_user_id: str = Field(..., description="專案擁有者 ID")
    
    model_config = ConfigDict(from_attributes=True)