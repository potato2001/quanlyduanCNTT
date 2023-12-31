from typing import Text
from sqlalchemy import Column,Date,BLOB,ForeignKey
from sqlalchemy.types import String, Integer, Text, Float,Double

from database import Base
from sqlalchemy.orm import  relationship


#Tài khoản
class UserSchema(Base):
    __tablename__="user"
    userID = Column(Integer, primary_key=True, index=True)
    userName=Column(String(45), unique=True)
    userEmail=Column(String(45),unique=True)
    userPassword=Column(String(45))
    userRole=Column(Integer)

#Sinh viên
class StudentSchema(Base):
    __tablename__="student"
    studentID = Column(String(6),primary_key=True, index=True)
    studentEmail=Column(String(45),unique=True)
    studentName=Column(String(45))
    studentK=Column(Integer)
    studentDOB=Column(Date)
    studentGender=Column(String(4))
    studentAddress=Column(String(45))
    studentPhone=Column(String(10))
    studentYearJoin=Column(Integer)
    studentParent=Column(String(45))
    branchID=Column(Integer)
    group=Column(Integer)
    status=Column(Integer)

#Giáo viên
class TeacherSchema(Base):
    __tablename__="teacher"
    teacherID = Column(String(6),primary_key=True, index=True)
    teacherEmail=Column(String(45),unique=True)
    teacherName=Column(String(45))
    teacherDOB=Column(Date)
    teacherGender=Column(String(4))
    teacherAddress=Column(String(45))
    teacherPhone=Column(String(10))
    teacherDatejoin=Column(Date)
    majorID=Column(String(6))
    branchID=Column(Integer)

#Avatar
class ImageSchema(Base):
    __tablename__="image"
    imageID=Column(Integer,primary_key=True,index=True)
    userName=Column(String(6),primary_key=True, index=True)
    image=Column(String)

#Khoa
class MajorSchema(Base):
    __tablename__="major"
    majorID=Column(String(6),primary_key=True, index=True)
    majorName=Column(String)
    majorELO=Column(Integer)
#Ngành
class BranchSchema(Base):
    __tablename__="branch"
    branchID=Column(Integer(),primary_key=True, index=True)
    branchName=Column(String)
    majorID=Column(String)
    groupEnd=Column(Integer)

#Môn học
class SubjectSchema(Base):

    __tablename__="subject"
    subjectID=Column(String(5), primary_key=True, index=True)
    subjectName=Column(String(100))
    subjectCredit=Column(Integer)
    Coefficient=Column(Float)

#Chương trình
class CourseSchema(Base):
    __tablename__ = "course"
    courseID = Column(Integer, primary_key=True)
    subjectID = Column(String(5))
    className = Column(String(30), unique=True)
    courseDate = Column(Integer)
    courseShiftStart = Column(Integer)
    courseShiftEnd = Column(Integer)
    courseRoom = Column(String(15))
    termID = Column(String(8))
    teacherID = Column(String(6), ForeignKey("teacher.teacherID"))


#Phiếu báo điểm
class GradeSchema(Base):
    __tablename__="grade"
    gradeID=Column(Integer, primary_key=True)
    studentID=Column(String(6), ForeignKey("student.studentID"))
    termID=Column(String(9), ForeignKey("term.termID"))
    subjectID=Column(String(6), ForeignKey("subject.subjectID"))
    progressGrade=Column(Float)
    examGrade1=Column(Float)
    examGrade2=Column(Float)
    finalGrade=Column(Float)
    status=Column(Integer)

#Nhóm
class GroupSchema(Base):
    __tablename__="group"
    groupID=Column(String(10), primary_key=True)
    groupName=Column(String(45))
    groupYear=Column(String(15))
    groupTerm=Column(Integer)

#Năm
class YearSchema(Base):
    __tablename__="year"
    yearID=Column(Integer, primary_key=True)
    yearStart=Column(Date)
    yearEnd=Column(Date)

#Lớp học
class ClassSchema(Base):
    __tablename__="class"
    classID=Column(Integer, primary_key=True)
    courseID=Column(Integer, ForeignKey("course.courseID"))
    studentID=Column(String(5), ForeignKey("student.studentID"))
    termID=Column(String)
    status=Column(Integer)

#Học kỳ
class TermSchema(Base):
    __tablename__="term"
    id=Column(Integer,primary_key=True)
    termID=Column(String, primary_key=True)
    termName=Column(String)
    termStart=Column(Date)
    termEnd=Column(Date)
    groupID=Column(Integer)
    yearID=Column(Integer, ForeignKey("year.yearID"))

#Môn thuộc ngành
class BranchSubjectSchema(Base):
    __tablename__="branchsubject"
    id=Column(Integer, primary_key=True)
    subjectID=Column(String, ForeignKey("subject.subjectID"))
    branchID=Column(Integer, ForeignKey("branch.branchID"))

#Lịch thi
class ExamSchema(Base):
    __tablename__="exam"
    examID=Column(Integer,primary_key=True)
    subjectID=Column(String(5))
    examShiftStart=Column(String)
    examShiftEnd=Column(String)
    examDate=Column(Date)
    termID=Column(String)
    

#Đăng ký thi
class StudentExamSchema(Base):
    __tablename__="studentexam"
    id=Column(Integer, primary_key=True)
    studentID=Column(String(5))
    examID=Column(Integer)
    status=Column(Integer)