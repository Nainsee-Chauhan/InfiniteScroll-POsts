import bcrypt from 'bcrypt'

//function for hash
export const hashPassword = async(password) => {
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

//function for comparing and decrypting
export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}