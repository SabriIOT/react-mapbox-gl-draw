"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var MapboxDraw = require("@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw");
var React = require("react");
var react_mapbox_gl_1 = require("react-mapbox-gl");
function noop() {
    /* do nothing */
}
var DrawControl = /** @class */ (function (_super) {
    __extends(DrawControl, _super);
    function DrawControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrawControl.prototype.componentDidMount = function () {
        var map = this.context;
        // The map needs to be passed in the React Context, or welse we can't do
        // anything.
        if (!map || !map.getStyle()) {
            throw new Error('Map is undefined in React context.');
        }
        var _a = this.props, modes = _a.modes, onDrawActionable = _a.onDrawActionable, onDrawCombine = _a.onDrawCombine, onDrawCreate = _a.onDrawCreate, onDrawDelete = _a.onDrawDelete, onDrawModeChange = _a.onDrawModeChange, onDrawRender = _a.onDrawRender, onDrawSelectionChange = _a.onDrawSelectionChange, onDrawUncombine = _a.onDrawUncombine, onDrawUpdate = _a.onDrawUpdate, position = _a.position;
        // Define a new Draw Control
        this.draw = new MapboxDraw(__assign({}, this.props, { modes: __assign({}, MapboxDraw.modes, modes) }));
        // Add it to our map
        map.addControl(this.draw, position);
        // Hook draw events
        map.on('draw.actionable', onDrawActionable || noop);
        map.on('draw.combine', onDrawCombine || noop);
        map.on('draw.create', onDrawCreate || noop);
        map.on('draw.delete', onDrawDelete || noop);
        map.on('draw.modechange', onDrawModeChange || noop);
        map.on('draw.render', onDrawRender || noop);
        map.on('draw.selectionchange', onDrawSelectionChange || noop);
        map.on('draw.uncombine', onDrawUncombine || noop);
        map.on('draw.update', onDrawUpdate || noop);
    };
    DrawControl.prototype.componentWillUnmount = function () {
        var map = this.context;
        if (!map || !map.getStyle()) {
            return;
        }
        if (!this.draw) {
            return;
        }
        map.removeControl(this.draw);
    };
    DrawControl.prototype.render = function () {
        return null;
    };
    DrawControl.contextType = react_mapbox_gl_1.MapContext;
    DrawControl.defaultProps = {
        position: 'top-left'
    };
    return DrawControl;
}(React.Component));
exports.default = DrawControl;
