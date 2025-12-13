from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

# ========== Base Schema ==========
class ChunkBase(BaseModel):
    """Chunk 基礎 schema"""
    chunk_index: int = Field(..., ge=0, description="文本塊索引")
    text: str = Field(..., min_length=1, description="文本內容")
    char_start: int = Field(..., ge=0, description="字元起始位置")
    char_end: int = Field(..., ge=0, description="字元結束位置")
    page_start: Optional[int] = Field(None, ge=0, description="起始頁碼")
    page_end: Optional[int] = Field(None, ge=0, description="結束頁碼")
    milvus_vector_id: Optional[str] = Field(None, max_length=255, description="Milvus 向量 ID")


# ========== Request Schemas ==========
class ChunkCreate(ChunkBase):
    """建立 Chunk 的 request schema"""
    paper_id: UUID = Field(..., description="所屬論文 ID")


class ChunkUpdate(BaseModel):
    """更新 Chunk 的 request schema"""
    text: Optional[str] = Field(None, min_length=1)
    milvus_vector_id: Optional[str] = Field(None, max_length=255)


# ========== Response Schemas ==========
class ChunkResponse(ChunkBase):
    """Chunk 的基本 response schema"""
    chunk_id: UUID
    paper_id: UUID
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)