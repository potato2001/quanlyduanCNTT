from datetime import date
from pydantic import BaseModel
class UserSchema(BaseModel):
    userID =int
    userName=str
    userEmail=str
    userPassword=str
    userRole=int
    class Config:
        orm_mode = True

class StudentSchema(BaseModel):
    studentID=str
    studentEmail=str
    studentName=str
    studentDOB=date
    studentGender=str
    studentAddress=str
    studentPhone=str
    studentDatejoin=date
    studentParent=str
class TeacherSchema(BaseModel):
    teacherID=str
    teacherEmail=str
    teacherName=str
    teacherDOB=date
    teacherGender=str
    teacherAddress=str
    teacherPhone=str
    teacherDatejoin=date
class ImageSchema(BaseModel):
    userID=str
    image=str
class MajorSchema(BaseModel):
    majorID=str
    majorName=str
class ImageSchema(BaseModel):
    branchID=int
    branchName=str