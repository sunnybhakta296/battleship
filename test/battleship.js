const Promise = require('bluebird')
const expect = require('chai').expect
const app = require('../app')
const battleship = require('../repositories/battleship')


describe('Battleship lib', () => {
  describe('#createGame()', () => {
    it('should return game info', async () => {
      const game = await battleship.createGame()
      expect(game._id).to.be.a('object')
      expect(game.attacker).deep.equal({
        hitGrids: [],
        missGrids: []
      })
    })
  })

  describe('#deploy()', () => {
    it('should return error when ship is not exist', async () => {
      let error
      const game = await battleship.createGame()
      const options = {
        row: 1,
        column: 1,
        ship: 'noship'
      }
      try {
        await battleship.deploy(game._id, options)
      } catch (deployError) {
        error = deployError
        expect(deployError.message).eql('noship is not exist')
      } 
      expect(error).exist
    })

    it('should return error when do not have ship', async () => {
      let error
      const options = [
        {
          row: 1,
          column: 1,
          ship: 'battleship'
        },
        {
          row: 6,
          column: 6,
          ship: 'battleship'
        }
      ]
      const game = await battleship.createGame()
      try {
        await Promise.each(options, (option) => battleship.deploy(game._id, option))
      } catch (deployError) {
        error = deployError
        expect(deployError.message).eql('no more battleship ship')
      } 
      expect(error).exist
    })

    // view test/all-deployed.png
    it('should return error when all ships have been deployed', async () => {
      let error
      const options = [
        {
          row: 1,
          column: 1,
          ship: 'battleship'
        },
        {
          row: 1,
          column: 6,
          ship: 'cruiser',
          isVertical: true
        },
        {
          row: 1,
          column: 10,
          ship: 'cruiser',
          isVertical: true
        },
        {
          row: 5,
          column: 1,
          ship: 'destroyer',
          isVertical: true
        },
        {
          row: 10,
          column: 1,
          ship: 'destroyer',
        },
        {
          row: 10,
          column: 9,
          ship: 'destroyer',
        },
        {
          row: 6,
          column: 5,
          ship: 'submarine',
        },
        {
          row: 6,
          column: 7,
          ship: 'submarine',
        },
        {
          row: 5,
          column: 10,
          ship: 'submarine',
        },
        {
          row: 7,
          column: 9,
          ship: 'submarine',
        },
        {
          row: 8,
          column: 6,
          ship: 'submarine',
        }
      ]
      const game = await battleship.createGame()
      try {
        await Promise.each(options, (option) => battleship.deploy(game._id, option))
      } catch (deployError) {
        error = deployError
        expect(deployError.message).eql('all ships has been deployed')
      } 
      expect(error).exist
    })
  })
})