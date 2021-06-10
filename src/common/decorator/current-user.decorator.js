"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
var common_1 = require("@nestjs/common");
exports.CurrentUser = common_1.createParamDecorator(function (data, input) {
    var req = input.args[0];
    var user = req.user;
    return user;
});
//# sourceMappingURL=current-user.decorator.js.map