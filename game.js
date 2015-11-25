
(function () {

    // @TODO make into class
    var game = {
        //started: false,
        dice:   new DiceClass(),
        board:  new BoardClass()
    };



    _.listenTo('click:mouse', function () {
        game.board.move(game.dice.throw());
    })
} ());


