export interface User {
    uid: string,
    email?: string,
    photoURL?: string,
    displayName?: string,
    settings?:string,
    location?:{},
    lastLoginAt?: any,
    profileURL?: string
}
