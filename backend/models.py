from database import db
from datetime import datetime


class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    blood_group = db.Column(db.String(10), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "phone": self.phone,
            "blood_group": self.blood_group,
            "created_at": self.created_at.isoformat()
        }
class MedicalRecord(db.Model):
    __tablename__ = "medical_records"

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(
        db.Integer,
        db.ForeignKey("patients.id"),
        nullable=False
    )
    diagnosis = db.Column(db.String(200), nullable=False)
    doctor = db.Column(db.String(100), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "diagnosis": self.diagnosis,
            "doctor": self.doctor,
            "notes": self.notes,
            "date": self.date.isoformat()
        }