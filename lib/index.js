"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MapboxDraw = require("@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw");
const React = require("react");
const react_mapbox_gl_1 = require("react-mapbox-gl");
function noop() {
    /* do nothing */
}
class DrawControl extends React.Component {
    componentDidMount() {
        const map = this.context;
        // The map needs to be passed in the React Context, or welse we can't do
        // anything.
        if (!map || !map.getStyle()) {
            throw new Error('Map is undefined in React context.');
        }
        const { modes, onDrawActionable, onDrawCombine, onDrawCreate, onDrawDelete, onDrawModeChange, onDrawRender, onDrawSelectionChange, onDrawUncombine, onDrawUpdate, position } = this.props;
        // Define a new Draw Control
        this.draw = new MapboxDraw(Object.assign(Object.assign({}, this.props), { modes: Object.assign(Object.assign({}, MapboxDraw.modes), modes) }));
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
    }
    componentWillUnmount() {
        const map = this.context;
        if (!map || !map.getStyle()) {
            return;
        }
        if (!this.draw) {
            return;
        }
        map.removeControl(this.draw);
    }
    render() {
        return null;
    }
}
exports.default = DrawControl;
DrawControl.contextType = react_mapbox_gl_1.MapContext;
DrawControl.defaultProps = {
    position: 'top-left'
};
