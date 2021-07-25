const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const fs  = require('fs');
const bdd = require("./bdd.json");
const memes = require('discord-meme-generator');
const got = require('got');
const randomPuppy = require('random-puppy');
const { prefix } = require("./bdd.json");
const talkedRecently = new Set();
const stockfile = require("./stock.js") 
const communicationfile = require("./communication.js")
const gestionfile = require("./gestion.js")
const funfile = require("./fun.js")
const moneyfile = require("./money.js")
const investfile = require("./invest.js")
const corpfile = require("./entreprises.js")
const workerfile = require("./worker.js")


bot.on("ready", async () => {
    console.log("Le bot s'allume !")
    bot.user.setStatus("online")
    bot.user.setActivity("être l'esclave d'Aiglon")
})

bot.on("ready", () => {
  const channel = bot.channels.cache.get("724223665578967041");
  if (!channel) return console.error("Le salon n'éxiste pas.");
  channel.join().then(connection => {

      console.log("Bot connecté !");
  }).catch(e => {

      console.error(e);
  });
});


  /***********************SAVE BDD ********************************/
  
  
  function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Oups ! Une erreur est survenue !");
    });
}

/******* END ***************/


console.log("Fichier index OP")
bot.login(process.env.TOKEN);
