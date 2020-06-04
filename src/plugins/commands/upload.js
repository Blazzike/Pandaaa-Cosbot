const { client } = require('../../shard');

module.exports = {
    name: 'UploadCommand',
    depends: ['Commands'],
    commands: {
        ping: {
            description: 'Gives you the Upload Notifications role!',
            category: 'Utility',
            async exec(label, args, msg) {

                let guild = client.guilds.get('472885726275436556');
                let member = guild.member(msg.author);
                let role = guild.roles.get('718069501119168603');

                if(member.roles.has(role.id)) {
                    await member.removeRole(role);
                    return `${msg.author}, you no longer have the ${role.name} role!`
                } else {
                    await member.addRole(role);
                    return `${msg.author}, you now have the ${role.name} role!`
                }
            }
        }
    }
};