from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  # Import CORS to handle cross-origin requests
import json
import os

app = Flask(__name__)

# Allow CORS for frontend on port 5501 (adjust if frontend port changes)
cors = CORS(app, resources={r"/*": {"origins": "https://radiant-trifle-5e9672.netlify.app/"}})


DATA_FILE = 'users.json'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    user_data = request.get_json()
    username = user_data['username']
    email = user_data['email']
    password = user_data['password']

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            users = json.load(file)
            if not isinstance(users, list):
                users = []
    else:
        users = []

    if any(user['username'] == username for user in users):
        return jsonify({"message": "Username already exists!"})

    users.append({
        "username": username,
        "email": email,
        "password": password
    })

    with open(DATA_FILE, 'w') as file:
        json.dump(users, file, indent=4)

    return jsonify({"message": "User registered successfully!"})

@app.route('/login', methods=['POST'])
def login():
    login_data = request.get_json()
    username = login_data['username']
    password = login_data['password']

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            users = json.load(file)
    else:
        return jsonify({"message": "User not found!"})

    for user in users:
        if user['username'] == username and user['password'] == password:
            return jsonify({"message": "Login successful!"})

    return jsonify({"message": "Invalid username or password!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Ensure the Flask server is running on port 5000
