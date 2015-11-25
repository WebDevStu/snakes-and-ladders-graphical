/**
 * DiceClass
 * main dice class
 * @constructor
 */
var DiceClass = function () {

    this.el = document.getElementById('dice');

    this.events();
};


_.extend(DiceClass.prototype, {


    /**
     * numbers
     */
    numbers: [
        null,
        'one',
        'two',
        'three',
        'four',
        'five',
        'six'
    ],


    /**
     * events
     */
    events: function () {

        this.el.addEventListener('click', function () {
            _.trigger('click:mouse');
        }, false);
    },


    /**
     * throw
     * @returns {number}
     */
    throw: function () {

        var thrown = Math.ceil(Math.random() * 6);

        this.update(thrown);

        return thrown;
    },


    /**
     * update
     * updates the DOM (the dice part) with the className of the number thrown
     * @param n {Number}
     */
    update: function (n) {
        this.el.className = 'dice ' + this.numbers[n];
    }
});