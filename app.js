"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const path_1 = __importDefault(require("path"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const options = {};
function default_1(fastify, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        // Place here your custom code!
        // Do not touch the following lines
        // This loads all plugins defined in plugins
        // those should be support plugins that are reused
        // through your application
        fastify.register(autoload_1.default, {
            dir: path_1.default.join(__dirname, 'plugins'),
            options: Object.assign({}, opts)
        });
        // This loads all plugins defined in routes
        // define your routes in one of these
        fastify.register(autoload_1.default, {
            dir: path_1.default.join(__dirname, 'routes'),
            options: Object.assign({}, opts)
        });
    });
}
module.exports.options = options;
