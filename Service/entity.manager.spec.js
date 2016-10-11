"use strict";
const entity_manager_service_1 = require('./entity.manager.service');
const Test_1 = require('../Entity/Test');
describe('entity.manager.test', () => {
    var entityManager;
    beforeEach(() => {
        entityManager = new entity_manager_service_1.EntityManager(null, null, null);
    });
    it('persists', () => {
        let obj = new Test_1.Test(null);
        let objs = entityManager.getPersistObjs();
        expect(objs).toEqual([]);
        entityManager.persist(obj);
        objs = entityManager.getPersistObjs();
        expect(objs).toEqual([obj]);
    });
});
//# sourceMappingURL=entity.manager.spec.js.map