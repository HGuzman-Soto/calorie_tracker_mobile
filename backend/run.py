import os
from flask import Flask
from flask_cors import CORS
from routes import calories_routes, food_entry, auth_routes
from database import db

DB_PATH = "food_tracker.db"

def create_app():
    app = Flask(__name__)

    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(calories_routes.bp)
    app.register_blueprint(food_entry.bp)
    app.register_blueprint(auth_routes.bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host="0.0.0.0", port=port)