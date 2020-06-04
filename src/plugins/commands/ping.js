const { client } = require('../../shard');

module.exports = {
    name: 'PingCommand',
    depends: ['Commands'],
    commands: {
        ping: {
            description: 'Pong!',
            category: 'Fun',
            exec() {
                return `${client.ping}ms`;
            }
        }
    }
};