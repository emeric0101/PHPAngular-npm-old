import { EntityManager } from './entity.manager.service';
import { Test } from '../Entity/Test';
import { TestBed } from '@angular/core/testing';

describe('entity.manager.test', () => {
    var entityManager;
    beforeEach(() => {
        entityManager = new EntityManager(null, null, null);
    });

    it('persists', () => {
        let obj = new Test("test");
        let objs = entityManager.getPersistObjs();
        expect(objs).toEqual([]);
        entityManager.persist(obj);
        objs = entityManager.getPersistObjs();
        expect(objs).toEqual([obj]);
    });
});
