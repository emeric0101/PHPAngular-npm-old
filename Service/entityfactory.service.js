"use strict";
const Session_1 = require("../Entity/Session");
const Test_1 = require("../Entity/Test");
const User_1 = require("../Entity/User");
class EntityFactory {
    constructor($repo) {
        this.$repo = $repo;
    }
    create(entity) {
        var created;
        switch (entity) {
            case "Session":
                created = new Session_1.Session(this.$repo);
            case "Test":
                created = new Test_1.Test(this.$repo);
            case "User":
                created = new User_1.User(this.$repo);
        }
        return created;
    }
}
exports.EntityFactory = EntityFactory;
//# sourceMappingURL=entityfactory.service.js.map