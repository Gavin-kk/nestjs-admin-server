"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var Role_1 = require("./Role");
var bcryptjs_1 = require("bcryptjs");
var Users = /** @class */ (function () {
    function Users() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    ], Users.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('varchar', { name: 'username', unique: true, length: 30 })
    ], Users.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column('varchar', {
            name: 'password',
            length: 500,
            transformer: {
                to: function (value) {
                    return bcryptjs_1.hashSync(value);
                },
                from: function (value) {
                    return value;
                },
            },
        })
    ], Users.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column('int', { name: 'phone', nullable: true })
    ], Users.prototype, "phone", void 0);
    __decorate([
        typeorm_1.Column('varchar', { name: 'email', nullable: true, length: 50 })
    ], Users.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column('timestamp', {
            name: 'createAt',
            nullable: true,
            default: function () { return 'CURRENT_TIMESTAMP'; },
        })
    ], Users.prototype, "createAt", void 0);
    __decorate([
        typeorm_1.Column('timestamp', {
            name: 'updateAt',
            nullable: true,
            default: function () { return 'CURRENT_TIMESTAMP'; },
            onUpdate: 'CURRENT_TIMESTAMP',
        })
    ], Users.prototype, "updateAt", void 0);
    __decorate([
        typeorm_1.Column('int', { name: 'role_id', nullable: true })
    ], Users.prototype, "roleId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Role_1.Role; }, function (role) { return role.users; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
    ], Users.prototype, "role", void 0);
    Users = __decorate([
        typeorm_1.Index('IDX_fe0bb3f6520ee0469504521e71', ['username'], { unique: true }),
        typeorm_1.Index('role_id', ['roleId'], {}),
        typeorm_1.Index('username', ['username'], { unique: true }),
        typeorm_1.Entity('users', { schema: 'nest_admin' })
    ], Users);
    return Users;
}());
exports.Users = Users;
//# sourceMappingURL=Users.js.map