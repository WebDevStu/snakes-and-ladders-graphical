/**
 * BoardClass
 * main class for the board
 *
 * @constructor
 */
var BoardClass = function () {

    this.el = document.getElementById('board');
    this.nodes = [];
    this.used = [];

    this.position = 0;

    this.spaces = this.generateBoard();
    this.snakes = this.randomCoordinates();
    this.ladders = this.randomCoordinates();

    console.log(this.snakes, this.ladders);
    this.create();

    _.listenTo('move:complete', this.updatePosition, this);
};


_.extend(BoardClass.prototype, {


    /**
     * generateBoard
     * generates an array of numbers formatted to make the travel of play left
     * to right to left...
     */
    generateBoard: function () {

        var board = [],
            spaces = [],
            ltr = false,
            splits,
            i,
            k;

        // set up array 100-1
        for (i = 100; i >= 1; i -= 1) {
            board.push(i);
        }

        // splice in 10 and reverse every other
        for (i = 0; i < 10; i += 1) {
            splits = board.splice(0, 10);

            if (ltr) {
                splits.reverse();
            }

            ltr = !ltr;

            for (k = 0; k < 10; k += 1) {
                spaces.push(splits[k]);
            }
        }

        return spaces;
    },


    /**
     * randomCoordinates
     * generates an array of 4 co-ordinates (5 ladders and 5 snakes) each
     * co-ordinate must be over 10 positions apart
     */
    randomCoordinates: function () {

        var coordinates = [],
            first,
            second;

        for (var i = 0; i <= 4; i += 1) {

            first = this.random(100);

            if (i > 0) {
                while (this.used.indexOf(first) !== -1) {
                    first = this.random(100);
                }
            }

            this.used.push(first);
            second = this.random(first);

            while (this.used.indexOf(second) !== -1 || second > (first + 10) || second < (first - 10)) {
                second = this.random(first);
            }

            coordinates.push([first, second]);
            this.used.push( second);
        }

        return coordinates;
    },


    /**
     * random
     * creates a random number within a given range
     *
     * @param limit {number}
     * @returns {number}
     */
    random: function (limit) {
        return Math.round(Math.random() * limit);
    },


    /**
     * create
     * creates the board and all necessary elements
     */
    create: function () {

        var list = document.createElement('ul'),
            item;

        list.className = 'board';

        this.spaces.forEach(function (index) {

            item = document.createElement('li');
            item.innerHTML = index;
            item.className = 'space-' + index.toString();

            this.nodes.push(item);

            list.appendChild(item);
        }, this);

        this.el.appendChild(list);
    },



    getSpaceByNumber: function (number) {},


    /**
     * move
     * sets of an interval to update the board of where the player is
     *
     * @param moves {number}
     */
    move: function (moves) {

        var interval = _.repeat(this.changeSpace(moves + 1, function () {

            clearInterval(interval);

            _.trigger('move:complete', moves);

        }), this, 500);

    },


    /**
     * changeSpace
     * closure called from the interval for moving the space
     *
     * @param moves {Number}
     * @param callback {Function}
     * @returns {Function}
     */
    changeSpace: function (moves, callback) {

        var scope = this,
            moved = 0,
            selected,
            next;

        return function () {

            moved += 1;

            if (moved >= moves) {
                return callback();
            }

            selected = scope.el.querySelector('.selected');
            next = scope.el.querySelector('.space-' + (scope.position + moved));

            if (selected) {
                selected.className = selected.className.replace(/( )?selected/g, '');
            }

            _.addClass(next, 'selected');
        }
    },


    /**
     * updatePosition
     * callback from listener updates once the move has been completed
     * @param moves
     */
    updatePosition: function (moves) {
        this.position += moves;
    }
});