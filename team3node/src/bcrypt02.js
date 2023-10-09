import bcrypt from "bcryptjs"

const hash='$2a$10$rATtJYrX28PRrGk9caSoCuWLYI.DiRjLKJeMBmt51BLWHt4.lF9vy';

const result =await bcrypt.compare("123456",hash);

console.log({result});