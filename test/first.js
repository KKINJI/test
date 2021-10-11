

    // 모바일
    var is_mobile = false;
    var UserAgent = navigator.userAgent; 
    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) 
        { 
            //  go(); // 모바일 
            is_mobile = true
        } 
    else 
        { 
            is_mobile = false;
        } 

        

    // 맵표시	
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(36.35613994325377, 127.33330258912929), // 지도의 중심좌표
            level: 4, // 지도의 확대 레벨
            mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
        }; 

       


        // 지도를 감싸고 있는 div의 크기를 조정하는 함수입니다
        function toggleMapWrapper(active, position) {
    if (active) {

        // 지도를 감싸고 있는 div의 너비가 100%가 되도록 class를 변경합니다 
        container.className = '';

        // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
        map.relayout();

        // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
        map.setCenter(position);
    } else {

        // 지도만 보여지고 있는 상태이면 지도의 너비가 50%가 되도록 class를 변경하여
        // 로드뷰가 함께 표시되게 합니다
        if (container.className.indexOf('view_roadview') === -1) {
            container.className = 'view_roadview';

            // 지도의 크기가 변경되었기 때문에 relayout 함수를 호출합니다
            map.relayout();

            // 지도의 너비가 변경될 때 지도중심을 입력받은 위치(position)로 설정합니다
            map.setCenter(position);
        }
    }
}



    //지적편집도
        var Overlay = document.getElementById('Ov');
        Ov.addEventListener('click', function(setOverlayMapTypeId1){
       })
        
        function setOverlayMapTypeId1() {
            var chkuseDistrict = document.getElementById('chkuseDistrict');
            // 지도 타입을 제거합니다
        for (var type in mapTypes) {
            map.removeOverlayMapTypeId(mapTypes[type]);    
        }
            // 지적편집도정보 체크박스가 체크되어있으면 지도에 지적편집도정보 지도타입을 추가합니다
                map.addOverlayMapTypeId(mapTypes.useDistrict);        
        
                btnGround.className = 'selected_btn';
                btnGroundHide.className = 'btn';     
        } 

        document.getElementById("setOverlayMapTypeId1").addEventListener("setOverlayMapTypeId1");
        
        function setOverlayMapTypeId2() {
            var chkuseDistrict = document.getElementById('chkuseDistrict');
            // 지도 타입을 제거합니다
        for (var type in mapTypes) {
            map.removeOverlayMapTypeId(mapTypes[type]);    
        }
                btnGround.className = 'btn';
                btnGroundHide.className = 'selected_btn';  
            
        } 

    //지적편집도


    // 지도를 생성한다 
    var map = new kakao.maps.Map(mapContainer, mapOption); 

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커 클러스터러를 생성합니다 
    var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    minLevel: 10 // 클러스터 할 최소 지도 레벨 
    });

    // 지도 타입 정보를 가지고 있을 객체입니다
    // map.addOverlayMapTypeId 함수로 추가된 지도 타입은
    // 가장 나중에 추가된 지도 타입이 가장 앞에 표시됩니다
    // 이 예제에서는 지도 타입을 추가할 때 지적편집도, 지형정보, 교통정보, 자전거도로 정보 순으로 추가하므로
    // 자전거 도로 정보가 가장 앞에 표시됩니다
    var mapTypes = {
        useDistrict : kakao.maps.MapTypeId.USE_DISTRICT
    };


// GPS
    var markerG=null;
    var watchID;

    function changed(pos) {

        var myLatlng = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

        if(markerG==null){

            map.panTo(myLatlng);

                    // 지도 이미지 갱신
            var markerImage = new kakao.maps.MarkerImage("point.png", new kakao.maps.Size(20, 20));
            markerG = new kakao.maps.Marker({
                        image: markerImage,
                        position: myLatlng
                    });
            markerG.setMap(map);
        }else{
            markerG.setPosition(myLatlng);
            map.panTo(myLatlng);
        }
    }



    function getCurrentPosBtn(){


        var click = document.getElementById('gps');

        if( click.className.indexOf('active') === -1) {
            
            click.className = 'active';


            if(!navigator.geolocation){
                alert("지원하지 않음");
            }	
            else {
                var options = { // watchPosition()의 마지막 매개 변수로 전달
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0 };

                // changed() 콜백 함수를 등록하고, 반복 위치 서비스 시작
                watchID = navigator.geolocation.watchPosition(changed, null, options);
            }
        }
        else {
            navigator.geolocation.clearWatch(watchID);
            markerG.setMap(null);
            markerG = null;
            click.className = ''; 
        }
            
    }

// GPS





//marking
    var data = [
        [36.35613994325377, 127.33330258912929,'<div style="padding:5px;"> 1</div>','<div class ="label">카카오!</div>'],
        [36.36077113212849, 127.33587773842896,'<div style="padding:5px;"> 2</div>','<div style="padding:0 5px;background:#fff;">카카오!</div>'],
        [36.35467103799297, 127.3283888850169,'<div style="padding:5px;"> 3</div>','<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>']
    ]
    

    
    var markers = [];

    var iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    for (var i=0; i < data.length; i++){

    var positions = new kakao.maps.LatLng(data[i][0],data[i][1]);
    var positions1 = new kakao.maps.LatLng(data[i][0],data[i][1]);
    var contents = data[i][2];
    var contents1 = data[i][3];

    // 지도에 마커를 생성하고 표시한다
    var marker = new kakao.maps.Marker({
        position: positions, // 마커의 좌표
        map: map
    });

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
    position: positions1,
     content: contents1,
    xAnchor: 0.5, // 컨텐츠의 x 위치
    yAnchor: 3 // 컨텐츠의 y 위치
        });

    // 마커 위에 표시할 인포윈도우를 생성한다
    var infowindow = new kakao.maps.InfoWindow({
        content :  contents,
        removable : iwRemoveable	
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
      
        
    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);	
    
    markers.push(marker);	
    }

    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    function makeOverListener(map, marker, infowindow){
    return function() {
    infowindow.open(map, marker);  
        };
    }

//marking

    clusterer.addMarkers(markers);

