import { Model } from "./AEntity";
export class Test extends Model {
	protected name = "Test";
  		private content :string;
		getContent() : string {
			return this.content;
		}
      setContent(v : string)  {
          this.setValue('content', v);
      }

}
