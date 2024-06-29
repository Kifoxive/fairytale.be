import nodemailer, { type TransportOptions } from "nodemailer";
import path from "path";
import { IReservation } from "./../reservation/reservation.dtos";

import { reservationEmail } from "../templates";

const transportOptions = {
  host: process.env.SMTP_HOST,
  service: process.env.SMTP_SERVICE,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
} as TransportOptions;

export function sendConfirmationEmailService(to: string, link: string) {
  try {
    let transporter = nodemailer.createTransport(transportOptions);
    const mail_configs = {
      from: process.env.SMTP_USER,
      to,
      subject: `Activation on the ${process.env.FE_URL}`,
      text: "Activation",
      html: `
            <div>
              <h1>Follow the link for activation</h1>
              <a href="${link}">${link}</a>
            </div>
          `,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mail_configs, (error, info) => {
        if (error) {
          console.log(error);
          return reject({ message: "An error has occured" });
        }
        return resolve({ message: "Email sent successfully" });
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export function sendReservationStatusEmailService(reservation: IReservation) {
  try {
    let transporter = nodemailer.createTransport(transportOptions);

    const reservationEmailTemplate = reservationEmail(reservation);

    const mail_configs = {
      from: process.env.SMTP_USER,
      to: reservation.email,
      subject: `Reservation confirmation`,
      // text: "Reservation",
      html: reservationEmailTemplate,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mail_configs, (error, info) => {
        if (error) {
          console.log(error);
          return reject({ message: "An error has occured" });
        }
        return resolve({ message: "Email sent successfully" });
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
