"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("./Users");
var Role = /** @class */ (function () {
    function Role() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    ], Role.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('varchar', { name: 'rolename', length: 30 })
    ], Role.prototype, "rolename", void 0);
    __decorate([
        typeorm_1.Column('int', { name: 'auth_time' })
    ], Role.prototype, "authTime", void 0);
    __decorate([
        typeorm_1.Column('varchar', { name: 'auth_name', length: 30 })
    ], Role.prototype, "authName", void 0);
    __decorate([
        typeorm_1.Column('timestamp', {
            name: 'createAt',
            nullable: true,
            default: function () { return 'CURRENT_TIMESTAMP'; },
        })
    ], Role.prototype, "createAt", void 0);
    __decorate([
        typeorm_1.Column('timestamp', {
            name: 'updateAt',
            nullable: true,
            default: function () { return 'CURRENT_TIMESTAMP'; },
            onUpdate: 'CURRENT_TIMESTAMP',
        })
    ], Role.prototype, "updateAt", void 0);
    __decorate([
        typeorm_1.Column('simple-json', { name: 'menu', nullable: true })
    ], Role.prototype, "menu", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Users_1.Users; }, function (users) { return users.role; })
    ], Role.prototype, "users", void 0);
    Role = __decorate([
        typeorm_1.Entity('role', { schema: 'nest_admin' })
    ], Role);
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=Role.js.map