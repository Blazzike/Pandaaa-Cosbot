const PluginUtil = require('../../util/plugin');
const { RichEmbed } = require('discord.js');
const config = require('../../config');

const HelpCommand = {
    name: 'help',
    depends: ['Commands'],
    config: {
        themeColor: config.color
    },
    commands: {
        help: {
            aliases: ['commands'],
            description: 'This message.',
            category: 'Useful',
            exec(label, args, msg) {
                let categories = {};
                Object.values(PluginUtil.plugins).forEach((plugin) => {
                    if(!plugin.hasOwnProperty('commands')) {
                        return;
                    }

                    let commands = plugin.commands;
                    Object.keys(commands).forEach((label) => {
                        let cmd = commands[label];
                        if(cmd.hasOwnProperty('hidden') && cmd.hidden) {
                            return;
                        }

                        if(!categories.hasOwnProperty(cmd.category)) {
                            categories[cmd.category] = '';
                        }

                        categories[cmd.category] += `${PluginUtil.plugins.Commands.config.commandPrefix}${label}${cmd.hasOwnProperty('includeAliasesInHelp') && cmd.includeAliasesInHelp ? `, ${cmd.aliases.join(', ')}` : ''} ${cmd.hasOwnProperty('parameters') ? `*${cmd.parameters.join(' ')}* ` : ''}**${cmd.description}**\n`;
                    });
                });

                let response = '';
                Object.keys(categories).forEach((category) => {
                    response += `__**${category}**__\n${categories[category]}\n`;
                });

                msg.channel.send(new RichEmbed()
                .setTitle(config.name + ' Commands')
                .setColor(HelpCommand.config.themeColor)
                .setDescription(response.substr(0, response.length - 1)));
            }
        }
    }
};

module.exports = HelpCommand;