const dashconf = (async () => {
  require("dotenv").config({
    path: "./source/data/.env",
  });
  const { client } = await require("../../index");
  const main = require("./main");
  const embed = require("./embeds");
  const GuildModel = require("../models/GuildModel");
  const UserModel = require("../models/UserModel");
  const DBD = require("discord-dashboard");
  const SoftUI = require("dbd-soft-ui");
  await DBD.useLicense(process.env.LICENSE_ID);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    port: process.env.PORT,
    underMaintenanceAccessKey: 'totalsecretkey',
    underMaintenanceAccessPage: '/total-secret-get-access',
    useUnderMaintenance: true,
    useThemeMaintenance: true,
    underMaintenance: {
      title: "Under Maintenance/Bakımda",
      contentTitle: "This page is under maintenance/Bakımdayız",
      texts: [
        "We still want to change for the better for you.",
        "Therefore, we are introducing technical updates so that we can allow you to enjoy the quality of our services.",
        "Come back to us later or join our Discord Support Server",
      ],

      // "Must contain 3 cards. All fields are optional - If card not wanted on maintenance page, infoCards can be deleted",
      infoCards: [
        {
          title: "100+",
          subtitle: "Over 100 commands!",
          description: "Look at our commands during our downtime",
        },
        {
          title: "500",
          subtitle: "Text",
          description: "Description here!",
        },
        {
          title: "!",
          subtitle: "Warning",
          description: "Do you even have permission to be here?",
        },
      ],
    },
    noCreateServer: false,
    client: {
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
    },
    redirectUri: process.env.WEB_URL + "/discord/callback",
    domain: process.env.WEB_URL,
    bot: client,
    acceptPrivacyPolicy: true,
    disableResolvingGuildCache: true,
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
      },
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
      */
    ownerIDs: main.datasowner.ownerids,
    theme: SoftUI({
      customThemeOptions: {
        index: async ({ req, res, config }) => {
          const cards = [
            {
              title: "Current User",
              icon: "single-02",
              getValue: client.users.cache.size,
              progressBar: {
                enabled: false,
                getProgress: client.users.cache.size, // 0 - 100 (get a percentage of the progress)
              },
            },
            {
              title: "CPU",
              icon: "chart-bar2",
              getValue: "%" + (process.cpuUsage().system / 100000).toFixed(2),
              progressBar: {
                enabled: true,
                getProgress: (process.cpuUsage().system / 100000).toFixed(2), // 0 - 100 (get a percentage of the progress)
              },
            },
            {
              title: "System Platform",
              icon: "chart-bar2",
              getValue:
                (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + "MB",
              progressBar: {
                enabled: true,
                getProgress: (
                  process.memoryUsage().external /
                  1024 /
                  512
                ).toFixed(2), // 0 - 100 (get a percentage of the progress)
              },
            },
            {
              title: "Server Count",
              icon: "chart-bar2",
              getValue: client.guilds.cache.size,
              progressBar: {
                enabled: false,
                getProgress: client.guilds.cache.size, // 0 - 100 (get a percentage of the progress)
              },
            },
          ];

          const graph = {
            values: [
              690, 524, 345, 645, 478, 592, 468, 783, 459, 230, 621, 345,
            ],
            labels: [
              "1m",
              "2m",
              "3m",
              "4m",
              "5m",
              "6m",
              "7m",
              "8m",
              "9m",
              "10m",
            ],
          };

          return {
            cards,
            graph,
          };
        },
      },
      premium: {
        enabled: true,
        card: {
          title: "Want more from Moderator?",
          description: "Check out premium features below!",
          bgImage:
            "https://cdn.discordapp.com/attachments/877875685652307978/882306430227603506/moderator_gif.gif",
          button: {
            text: "Become Premium",
            url: "https://patreon.com/atailh4n",
          },
        },
      },
      locales: {
        enUS: {
          name: "English",
          index: {
            feeds: ["Current Users", "CPU", "RAM Usage", "Server Count"],
            card: {
              category: "Moderator",
              title: "Moderator - Always stay safe!",
              description:
                "Moderator Discord Bot management panel. Moderator Bot was created to give others the moderation to do what they want.",
              image:
                "https://cdn.discordapp.com/attachments/877875685652307978/889874674413076550/static.png",
              footer: "Come our Discord server",
            },
            feedsTitle: "Feeds",
            graphTitle: "Graphs",
          },
          manage: {
            settings: {
              memberCount: "Members",
              info: {
                info: "Info",
                server: "Server Information",
              },
            },
          },
          privacyPolicy: {
            title: "Privacy Policy",
            description: "Privacy Policy and Terms of Service",
            pp: "Complete Privacy Policy can be founded at <a href='https://webmoderator.kokturkwebsoftware.ml/privacy/#privacy-policy'>here</a>",
          },
          partials: {
            sidebar: {
              dash: "Dashboard",
              manage: "Manage Guilds",
              commands: "Commands",
              pp: "Privacy Policy",
              admin: "Admin",
              account: "Account Pages",
              login: "Sign In",
              logout: "Sign Out",
            },
            navbar: {
              home: "Home",
              pages: {
                manage: "Manage Guilds",
                settings: "Manage Guilds",
                commands: "Commands",
                pp: "Privacy Policy",
                admin: "Admin Panel",
                error: "Error",
                credits: "Credits",
                debug: "Debug",
                leaderboard: "Leaderboard",
                profile: "Profile",
                maintenance: "Under Maintenance",
              },
            },
            title: {
              pages: {
                manage: "Manage Guilds",
                settings: "Manage Guilds",
                commands: "Commands",
                pp: "Privacy Policy",
                admin: "Admin Panel",
                error: "Error",
                credits: "Credits",
                debug: "Debug",
                leaderboard: "Leaderboard",
                profile: "Profile",
                maintenance: "Under Maintenance",
              },
            },
            preloader: {
              text: "Page is loading...",
            },
            premium: {
              title: "Want more from Moderator?",
              description: "Check out premium features below!",
              buttonText: "Become Premium",
            },
            settings: {
              title: "Site Configuration",
              description: "Configurable Viewing Options",
              theme: {
                title: "Site Theme",
                description: "Make the site more appealing for your eyes!",
              },
              language: {
                title: "Site Language",
                description: "Select your preffered language!",
              },
            },
          },
        },
        tr: {
          name: "Türkçe",
          index: {
            feeds: ["Anlık Kullanıcı", "CPU", "RAM Kullanımı", "Server Sayısı"],
            card: {
              category: "Her zaman güvende kalın!",
              title: "Moderator - En iyi moderasyon botu.",
              description:
                "Moderator'ün yeni arayüzü ile daha kolay ve daha hızlı işlemler yapabileceksiniz.",
              image:
                "https://cdn.discordapp.com/attachments/877875685652307978/889874674413076550/static.png",
              footer: "Discord Sunucumuz'a gelin!",
            },
            feedsTitle: "Haberler",
            graphTitle: "Grafikler",
          },
          manage: {
            settings: {
              memberCount: "Üye",
              info: {
                info: "Bilgi",
                server: "Sunucu Bilgisi",
              },
            },
          },
          privacyPolicy: {
            title: "Gizlilik Politikası",
            description: "Gizlilik Politikası ve Hizmet Şartları",
            pp: "Tam gizlilik politikasına <a href='https://webmoderator.kokturkwebsoftware.ml/privacy/#privacy-policy'>buradan</a> erişebilirsiniz.",
          },
          partials: {
            sidebar: {
              dash: "Yönetim Paneli",
              manage: "Sunucuları Yönet",
              commands: "Komutlar",
              pp: "Gizlilik Politikası",
              admin: "Admin",
              account: "Giriş",
              login: "Giriş Yap",
              logout: "Oturumu Kapat",
            },
            navbar: {
              home: "Ana Sayfa",
              pages: {
                manage: "Sunucuları Yönet",
                settings: "Sunucuları Yönet",
                commands: "Komutlar",
                pp: "Gizlilik Politikası",
                admin: "Admin Paneli",
                error: "Hata",
                credits: "Yapanlar",
                debug: "Hata Ayıklama",
                leaderboard: "Sıralama",
                profile: "Profil",
                maintenance: "Bakımda",
              },
            },
            title: {
              pages: {
                manage: "Sunucuları Yönet",
                settings: "Sunucuları Yönet",
                commands: "Komutlar",
                pp: "Gizlilik Politikası",
                admin: "Admin Paneli",
                error: "Hata",
                credits: "Yapanlar",
                debug: "Hata Ayıklama",
                leaderboard: "Sıralama",
                profile: "Profil",
                maintenance: "Bakımda",
              },
            },
            preloader: {
              text: "Sayfa Yükleniyor...",
            },
            premium: {
              title: "Premium'a bakmak ister misin?",
              description: "Premium özelliklerini aşağıdan inceleyebilirsin!",
              buttonText: "Premium ol",
            },
            settings: {
              title: "Site Araçları",
              description: "Sitenin görüntüleme araçlarını düzenleyin.",
              theme: {
                title: "Site Teması",
                description: "Gözünüze uyan bir tema seçebilirsiniz!",
              },
              language: {
                title: "Site Dili",
                description: "Dilini seç!",
              },
            },
          },
        },
      },

      blacklisted: {
        title: "Blacklisted/Karalistelendin",
        subtitle: "Access denied/Erişim Yasak",
        description:
          "Unfortunately it seems that you have been blacklisted from the dashboard./Maalesef paneli kullanmanız sonsuza kadar yasaklandı.",
        button: {
          enabled: false,
          text: "Return",
          link: "https://google.com",
        },
      },
      websiteName: "Moderator",
      colorScheme: "blue",
      supporteMail: "support@kokturkwebsoftware.ml",
      icons: {
        favicon:
          "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
        noGuildIcon:
          "https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
        sidebar: {
          darkUrl:
            "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
          lightUrl:
            "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
          hideName: false,
          borderRadius: false,
          alignCenter: true,
        },
      },
      index: {
        card: {
          category: "News",
          title: "Assistants - The center of everything",
          description:
            "Assistants Discord Bot management panel. <b><i>Feel free to use HTML</i></b>",
          image:
            "https://cdn.discordapp.com/attachments/877875685652307978/889874674413076550/static.png",
          link: {
            enabled: true,
            url: "https://webmoderator.kokturkwebsoftware.ml/support",
          },
        },
        graph: {
          enabled: true,
          lineGraph: true,
          title: "Memory Usage",
          tag: "Memory (MB)",
          max: 100,
        },
      },
      feeds: {
        one: {
          color: "red",
          description: "test",
          published: "222",
          icon: "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
          diff: "https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png",
          feedNum: 1,
        },
      },
      sweetalert: {
        errors: {},
        success: {
          login: "Successfully logged in.",
        },
      },
      preloader: {
        image:
          "https://cdn.discordapp.com/attachments/877875685652307978/882306430227603506/moderator_gif.gif",
        spinner: false,
        text: "Moderator",
      },
      admin: {
        pterodactyl: {
          enabled: false,
          apiKey: "apiKey",
          panelLink: "https://panel.website.com",
          serverUUIDs: [],
        },
      },
      commands: [
        {
          category: "English Commands",
          subTitle:
            "Here all commands are listed. {} means 'required', [] means 'optional'",
          aliasesDisabled: true,
          list: [
            {
              commandName: "ban",
              commandUsage: "/ban {@user} [reason] [days(1-7)]",
              commandDescription:
                "Ban any user with reason and days above 1-7.",
              commandAlias: "No aliases",
            },
            {
              commandName: "delete",
              commandUsage: "/delete {amount(1-100)} [@user]",
              commandDescription:
                "You can delete above 1-100 messages with any spesific user option.",
              commandAlias: "No aliases",
            },
            {
              commandName: "help",
              commandUsage: "/help",
              commandDescription: "Help menu",
              commandAlias: "No aliases",
            },
            {
              commandName: "safe user",
              commandUsage: "/safe user {@user}",
              commandDescription: "Add users who can safely be admin",
              commandAlias: "No aliases",
            },
            {
              commandName: "safe bot",
              commandUsage: "/safe bot {@bot}",
              commandDescription: "Add bots who can safely be admin",
              commandAlias: "No aliases",
            },
            {
              commandName: "safe role",
              commandUsage: "/safe role {@role}",
              commandDescription: "Add a role to give admin perm safely",
              commandAlias: "No aliases",
            },
            {
              commandName: "safe link",
              commandUsage: "/safe link {link}",
              commandDescription:
                "Add a link for not delete automaticly by Moderator",
              commandAlias: "No aliases",
            },
          ],
        },
        {
          category: "Türkçe Komutlar",
          subTitle:
            "Tüm komutlar burada listelenmiltir. {}: Gerekli, []: İsteğe bağlı",
          aliasesDisabled: true,
          list: [
            {
              commandName: "yasakla",
              commandUsage: "/yasakla {@kullanıcı} [sebep] [günsayısı(1-7)]",
              commandDescription:
                "Herhangi bir kullanıcıyı sebepli/sebepsiz süreli/süresiz yasaklayın.",
              commandAlias: "Herhangi bir alias belirtilmemiş",
            },
            {
              commandName: "sil",
              commandUsage: "/sil {miktar(1-100)} [user]",
              commandDescription:
                "1-100 arası mesajı herhangi bir özel kullanıcı seçeneği ile silebilirsiniz.",
              commandAlias: "Herhangi bir alias belirtilmemiş",
            },
            {
              commandName: "yardım",
              commandUsage: "/yardım",
              commandDescription: "Yardım menüsü",
              commandAlias: "Herhangi bir alias belirtilmemiş",
            },
            {
              commandName: "güvenli kullanıcı",
              commandUsage: "/güvenli kullanıcı {@kullanıcı}",
              commandDescription:
                "Güvenli bir şekilde admin olabilecek kullanıcıları ekleyin",
              commandAlias: "Herhangi bir alias belirtilmemiş",
            },
            {
              commandName: "güvenli bot",
              commandUsage: "/güvenli bot {@bot}",
              commandDescription:
                "Güvenli bir şekilde admin olabilecek botları ekleyin",
              commandAlias: "Herhangi bir alias belirtilmemiş",
            },
            {
              commandName: "güvenli rol",
              commandUsage: "/güvenli rol {@rol}",
              commandDescription:
                "Güvenli bir şekilde sunucuyu yönetebilecek rolleri ekleyin",
              commandAlias: "Herhangi bir alias belirtilmemiş",
            },
            {
              commandName: "güvenli link",
              commandUsage: "/güvenli link {link}",
              commandDescription:
                "Güvenli bir şekilde paylaşılabilecek ve Moderator tarafondan engellenmeyecek linkleri ekleyin",
              commandAlias: "Herhangi bir alias belirtilmemiş",
            },
          ],
        },
      ],
    }),
    settings: [
      {
        categoryId: "setup",
        categoryName: "Set-Up",
        categoryImageURL: 'https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Settings-icon.png',
        categoryDescription: "Default settings is here. You can change it.",
        categoryOptionsList: [
          {
            optionId: "lang",
            optionName: "Language",
            optionDescription: "Change bot language",
            optionType: DBD.formTypes.select({
              English: "en-US",
              Türkçe: "tr",
            }),
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.safe.safeUsr": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "logsyst",
            optionName: "Log System",
            optionDescription: "On/Off log system for all logs.",
            optionType: DBD.formTypes.switch(false),
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.systems.logSys": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "logch",
            optionName: "Log Channel",
            optionDescription:
              "Set your log channel. All logs send 1 channel. So, select it carefully.",
            optionType: DBD.formTypes.channelsSelect(false, ["GUILD_TEXT"]),
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
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "welcmCh",
            optionName: "Welcome Message Channel",
            optionDescription:
              "Set your welcome message channel. This channel must be visible all members.",
            optionType: DBD.formTypes.channelsSelect(false, ["GUILD_TEXT"]),
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let autoRole = guildSchema.needed.roles.autoRole;
              let susRole = guildSchema.needed.roles.susRol;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.text.welcome_channel": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
                if (!autoRole || autoRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your auto role is not setted. Please first set your auto role.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.text.welcome_channel": undefined }}, { new: true});
              if (!susRole || susRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your suspicious role is not setted. Please set your suspicious role.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.text.welcome_channel": undefined }}, { new: true});
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "goodbyeCh",
            optionName: "Goodbye Message Channel",
            optionDescription:
              "Set your goodbye message channel. This channel must be visible all members.",
            optionType: DBD.formTypes.channelsSelect(false, ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.texts.goodbye_channel || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.texts.goodbye_channel": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.texts.goodbye_channel": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "linkKill",
            optionName: "Link Killer System",
            optionDescription:
              "Link Killer System is killing links and senders except for your safe links",
            optionType: DBD.formTypes.switch(true),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.systems.linkKill || false;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.systems.linkKill": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "badWKill",
            optionName: "Bad Word Killer System",
            optionDescription:
              "Bad Word Killer System is killing all badwords and sender.",
            optionType: DBD.formTypes.switch(true),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.systems.badWKill || false;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.systems.badWKill": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "autoRoleSys",
            optionName: "Auto Role System",
            optionDescription:
              "Auto Role System is gives your selected role when a user joined to server.",
            optionType: DBD.formTypes.switch(true),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.systems.autoRoleSys || false;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.systems.autoRoleSys": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let autoRole = guildSchema.needed.roles.autoRole;
              let susRole = guildSchema.needed.roles.susRol;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              if (!autoRole || autoRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your auto role is not setted. Please first set your auto role.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.roles.autoRole": undefined }}, { new: true});
              if (!susRole || susRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your suspicious role is not setted. Please set your suspicious role.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.roles.susRol": undefined }}, { new: true});
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "voiceMuteSys",
            optionName: "Voice Mute System",
            optionDescription:
              "Voice Mute System is allow to suspend a user in voice.",
            optionType: DBD.formTypes.switch(true),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.systems.voiceMuteSys || false;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.systems.voiceMuteSys": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
        ],
      },
      {
        categoryId: "roles",
        categoryName: "Roles",
        categoryImageURL: 'https://cdn-icons-png.flaticon.com/512/7156/7156750.png',
        categoryDescription: "Set up bot roles.",
        categoryOptionsList: [
          {
            optionId: "jailr",
            optionName: "Jail Role",
            optionDescription: "Jail role for punishments",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.roles.jailRol || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.roles.jailRol": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
              if (
                !guildSchema.other.preOne ||
                guildSchema.other.preOne == false
              )
                return {
                  allowed: false,
                  errorMessage:
                    "You don't have premium. Buy on our Discord Server.",
                };
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.roles.jailRol": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "susr",
            optionName: "Suspicious Role",
            optionDescription:
              "Suspicious role for who joined to server and account too young.",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.roles.susRol || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.roles.susRol": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
              if (
                !guildSchema.other.preOne ||
                guildSchema.other.preOne == false
              )
                return {
                  allowed: false,
                  errorMessage:
                    "You don't have premium. Buy on our Discord Server.",
                };
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.roles.susRol": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "adminr",
            optionName: "Admin Role",
            optionDescription: "Admin role to avoid inadvertent punishment.",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.roles.adminRol || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.roles.adminRol": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.roles.adminRol": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "autorl",
            optionName: "Auto Role",
            optionDescription: "Auto role for welcomer system.",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.needed.roles.autoRole || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "needed.roles.autoRole": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.roles.autoRole": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
        ],
      },
      {
        categoryId: "events",
        categoryName: "Events",
        categoryImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Google_Calendar_icon_%282015-2020%29.svg/1200px-Google_Calendar_icon_%282015-2020%29.svg.png',
        categoryDescription:
          "Events catchers of Moderator is here. You can easly manage your events here.",
        categoryOptionsList: [
          {
            optionId: "chCr",
            optionName: "Channel Create",
            optionDescription:
              "If a channel creates, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.chCr.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "chDel",
            optionName: "Channel Delete",
            optionDescription:
              "If a channel deletes, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.chDel.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "chUp",
            optionName: "Channel Update",
            optionDescription:
              "If a channel updates, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.chUp.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "banAdd",
            optionName: "Someone Banned",
            optionDescription:
              "If somebody bans any user, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.banAdd.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "banRem",
            optionName: "Someone Unbanned",
            optionDescription:
              "If somebody unbans someone, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.banRem.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "usrAdd",
            optionName: "Member Join [Welcome Message]",
            optionDescription:
              "If somebody join your server, Moderator will log it to you. You can turn it on/off. Your Welcome Channel must be setted.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let autoRole = guildSchema.needed.roles.autoRole;
              let susRole = guildSchema.needed.roles.susRol;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.usrAdd.activated": undefined }}, { new: true});
              if (guildSchema.needed.texts.welcome_channel == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your welcome channel is not setted. Set your welcome channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.usrAdd.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              if (!autoRole || autoRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your auto role is not setted. Please first set your auto role.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.usrAdd.activated": undefined }}, { new: true});
              if (!susRole || susRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your suspicious role is not setted. Please set your suspicious role.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "usrRem",
            optionName: "Member Leave [Left Message]",
            optionDescription:
              "If somebody leaves your server, Moderator will log it to you. You can turn it on/off.",
            optionType: DBD.formTypes.switch(false),
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.usrRem.activated": undefined }}, { new: true});
              if (guildSchema.needed.texts.goodbye_channel == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your goodbye channel is not setted. Set your goodbye channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.usrRem.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "invCr",
            optionName: "Invite Create",
            optionDescription:
              "If somebody creates invite of your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.invCr.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "invDel",
            optionName: "Invite Delete",
            optionDescription:
              "If somebody deletes invite of your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.invDel.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "msgDel",
            optionName: "Message Delete",
            optionDescription:
              "If somebody deletes message on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.msgDel.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "msgDelBulk",
            optionName: "Message Deleted Bulk",
            optionDescription:
              "If somebody deletes bigger than 2 messages same time, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.msgDelBulk.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "msgUp",
            optionName: "Message Update",
            optionDescription:
              "If somebody updates a message on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.msgUp.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "prsUp",
            optionName: "Presence (Status etc.) Update",
            optionDescription:
              "If somebody updates status on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.prsUp.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "rolCr",
            optionName: "Role Create",
            optionDescription:
              "If somebody creates role on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.rolCr.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "rolDel",
            optionName: "Role Delete",
            optionDescription:
              "If somebody deletes role on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.rolDel.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "rolUp",
            optionName: "Role Update",
            optionDescription:
              "If somebody updates role on your server, Moderator will log it to you. You can turn it on/off.",
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
                { "needed.events.rolUp.activated": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.rolUp.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "usrUpd",
            optionName: "User Update",
            optionDescription:
              "If somebody updates user settings on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.usrUp.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "thrCr",
            optionName: "Thread Create",
            optionDescription:
              "If somebody creates thread on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.thrCr.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "thrDel",
            optionName: "Thread Delete",
            optionDescription:
              "If somebody deletes thread on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.thrDel.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "vcStatUp",
            optionName: "Voice State Update",
            optionDescription:
              "If somebody updates voice states on your server, Moderator will log it to you. You can turn it on/off.",
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
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "needed.events.vcStatUp.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
        ],
      },
      {
        categoryId: "premium",
        categoryName: "Premium",
        categoryImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png',
        categoryDescription:
          "If you have premium, you can use premium features.",
        categoryOptionsList: [
          {
            optionId: "capt_onf",
            optionName: "Captcha",
            optionDescription: "On/Off Captcha",
            optionType: DBD.formTypes.switch(true),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.other.prefeature.preOneFeat.captcha.activated || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "other.prefeature.preOneFeat.captcha.activated": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let capRole = guildSchema.other.prefeature.preOneFeat.captcha.role;
              let ownerGuild = guildSchema.ownerId;
              if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "other.prefeature.preOneFeat.captcha.activated": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
                if (!capRole || capRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your captcha role is not setted. Please first set your auto role.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "other.prefeature.preOneFeat.captcha.activated": undefined }}, { new: true});
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "capt_ch",
            optionName: "Captcha Channel",
            optionDescription: "Captcha log channel",
            optionType: DBD.formTypes.switch(true),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.other.prefeature.preOneFeat.captcha.channel || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "other.prefeature.preOneFeat.captcha.channel": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "other.prefeature.preOneFeat.captcha.channel": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              if (!capRole || capRole == null)
                return {
                  allowed: false,
                  errorMessage:
                    "Your captcha role is not setted. Please first set your auto role.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "other.prefeature.preOneFeat.captcha.activated": undefined }}, { new: true});
              return { allowed: true, errorMessage: null };
            },
          },
          {
            optionId: "capt_rol",
            optionName: "Captcha Role",
            optionDescription: "Set captcha role. If user complete the Captcha, this role will given.",
            optionType: DBD.formTypes.switch(true),
            getActualSet: async ({ guild }) => {
              const serverConf = await GuildModel.findOne({
                discordId: guild.id,
              });
              return serverConf.other.prefeature.preOneFeat.captcha.role || null;
            },
            setNew: async ({ guild, newData }) => {
              await GuildModel.findOneAndUpdate(
                { discordId: guild.id },
                { "other.prefeature.preOneFeat.captcha.role": newData }
              );
            },
            allowedCheck: async ({ guild, user }) => {
              const userSchema = await UserModel.findOne({
                discordId: user.id,
              });
              const guildSchema = await GuildModel.findOne({
                discordId: guild.id,
              });
              let safeUser = guildSchema.needed.safe.safeUsr;
              let ownerGuild = guildSchema.ownerId;
                            if (user.id === ownerGuild && !safeUser.includes(user.id))
                return { allowed: true, errorMessage: null };
              if (guildSchema.needed.texts.modlog == null || undefined)
                return {
                  allowed: false,
                  errorMessage:
                    "Your moderation log channel is not setted. Set your moderation log channel first.",
                }
                await GuildModel.findOneAndUpdate({ discordId: guild.id }, { $set: { "other.prefeature.preOneFeat.captcha.role": undefined }}, { new: true});
              if (userSchema.blacklisted == true)
                return {
                  allowed: false,
                  errorMessage:
                    "You are blacklisted. You cannot use Moderator forever.",
                };
              if (!safeUser.includes(user.id))
                return {
                  allowed: false,
                  errorMessage:
                    "You are not safe user. You cannot use any moderation commands. Please contact with server owner.",
                };
              return { allowed: true, errorMessage: null };
            },
          },
        ],
      },
    ],
  });
  await Dashboard.init();
})();

module.exports = { dashconf };
