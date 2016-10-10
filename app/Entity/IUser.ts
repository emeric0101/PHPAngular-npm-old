import { Model } from './AEntity';


export interface IUser extends Model {
    getMail();

    setMail(m : string);
}
