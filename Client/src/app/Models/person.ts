import { address } from "./Address";

export interface Person {
    id: number;
    avatarId: number;
    userName: string;
    email: string;
    age: number;
    dateOfBirth: Date;
    created: Date;
    gender: string;
    phoneNumber: string;
    addresses: address[];
    roles:string[]|any[]
    token:string
}