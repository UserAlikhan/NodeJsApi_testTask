import bcrypt from 'bcryptjs';

// Middleware Method that hashes the password
export const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        req.body.password = hashedPassword
        next() 
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password', error: error.message });
    }
}