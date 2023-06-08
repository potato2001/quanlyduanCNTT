from fastapi import Depends, FastAPI, Request, Form,status,Header,APIRouter
from fastapi.responses import HTMLResponse, JSONResponse
from sqlalchemy import exists
import base64
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from datetime import date
from auth.auth_bearer import JWTBearer
from auth.auth_handler import signJWT,decodeJWT,refresh_access_token
from model import SubjectSchema, MajorSchema
import schema
from database import SessionLocal, engine
import model

router = APIRouter()
model.Base.metadata.create_all(bind=engine)

def get_database_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@router.post("/create_subject")
async def create_subject(
    db: Session = Depends(get_database_session),
    subjectID: str = Form(...),
    subjectName: str = Form(...),
    majorID: str = Form(...),
    subjectCredit: str = Form(...)
    ):
    subject_exists = db.query(exists().where(SubjectSchema.subjectID == subjectID)).scalar()
    if subject_exists:
        return {"data": "Trùng mã môn!"}

    subjectSchema = SubjectSchema(subjectID = subjectID, subjectName = subjectName, majorID = majorID, subjectCredit = subjectCredit)
    db.add(subjectSchema)
    db.commit()
    db.refresh(subjectSchema)
    return {
            "data": "Tạo môn học thành công!"
        }

@router.post("/update_subject")
async def update_subject(
    db: Session = Depends(get_database_session),
    subjectID: str = Form(...),
    subjectName: str = Form(...),
    majorID: str = Form(...),
    subjectCredit: str = Form(...)
    ):
    subject_exists = db.query(exists().where(SubjectSchema.subjectID == subjectID)).scalar()

    subject = db.query(SubjectSchema).get(subjectID)
    if subject_exists:
        print(subject)

        subject.subjectName = subjectName
        subject.majorID = majorID
        subject.subjectCredit = subjectCredit

        db.commit()
        db.refresh(subject)

        return {
            "data": "Thông tin môn học đã được cập nhật!"
        }
    else:
        return JSONResponse(status_code=400, content={"message": "Không có thông tin môn học!"})