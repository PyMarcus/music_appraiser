import os

from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename

from src import run

os.chdir(os.path.dirname(os.path.abspath(__file__)))
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '.'
app.config['ALLOWED_EXTENSIONS'] = {'csv'}


@app.route("/")
def index() -> str:
    return render_template("kmeans.html")


@app.route("/upload", methods=["POST"])
def upload() -> str:
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        run(file_path)
        return kmeans_template()
    return jsonify({'error': 'Invalid file format'}), 400


def kmeans_template() -> str:
    return render_template("kmeans.html", image="result.png")


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=False)
