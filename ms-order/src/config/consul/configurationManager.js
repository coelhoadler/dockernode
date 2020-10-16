let instance = null;

class ConfigurationManager {

    constructor() {
        this.UrlConsultaCEP = "";
        this.registerStatus = 0;
    }

    updateConfig(key, value){
        this[key] = value;
    }

    static getInstance() {
        if (!instance) {
            instance = new ConfigurationManager()
        }
        if (instance.registered == 0) {
            instance.register();
        }
        return instance
    }
}

module.exports = ConfigurationManager.getInstance();