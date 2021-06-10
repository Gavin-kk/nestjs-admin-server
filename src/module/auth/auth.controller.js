"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var current_user_decorator_1 = require("./current-user.decorator");
var AuthController = /** @class */ (function () {
    function AuthController(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    AuthController.prototype.register = function (RegisterDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.saveUser(RegisterDto)];
                    case 1:
                        user = _a.sent();
                        delete user.password;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthController.prototype.login = function (loginDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, token;
            return __generator(this, function (_a) {
                username = user.username, password = user.password;
                token = this.jwtService.sign({ username: username, password: password }, {
                    expiresIn: 60 * 60 * 24,
                });
                delete user.password;
                return [2 /*return*/, { user: user, token: token }];
            });
        });
    };
    AuthController.prototype.updateUser = function (updateDto, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.updateUser(updateDto, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthController.prototype.getUserList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.findAllUser()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthController.prototype.deleteUser = function (id) {
        return this.authService.removeUser(id);
    };
    AuthController.prototype.getUserInfo = function (user) {
        delete user.password;
        return user;
    };
    __decorate([
        common_1.Post('/register'),
        swagger_1.ApiOperation({ summary: '用户注册' }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "register", null);
    __decorate([
        common_1.Post('login'),
        swagger_1.ApiOperation({ summary: '登录' }),
        common_1.UseGuards(passport_1.AuthGuard('local')),
        __param(0, common_1.Body()), __param(1, current_user_decorator_1.CurrentUser())
    ], AuthController.prototype, "login", null);
    __decorate([
        common_1.Put('update:id'),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: '更新用户' }),
        common_1.UseGuards(passport_1.AuthGuard('jwt')),
        __param(0, common_1.Body()), __param(1, common_1.Param('id'))
    ], AuthController.prototype, "updateUser", null);
    __decorate([
        common_1.Get('userlist'),
        swagger_1.ApiOperation({ summary: '获取所有用户列表 必须登录' }),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(passport_1.AuthGuard('jwt'))
    ], AuthController.prototype, "getUserList", null);
    __decorate([
        common_1.Delete('user:id'),
        common_1.UseGuards(passport_1.AuthGuard('jwt')),
        swagger_1.ApiOperation({ summary: '删除用户 必须登录' }),
        swagger_1.ApiBearerAuth(),
        __param(0, common_1.Param('id'))
    ], AuthController.prototype, "deleteUser", null);
    __decorate([
        common_1.Get('userinfo'),
        swagger_1.ApiOperation({ summary: '当前用户信息' }),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(passport_1.AuthGuard('jwt')),
        __param(0, current_user_decorator_1.CurrentUser())
    ], AuthController.prototype, "getUserInfo", null);
    AuthController = __decorate([
        common_1.Controller('auth'),
        swagger_1.ApiTags('用户模块')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map