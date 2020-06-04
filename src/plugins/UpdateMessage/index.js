const { client } = require('../../shard');
const config = require('../../config');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'UpdateMessage',
    enable() {

        let package = require('../../../package.json');

        let latestUpdateVersionFile = `${__dirname}/latestUpdate.json`;

        if(!fs.existsSync(latestUpdateVersionFile)) {
            fs.appendFileSync(latestUpdateVersionFile, '""');
        }

        let latestUpdateVersion = JSON.parse(fs.readFileSync(`${__dirname}/latestUpdate.json`, 'utf8'));
        let versionFileName = `v${package.versions}.update`;
    
        if(versionFileName !== latestUpdateVersion && fs.existsSync(`${__dirname}/updates/${versionFileName}`)) {

            let updateContent = fs.readFileSync(`${__dirname}/updates/${versionFileName}`, 'utf8');
            
            let updateMessage = new Discord.RichEmbed()
            .setColor(config.color)
            .setTitle('I got Updated! 🎉')
            .addField('Changes:', updateContent)
            .setFooter('Update Release')
            .setTimestamp(new Date());

            let guild = client.guilds.get('472885726275436556')
            let generalChannel = guild.channels.get('472885726984536065');

            generalChannel.send(updateMessage);

            fs.writeFileSync(`${__dirname}/latestUpdate.json`, JSON.stringify(versionFileName));

        }

    }
};