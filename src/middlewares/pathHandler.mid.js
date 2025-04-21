const pathHandler = (req,res,next) => {
    const error = "Not Found URL"
    const {method,originalURL:URL} = req
    res.status(404).json({error,method,URL})
}

export default pathHandler