const dashconf = (async () => {
    require("dotenv").config({
        path: "./source/data/.env",
    });
    const { client } = await require("../../index");
    const main = require("../data/main");
    const embed = require("../data/embeds");
    const GuildModel = require("../models/GuildModel");
    const UserModel = require("../models/UserModel");
    const DBD = require("discord-dashboard");
    const DarkDashboard = require("dbd-dark-dashboard");
    await DBD.useLicense(process.env.LICENSE_ID);
    DBD.Dashboard = DBD.UpdatedClass();
  
    const Dashboard = new DBD.Dashboard({
      port: process.env.PORT,
      noCreateServer: false,
      client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
      },
      redirectUri: process.env.WEB_URL + "/discord/callback",
      domain: process.env.WEB_URL,
      bot: client,
      acceptPrivacyPolicy: true,
      guildAfterAuthorization: {
        use: true,
        guildId: main.datasowner.mainserver,
      },
      requiredPermissions: [DBD.DISCORD_FLAGS.Permissions.ADMINISTRATOR],
      /*rateLimits: {
        manage: {
          windowMs: 10 * 60 * 1000,
          max: 75,
          message: "Sorry, you are limited.",
          store: null,
        },
        guildPage: {
          windowMs: 10 * 60 * 1000,
          max: 40,
          message: "Sorry, you are limited.",
          store: null,
        },
        settingsUpdatePostAPI: {
          windowMs: 15 * 60 * 1000,
          max: 75,
          message: "Sorry, you are limited.",
          store: null,
        },
        discordOAuth2: {
          windowMs: 15 * 60 * 1000,
          max: 2,
          message: "Sorry, you are limited.",
          store: null,
        },
      },*/
      minimizedConsoleLogs: true,
      underMaintenanceAccessKey: "moderator",
      underMaintenanceAccessPage: "/maintance-access",
      useUnderMaintenance: false,
      underMaintenance: {
        title: "Under Maintenance",
        contentTitle: "This page is under maintenance",
        texts: [
          "<br>",
          "We still want to change for the better for you.",
          "Therefore, we are introducing technical updates so that we can allow you to enjoy the quality of our services.",
          "<br>",
          'Come back to us later or join our <a href="https://www.moderatorbot.gq/support">Discord Support Server</a>',
        ],
        bodyBackgroundColors: ["#ffa191", "#ffc247"],
        buildingsColor: "#ff6347",
        craneDivBorderColor: "#ff6347",
        craneArmColor: "#f88f7c",
        craneWeightColor: "#f88f7c",
        outerCraneColor: "#ff6347",
        craneLineColor: "#ff6347",
        craneCabinColor: "#f88f7c",
        craneStandColors: ["#ff6347", , "#f29b8b"],
      },
      ownerIDs: main.datasowner.ownerids,
      theme: DarkDashboard({
        information: {
          createdBy: "Ata İlhan Köktürk",
          websiteTitle: "Moderator - Always Stay Safe!",
          websiteName: "Moderator",
          websiteUrl: "https://www.moderatorbot.gq/",
          dashboardUrl: "https://www.moderatorbot.gq/panel/",
          supporteMail: "support@moderatorbot.gq",
          supportServer: "https://www.moderatorbot.gq/support",
          imageFavicon:
            "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
          iconURL:
            "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
          pageBackGround: "linear-gradient(#2CA8FF, #155b8d)",
          loggedIn: "Successfully signed in panel.",
          mainColor: main.displaythings.colors.color_main,
          subColor: "#ebdbdb",
        },
        index: {
          card: {
            category: "Moderator's Panel",
            title: `Welcome the Moderator's web panel. You can easily manage Moderator's settings here`,
            image: "https://cdn.discordapp.com/attachments/877875685652307978/1005780415828742154/moderator_site_background.jpg",
            footer: "Always Stay Safe with Moderator!",
          },
          information: {
            category: "Updates",
            title: "Version Updated",
            description: `New version 0.0.2CB_patch2 is avable! Check patch notes on our server.`,
            footer: "Kokturk Web Software",
          },
          feeds: {
            category: "Updates",
            title: "Database Schema Changes",
            description: `Schemas and Models has changed. Check patch notes on our server`,
            footer: "Kokturk Web Software",
          },
        },
        commands: [
          {
            category: "Moderator Commands",
            subTitle:
              "Here all commands are listed. {} means 'required', [] means 'optional'",
            aliasesDisabled: true,
            list: [
              {
                commandName: "ban",
                commandUsage: "/ban {user} [reason] [days(1-7)]",
                commandDescription: "Ban any user with reason and days above 1-7.",
                commandAlias: "No aliases",
              },
              {
                commandName: "delete",
                commandUsage: "/delete {amount(1-100)} [user]",
                commandDescription: "You can delete above 1-100 messages with any spesific user option.",
                commandAlias: "No aliases",
              },
              {
                commandName: "help",
                commandUsage: "/help",
                commandDescription: "Help menu",
                commandAlias: "No aliases",
              },
            ],
          },
        ],
      }),
      settings: [
        {
          categoryId: "setup",
          categoryName: "Set-Up",
          categoryDescription: "Default settings is here. Can you change it.",
          categoryOptionsList: [
            {
              optionId: "lang",
              optionName: "Language",
              optionDescription: "Change bot language",
              optionType: DBD.formTypes.select({ English: "en-US", Türkçe: "tr" }),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.systems.langPr || null;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.systems.langPr": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
              }
            },
            {
              optionId: "logsyst",
              optionName: "Log System",
              optionDescription:
                "On/Off log system for all logs.",
              optionType: DBD.formTypes.switch((disabled = false)),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.systems.logSys || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.systems.logSys": newData }
                );
                return;
              },
            },
            {
              optionId: "logch",
              optionName: "Log Channel",
              optionDescription:
                "Set your log channel. All logs send 1 channel. So, select it carefully.",
              optionType: DBD.formTypes.channelsSelect(false, channelType = ["GUILD_TEXT"]),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.texts.modlog || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.texts.modlog": newData }
                );
                allowedCheck: async ({guild, user}) => {
                    const userSchema = await UserModel.findOne({ discordId: user.id });
                    const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                    let safeUser = guildSchema.needed.safe.safeUsr;
                    if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                    if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                    return {allowed: true, errorMessage: null};
                 }
              },
            },
            {
              optionId: "welcmCh",
              optionName: "Welcome Message Channel",
              optionDescription: "Set your welcome message channel. This channel must be visible all members.",
              optionType: DBD.formTypes.channelsSelect(false, channelType = ["GUILD_TEXT"]),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.texts.welcome_channel || null;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.texts.welcome_channel": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
              }
            },
          ],
        },
        {
          categoryId: "events",
          categoryName: "Events",
          categoryDescription:
            "Events catchers of Moderator is here. You can easly manage your events here.",
          categoryOptionsList: [
            {
              optionId: "chCr",
              optionName: "Channel Create",
              optionDescription: "If a channel creates, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(false),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.chCr.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.chCr.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
              }
            },
            {
              optionId: "chDel",
              optionName: "Channel Delete",
              optionDescription: "If a channel deletes, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(false),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.chDel.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.chDel.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
              }
            },
            {
              optionId: "chUp",
              optionName: "Channel Update",
              optionDescription: "If a channel updates, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(false),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.chUp.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.chUp.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "banAdd",
              optionName: "Someone Banned",
              optionDescription: "If somebody bans any user, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(false),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.banAdd.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.banAdd.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "banRem",
              optionName: "Someone Unbanned",
              optionDescription: "If somebody unbans someone, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(false),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.banRem.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.banRem.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "usrAdd",
              optionName: "Member Join",
              optionDescription: "If somebody join your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.usrAdd.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.usrAdd.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "usrRem",
              optionName: "Member Leave",
              optionDescription: "If somebody leaves your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.usrRem.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.usrRem.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "invCr",
              optionName: "Invite Create",
              optionDescription: "If somebody creates invite of your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.invCr.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.invCr.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "invDel",
              optionName: "Invite Delete",
              optionDescription: "If somebody deletes invite of your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.invDel.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.invDel.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "badWCatch",
              optionName: "Bad Word Catch",
              optionDescription: "If somebody uses badwords on server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.msgSnd.badWordPr.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.msgSnd.badWordPr.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "linkCatch",
              optionName: "Member Join",
              optionDescription: "If somebody join your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.msgSnd.linkPr.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.msgSnd.linkPr.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "msgDel",
              optionName: "Message Delete",
              optionDescription: "If somebody deletes message on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.msgDel.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.msgDel.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "msgDelBulk",
              optionName: "Message Deleted Bulk",
              optionDescription: "If somebody deletes bigger than 2 messages same time, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.msgDelBulk.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.msgDelBulk.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "msgUp",
              optionName: "Message Update",
              optionDescription: "If somebody updates a message on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.msgUp.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.msgUp.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "msgUp",
              optionName: "Message Update",
              optionDescription: "If somebody updates a message on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.msgUp.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.msgUp.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "prsUp",
              optionName: "Presence (Status etc.) Update",
              optionDescription: "If somebody updates status on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.prsUp.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.prsUp.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "rolCr",
              optionName: "Role Create",
              optionDescription: "If somebody creates role on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.rolCr.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.rolCr.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "rolDel",
              optionName: "Role Delete",
              optionDescription: "If somebody deletes role on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.rolDel.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.rolDel.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "rolUp",
              optionName: "Role Update",
              optionDescription: "If somebody updates role on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.rolCr.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.rolCr.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "usrUpd",
              optionName: "User Update",
              optionDescription: "If somebody updates user settings on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.usrUp.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.usrUp.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "thrCr",
              optionName: "Thread Create",
              optionDescription: "If somebody creates thread on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.thrCr.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.thrCr.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "thrDel",
              optionName: "Thread Delete",
              optionDescription: "If somebody deletes thread on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.thrDel.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.thrDel.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            {
              optionId: "vcStatUp",
              optionName: "Voice State Update",
              optionDescription: "If somebody updates voice states on your server, Moderator will log it to you. You can turn it on/off.",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.events.vcStatUp.activated || false;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.events.vcStatUp.activated": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
            
          ]
        },
        {
          categoryId: "premium",
          categoryName: "Premium",
          categoryDescription:
            "If you have premium, you can use premium features.",
          categoryOptionsList: [
            {
              optionId: "2fa",
              optionName: "Captcha",
              optionDescription: "On/Off Captcha",
              optionType: DBD.formTypes.switch(true),
              getActualSet: async ({ guild }) => {
                const serverConf = await GuildModel.findOne({
                  discordId: guild.id,
                });
                return serverConf.needed.systems.langPr || null;
              },
              setNew: async ({ guild, newData }) => {
                await GuildModel.findOneAndUpdate(
                  { discordId: guild.id },
                  { "needed.systems.langPr": newData }
                );
              },
              allowedCheck: async ({guild, user}) => {
                const userSchema = await UserModel.findOne({ discordId: user.id });
                const guildSchema = await GuildModel.findOne({ discordId: guild.id });
                let safeUser = guildSchema.needed.safe.safeUsr;
                if (guildSchema.needed.texts.modlog == null || undefined) return {allowed: false, errorMessage: "Your moderation log channel is not setted. Set your moderation log channel first."}
                if (userSchema.blacklisted == true) return {allowed: false, errorMessage: "You are blacklisted. You cannot use Moderator forever."}
                if (!safeUser.includes(user.id)) return {allowed: false, errorMessage: "You are not safe user. You cannot use any moderation commands. Please contact with server owner."}
                return {allowed: true, errorMessage: null};
            },
            },
          ],
        },
      ],
    });
    await Dashboard.init();
  })();

  module.exports = { dashconf };