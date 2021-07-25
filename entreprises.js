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
const cowork = new Set();



/************** COWORK ******************/


bot.on("message", message => {
  if (message.content.startsWith("!coWork")) {
      let args = message.content.split(" ").slice(1);
      let Corp = args.join(" ")
      Client = message.author.id
      Compte = parseInt(bdd["money"][Client])
      if (!parseInt(bdd["money"][Client])) {
          message.channel.send("Vous n'avez pas encore de compte bancaire chez Aiglon's Industries. Démarrez en un avec !salaire.")
      } else if(!Corp) {
          message.channel.send("Vous devez indiquer le nom de votre entreprise (!coBuy [Entreprise] ).")
      } else if (!bdd[Corp]) {
          message.channel.send("L'entreprise n'éxiste pas !")
      } else if (!bdd[Corp + "Perms"]["Boss"] === Client ) {
          message.channel.send("Vous n'êtes pas le patron de l'entreprise indiquée.")
      } else if (cowork.has(Client)) {
        message.channel.send("Vous ne pouvez récuperer vos parts seulement toutes les 24h ")
      } else {
        GainTech = 3000*parseInt(bdd[Corp]["Technicien"])
        GainInge = 30000*parseInt(bdd[Corp]["Ingenieur"])
        GainTotale = GainTech + GainInge
        const embed = new Discord.MessageEmbed()
        .setTitle("Production de :coin: journalière")
        .addField("Gain des Techiciens", GainTech + " :coin:")
        .addField("Gain des Ingénieurs", GainInge + " :coin:")
        .addField("**Gain Total**", GainTotale + " :coin:")
        .setColor("#e8f30e")
        message.channel.send(embed)
        bdd["money"][Client] = Compte + GainTotale
        Savebdd()
        cowork.add(Client)
          setTimeout(() => {
            cowork.delete(Client);
          }, 86400000)
      }
  }
})


/***************** COINFO ********************/














/*********************   CREATE  ************************

bot.on("message", message => {
    if (message.content === "!create corp") {
      Client = message.author.id
      Compte = parseInt(bdd["money"][Client])
      if (!parseInt(bdd["money"][Client])) {
        message.channel.send("Vous n'avez pas encore de compte bancaire chez Aiglon's Industries. Démarrez en un avec !salaire.")
      } else if (Compte < 10000) {
        message.channel.send("Vous n'avez pas assez d'argent pour créer une entreprise. Il vous faut 10 000 :coin:")
      } else {
            message.channel.send("Quel nom ?")
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
            console.log(collector)
            collector.on('collect', message => {
                Name = message.content
                message.channel.send("Etes vous sur ?"+ Name)
                const colector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
                console.log(colector)
                colector.on('collect', message => {
                    if(message.content === "CONFIRMER") {
                        bdd[Name]["Patron"] = 1
                        Savebdd()
                    } else {
                        return message.channel.send("Annulation...")
                    }
                })
            })
            
      }

    }
})

*****/


  /***********************SAVE BDD ********************************/
  
  
  function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Oups ! Une erreur est survenue !");
    });
}

/******* END ***************/


console.log("Fichier entreprises OP")
bot.login(process.env.TOKEN);
