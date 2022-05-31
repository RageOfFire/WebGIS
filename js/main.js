var di_den_diem;
$("#document").ready(function () {
    // Hiển thị pop-up
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    }));

    var shouldUpdate = true;
	var center = [564429.04, 2317738.2];
	var zoom = 16.56631263565161;
	var rotation = 0;

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    // Khai báo bản đồ
    var format = 'image/png';
    var bounds = [563052.9375,2317012.25,563272.625,2317251.0];

    var hientrang = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/BuiHongSon_189/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.0',
                STYLES: '',
                LAYERS: 'BuiHongSon_189:hien_trang',
            }
        })
    });

    var thuyhe = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/BuiHongSon_189/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.0',
                STYLES: '',
                LAYERS: 'BuiHongSon_189:thuy_he',
            }
        })
    });

    var doituong = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://localhost:8080/geoserver/BuiHongSon_189/wms',
            params: {
                'FORMAT': format,
                'VERSION': '1.1.0',
                STYLES: '',
                LAYERS: 'BuiHongSon_189:dtuong_qtrac',
            }
        })
    });

    var projection = new ol.proj.Projection({
        code: 'EPSG:3405',
        units: 'm',
        axisOrientation: 'neu'
    });

    var view = new ol.View({
        projection: projection,
        center: center,
		zoom: zoom,
		rotation: rotation
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
            hientrang,
            thuyhe,
            doituong
        ],
        overlays: [overlay],
        view: view
    });
    // Highlight đối tượng
    var styles = {
        'MultiPolygon': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 5
            })
        }),
    };
    var styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
    };
    var vectorLayer = new ol.layer.Vector({
        style: styleFunction
    });
    map.addLayer(vectorLayer);

    map.getView().fit(bounds, map.getSize());

    //tìm kiếm đốt tượng theo URL
	if(window.location.hash !== '') {
		var hash = window.location.hash.replace('#map=', '');
		var parts = hash.split('/');

		if(parts.length === 4) {
			zoom = parseInt(parts[0], 10);
			center = [
				parseFloat(parts[1]),
				parseFloat(parts[2])
			];
			rotation = parseFloat(parts[3]);
		}
	}

    //Hiển thị hoặc ẩn hiện thị các lớp
    $("#hientrangCheck").change(function () {
        if ($("#hientrangCheck").is(":checked")) {
            hientrang.setVisible(true);
            document.getElementById('imghientrang').style.visibility = "visible";
        }
        else {
            hientrang.setVisible(false);
            document.getElementById('imghientrang').style.visibility = "hidden";
        }
    });
    $("#thuyheCheck").change(function () {
        if ($("#thuyheCheck").is(":checked")) {
            thuyhe.setVisible(true);
            document.getElementById('imgthuyhe').style.visibility = "visible";
        }
        else {
            thuyhe.setVisible(false);
            document.getElementById('imgthuyhe').style.visibility = "hidden";
        }
    });
    $("#doituongCheck").change(function () {
        if ($("#doituongCheck").is(":checked")) {
            doituong.setVisible(true);
            document.getElementById('imgdoituong').style.visibility = "visible";
        }
        else {
            doituong.setVisible(false);
            document.getElementById('imgdoituong').style.visibility = "hidden";
        }
    });
    //Click chuột vào ảnh để đổi
    map.on('singleclick', function (evt) {
        content.innerHTML = '<span class="badge rounded-pill bg-danger">Loading... please wait... <span class="spinner-border spinner-border-sm text-success" role="status" aria-hidden="true"></span></span>';
        var view = map.getView();
        var viewResolution = view.getResolution();
        var source = hientrang.getSource();
        var url = source.getFeatureInfoUrl(
            evt.coordinate, viewResolution, view.getProjection(),
            { 'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50 });
        if (url) {
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (n) {
                    var content = "<table class='table table-hover'>";
                    for (var i = 0; i < n.features.length; i++) {
                        var feature = n.features[i];
                        var featureAttr = feature.properties;
                        content +=
                    `
                    <thead>
                    <tr class='table-success'>
                    <th>DPHC</th>
                    <th>Shape_leng</th>
                    <th>Shape_area</th>
                    <th>Mã loại</th>
                    </tr>
                    </thead> 
                    <tbody>
                    <tr class='table-dark table-hover'>
                    <td>${featureAttr["dphc"]}</td>
                    <td>${featureAttr["shape_leng"]}</td>
                    <td>${featureAttr["shape_area"]}</td>
                    <td>${featureAttr["ma_loai"]}</td>
                    </tr>
                    </tbody>
                    `
                    }
                    content += '</table>';
                    $('#info').html(content);
                    $('#popup-content').html(content);
                    overlay.setPosition(evt.coordinate);
                    var vectorSource = new ol.source.Vector({
                        features: (new ol.format.GeoJSON()).readFeatures(n)
                    });
                    vectorLayer.setSource(vectorSource);
                }
            });
        };
    });

    var updatePermalink = function() {
		if(!shouldUpdate) {
			shouldUpdate = true;
			return;
		}

		var center = view.getCenter();
		var hash = '#map=' +
			view.getZoom() + '/' +
			Math.round(center[0] * 100) / 100 + '/' +
			Math.round(center[1] * 100) / 100 + '/' +
			view.getRotation();
		var state = {
			zoom: view.getZoom(),
			center: view.getCenter(),
			rotation: view.getRotation()
		};

		window.history.pushState(state, 'map', hash);
	};

    map.on('moveend', updatePermalink);

	window.addEventListener('popstate', function(event) {
		if(event.state === null) {
			return;
		}

		map.getView().setCenter(event.state.center);
		map.getView().setZoom(event.state.zoom);
		map.getView().setRotation(event.state.rotation);
		shouldUpdate = false;
	});
    
    di_den_diem = function (x, y) {
        var vi_tri = ol.proj.fromLonLat([x, y], projection);
        view.animate({
            center: vi_tri,
            duration: 2000,
            zoom: 20
        })
    }

});