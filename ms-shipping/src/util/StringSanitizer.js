module.exports = {
    SanitizeZipCode(zipCode) {
        if (zipCode)
            return zipCode.replace(/[^\d]/gi, '');
        else
            return '';
    }
}