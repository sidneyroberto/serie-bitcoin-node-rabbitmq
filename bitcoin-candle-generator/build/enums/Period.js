"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Period;
(function (Period) {
    Period[Period["TEN_SECONDS"] = 10000] = "TEN_SECONDS";
    Period[Period["THIRTY_SECONDS"] = 30000] = "THIRTY_SECONDS";
    Period[Period["ONE_MINUTE"] = 60000] = "ONE_MINUTE";
    Period[Period["FIVE_MINUTES"] = 300000] = "FIVE_MINUTES";
    Period[Period["TEN_MINUTES"] = 600000] = "TEN_MINUTES";
    Period[Period["HALF_HOUR"] = 1800000] = "HALF_HOUR";
    Period[Period["HOUR"] = 3600000] = "HOUR";
    Period[Period["DAY"] = 86400000] = "DAY";
})(Period || (Period = {}));
exports.default = Period;
