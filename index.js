const { Client, GatewayIntentBits, SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const ModuleDatabase = require("./database");
const ActivityType = require("discord.js");
const { Pagination } = require('pagination.djs');
require('dotenv').config();
var token = process.env.TOKEN;
var vars={
  commands:[],
  ModCommands: [],
  db: new ModuleDatabase(),
  ModBD: new ModuleDatabase(),
 
  
};
function splitArray(arr) {
  const mid = Math.floor(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  //set the disocrd activity to watching 
  const activities = ["beepu beepu"]
  
  setInterval(() => {
    const status = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(status, { type: ActivityType.watching });
  }, 5000);
  console.log('Connected to Discord');
  vars.db.init().then((result) => {
    vars.commands = result;
    console.log('Database loaded');
    vars.ModBD.initHelp().then((result) => {
      vars.ModCommands = result;
      console.log('Module Database loaded');
      RegisterAllSlashCommands();
    })
  })
  
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
   const pagination = new Pagination(message);

  

 

  if (message.content.toLowerCase().startsWith('help ')) {
    const moduleName = message.content.split(' ')[1].toLowerCase();
    //await PreviewModuleCommand(message, moduleName);
    message.reply("This command is disabled for now")
  }

  // Discord IDs of users who are permitted to register slash commands.
    const discordIDsOfUsersWhoCanUpdateSlashCommands = ["582279365912559631"];

  if (!discordIDsOfUsersWhoCanUpdateSlashCommands.includes(message.author.id) ) return;
  if(message.content.toLowerCase() === "show database") {
  var embeds = [];
  const commandList = vars.commands.map(cmd => `${cmd.Trigger}: ${cmd.Title}`);
  let embed = new EmbedBuilder().setTitle('Command List').setColor('#9efa73');
  let page = 1;
  for (let i = 0; i < commandList.length; i++) {
    var commandListSplit = commandList[i].split(": ");
    embed.addFields({ name: `/${commandListSplit[0].replace(/ /g, "-").replace(/\*/g,"-").toLowerCase()}`, value: commandListSplit[1]});
    // If 25 fields have been added or it's the last command, push the embed and start a new one
    if ((i + 1) % 25 === 0 || i === commandList.length - 1) {
      embed.setFooter({ text: `Page ${page}/${Math.ceil(commandList.length / 25)}` });
      embeds.push(embed);
      page++;
      embed = new EmbedBuilder().setTitle('Command List').setColor('#9efa73');
    }
  }
  pagination.setEmbeds(embeds);
  pagination.setAuthorizedUsers([])
  pagination.setIdle(120000); // 2 minutes
  
  return pagination.render();
}
  

  if (message.content.toLowerCase() === 'update slash commands') {
    console.log('Updating slash commands')
    await RegisterAllSlashCommands();
    await message.reply('Slash commands updated.');
  }
  
  
  else if (message.content.toLowerCase().startsWith('remove slash command ')) {
    try {
      const commandIDAsString = message.content.slice(21);
      console.log(`Removing slash command ${commandIDAsString}`);
      const commandID = BigInt(commandIDAsString);
      await RemoveSlashCommand(message,BigInt(commandID));
      
    } catch (error) {
      console.error(error);
      await message.reply('Unable to remove slash command.');
    }
  }
});

async function ProcessMessage(interaction, IsEphemeral) {

  // using the command name find in database form a embed 
  var command = vars.commands.find(c => c.Trigger.replace(/ /g, "-").replace(/\*/g,"-").toLowerCase() === interaction.commandName);
  if (!command) {
    console.error(`Command ${interaction.commandName} not found in the database.`);
    interaction.reply(`Sorry, I'm having an internal issue Please alert staff!`)
    return
  }
  // assign the feild_Name and Feild data as {name: "Name", value: "Value"}
  var fields = []
  
  if (command.Field_1_Name != '' && command.Field_1_Data != ''&& command.Field_1_Name != null && command.Field_1_Data != null) {
    fields.push({name: command.Field_1_Name, value: command.Field_1_Data})
  }
  if (command.Field_2_Name != '' && command.Field_2_Data != '' && command.Field_2_Name != null && command.Field_2_Data != null) {
    fields.push({name: command.Field_2_Name, value: command.Field_2_Data})
  }
  if (command.Field_3_Name != '' && command.Field_3_Data != ''&& command.Field_3_Name != null && command.Field_3_Data != null) {
    fields.push({name: command.Field_3_Name, value: command.Field_3_Data})
  }
  if (command.Field_4_Name != '' && command.Field_4_Data != ''&& command.Field_4_Name != null && command.Field_4_Data != null) {

    fields.push({name: command.Field_4_Name, value: command.Field_4_Data})
  }
  if (command.Field_5_Name != '' && command.Field_5_Data != ''&& command.Field_5_Name != null && command.Field_5_Data != null) {
    fields.push({name: command.Field_5_Name, value: command.Field_5_Data})
  }
  if (command.Field_6_Name != ''&& command.Field_6_Data != ''&& command.Field_6_Name != null && command.Field_6_Data != null) {
    fields.push({name: command.Field_6_Name, value: command.Field_6_Data})
  }
  if (command.Field_7_Name != '' && command.Field_7_Data != ''&& command.Field_7_Name != null && command.Field_7_Data != null) {
    fields.push({name: command.Field_7_Name, value: command.Field_7_Data})
  }
  if (command.Field_8_Name != '' && command.Field_8_Data != ''&& command.Field_8_Name != null && command.Field_8_Data != null) {
    fields.push({name: command.Field_8_Name, value: command.Field_8_Data})
  }
  if (command.Field_9_Name != '' && command.Field_9_Data != ''&& command.Field_9_Name != null && command.Field_9_Data != null) {
    fields.push({name: command.Field_9_Name, value: command.Field_9_Data})
  }

  if (command.Field_10_Name != '' && command.Field_10_Data != ''&& command.Field_10_Name != null && command.Field_10_Data != null) {
    fields.push({name: command.Field_10_Name, value: command.Field_10_Data})
  }
  if (command.Field_11_Name != '' && command.Field_11_Data != ''&& command.Field_11_Name != null && command.Field_11_Data != null) {
    fields.push({name: command.Field_11_Name, value: command.Field_11_Data})
  }
  if (command.Field_12_Name != ''&& command.Field_12_Data != ''&& command.Field_12_Name != null && command.Field_12_Data != null) {
    fields.push({name: command.Field_12_Name, value: command.Field_12_Data})
  }
  if (command.Field_13_Name != '' && command.Field_13_Data != ''&& command.Field_13_Name != null && command.Field_13_Data != null) {
    fields.push({name: command.Field_13_Name, value: command.Field_13_Data})
  }
  if (command.Field_14_Name != '' && command.Field_14_Data != ''&& command.Field_14_Name != null && command.Field_14_Data != null) {
    fields.push({name: command.Field_14_Name, value: command.Field_14_Data})
  }
  if (command.Field_15_Name != '' && command.Field_15_Data != ''&& command.Field_15_Name != null && command.Field_15_Data != null) {
    fields.push({name: command.Field_15_Name, value: command.Field_15_Data})
  }
  
   
  
  var embed = new EmbedBuilder()
    .setColor('#9efa73')
    .setTitle(command.Title)
    .addFields(fields)
    .setAuthor({name: "Somatic Steve", icon_url: "https://cdn.discordapp.com/icons/1068608389128659026/5f139d65c5faba234d5f788536fe3078.webp",url:"https://discord.gg/GNpmEN2"})
    if(command.Discription.toString() != ''&& command.Discription != null&&command.Discription != undefined){
      embed.setDescription(command.Discription.toString())}
    if(command.Image_URL != ''&& command.Image_URL != null && command.Image_URL != undefined){
      embed.setImage(command.Image_URL)
    }
    if(command.Footer != '' && command.Footer != null && command.Footer != undefined){
      embed.setFooter({text:command.Footer})
    }
    return interaction.reply({ embeds: [embed] , ephemeral: IsEphemeral});

}

async function PreviewSlashCommand(message, commandName) {
  

 // preview a module command
 var command = vars.commands.find(c => c.Trigger === commandName);
 if (!command) {
   console.error(`Command ${moduleName} not found in the database.`);
   return;
 }
 var fields = []


 if (command.Field_1_Name != '' && command.Field_1_Data != '') {
   fields.push({name: command.Field_1_Name, value: command.Field_1_Data})
 }
 if (command.Field_2_Name != '' && command.Field_2_Data != '') {
   fields.push({name: command.Field_2_Name, value: command.Field_2_Data})
 }
 if (command.Field_3_Name != '' && command.Field_3_Data != '') {
   fields.push({name: command.Field_3_Name, value: command.Field_3_Data})
 }
 if (command.Field_4_Name != '' && command.Field_4_Data != '') {
   fields.push({name: command.Field_4_Name, value: command.Field_4_Data})
 }
 if (command.Field_5_Name != '' && command.Field_5_Data != '') {
   fields.push({name: command.Field_5_Name, value: command.Field_5_Data})
 }
 if (command.Field_6_Name != '' && command.Field_6_Data != '') {
   fields.push({name: command.Field_6_Name, value: command.Field_6_Data})
 }
 if (command.Field_7_Name != '' && command.Field_7_Data != '') {
   fields.push({name: command.Field_7_Name, value: command.Field_7_Data})
 }
 if (command.Field_8_Name != '' && command.Field_8_Data != '') {
   fields.push({name: command.Field_8_Name, value: command.Field_8_Data})
 }
 if (command.Field_9_Name != '' && command.Field_9_Data != '') {
   fields.push({name: command.Field_9_Name, value: command.Field_9_Data})

 }
 if (command.Field_10_Name != '' && command.Field_10_Data != '') {
   fields.push({name: command.Field_10_Name, value: command.Field_10_Data})
 }

 if (command.Field_11_Name != '' && command.Field_11_Data != '') {
   fields.push({name: command.Field_11_Name, value: command.Field_11_Data})
 }
 if (command.Field_12_Name != '' && command.Field_12_Data != '') {
   fields.push({name: command.Field_12_Name, value: command.Field_12_Data})
 }

 if (command.Field_13_Name != '' && command.Field_13_Data != '') {
   fields.push({name: command.Field_13_Name, value: command.Field_13_Data})
 }
 if (command.Field_14_Name != '' && command.Field_14_Data != '') {
   fields.push({name: command.Field_14_Name, value: command.Field_14_Data})
 }
 if (command.Field_15_Name != '' && command.Field_15_Data != '') {
   fields.push({name: command.Field_15_Name, value: command.Field_15_Data})

 }
 


 var embed = new EmbedBuilder()

   .setTitle(command.Title)
   .setColor('#9efa73')
   .addFields(fields)
   .setAuthor({name: "Somatic Steve", icon_url: "https://cdn.discordapp.com/icons/1068608389128659026/5f139d65c5faba234d5f788536fe3078.webp",url:"https://discord.gg/Ku4nUbWWkS"})
   if(command.Discription != ''|| command.Discription != null|| command.Discription != undefined){
     embed.setDescription(command.Discription.toString())}
   if(command.Image_URL != ''|| command.Image_URL != null|| command.Image_URL != undefined){
     embed.setImage(command.Image_URL)
   }
   if(command.Footer != ''){
     embed.setFooter({text:command.Footer})
   }
   return message.reply({ embeds: [embed] });

 
}

async function PreviewModuleCommand(message, moduleName, IsEphemeral) {
  // preview a module command
  var paginationMod = new Pagination(message);
  var Helpcommand = vars.ModCommands.find(c => c.Trigger === moduleName.toLowerCase().replace(/ /g, "-").replace(/\*/g,"-"));
  if (!Helpcommand || Helpcommand == null || Helpcommand == undefined ) {
    message.reply(`Sorry, this isn't a module please run **/list-modules**`)
    return;
  }
  var fields = []

  

  if (Helpcommand.Field_1_Name != '' && Helpcommand.Field_1_Data != '' && Helpcommand.Field_1_Name != null && Helpcommand.Field_1_Data != null) {

    fields.push({name: Helpcommand.Field_1_Name, value: Helpcommand.Field_1_Data})
  }
  if (Helpcommand.Field_2_Name != '' && Helpcommand.Field_2_Data != ''&& Helpcommand.Field_2_Name != null && Helpcommand.Field_2_Data != null) {
    fields.push({name: Helpcommand.Field_2_Name, value: Helpcommand.Field_2_Data})
  }
  if (Helpcommand.Field_3_Name != '' && Helpcommand.Field_3_Data != ''&& Helpcommand.Field_3_Name != null && Helpcommand.Field_3_Data != null) {
    fields.push({name: Helpcommand.Field_3_Name, value: Helpcommand.Field_3_Data})
  }
  if (Helpcommand.Field_4_Name != '' && Helpcommand.Field_4_Data != ''&& Helpcommand.Field_4_Name != null && Helpcommand.Field_4_Data != null) {
    fields.push({name: Helpcommand.Field_4_Name, value: Helpcommand.Field_4_Data})
  }
  if (Helpcommand.Field_5_Name != '' && Helpcommand.Field_5_Data != ''&& Helpcommand.Field_5_Name != null && Helpcommand.Field_5_Data != null) {
    fields.push({name: Helpcommand.Field_5_Name, value: Helpcommand.Field_5_Data})
  }
  if (Helpcommand.Field_6_Name != '' && Helpcommand.Field_6_Data != ''&& Helpcommand.Field_6_Name != null && Helpcommand.Field_6_Data != null) {
    fields.push({name: Helpcommand.Field_6_Name, value: Helpcommand.Field_6_Data})
  }
  if (Helpcommand.Field_7_Name != '' && Helpcommand.Field_7_Data != ''&& Helpcommand.Field_7_Name != null && Helpcommand.Field_7_Data != null) {
    fields.push({name: Helpcommand.Field_7_Name, value: Helpcommand.Field_7_Data})
  }
  if (Helpcommand.Field_8_Name != '' && Helpcommand.Field_8_Data != ''&& Helpcommand.Field_8_Name != null && Helpcommand.Field_8_Data != null) {
    fields.push({name: Helpcommand.Field_8_Name, value: Helpcommand.Field_8_Data})
  }
  if (Helpcommand.Field_9_Name != '' && Helpcommand.Field_9_Data != ''&& Helpcommand.Field_9_Name != null && Helpcommand.Field_9_Data != null) {
    fields.push({name: Helpcommand.Field_9_Name, value: Helpcommand.Field_9_Data})

  }
  if (Helpcommand.Field_10_Name != '' && Helpcommand.Field_10_Data != ''&& Helpcommand.Field_10_Name != null && Helpcommand.Field_10_Data != null) {
    fields.push({name: Helpcommand.Field_10_Name, value: Helpcommand.Field_10_Data})
  }

  if (Helpcommand.Field_11_Name != '' && Helpcommand.Field_11_Data != ''&& Helpcommand.Field_11_Name != null && Helpcommand.Field_11_Data != null) {
    fields.push({name: Helpcommand.Field_11_Name, value: Helpcommand.Field_11_Data})
  }
  if (Helpcommand.Field_12_Name != '' && Helpcommand.Field_12_Data != ''&& Helpcommand.Field_12_Name != null && Helpcommand.Field_12_Data != null) {
    fields.push({name: Helpcommand.Field_12_Name, value: Helpcommand.Field_12_Data})
  }

  if (Helpcommand.Field_13_Name != '' && Helpcommand.Field_13_Data != ''&& Helpcommand.Field_13_Name != null && Helpcommand.Field_13_Data != null) {
    fields.push({name: Helpcommand.Field_13_Name, value: Helpcommand.Field_13_Data})
  }
  if (Helpcommand.Field_14_Name != '' && Helpcommand.Field_14_Data != ''&& Helpcommand.Field_14_Name != null && Helpcommand.Field_14_Data != null) {
    fields.push({name: Helpcommand.Field_14_Name, value: Helpcommand.Field_14_Data})
  }
  if (Helpcommand.Field_15_Name != '' && Helpcommand.Field_15_Data != ''&& Helpcommand.Field_15_Name != null && Helpcommand.Field_15_Data != null) {
    fields.push({name: Helpcommand.Field_15_Name, value: Helpcommand.Field_15_Data})
  }
  if (Helpcommand.Field_16_Name != '' && Helpcommand.Field_16_Data != ''&& Helpcommand.Field_16_Name != null && Helpcommand.Field_16_Data != null) {
    fields.push({name: Helpcommand.Field_16_Name, value: Helpcommand.Field_16_Data})
  }
  if (Helpcommand.Field_17_Name != '' && Helpcommand.Field_17_Data != ''&& Helpcommand.Field_17_Name != null && Helpcommand.Field_17_Data != null) {
    fields.push({name: Helpcommand.Field_17_Name, value: Helpcommand.Field_17_Data})
  }
  if (Helpcommand.Field_18_Name != '' && Helpcommand.Field_18_Data != ''&& Helpcommand.Field_18_Name != null && Helpcommand.Field_18_Data != null) {
    fields.push({name: Helpcommand.Field_18_Name, value: Helpcommand.Field_18_Data})
  }
  if (Helpcommand.Field_19_Name != '' && Helpcommand.Field_19_Data != ''&& Helpcommand.Field_19_Name != null && Helpcommand.Field_19_Data != null) {
    fields.push({name: Helpcommand.Field_19_Name, value: Helpcommand.Field_19_Data})
  }
  if (Helpcommand.Field_20_Name != '' && Helpcommand.Field_20_Data != ''&& Helpcommand.Field_20_Name != null && Helpcommand.Field_20_Data != null) {
    fields.push({name: Helpcommand.Field_20_Name, value: Helpcommand.Field_20_Data})
  }
  if (Helpcommand.Field_21_Name != '' && Helpcommand.Field_21_Data != ''&& Helpcommand.Field_21_Name != null && Helpcommand.Field_21_Data != null) {
    fields.push({name: Helpcommand.Field_21_Name, value: Helpcommand.Field_21_Data})
  }
  if (Helpcommand.Field_22_Name != '' && Helpcommand.Field_22_Data != ''&& Helpcommand.Field_22_Name != null && Helpcommand.Field_22_Data != null) {
    fields.push({name: Helpcommand.Field_22_Name, value: Helpcommand.Field_22_Data})
  }
  if (Helpcommand.Field_23_Name != '' && Helpcommand.Field_23_Data != ''&& Helpcommand.Field_23_Name != null && Helpcommand.Field_23_Data != null) {
    fields.push({name: Helpcommand.Field_23_Name, value: Helpcommand.Field_23_Data})
  }
  if (Helpcommand.Field_24_Name != '' && Helpcommand.Field_24_Data != ''&& Helpcommand.Field_24_Name != null && Helpcommand.Field_24_Data != null) {
    fields.push({name: Helpcommand.Field_24_Name, value: Helpcommand.Field_24_Data})
  }
  if (Helpcommand.Field_25_Name != '' && Helpcommand.Field_25_Data != ''&& Helpcommand.Field_25_Name != null && Helpcommand.Field_25_Data != null) {
    fields.push({name: Helpcommand.Field_25_Name, value: Helpcommand.Field_25_Data})
  }
  if (Helpcommand.Field_26_Name != '' && Helpcommand.Field_26_Data != ''&& Helpcommand.Field_26_Name != null && Helpcommand.Field_26_Data != null) {
    fields.push({name: Helpcommand.Field_26_Name, value: Helpcommand.Field_26_Data})
  }
  if (Helpcommand.Field_27_Name != '' && Helpcommand.Field_27_Data != ''&& Helpcommand.Field_27_Name != null && Helpcommand.Field_27_Data != null) {
    fields.push({name: Helpcommand.Field_27_Name, value: Helpcommand.Field_27_Data})
  }
  if (Helpcommand.Field_28_Name != '' && Helpcommand.Field_28_Data != ''&& Helpcommand.Field_28_Name != null && Helpcommand.Field_28_Data != null) {
    fields.push({name: Helpcommand.Field_28_Name, value: Helpcommand.Field_28_Data})
  }
  if (Helpcommand.Field_29_Name != '' && Helpcommand.Field_29_Data != ''&& Helpcommand.Field_29_Name != null && Helpcommand.Field_29_Data != null) {
    fields.push({name: Helpcommand.Field_29_Name, value: Helpcommand.Field_29_Data})
  }
  if (Helpcommand.Field_30_Name != '' && Helpcommand.Field_30_Data != ''&& Helpcommand.Field_30_Name != null && Helpcommand.Field_30_Data != null) {
    fields.push({name: Helpcommand.Field_30_Name, value: Helpcommand.Field_30_Data})
  }
  if (Helpcommand.Field_31_Name != '' && Helpcommand.Field_31_Data != ''&& Helpcommand.Field_31_Name != null && Helpcommand.Field_31_Data != null) {
    fields.push({name: Helpcommand.Field_31_Name, value: Helpcommand.Field_31_Data})
  }
  if (Helpcommand.Field_32_Name != '' && Helpcommand.Field_32_Data != ''&& Helpcommand.Field_32_Name != null && Helpcommand.Field_32_Data != null) {
    fields.push({name: Helpcommand.Field_32_Name, value: Helpcommand.Field_32_Data})
  }



  

var embeds = [];
  var embed = new EmbedBuilder()

    .setTitle(Helpcommand.Title)
    .setColor('#9efa73')
    
    .setAuthor({name: "Somatic Steve", icon_url: "https://cdn.discordapp.com/icons/1068608389128659026/5f139d65c5faba234d5f788536fe3078.png",url:"https://discord.gg/Ku4nUbWWkS"})
    if(Helpcommand.Footer != ''){
      embed.setFooter({text:Helpcommand.Footer})
    }
    if(fields.length > 1) {
      
      // paginate fields
      var chunks = [];
      for (let i = 0; i < fields.length; i ++) {
        chunks.push(fields[i]);
        
        embed.addFields(chunks);
        embeds.push(embed);
        chunks = []
        embed = new EmbedBuilder()
          .setTitle(Helpcommand.Title)
          .setColor('#9efa73')
          .setAuthor({name: "Somatic Steve", icon_url: "https://cdn.discordapp.com/icons/1068608389128659026/5f139d65c5faba234d5f788536fe3078.png",url:"https://discord.gg/Ku4nUbWWkS"});
        if(Helpcommand.Footer != ''){
          embed.setFooter({text:Helpcommand.Footer})
        }
      }
      paginationMod.setEmbeds(embeds);

      paginationMod.setAuthorizedUsers([])

      return paginationMod.render(message.channel)

    }

    else {
      embed.addFields(fields);
      return message.reply({ embeds: [embed] , ephemeral: IsEphemeral});
      
    }

  }



async function RegisterSingleSlashCommand(commandName) {
  vars.db.init().then((result) => {
    vars.commands = result;
    console.log('Database loaded');
    vars.ModBD.initHelp().then((result) => {
      vars.ModCommands = result;
      console.log('Module Database loaded');})
  })
  console.log(`Registering slash command ${commandName}`);
  // get command info from the database
  var command = vars.commands.find(c => c.Trigger === commandName);
  if (!command) {
    console.error(`Command ${commandName} not found in the database.`);
    return;
  }
  var commandData = [new SlashCommandBuilder().setName(command.Trigger.replace(/ /g, "-").replace("*","-").toLowerCase()).setDescription(command.Title)]
  
  
  //add the slash command to the bot
  const rest = new REST({ version: '9' }).setToken(token);
  try {
    console.log('Started refreshing application (/) commands.');
    //get all the commands from the rest
    await rest.get(
      Routes.applicationCommands("1498658166861201488"),
    
    ).then(async (result) => {
      result.push(commandData[0].toJSON())
      await rest.put(Routes.applicationCommands("1498658166861201488", '573135393239859222'),
        { body: commandData.map(commandinfo => commandinfo.toJSON()) },
      );
    })
    
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

async function RegisterAllSlashCommands() {
  // load all commands from the database
  vars.db.init().then((result) => {
    vars.commands = result;
    console.log('Database loaded');
    vars.ModBD.initHelp().then((result) => {
      vars.ModCommands = result;
      console.log('Module Database loaded');})
  })
  var commandData = []
  var promises = [];
  var i =1
  console.log('Registering all slash commands');

//commandData.push(new SlashCommandBuilder().setName("list-modules").setDescription('Get a list of all modules'))
commandData.push(new SlashCommandBuilder().setName("update-slash-commands").setDescription('Update the slash commands'))
  for (const command of vars.commands) {
    if (!command) {
      console.error(`Command ${commandName} not found in the database.`);
      

    }else{
      console.log(`Registering slash command ${command.Trigger}`);
    //replace * with - in the trigger
    command.Trigger = command.Trigger.replace(/ /g, "-")
    command.Trigger = command.Trigger.replace("*","-")
    
    
    commandData.push( new SlashCommandBuilder().setName(command.Trigger.toLowerCase()).setDescription(command.Title).addBooleanOption(option => option.setName('show').setDescription('show or hide the message').setRequired(false)))
    }
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => resolve(i), Math.random() * 1000)
      })
    );
    i++
    
    
    
    
  }

  //add the slash command to the bot
  Promise.all(promises).then(async () =>{
    

  const rest = new REST({ version: '9' }).setToken(token);
  try {
    console.log('Started refreshing application (/) commands.');
    var [firstHalf, secondHalf] = splitArray(commandData);
    if (commandData.length < 25) {
      await rest.put(
        Routes.applicationCommands("1498658166861201488"),
        { body: commandData.map(commandinfo => commandinfo.toJSON()) },
      );
      console.log('Successfully reloaded application (/) commands.');
      i = 0;
      return;
    }
    else{
    await rest.put(
      Routes.applicationCommands("1498658166861201488"),
      { body: firstHalf.map(commandinfo => commandinfo.toJSON()) },
    ).then(async () => {
      console.log('Successfully reloaded application (/) commands.');
      await rest.put(
      Routes.applicationGuildCommands("1498658166861201488","1068608389128659026"),
      { body: secondHalf.map(commandinfo2 => commandinfo2.toJSON()) },
      );
      console.log('Successfully reloaded Guild (/) commands.');
      i = 0;
    });
  }
  } catch (error) {
    console.error(error);
  }})

}

async function RemoveSlashCommand(message,commandID) {
  // remove the command from the bot 
  const rest = new REST({ version: '9' }).setToken(token);
  //check if the command is a application command or a guild command
  try{
    rest.get(
      Routes.applicationCommands("1498658166861201488"),
    ).then(async (result) => {
      
      for (const command of result) {
        if(command.id.toString() === commandID.toString()){

      console.log(command)
      if (command) {
        await rest.delete(
          Routes.applicationCommand("1498658166861201488", commandID),
        );
        message.reply("Command removed")
        return
      } 
        rest.get(
          Routes.applicationGuildCommands("1498658166861201488", '1068608389128659026'),
        ).then(async (result) => {
          var command = result.find(c => c.id.toString() === commandID.toString());
          console.log(command)
          if (command) {
            await rest.delete(
              Routes.applicationGuildCommand("1498658166861201488", '1068608389128659026', commandID),
            );
            
            message.reply("Command removed")
            return
          }
        })
        return message.reply("Command not found")
      }}
      
    })
  }
  catch(error){
    console.error(error)
    message.reply(error)
  }
}

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  var IsEphemeral = true;
  if (interaction.options.getBoolean('show')) {
    IsEphemeral = false;
  }
  if ( interaction.commandName === "update-slash-commands") {
    if (!["582279365912559631","516691397126914079"].includes(interaction.user.id)) {
      await interaction.reply({content: 'You do not have permission to use this command.', ephemeral: true});
      return;
    }
    console.log('Updating slash commands')

     vars.db.init().then(async(result) => {
    vars.commands = result;
    console.log('Database loaded');
    vars.ModBD.initHelp().then(async(result) => {
      vars.ModCommands = result;
      console.log('Module Database loaded');
      await RegisterAllSlashCommands();
      await interaction.reply({content: 'Slash commands updated.', ephemeral: true});
      return;
    })
  })
   
  }

  if (interaction.commandName === "help" || interaction.commandName === "help2") {
    const moduleName = interaction.options.getString('module');
    await PreviewModuleCommand(interaction, moduleName, IsEphemeral);
    return;
  }
  if (interaction.commandName === "list-modules") {
    var fields = []
    const all_modules = vars.ModCommands.find(c => c.Trigger === "all modules");
    if (!all_modules) {
      console.error(`Command all modules not found in the database.`);
      interaction.reply(`Command all modules not found in the database.`)
      return;
    }
    if (all_modules.Field_1_Name != '' && all_modules.Field_1_Data != '' && all_modules.Field_1_Name != null && all_modules.Field_1_Data != null) {
      fields.push({name: all_modules.Field_1_Name, value: all_modules.Field_1_Data})
    }
    if (all_modules.Field_2_Name != '' && all_modules.Field_2_Data != '' && all_modules.Field_2_Name != null && all_modules.Field_2_Data != null) {
      fields.push({name: all_modules.Field_2_Name, value: all_modules.Field_2_Data})
    }
    if (all_modules.Field_3_Name != '' && all_modules.Field_3_Data != '' && all_modules.Field_3_Name != null && all_modules.Field_3_Data != null) {
      fields.push({name: all_modules.Field_3_Name, value: all_modules.Field_3_Data})
    }
    var embed = new EmbedBuilder()
      .setColor('#9efa73')
      .setTitle(all_modules.Title)
      .addFields(fields)
      .setFooter({text:all_modules.Footer})
      .setAuthor({name: "Somatic Steve", icon_url: "https://cdn.discordapp.com/app-icons/1498658166861201488/0ee1cba4b2a6f7034f1fe77fc948e43c.png",url:"https://discord.gg/Ku4nUbWWkS"})
    return interaction.reply({ embeds: [embed] });
  }



  ProcessMessage(interaction, IsEphemeral);

})

client.login(token);
