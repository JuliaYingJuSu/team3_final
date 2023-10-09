import bcrypt from "bcryptjs"

const pass="123456";

const hash =await bcrypt.hash(pass,10);

console.log({hash});