import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDb()

export default async (req, res) => {
    const { email, password } = req.body
    try {
        // 1) check to see if a user exists with the provided email
        const user = await User.findOne({ email }).select('+password')
        // 2) -- if not, return error
        if (!user) {
            return res.status(404).send("Uživatel s tímto emailem neexistuje")
        }
        // 3) check to see if users' password matches the one in db
        const passwordMatch = await bcrypt.compare(password, user.password)
        // 4) if so, generate a token
        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            // 5) send that token to the client
            res.status(200).json(token)
        } else {
            res.status(401).send("Zadaná hesla se neshodují")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Došlo k chybě při ověřování uživatele")
    }
}