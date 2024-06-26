# JavaScript-CowboyGame

[Demo ](http://www.basaksecmen.com/projects/p6/cowboyGame/html/)

## Rules

On the map, 4 weapons are placed randomly and can be collected by players who pass through.

Each weapon has different damage inflicted between 12 and 18 points. The default weapon which team players inflict 10 points of damage.

The placement of the two players is also randomly on the map when the game loads.

## Movements

For each turn, a player can move from one to three boxes (horizontally or vertically) before ending their turn. They obviously can not pass through obstacles directly.

If a player passes over a box containing a weapon, they leave their current weapon on site and replace it with the new one.

## Fight!

If players cross over adjacent squares (horizontally or vertically), a battle begins.

During combat, the game works is as follows:

- Each player attacks in turn
- The damage depends on the player's weapon
- The player can choose to attack or defend against the next shot
- If the player chooses to defend themselves, they sustain 50% less damage than normal
- As soon as the life points of a player (initially 100) falls to 0, they lose.
