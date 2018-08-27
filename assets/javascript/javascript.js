// variables 
var imperial = new Audio('assets/music/imperial.mp3')
var theme = new Audio('assets/music/theme.mp3')
var playerid
var enemyid
var gameStart
var playerSelection
var playerSelectionHolder
var enemySelection
var enemySelectionHolder
var enemyInBox = false


//player stats
var player1 = {
    health: 400,
    attack: 2,
    counterAttack: 40
}

var player2 = {
    health: 400,
    attack: 3,
    counterAttack: 60
}


var player3
    = {
    health: 400,
    attack: 10,
    counterAttack: 60
}

var player4 = {
    health: 250,
    attack: 3,
    counterAttack: 20
}

// finish the game winning
function gameWon() {
    $('body').children().css('display', 'none')
    $('#winning').css('display', 'block')
    $('#landing-page').show()
    $('#landing-page').children().css('display', 'none')
    theme.play()
}

//finish the game losing
function gameLost() {
    $('body').children().css('display', 'none')
    $('#lost').css('display', 'block')
    $('#landing-page').show()
    $('#landing-page').children().css('display', 'none')
}

//creates a function that works for whole document.
$(function () {
    // all of the players become draggable
    $(".player").draggable({
        revert: true,
        snap: ".playing-boxes",
        snapMode: 'inner'

    })

    // player box becomes droppable. Dropping player in the box will 
    // hide the draggable element and create a clone in the actual box.
    // Players can still be changed out, hence the else statement.
    $('#player-box').droppable({
        drop: function (event, ui) {
            if (this.firstChild === null) {
                var player = $(ui.draggable).html()
                $('#player-box').append(player)
                $(ui.draggable).hide()
                playerid = document.getElementById('player-box').getElementsByClassName('players')[0].dataset.player

            }
            else {
                $('#' + playerid).show()
                var player = $(ui.draggable).html()
                $('#player-box').empty()
                $('#player-box').append(player)
                $(ui.draggable).hide()
                playerid = document.getElementById('player-box').getElementsByClassName('players')[0].dataset.player


            }

        }
    });

    // enemy box becomes droppable. Dropping player in the box will 
    // hide the draggable element and create a clone in the actual box.
    // Players can still be changed out, hence the else statement.
    $('#enemy-box').droppable({

        drop: function (event, ui) {
            if (enemyInBox === false) {
                if (this.firstChild === null) {
                    var player = $(ui.draggable).html()
                    $('#enemy-box').append(player)
                    $(ui.draggable).hide()
                    enemyid = document.getElementById('enemy-box').getElementsByClassName('players')[0].dataset.player

                }
                else {
                    $('#' + enemyid).show()
                    var player = $(ui.draggable).html()
                    $('#enemy-box').empty()
                    $('#enemy-box').append(player)
                    $(ui.draggable).hide()
                    enemyid = document.getElementById('enemy-box').getElementsByClassName('players')[0].dataset.player

                }
            }
            
        }

    });

    /* User can click on the start-fight. This locks in the player for the rest of the game.
    The enemy box is only locked for the duration of the fight. This code also sets the current player
    as well as the current enemy
    */

    $('#start-fight').click(function () {
        if (document.getElementById('enemy-box').firstChild !== null && document.getElementById('player-box').firstChild !== null) {
            enemyInBox = true
            $('#attack').show()
            $('#start-fight').hide()
            $("#player-box").droppable({
                accept: 'none'
            })


            switch (document.getElementById('player-box').getElementsByClassName('players')[0].dataset.player) {
                case 'player1':
                    playerSelection = player1
                    playerSelectionHolder = 'player1'
                    break;
                case 'player2':
                    playerSelection = player2
                    playerSelectionHolder = 'player2'

                    break;
                case 'player3':
                    playerSelection = player3
                    playerSelectionHolder = 'player3'
                    break;
                case 'player4':
                    playerSelection = player4
                    playerSelectionHolder = 'player4'
                    break;

                default:
                    break;
            }


            switch (document.getElementById('enemy-box').getElementsByClassName('players')[0].dataset.player) {
                case 'player1':
                    enemySelection = player1
                    enemySelectionHolder = 'player1'
                    break;
                case 'player2':
                    enemySelection = player2
                    enemySelectionHolder = 'player2'
                    break;
                case 'player3':
                    enemySelection = player3
                    enemySelectionHolder = 'player3'
                    break;
                case 'player4':
                    enemySelection = player4
                    enemySelectionHolder = 'player4'
                    break;

                default:
                    break;
            }



        }
    })


        /* the attack function. this provides the interface for the attack and then the counter 
        attack. */
    $('#attack').click(function () {

        enemySelection.health -= playerSelection.attack

        if (enemySelection.health > 0) {
            playerSelection.health -= enemySelection.counterAttack
            $('.' + enemySelectionHolder + '-health').text(enemySelection.health)

        }

        if (playerSelection.health <= 0) {
            gameLost()
            $('#attack').hide()
            $('#enemy-box').empty();
            enemyInBox = false
        }

        if (enemySelection.health < 0) {
            $('#' + enemyid).show()
            $('#' + enemyid).draggable('disable')
            $('#' + enemyid).addClass('overlay')
            $('.' + enemySelectionHolder + '-health').text('0')
            $('#attack').hide()
            $('#enemy-box').empty();
            $('#start-fight').show()
            enemyInBox = false





            deadEnemies++
            if (deadEnemies % 3 === 0) {

                gameWon()
                imperial.pause()

            }
        }
        playerSelection.attack += playerSelection.attack

        $("." + playerSelectionHolder + '-health').text(playerSelection.health)

        $("." + playerSelectionHolder + '-attack').text(playerSelection.attack)




    })


    // Goes from landing page to the playing page
    $('#start').click(function () {
        $('#landing-page').hide()
        $('#player-select').fadeIn('slow')
        imperial.play()

    })

    // restarts the game with the inital conditions
    $('.restart').click(function () {
        $('body').children().show()
        $('#landing-page').hide()
        $('#winning').hide()
        player1 = {
            health: 400,
            attack: 2,
            counterAttack: 40
        }

        player2 = {
            health: 400,
            attack: 3,
            counterAttack: 60
        }


        player3
            = {
                health: 400,
                attack: 10,
                counterAttack: 60
            }

        player4 = {
            health: 250,
            attack: 5,
            counterAttack: 20
        }

        statsReset(player1, player2, player3, player4)
        var array = ['player1', 'player2', 'player3', 'player4']
        array.forEach(element => {
            console.log(element)
            $('#' + element).removeClass('overlay')
        })
        $('#player-box').empty()
        $('#enemy-box').empty()


        $('#' + playerid).show()
        $('#' + enemyid).show()

        $(".player").draggable('enable')
        playerSelection = undefined
        enemySelection = undefined


        $('#player-box').droppable({
            accept: '.player'
        })
        $('#enemy-box').droppable({
            accept: '.player'
        })
        $('#start-fight').show()

        theme.pause()
        imperial.play()
        $('#lost').hide()
    })






});



