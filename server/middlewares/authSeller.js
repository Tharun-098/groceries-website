import jwt from 'jsonwebtoken'
const authorizationSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies
    if (!sellerToken) {
        return res.json({ success: false, message: "Not Authorized" })
    }
    try {
        const decodeToken = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if (decodeToken.email == process.env.SELLER_EMAIL) {
            next()
        }
        else {
            return res.json({ success: false, message: "Not Authorized" })
        }
    }
    catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}

export default authorizationSeller