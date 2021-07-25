const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const fs  = require('fs');
const { kStringMaxLength } = require('buffer');
const moment = require('moment');
const bdd = require("./bdd.json");
const memes = require('discord-meme-generator');
const randomPuppy = require('random-puppy');
const got = require('got');
const queue = new Map();
const ytdl = require("ytdl-core");
const { prefix } = require("./bdd.json");
const { notEqual } = require('assert');
const { PassThrough } = require('stream');
const { send } = require('process');
const talkedRecently = new Set();




/********* DICK SIZE *********/

bot.on('message', message => {
    if (message.content.startsWith("!dick")) {
        const embed = new Discord.MessageEmbed()
              .setTitle("**Tableau des moyennes de taille des pénis dans le monde (en éréction)**")
              .addField("**Mondiale**", "13,12 cm", true)
              .addField("**Europe**", "15,18 cm", true)
              .addField("**Afrique**", "16 cm", true)
              .addField("**Asie**", "10,9 cm", true)
              .addField("**Amérique du Nord**", "12,2 cm", true)
              .addField("**Amérique du Sud**", "14,8 cm", true)
              .addField("**Congo**", "18 cm", true)
              .addField("**France**", "14,5 cm", true)
              .addField("**Chez Aiglon**", "25 cm", true)
              .setColor("RANDOM")
        message.channel.send(embed)

    }
})



/**********RATE ********/

bot.on('message', message => {
    if (message.content.startsWith("!rate")) {
        let args = message.content.split(" ").slice(1);
        let text = args.join(" ")
        const note = Math.floor(Math.random() * 20);
        const embed = new Discord.MessageEmbed()
              .setTitle("**J'attribue la note de " + note + "/20 à " + text + " !**")
              .setColor("RANDOM")
        message.channel.send(embed)


    }
})

/**********BARMAN*********/



bot.on("message", message => {
    if(message.content === "!barman") {
      const embed = new Discord.MessageEmbed()
              .setTitle("__Quelle boisson souhaitez vous ?__")
              .addField("Whisky", ":whisky:", true)
              .addField("Bière ", ":beer:", true)
              .addField("Champagne", ":champagne:", true)
              .addField("Vin", ":wine_glass:", true)
              .addField("Cocktail", ":cocktail:", true)
              .addField("Vodka", ":boom:", true)
              .setColor('#40ff00')
              .setThumbnail("https://th.bing.com/th/id/Rc0806e6ede3c3d51700c8feb50140314?rik=UTbPeuB9vWySbg&pid=ImgRaw")
              message.channel.send(embed)
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
      console.log(collector)
      collector.on('collect', message => {
        if (message.content == "Whisky") {
          message.channel.send("**Voilà pour vous, un whisky bien frais :whisky:**   https://tenor.com/view/drinking-whiskey-pour-alcohol-gif-14134639");
        } else if (message.content == "Bière") {
          message.channel.send("**Une bière pour le monsieur, c'est parti :beer:**      https://tenor.com/view/beer-german-gif-5579802");
        } else if (message.content == "Champagne") {
          message.channel.send("**La plus belle bouteille de la maison, pour vous monsieur :champagne:**    https://tenor.com/view/champagne-splash-pop-champagne-one-hand-surprise-gif-5502137");
        } else if (message.content == "Vin") {
          message.channel.send("**Une bonne bouteille de vin de Bordeaux. A votre service monsieur :wine_glass:**    https://tenor.com/view/wine-red-wine-letsget-drunk-pour-gif-4569965");
        } else if (message.content == "Cocktail") {
          message.channel.send("**Un cocktail maison préparé par moi même, bonne dégustation ! :cocktail:**    https://tenor.com/view/strawberry-cocktail-drinks-strawberry-cocktail-%e3%82%ab%e3%82%af%e3%83%86%e3%83%ab-gif-3316310");
        } else if (message.content == "Vodka") {
          message.channel.send("**Une bouteille de Vodka spéciale de SuperRelax2k ! :boom:**   https://tenor.com/view/smirnoff-gordons-gin-vodka-party-gif-18251769");
        } else {
          return message.channel.send("**Excusez moi, nous ne disposons pas encore de cette boissons ou bien elle a été mal orthographiée.** :grimacing: ")
        }
      }
      )
    }
  })
    
  
  
  
  
  
  
  /********** MEME GENERATOR ************/
  
  
  
  
  bot.on('message', message => {
      if(message.content.startsWith("!meme")) {
  
  const embed = new Discord.MessageEmbed();
      got('https://www.reddit.com/r/memes/random/.json') 
          .then(response => {
              const [list] = JSON.parse(response.body);
              const [post] = list.data.children;
  
              const permalink = post.data.permalink;
              const memeUrl = `https://reddit.com${permalink}`;
              const memeImage = post.data.url;
              const memeTitle = post.data.title;
              const memeUpvotes = post.data.ups;
              const memeNumComments = post.data.num_comments;
  
              embed.setTitle(`${memeTitle}`);
              embed.setURL(`${memeUrl}`);
              embed.setColor('RANDOM');
              embed.setImage(memeImage);
              embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
  
              message.channel.send(embed);
          })
          .catch(console.error);
  }});
  
  
  
  
  
  
  
  
  
  
  
  /*****************GAY CALCULATOR *******************************/
  
  
  
  bot.on('message', message => {
      if(message.content.startsWith("!gaycalc")) {
          
          const arg = message.content.split(" ").slice(1);
          var userl = message.content.split(" ").slice(2);
          var userll = message.mentions.users.first()
      
      
          var ErrorMentionUser = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription('Erreur: Merci de mentionner un utilisateur, ou un bot.')
      
      
          if(!userl) return message.channel.send(ErrorMentionUser)
         
      
          const love = Math.floor(Math.random() * 100);
      
          if (love <= 10 ) {
              var EmbedLoveResult = new Discord.MessageEmbed()
              .setColor("#fd009f")
              .setTitle("▬▬ :rainbow_flag: GayCalc :rainbow_flag: ▬▬")
              .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
              .addField("Résultat :", love + "%")
              .setFooter("Hétéro à fond !")
              message.channel.send(EmbedLoveResult)
          } 
          
          else if ( love > 10 ) {
              var EmbedLoveResult = new Discord.MessageEmbed()
              .setColor("#fd009f")
              .setTitle("▬▬ :rainbow_flag: GayCalc :rainbow_flag: ▬▬")
              .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> "+ " et " + userl + "_")
              .addField("Résultat :", love + "%")
              .setFooter("C'est un peu douteux...")
              message.channel.send(EmbedLoveResult)
          }
      
          else if ( love > 50 ) {
              var EmbedLoveResult = new Discord.MessageEmbed()
              .setColor("#fd009f")
              .setTitle("▬▬ :rainbow_flag: GayCalc :rainbow_flag: ▬▬")
              .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
              .addField("Résultat :", love + "%")
              .setFooter("Il y a de l'homosexualité dans l'air...")
              message.channel.send(EmbedLoveResult)
      
          } 
      
          else if ( love > 75) {
      
              var EmbedLoveResult = new Discord.MessageEmbed()
              .setColor("#fd009f")
              .setTitle("▬▬ :rainbow_flag: GayCalc :rainbow_flag: ▬▬")
              .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
              .addField("Résultat :", love + "%")
              .setFooter("Hmmmm c'est chaud...")
              message.channel.send(EmbedLoveResult)
          } 
      
          else if (love == 100 ) {
      
              var EmbedLoveResult = new Discord.MessageEmbed()
              .setColor("#fd009f")
              .setTitle("▬▬ :rainbow_flag: GayCalc :rainbow_flag: ▬▬")
              .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
              .addField("Résultat :", love + "%")
              .setFooter("Faut l'inviter à l'hôtel mek !!!!")
              message.channel.send(EmbedLoveResult)
          }
      
      }})
  
  
  
  
  
  
  
  
  
  
  
  
  
  /********************* LOVE CALCULATOR ********************/
  
  
  
  
  bot.on('message', message => {
  if(message.content.startsWith("!lovecalc")) {
      
      const arg = message.content.split(" ").slice(1);
      var userl = message.content.split(" ").slice(2);
      var userll = message.mentions.users.first()
  
  
      var ErrorMentionUser = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription('Erreur: Merci de mentionner un utilisateur, ou un bot.')
  
  
      if(!userl) return message.channel.send(ErrorMentionUser)
     
  
      const love = Math.floor(Math.random() * 100);
  
      if (love <= 10 ) {
          var EmbedLoveResult = new Discord.MessageEmbed()
          .setColor("#CC0000")
          .setTitle("▬▬ ❤ Lovecalc ❤ ▬▬")
          .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
          .addField("Résultat :", love + "%")
          .setFooter("L'espoir fait vivre les crétins...")
          message.channel.send(EmbedLoveResult)
      } 
      
      else if (love > 10 ) {
          var EmbedLoveResult = new Discord.MessageEmbed()
          .setColor("#CC0000")
          .setTitle("▬▬ ❤ Lovecalc ❤ ▬▬")
          .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> "+ " et " + userl + "_")
          .addField("Résultat :", love + "%")
          .setFooter("Il y a un petit peu  d'espoir..")
          message.channel.send(EmbedLoveResult)
      }
  
      else if (love > 50 ) {
          var EmbedLoveResult = new Discord.MessageEmbed()
          .setColor("#CC0000")
          .setTitle("▬▬ ❤ Lovecalc ❤ ▬▬")
          .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
          .addField("Résultat :", love + "%")
          .setFooter("Il y a de l'espoir :)")
          message.channel.send(EmbedLoveResult)
  
      } 
  
      else if (love > 75 ) {
  
          var EmbedLoveResult = new Discord.MessageEmbed()
          .setColor("#CC0000")
          .setTitle("▬▬ ❤ Lovecalc ❤ ▬▬")
          .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
          .addField("Résultat :", love + "%")
          .setFooter("Pourquoi ne pas tenter quelque chose???")
          message.channel.send(EmbedLoveResult)
      } 
  
      else if (love == 100 ) {
  
          var EmbedLoveResult = new Discord.MessageEmbed()
          .setColor("#CC0000")
          .setTitle("▬▬ ❤ Lovecalc ❤ ▬▬")
          .setDescription("_Calcul du pourcentage d'amour entre <@!" + userll + "> " + " et " + userl + "_")
          .addField("Résultat :", love + "%")
          .setFooter("Faut l'inviter à l'hôtel mek !!!!")
          message.channel.send(EmbedLoveResult)
      }
  
  }})
  
  
  
  
  bot.on('message',message => {
      if (!message.guild) return;
      let args = message.content.trim().split(/ +/g)
   
      
      if (args[0].toLocaleLowerCase() ===  '!ask'){
          if (!args[0]) return message.channel.send("Veuillez **poser une question** :x:")
          let rep = ["Non :x:", "Oui :white_check_mark:", "Peut être... :thinking:", "Absolument :thumbsup:"];
          let reptaille = Math.floor((Math.random() * rep.length));
          let question = args.slice(1).join(" ");
          message.delete()
          const embed = new Discord.MessageEmbed()
              .setAuthor("Question de " + message.author.tag)
              .setColor("ORANGE")
              .addField("Question:", question)
              .addField("Réponse:", rep[reptaille]);
          message.channel.send(embed)
      }
  })
  
  
  
  
  
  
  
  
  
  /**********BIRTHDAY **************************/
  
  
  
  bot.on('message', message => {
      const arg = message.content.split(" ").slice(1);
      const args = message.content.split(" ").slice(2);
    if (message.content.startsWith("!birthday")) {
      if (!message.member.hasPermission('ADMINISTRATOR')) return;
      let utilisateur = message.mentions.members.first() || message.guild.member(args[0])
      if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
      let nombre = 1
      while (nombre < 500) {
        nombre = nombre + 1
        message.channel.send(":tada: **Joyeux anniversaire **" + "<@" + utilisateur + ">");
      }
  
  }})
  


/***********************SAVE BDD ********************************/


function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Oups ! Une erreur est survenue !");
    });
}




/******* END ***************/


console.log("Fichier fun OP")
bot.login(process.env.TOKEN);