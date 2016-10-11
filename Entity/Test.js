"use strict";
const AEntity_1 = require("./AEntity");
class Test extends AEntity_1.Model {
    constructor(...args) {
        super(...args);
        this.name = "Test";
    }
    getContent() {
        return this.content;
    }
    setContent(v) {
        this.setValue('content', v);
    }
}
exports.Test = Test;
//# sourceMappingURL=Test.js.map