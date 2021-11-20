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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLines = exports.textWithBackground = exports.generateText = void 0;
var text_to_svg_1 = __importDefault(require("text-to-svg"));
var sharp_1 = __importDefault(require("sharp"));
var textOps_1 = require("./textOps");
var color_1 = __importDefault(require("color"));
var poppins = require.resolve('@fontsource/poppins/files/poppins-all-700-normal.woff');
var SVG_TEXT_OPTS = {
    svgHeight: 60,
    wordsPerLine: 3,
    backgroundPadding: {
        vertical: 15,
        horizontal: 20
    },
    color: 'black',
    _originalFontSize: 72,
    backgroundColor: 'white'
};
var generateText = function (articleTitle) { return __awaiter(void 0, void 0, void 0, function () {
    var backgroundColor, textToSVG, textToSVGOptions, textForSVG, svgText, svgTextSharp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                backgroundColor = (0, color_1.default)(SVG_TEXT_OPTS.backgroundColor);
                textToSVG = text_to_svg_1.default.loadSync(poppins);
                textToSVGOptions = {
                    x: 0,
                    y: 0,
                    fontSize: SVG_TEXT_OPTS._originalFontSize,
                    anchor: 'top',
                    attributes: {
                        fill: SVG_TEXT_OPTS.color
                    }
                };
                textForSVG = String.prototype.toUpperCase.apply(articleTitle);
                svgText = textToSVG.getSVG(textForSVG, textToSVGOptions);
                return [4 /*yield*/, (0, sharp_1.default)(Buffer.from(svgText))
                        .resize({ height: SVG_TEXT_OPTS.svgHeight, fit: 'contain' })
                        .toBuffer({ resolveWithObject: true })];
            case 1:
                svgTextSharp = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)({
                        create: {
                            channels: 4,
                            height: svgTextSharp.info.height + SVG_TEXT_OPTS.backgroundPadding.vertical,
                            width: svgTextSharp.info.width + SVG_TEXT_OPTS.backgroundPadding.horizontal,
                            background: {
                                r: backgroundColor.red(),
                                g: backgroundColor.green(),
                                b: backgroundColor.blue(),
                                alpha: backgroundColor.alpha()
                            }
                        }
                    })
                        .composite([{
                            input: svgTextSharp.data
                        }])
                        .png()
                        .toBuffer({ resolveWithObject: true })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.generateText = generateText;
var textWithBackground = function (articleTitle) { return __awaiter(void 0, void 0, void 0, function () {
    var lines, toRender;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lines = (0, textOps_1.sentenceToLines)(articleTitle, SVG_TEXT_OPTS.wordsPerLine);
                toRender = lines.map(function (line) { return generateText(line); });
                return [4 /*yield*/, Promise.all(toRender)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.textWithBackground = textWithBackground;
var createLines = function (articleTitle, thumbnailOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var textGraphics;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, textWithBackground(articleTitle)];
            case 1:
                textGraphics = _a.sent();
                return [2 /*return*/, textGraphics.map(function (textSharp, index) {
                        var lineHeight = index * (textSharp.info.height * 0.8);
                        var widthCenter = Math.round((thumbnailOptions.width - textSharp.info.width) / 2);
                        var heightCenter = (thumbnailOptions.height / 2) - ((textSharp.info.height * textGraphics.length) / 2);
                        return {
                            input: textSharp.data,
                            top: Math.round(heightCenter + lineHeight),
                            left: widthCenter
                        };
                    })];
        }
    });
}); };
exports.createLines = createLines;
