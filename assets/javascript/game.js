// Each character in the game has 3 attributes: `Health Points`, `Attack Power` and`Counter Attack Power`.
$(document).ready(function () {
    

var idCounter = 0;
var characterBase = function (_image, _name, _type, _health, _attackPower, _counterAttackPower) {
    return {
        id: idCounter++,
        image: _image,
        name: _name,
        type: _type,
        health: _health,
        attackPower: _attackPower,
        counterAttackPower: _counterAttackPower,
    };
};



var names = ['Olozumin','Krisrora','Perqen','Daharice','Bromno'];
var types = ['Human','Elf','Human','Mage','Elf','Eladrin'];
var deck = $('<div>');
    $(deck).addClass('card-deck');
    var caPoints = [20, 15, 26, 12, 67];
//var caPoints = getCAPoints();
for(var i=0;i<names.length,i++;){
    var ap = random(20, 40);
    var charPlayer = new characterBase('/assets/images/p'+i+'.jpg', names[i], types[i], 100, 100-ap, caPoints[i]);
    var newPlayerCard = createCharCard(charPlayer);
    $(deck).append(newPlayerCard);
}

$('#gameArea').append(deck);

// Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
// For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6(12, 18, 24, 30 and so on).
// The enemy character only has`Counter Attack Power`.
// Unlike the player's `Attack Points`, `Counter Attack Power` never changes.
// The`Health Points`, `Attack Power` and`Counter Attack Power` of each character must differ.
// No characters in the game can heal or recover Health Points. 
// A winning player must pick their characters wisely by first fighting an enemy with low`Counter Attack Power`.This will allow them to grind`Attack Power` and to take on enemies before they lose all of their`Health Points`.Healing options would mess with this dynamic.
// Your players should be able to win and lose the game no matter what character they choose.The challenge should come from picking the right enemies, not choosing the strongest player.
function getCAPoints(){
    var prevnum = 0;
    var cap = [];
    for(let i=0;i<names.length,i++;){
    var ca = random(30, 50);
    if(prevnum === 0){       
        prevnum = ca;
        
    }else{
    do{
        ca = random(30, 50);
        var c = random(3, 5);
        ca =+ c;
    }while(ca < prevnum);
   cap.push(ca);
    }   
}
return cap;
}
function random(min,max){
   return Math.floor((Math.random() * max) + min);
}
var screen = function () {
    return { 
        
    
};};

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

function moveEnemies() {
    
}

function hasDefeatedAll() {


    return false;
}

// * The player chooses an opponent by clicking on an enemy's picture.
function selectOpponent(who) {
    
}
// * Once the player selects an opponent, that enemy is moved to a`defender area`.
function moveTo(who, whereTo) {
    
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


function createCharCard(_character){
    var id = "p" + _character.id;
    var cardDivCard = $('<div>');
    $(cardDivCard).addClass('card col-2 shadow-lg');
    $(cardDivCard).attr('id', 'card_' + id);
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
            $(profileDivProfileAttributes).attr('id', 'attributes_' + id);
                var attributeDivAttributesHp = $('<div>');
                $(attributeDivAttributesHp).addClass('progress-bar mt-1 hp');
                $(attributeDivAttributesHp).attr({
                                                                            role: 'progressbar',
                                                                            "aria-valuenow":"100",
                                                                            "aria-valuemin": "0",
                                                                            "aria-valuemax": "100",
                                                                        });
                $(attributeDivAttributesHp).css('width','100%');                                                     
                var attributeDivAttributesAp = $('<div>');
                $(attributeDivAttributesAp).addClass('progress-bar mt-1 ap');
                $(attributeDivAttributesAp).attr({
                    role: 'progressbar',
                    "aria-valuenow":"100",
                    "aria-valuemin": "0",
                    "aria-valuemax": "100",
                });
                $(attributeDivAttributesAp).css('width','100%');              
    var cardDivBody = $('<div>');
    $(cardDivBody).addClass('card-body');
    var cardDivText = $('<p>');
    $(cardDivText).addClass('card-text');
    $(cardDivText).text(_character.type);
    $(cardDivBody).append(cardDivText);
    
    $(cardDivCard).append(cardDivCardTitle);
    $(cardDivProfile).append(profileDivProfileImg);
    $(profileDivProfileAttributes).append(attributeDivAttributesHp);
    $(profileDivProfileAttributes).append(attributeDivAttributesAp);
    $(cardDivProfile).append(profileDivProfileAttributes);
    $(cardDivCard).append(cardDivProfile);
    $(cardDivCard).append(cardDivBody);
    
    return $(cardDivCard);

}


});