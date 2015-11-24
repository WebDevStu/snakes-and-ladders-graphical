

(function () {

    // @TODO make into class
    var game = {
        started: false,
        dice:   new DiceClass(),
        board:  new BoardClass()
    };




    _.listenTo('click:mouse', function () {

        //if (game.started) {
        //    return;
        //}
        //
        //game.started = true;

        var thrown = game.dice.throw();

        game.dice.update(thrown);
        game.board.move(thrown, function () {

        });

    })

} ());


