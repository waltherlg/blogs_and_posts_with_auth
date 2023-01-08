import {client} from "./db";
import {ObjectId} from "mongodb";
import {userType} from "../models/types";
import {userTypeOutput} from "../models/types";

export const userCollection = client.db("blogsAndPosts").collection<userType>("users")

export const usersRepository = {

    async createUser(newUser: userType): Promise<userTypeOutput> {
        const result = await userCollection.insertOne(newUser)
        let createdUser = {
            id: newUser._id.toString(),
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
        return createdUser
    },

    async deleteUser(id: string): Promise<boolean>{
        if (ObjectId.isValid(id)){
            let _id = new ObjectId(id)
            const result = await userCollection.deleteOne({_id: _id})
            return result.deletedCount === 1
        }
        else return false
    }


}