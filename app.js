const { Client, Intents, Permissions } = require("discord.js");
require("dotenv").config();
const client = new Client({ intents : [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES ] });

const discordToken = process.env.DISCORD_TOKEN;
const masterId = '232098431684837376'
const innKeeperId = '868188628709425162'
const guildId = '868190470336028672'


async function areYouAlive(){
  const guild = client.guilds.cache.get(guildId)
  
  let status = await guild.members.fetch().then(member => member.get(innKeeperId)?.presence?.status)
  console.log(status)
  if (status != 'online'){
    client.users.cache.get(masterId).send("서버 사망!")
    client.users.cache.get(masterId).send("서버 사망!")
    client.users.cache.get(masterId).send("서버 사망!")
  }
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  console.log(`I am in ${client.guilds.cache.size} servers.`)
  client.user.setActivity("여관주인을 수호", {
    type: "PLAYING",
  });
  areYouAlive();
  setInterval(areYouAlive, 300000)
})

client.on("messageCreate", message => {
  if( message.author.bot ) return;
  if( !message.mentions.has(client.user.id) ) return;
  if( message.mentions.everyone ) return;

  const roleChecker = [
    Permissions.FLAGS.SEND_MESSAGES
  ];
  let hasPermission = false;
  for( const role of message.guild.me.roles.cache.values() ){
    let myRolePermission = role.permissionsIn(message.channel);
    if( myRolePermission.has(roleChecker) ){
      if (role.name != '@everyone'){
        hasPermission = true;
        break;
      } 
    }
  }
  if( !hasPermission ) {
    console.log(`No permission : ${ message.channel.id }`);
    return;
  }

  console.log(message.content);

  if(message.content.split(" ")[1] == "안녕") message.channel.send("나도 반가워!")
})

try {
  client.login(discordToken)
} catch(e){
  console.log("로그인 실패")
}
