import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from "nodemailer"

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const email = (req.body ?? {})?.email as string

  if (req.method !== "POST" || !email) return res.status(400).json({ message: "Error en el correo electronico" })

  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      pass: process.env.MAILER_PASSWORD,
      user: process.env.MAILER_EMAIL
    },
    secure: true
  })

  transporter.sendMail({
    from: email,
    to: process.env.MAILER_EMAIL,
    subject: process.env.MAILER_SUBJECT,
    text: req.body?.message ?? "No message"

  }, (err: any) => {
    return res.status(400).json({ message: "Error al enviar el corro" });
  })


}