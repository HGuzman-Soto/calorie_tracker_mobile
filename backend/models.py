from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from database import db

class User(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    food_entries = db.relationship(
                    'FoodEntry', 
                    backref='user', 
                    lazy=True, 
                    # cascade='all delete-orphan'
                )
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'username': self.username,
            'created_at': self.created_at.isoformat()
        }

class Food(db.Model):
    __tablename__ = 'foods'
    
    food_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    entries = db.relationship('FoodEntry', backref='food', lazy=True)
    
    def to_dict(self):
        return {
            'food_id': self.food_id,
            'name': self.name,
            'calories': self.calories,
            'created_at': self.created_at.isoformat()
        }
    
    def __repr__(self):
        return f'<Food {self.name}: {self.calories} calories>'

class FoodEntry(db.Model):
    __tablename__ = 'food_entries'
    
    entry_id = db.Column(db.Integer, primary_key=True)
    food_id = db.Column(db.Integer, db.ForeignKey('foods.food_id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'entry_id': self.entry_id,
            'food_id': self.food_id,
            'food_name': self.food.name,
            'calories': self.calories,
            'timestamp': self.timestamp.isoformat()
        }
    
    def __repr__(self):
        return f'<FoodEntry {self.food.name} for user {self.user_id}>' 