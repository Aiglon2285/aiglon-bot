const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const fs  = require('fs');
const bdd = require("./bdd.json");
const talkedRecently = new Set();



/******************* COMPTE BANCAIRE *****************/

bot.on("message", message => {
  if (message.content.startsWith("!cb")) {
    Client = message.author.id
    Compte = parseInt(bdd["money"][Client])
    if (!parseInt(bdd["money"][Client])) {
      message.channel.send("Vous n'avez pas encore de compte bancaire chez Aiglon's Industries. Démarrez en un avec !salaire.")
    } else {
    const embed = new Discord.MessageEmbed()
      .setTitle("Votre Compte Bancaire possède " + Compte + " :coin: .")
      .setColor("#e8f30e")
    message.channel.send(embed)
  }
  }
})




/************ DOUBLE OR QUITS **************/


bot.on("message", message => {
    if (message.content.startsWith("!DoQ")) {
          let args = message.content.split(" ").slice(1);
                let text = args.join(" ")
                mise = parseInt(text)
                if (!text) {
                  return message.channel.send("**Vous de devez rajouter une mise !** (`!DoQ {mise}`)")
                }
                Participant = message.author.id
                CompteBancaire = parseInt(bdd["money"][Participant])
                if (CompteBancaire < mise) {
                  return message.channel.send("**Vous ne pouvez pas participer, vous êtes trop pauvre !**")
                }
                bdd["money"][Participant] = CompteBancaire - mise
                Savebdd()
                message.channel.send("**Vous mettez en jeu " + mise + " :coin: !**")
                const embed = new Discord.MessageEmbed()
                        .setTitle("**Soit vous continuez pour doubler avec `double` mais risquez de tout perdre, soit vous décidez de quitter avec `quit`.**")
                        .setColor("#ff00f2")
                message.channel.send(embed)
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max : 1, time: 300000 } );
                console.log(collector)
                collector.on('collect', message => {
                  if (message.content === "double") {
                    const tirage = Math.floor(Math.random() * 100);
                    if (tirage < 50 ) {
                      return message.channel.send("**Perdu !**");
                    } else if (tirage > 50 ) {
                      miseM = mise*2
                      message.channel.send("**Vous mettez en jeu " + miseM + " :coin: !**")
                      const embed = new Discord.MessageEmbed()
                      .setTitle("**Soit vous continuez pour doubler avec `double` mais risquez de tout perdre, soit vous décidez de quitter avec `quit`.**")
                      .setColor("#ff00f2")
                  message.channel.send(embed)
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max : 1, time: 300000 } );
                console.log(collector)
                collector.on('collect', message => {
                  if (message.content === "double") {
                    const tirage = Math.floor(Math.random() * 100);
                    if (tirage < 50 ) {
                      return message.channel.send("**Perdu !**");
                    } else if (tirage > 50 ) {
                      miseM = miseM*2
                      message.channel.send("**Vous mettez en jeu " + miseM + " :coin: !**")
                      const embed = new Discord.MessageEmbed()
                      .setTitle("**Soit vous continuez pour doubler avec `double` mais risquez de tout perdre, soit vous décidez de quitter avec `quit`.**")
                      .setColor("#ff00f2")
                message.channel.send(embed)
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max : 1, time: 300000 } );
                console.log(collector)
                collector.on('collect', message => {
                  if (message.content === "double") {
                    const tirage = Math.floor(Math.random() * 100);
                    if (tirage < 50 ) {
                      return message.channel.send("**Perdu !**");
                    } else if (tirage > 50 ) {
                      miseM = miseM*2
                      message.channel.send("**Vous mettez en jeu " + miseM + " :coin: !**")
                      const embed = new Discord.MessageEmbed()
                      .setTitle("**Soit vous continuez pour doubler avec `double` mais risquez de tout perdre, soit vous décidez de quitter avec `quit`.**")
                      .setColor("#ff00f2")
                message.channel.send(embed)
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max : 1, time: 300000 } );
                console.log(collector)
                collector.on('collect', message => {
                  if (message.content === "double") {
                    const tirage = Math.floor(Math.random() * 100);
                    if (tirage < 50 ) {
                      return message.channel.send("**Perdu !**");
                    } else if (tirage > 50 ) {
                      miseM = miseM*2
                      message.channel.send("**Vous mettez en jeu " + miseM + " :coin: !**")
                      const embed = new Discord.MessageEmbed()
                      .setTitle("**Soit vous continuez pour doubler avec `double` mais risquez de tout perdre, soit vous décidez de quitter avec `quit`.**")
                      .setColor("#ff00f2")
                message.channel.send(embed)
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max : 1, time: 300000 } );
                console.log(collector)
                collector.on('collect', message => {
                  if (message.content === "double") {
                    const tirage = Math.floor(Math.random() * 100);
                    if (tirage < 50 ) {
                      return message.channel.send("**Perdu !**");
                    } else if (tirage > 50 ) {
                      miseM = miseM*2
                      message.channel.send("**Vous mettez en jeu " + miseM + " :coin: !**")
                      const embed = new Discord.MessageEmbed()
                      .setTitle("**Soit vous continuez pour doubler avec `double` mais risquez de tout perdre, soit vous décidez de quitter avec `quit`.**")
                      .setColor("#ff00f2")
                message.channel.send(embed)
                const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max : 1, time: 300000 } );
                console.log(collector)
                collector.on('collect', message => {
                  if (message.content === "double") {
                    const tirage = Math.floor(Math.random() * 100);
                    if (tirage < 50 ) {
                      return message.channel.send("**Perdu !**");
                    } else if (tirage > 50 ) {
                      miseM = miseM*2
                      return message.channel.send("**Vous avez fini le jeu et vous remportez " + miseM + " :coin: !**")
                    } 
                } else if (message.content === "quit") {
              bdd["money"][Participant] = CompteBancaire + miseM - mise
              Savebdd()
              return message.channel.send("**Vous repartez avec " + miseM + " :coin: !**")
            }
            })
                    } 
                } else if (message.content === "quit") {
              bdd["money"][Participant] = CompteBancaire + miseM - mise
              Savebdd()
              return message.channel.send("**Vous repartez avec " + miseM + " :coin: !**")
            }
            })
                    } 
                } else if (message.content === "quit") {
              bdd["money"][Participant] = CompteBancaire + miseM - mise
              Savebdd()
              return message.channel.send("**Vous repartez avec " + miseM + " :coin: !**")
            }
            })
                    } 
                } else if (message.content === "quit") {
              bdd["money"][Participant] = CompteBancaire + miseM - mise
              Savebdd()
              return message.channel.send("**Vous repartez avec " + miseM + " :coin: !**")
            }
            })
                    } 
                } else if (message.content === "quit") {
              bdd["money"][Participant] = CompteBancaire + miseM - mise
              Savebdd()
              return message.channel.send("**Vous repartez avec " + miseM + " :coin: !**")
            }
            })
                    } 
                } else if (message.content === "quit") {
              bdd["money"][Participant] = CompteBancaire + mise 
              Savebdd()
              return message.channel.send("**Vous repartez avec " + mise + " :coin: !**")
            }
            })
            
            }
          }
        )
      
    
    
    
  
  
  /****************** SALAIRE ***************/
  
  bot.on("message", message => {
    if(message.content === "!salaire") {
      let user = message.author.id 
      if(talkedRecently.has(user)) {
        return message.channel.send("Vous ne pouvez obtenir un nouveau salaire seulement 2h après le dernier.");
      } else {
        if(!bdd["money"][user]) {
          bdd["money"][user] = 100
          Savebdd()
          talkedRecently.add(user)
          setTimeout(() => {
            talkedRecently.delete(user);
          }, 7200000)
          return message.channel.send("**Vous démarrez un compte en banque, et gagnez 100 :coin: !**")
        } else if (bdd["money"][user]) {
          CompteBancaire = parseInt(bdd["money"][user])
          Salaire = Math.floor(Math.random() * 1000)
          bdd["money"][user] = CompteBancaire + Salaire
          Savebdd() 
          talkedRecently.add(user)
          setTimeout(() => {
            talkedRecently.delete(user);
          }, 7200000)
          return message.channel.send("**Vous avez gagné un salaire de " + Salaire + " :coin: !**")
        }
      }
    }
  
  })
  
  /***************** DUEL *******************/
  
  bot.on("message", message => {
    if(message.content.startsWith("!duel")) {
      let args = message.content.split(" ").slice(1);
      let text = args.join(" ")
      mise = parseInt(text)
      if (!text) {
        return message.channel.send("**Vous de devez rajouter une mise !** (`!duel {mise}`)")
      }
      Participant1 = message.author.id
      CompteBancaire1 = parseInt(bdd["money"][Participant1])
      if (CompteBancaire1 < mise) {
        return message.channel.send("**Vous ne pouvez pas participer, vous êtes trop pauvre !**")
      }
      message.channel.send("**Vous mettez en jeu " + mise + " :coin:.**")
      message.channel.send("<@" + Participant1 + ">" + " **a lancé une recherche de duel ! :mag: Vous avez 30 secondes pour effectuer `!accepte` pour accepter le combat.** *(A noter que si plus de deux message sont envoyés après celui si, la demande s'annule)* ");
      const collector = new Discord.MessageCollector(message.channel, m => m.content, { max : 3, time: 30000 } );
      console.log(collector)
      collector.on('collect', message => {
        if (message.content == "!accepte") {
          Participant2 = message.author.id
          CompteBancaire2 = parseInt(bdd["money"][Participant2])
          if (CompteBancaire2 < mise) {
            return message.channel.send("**Vous ne pouvez pas participer, vous êtes trop pauvre !**")
          }
          message.channel.send("**Vous mettez en jeu " + mise + " :coin:.**")
          CompteBancaire2 = parseInt(bdd["money"][Participant2])  
          CompteBancaire1 = parseInt(bdd["money"][Participant1])
          const fight = Math.floor(Math.random() * 100);
            if (fight < 50 ) {
            bdd["money"][Participant1] = CompteBancaire1 + mise
            Savebdd()
            bdd["money"][Participant2] = CompteBancaire2 - mise 
            Savebdd()
            return message.channel.send("<@" + Participant1 + ">" + " **a gagné le combat et remporte " + mise + " :coin: !** :muscle:");
            } else if (fight > 50 ) {
              bdd["money"][Participant1] = CompteBancaire1 + mise
              Savebdd()
              bdd["money"][Participant2] = CompteBancaire2 - mise
              Savebdd()
              return message.channel.send("<@" + Participant2 + ">" + " **a gagné le combat et remporte " + mise + " :coin: !** :muscle:");
  
            }
          } 
            
          
        
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
  
  
  console.log("Fichier money OP")
  bot.login(process.env.TOKEN);
  
