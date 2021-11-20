"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentenceToLines = void 0;
var sentenceToLines = function (sentence, lineLength) {
    if (lineLength === void 0) { lineLength = 4; }
    var sentenceToWords = sentence.split(' ');
    var output = [];
    while (sentenceToWords.length > 0) {
        output.push(sentenceToWords.splice(0, lineLength));
    }
    return output.map(function (x) { return x.join(' '); });
};
exports.sentenceToLines = sentenceToLines;
