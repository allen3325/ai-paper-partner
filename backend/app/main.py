from fastapi import FastAPI
import logging
from app.config import PORT
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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

