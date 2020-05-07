import { PrismaClient } from '@prisma/client';
import * as admin from 'firebase-admin';

const prisma = new PrismaClient();
const serviceAccount = require('../ar-catalog-firebase.json');
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export interface Context {
    prisma: PrismaClient;
}

export const createContext = async ({
    req
}: {
    req: any;
}): Promise<Context> => {
    const token =
        req.headers.authorization ||
        'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4ODQ4YjVhZmYyZDUyMDEzMzFhNTQ3ZDE5MDZlNWFhZGY2NTEzYzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWl0YWxpIFRhbm1heSBQYXRlbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaS1xcTdSMnVILWx1SmxpU3BlLTVqOE91ZVF0SzVpUi1xaEZRdEhBZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hci1jYXRhbG9nLTEwMzI4IiwiYXVkIjoiYXItY2F0YWxvZy0xMDMyOCIsImF1dGhfdGltZSI6MTU4ODg0NjE5NywidXNlcl9pZCI6IjVMcXdjek50YzdjYTRZU25uM3JWNkVVMzI0MDIiLCJzdWIiOiI1THF3Y3pOdGM3Y2E0WVNubjNyVjZFVTMyNDAyIiwiaWF0IjoxNTg4ODQ2MTk3LCJleHAiOjE1ODg4NDk3OTcsImVtYWlsIjoibWl0YWxpa2h1bmRpd2FsYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODgwOTkwOTc2Nzg3OTExMDIzNiJdLCJlbWFpbCI6WyJtaXRhbGlraHVuZGl3YWxhQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.jwCBPveqM-jZ0ZNSh404zMeI4nAUOlHwmhZN-T0v1SD_43iswj4VWL2cW_LAcj03CuYyr8XG1z0fhO_0UzMf2YnLnDE3_wdZYgxW_1PuWAQRDY0Bo60P1KwD9zDwG-eDuEHOUswWD5VlYhGadYstp-27ow4ARREqE5F-dMGm7NhFJEWBtUfMEBKobSawdESNBD408I1rM0-4Ul-0H5GD3KxpYyeZGzZ71rPFLIMHX3hH4_WeJWl7EODT55jcYgUzbRgmMyZ1MkBbWlV4dp5aEuXXWNsl40cUT5dbAdqwd4ThVsF3AfMhRcpj-PA90lch8Wr48-UyGXWU403B3id3aQ';

    try {
        const result = await admin.auth().verifyIdToken(token, true);
        if (result) {
            const user = await prisma.user.findOne({
                where: {
                    userId: result.user_id
                }
            });
            if (!user) {
                await prisma.user.create({
                    data: {
                        displayName: result.name,
                        userId: result.user_id,
                        email: result.email,
                        picture: result.picture
                    }
                });
            }
            req.user = user;
        }
    } catch (e) {
        console.error(e);
    }

    return { prisma };
};
