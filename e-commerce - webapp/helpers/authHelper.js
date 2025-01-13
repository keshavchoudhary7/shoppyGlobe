import becrypt from 'bcrypt';

export const hashPassword = async(pass)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await becrypt.hash(pass, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePasswords = async(inputPassword, hashedPassword) => {
    return becrypt.compare(inputPassword,hashedPassword)
}