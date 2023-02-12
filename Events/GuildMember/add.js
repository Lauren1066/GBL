const { AttachmentBuilder } = require("discord.js");
const Canvas = require("canvas");
const { registerFont } = require("canvas");
module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    const path = require("path");
    if (member.guild.id == "988867117195599902") {
      const channel = await member.guild.channels.fetch("988882440443555850");

      registerFont(require("@canvas-fonts/arial-bold"), { family: "Arial Bold" });
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#3a31a3";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width - 20;
      const height = canvas.height - 20;

      const filePath = path.join(__dirname, "./WelcomeCard/wallpaper.jpeg");
      const background = await Canvas.loadImage(filePath);
      ctx.drawImage(background, 10, 10, width, height);

      const middleWdith = (width - 225) / 2;

      const newHeight = (1 / 3) * (height - 70);
      const twoThirdsHeight = (2 / 3) * (height - 70);
      const wholeHeight = height - 70;

      ctx.textAlign = "center";

      ctx.font = '28px "Arial Bold"';
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`${member.user.tag}`, middleWdith + 225, newHeight + 65);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(`You are Member #${member.guild.memberCount}`, middleWdith + 225, twoThirdsHeight + 65);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(`Enjoy your stay!`, middleWdith + 225, wholeHeight + 65);

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "jpg" }));
      ctx.drawImage(avatar, 25, 25, 200, 200);

      const attachment = new AttachmentBuilder(canvas.toBuffer(), "welcome-image.png");
      channel.send({
        content: `Hey <@${member.user.id}>, welcome to **Great British Life**! Go to <#1061046785893744721> and verify!`,
        files: [attachment],
      });
    } else if (member.guild.id == "1054141143161507901") {
      try {
        await member.roles.add("1054141143492857938");
        await member.roles.add("1054141143492857939");
        await member.roles.add("1054141143161507909");
      } catch {
        console.log("Couldn't add roles in LFB");
      }
    }
  },
};
