import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm]=useState({name:"",email:"", password:""})

    const submit = async()=>{
        const {name, email, password} = form;
        if(!name || !password || !email) return Alert.alert("Error", "Please enter valid name, email & password");
        setIsSubmitting(true);
        try {
            //Call appwriter sign up 
            await createUser({name, email, password});
           router.replace('/')
        } catch (error:any) {
            Alert.alert("Error", error.message)
        }finally{
            setIsSubmitting(false)
        }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5'>
            <CustomInput 
                placeholder="Enter your name"
                value={form.name}
                onChangeText={(text)=> {setForm((prev)=>({...prev, name:text}))}}
                label="Name"
                />
            <CustomInput 
                placeholder="Enter email address"
                value={form.email}
                onChangeText={(text)=> {setForm((prev)=>({...prev, email:text}))}}
                label="Email"
                keyboardType='email-address'
                />
                <CustomInput 
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text)=> {setForm((prev)=>({...prev, password:text}))}}
                label="Password"
                secureTextEntry={true}
                />
            <CustomButton isLoading={isSubmitting} title='Sign Up' onPress={submit}/>
            <View className='flex flex-row justify-center mt-5 gap-2'>
                <Text className='base-regular text-gray-100'>Already have an account?</Text>
                <Link href="/sign-in" className='base-bold text-primary'>Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp
