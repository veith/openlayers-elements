var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from 'lit-element';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import TileLayer from 'ol/layer/Tile';
import { register } from 'ol/proj/proj4.js';
// @ts-ignore
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import XYZ from 'ol/source/XYZ.js';
import proj4 from 'proj4';
import OlLayerBase from './ol-layer-base';
const parser = new WMTSCapabilities();
/**
 * A basic OpenStreetMap tile layer
 *
 * @demo demo/swiss-topo.html
 * @customElement
 */
let SwissTopoReprojected = class SwissTopoReprojected extends OlLayerBase {
    async createLayer() {
        return new TileLayer({
            source: new XYZ({
                url: 'https://wmts10.geo.admin.ch/1.0.0/' + this.sourceName + '/default/current/3857/{z}/{x}/{y}.jpeg',
            }),
        });
    }
};
__decorate([
    property({ type: String, attribute: 'source-name' })
], SwissTopoReprojected.prototype, "sourceName", void 0);
SwissTopoReprojected = __decorate([
    customElement('swiss-topo-reprojected')
], SwissTopoReprojected);
export { SwissTopoReprojected };
proj4.defs('EPSG:21781', '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=600000 +y_0=200000 +ellps=bessel ' +
    '+towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs');
proj4.defs('EPSG:2056', '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=2600000 +y_0=1200000 +ellps=bessel ' +
    '+towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs');
register(proj4);
/**
 * A basic OpenStreetMap tile layer
 *
 * @demo demo/swiss-topo.html
 * @customElement
 */
let SwissTopoWMTS = class SwissTopoWMTS extends OlLayerBase {
    async createLayer() {
        const response = await fetch('https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml');
        const capabilities = parser.read(await response.text());
        const options = optionsFromCapabilities(capabilities, {
            layer: this.sourceName,
            matrixSet: 'EPSG:3857',
        });
        return new TileLayer({
            opacity: 1,
            source: new WMTS(options),
        });
    }
};
__decorate([
    property({ type: String, attribute: 'source-name' })
], SwissTopoWMTS.prototype, "sourceName", void 0);
SwissTopoWMTS = __decorate([
    customElement('swiss-topo-wmts')
], SwissTopoWMTS);
export { SwissTopoWMTS };
