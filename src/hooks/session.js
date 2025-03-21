'use server'

import { cookies } from "next/headers";

export async function createSession(data) {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const token = data.token;
    const user = data.profile.user;

    const access = {
        id: user?.id,
        role: user?.role.id,
        username: user?.username
    }
    
    await cookies().set("token", token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
    
    await cookies().set("access", JSON.stringify(access), {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
}

export async function deleteSession() {
    await cookies().delete("token");
    await cookies().delete("access");
}
