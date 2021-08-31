"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const axios_1 = require("axios");
exports.api = axios_1.default.create({
    baseURL: 'http://www.omdbapi.com/',
});
//# sourceMappingURL=api.js.map