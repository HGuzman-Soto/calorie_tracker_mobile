'''
API Endpoints
1. User POST requests for a user to add a new food entry with the name and calories
2. App will GET requests the food entries for the user for that day
3. App will GET requests the food entries for the week
4. App will GET request the food entries for the specific days if they click that button 
'''
import logging 
from flask import request, g, jsonify
from flask import Blueprint
from database import db
from models import Food, FoodEntry
from datetime import datetime

bp = Blueprint('food_entry', __name__, url_prefix='/api/food_entries')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@bp.route('/new/food', methods=['POST'])
def create_new_food():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    print('data:', data)
    food_name = data.get('food_name')
    food_name = food_name.lower().strip()
    calories = data.get('calories')

    if not food_name or not calories:
        return jsonify({'message': 'Missing food_name or calories'}), 400
    try:
        food = Food.query.filter(Food.name.ilike(food_name)).first()
        print("food from db", food)
        if food:
            print('food already exist, existing')
            return jsonify({'message': 'Food already exists'}), 200
    
        new_food = Food(
                name=food_name,
                calories=int(calories)
            )
        db.session.add(new_food)
        db.session.commit()
        return jsonify({
            'message': 'New Food created successfully',
            'entry': new_food.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating food entry: {str(e)}")
        return jsonify({'message': 'Error creating new food'}), 500

@bp.route('/new/food_entry', methods=['POST'])
def submit_new_food_entry():
    logger.info("Recieved POST request for /api/food_entries/new")
    data = request.get_json()
    print("data:", data)

    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    user_id = data.get('user_id')
    food_id = data.get('food_id')

    if not user_id or not food_id:
        return jsonify({'message': 'Missing user_id or food_id'}), 400
    
    # Fetch the food data from food table using food_entry_id
    try:
        food = Food.query.get(food_id)
        if not food:
            return jsonify({'message': 'food entry does not exist'}, 400)
        
        new_food_entry = FoodEntry(
            food_id=food_id,
            user_id=user_id,
            calories=food.calories,
            timestamp=datetime.utcnow()
        )
        db.session.add(new_food_entry)
        db.session.commit()
        return jsonify({
            'message': 'Food entry created successfully',
            'entry': new_food_entry.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating food entry: {str(e)}")
        return jsonify({'message': 'Error creating food entry'}), 500

    # Add new entry to the database using user_id, food_entry_id, timestamp
    # this is a transaction, return 200 if it all is successful otherwise throw an exception
