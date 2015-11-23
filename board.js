
var BoardClass = function () {

    this.el = document.getElementById('board');
    this.nodes = [];
    this.used = [];

    this.position = 0;

    this.spaces = this.generateBoard();
    this.snakes = this.randomCoordinates();
    this.ladders = this.randomCoordinates();

    this.create();
};


_.extend(BoardClass.prototype, {


    /**
     * generateBoard
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
     *
     * @param limit {number}
     * @returns {number}
     */
    random: function (limit) {
        return Math.round(Math.random() * limit);
    },


    /**
     * create
     * creates the board
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



    getSpaceByNumber: function (number) {



    },



    move: function (moves) {

        this.interval = _.repeat(this.changeSpace(moves, function () {
            console.log('complete');
        }), this, 2000);




    },



    changeSpace: function (moves, callback) {

        var scope = this,
            interval = this.interval,
            position = this.position,
            selected = this.el.querySelector('.selected'),
            moved = 0;

        return function () {

            moved += 1;

            if (moved >= moves) {
                clearInterval(interval);

                callback();
                return;
            }

            selected.className = selected.className.replace(/( )?selected/g, '');
            scope.el.querySelector('.space-' + scope.position);



        }
    }
});