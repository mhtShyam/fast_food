import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type Authstate={
    isAuthenticated:boolean;
    user:User | null;
    isLoading:boolean;

    setIsAuthenticated:(value:boolean)=> void;
    setUser:(user:User | null)=> void;
    setIsLoading:(loading:boolean)=> void;

    fetchAuthenticatedUser:()=> Promise<void>;

}

const useAuthStore = create<Authstate>((set) => ({
 isAuthenticated:false,
 isLoading:true,
 user:null,

 setIsAuthenticated:(value)=> set({isAuthenticated:value}),
 setUser:(user)=> set({user}),
 setIsLoading:(value)=> set({isLoading:value}),
fetchAuthenticatedUser:async()=>{
    set({isLoading:true})
    try {
        const user = await getCurrentUser();
        if(user) set({isAuthenticated:true, user:user as unknown as User})
        else set({isAuthenticated:false, user:null})    
    } catch (e) {
        console.log("fetchAuthenticatedUser error", e);
        set({isAuthenticated:false, user:null});
    }finally{
        set({isLoading:false})
    }
}
}))


export default useAuthStore;

