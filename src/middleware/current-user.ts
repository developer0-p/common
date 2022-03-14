import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}
// Augment type definition req with currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('sesion: ' + req.session?.jwt)
  console.log('localstorage' + localStorage.getItem('userInfo'))
  if (localStorage.getItem('userInfo')) {
    console.log('hay cookie en el navegador')
  } else if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as UserPayload
    req.currentUser = payload
  } catch (error) {
    console.log(error)
  }
  next()
}
