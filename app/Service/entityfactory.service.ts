import { Injectable }  from '@angular/core';
import { Model } from '../Entity/AEntity';
import { Test } from '../Entity/Test';

@Injectable()
export class EntityFactory {

    public create(entity : string) : Model {
        switch (entity) {
            case 'Test':
            return new Test(entity);
        }
        return null;
    }
}
