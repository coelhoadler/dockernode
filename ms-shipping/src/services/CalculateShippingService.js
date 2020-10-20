module.exports = {
    calculateByState(state) {
        let value = 99;
        switch (state) {
            case "RO":
                value = 30.0;
                break;
            case "AC":
                value = 50.0;
                break;
            case "AM":
                value = 45.0;
                break;
            case "RR":
                value = 42.0;
                break;
            case "PA":
                value = 35.0;
                break;
            case "AP":
                value = 37.0;
                break;
            case "TO":
                value = 31.0;
                break;
            case "MA":
                value = 29.0;
                break;
            case "PI":
                value = 25.0;
                break;
            case "CE":
                value = 36.0;
                break;
            case "RN":
                value = 33.0;
                break;
            case "PB":
                value = 24.0;
                break;
            case "PE":
                value = 22.0;
                break;
            case "AL":
                value = 28.0;
                break;
            case "SE":
                value = 41.0;
                break;
            case "BA":
                value = 30.0;
                break;
            case "MG":
                value = 12.0;
                break;
            case "ES":
                value = 15.0;
                break;
            case "RJ":
                value = 75.0;
                break;
            case "SP":
                value = 10.0;
                break;
            case "PR":
                value = 10.0;
                break;
            case "SC":
                value = 17.0;
                break;
            case "RS":
                value = 29.0;
                break;
            case "MS":
                value = 24.0;
                break;
            case "MT":
                value = 24.0;
                break;
            case "GO":
                value = 20.0;
                break;
            case "DF":
                value = 1000.0;
                break;
            default:
                value = 99;
                break;
        }
        return value;

    }
}