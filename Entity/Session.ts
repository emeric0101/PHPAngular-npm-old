import { Model } from "./AEntity";
import {IUser } from "./IUser";
export class Session extends Model {
	protected name = "Session";
  		private date :any;
		getDate() : any {
			return this.date;
		}
      setDate(v : any)  {
          this.setValue('date', v);
      }
  		private user :IUser = null;
		getUser() : IUser {
			return this.foreignKey('user');
		}
      setUser(v : IUser) {
          this.setValue('user', v);
      }
  		private sid :string;
		getSid() : string {
			return this.sid;
		}
      setSid(v : string)  {
          this.setValue('sid', v);
      }

}
