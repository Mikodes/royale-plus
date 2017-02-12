/**
 * @desc App version
 */
var version = "0.1.6";

/**
 * @desc Member class
 * 
 * @param {string} name
 * @param {string} role
 * @param {string} rarity
 * @param {string} donation
 * @param {string} tags
 */
var Member = function (name, role, rarity, donation, tags) {
  this.name = name;
  this.role = role;
  this.rarity = rarity;
  this.donation = donation;
  this.tags = tags;
  this.score = this.tags ? (50 * this.tags.length) : 0;
  this.tagElements = "";

  /**
   * @param {string} tag
   *
   * @returns {boolean}
   */
  this.hasTag = function (tag) {
    return this.tags ? this.tags.indexOf(tag) !== -1 : false;
  };

  this.getElement = function () {
    return $(
      "<div member='" + this.name + "' class='" + this.rarity + "' onclick='Members.show(this)'>" +
      "<name>" + this.name + "</name>" +
      "<score>" + this.score + "</score>" +
      "<br>" +
      "<role>" + this.role + "</role>" + this.tagElements +
      "</div>"
    );
  };

  this.score += (
    Members.scores.role[this.role] +
    Members.scores.donation[this.donation] +
    Members.scores.rarity[this.rarity]
  );

  for (var i in this.tags) {
    this.tagElements += (
      "<tag title='" + this.tags[i] + "'>" +
      "<i class='fa fa-" + Members.tags[this.tags[i]] + "'></i>" +
      "</tag>"
    );
  }

  Members.instances.push(this);
};

/**
 * @desc Card class
 * 
 * @param {string} id
 * @param {string} idName
 * @param {string} name
 * @param {string} rarity
 * @param {string} type
 * @param {string} description
 * @param {string} arena
 * @param {number} elixirCost
 */
var Card = function (id, idName, name, rarity, type, description, arena, elixirCost) {
  this.id = id;
  this.idName = idName;
  this.name = name;
  this.rarity = rarity;
  this.type = type;
  this.description = description;
  this.arena = arena;
  this.elixirCost = elixirCost;
  this.imageUrl = Decks.baseUrl + "images/cards/" + this.idName + ".png";

  /**
   * @returns {element}
   */
  this.getElement = function () {
    return $(
      "<div card='" + this.index + "'>" +
      "<cover style='background-image: url(" + this.imageUrl + ")' class='" + this.rarity.toLowerCase() + "'>" +
      "<elixir-cost>" + this.elixirCost + "</elixir-cost><name>" + this.name + "</name>" +
      "</cover>" +
      "</div>"
    );
  };

  this.index = Cards.instances.push(this);
};

/**
 * @desc Static class for Members
 */
var Members = {

  instances: [],

  load: function () {
    $.ajax({
      type: "get",
      url: "static/data/members.json?v=" + version,
      success: function (data) {
        Members.instances = [];
        for (var i in data) {
          new Member(data[i].name, data[i].role, data[i].rarity, data[i].donation, data[i].tags);
        }
        Members.append();
        log("Loaded " + data.length + " members");
      }
    });
  },

  scores: {
    role: {
      leader: 325,
      "co-leader": 100,
      elder: 25,
      member: 0
    },
    donation: {
      s: 150,
      a: 100,
      b: 50,
      c: 25,
      d: 0
    },
    rarity: {
      legendary: 150,
      epic: 75,
      rare: 25,
      common: 0
    },
  },

  tags: {
    godlike: "user-secret",
    creator: "cube",
    whatsapp: "whatsapp",
    "clan chest master": "trophy"
  },

  append: function () {
    Members.instances = Members.instances.sort(function (a, b) {
      return b.score - a.score;
    });

    $("#members").html(" ");

    $.each(Members.instances, function (i, member) {
      $("#members").append(member.getElement());
    });

    $("#members").parents(".animated").css("display", "block");
  },

  /**
   * @param {element} element
   */
  show: function (element) {
    var member = select(Members.instances, "name", $(element).attr("member"));
    $("#memberModal").modal();
    $("#memberModal .modal-dialog").html($(element).clone());
    $("#memberModal [member]").attr("onclick", "");
  }
};

/**
 * @desc Static class for cards
 */
var Cards = {
  instances: [],

  append: function () {
    Cards.instances = Cards.instances.sort(function (a, b) {
      return b.elixirCost - a.elixirCost;
    });

    $("#cards").html(" ");

    $.each(Cards.instances, function (i, card) {
      $("#cards").append(card.getElement());
    });

    $("#cards").parents(".animated").css("display", "block");
  }
};

/**
 * @desc Static class for decks
 */
var Decks = {

  baseUrl: "http://www.clashapi.xyz/",

  random: function () {
    $.ajax({
      type: "get",
      url: Decks.baseUrl + "api/random-deck",
      success: function (data) {
        Cards.instances = [];
        for (var i in data) {
          var card = data[i];
          new Card(
            card._id, card.idName, card.name, card.rarity, card.type, card.description, card.arena, card.elixirCost
          );
        }
        Cards.append();
        log("Loaded random deck");
      }
    });
  }
};

/**
 * @private
 *
 * @param {string} string
 */
function log(string) {
  if (localStorage.debug) {
    console.debug("</> ", string);
  }
}

/**
 * @private
 */
function initialize() {
  // Initial local storage
  localStorage.wallpaper = localStorage.wallpaper || "pattern";
  localStorage.autoJoinDiscussion = localStorage.autoJoinDiscussion || false;

  // Getting members
  Members.load();

  // Generate random deck
  Decks.random();

  // Setting wallpaper
  if (localStorage.wallpaper) {
    $("body").removeClass().addClass(localStorage.wallpaper).css(
      "background-image", "url('static/img/" + localStorage.wallpaper + ".jpg')"
    );
    $("[name=wallpaper][value=" + localStorage.wallpaper + "]").prop("checked", true);
    log("Loaded " + localStorage.wallpaper + " wallpaper");
  }

  // Joining discussion
  if (localStorage.autoJoinDiscussion === "true") {
    $("[name=autoJoinDiscussion]").prop("checked", true);
    joinDiscussion($("#joinDiscussionButton"));
    log("Auto joining discussion");
  }

  // Current vars into html
  $("#currentYear").text(new Date().getFullYear());
  $("#currentVersion").text("v" + version);
}

/**
 * @private
 *
 * @param {element} element
 */
function joinDiscussion(element) {
  $("body").append("<script id='dsq-count-scr' src='//donate-clan.disqus.com/count.js' async></script>");
  $.ajax({
    type: "get",
    url: "static/data/discussion.html",
    success: function (data) {
      $(element).parent().html(data);
      log("Loaded discussion");
    }
  });
}

/**
 * @private
 *
 * @param {array} master
 * @param {string} key
 * @param {any} value
 */
function select(master, key, value) {
  for (var i in master) {
    if (master[i][key] === value) {
      return master[i];
    }
  }
}

/**
 * @private
 * 
 * @param {element} element
 */
function updateSettings(element) {
  if (element.name === "wallpaper") {
    localStorage.wallpaper = element.value;
  } else if (element.name == "autoJoinDiscussion") {
    localStorage.autoJoinDiscussion = element.checked;
  }
  initialize();
}

/**
 * @private
 */
$("body").on("DOMNodeInserted", "*", function () {
  $("[title]").tooltip();
});
