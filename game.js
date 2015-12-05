
(function () {

    // @TODO make into class
    var game = {
        //started: false,
        moving: false,
        dice:   new DiceClass(),
        board:  new BoardClass()
    };


    _.listenTo({

        'click:mouse': function () {

            if (!game.moving) {
                game.moving = true;
                game.board.move(game.dice.throw());
            }
        },

        'move:complete': function () {
            game.moving = false;
        }
    }, false, false);
} ());


