import conf from "../cong/conf";

import { Client, Account, ID } from "appwrite";

export class AuthServie {
    client= new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }


    // SignUp method
    async createAccount({email, passWord, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, passWord, name);

            if (userAccount) {
                //if account is created then call login method here 
                return this.login({email, passWord});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    //SignIn method
    async login({email, passWord}){
        try {
            return await this.account.createEmailSession(email, passWord);
        } catch (error) {
            throw error;
        }
    }

    //check if user is logged in or not, getCurrentUser method
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error- ", error);
        }

        return null;
    }

    //logout method
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: LogOut :: error- ", error);
        }
    }
}

const authService = new AuthServie();

export default authService;
