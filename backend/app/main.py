from fastapi import FastAPI ,Depends,HTTPException,Path
from uuid import UUID
import logging
from app.config import PORT
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.project import Project

app = FastAPI()

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # 允許所有來源訪問（* = 全部）
    allow_credentials=True,   # 允許帶 cookies/認證資訊
    allow_methods=["*"],      # 允許所有 HTTP 方法（GET, POST, PUT, DELETE...）
    allow_headers=["*"],      # 允許所有 headers
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/health")
def health():
    logger.info("health check")
    return JSONResponse(status_code=200,content={"status":"ok"})

@app.get("/projects/{project_id}")
def get_project(
    project_id: UUID = Path(..., description="Project UUID"),  # ✅ FastAPI 自動驗證
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(
        Project.project_id == project_id
    ).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {
        "project_id": str(project.project_id),
        "name": project.name,
        "description": project.description,
        "tags": project.project_tags,
        "objectives": project.objectives
    }


