function catchErrors(error, displayError) {
    let errorMsg;
    if (error.response) {
        // the request was made and the server has status of not in the 200's
        errorMsg = error.response.data;
        console.error("Error response", errorMsg);
        // For Cloudinary image Upload Errors
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message;
        }
    } else if (error.request) {
        // req was matchMedia, but no response
        errorMsg = error.request;
        console.error("Error Request", errorMsg);
    } else {
        // Something Else Happened that caused an error
        errorMsg = error.message;
        console.error("Error message", errorMsg);
    }
    displayError(errorMsg);
}

export default catchErrors