const Discord=require('discord.js');
const client=new Discord.Client();
require('dotenv').config();

const token=process.env.token;
const prefix=process.env.prefix;
if(prefix===undefined){console.log(`The token is undefined.`);}

function between(min,max){return Math.floor(Math.random()*(max-min)+min)}

client.once('ready',()=>{
console.log('Ready!');
client.user.setActivity(`commands | Prefix: ${prefix}`,{type:'WATCHING'});
});

client.on('message',message=>{
if(message.content.startsWith(prefix)&&message.author.bot===false){
const command=message.content.substring(prefix.length,message.content.length);

if(command.startsWith(`info`)){
var rolesa=Array.from(message.guild.roles.cache);
var roles=``;
for(i=0;i<rolesa.length;i++){
var roles=roles+` ${rolesa[i].toString().split(`,`)[1]}`;
}
const embed=new Discord.MessageEmbed()
.setColor(`#0099ff`)
.setTitle(`:information_source: | Information`)
.addFields(
{name:`Server info`,value:`Server name: ${message.guild.name}\r\nMember count: ${message.guild.memberCount}\r\nServer owner: ${message.guild.owner}\r\nRole count: ${message.guild.roles.cache.size}\r\nChannel count: ${message.guild.channels.cache.size}`,inline:true},
{name:`User info`,value:`Discord username: ${message.author.tag}\r\nAccount creation date: ${Date(Date.parse(message.author.createdAt))}\r\nUser ID: ${message.author.id}`,inline:true},
{name:`Server roles`,value:roles},
);
message.channel.send(embed);
}

}});

client.on('message',message=>{
if(message.author.bot===false){

if(message.content.includes(`<@!${message.guild.owner.id}>`)&&message.guild.owner.presence.status===`online`){message.guild.owner.send(`**You were pinged!**\r\nServer: ${message.guild.name}\r\nChannel: ${message.channel.name}\r\nPinged by: ${message.author.tag} (${message.author})\r\nLink: https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`);message.react(`:pingBadge1:758199090827493398`);}
if(message.content.includes(`ping`)){message.react(`:pingBadge1:758199090827493398`);}

}});

client.login(token);