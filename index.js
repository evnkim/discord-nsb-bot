const Discord = require('discord.js');
const storage = require('./storage.js');
let linksDictionary = storage.linkDic();
let TOKEN = storage.token();

const client = new Discord.Client();

const prefix = '!';

const currentMaxSet = 11;

client.once('ready',() => {
    console.log("We're online!");
});

function linkGetter(round,set){
    const key = `${set}R${round}`
    return `https://science.osti.gov/-/media/wdts/nsb/pdf/HS-Sample-Questions/Sample-Set-${linksDictionary[key]}`
}

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log("message sent!");
    if(command === 'ping'){
        message.channel.send('pong!');
    }
    if(command === 'get' && args.length >= 2){
        let set = "";
        let round = "";
        const first = args.shift().toLowerCase();
        const second = args.shift().toLowerCase();
        if(first.charAt(0) === 's'){
            set = parseInt(first.slice(1));
            round = parseInt(second.slice(1));
        }
        else if(second.charAt(0) === 's'){
            set = parseInt(second.slice(1));
            round = parseInt(first.slice(1));
        }
        else{
            message.channel.send("I'm sorry, I don't understand that message. Try !help to see how to use the get command");
            return;
        }
        
        // const set = parseInt(args.shift().toLowerCase().slice(1));
        // const round = parseInt(args.shift().toLowerCase().slice(1));
        if(set <= 5){
            message.channel.send(`https://science.osti.gov/-/media/wdts/nsb/pdf/HS-Sample-Questions/Sample-Set-${set}/round${round}.pdf`);
        }
        else if(set <= currentMaxSet){
            message.channel.send(linkGetter(round,set));
        }
        else{
            message.channel.send("That set doesn't exist yet! Please try again");
        }
    }
});

client.login(TOKEN);