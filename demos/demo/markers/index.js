import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills()
  .then(() => import('@openlayers-elements/core/ol-map'))
  .then(() => {
    import('@polymer/iron-demo-helpers/demo-snippet')
    import('@openlayers-elements/maps/ol-control')
    import('@openlayers-elements/maps/ol-layer-openstreetmap')
    import('@openlayers-elements/maps/ol-layer-geojson')
    import('@openlayers-elements/core/ol-layer-vector')
    import('@openlayers-elements/maps/ol-marker-icon')
  })
