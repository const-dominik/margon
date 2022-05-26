import { Document } from "mongoose";

export class User extends Document {
    id: number;
    charId: number;
    nickname: string;
    lvl: number;
    lastDead: Date;
    deads: number[]
}