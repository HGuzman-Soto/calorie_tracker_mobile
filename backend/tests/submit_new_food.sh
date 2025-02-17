curl -X POST http://localhost:8080/api/food_entries/new/food \
     -H "Content-Type: application/json" \
     -d '{
           "food_name": "Chicken Sandwich",
           "calories": 350
         }'