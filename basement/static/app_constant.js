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
  },
  card: {
    copyId: {
      "archers": 26000001,
      "arrows": 28000001,
      "baby-dragon": 26000015,
      "balloon": 26000006,
      "bandit": 26000046,
      "barbarian-hut": 27000005,
      "barbarians": 26000008,
      "bats": 26000049,
      "battle-ram": 26000036,
      "bomb-tower": 27000004,
      "bomber": 26000013,
      "bowler": 26000034,
      "cannon": 27000000,
      "cannon-cart": 26000054,
      "clone": 28000013,
      "dark-prince": 26000027,
      "dart-goblin": 26000040,
      "electro-wizard": 26000042,
      "elite-barbarians": 26000043,
      "elixir-collector": 27000007,
      "executioner": 26000045,
      "fire-spirits": 26000031,
      "fireball": 28000000,
      "flying-machine": 26000057,
      "freeze": 28000005,
      "furnace": 27000010,
      "giant": 26000003,
      "giant-skeleton": 26000020,
      "goblin-barrel": 28000004,
      "goblin-gang": 26000041,
      "goblin-hut": 27000001,
      "goblins": 26000002,
      "golem": 26000009,
      "graveyard": 28000010,
      "guards": 26000025,
      "heal": 28000016,
      "hog-rider": 26000021,
      "hunter": 26000044,
      "ice-golem": 26000038,
      "ice-spirit": 26000030,
      "ice-wizard": 26000023,
      "inferno-dragon": 26000037,
      "inferno-tower": 27000003,
      "knight": 26000000,
      "lava-hound": 26000029,
      "lightning": 28000007,
      "lumberjack": 26000035,
      "mega-knight": 26000055,
      "mega-minion": 26000039,
      "miner": 26000032,
      "mini-pekka": 26000018,
      "minion-horde": 26000022,
      "minions": 26000005,
      "mirror": 28000006,
      "mortar": 27000002,
      "musketeer": 26000014,
      "night-witch": 26000048,
      "pekka": 26000004,
      "poison": 28000009,
      "prince": 26000016,
      "princess": 26000026,
      "rage": 28000002,
      "rocket": 28000003,
      "royal-ghost": 26000050,
      "royal-giant": 26000024,
      "skeleton-army": 26000012,
      "skeleton-barrel": 26000056,
      "skeletons": 26000010,
      "sparky": 26000033,
      "spear-goblins": 26000019,
      "tesla": 27000006,
      "the-log": 28000011,
      "three-musketeers": 26000028,
      "tombstone": 27000009,
      "tornado": 28000012,
      "valkyrie": 26000011,
      "witch": 26000007,
      "wizard": 26000017,
      "x-bow": 27000008,
      "zap": 28000008,
      "zappies": 26000052
    }
  },
  comment: {
    kind: [
      "Page",
      "User",
      "Deck"
    ]
  }
});
