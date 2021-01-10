# battleship

## Installing and running application
```
npm install
npm start
```

## Running test
```
npm install --only=dev
npm test
```

## API

### POST /games/create
Create game

    curl -X POST http://localhost:4000/game/create

### POST /game/deploy/:gameId
Deploy ships

    curl -X POST \
      http://localhost:4000/game/deploy/:gameId \
      -H 'content-type: application/json' \
      -d '{
      "row": 8,
      "column": 4,
      "ship": "submarine",
      "isVertical": true
    }'

### POST /game/attack/:gameId
Attack ships

    curl -X POST \
      http://localhost:4000/game/attack/:gameId \
      -H 'content-type: application/json' \
      -d '{
      "row": 8,
      "column": 4
    }'

### GET /games/status/gameId 
Get game status

    curl -X http://localhost:4000/game/status/:gameId