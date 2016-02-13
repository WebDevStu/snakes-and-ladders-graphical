
(function () {

    // @TODO make into class
    var game = {
        //started: false,
        moving: false,
        dice:   new DiceClass(),
        board:  new BoardClass()
    };

    game.board.create();

    _.listenTo({

        /**
         * mouse click event callback
         *
         * @method
         */
        'click:mouse': function () {

            if (!game.moving) {
                game.moving = true;
                game.board.move(game.dice.throw());
            }
        },


        /**
         * complete move event callback
         *
         * @method
         */
        'move:complete': function () {
            game.moving = false;
        }
        
    }, false, false);
} ());


