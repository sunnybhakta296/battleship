const Game = require('../models/game');

module.exports = battleship = {
    async createGame() {
        const game = new Game();
        game.defender = {
            placements: [],
            ships: {
            battleship: {
            name: 'battleship',
            amount: 1,
            size: 4
            },
            cruiser: {
            name: 'cruiser',
            amount: 2,
            size: 3
            },
            destroyer: {
            name: 'destroyer',
            amount: 3,
            size: 2
            },
            submarine: {
            name: 'submarine',
            amount: 4,
            size: 1
            }
            }
        },
        game.attacker = {
            missGrids: [],
            hitGrids: []
        }
        return await game.save();
    }
};
