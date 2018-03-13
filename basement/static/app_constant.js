"use strict";

/**
 * Main constant
 */
app.constant("Main", {
  roles: [
    "member",
    "elder",
    "coleader",
    "leader",
  ],
  sorts: {
    rarity: {
      common: 0,
      rare: 1,
      epic: 2,
      legendary: 3
    },
    type: {
      Troop: 0,
      Spell: 1,
      Building: 2
    }
  },
  deck: {
    kind: [
      "None",
      "Cycle",
      "Spell Bait",
      "Beatdown",
      "Spawner",
      "Three Crowns",
      "Control",
      "Siege"
    ],
    arena: [
      "All Arenas",
      "Training Camp",
      "Goblin Stadium",
      "Bone Pit",
      "Barbarian Bowl",
      "P.E.K.K.A.'s Playhouse",
      "Spell Valley",
      "Builders Workshop",
      "Royal Arena",
      "Frozen Peak",
      "Jungle Arena",
      "Hog Mountain",
      "Electro Valley",
      "Legendary Arena",
    ]
  },
  activity: {
    kind: [
      "None",
      "Update",
      "User",
      "Deck"
    ]
  }
});
