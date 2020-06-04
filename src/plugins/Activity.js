const { client } = require('../shard');
const mainDir = require('../../mainDir');
const fs = require('fs');

module.exports = {
    name: 'Activity',
    enable() {
        let package = JSON.parse(fs.readFileSync(`${mainDir}/package.json`, 'utf8'));
        client.user.setActivity(`Trap Cosmos | v${package.version}`, {
            'type': 'WATCHING'
        });
    }
};