const { Schema, model } = require("mongoose");

const GuildModel = new Schema({
  //Guild ID
  discordId: {
    type: String,
    default: null,
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
        default: "en",
        type: String,
      },
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
    },
    events: {
      appCmdCr: {
        killty: {
          default: null,
          type: String,
        },
      },
      appCmdDel: {
        killty: {
          default: null,
          type: String,
        },
      },
      chCr: {
        killty: {
          default: null,
          type: String,
        },
      },
      chDel: {
        killty: {
          default: null,
          type: String,
        },
      },
      chUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      banAdd: {
        killty: {
          default: null,
          type: String,
        },
      },
      banRem: {
        killty: {
          default: null,
          type: String,
        },
      },
      usrAdd: {
        authSys: {
          default: false,
          type: Boolean,
        },
      },
      usrRem: {
        killty: {
          default: null,
          type: String,
        },
      },
      usrUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      guildUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      invCr: {
        killty: {
          defualt: null,
          type: String,
        },
      },
      invDel: {
        killty: {
          default: null,
          type: String,
        },
      },
      msgSnd: {
        badWordPr: {
          default: false,
          type: Boolean,
        },
        killty: {
          default: null,
          type: String,
        },
      },
      msgDel: {
        killty: {
          default: null,
          type: String,
        },
      },
      msgDelBulk: {
        killty: {
          default: null,
          type: String,
        },
      },
      msgRecAdd: {
        killty: {
          default: null,
          type: String,
        },
      },
      msgRecRem: {
        killty: {
          default: null,
          type: String,
        },
      },
      msgRecRemAll: {
        killty: {
          default: null,
          type: String,
        },
      },
      msgRecRemEmoj: {
        killty: {
          default: null,
          type: String,
        },
      },
      msgUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      prsUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      rolCr: {
        killty: {
          default: null,
          type: String,
        },
      },
      rolDel: {
        killty: {
          default: null,
          type: String,
        },
      },
      rolUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      stcCr: {
        killty: {
          default: null,
          type: String,
        },
      },
      stcDel: {
        killty: {
          default: null,
          type: String,
        },
      },
      stcUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      thrCr: {
        killty: {
          default: null,
          type: String,
        },
      },
      thrDel: {
        killty: {
          default: null,
          type: String,
        },
      },
      thrListSync: {
        killty: {
          default: null,
          type: String,
        },
      },
      thrMemsUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      thrMemUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      thrUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      usrUp: {
        killty: {
          default: null,
          type: String,
        },
      },
      vcStatUp: {
        killed: {
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
  },
});

module.exports = model("Guild_DB", GuildModel);
