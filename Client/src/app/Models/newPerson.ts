import { address } from './Address';

export interface newPerson  {
    avatarId: number;
    userName: string;
    email: string;
    age: number;
    dateOfBirth: Date;
    gender: string;
    phoneNumber: string;
    roles:any[]
    addresses: address[];
}