"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    currency: { type: String, required: true },
    finalDateTime: { type: Date, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    color: { type: String, required: true }
});
exports.CandleModel = (0, mongoose_1.model)('Candle', schema);
//# sourceMappingURL=CandleModel.js.map