 const Discord = require('discord.js');
const weather = require('weather-js');
const moment = require("moment");
const config = require('./botconfig.json');
const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', () => {
    var playing = ["http://vavrik.cf", `Vytvořil: Ten Lukáš`, "si v Tramvaji | b!help"]
    var interval = setInterval(function() {
        var game = Math.floor((Math.random() * playing.length) + 0);
        bot.user.setGame(playing[game])
    }, 30 * 1000);
    console.log("Brumík bot je připraven k plnění příkazů!")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "b!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let logo = "https://raw.githubusercontent.com/BrumikBot/brumikbot-js/master/BrumikBotLogo.png"
  let version = '1.9.0'
  let guild = message.guild;
  let args3 = message.content.split(" ");
  a = message.content.split(' ');
  args2 = message.content.slice(a[0].length+1);

  if(cmd === `b!help`){

  var help = new Discord.RichEmbed()
  .setAuthor("Help - Nápověda", "https://raw.githubusercontent.com/BrumikBot/brumikbot-js/master/BrumikBotLogo.png")
  .setDescription(`Můj prefix je nastaven na: \`b!\`\n\n :information_source:| **Informace**\nPříkazy které obsahují informace.\n\n\`b!date\` - Zobrazí informace o dnešku\n\`b!pocasi lokalita\` - Zobrazí aktuální počasí v zadané lokalitě.\n\`b!about\` - Řekne ti něco více o Brumík botovi.\n\`b!stats\` - Zobrazí statistiky Brumík bota.\n\`b!ping\` - Zobrazí aktuální odezvu.\n\`b!userinfo @uživatel\` - Zobrazí informace o uživateli.\n\n🎭 | **Zábava**\nPříkazy které tě pobaví.\n\n\`b!8ball otázka\` - Odpoví ti na všechny tvé otázky.\n\`b!coinflip\` - Hodí mincí a vybere náhodnou věc.\n\n<:FeelsGentleMan:546806709394473010> | **Administrátor**\nPříkazy které může použít pouze administrátor.\n\n\`b!ban @uživatel\` - Zabanuje uživatele.\n\`b!kick @uživatel\` - Vyhodí uživatele ze serveru.\n\`b!purge počet\` - Smaže zadaný počet zpráv.`)
  .setFooter("Brumík bot by Ten Lukáš")
  .setColor("#ffcc00")
  .setTimestamp()
  .setThumbnail(logo)

  var notify = new Discord.RichEmbed()
  .setTitle("")
  .setDescription(`:mailbox_with_mail: | Do soukromé zprávy jsem ti odeslal nápovědu.`)
  .setColor("#ffcc00")

  message.channel.sendEmbed(notify)

  message.author.send(help);
}

  if(cmd === `b!ping`){

   var ping = new Discord.RichEmbed()
  .setTitle("Ping")
  .setDescription(`**Momentálně odpovídám rychlostí**: ${Math.round(bot.ping)}ms`)
  .setFooter("Brumík bot by Ten Lukáš")
  .setColor("#ffcc00")
  .setTimestamp()

  return message.channel.send(ping);
}

if(cmd === "b!ban"){

  if(!message.member.hasPermission("BAN_MEMBERS"))

    return message.channel.send({embed: {
    color: 0x8B0020,
    author: {
      name: "Chyba",
      icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-error-icon.png"
    },
    description: "Příkaz nelze vykonat, nemáte dostatečná oprávnění.",
    timestamp: new Date(),
  }
});

  let member = message.mentions.members.first();
  if(!member)

  return message.channel.send({embed: {
  color: 0x8B0020,
  author: {
    name: "Chyba",
    icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-error-icon.png"
  },
  description: "Musíte označit uživatele, kterého mám zabanaovat.",
  timestamp: new Date(),
}
});
  if(!member.bannable)

  return message.channel.send({embed: {
  color: 0x8B0020,
  author: {
    name: "Chyba",
    icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-error-icon.png"
  },
  description: "Tohoto uživatele nelze zabanovat. Mám dostatečná oprávnění?",
  timestamp: new Date(),
}
});

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "Důvod neuveden";

  await member.ban(reason)

    .catch(error => message.channel.send({embed: {
      color: 0x8B0020,
      author: {
        name: "Chyba",
        icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-error-icon.png"
      },
      description: `Uživatele ${message.author} nelze zabanovat z důvodu: ${error}.`,
      timestamp: new Date(),
    }
  }));

  message.channel.send({embed: {
    color: 0x00AE2F,
    author: {
      name: "Úspěch",
      icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-check-icon.png"
    },
    description: `${member.user.tag} byl zabanován.\n**Zabanoval**: ${message.author.tag} | **Důvod**: ${reason}`,
    timestamp: new Date(),
  }
  });
}

if(cmd === `b!kick`){


  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send({embed: {
    color: 0x8B0020,
    author: {
      name: "Chyba",
      icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-error-icon.png"
    },
    description: `Musíte označit uživatele, kterého mám vyhodit.`,
    timestamp: new Date(),
  }
});
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({embed: {
    color: 0x8B0020,
    author: {
      name: "Chyba",
      icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-error-icon.png"
    },
    description: `Příkaz nelze vykonat, nemáte dostatečná oprávnění.`,
    timestamp: new Date(),
  }
});
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send({embed: {
    color: 0x8B0020,
    author: {
      name: "Chyba",
      icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-error-icon.png"
    },
    description: `Tohoto uživatele nelze vyhodit. Mám dostatečná oprávnění?`,
    timestamp: new Date(),
  }
});

  message.guild.member(kUser).kick(kReason);
  message.channel.send({embed: {
    color: 0x00AE2F,
    author: {
      name: "Úspěch",
      icon_url: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-check-icon.png"
    },
    description: `${kUser} byl vyhozen ze serveru.\n**Vyhodil**: ${message.author.tag} | **Důvod**: ` + kReason,
    timestamp: new Date(),
  }

});;

  return;
}

if(cmd === "b!date"){

var today = new Date()
let Day = today.toString().split(" ")[0].concat("day");
let Month = today.toString().split(" ")[1]
let Year = today.toString().split(" ")[3]
const embed = new Discord.RichEmbed()
      .setAuthor("Co je dnes za den?", "https://cdn.discordapp.com/attachments/407565034705780736/459426419928334337/ikona_dokument.png")
      .setColor(`RANDOM`)
      .setTimestamp()
      .setFooter(`Brumík bot by Ten Lukáš`)
.addField("Dnes je", `\`${Day}\` ,\`${Month}\` ,\`${Year}\`\n\`Čas:\` \`${today.toString().split(" ")[4]}\``)
message.channel.send({ embed })
};

if (cmd === `b!coinflip`) {
        let embed = new Discord.RichEmbed()
        .setTitle("💥 Coinflip")
        .setColor("#ffcc00")
        .setDescription(`Hodil jsi mincí a padl/y: **${Math.floor(Math.random() * 2) == 0 ? "Orel" : "Váhy"}**`)
        message.channel.sendEmbed(embed);
    }

    if (cmd === "b!8ball") {

    if (args.length < 2 ) {
    return message.channel.send("Musíš mi položit otázku.");
    }

    let odpovedi = [
      'Ano',
      'Ne',
      'Možná',
      'Nikdy!',
      'Možná ale nikdo to neví. <:Neveriiiim:546805572922769438>',
      'Někdy ano ale teď rozhodně ne. <:Herold:546805519856304141>',
      'Řekl bych že ano, ale ananas si na pizzu rozhodně nedávej!',
      'To já nevím, ale myslím si, že Mary Jane ti odpoví. <:MaryJane:546805453175128064>',
      'Vážně? <:Really:546805583949332521> Myslím si že ne. '
      ];

      message.channel.send({
        embed: {
              color: 0x00cc7a,
              title: "🎱 Koule která ti odpoví na všechny tvé otázky",
        fields: [{
                name: "Ptáš se:",
                value: args2
              },
              {
                name: "Já odpovídám:",
                value: odpovedi[Math.floor(Math.random() * odpovedi.length)]
              }
           ],
         footer: {
         icon_url: message.author.avatarURL,
         text: "Otázka od " + message.author.tag
    }
        }
      })
    };

    if (cmd === `b!pocasi`) {
            weather.find({search: args2, degreeType: 'C'}, function(err, result) {

              const embedErr = new Discord.RichEmbed()
              .setTitle("")
              .setColor("#cc0000")
              .setDescription("Příkaz nelze vykonat, něco je špatně v API nebo jsi zadal šptnou/neexistující lokaci.")
                if (err) message.channel.sendEmbed(embedErr);

             if (result.length === 0) {
              message.channel.sendEmbed(embedErr)
              return;
             }
             
             if (result === Brno) {
              message.channel.sendEmbed(embedErr)
              return;
             }

          var current = result[0].current
          var location = result[0].location

          const pocasi = new Discord.RichEmbed()
              .setDescription(`**${current.skytext}**`)
              .setTitle(`Počasí pro ${current.observationpoint} <:pocasi:546804840483782658>`)
              .setThumbnail(current.imageUrl)
              .setColor("#00ffff")
              .addField('Teplota',`${current.temperature} °C`, true)
              .addField('Pocitová teplota', `${current.feelslike} °C`, true)
              .addField('Vítr',current.winddisplay, true)
              .addField('Vlhkost', `${current.humidity}%`, true)
              .addField('Časové pásmo', `UTC${location.timezone}`, true)
              message.channel.sendEmbed(pocasi);
      })
    }

    if (cmd === "b!say") {

            a = message.content.split(' ');
            args1 = message.content.slice(a[0].length+1);

            let sayarray = message.content.slice(args1[0].length)
            if(message.author.id != '395261481001811988') {
            message.channel.send(":warning: | Nemáš dostatečná oprávnění.");
                return;
              } else {

            message.delete()
                message.channel.send({
                  embed: {
                    color: 0x00cc7a,
                    description: args1,
                  }
                })

              }
            }

            if (cmd === 'b!userinfo'){
            let user;

                if (message.mentions.users.first()) {
                  user = message.mentions.users.first();
                } else {
                    user = message.author;
                }

                const member = message.guild.member(user);

                const embed = new Discord.RichEmbed()
            		.setColor('RANDOM')
            		.setThumbnail(user.avatarURL)
            		.setTitle(`${user.username}#${user.discriminator}`)
            		.addField("ID:", `${user.id}`, true)
            		.addField("Přezdívka na serveru:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            		.addField("Registrován:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            		.addField("Datum připojení na server:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            		.addField("Bot:", `${user.bot}`, true)
            		.addField("Status:", `${user.presence.status}`, true)
            		.addField("Hraje:", `${user.presence.game ? user.presence.game.name : 'Spíš nehraje'}`, true)
            		.addField("Role:", member.roles.map(roles => `${roles.name}`).join(', '), true)
            		.setFooter(`Požadavek od: ${message.author.username}#${message.author.discriminator}`)
                 message.channel.send({embed});
                }

                if (cmd === "b!purge") {
                if (!message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send(':no_entry: | Potřebuji práva `MANAGE_MESSAGES`.').catch(console.error);
                            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry: | Nemáte práva `MANAGE_MESSAGES` která jsou potřebná pro použití tohoto příkazu.");
                            if (isNaN(args3[1])) return message.channel.send(':warning: | Uveďte prosím počet zpráv pro smazání.');
                            if (args3[1] > 100) return message.channel.send(':warning: | Nelze smazat více jak 100 zpráv.');
                            message.channel.bulkDelete(args3[1]);
                            var cleanEmbed = new Discord.RichEmbed()
                            .setAuthor('Zprávy smazány')
                            .setDescription(`<:Ano:546803801638567956> | Smazáno **${args3[1]}**. zpráv`)
                            .setFooter('Smazáno uživatelem ' + message.author.tag, message.author.avatarURL)
                            .setColor(message.guild.me.displayHexColor);
                            message.channel.send(cleanEmbed);
                }
 
         if (cmd === "b!stats") {
          let totalSeconds = (bot.uptime / 1000);
          let hours = Math.floor(totalSeconds / 3600);
          totalSeconds %= 3600;
          let minutes = Math.floor(totalSeconds / 60);
          let seconds = totalSeconds % 60;
            const game = bot.user.presence.game || {};
            const embed = new Discord.RichEmbed()
                .setTitle('Statistiky Brumík bota')
                .setDescription(`⏱ Uptime: ${hours}h, ${minutes}m`)
                .setColor('4da6ff')
                .addField('<:FeelsArmyMan:546803495529873421> Uživatelé', `${bot.guilds.reduce((mem, g) => mem += g.memberCount, 0)}`, true)
                .addField('🏘 Servery', `${bot.guilds.size.toLocaleString()}`, true)
                .addField('<:ram123:546803337937551360> Využití RAM', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
                .addField('💾 Verze', version, true)
                .addField('🎮 Hra', `${game.name || 'Nic nehraje'} ${game.streaming ? `[(Streaming)](${game.url})` : ''}`, true)
                .addField('🏓 Odezva', `${Math.round(bot.ping)}ms`, true)
                .setThumbnail(bot.user.avatarURL)

            message.channel.sendEmbed(embed)
        }

if(cmd === `b!about`){

var about = new Discord.RichEmbed()
.setAuthor("Kdo nebo co je Brumík bot", "https://raw.githubusercontent.com/BrumikBot/brumikbot-js/master/BrumikBotLogo.png")
.setDescription(`Brumík bot je český bot stavěný pro servery co nepotřebují mnoho funkcí,\ndokáže se postrat o vše co mu řekneš ať už jde o zábavu, informace či administraci.\nBrumík bot toho neumí moc ani málo, stačí si jen vybrat.`)
.setFooter("Brumík bot by Ten Lukáš")
.setColor("#ffcc00")
.setTimestamp()
.setThumbnail("https://raw.githubusercontent.com/BrumikBot/brumikbot-js/master/BrumikBotLogo.png")

            message.channel.sendEmbed(about)
        }

 
});
bot.login(process.env.BOT_TOKEN);
