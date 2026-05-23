import os

from flask import Blueprint, request

from pypdf import PdfReader


upload_bp = Blueprint(
    "upload",
    __name__
)


UPLOAD_FOLDER = "uploads"


@upload_bp.route(
    "/upload-resume",
    methods=["POST"]
)

def upload_resume():

    if "resume" not in request.files:

        return {
            "error": "No file uploaded"
        }, 400

    file = request.files["resume"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    text = extract_text(filepath)

    return {
        "filename": file.filename,
        "text": text
    }


def extract_text(pdf_path):

    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:

        extracted = page.extract_text()

        if extracted:
            text += extracted

    return text