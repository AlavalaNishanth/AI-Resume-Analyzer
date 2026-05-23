from flask import Flask

from flask_cors import CORS

from routes.upload import upload_bp

from routes.analyze import analyze_bp



app = Flask(__name__)

CORS(app)

app.register_blueprint(upload_bp)

app.register_blueprint(analyze_bp)


@app.route("/")
def home():

    return {
        "message": "Backend Running"
    }


if __name__ == "__main__":

    app.run(debug=True)