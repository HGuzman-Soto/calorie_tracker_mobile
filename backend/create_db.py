import os
import argparse

from run import create_app
from database import db
from models import User, Food, FoodEntry

def create_test_users(db):
    test_users = [
        {'name': 'Hansel', 'username': 'Hansel', 'password': 'test'},
        {'name': 'Thomas', 'username': 'Thomas', 'password': 'test'}
    ]

    for user_data in test_users:
        user = User(
            name=user_data['name'],
            username=user_data['username']
        )
        user.set_password(user_data['password'])
        db.session.add(user)
    db.session.commit()
    print("Test users created successfully")

def init_db(force=False):
    app = create_app()
    db_path = os.path.join('instance', 'food_tracker.db')

    if os.path.exists(db_path) and not force:
        print("Database already exists! Use --force to recreate the database.")
        return

    with app.app_context():
        if force:
            db.drop_all()
            print("Dropped existing tables")

        db.create_all()
        print("Database created successfully!")

        create_test_users(db)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Initialize the database')
    parser.add_argument('--force', action='store_true', 
                       help='Force recreation of the database even if it exists')
    
    args = parser.parse_args()
    init_db(force=args.force)
