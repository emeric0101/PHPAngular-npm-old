import { Model } from "./AEntity";
import {Session } from "./Session";
export class User extends Model {
	protected name = "User";
  		private firstName :string;
		getFirstName() : string {
			return this.firstName;
		}
      setFirstName(v : string)  {
          this.setValue('firstName', v);
      }
  		private lastName :string;
		getLastName() : string {
			return this.lastName;
		}
      setLastName(v : string)  {
          this.setValue('lastName', v);
      }
  		private nickname :string;
		getNickname() : string {
			return this.nickname;
		}
      setNickname(v : string)  {
          this.setValue('nickname', v);
      }
  		private password :string;
		getPassword() : string {
			return this.password;
		}
      setPassword(v : string)  {
          this.setValue('password', v);
      }
  		private mail :string;
		getMail() : string {
			return this.mail;
		}
      setMail(v : string)  {
          this.setValue('mail', v);
      }
  		private sessions :Session = null;
		getSessions() : Session {
			return this.foreignKeys('sessions');
		}
      setSessions(v : Session[]) {
          this.setValue('sessions', v);
      }

}
