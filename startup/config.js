const config = require('config');

module.exports = function(){
    if(!config.get('jwtprivateKey')){
        throw new Error('Fatal Error: jwtprivatekey is not defined');
    }
}