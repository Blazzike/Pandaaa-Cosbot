const { client } = require('../shard');
const mainDir = require('../../mainDir');
const config = require('../config');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'UpdateMessage',
    enable() {

        let package = JSON.parse(fs.readFileSync(`${mainDir}/package.json`, 'utf8'));
        let latestUpdateVersion = JSON.parse(fs.readFileSync(`${mainDir}/data/latestUpdate.json`, 'utf8'));
        let versionFileName = `v${package.versions}.update`;
    
        if(versionFileName !== latestUpdateVersion && fs.existsSync(`${mainDir}/data/updates/${versionFileName}`)) {

            let updateContent = fs.readFileSync(`${mainDir}/data/updates/${versionFileName}`, 'utf8');
            
            let updateMessage = new Discord.RichEmbed()
            .setColor(config.color)
            .setTitle('I got Updated! 🎉')
            .addField('Changes:', updateContent)
            .setFooter('Update Release')
            .setTimestamp(new Date());

            let guild = client.guilds.get('472885726275436556')
            let generalChannel = guild.channels.get('472885726984536065');

            return generalChannel.send(updateMessage);

        }

    }
};