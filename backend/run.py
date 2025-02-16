import os
from flask import Flask
from flask_cors import CORS
from routes import calories_routes
from flask_sqlalchemy import SQLAlchemy

DB_PATH = "food_tracker.db"
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(calories_routes.bp)

    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host="0.0.0.0", port=port)