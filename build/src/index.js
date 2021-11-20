"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildThumbnail = void 0;
var sharp_1 = __importDefault(require("sharp"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var generateText_1 = require("./generateText");
var color_1 = __importDefault(require("color"));
var logoSVG = fs.readFileSync(path.join(__dirname, './assets/logo.svg'));
var stopWatchSVG = fs.readFileSync(path.join(__dirname, './assets/stopwatch/stopwatch.svg'));
var plusSVG = fs.readFileSync(path.join(__dirname, './assets/stopwatch/plus.svg'));
var waveSVG = fs.readFileSync(path.join(__dirname, './assets/wave.svg'));
var THUMBNAIL_OPTS = {
    width: 850,
    height: 560,
    overlayColor: '#f0f7ff'
};
var LOGO_OPTS = {
    width: 170,
    offsetTop: 10,
    offsetLeft: 10,
};
var buildThumbnail = function (articleTitle, backgroundImage) { return __awaiter(void 0, void 0, void 0, function () {
    var outputDir, overlayColor, articleTitleHash, outputFile, textToLines, logo, stopwatch, wave, plus, background, overlay, createOps, flat, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                outputDir = path.join(__dirname, '../out');
                overlayColor = (0, color_1.default)(THUMBNAIL_OPTS.overlayColor);
                if (!fs.existsSync(outputDir)) {
                    console.info('Creating output directory');
                    fs.mkdirSync(outputDir);
                }
                console.info("Generating thumbnail for \"" + articleTitle + "\"");
                articleTitleHash = crypto_1.default.createHash('md5').update(articleTitle).digest('hex');
                outputFile = path.join(outputDir, './article-thumbnail-' + articleTitleHash + '.png');
                return [4 /*yield*/, (0, generateText_1.createLines)(articleTitle, THUMBNAIL_OPTS)];
            case 1:
                textToLines = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 12, , 13]);
                return [4 /*yield*/, (0, sharp_1.default)(logoSVG)
                        .resize({
                        width: LOGO_OPTS.width,
                        fit: 'contain'
                    })
                        .trim()
                        .toBuffer({ resolveWithObject: true })];
            case 3:
                logo = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)(stopWatchSVG)
                        .resize({
                        width: LOGO_OPTS.width,
                        fit: 'contain'
                    })
                        .trim()
                        .toBuffer({ resolveWithObject: true })];
            case 4:
                stopwatch = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)(waveSVG)
                        .resize({
                        width: THUMBNAIL_OPTS.width,
                        fit: 'contain'
                    })
                        .png()
                        .toBuffer({ resolveWithObject: true })];
            case 5:
                wave = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)(plusSVG)
                        .resize({
                        width: 50,
                        fit: 'contain'
                    })
                        .trim()
                        .toBuffer({ resolveWithObject: true })];
            case 6:
                plus = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)(backgroundImage)
                        .resize({
                        width: THUMBNAIL_OPTS.width,
                        height: THUMBNAIL_OPTS.height,
                    })
                        .toBuffer()];
            case 7:
                background = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)({
                        create: {
                            width: THUMBNAIL_OPTS.width,
                            height: THUMBNAIL_OPTS.height,
                            channels: 4,
                            background: {
                                r: overlayColor.red(),
                                g: overlayColor.green(),
                                b: overlayColor.blue(),
                                alpha: .3
                            }
                        }
                    })
                        .png()
                        .resize({
                        width: THUMBNAIL_OPTS.width,
                        height: THUMBNAIL_OPTS.height,
                        fit: 'cover'
                    })
                        .toBuffer()];
            case 8:
                overlay = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)({
                        create: {
                            width: THUMBNAIL_OPTS.width,
                            height: THUMBNAIL_OPTS.height,
                            channels: 3,
                            background: {
                                r: 255,
                                g: 255,
                                b: 255,
                            }
                        }
                    })
                        .png()
                        .toBuffer()];
            case 9:
                createOps = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)(createOps)
                        .composite(__spreadArray([
                        {
                            input: background
                        },
                        {
                            input: stopwatch.data,
                            blend: 'overlay',
                            left: Math.round(THUMBNAIL_OPTS.width - stopwatch.info.width - 20),
                            top: 40
                        },
                        {
                            input: plus.data,
                            top: Math.round(THUMBNAIL_OPTS.height - wave.info.height - 60),
                            blend: 'overlay',
                            left: 30,
                        },
                        {
                            input: overlay,
                            blend: 'over',
                            gravity: 'center'
                        },
                        {
                            input: wave.data,
                            gravity: 'south'
                        },
                        {
                            input: logo.data,
                            left: Math.round((THUMBNAIL_OPTS.width - LOGO_OPTS.width) - 20),
                            top: Math.round(THUMBNAIL_OPTS.height - logo.info.height - LOGO_OPTS.offsetTop),
                            blend: 'over',
                        }
                    ], textToLines, true))
                        .png()
                        .toBuffer()];
            case 10:
                flat = _a.sent();
                return [4 /*yield*/, (0, sharp_1.default)(flat)
                        .resize({
                        width: THUMBNAIL_OPTS.width,
                        height: THUMBNAIL_OPTS.height
                    })
                        .toFile(outputFile)];
            case 11:
                _a.sent();
                console.info("Thumbnail created \"" + outputFile + "\"");
                return [3 /*break*/, 13];
            case 12:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.buildThumbnail = buildThumbnail;
