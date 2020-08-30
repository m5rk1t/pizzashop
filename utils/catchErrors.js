function catchErrors(error, displayError) {
    let errorMsg;
    if (error.response) {
        errorMsg = error.response.data
        console.error("Došlo k chybě při odesílání odpovědi", errorMsg)

        // for Cloudinary image response
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message
        }
    } else if (error.request) {
        errorMsg = error.request
        console.error("Došlo k chybě při odesílání požadavku", errorMsg)
    }
    else {
        errorMsg = error.message
        console.error("Chybová zpráva", errorMsg) 
    }
    displayError(errorMsg)
}

export default catchErrors