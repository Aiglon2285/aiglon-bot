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




/**************** SUPPRIMER ITEM ****************/

bot.on("message", message => {
    if(message.content.startsWith("!deleteItem")) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
      let args = message.content.split(" ").slice(1);
      let text = args.join(" ")
      if(!bdd["item"][text]) {
        return message.channel.send("**Cet item n'existe pas !**");
      }
      delete bdd["item"][text]
      Savebdd()
      message.channel.send("**Item `" + text + "` supprimé avec succès !**")
    }
  })
  
  /*****************CREER ITEM *****************/
  
  bot.on("message", message => {
    if(message.content.startsWith("!createItem")) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
      let args = message.content.split(" ").slice(1);
      let text = args.join(" ")
      if(bdd["item"][text]){
        return message.channel.send("**L'item existe déjà !**")
      }
      bdd["item"][text] = 1
      Savebdd()
      message.channel.send("**Item `" + text + "` créé avec succès !**")
    }
  })
  
  /****************** SUPPRESSION DE RESSOURCES **********************/
  
  bot.on("message", message => {
    if(message.content.startsWith("!removeItem")) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
      message.channel.send("**Quelle ressource voulez vous retirer** ?")
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 100000 } );
      console.log(collector)
      collector.on('collect', message => {
        let Objet = message.content;
        if (!bdd["item"][Objet]) {
          return message.channel.send("La ressource voulue n'éxiste pas ou est mal orthographiée");
        }; 
          message.channel.send("**Combien de** `" + Objet + "` **voulez vous retirer** ?")
          const collectorr = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 100000 } );
          console.log(collectorr)
          collectorr.on('collect', messsage => {
            let Ajout = parseInt(messsage.content)
            let Stock = parseInt(bdd["item"][Objet])
            bdd[Objet] = Stock - Ajout;
            Savebdd();
            message.channel.send("**Suppression de " + Ajout + " " + Objet + " effectué**")
          })
        })
    }
  })
  
  
  /****************** STOCK TOTAL ******************/
  
  bot.on("message", message => {
    if(message.content === "!totalstockItem") {
      const embed = new Discord.MessageEmbed()
              .setTitle("__Stock de ressource__")
              .addField("obsidian", bdd["item"]["obsidian"], true)
              .addField("anvil", bdd["item"]["anvil"], true)
              .addField("paladium_spike", bdd["item"]["paladiumspike"], true)
              .addField("fake_water", bdd["item"]["fakewater"],true)
              .addField("slime_pad", bdd["item"]["slimepad"],true)
              .setColor('#ff0f00')
              message.channel.send(embed)
  
    }
  })
  
  /****************** STOCK *******************/
  
  bot.on("message", message => {
    if(message.content.startsWith("!stockItem")) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
      let args = message.content.split(" ").slice(1);
      let text = args.join(" ")
      let ressource = bdd["item"][text];
      if(!ressource){
        return message.channel.send("Cette ressource n'éxiste pas ou a un stock de 0");
      }
      const embed = new Discord.MessageEmbed()
              .setTitle("**Il y a très précisement __" + ressource + " " + text + "__ dans le stock.**")
      message.channel.send(embed)
    }
  })
  
  
  /******************  AJOUT DE RESSOURCES  *****************/
  
  bot.on("message", message => {
    if(message.content.startsWith("!addItem")) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
      message.channel.send("**Quelle ressource voulez vous ajouter** ?")
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 100000 } );
      console.log(collector)
      collector.on('collect', message => {
        let Objet = message.content;
        if (!bdd["item"][Objet]) {
          return message.channel.send("**La ressource voulue n'éxiste pas ou est mal orthographiée** :x:");
        }; 
          message.channel.send("**Combien de** `" + Objet + "` **voulez vous ajouter** ?")
          const collectorr = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 100000 } );
          console.log(collectorr)
          collectorr.on('collect', messsage => {
            let Ajout = parseInt(messsage.content)
            let Stock = parseInt(bdd["item"][Objet])
            bdd["item"][Objet] = Stock + Ajout;
            Savebdd();
            message.channel.send("**Ajout de " + Ajout + " " + Objet + " effectué**")
          })
        })
    }
  })
  
  
 





/***********************SAVE BDD ********************************/


function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Oups ! Une erreur est survenue !");
    });
}




/******* END ***************/


console.log("Fichier stock OP")
bot.login(process.env.TOKEN);