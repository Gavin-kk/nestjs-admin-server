"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var Users_1 = require("../../entities/Users");
var RegisterDto = /** @class */ (function (_super) {
    __extends(RegisterDto, _super);
    function RegisterDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty({ description: '用户名' }),
        class_validator_1.IsNotEmpty({ message: '用户名不能为空' })
    ], RegisterDto.prototype, "username", void 0);
    __decorate([
        swagger_1.ApiProperty({ description: '密码' }),
        class_validator_1.IsNotEmpty({ message: '密码不得为空' })
    ], RegisterDto.prototype, "password", void 0);
    __decorate([
        swagger_1.ApiProperty({ description: '手机号' })
    ], RegisterDto.prototype, "phone", void 0);
    __decorate([
        swagger_1.ApiProperty({ description: 'email' })
    ], RegisterDto.prototype, "email", void 0);
    return RegisterDto;
}(Users_1.Users));
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map