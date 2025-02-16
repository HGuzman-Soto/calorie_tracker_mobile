from flask import request, g, jsonify
from flask import Blueprint
import logging
import signal
from datetime import datetime

bp = Blueprint('calories', __name__, url_prefix='/api/calories')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Timeout handler
def timeout_handler(signum, frame):
    raise TimeoutError("Request timed out")

# Set the timeout signal
signal.signal(signal.SIGALRM, timeout_handler)


@bp.route('', methods=['GET', 'OPTIONS'])
def get_calories():
    # /api/calories?startDate=2024-01-01&endDate=2024-01-31&groupBy=month
    # start_date = request.args.get('startDate')
    # end_date = request.args.get('endDate')
    # group_by = request.args.get('groupBy') 
    logger.info('Received GET request for /api/calories')
    signal.alarm(10)  # Set the timeout to 10 seconds


    try:
        # Simulate some processing
        response = jsonify({'message': 'Hello from calories'})
        signal.alarm(0)  # Disable the alarm
        return response, 200
    
    except Exception as e:
        logger.error(f'Error processing GET request: {e}')
        return jsonify({'error': 'Internal Server Error'}), 500



@bp.route('', methods=['POST'])
def add_food_entry():
    '''
    This route will get two entries
    1. String for food name
    2. Number for calories

    '''
    # parse data
    data = request.get_json()
    food_name = data.get('foodName')
    calories = data.get('calories')

    print("food_name", food_name)
    print("calories", calories)
    # create response
    response = {
        'message': 'Food entry added successfully',
        'foodName': food_name,
        'calories': calories
    }

    return jsonify(response), 201

        

# @bp.route('/day', methods=['GET'])
# def get_today_calories():
#     today = datetime.now().strftime('%Y-%m-%d')
#     user_id = g.user_id
#     pass

