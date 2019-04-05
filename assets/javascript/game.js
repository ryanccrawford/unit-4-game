const NAMES = ['Xiomi', 'Krisrora', 'Perqen', 'Daharice'];
const TYPES = ['Human', 'Elf', 'Mage', 'Underlord'];
var characters = [];
var ic = 0;
var idCounter = 0;
var selectedPlayer;
var enemiePlayers = [];
var button;
var kills = 0;

$(document).ready(function () {
    
    

    // Each character in the game has 3 attributes: `Health Points`, `Attack Power` and`Counter Attack Power`.
    // Created an Object to be a character
    var characterBase = function (_id, _image, _name, _type, _health, _attackPower, _counterAttackPower) {
        return {
            id: _id,
            cardId: function () {
                return 'card_p' + this.id
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
            counterAttackPower: _counterAttackPower,
        };
    };

    characters = createPlayers(NAMES, TYPES);
    var group = createDeck(characters);
    $('#gameArea').append(group);
   
    topMessage('CHOOSE YOUR CHARACTER', 'select-player', false, true);
    var gamearea = $('#gameArea');
    makeCardsSelectable(gamearea);
   


    function topMessage(message, styleClass = 'topMes', animation = 'none', fadeIn = true) {
        if (!animation === 'none' && !animation === false) {
            $('#topMessage').animation(animation);
        }
        if (fadeIn) {
            $('#topMessage').fadeIn();
        }
        $('#topMessage').empty();
        $('#topMessage').text(message);
        $('#topMessage').addClass(styleClass);
    }


    // Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
    // For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6(12, 18, 24, 30 and so on).
    // The enemy character only has`Counter Attack Power`.
    // Unlike the player's `Attack Points`, `Counter Attack Power` never changes.
    // The`Health Points`, `Attack Power` and`Counter Attack Power` of each character must differ.
    // No characters in the game can heal or recover Health Points. 
    // A winning player must pick their characters wisely by first fighting an enemy with low`Counter Attack Power`.This will allow them to grind`Attack Power` and to take on enemies before they lose all of their`Health Points`.Healing options would mess with this dynamic.
    // Your players should be able to win and lose the game no matter what character they choose.The challenge should come from picking the right enemies, not choosing the strongest player.

    function makeCardsSelectable() {
        var len = characters.length;
        

        for (let i = 0; i <= len - 1; i++) {
            var card = '#' + characters[i].cardId();
            
            $(card).addClass('selectable');
            $(card).click(function () {
                $('.active-card').removeClass('active-card');
               
                $(this).addClass('active-card');
                if (button) {
                    $(button).remove();
                }
                button = $('<button>');
                $(button).text('Select');
                $(button).addClass('btn btn-outline-primary');
                $(button).attr('id', 'button_' + i.toString());
                $(this).append(button);
                $(this).click(card, function (card) {
                    
                    selectedPlayer = card.currentTarget;
                    var l = characters.length;
                    for (let i = 0; i <= l - 1; i++) {
                        var loopCard = characters[i].getCard();
                        if (loopCard[0] === selectedPlayer) {
                            continue;
                        } else {
                            enemiePlayers.push(characters[i]);
                        }
                    }
                    moveAllEnemies('offence');
                })
            }
            );
        }




    }
    

    var screen = function () {
        return {};
    };

    // Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
    // For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6(12, 18, 24, 30 and so on).
    function calcAttackPower(base, currentAttackPower) {
 
        return currentAttackPower + base;

    }

    // // * The enemy character only has`Counter Attack Power`.
    //     * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

    //         * The`Health Points`, `Attack Power` and`Counter Attack Power` of each character must differ.

    // * No characters in the game can heal or recover Health Points. 

    // * A winning player must pick their characters wisely by first fighting an enemy with low`Counter Attack Power`.This will allow them to grind`Attack Power` and to take on enemies before they lose all of their`Health Points`.Healing options would mess with this dynamic.
    //     * When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
    function startGame() {
    
    }

    function chooseFighter() {
    

        return fighter;
    }

    // * The player must then defeat all of the remaining fighters.Enemies should be moved to a different area of the screen.
            function moveAllEnemies(location) {

                if (location === 'offence') {
                    moveTo(enemiePlayers, location);
                }
            
            }

            function hasDefeatedAll() {
                if(kills === enemiePlayers.length){
                    return true;
                }

                return false;
            }

            // * The player chooses an opponent by clicking on an enemy's picture.
            function selectOpponent(who) {
    
            }
            // * Once the player selects an opponent, that enemy is moved to a`defender area`.
            function moveTo(who, whereTo) {
                //who   enemiePlayers, 
                //location location
                var loc = $('#' + whereTo);
                for (let i = 0; i <= who.length - 1; i++) {
                    $(loc).append($(who[i].getCard()));
                }
        
    
            }

            function whereIs(who) {
    
            }

            function canAttack(who) {

                return false;
            }
            // * The player will now be able to click the`attack` button.
            // * Whenever the player clicks`attack`, their character damages the defender.The opponent will lose`HP`(health points).These points are displayed at the bottom of the defender's picture. 

            function attack(attacker, defender) {
    
            }



            function isAttacking(who) {
    


            }

            function isDefending(who) {
    

            }

            //     * The opponent character will instantly counter the attack.When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.
            function opponentAttack() {
    

            }
            // 3. The player will keep hitting the attack button in an effort to defeat their opponent.

            //    * When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.

            // 4. The player wins the game by defeating all enemy characters.The player loses the game the game if their character's `HP` falls to zero or below.
            function createPlayers(_names, _types) {
                var _characters = [];
                var ca = randomNum(10, 40);
                var apmax = 50;
                var numCharacters = _names.length;
                for (let h = 0; h <= numCharacters - 1; h++) {
    
                    var ap = randomNum(10, apmax);
                    apmax -= ap;
                    var charPlayer = new characterBase(h, 'assets/images/p' + h.toString() + '.jpg', _names[h], _types[h], 100, (100 - ap), ap);
                    _characters.push(charPlayer);
                }
                return _characters;
            }
            function createDeck(_characters) {
                var row = $('<div>');
                var charCounter = 0;
                $(row).addClass('row');
    
                var totalRows = Math.floor(characters.length / 4);
                if ((characters.length % 4) > 0) {
                    totalRows++;
                }
                for (let j = 0; j <= (totalRows); j++) {
                    var cgroup = $('<div>')
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
            function createCharCard(_character) {
                var id = "p" + _character.id;
                var cardDivCard = $('<div>');
                $(cardDivCard).addClass('card col-xs-8 col-m-6 col-xl-4');
                $(cardDivCard).attr('id', _character.cardId());
                var cardDivCardTitle = $('<h4>');
                $(cardDivCardTitle).addClass('card-title');
                $(cardDivCardTitle).attr('id', 'title_' + id);
                $(cardDivCardTitle).text(_character.name);
                var cardDivProfile = $('<div>');
                $(cardDivProfile).addClass('profile');
                $(cardDivProfile).attr('id', 'profile_' + id);
                var profileDivProfileImg = $('<img>');
                $(profileDivProfileImg).addClass('card-img-top ml-1 mr-1');
                $(profileDivProfileImg).attr('id', _character.id);
                $(profileDivProfileImg).attr('src', _character.image)
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
                $(cardDivText).text(_character.type);
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
            function getCAPoints() {
                var prevnum = 0;
                var cap = [];
                for (let i = 0; i < names.length, i++;) {
                    var ca = random(30, 50);
                    if (prevnum === 0) {
                        prevnum = ca;
                    } else {
                        do {
                            ca = random(30, 50);
                            var c = random(3, 5);
                            ca = + c;
                        } while (ca < prevnum);
                        cap.push(ca);
                    }
                }
                return cap;
            }
            function randomNum(min, max) {
                var n = Math.floor((Math.random() * max) + min);
                return n;
            }
        });