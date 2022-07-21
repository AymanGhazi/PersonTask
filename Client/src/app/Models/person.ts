import { address } from "./Address";

export interface Person {
    id: number;
    avatarId: number;
    userName: string;
    age: number;
    dateOfBirth: string;
    created: string;
    gender: string;
    phoneNumber: string;
    adresses: address[];
}