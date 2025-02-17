curl -X POST http://localhost:8080/api/food_entries/new/food_entry \
     -H "Content-Type: application/json" \
     -d '{
           "user_id": 1,
           "food_id": 1
         }'