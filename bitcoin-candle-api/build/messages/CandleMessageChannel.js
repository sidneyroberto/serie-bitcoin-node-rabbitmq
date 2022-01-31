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
var amqplib_1 = require("amqplib");
var dotenv_1 = require("dotenv");
var socket_io_1 = require("socket.io");
var CandleController_1 = require("../controllers/CandleController");
(0, dotenv_1.config)();
var CandleMessageChannel = /** @class */ (function () {
    function CandleMessageChannel(server) {
        this._candleCtrl = new CandleController_1.default();
        this._io = new socket_io_1.Server(server, {
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ["GET", "POST"]
            }
        });
        this._io.on('connection', function () { return console.log('Web socket connection created'); });
    }
    CandleMessageChannel.prototype._createMessageChanel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, amqplib_1.connect)(process.env.AMQP_SERVER)];
                    case 1:
                        connection = _b.sent();
                        _a = this;
                        return [4 /*yield*/, connection.createChannel()];
                    case 2:
                        _a._channel = _b.sent();
                        this._channel.assertQueue(process.env.QUEUE_NAME);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log('Connection to RabbitMQ failed');
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CandleMessageChannel.prototype.consumeMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._createMessageChanel()];
                    case 1:
                        _a.sent();
                        if (this._channel) {
                            this._channel.consume(process.env.QUEUE_NAME, function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                var candleObj, candle;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            candleObj = JSON.parse(msg.content.toString());
                                            console.log('Message received');
                                            console.log(candleObj);
                                            this._channel.ack(msg);
                                            candle = candleObj;
                                            return [4 /*yield*/, this._candleCtrl.save(candle)];
                                        case 1:
                                            _a.sent();
                                            console.log('Candle saved to database');
                                            this._io.emit(process.env.SOCKET_EVENT_NAME, candle);
                                            console.log('New candle emited by web socket');
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            console.log('Candle consumer started');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CandleMessageChannel;
}());
exports.default = CandleMessageChannel;
//# sourceMappingURL=CandleMessageChannel.js.map