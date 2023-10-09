import jsonwebtokenwt from "jsonwebtoken";

const SECRET ="123456789"

const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJqb2huIiwiaWF0IjoxNjk1MDkwNDc3fQ.SaXZkvJ0k1USpAy52KSDvk9-_owgsXQxTHTPkGRFpLQ'

const payload=jsonwebtokenwt.verify(token,SECRET)

console.log({payload})

//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJqb2huIiwiaWF0IjoxNjk1MDkwNDc3fQ.SaXZkvJ0k1USpAy52KSDvk9-_owgsXQxTHTPkGRFpLQ'