import { CreateUserParams, SignInParams } from "@/type";
import { router } from "expo-router";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform:"com.uspm.fastfood",
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:"68885062001239ff7b65",
    userCollectionId:"688850850002bda6ae31"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async({name, email, password}:CreateUserParams)=>{
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw Error;

        await signIn({email, password});
        const avaterUrl = avatars.getInitialsURL(name);
        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId:newAccount.$id,
            name, email, password,
            avatar:avaterUrl
        })
    return newUser;
    } catch (e) {
        throw new Error(e as string)
    }
}

export const signIn = async({email, password}:SignInParams)=>{
    try {
        const session = await account.createEmailPasswordSession(email, password);
        if(!session) throw Error;
        
        router.push('/')
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCurrentUser = async()=>{
    try {
      const currentAccount = await account.get();
      if(!currentAccount) throw Error;

      const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId,[
        Query.equal('accountId', currentAccount.$id)
      ])

      if(!currentUser) throw Error;

      return currentUser.documents[0];
    } catch (e) {
        throw new Error(e as string)
    }
}
