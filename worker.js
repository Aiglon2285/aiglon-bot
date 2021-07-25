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









/*************************ACHAT WORKERS UPGRADES *****************************/

bot.on("message", message => {
    if (message.content.startsWith("!coBuy")) {
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
        } else {
            NbrWorkers = parseInt(bdd[Corp]["NbrWorker"]) 
            PrixBureau = 1000000 * parseInt(bdd[Corp + "Perms"]["SlotWorker"])
            const embed = new Discord.MessageEmbed()
            .setTitle("**Choisissez la catégorie d'achat :**")
            .addField("Upgrade", "Débloquer des workers, augmenter les rendements.")
            .addField("Worker", "Acheter des workers de tiers 1 et 2.")
            .setColor("#ff00f2")
            message.channel.send(embed)
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
            console.log(collector)
            collector.on('collect', message => {


                if(message.content === "Upgrade") {
                    const embedUpgrade = new Discord.MessageEmbed()
                    .setTitle("**Choisissez l'amélioration de ton choix :**")
                    .addField("Worker T1", "Débloque les workers de T1, pour 10 000 :coin:.")
                    .addField("Worker T2", "Débloque les workers de T2, pour 100 000 :coin:.")
                    .addField("New Bureau", "+10 workers potentiels, pour " + PrixBureau + " :coin:. Nbr Workers actuel : " + NbrWorkers + " Nbr Workers potentiel : " + bdd[Corp + "Perms"]["SlotWorker"])
                    .setColor("#ff00f2")
                    message.channel.send(embedUpgrade)
                    const collector2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
                    console.log(collector2)
                    collector2.on('collect', message => {


                        if(message.content === "Worker T1") {
                            if(Compte < 10000) {
                                message.channel.send("Vous n'avez pas assez d'argent !")
                            }
                            else if (!bdd[Corp + "Perms"]["WorkerT1"] === false) {
                                message.channel.send("Vous possedez déjà cette amélioration !")
                            }
                            else {
                                bdd["money"][Client] = Compte - 10000
                                bdd[Corp + "Perms"]["WorkerT1"] = true
                                Savebdd()
                                message.channel.send("Amélioration réussie !")
                            }

                        }

                        else if(message.content === "Worker T2") {
                            if(Compte < 100000) {
                                message.channel.send("Vous n'avez pas assez d'argent !")
                            }
                            else if (!bdd[Corp + "Perms"]["WorkerT2"] === false) {
                                message.channel.send("Vous possedez déjà cette amélioration !")
                            }
                            else {
                                bdd["money"][Client] = Compte - 100000
                                bdd[Corp + "Perms"]["WorkerT2"] = true
                                Savebdd()
                                message.channel.send("Amélioration réussie !")
                            }

                        }

                        else if(message.content === "New Bureau") {
                            if(Compte < PrixBureau) {
                                message.channel.send("Vous n'avez pas assez d'argent !")
                            }
                            else {
                                bdd["money"][Client] = Compte - PrixBureau
                                bdd[Corp + "Perms"]["SlotWorker"] = parseInt(bdd[Corp + "Perms"]["SlotWorker"]) + 10
                                Savebdd()
                                message.channel.send("Amélioration réussie !")
                            }

                        }

                        else {
                            message.channel.send("Amélioration non reconnue.")
                        }
                    
                    
                    })

                } 

                else if(message.content === "Worker") {
                    const embedWorker = new Discord.MessageEmbed()
                    .setTitle("**Choisissez l'amélioration de ton choix :**")
                    .addField("Technicien", "Worker T1 / Prix : 50 000 :coin: / Gain : + 3 000 :coin: par !coWork / Actuellement en possession : " + bdd[Corp]["Technicien"])
                    .addField("Ingenieur", "Worker T2 / Prix : 300 000 :coin: / Gain : + 30 000 :coin: par !coWork / Actuellement en possession : " + bdd[Corp]["Ingenieur"])
                    .setColor("#ff00f2")
                    message.channel.send(embedWorker)
                    const collector3 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 500000 } );
                    console.log(collector3)
                    collector3.on('collect', message => { 


                        if(message.content === "Technicien") {
                            if(Compte < 50000) {
                                message.channel.send("Vous n'avez pas assez d'argent !")
                            }
                            else if (bdd[Corp + "Perms"]["WorkerT1"] === false) {
                                message.channel.send("Vous devez d'abord posseder l'upgrade `Worker T1` !")
                            }
                            else if (NbrWorkers === parseInt(bdd[Corp + "Perms"]["SlotWorker"])) {
                                message.channel.send("Vous avez atteind la limite de Worker potentiels. Améliorez là pour obtenir de nouveaux Workers")
                            }
                            else {
                                bdd["money"][Client] = Compte - 50000
                                bdd[Corp]["Technicien"] = parseInt(bdd[Corp]["Technicien"]) + 1
                                bdd[Corp]["NbrWorker"] = parseInt(bdd[Corp]["NbrWorker"]) + 1
                                Savebdd()
                                message.channel.send("Achat réussi ! Organisation d'un pot d'arrivée pour ce nouvel employé !")
                            }

                        }


                        else if(message.content === "Ingenieur") {
                            if(Compte < 300000) {
                                message.channel.send("Vous n'avez pas assez d'argent !")
                            }
                            else if (bdd[Corp + "Perms"]["WorkerT2"] === false) {
                                message.channel.send("Vous devez d'abord posseder l'upgrade `Worker T2` !")
                            }
                            else if (NbrWorkers === parseInt(bdd[Corp + "Perms"]["SlotWorker"])) {
                                message.channel.send("Vous avez atteind la limite de Worker potentiels. Améliorez là pour obtenir de nouveaux Workers")
                            }
                            else {
                                bdd["money"][Client] = Compte - 300000
                                bdd[Corp]["Ingenieur"] = parseInt(bdd[Corp]["Ingenieur"]) + 1
                                bdd[Corp]["NbrWorker"] = parseInt(bdd[Corp]["NbrWorker"]) + 1
                                Savebdd()
                                message.channel.send("Achat réussi ! Organisation d'un pot d'arrivée pour ce nouvel employé !")
                            }

                        }


                        else {
                            message.channel.send("Worker non reconnu.")
                        }


                    })
                }




                else {
                    message.channel.send("Catégorie non reconue.")
                }
            
            
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


console.log("Fichier worker OP")
bot.login(process.env.TOKEN);
