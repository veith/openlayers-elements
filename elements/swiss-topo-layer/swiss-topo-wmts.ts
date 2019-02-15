import {customElement, property} from 'lit-element'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import TileLayer from 'ol/layer/Tile'
import {register} from 'ol/proj/proj4.js'
// @ts-ignore
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS'
import OlLayerBase from 'open-layers-elements/ol-layer-base'
import './projections'

const parser = new WMTSCapabilities()

type Projections = 'EPSG:3857' | 'EPSG:21718' | 'EPSG:2056' | 'EPSG:4329'

/**
 * ### <swiss-topo-wmts>
 *
 * Layer which loads official Swiss maps from [WMTS capabilities document][wmts-list]
 *
 * [wmts-list]: http://api3.geo.admin.ch/services/sdiservices.html#supported-projections
 *
 * @demo demo/swiss-topo.html
 * @customElement
 */
@customElement('swiss-topo-wmts')
export class SwissTopoWMTS extends OlLayerBase<TileLayer> {
    /**
     * One of the official layer names provided by geo.admin.ch.
     *
     * Complete list of layers is available
     * [here](http://api3.geo.admin.ch/api/faq/index.html#which-layers-are-available)
     *
     * @type {string}
     */
    @property({ type: String, attribute: 'layer-name' })
    public layerName: string

    /**
     * One of projection supported by swisstopo maps:
     *
     * 1. EPSG:3857 (Mercator) (default)
     * 1. EPSG:2056
     * 1. EPSG:21718
     * 1. EPSG:4329
     *
     * @type {string}
     */
    @property( { type: String })
    public projection: Projections = 'EPSG:3857'

    public async createLayer() {
        const projectionSegments = this.projection.replace(/:/, '/')
        const response = await fetch(`https://wmts.geo.admin.ch/${projectionSegments}/1.0.0/WMTSCapabilities.xml`)
        const capabilities = parser.read(await response.text())

        const options = optionsFromCapabilities(capabilities, {
            layer: this.layerName,
            matrixSet: this.projection,
        })

        return new TileLayer({
            source: new WMTS(options),
        })
    }
}
