from flask import Flask, request, jsonify
from database import db
from models import Patient, MedicalRecord
import os
import pytesseract
from PIL import Image


app = Flask(__name__)

# Tesseract OCR path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

os.makedirs("uploads", exist_ok=True)

# SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///meditrace.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Connect database
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return "MediTrace Backend is Running!"


# Test API
@app.route("/api/test")
def test_api():
    return {"message": "API is working!"}


# Create patient
@app.route("/api/patients", methods=["POST"])
def create_patient():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    if "name" not in data or "age" not in data:
        return jsonify({"error": "Name and age are required"}), 400

    patient = Patient(
        name=data["name"],
        age=data["age"],
        phone=data.get("phone"),
        blood_group=data.get("blood_group")
    )

    db.session.add(patient)
    db.session.commit()

    return jsonify({
        "message": "Patient created successfully!",
        "patient": patient.to_dict()
    }), 201


# Get all patients
@app.route("/api/patients", methods=["GET"])
def get_patients():
    patients = Patient.query.all()

    return jsonify([
        patient.to_dict()
        for patient in patients
    ])
# Create medical record
@app.route("/api/patients/<int:patient_id>/records", methods=["POST"])
def create_record(patient_id):

    # Check if patient exists
    patient = Patient.query.get(patient_id)

    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    if "diagnosis" not in data:
        return jsonify({"error": "Diagnosis is required"}), 400

    record = MedicalRecord(
        patient_id=patient_id,
        diagnosis=data["diagnosis"],
        doctor=data.get("doctor"),
        notes=data.get("notes")
    )

    db.session.add(record)
    db.session.commit()

    return jsonify({
        "message": "Medical record created successfully!",
        "record": record.to_dict()
    }), 201


# Get patient's medical records
@app.route("/api/patients/<int:patient_id>/records", methods=["GET"])
def get_records(patient_id):

    patient = Patient.query.get(patient_id)

    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    records = MedicalRecord.query.filter_by(
        patient_id=patient_id
    ).all()

    return jsonify([
        record.to_dict()
        for record in records
    ])
# Upload prescription image
@app.route("/api/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"error": "No image selected"}), 400

    # Save image
    image.save("uploads/" + image.filename)

    return jsonify({
        "message": "Image uploaded successfully!",
        "filename": image.filename
    })

if __name__ == "__main__":
    app.run(debug=True)