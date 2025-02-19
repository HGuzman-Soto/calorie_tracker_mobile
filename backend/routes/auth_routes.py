from flask import Blueprint, request, jsonify
from models import User, db

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data:
        return jsonify({'message': 'No data provided'}), 400

    username = data.get('username')
    password = data.get('password')

    print(data)

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        return jsonify({
            'message': 'Login sucessful',
            'user': user.to_dict()
        }), 200
    
    return jsonify({'message': 'Invalid username or password'}), 401