const {client} = require('../shard');

module.exports = {
    name: 'Activity',
    enable() {
        let package = JSON.parse(fs.readFileSync(`${mainDir}/package.json`, 'utf8'));
        client.user.setActivity(`Trap Cosmos`, {
            'type': 'WATCHING'
        });
    }
};