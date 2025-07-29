import { Redirect, Slot } from "expo-router";
import React from 'react';

export default function _Layout() {
    const isAuthentication = false;
    if(isAuthentication) return <Redirect href="/sign-in"/>
    return <Slot/>

}
