const { client } = require('../shard');
const fs = require('fs');

module.exports = {
    name: 'Activity',
    enable() {
        let package = require('../../package.json');
        client.user.setActivity(`Trap Cosmos | v${package.version}`, {
            'type': 'WATCHING'
        });
    }
};