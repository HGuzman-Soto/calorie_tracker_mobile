import os
from flask import Flask
from flask_cors import CORS
from routes import calories_routes


app = Flask(__name__)
app.register_blueprint(calories_routes.bp)

CORS(app)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host="0.0.0.0", port=port)