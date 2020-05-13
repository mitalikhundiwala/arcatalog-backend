import { PrismaClient } from '@prisma/client';
import admin from './lib/firebase';
import UserService from './services/user';

const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
    req: any;
}

export const createContext = async ({
    req
}: {
    req: any;
}): Promise<Context> => {
    const token = req.headers.authorization || null;

    try {
        const result = await admin.auth().verifyIdToken(token, true);
        console.log(result);
        if (result) {
            const user = await prisma.user.findOne({
                where: {
                    userId: result.user_id
                }
            });
            console.log(user);
            if (!user) {
                await UserService.createUser(result);
            }
            req.user = user;
        }
    } catch (e) {
        console.error(e);
    }

    return { prisma, req };
};
