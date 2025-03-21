"use server"

import { createSession, deleteSession } from "@/hooks/session";
import { redirect } from "next/navigation";

export async function login(data) {
    await createSession(data);  
    redirect("/dashboard");  
}


// call this function to sign out logged in user
export async function logout() {
    await deleteSession();
    redirect("/");  
}