const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function ConvertHandle.getNum(input)', function(){
        test('Whole number input',function(done) {
            let input = '32L'
            assert.equal(convertHandler.getNum(input), 32)
            done()
        })

        test('Decimal input', function(done) {
            let input = '32.2L'
            assert.equal(convertHandler.getNum(input), 32.2)
            done()
        })

        test('Fractional input', function(done) {
            let input = '32/3L'
            assert.equal(convertHandler.getNum(input), 32 / 3)
            done()
        })

        test('Fractional input with a deciaml', function(done) {
            let input = '7/2.3L'
            assert.equal(convertHandler.getNum(input), 7 / 2.3)
            done()
        })

        test('Invalid input (doble franction)', function(done) {
            let input = '3/5/7L'
            assert.equal(convertHandler.getNum(input), undefined)
            done()
        })

        test('No numerical input', function(done) {
            let input = 'L'
            assert.equal(convertHandler.getNum(input), 1)
            done()
        })
    })

    suite('Function convertHandle.getUnit(input)', function() {
        test('For Each Valid Input Unit', function(done) {
            let input = [
                'km',
                'kg',
                'mi',
                'l',
                'lbs',
                'gal',
                'KM',
                'KG',
                'MI',
                'L',
                'LBS',
                'GAL'
            ]

            let output = [
                'km',
                'kg',
                'mi',
                'L',
                'lbs',
                'gal',
                'km',
                'kg',
                'mi',
                'L',
                'lbs',
                'gal'
            ]

            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getUnit(ele), output[i])
            }) 
            done()
        })

        test('Invalid Unit Input', function(done) {
            assert.equal(convertHandler.getUnit('43Liters'), undefined)
            done()
        })
    })

    suite('Function convertHandle.getReturnUnit(initUnit)', function() {
        test('For Each Valid Unit Input', function(done) {
            let input = ['km', 'mi', 'l', 'gal', 'lbs', 'kg']
            let expect = ['mi', 'km', 'gal', 'L', 'kg', 'lbs']
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i])
            })
            done()
        })
    })

    suite('Function convertHandle.spellOutUnit(unit)', function() {
        test('For Each Valid Unit Input', function(done) {
            let input = ['gal', 'l', 'km', 'mi', 'kg', 'lbs']
            let expect = [
                'gallons',
                'liters',
                'kilometers',
                'miles',
                'kilograms',
                'pounds'
            ]
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i])
            })
            done()
        })
    })

    suite('Function convertHandle.convert(num, input)', function() {
        test('Gal to L', function(done) {
            let input = [5, 'gal']
            let expected = 18.9271
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            )
            done()
        })

        test('L to Gal', function(done) {
            let input = [5, 'l']
            let expected = 1.32086
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            )
            done()
        })

        test('Km to Mi', function(done) {
            let input = [5, 'km']
            let expected = 3.10685
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            )
            done()
        })

        test('Mi to Km', function(done) {
            let input = [5, 'mi']
            let expected = 8.04672
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            )
            done()
        })

        test('Kg to Lbs', function(done) {
            let input = [5, 'kg']
            let expected = 11.0231
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            )
            done()
        })

        test('Lbs to Kg', function(done) {
            let input = [5, 'lbs']
            let expected = 2.26796
            assert.approximately(
                convertHandler.convert(input[0], input[1]),
                expected,
                0.1
            )
            done()
        })
    })
});