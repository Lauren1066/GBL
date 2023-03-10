const canvacord = require("canvacord");
const rn = require("random-number");
const expModel = require("../Models/Levels/xp.js");
const { AttachmentBuilder } = require("discord.js");
const constantsfile = require("../Storage/constants.js");
const backgroundModel = require("../Models/Levels/backgrounds.js");

async function xp(message) {
  let data = await expModel.findOne({
    guildID: constantsfile.mainServerID,
    memberID: message.author.id,
  });

  let backgroundData = await backgroundModel.findOne({
    memberID: message.author.id,
  });

  var options = {
    min: constantsfile.minXp,
    max: constantsfile.maxXp,
    integer: true,
  };

  rn(options);
  const randomNumber = await rn(options);

  const lastXPTime = data ? data.lastXP : new Date();
  const timeSinceLastXp = Math.floor((new Date() - lastXPTime) / 1000);

  console.log(`${timeSinceLastXp} seconds since last xp`);

  if (data && backgroundData && timeSinceLastXp >= 10) {
    x = data.xp + randomNumber;
    data.xp = x;
    data.lastXP = new Date();
    console.log(`${message.author.username} recieved ${randomNumber} xp and now has a total of ${x}`);

    var level = data.level;
    var xp = data.xp;
    var xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;

    if (xpNeeded < xp) {
      z = level + 1;
      data.level = z;
      y = data.xp - xpNeeded;
      data.xp = y;
      const user = message.author;

      try {
        expModel
          .find({
            guildID: constantsfile.mainServerID,
          })
          .sort({ level: -1, xp: -1 })
          .exec((err, res) => {
            i = 1;
            res.forEach((member) => {
              if (member.memberID == data.memberID) {
                const xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;

                const rank = new canvacord.Rank()
                  .setAvatar(user.displayAvatarURL({ extension: "png" }))
                  .setCurrentXP(data.xp, backgroundData.color)
                  .setRequiredXP(xpNeeded, backgroundData.color)
                  .setCustomStatusColor(backgroundData.color)
                  .setProgressBar(backgroundData.color, "COLOR")
                  .setUsername(user.username, backgroundData.color)
                  .setLevel(data.level)
                  .setLevelColor(backgroundData.color, backgroundData.color)
                  .setRank(i)
                  .setRankColor(backgroundData.color, backgroundData.color)
                  .setOverlay(backgroundData.color, 0, false)
                  .setBackground("IMAGE", backgroundData.background)
                  .setDiscriminator(user.discriminator, backgroundData.color);

                rank.build().then((data) => {
                  const attachment = new AttachmentBuilder(data, "RankCard.png");
                  message.channel.send({
                    content: `<@${user.id}> has leveled up`,
                    files: [attachment],
                  });
                });
              } else {
                i++;
              }
            });
          });
      } catch {
        expModel
          .find({
            guildID: constantsfile.mainServerID,
          })
          .sort({ level: -1, xp: -1 })
          .exec((err, res) => {
            i = 1;
            res.forEach((member) => {
              if (member.memberID == data.memberID) {
                const xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;

                const rank = new canvacord.Rank()
                  .setAvatar(user.displayAvatarURL({ extension: "png" }))
                  .setCurrentXP(data.xp, "#ffffff")
                  .setRequiredXP(xpNeeded, "#ffffff")
                  .setCustomStatusColor("#ffffff")
                  .setProgressBar("#ffffff", "COLOR")
                  .setUsername(user.username, "#ffffff")
                  .setLevel(data.level)
                  .setLevelColor("#ffffff", "#ffffff")
                  .setRank(i)
                  .setRankColor("#ffffff", "#ffffff")
                  .setOverlay("#ffffff", 0, false)
                  .setBackground("COLOR", "#000001")
                  .setDiscriminator(user.discriminator, "#ffffff");

                rank.build().then((data) => {
                  const attachment = new AttachmentBuilder(data, "RankCard.png");

                  message.channel.send({
                    content: "I was unable to use your custom background! Please double check the link",
                    files: [attachment],
                  });
                });
              } else {
                i++;
              }
            });
          });
      }
    }
    data.save();
  } else if (!backgroundData && data && timeSinceLastXp >= 10) {
    x = data.xp + randomNumber;
    data.xp = x;
    data.lastXP = new Date();

    var level = data.level;
    var xp = data.xp;
    var xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;

    if (xpNeeded < xp) {
      z = level + 1;
      data.level = z;
      y = data.xp - xpNeeded;
      data.xp = y;
      const user = message.author;
      expModel
        .find({
          guildID: constantsfile.mainServerID,
        })
        .sort({ level: -1, xp: -1 })
        .exec((err, res) => {
          i = 1;
          res.forEach((member) => {
            if (member.memberID == data.memberID) {
              const xpNeeded = 5 * Math.pow(data.level, 2) + 60 * data.level + 100;
              const rank = new canvacord.Rank()
                .setAvatar(user.displayAvatarURL({ extension: "png" }))
                .setCurrentXP(data.xp, "#ffffff")
                .setRequiredXP(xpNeeded, "#ffffff")
                .setCustomStatusColor("#ffffff")
                .setProgressBar("#ffffff", "COLOR")
                .setUsername(user.username, "#ffffff")
                .setLevel(data.level)
                .setLevelColor("#ffffff", "#ffffff")
                .setRank(i)
                .setRankColor("#ffffff", "#ffffff")
                .setOverlay("#ffffff", 0, false)
                .setBackground("COLOR", "#000001")
                .setDiscriminator(user.discriminator, "#ffffff");
              rank.build().then((data) => {
                const attachment = new AttachmentBuilder(data, "RankCard.png");
                message.channel.send({
                  content: `<@${user.id}> has leveled up`,
                  files: [attachment],
                });
              });
            } else {
              i++;
            }
          });
        });
    }
    data.save();
  } else if (lastXPTime >= 10 && !data) {
    const timeNow = new Date();

    let newExp = new expModel({
      guildID: constantsfile.mainServerID,
      xp: randomNumber,
      memberID: message.author.id,
      level: 0,
      lastXP: timeNow,
    });
    newExp.save();
  }
}

module.exports = { xp };
