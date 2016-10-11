
			import { Model } from "../Entity/AEntity";
			import { RepositoryService } from "./repository.service";
			import { Session } from "../Entity/Session"
import { Test } from "../Entity/Test"
import { User } from "../Entity/User"

            export class EntityFactory {
				public constructor(private $repo : RepositoryService) {}

				public create(entity : string) : Model
				{
					var created;
					switch (entity)
					{		case "Session" :
							created = new Session(this.$repo);
					case "Test" :
							created = new Test(this.$repo);
					case "User" :
							created = new User(this.$repo);
			
					}
					return created;
				}
        	}