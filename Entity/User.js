"use strict";
const AEntity_1 = require("./AEntity");
class User extends AEntity_1.Model {
    constructor(...args) {
        super(...args);
        this.name = "User";
        this.sessions = null;
    }
    getFirstName() {
        return this.firstName;
    }
    setFirstName(v) {
        this.setValue('firstName', v);
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(v) {
        this.setValue('lastName', v);
    }
    getNickname() {
        return this.nickname;
    }
    setNickname(v) {
        this.setValue('nickname', v);
    }
    getPassword() {
        return this.password;
    }
    setPassword(v) {
        this.setValue('password', v);
    }
    getMail() {
        return this.mail;
    }
    setMail(v) {
        this.setValue('mail', v);
    }
    getSessions() {
        return this.foreignKeys('sessions');
    }
    setSessions(v) {
        this.setValue('sessions', v);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map