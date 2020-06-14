import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserService {
    static async createUser(user: any): Promise<any> {
        return await prisma.user.create({
            data: {
                displayName: user.name,
                userId: user.user_id,
                email: user.email,
                picture: user.picture
            }
        });
    }
}
