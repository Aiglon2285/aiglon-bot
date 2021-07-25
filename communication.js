const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const fs  = require('fs');
const bdd = require("./bdd.json");
const { prefix } = require("./bdd.json");
const talkedRecently = new Set();




/*************** MP UTILISATEUR ********************/

bot.on("message", message => {
    if(message.content.startsWith("!mp")) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
          message.delete();
      let args = message.content.split(" ").slice(1);
      let destinataire = message.guild.member(message.mentions.users.first());
      let text = args.join(" ")
      if(!destinataire){
        return message.channel.send("Cet utilisateur n'éxiste pas");
      }
      destinataire.send(text);
    }
  })

/**********************CLEAR 5;10;20;30;50;100 ***********************/

    
bot.on("message", message => {
    if(message.content.startsWith("!clear")) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
          message.delete();
      let args = message.content.split(" ").slice(1);
      let text = args.join(" ")
      let MessageDelete = parseInt(text)
      message.channel.bulkDelete(MessageDelete)
      message.channel.send("Messages supprimés :white_check_mark: !");
  }})
  
  
    /*********************** SAY  *******************/



bot.on('message', message => {
   
   
    const args = message.content.split(" ").slice(1);
        if(message.content.startsWith('!say')) {
    if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("Tu n'es pas autorisé à exectuter la commande, si tu recommences, tu seras sanctionné");
         message.delete();
         
         var saytext = args.join(" ");
         const embed = new Discord.MessageEmbed()
         .setTitle(saytext)
         .setColor('RANDOM')
         
         message.channel.send(embed);
     };
   } )

/***********************SAVE BDD ********************************/


function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Oups ! Une erreur est survenue !");
    });
}




/******* END ***************/


console.log("Fichier communication OP")
bot.login(process.env.TOKEN);
