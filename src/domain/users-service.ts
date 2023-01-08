import {ObjectId} from "mongodb";
import {userType, userTypeOutput} from "../models/types";
import {usersRepository} from "../repositories/users-repository";

export const usersService = {

    async createUser(login: string, password: string, email: string): Promise<userTypeOutput> {
        const newUser: userType = {
            "_id": new ObjectId(),
            "login": login,
            "password": password,
            "email": email,
            "createdAt": new Date().toISOString()
        }
        const createdUser = await usersRepository.createUser(newUser)
        return createdUser
    },

    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },

    async deleteAllUsers(): Promise<boolean>{
        return await usersRepository.deleteAllUsers()
    }
}