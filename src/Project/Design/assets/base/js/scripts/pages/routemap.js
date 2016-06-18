var map;
var route;
var $jq = jQuery.noConflict();
$jq(document).ready(function () {
    function drawline() {
        var markerpath = new Array();
        for (var i = 0; i < map.markers.length; i++) //LOOP TO DISPLAY THE MARKERS
        {
            markerpath.push(map.markers[i].getPosition()); //PUSH THE NEWLY CREATED MARKER'S POSITION TO THE PATH ARRAY
        }
        map.drawPolyline({
            path: markerpath,
            strokeColor: '#131540',
            strokeOpacity: 0.6,
            strokeWeight: 6
        });
    }
    map = new GMaps({
        div: '#gmap',
        lat: 52.274097,
        lng: -1.567345,
        zoom: 16,
        click: function (e) {
            map.addMarker({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            });
            drawline();
        }
    });
    map.addControl({
        position: 'top_right',
        content: 'Clear Map',
        style: {
            margin: '5px',
            padding: '1px 6px',
            border: 'solid 1px #717B87',
            background: '#fff'
        },
        events: {
            click: function () {
                map.removeMarkers();
                map.removePolylines();
                markerpath = new Array();
            }
        }
    });

});