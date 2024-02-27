const styles = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#00a09d"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#00a09d"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#c8f1f3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d9d9d9"
            },
            {
                "lightness": 15
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }

];

const points = [
    {
        startPoint: {lat: 40.42190472898135, lng: -3.704486328125016},
        icon: 'secondary',
        label: 'Madrid'
    },
    {
        startPoint: {
            lat: 43.3026563793988,
            lng: 5.384226562499981
        },
        icon: 'secondary',
        label: 'Marseille'
    },
    {
        startPoint: {
            lat: 52.51959899120086,
            lng: 13.401226562499984
        },
        icon: 'coming-soon',
        label: 'Berlin'
    },
    {
        startPoint: {
            lat: 42.695537,
            lng: 23.2539067
        },
        endPoint: {
            lat: 48.857,
            lng: 2.352
        },
        icon: 'primary',
        label: 'Sofia'
    },
    {
        startPoint: {
            lat: 45.4628329,
            lng: 9.1076924
        },
        icon: 'primary',
        label: 'Milan'
    },
    {
        startPoint: {
            lat: 48.579748,
            lng: 1.1013236
        },
        icon: 'primary',
        label: 'Paris'
    },
    {
        startPoint: {
            lat: 44.7116944,
            lng: 23.946079
        },
        icon: 'primary',
        label: 'Bucharest'
    }
];


const icons = {
    primary: {
        name: 'Primary',
        icon: './primary.svg'
    },
    secondary: {
        name: 'Secondary',
        icon: './secondary.svg'
    },
    'coming-soon': {
        name: 'Coming Soon',
        icon: './coming-soon.svg'
    }
};

// let marker1, marker2;
// let poly, geodesicPoly;
// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 4,
//         center: {
//             lat: 34,
//             lng: -40.605
//         },
//         // styles:
//     });
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(
//         document.getElementById("info")
//     );
//     marker1 = new google.maps.Marker({
//         map,
//         draggable: true,
//         position: {
//             lat: 40.4469914099869,
//             lng: -3.693500000000016
//         }
//     });
//     marker2 = new google.maps.Marker({
//         map,
//         draggable: true,
//         position: {
//             lat: 48.857,
//             lng: 2.352
//         }
//     });
//     const bounds = new google.maps.LatLngBounds(
//         marker1.getPosition(),
//         marker2.getPosition()
//     );
//     map.fitBounds(bounds);
//     google.maps.event.addListener(marker1, "position_changed", update);
//     google.maps.event.addListener(marker2, "position_changed", update);
//     poly = new google.maps.Polyline({
//         strokeColor: "#FF0000",
//         strokeOpacity: 0,
//         strokeWeight: 1,
//         map: map
//     });
//     geodesicPoly = new google.maps.Polyline({
//         strokeColor: "#4D4D4D",
//         strokeOpacity: 1.0,
//         strokeWeight: 1,
//         geodesic: true,
//         map: map
//     });
//     update();
// }
// function update() {
//     const path = [marker1.getPosition(), marker2.getPosition()];
//     poly.setPath(path);
//     geodesicPoly.setPath(path);
//     const heading = google.maps.geometry.spherical.computeHeading(
//         path[0],
//         path[1]
//     );
//     document.getElementById("heading").value = String(heading);
//     document.getElementById("origin").value = String(path[0]);
//     document.getElementById("destination").value = String(path[1]);
// }
// google.maps.event.addDomListener(window, 'load', initMap);

const googleMapControlsOptions = {
    center: {
        lat: 40.4469914099869,
        lng: -3.693500000000016
    },
    styles: styles,
    zoom: 5,
    minZoom: 4,
    maxZoom: 15,
    disableDefaultUI: true,
    panControl: true,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        style: google.maps.ZoomControlStyle.SMALL
    },
    // scaleControl: false,
    // mapTypeControl: false,
    // streetViewControl:false,
    // overviewMapControl: false,
    // rotateControl: false,
    // fullscreenControl: false,
};

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), googleMapControlsOptions);
//
//     const linePaths1 = [
//         {lat: 40.42190472898135, lng: -3.704486328125016},
//         {lat: 43.3026563793988, lng: 5.384226562499981},
//         {lat: 52.51959899120086, lng: 13.401226562499984},
//         {lat: 42.695537, lng: 23.2539067},
//         {lat: 45.4628329, lng: 9.1076924},
//         {lat: 48.579748, lng: 1.1013236},
//         {lat: 44.7116944, lng: 23.946079},
//     ];
//
//     const linePaths2 = [
//         {lat: 48.85880705522176, lng: 2.3465068359374808},
//         {lat: 48.857, lng: 2.352},
//         {lat: 48.857, lng: 2.352},
//         {lat: 48.85880705522176, lng: 2.3465068359374808},
//         {lat: 48.85880705522176, lng: 2.3465068359374808},
//         {lat: 48.85880705522176, lng: 2.3465068359374808},
//         {lat: 48.857, lng: 2.352},
//     ];
//
//     const arrayLines = [linePaths1, linePaths2];
//
//     //Loops through all polyline paths and draws each on the map.
//     for (let i = 0; i < 2; i++) {
//         const path = new google.maps.Polyline({
//             path: arrayLines[i],
//             geodesic: true,
//             strokeColor: '#4D4D4D',
//             strokeOpacity: 1.0,
//             strokeWeight: 1,
//         });
//         path.setMap(map);
//     }
//     for (let point of points) {
//         new MarkerWithLabel({
//             position: point.startPoint,
//             map: map,
//             draggable: false,
//             raiseOnDrag: false,
//             labelContent: point.label,
//             labelAnchor: new google.maps.Point(25, 35),
//             labelClass: "google-map-labels", // the CSS class for the label
//             icon: {
//                 url: `${point.icon}.svg`,
//                 anchor: new google.maps.Point(2.3, 4.5),
//                 scaledSize: new google.maps.Size(10, 10)
//             }
//         });
//     }
//
//     let legend = document.getElementById('legend');
//     for (let key in icons) {
//         let type = icons[key];
//         let name = type.name;
//         let icon = type.icon;
//         let div = document.createElement('div');
//         div.classList.add('legend-row');
//         div.innerHTML = `<img src="${icon}"><span class="legend-name">${name}</span>`;
//         legend.appendChild(div);
//     }
//     map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
//
// }
//
// google.maps.event.addDomListener(window, 'load', initMap);




function initialize() {
    // $('[id*="polyline"]').each(function () {
        let line;
        const currentMap = $('#polyline-921-28');

        const mapContainer = currentMap.attr('id');
        const pins = (currentMap.data('pins'));
        const zoom = currentMap.data('zoom');
        const lat = currentMap.data('latitude');
        const long = currentMap.data('longitude');

        const lines = [];
        const myLatlng = new google.maps.LatLng(lat, long);
        // let marker;



        // const mapOptions = {
        //     zoom: zoom,
        //     center: myLatlng,
        //     mapTypeId: google.maps.MapTypeId.ROADMAP,
        //     opacity: 0.2,
        //     styles: styles
        // };

        map = new google.maps.Map(document.getElementById(mapContainer), googleMapControlsOptions);

        for (var i in pins) {
            var pinData = pins[i];
            var marker = [new google.maps.LatLng(pinData.lat, pinData.long)];

            var lineCoordinates = [];

            for (var i in pinData.lines) {
                let lineInfo = pinData.lines[i];
                lineCoordinates.push({path: new google.maps.LatLng(lineInfo.lat, lineInfo.long), weight: lineInfo.weight})
            }

            for (i = 0; i < lineCoordinates.length; i++) {
                line = new google.maps.Polyline({
                    path: [lineCoordinates[i].path, marker[0]],
                    strokeOpacity: 0.8,
                    strokeWeight: lineCoordinates[i].weight,
                    strokeColor: '#4D4D4D',
                    geodesic: true,
                    icons: [{
                        offset: '100%',
                        repeat: '30px'
                    }]
                });
                line.setMap(map);
                lines.push(line);
            }
            let markerPosition = {
                position: {
                    lat: Number(pinData.lat),
                    lng:  Number(pinData.long)
                }
            };
            new MarkerWithLabel({
                position: markerPosition.position,
                map: map,
                draggable: false,
                raiseOnDrag: false,
                labelContent: pinData.text,
                labelAnchor: new google.maps.Point(25, 35),
                labelClass: "google-map-labels", // the CSS class for the label
                icon: {
                    url: `primary.svg`,
                    anchor: new google.maps.Point(2.3, 4.5),
                    scaledSize: new google.maps.Size(10, 10)
                }
            });
        }

    // for (let point of points) {
    //     new MarkerWithLabel({
    //         position: point.startPoint,
    //         map: map,
    //         draggable: false,
    //         raiseOnDrag: false,
    //         labelContent: point.label,
    //         labelAnchor: new google.maps.Point(25, 35),
    //         labelClass: "google-map-labels", // the CSS class for the label
    //         icon: {
    //             url: `${point.icon}.svg`,
    //             anchor: new google.maps.Point(2.3, 4.5),
    //             scaledSize: new google.maps.Size(10, 10)
    //         }
    //     });
    // }

        let legend = document.getElementById('legend');
        for (let key in icons) {
            let type = icons[key];
            let name = type.name;
            let icon = type.icon;
            let div = document.createElement('div');
            div.classList.add('legend-row');
            div.innerHTML = `<img src="${icon}"><span class="legend-name">${name}</span>`;
            legend.appendChild(div);
        }
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
    // });


}

google.maps.event.addDomListener(window, 'load', initialize);