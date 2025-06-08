import crypto from "crypto"

const {PERSISTENCE} = process.env

class ProductsDTO{
    constructor(data){
        if(PERSISTENCE !== "mongo"){
            this._id = crypto.randomBytes(12).toString("hex")
        }
        this.title = data.title
        this.description = data.description
        this.category = data.category || "Uncategorized"
        this.artist = data.artist
        this.image = data.image || "https://www.pexels.com/es-es/foto/disco-cd-disco-compacto-de-cerca-5473308/"
        this.price = data.price
        this.code = data.code
        this.stock = data.stock || 0
        this.onsale = data.onsale
        this.owner_id = data.owner_id || crypto.randomBytes(12).toString("hex")
        if(PERSISTENCE !== "mongo"){
            this.createdAt = new Date()
            this.updatedAt = new Date()
        }
    }
}

export default ProductsDTO