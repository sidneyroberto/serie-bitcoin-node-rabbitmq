"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CandleColor_1 = __importDefault(require("../enums/CandleColor"));
var Candle = /** @class */ (function () {
    function Candle(currency, initialDateTime) {
        this.currency = currency;
        this.low = Infinity;
        this.high = 0;
        this.close = 0;
        this.open = 0;
        this.values = [];
        this.color = CandleColor_1.default.UNDETERMINED;
    }
    Candle.prototype.addValue = function (value) {
        this.values.push(value);
        if (this.values.length == 1) {
            this.open = value;
        }
        if (this.low > value) {
            this.low = value;
        }
        if (this.high < value) {
            this.high = value;
        }
    };
    Candle.prototype.closeCandle = function () {
        if (this.values.length > 0) {
            this.close = this.values[this.values.length - 1];
            this.finalDateTime = new Date();
            if (this.open > this.close) {
                this.color = CandleColor_1.default.RED;
            }
            else if (this.close > this.open) {
                this.color = CandleColor_1.default.GREEN;
            }
        }
    };
    Candle.prototype.toSimpleObject = function () {
        var _a = this, values = _a.values, obj = __rest(_a, ["values"]);
        return obj;
    };
    return Candle;
}());
exports.default = Candle;
