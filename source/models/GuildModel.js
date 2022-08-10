const { Schema, model } = require("mongoose");

const GuildModel = new Schema({
  //Guild ID
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  needed: {
    //Needed values
    texts: {
      modlog: {
        type: String,
        default: null,
      },
      chat: {
        type: String,
        default: null,
      },
      welcome_channel: {
        type: String,
        default: null
      }
    },
    safe: {
      safeUsr: {
        type: Array,
        default: null,
      },
      safeBot: {
        type: Array,
        default: null,
      },
      safeRol: {
        type: Array,
        default: null,
      },
      safeLink: {
        type: Array,
        default: null,
      },
    },
    systems: {
      linkKill: {
        default: false,
        type: Boolean,
      },
      badWKill: {
        default: false,
        type: Boolean,
      },
      voiceMuteSys: {
        default: false,
        type: Boolean,
      },
      logSys: {
        default: false,
        type: Boolean,
      },
      langPr: {
        default: "en-US",
        type: String,
      },
      welcomeSys: {
        default: false,
        type: Boolean
      }
    },
    roles: {
      jailRol: {
        default: null,
        type: String,
      },
      susRol: {
        default: null,
        type: String,
      },
      adminRol: {
        default: null,
        type: String,
      },
    },
    events: {
      chCr: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      chDel: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      chUp: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      banAdd: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      banRem: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      usrAdd: {
        // Added to Captcha
        activated: {
          default: false,
          type: Boolean,
        },
      },
      usrRem: {
        activated: {
          default: false,
          type: Boolean,
        },
      },
      usrUp: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      guildUp: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      invCr: {
        killty: {
          defualt: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      invDel: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      msgSnd: {
        badWordPr: {
          activated: {
            default: false,
            type: Boolean,
          },
          killty: {
            default: null,
            type: String,
          },
        },
        linkPr: {
          activated: {
            default: false,
            type: Boolean,
          },
          killty: {
            default: null,
            type: String,
          },
        },
      },
      msgDel: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      msgDelBulk: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      msgUp: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      prsUp: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      rolCr: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      rolDel: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      rolUp: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      usrUp: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      thrCr: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      thrDel: {
        killty: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
      vcStatUp: {
        killty: {
          default: false,
          type: Boolean,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
    },
  },
  other: {
    preOne: {
      default: false,
      type: Boolean,
    },
    preTwo: {
      default: false,
      type: Boolean,
    },
    prefeature: {
      captcha: {
        channel: {
          default: null,
          type: String,
        },
        role: {
          default: null,
          type: String,
        },
        activated: {
          default: false,
          type: Boolean,
        },
      },
    },
  },
});

module.exports = model("Guild_DB", GuildModel);
