const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const fs  = require('fs');
const bdd = require("./bdd.json");
const talkedRecently = new Set();
const investclaim = new Set();



/*********************** CLAIM INVEST **********************/


bot.on("message", message => {
  if (message.content.startsWith("!investClaim")) {
      let args = message.content.split(" ").slice(1);
      let Corp = args.join(" ")
      Client = message.author.id
      Compte = parseInt(bdd["money"][Client])
      if (!parseInt(bdd["money"][Client])) {
          message.channel.send("Vous n'avez pas encore de compte bancaire chez Aiglon's Industries. Démarrez en un avec !salaire.")
      } else if(!Corp) {
          message.channel.send("Vous devez indiquer le nom de votre entreprise (!investClaim [Entreprise] ).")
      } else if (!bdd[Corp]) {
          message.channel.send("L'entreprise n'éxiste pas !")
      } else if (!bdd[Corp][Client]) {
          message.channel.send("Vous n'avez pas investi dans cette entreprise.")
      } else if (investclaim.has(Client)) {
          message.channel.send("Vous ne pouvez récuperer vos parts seulement toutes les 2h ")
      } else {
          gain = parseInt(bdd[Corp][Client])*((1 + (parseInt(bdd[Corp]["NbrWorker"])) / 4) / 100)
          bdd["money"][Client] = Compte + gain
          Savebdd()
          const embed = new Discord.MessageEmbed()
          .setTitle("Vous avez gagné " + gain + " :coin: pour votre investissement chez " + Corp )
          .setColor("#e8f30e")
          message.channel.send(embed)
          investclaim.add(Client)
          setTimeout(() => {
            investclaim.delete(Client);
          }, 7200000)

      }

    }
})








/************** INVEST ***************/

bot.on("message", message => {
    if (message.content === "!invest") {
      Client = message.author.id
      Compte = parseInt(bdd["money"][Client])
      if (!parseInt(bdd["money"][Client])) {
        message.channel.send("Vous n'avez pas encore de compte bancaire chez Aiglon's Industries. Démarrez en un avec !salaire.")
      } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("Dans quelle entreprise voulez vous investir ?")
        .addField("Taxe : 10 %", true)
        .setColor("#e8f30e")
      message.channel.send(embed)
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
      console.log(collector)
      collector.on('collect', message => {
            Corp = message.content
            if(!bdd[Corp]) {
                return message.channel.send("**L'entreprise n'éxiste pas.**")
            }
            message.channel.send("**Combien voulez vous investir ?**")
            const colector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
            console.log(colector)
            colector.on('collect', message => {
                investissement = parseInt(message.content)
                if(investissement > Compte) {
                    return message.channel.send("Vous n'avez pas assez d'argent")
                } else {
                    invest = investissement*0.9
                    bdd[Corp][Client] = parseInt(bdd[Corp][Client]) + parseInt(invest)
                    bdd["money"][bdd[Corp + "Perms"]["Boss"]] = parseInt(bdd["money"][bdd[Corp + "Perms"]["Boss"]]) + investissement*0.1
                    bdd["money"][Client] = Compte - investissement
                    Savebdd()
                    message.channel.send("Vous avez investi " + invest )
                        }
                    })
                
    })
        
    }
    }
  })


/***********************SAVE BDD ********************************/
  
  
function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Oups ! Une erreur est survenue !");
    });
}

/******* END ***************/


console.log("Fichier invest OP")
bot.login(process.env.TOKEN);
