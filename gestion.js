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


/***********************RANKUP *****************************/


bot.on('message', message => {
    var args = message.content.split(" ").slice(2);
  if (message.content.startsWith("!rankup")) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    let utilisateur = message.mentions.members.first() || message.guild.member(args[0])
    if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
    let addrole = message.mentions.roles.first()
    if (!addrole) return message.channel.send('Vous devez mentionner un role !');
    utilisateur.roles.add(addrole)
    const embed = new Discord.MessageEmbed()
            .setTitle("Félicitation !!! Tu viens de rankup ! ")
            .setColor('RANDOM')
            message.channel.send(embed);


  }})






/*************************GOULAG *****************************/



bot.on('message', message => {
    const arg = message.content.split(" ").slice(1);
    const args = message.content.split(" ").slice(2);
  if (message.content.startsWith("!goulag")) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    let utilisateur = message.mentions.members.first() || message.guild.member(args[0])
    if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
    let goulag = message.guild.roles.cache.get("774745116959047690");
    utilisateur.roles.add(goulag)
    const embed = new Discord.MessageEmbed()
    .setTitle("Un utilisateur a été envoyé au Goulag... une minute de silence pour lui.")
    .setColor('#000000')
    
    message.channel.send(embed);
   
  }});
    
bot.on('message', message => {
    const arg = message.content.split(" ").slice(1);
    const args = message.content.split(" ").slice(2);
  if (message.content.startsWith("!ungoulag")) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    let utilisateur = message.mentions.members.first() || message.guild.member(args[0])
    if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
        let goulag = message.guild.roles.cache.get("774745116959047690");
        utilisateur.roles.remove(goulag)
        const embed = new Discord.MessageEmbed()
        .setTitle("Cet utilisateur a gagné son droit de sortie du Goulag")
        .setColor('#000000')
        
        message.channel.send(embed);
       
  }})






/**************************** BAN KICK *************************/


  bot.on('message', message => {
    const arg = message.content.split(" ").slice(1);
    const args = message.content.split(" ").slice(2);
  if (message.content.startsWith("!ban")) {
    message.delete()
    if (!message.member.hasPermission('BAN_MEMBERS')) return;
    let utilisateur = message.mentions.members.first() || message.guild.member(args[0])
    if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
    message.guild.members.ban(utilisateur.id);
    message.channel.send('**__Vous avez banni avec succès ce voyou__ !**');
    setTimeout(function () {
       
    })

}
  })


  bot.on('message', message => {
    const arg = message.content.split(" ").slice(1);
    const args = message.content.split(" ").slice(2);
  if (message.content.startsWith("!kick")) {
    message.delete()
    if (!message.member.hasPermission('KICK_MEMBERS')) return;
    let utilisateur = message.mentions.members.first() || message.guild.member(args[0])
    if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
    message.guild.members.ban(utilisateur.id);
    message.channel.send('**__Oust ! Un utilisateur vient de se faire kick__**');
    message.guild.members.unban(utilisateur.id);
    setTimeout(function () {
       
    })

}
  })




/************************* INFO USER ****************************/


  bot.on("message", async message => {

    if (message.author.bot) return;
    let commande = message.content.trim().split(" ")[0].slice(1)
    let args = message.content.trim().split(" ").slice(1);


    
    if (message.content.startsWith("!info")) {
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
       } else{
            user = message.author;
        }
        const member = message.guild.member(user);

        const embed = new Discord.MessageEmbed() 
        .setColor('#ff5555')
        .setThumbnail(user.avatarURL)
        .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
        .addField('ID du compte:', `${user.id}`, true)
        .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
        .addField('A crée son compte le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', `${user.presence.status}`, true)
        .addField('Joue a :', `${user.presence.game ? user.presence.game.name : 'Rien'}`, true)
        .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
        .addField(`Demandé par :`,`${message.author.username}#${message.author.discriminator}`)
    message.channel.send(embed)
    }
  })   







/***********************SAVE BDD ********************************/


function Savebdd(){
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Oups ! Une erreur est survenue !");
    });
}




/******* END ***************/


console.log("Fichier gestion OP")
bot.login(process.env.TOKEN);