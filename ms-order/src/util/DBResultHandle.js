const defaultOnSuccess = (results, fields) => {
    return res.status(200).json({
        length: results.length,
        product: results[0]
    });
}

const defaultOnErrorHandle = (error) => {
    return res.status(500).json({
        error
    });
}

const defaultOnNotFound = (results, fields) => {
    return res.status(404).json({
        message: `Resource was not found.`
    });
}

module.exports = (onSuccess, onError, onNotFound) => {

    let Success = onSuccess || defaultOnSuccess;
    let Error = onError || defaultOnErrorHandle;
    let NotFound = onNotFound || defaultOnNotFound;

    if (error) {
        Error(error);
    } else {
        if (results.length > 0) {
            Success(results, fields);
        } else {
            NotFound(results, fields);
        }
    }
}