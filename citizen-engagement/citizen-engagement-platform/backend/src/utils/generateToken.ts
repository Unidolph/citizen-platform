import jwt, { Secret } from "jsonwebtoken"

export const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET as Secret,  // 👈 cast to Secret
    { expiresIn: "30d" }               // 👈 valid SignOptions
  )
}
export default generateToken    