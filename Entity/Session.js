"use strict";
const AEntity_1 = require("./AEntity");
class Session extends AEntity_1.Model {
    constructor(...args) {
        super(...args);
        this.name = "Session";
        this.user = null;
    }
    getDate() {
        return this.date;
    }
    setDate(v) {
        this.setValue('date', v);
    }
    getUser() {
        return this.foreignKey('user');
    }
    setUser(v) {
        this.setValue('user', v);
    }
    getSid() {
        return this.sid;
    }
    setSid(v) {
        this.setValue('sid', v);
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map