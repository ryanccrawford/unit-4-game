// ToDo: about 3 more methods need to be writtten to compleate the game. Needed A little more time. The  game works but only until you win or die then you can't do much tillyou refresh the browser and start over.
// Declare any Globals that we may need.

const NAMES = ['Xiomi', 'Krisrora', 'Perqen', 'Daharice'];
const TYPES = ['Human', 'Elf', 'Mage', 'Underlord'];
var characters = [];
var ic = 0;
var idCounter = 0;
var selectedPlayer;
var enemiePlayers = [];
var button;
var kills = 0;
var scrollImg = 'url(assets/images/player_select.png)';
var topMess = $('#topMessage');
var gamearea = $('#gameArea');
var whosTurn = 0;
var isFighting = false;
var currentPickedFighter;
var playerSelected = false
var playerDied = false;
var enemyDied = false;
$(document).ready(function () {
    
    

    // Each character in the game has 3 attributes: `Health Points`, `Attack Power` and`Counter Attack Power`.
    // Created a character Object that contains all 3 atributes
    var characterBase = function (_id, _image, _name, _type, _health, _attackPower, _counterAttackPower) {
        return {
            id: _id,
            cardId: function () {
                return 'card_p' + this.id;
            },
            getCard: function () {
                var cname = '#' + this.cardId();
                return $(cname);
            },
            image: _image,
            name: _name,
            type: _type,
            health: _health,
            attackPower: _attackPower,
            baseAp: _attackPower,
            counterAttackPower: _counterAttackPower,
            isEnemie: false,
            isAttacking: false,
            isDefending: false,

        };
    };
    
    //  attack function that will detect the correct attacker and defender automatically
    function attack(_attacker, _defender) {
        var ida = _attacker.id.charAt(_attacker.id.length - 1);
        var idb = _defender.id.charAt(_defender.id.length - 1);
        var attakerIsEnemy = false;
        if (typeof (_attacker.attributes['data-type']) != 'undefined') {
            attakerIsEnemy = true;
        }
        var defenderIsEnemy = !attakerIsEnemy;
      
       
        var attacker, defender;
        if (attakerIsEnemy) {
            
            attacker = enemiePlayers[parseInt(ida)];
        } else {
            
            attacker = characters[ida];
        }
       
        if (defenderIsEnemy) {
            
            defender = enemiePlayers[parseInt(idb)];

        } else {
            
            defender = characters[idb];
        }


        if (defender.health <= 0) {
            $(_defender).fadeOut(1000);
            if (attakerIsEnemy) {
                playerDied = true;
            } else {
                kills++;
                enemyDied = true;
            }
            return false;
        }
        
        if (attacker.health <= 0) {
            $(_attacker).fadeOut(1000);
            if (attakerIsEnemy) {
                playerDied = true;
            } else {
                kills++;
                enemyDied = true;  
            }
            return false;
        }


        if (attacker.isEnemie) {
            var attackpoint = randomNum(attacker.counterAttackPower - 10, attacker.counterAttackPower)
            defender.health = defender.health - attacker.counterAttackPower;
            updateScreen(attacker, defender);
        } else {
            var attackpoint = randomNum(attacker.attackPower - 10, attacker.attackPower)
            defender.health = defender.health - attacker.attackPower;
            updateScreen(attacker, defender);
        }

        if (!attakerIsEnemy) {
         // Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
       // For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6(12, 18, 24, 30 and so on).

            attacker.attackPower += attacker.base;
        }
        //redraw and update the display 
        updateScreen(attacker, defender);

        defender.isDefending = !defender.isDefending
        defender.isAttacking = !defender.isAttacking
        attacker.isDefending = !attacker.isDefending
        attacker.isAttacking = !attacker.isAttacking

        return true;

    }
    //Refreshes the screen to show the most upto date HP and AP information
    function updateScreen(a, b) {
        var ida = a.id.toString();
        var idb = b.id.toString();
        var ahp = parseInt((a.health * 100) / 100);// convert to % between 0 - 100%
        var bhp = parseInt((b.health * 100) / 100);//convert to % between 0 - 100%
        var aap = parseInt((a.attackPower * 100) / 100);//convert to % between 0 - 100%
        var bap = parseInt((b.attackPower * 100) / 100);//convert to % between 0 - 100%
        var capa = parseInt((a.counterAttackPower * 100) / 100);//convert to % between 0 - 100%
        var capb = parseInt((b.counterAttackPower * 100) / 100);//convert to % between 0 - 100%
        if (a.isEnemie) {
            $('#attributesAp_p' + ida).css('width', capa.toString()+'%')
        } else {
            $('#attributesAp_p' + ida).css('width', aap.toString() + '%')
        }
        if (b.isEnemie) {
            $('#attributesAp_p' + idb).css('width', capb.toString() + '%')
        } else {
            $('#attributesAp_p' + idb).css('width', bap.toString() + '%')
        }
         
   
        $('#attributesHp_p' + ida).css('width', ahp.toString() + '%')
        $('#attributesHp_p' + idb).css('width', bhp.toString() + '%')


    }

    //Initializing and starting the game.
    characters = createPlayers(NAMES, TYPES);
    var group = createDeck(characters);
    $(gamearea).append(group);
   
    topMessage('', scrollImg, 'select-player');
   
    makeCardsSelectable(selectPlayer);
   
    // TODO: Create function to allow the player to select the next opponent.
    function continueFighting() {
        


    }

    // TODO: Creat function to check if game is over or if player is dead. if so reset everything and let the user try again
    function anyWinners() {
        


    }

    //Used to clear the #topMessage Area
    function clearTopMess() {
        topMessage('',false,'');
    }
    // Allows you to write messages to the screen
    function topMessage(message, image, styleClass) {
        $('#topMessage').empty();
      
        $('#topMessage').text(message);
        $('#topMessage').addClass(styleClass + " enter");
        if (image) {
            $('#topMessage').css(
                {
                    'position': "absolute",
                    'z-index': '10000',
                    'background-image': image,
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'background-size': '372px',
                    'width': '100%',
                    'height': '200px',
                    'top': '-98px',
                }
            );
            
        } else {
            $('#topMessage').remove();
            var newmessage = $('<div>').attr('id', 'topMessage');
            $('#messcol').append(newmessage);
       
        }
    }

    // Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
    // For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6(12, 18, 24, 30 and so on).
    // The enemy character only has`Counter Attack Power`.
    // Unlike the player's `Attack Points`, `Counter Attack Power` never changes.
    // The`Health Points`, `Attack Power` and`Counter Attack Power` of each character must differ.
    // No characters in the game can heal or recover Health Points. 
    // A winning player must pick their characters wisely by first fighting an enemy with low`Counter Attack Power`.This will allow them to grind`Attack Power` and to take on enemies before they lose all of their`Health Points`.Healing options would mess with this dynamic.
    // Your players should be able to win and lose the game no matter what character they choose.The challenge should come from picking the right enemies, not choosing the strongest player.

    //used to allow the cards become highlightable. a click function is passed to help with changeing the classes to animate and provide 
    //the secondary event that selects the player
    function makeCardsSelectable(clickFunction) {
       
            $('.selectable').removeClass('selectable');
            var len = 0;
            var what;
            if (!isFighting) {
                len = characters.length;
                what = characters;
            } else {
                len = enemiePlayers.length;
                what = enemiePlayers;
            }

            for (let i = 0; i <= len - 1; i++) {
                var card = '#' + what[i].cardId();
                $(card).addClass('selectable');
            
                $(card).click(event, clickFunction);
            }
        
    }
    //a click function that can  be passed into the above function to allow selection of the player.
    function selectPlayer(event) {
        if (!playerSelected) {
            playerSelected = true;
            var target = event.currentTarget;
            
            $('.active-card').removeClass('active-card');
       
            $('#'+target.id).addClass('active-card');
            var idIndex = target.id.toString().charAt(target.id.length - 1);
            var card = '#' + characters[parseInt(idIndex)].cardId();

            $(target).click(card, function (card) {
                $('.card').off();
                playerSelected = true;
                selectedPlayer = card.currentTarget;
                var l = characters.length;
 
                for (let i = 0; i <= l - 1; i++) {
                    var loopCard = characters[i].getCard();
                   
                    if (loopCard[0] === selectedPlayer) {
                        continue;
                    } else {
                        characters[i].isEnemie = true;
                        characters[i].base = 0;
                        enemiePlayers.push(characters[i]);
                    }
                }
             
                startGame(card.currentTarget);

            });
        }
        playerSelected = false;
        }
        
        
        
    
    

    // // * The enemy character only has`Counter Attack Power`.
    //     * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

    //         * The`Health Points`, `Attack Power` and`Counter Attack Power` of each character must differ.

    // * No characters in the game can heal or recover Health Points. 

    // * A winning player must pick their characters wisely by first fighting an enemy with low`Counter Attack Power`.This will allow them to grind`Attack Power` and to take on enemies before they lose all of their`Health Points`.Healing options would mess with this dynamic.
    //     * When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
   //once player selection happens this loads the methods used to move the player an other characters into groups.
    function startGame(target) {
       
       
        // move all enimies to othe side of screen
        moveAllEnemies('offence');
        //cemove the col class and change it to col-4 class 
        $(target).removeClass('col');
        $(target).addClass('col-4');
        $(target).css(['max-width', '240px']);
        $(target).addClass(['col-sm-6', 'col-lg-4', 'col-xlg-3']);
        $(gamearea).addClass('col');
        $(gamearea).removeClass('container');
        isFighting = true;
        
        clearTopMess();
        $('#topMessage').text('It\'s your move. You must fight to stay alive. Who will you battle?').addClass('fightMessage').fadeIn(1000);
        setTimeout(function () {
            $('#topMessage').fadeOut(4000);
        }, 5000);
        
          makeCardsSelectable(pickFighter);
            
        
        
    }
    // * The player chooses an opponent by clicking on an enemy's picture.
    // this is anothe function that could be used as an argument for the makeCardsSelectable(clickFunction) 
    //Making this one of the most versital function in the program. 
    function pickFighter(event) {
           //gets the target object or the parent sender
        var target = event.currentTarget;
            // turns off the buttons to prvent multiple clicks from orccuring
            $('div').off();
            // $(target).removeClass('cardfighter')
            $(target).addClass('card fighter');
        var idIndex = getIdFromTarget(target);
            currentPickedFighter = enemiePlayers[idIndex].getCard()

            $(selectedPlayer).addClass('fighter').addClass('card').removeClass('selectable');
            $(target).addClass('fighter').addClass('card').removeClass('selectable');
            var live = true;
        var f;
        
        // this is where the main fighting routine happens. You attack, If you live then the defender attacks
        //this loops until someone dies.
            while (live) {
                live = attack(selectedPlayer, target)
                live = attack(target, selectedPlayer);
        }
        
        //TODO: Make function to aloow the player to select the next person to fight
        //continueFighting();

    }
    function getIdFromTarget(target) {
        
        return parseInt(target.id.toString().charAt(target.id.length - 1));

    }

    // * The player must then defeat all of the remaining fighters.Enemies should be moved to a different area of the screen.
            function moveAllEnemies(location) {

                if (location === 'offence') {
                    moveTo(enemiePlayers, location);
                    $('.selectable').addClass('card');
                }
                
            }

            // * Once the player selects an opponent, that enemy is moved to a`defender area`.
            function moveTo(who, whereTo) {
                //who   enemiePlayers, 
                //location location
                var loc = $('#' + whereTo);
                for (let i = 0; i <= who.length - 1; i++) {
                    var c = who[i].getCard();
                   var d =  $(c).attr('data-type','enemy')
                    $(loc).append(d);
                }
               
        
    
            }

            // * The player will now be able to click the`attack` button.
            // * Whenever the player clicks`attack`, their character damages the defender.The opponent will lose`HP`(health points).These points are displayed at the bottom of the defender's picture. 
            //     * The opponent character will instantly counter the attack.When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.
            // 3. The player will keep hitting the attack button in an effort to defeat their opponent.
            //    * When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.
            // 4. The player wins the game by defeating all enemy characters.The player loses the game the game if their character's `HP` falls to zero or below.
            
            // creates all the players of the game
            function createPlayers(_names, _types) {
                var _characters = [];
                var ca = randomNum(10, 20);
                var apmax = 80;
                var numCharacters = _names.length;
                for (let h = 0; h <= numCharacters - 1; h++) {
    
                    var ap = randomNum(20, apmax);
                    apmax -= 5;
                    var charPlayer = new characterBase(h, 'assets/images/p' + h.toString() + '.jpg', _names[h], _types[h], 100, (ap), ca);
                    _characters.push(charPlayer);
                }
                return _characters;
    }
            // creates a Card Deck of Players
            function createDeck(_characters) {
                var row = $('<div>');
                var charCounter = 0;
                    
                var totalRows = Math.floor(characters.length / 4);
                if ((characters.length % 4) > 0) {
                    totalRows++;
                }
                for (let j = 0; j <= (totalRows); j++) {
                    var cgroup = $('<div>');
                    $(cgroup).addClass('card-deck');
            
                    for (let i = 0; i <= 4; i++) {
                        if (!_characters[charCounter]) {
                            break;
                        }
                        var playerCard = createCharCard(_characters[charCounter++]);
                        $(cgroup).append(playerCard);
                    }
                    $(row).append(cgroup);
                }
        
       
                return row;
    }
            // creates a single player card using jq to creat new elements dynamically
            function createCharCard(_character) {
                var id = "p" + _character.id;
                
                var cardDivCard = $('<div>');
                $(cardDivCard).addClass('card col');
                $(cardDivCard).attr('id', _character.cardId());
                var cardDivCardTitle = $('<h4>');
                $(cardDivCardTitle).addClass('card-title');
                $(cardDivCardTitle).attr('id', 'title_' + id);
                $(cardDivCardTitle).text(_character.name);
                var cardDivProfile = $('<div>');
                $(cardDivProfile).addClass('profile');
                $(cardDivProfile).attr('id', 'profile_' + id);
                var profileDivProfileImg = $('<img>');
                $(profileDivProfileImg).addClass('card-img-top pl-1 pr-1');
                $(profileDivProfileImg).attr('id', _character.id);
                $(profileDivProfileImg).attr('src', _character.image);
                var profileDivProfileAttributes = $('<div>');
                $(profileDivProfileAttributes).addClass('attributes');
                $(profileDivProfileAttributes).addClass('progress');
                $(profileDivProfileAttributes).attr('id', 'attributesHp_' + id);
                var attributeDivAttributesHp = $('<div>');
                $(attributeDivAttributesHp).addClass('progress-bar mt-1 hp');
                $(attributeDivAttributesHp).attr({
                    role: 'progressbar',
                    "aria-valuenow": "100",
                    "aria-valuemin": "0",
                    "aria-valuemax": "100",
                });
                $(attributeDivAttributesHp).css('width', '100%');
                $(attributeDivAttributesHp).text('Health');
                var profileDivProfileAttributes2 = $('<div>');
                $(profileDivProfileAttributes2).addClass('attributes');
                $(profileDivProfileAttributes2).addClass('progress');
                $(profileDivProfileAttributes2).attr('id', 'attributesAp_' + id);

                var attributeDivAttributesAp = $('<div>');
                $(attributeDivAttributesAp).addClass('progress-bar mt-1 ap');
                $(attributeDivAttributesAp).attr({
                    role: 'progressbar',
                    "aria-valuenow": _character.attackPower.toString() + "%",
                    "aria-valuemin": "0",
                    "aria-valuemax": "100",
                });
                $(attributeDivAttributesAp).css('width', _character.attackPower.toString() + '%');
                $(attributeDivAttributesAp).text('Attack Points');
                var cardDivBody = $('<div>');
                $(cardDivBody).addClass('card-body');
              var cardDivText = $('<p>');
              $(cardDivText).addClass('card-text');
              $(cardDivText).text('');
             $(cardDivBody).append(cardDivText);
    
                $(cardDivCard).append(cardDivCardTitle);
                $(cardDivProfile).append(profileDivProfileImg);
                $(profileDivProfileAttributes).append(attributeDivAttributesHp);
                $(profileDivProfileAttributes2).append(attributeDivAttributesAp);
                $(cardDivProfile).append(profileDivProfileAttributes);
                $(cardDivProfile).append(profileDivProfileAttributes2);
                $(cardDivCard).append(cardDivProfile);
                $(cardDivCard).append(cardDivBody);
                

                return cardDivCard;

    }
            // my own rnadom number generator function that generates a random number by passing the smallest number and largest number you whant it to return
            function randomNum(min, max) {
                var n = Math.floor((Math.random() * max) + min);
                return n;
            }
        });