
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
        return Math.ceil(Math.random() * 6);
    },


    /**
     * update
     *
     * @param n {Number}
     */
    update: function (n) {
        this.el.className = 'dice ' + this.numbers[n];
    }
});