const { ActivityType, EmbedBuilder } = require("discord.js");

const constantFile = require("../../Storage/constants.js");

const mongoose = require("mongoose");

const TwitchAPI = require("node-twitch").default;

const twitchModel = require("../../Models/Twitch/twitch.js");

const config = require("../../Storage/config.json");

module.exports = {
  name: "ready",

  once: true,

  async execute(client) {
    // Log to terminal that bot has logged in

    console.log(`Logged in as ${client.user.tag}!`);

    // Set the bot's status

    client.user.setPresence({
      activities: [{ name: `Discord Users 👀!`, type: ActivityType.Watching }],

      status: "online",
    });

    // If the field doesn't exist it won't be added to the schema (I think)

    // It was true by default but won't be in the next update (as of Dec 7th, 2022).

    mongoose.set("strictQuery", true);

    // Connect to mongoose

    await mongoose.connect(config.mongoosePath, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });

    // Twitch Shit

    const twitch = new TwitchAPI({
      client_id: "ij34dh76wb31njq1x9i64eyzq6x5yt",
      client_secret: "nb2azbn9cp9wougyff8avif70ab5jt",
    });

    const run = async function Run() {
      const twitchData = twitchModel.find({});

      (await twitchData).forEach(async (user) => {
        let IsLiveMemory = user.live;

        await twitch.getStreams({ channel: user.username }).then(async (data) => {
          const r = data.data[0];
          let testingServer = client.guilds.cache.get(user.guildID);
          const ChannelAnnounceLive = await testingServer.channels.fetch(user.channelID);

          if (r !== undefined) {
            if (r.type === "live") {
              if (IsLiveMemory === false || IsLiveMemory === undefined) {
                const users = await twitch.getUsers(r.user_login);
                const title = r.title ? r.title.toString() : "No Title Set";
                const gameName = r.game_name ? r.game_name : "No Game Set";

                user.live = true;
                user.save();

                const embed = new EmbedBuilder()
                  .setTitle(title)
                  .setURL(`https://twitch.tv/${r.user_name}`)
                  .setAuthor({ name: `${r.user_name}`, iconURL: users.data[0].profile_image_url })
                  .addFields({ name: "Game: ", value: gameName })
                  .setImage(r.getThumbnailUrl());
                ChannelAnnounceLive.send({ content: `<@&988875575638777919>`, embeds: [embed] });
              }
            } else {
              if (IsLiveMemory === true) {
                user.live = false;
                user.save();
              }
            }
          } else {
            if (IsLiveMemory === true) {
              user.live = false;
              user.save();
            } else {
            }
          }
        });
      });
    };

    setInterval(run, 5000);
  },
};
