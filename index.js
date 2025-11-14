

// ----------------------
// Zone Class
// ----------------------
class Zone {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedZones = {};
    this._character = null;
    this._items = [];
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character;
  }

  get items() {
    return this._items;
  }

  set name(value) {
    if (value.length < 3) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 3) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  addItem(item) {
    this._items.push(item);
  }

  removeItem(itemName) {
    this._items = this._items.filter(item => item.name !== itemName);
  }

  hasItem(itemName) {
    return this._items.some(item => item.name === itemName);
  }

//check description of item here//
   describe() {
    let itemDescription = "";
    if (this._items.length > 0) {
      itemDescription =
        ". You see " +
        this._items.map(item => item.describe().toLowerCase()).join(" and ");
    }
    //check wording here//
    return (
      "You are at the " +
      this._name +
      ". You can see " +
      this._description +
      itemDescription
    );
  }


linkZone(direction, zoneToLink) {
    this._linkedZones[direction] = zoneToLink;
  }

  getDetails() {
    const entries = Object.entries(this._linkedZones);
    let details = [];
    for (const [direction, zone] of entries) {
      let text = "The " + zone.name + " is to the " + direction + ".";
      details.push(text);
    }
    return details;
  }

  // Move to another zone
  move(direction) {
    if (direction in this._linkedZones) {
      return this._linkedZones[direction];
    } else {
      alert("You can’t go that way.");
      return this;
    }
  }
}


  //Item class//
class Item {
  constructor(name) {
    this._name = name;
    this._description = "";
  }

 set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    return "a " + this._name + ". It is " + this._description;
  }
}
  //
// Character class 

class Character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";
    this._wantedItem = null; 
    this._rewardBehaviour = null; 
  }

  set name(value) {
    this._name = value;
  }

  set description(value) {
    this._description = value;
  }

  set conversation(value) {
    this._conversation = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return "You have met " + this._name + ", who is " + this._description;
  }

  converse() {
    return this._name + " says '" + this._conversation + "'";
  }

  setWantedItem(itemName, rewardCallback) {
    this._wantedItem = itemName;
    this._rewardBehaviour = rewardCallback;
  }

   give(itemName) {
    if (this._wantedItem && itemName === this._wantedItem) {
      if (this._rewardBehaviour) {
        this._rewardBehaviour(); // trigger reward (could be giving a new item, unlocking a door, etc.)
      }
      return `${this._name} looks pointedly towards the East as he accepts the ${itemName}.`;
    } else {
      return `${this._name} doesn’t want that.`;
    }
  }
}


  
// ----------------------
// Setup Zones and Items
// ----------------------
const Underbed = new Zone("Underbed");
Underbed.description = "that it is dusty from monster grabbing, and is decorated with one bouncy ball, a hair bobble and three faded jellybeans.";

const Rug = new Zone("rug");
Rug.description = "it's made of soft yellow fluff, which tickles your wrist";
const gem = new Item("gem");
gem.description = " made of plastic, pink and twinkling, partly hidden in the pile.";
Rug.addItem(gem);


const Wardrobe = new Zone("wardrobe");
Wardrobe.description = "one of its doors is open. Some toys have tumbled out";
const block = new Item("block");
block.description = "smooth, blue and a bit scratched and dented.";
Wardrobe.addItem(block);


const Windowsill = new Zone("windowsill");
Windowsill.description = "the window is open once you climb the curtain and reach the sill.";
const ghoul = new Character("Ghoul");
ghoul.description = "swinging from the window on a string, blowing in the wind. He looks sinister...";
ghoul.conversation = "Come any closer and I will send you flying, pesky hand!"

Windowsill.character = ghoul;


const Chair = new Zone("chair");
Chair.description = "a pink patchwork cushion on the white wooden seat.";
const doll = new Character("Doll");
doll.description = "nestled in the chair with her skirts arranged just so, she pats the cushion invitingly.";
doll.conversation = "It's so comfortable here, Righthand. Will you rest a while?"

Chair.character = doll;

const Bookshelf = new Zone("bookcase");
Bookshelf.description = "Teenie's treasures all gathered here. The shelves are close together enough to climb. You don't see Babyhand.";

const Walkingsock = new Character("Walkingsock");
Walkingsock.description = "a grey-brown sock that used to be blue, with a hole in the toe. It smiles helpfully at you."
Walkingsock.conversation = "Are you looking for Babyhand? I think I can help you... for a small token."
Walkingsock.setWantedItem("gem", function() {
  playerInventory = playerInventory.filter(i => i !== "gem");
});

Bookshelf.character = Walkingsock;


const Washbasket = new Zone("washbasket");
Washbasket.description = "the basket is very full...";

const Babyhand = new Character("Babyhand");
Babyhand.description = "emerging from the washing basket! You are so relieved you could hug her... She has found a silky ribbon at the bottom of the laundry pile and fastened it to her smallest finger."
Babyhand.conversation = "I saw a ribbon shining in the washing pile from way over in Underbed!"
Washbasket.character = Babyhand;

//create win cond//

// Utility function to show text in the browser
function showText(text) {
  const gameText = document.getElementById("game-text");
  gameText.innerHTML = text;
}


// ----------------------
// Link Zones
// ----------------------
Underbed.linkZone("south", Wardrobe);
Underbed.linkZone("east", Rug);
Wardrobe.linkZone("north", Underbed);
Wardrobe.linkZone("east", Windowsill);
Rug.linkZone("west", Underbed);
Rug.linkZone("east", Chair);
Rug.linkZone("north", Bookshelf);
Rug.linkZone("south", Windowsill);
Windowsill.linkZone("west", Wardrobe);
Windowsill.linkZone("north", Rug);
Bookshelf.linkZone("south", Rug);
Bookshelf.linkZone("east", Washbasket);
Chair.linkZone("west", Rug);
Washbasket.linkZone("west", Bookshelf);

// ----------------------
// Game Logic
// ----------------------
let currentZone = Underbed;
let playerInventory = [];

function displayZoneInfo(zone) {
  const output = document.getElementById("output");

  let occupantMsg = "";
  if (zone.character) {
    occupantMsg = zone.character.describe() + "<br>" + zone.character.converse();
  }

  const description = zone.describe();
  const details = zone.getDetails().join("<br>");
  const inventory = playerInventory.length > 0 ? playerInventory.join(", ") : "empty";

  output.innerHTML = `
    <p>${description}</p>
    <p>${occupantMsg}</p>
    <p>${details}</p>
    <p>Your inventory: ${inventory}</p>
  `;
}

function grabItem(itemName) {
  if (currentZone.hasItem(itemName)) {
    currentZone.removeItem(itemName);
    playerInventory.push(itemName);
    return true;
  }
  return false;
}


function gameOver(reason) {
  const output = document.getElementById("output");
  output.innerHTML += `<p><strong>GAME OVER:</strong> ${reason}</p>`;
  const inputBox = document.getElementById("usertext");
  inputBox.disabled = true;
}


function winCondition(reason) {
  const output = document.getElementById("output");
  output.innerHTML += `<p><strong>YOU WIN!:</strong> ${reason}</p>`;
  const inputBox = document.getElementById("usertext");
  inputBox.disabled = true;
}


function startGame() {
  currentZone = Underbed;
  displayZoneInfo(currentZone);
  const inputBox = document.getElementById("usertext");

  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = inputBox.value.trim().toLowerCase();
      const directions = ["north", "south", "east", "west"];
      const output = document.getElementById("output");


      if (directions.includes(command)) {
        currentZone = currentZone.move(command);
        displayZoneInfo(currentZone);


      } else if (command.startsWith("talk")) {
      if (currentZone.character) {
        output.innerHTML += `<p>${currentZone.character.converse()}</p>`;
      } else {
        output.innerHTML += `<p>There's no one here to talk to.</p>`;
      }
      
      
      } else if (command.startsWith("give ")) {
      const parts = command.split(" to ");
      if (parts.length === 2) {
        const itemName = parts[0].replace("give ", "").trim();
        const charName = parts[1].trim();

     if (playerInventory.includes(itemName) && currentZone.character && currentZone.character.name.toLowerCase() === charName) {
  const response = currentZone.character.give(itemName);
  output.innerHTML += `<p>${response}</p>`;

  if (response.includes("looks pointedly to the east as he accepts")) {
    playerInventory = playerInventory.filter(i => i !== itemName);
  }

    } else {
      output.innerHTML += `<p>You can't give that here.</p>`;
    }
  } else {
    output.innerHTML += `<p>Try 'give [item] to [character]'.</p>`;
  }
//this part working fine^^//

  //ghoul use block code here V V  //
  } else if (command.startsWith("use ")) {
    const parts = command.split(" on ");
  if (parts.length === 2) {
    const itemName = parts[0].replace("use ", "").trim();
    const targetName = parts[1].trim();

  if (playerInventory.includes(itemName) && currentZone.character && currentZone.character.name.toLowerCase() === targetName) {
      output.innerHTML += `<p>You use the ${itemName} on ${targetName}. ${targetName} shrieks as the block makes contact, the string breaks and ghoul falls out of the window!</p>`;
      playerInventory = playerInventory.filter(i => i !== "block");
    } else {
      output.innerHTML += `<p>That doesn't seem to work.</p>`;
    }

  } else {
    output.innerHTML += `<p>Try 'use [item] on [character]'.</p>`;
  }

  } else if (command.startsWith("grab ")) {
    const itemName = command.replace("grab ", "");
  if (grabItem(itemName)) {
    output.innerHTML += `<p>You grabbed the ${itemName}!</p>`;
  } else {
    output.innerHTML += `<p>There's no ${itemName} here to grab.</p>`;
  }

  } else if (command.startsWith("rest")) {
    if (currentZone === Chair && currentZone.character && currentZone.character.name === "Doll") {
    output.innerHTML += `<p>You sit on the chair beside Doll. It's very warm here... you fall asleep.</p>`;
    gameOver("Sentryhand collects you and takes you back to Underbed before Teenie gets home. Babyhand will have to wait...");
  } else {
    output.innerHTML += `<p>You can’t sit here.</p>`;
  }

  } else if (command.startsWith("hug")) {
  if (currentZone === Washbasket && currentZone.character && currentZone.character.name === "Babyhand") {
    output.innerHTML += `<p>You hug Babyhand. She is safe!</p>`;
    winCondition("You clamber back through the bedroom to the safety of Underbed together, Babysock's new ribbon catching the light as you go.");
  }

      } else {
        output.innerHTML += `<p>Unknown command.</p>`;
      }

      inputBox.value = "";
    }
  });
}

// Start the game on page load
window.onload = startGame;
