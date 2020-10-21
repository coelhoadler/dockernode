let instance = null;

class ConfigurationManager {

    constructor() {
        this.ShippingCalculateUrl = '';
        this.MsShipping = '';
        this.MsOrder = '';
        this.MsProduct = '';
        this.MsDesk = '';
        this.MsWishlist = '';
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