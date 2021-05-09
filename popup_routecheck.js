<%@ page language ="java" contentType = "text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>simpleMap</title>
        <script    src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=서비스키"></script>
        <script type="text/javascript">
        
        var map;
        var marker, infoWindow, markerPosition;
        
        var markerInfo;
        //출발지,도착지 마커
        var marker_s, marker_e, marker_p;
        //경로그림정보
        var drawInfoArr = [];
        var drawInfoArr2 = [];
    
        var chktraffic = [];
        var resultdrawArr = [];
        var resultMarkerArr = [];
        var result
        
        var marker_sPosition;
        var marker_ePosition;
        var marker_pPosition;
        var polyline_;
 
        function initTmap() {
            // 1. 지도 띄우기
            map = new Tmapv2.Map("map_div", {
                center : new Tmapv2.LatLng(37.49241689559544, 127.03171389453507),
                width : "100%",
                height : "600px",
                zoom : 11,
                zoomControl : true,
                scrollwheel : true
            });    //map = new Tmapv2.Map({});
        
            
                         $("#first").click(
 
                            function(){
                                
                                if(marker_s){
                                    marker_s.setMap(null);
                                }
                                if(marker_e){
                                    marker_e.setMap(null);
                                }
                                 if (resultMarkerArr.length > 0) {
                                        for (var i = 0; i < resultMarkerArr.length; i++) {
                                            resultMarkerArr[i].setMap(null);
                                        }
                                    }
                            
                                    if (resultdrawArr.length > 0) {
                                        for (var i = 0; i < resultdrawArr.length; i++) {
                                            resultdrawArr[i].setMap(null);
                                        }
                                    }
                            
                        var lon, lat;
                        
                        map.addListener("click",
                            function (e){
                            
                            var mapLatLng = e.latLng;
                            
                            if(marker!=null){
                                marker.setMap(null);
                            }
                            
                            if(infoWindow){
                                infoWindow.setVisible(false);
                            }
                            
                            markerPosition = new Tmapv2.LatLng(mapLatLng._lat, mapLatLng._lng);
                            
                            marker = new Tmapv2.Marker({
                                position : markerPosition,
                                icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_p.png",
                                iconSize : new Tmapv2.Size(24,38),
                                map : map
                            });//marker = new Tmapv2.Marker({})
                            
                            marker.addListener("click",
                                    function onClick(e){
                                    reverseGeo(markerPosition.lng(), markerPosition.lat());
                            });//marker.addListener({})
                        });//map.addListener({})
                        
                        function reverseGeo(lon, lat) {
                            $.ajax({
                                method : "GET",
                                url : "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
                                async : false,
                                data : {
                                     "appKey" : "서비스키",
                                        "coordType" : "WGS84GEO",
                                        "addressType" : "A10",
                                        "lon" : lon,
                                        "lat" : lat
                                },
                                
                                success : function(response){
                                    arrResult = response.addressInfo;
                                    var content =
                                    "<div style='overflow:auto; width:400px; height: 200px; position: relative; padding-top: 0px; display:inline-block'>"+
                                    "<div style='display:inline-block; margin-left:5px; vertical-asign: top;'>"+
                                    "<span style='font-size: 12px; margin-left:2px; margin-bottom:2px; display:block;'>"
                                    +"fullAddress :" +'"'+ arrResult.fullAddress+'"'+"</br>"
                                    +"addressType :" +'"'+ arrResult.addressType+'"'+"</br>"
                                    +"city_do: " + '"'+ arrResult.city_do+'"'+"</br>"
                                    +"gu_gun: " + '"'+ arrResult.gu_gun+'"'+"</br>"
                                    +"eup_myun: " + '"'+ arrResult.eup_myun+'"'+"</br>"
                                    + "adminDong: " + '"'+ arrResult.adminDong+'"'+"</br>"
                                    +"adminDongCode: " + '"'+ arrResult.adminDongCode+'"'+"</br>"
                                    + "legalDong: " + '"'+ arrResult.legalDong+'"'+"</br>"
                                    + "legalDongCode: " + '"'+ arrResult.legalDongCode+'"'+"</br>"
                                    +"ri: " + '"'+ arrResult.ri+'"'+"</br>"
                                    +"bunji: " + '"'+ arrResult.bunji+'"'+"</br>"
                                    + "roadName: " + '"'+ arrResult.roadName+'"'+"</br>"
                                    +"buildingName: " + '"'+ arrResult.buildingName+'"'+"</br>"
                                    + "mappingDistance: " + '"'+ arrResult.mappingDistance+'"'+"</br>"
                                    +"roadCode: " + '"'+ arrResult.roadCode+'"'+"</br>"
                                    "</span>"+
                                    "<span style='font-size: 12px; color:#888; margin-left:2px; margin-bottom:2px; display:block;'>(우)100-999  (지번)을지로2가 11</span>"+
                                    "<span style='font-size: 12px; margin-left:2px;'><a href='https://openapi.sk.com/' target='blank'>개발자센터</a></span>"+
                                    "</div>"+
                                    "</div>";
                                    
                                       infoWindow = new Tmapv2.InfoWindow({
                                        position : markerPosition,
                                        content : content,
                                        type : 2,
                                        map : map
                                    });//infoWindow = new Tmapv2.InfoWindow({})
                                }//function(response){}
                            });//$.ajax({})
                        }//function reverseGeo 
                        
                        map.setCenter(new Tmapv2.LatLng (37.566481622437934,126.98502302169841));
                        
                            });//$("first").click()
                            
                        $("#second").click (
                                
                        function (){
                            if (marker){
                                marker.setMap(null);
                            }
                            if(infoWindow){
                                infoWindow.setVisible(false);
                            }
                            
                             marker_sPosition = new Tmapv2.LatLng(37.566567545861645, 126.9850380932383);
                             
                             marker_s = new Tmapv2.Marker({
                                position : marker_sPosition,
                                icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
                                iconSize : new Tmapv2.Size(24,38),
                                map : map,
                                draggable : true
                             });
                             
                             marker_ePosition = new Tmapv2.LatLng(37.403049076341794, 127.10331814639885);
    
                             marker_e = new Tmapv2.Marker({
                                position : marker_ePosition,
                                icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
                                iconSize : new Tmapv2.Size(24,38),
                                map : map,
                                draggable : true
                             });
                             
                             marker_s.addListener("dragend",
                                 function dragend_s(e){
                                 
                                 var markerLatLng = e.latLng;
                                 
                                 marker_sPosition = new Tmapv2.LatLng(markerLatLng._lat, markerLatLng._lng);
                             });
 
                             marker_e.addListener("dragend",
                                     function dragend_e(e){
                                     
                                     var markerLatLng = e.latLng;
                                     
                                     marker_ePosition = new Tmapv2.LatLng(markerLatLng._lat, markerLatLng._lng);
                             });
                        });//second버튼 클릭
                        
                        $("#btn_select").click(
                                function (){
                                    resettingMap();
                                    
                                    marker_s.getPosition();
                                    marker_e.getPosition();
                                    
                                    var searchOption = $("#selectLevel").val();
                                    var trafficInfochk = $("#year").val();
                                    
                                    $.ajax({
                                         type : "POST",
                                         url : "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
                                         async : false,
                                         data : {
                                             "appKey" : "l7xx07edbdb4c7c845d08dbf34f748bdc31c",
                                             "startX" : marker_sPosition.lng(),
                                             "startY" : marker_sPosition.lat(),
                                             "endX" : marker_ePosition.lng(),
                                             "endY" : marker_ePosition.lat(),
                                             "reqCoordType" : "WGS84GEO",
                                             "resCoordType" : "EPSG3857",
                                             "searchOption" : searchOption,
                                             "trafficInfo" : trafficInfochk
                                         },
                                         success: function(response){
                                            
                                             var resultData = response.features;
                                             
                                             var resultData = response.features;
                                             
                                             var tDistance = "총 거리 : "
                                                     + (resultData[0].properties.totalDistance / 1000)
                                                             .toFixed(1) + "km,";
                                             var tTime = " 총 시간 : "
                                                     + (resultData[0].properties.totalTime / 60)
                                                             .toFixed(0) + "분,";
                                             var tFare = " 총 요금 : "
                                                     + resultData[0].properties.totalFare
                                                     + "원,";
                                             var taxiFare = " 예상 택시 요금 : "
                                                     + resultData[0].properties.taxiFare
                                                     + "원";
 
                                             $("#result").text(
                                                     tDistance + tTime + tFare
                                                             + taxiFare);
                                             
                                            
                                             for(var i in resultData){
                                                 var geometry = resultData[i].geometry;
                                                 var properties = resultData[i].properties;
                                                 
                                                 if(geometry.type == "LineString"){
                                                     for(var j in geometry.coordinates){
                                                         var latlng = new Tmapv2.Point(
                                                            geometry.coordinates[j][0], geometry.coordinates[j][1]);
                                                         
                                                         var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                                                         
                                                         var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                                                         
                                                         drawInfoArr.push(convertChange);
                                                     }
                                                     drawLine(drawInfoArr, "0");
                                                 }//type이 linestring인 경우
                                                 else {
                                                     var markerIng = "";
                                                     var pType = "";
                                                     
                                                     if(properties.pointType == "S"){
                                                         markerImg  = "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                                                         pType = "S"
                                                     }
                                                     else if (properties.pointType == "E"){
                                                         markerImg = "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                                                         pType = "E"
                                                     }
                                                     else {
                                                         markerIng = "http://topopen.tmap.co.kr/imgs/point.png";
                                                         pType = "P"
                                                     }
                                                     
                                                     var latlon = new Tmapv2.Point(
                                                             geometry.coordinates[0], geometry.coordinates[1]);
                                                     var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);
                                                     var routeInfoObj = {
                                                             markerImage : markerImg,
                                                             lng : convertPoint._lng,
                                                             lat : convertPoint._lat,
                                                             pointType : pType
                                                     };
                                                     addMarkers(routeInfoObj);
                                                 }//type이 linestring이 아닌 경우
                                             }//for문
                                         }//success함수
                                         , error : function(request, status, error) {
                                             console.log("code:"
                                                     + request.status + "\n"
                                                     + "message:"
                                                     + request.responseText
                                                     + "\n" + "error:" + error);
                                         }//error함수
                                    });//ajax
                                });//btn_select 버튼
        }//function initTmap()지도를 띄우는 함수
        
        function addComma(num){
            var regexp = /\B(?=(\d{3})+(?!\d))/g;
            return num.toString().replace(regexp, ',');
        }
        
        //마커 생성하기
        function addMarkers(infoObj) {
            var size = new Tmapv2.Size(24, 38);//아이콘 크기 설정합니다.
    
            if (infoObj.pointType == "P") { //포인트점일때는 아이콘 크기를 줄입니다.
                size = new Tmapv2.Size(8, 8);
            }
        
            marker_pPosition=new Tmapv2.LatLng(infoObj.lat, infoObj.lng);
 
            marker_p = new Tmapv2.Marker({
                position : marker_pPosition,
                icon : infoObj.markerImage,
                iconSize : size,
                map : map,
                draggable: true
            });
            
            marker_p.addListener("dragend",
                    function dragend_p (e){
                    var markerLatLng=e.latLng;
                    marker_pPosition =  new Tmapv2.LatLng(markerLatLng._lat, markerLatLng._lng);
                    
                    if(infoObj.pointType == "S"){
                        marker_sPosition = marker_pPosition;     
                    }
                    else if(infoObj.pointType == "E"){
                        marker_ePosition = marker_pPosition;     
                    }
            });
            resultMarkerArr.push(marker_p);
        }
    
        //라인그리기
        function drawLine(arrPoint, traffic) {
            polyline_;
    
            if (chktraffic.length != 0) {
    
                // 교통정보 혼잡도를 체크
                // strokeColor는 교통 정보상황에 다라서 변화
                // traffic :  0-정보없음, 1-원활, 2-서행, 3-지체, 4-정체  (black, green, yellow, orange, red)
    
                var lineColor = "";
    
                if (traffic != "0") {
                    if (traffic.length == 0) { //length가 0인것은 교통정보가 없으므로 검은색으로 표시
    
                        lineColor = "#06050D";
                        //라인그리기[S]
                        polyline_ = new Tmapv2.Polyline({
                            path : arrPoint,
                            strokeColor : lineColor,
                            strokeWeight : 6,
                            map : map
                        });
                        resultdrawArr.push(polyline_);
                        //라인그리기[E]
                    } else { //교통정보가 있음
    
                        if (traffic[0][0] != 0) { //교통정보 시작인덱스가 0이 아닌경우
                            var trafficObject = "";
                            var tInfo = [];
    
                            for (var z = 0; z < traffic.length; z++) {//교통정보가 있는 구역들을 tInfo 배열에 차례대로 대입을 시킨다. 
                                trafficObject = {
                                    "startIndex" : traffic[z][0],//교통정보 시작 인덱스 처음
                                    "endIndex" : traffic[z][1],
                                    "trafficIndex" : traffic[z][2],
                                };
                                tInfo.push(trafficObject);//인덱스의 정보를 담은 trafficObject를 tInfo안에다가 넣어준다. 
                            }
                            
                            var noInfomationPoint = [];
    
                            for (var p = 0; p < tInfo[0].startIndex; p++) {//위에서 push한 tInfo의 시작 점들을 noInformationPoinrt에다가 넣어준다. 
                                noInfomationPoint.push(arrPoint[p]);//polyline의 좌표 목록들을 noninformationPoint에다가 넣어준다. 
                            }
    
                            //라인그리기[S]
                            polyline_ = new Tmapv2.Polyline({
                                path : noInfomationPoint,//시작점들을 담은 nonInformationPoint를 그려주는 polyline의 좌표 목록으로 넣어준다. 
                                strokeColor : "#06050D",
                                strokeWeight : 6,
                                map : map
                            });
                            //라인그리기[E]
                            resultdrawArr.push(polyline_);
    
                            for (var x = 0; x < tInfo.length; x++) {
                                var sectionPoint = []; //구간선언
    
                                for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                                    sectionPoint.push(arrPoint[y]);
                                }
    
                                if (tInfo[x].trafficIndex == 0) {
                                    lineColor = "#06050D";
                                } else if (tInfo[x].trafficIndex == 1) {
                                    lineColor = "#61AB25";
                                } else if (tInfo[x].trafficIndex == 2) {
                                    lineColor = "#FFFF00";
                                } else if (tInfo[x].trafficIndex == 3) {
                                    lineColor = "#E87506";
                                } else if (tInfo[x].trafficIndex == 4) {
                                    lineColor = "#D61125";
                                }
    
                                //라인그리기[S]
                                polyline_ = new Tmapv2.Polyline({
                                    path : sectionPoint,
                                    strokeColor : lineColor,
                                    strokeWeight : 6,
                                    map : map
                                });
                                //라인그리기[E]
                                resultdrawArr.push(polyline_);
                            }
                        } else { //0부터 시작하는 경우
    
                            var trafficObject = "";
                            var tInfo = [];
    
                            for (var z = 0; z < traffic.length; z++) {
                                trafficObject = {
                                    "startIndex" : traffic[z][0],
                                    "endIndex" : traffic[z][1],
                                    "trafficIndex" : traffic[z][2],
                                };
                                tInfo.push(trafficObject)
                            }
    
                            for (var x = 0; x < tInfo.length; x++) {
                                var sectionPoint = []; //구간선언
    
                                for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                                    sectionPoint.push(arrPoint[y]);
                                }
    
                                if (tInfo[x].trafficIndex == 0) {
                                    lineColor = "#06050D";
                                } else if (tInfo[x].trafficIndex == 1) {
                                    lineColor = "#61AB25";
                                } else if (tInfo[x].trafficIndex == 2) {
                                    lineColor = "#FFFF00";
                                } else if (tInfo[x].trafficIndex == 3) {
                                    lineColor = "#E87506";
                                } else if (tInfo[x].trafficIndex == 4) {
                                    lineColor = "#D61125";
                                }
    
                                //라인그리기[S]
                                polyline_ = new Tmapv2.Polyline({
                                    path : sectionPoint,
                                    strokeColor : lineColor,
                                    strokeWeight : 6,
                                    map : map
                                });
                                //라인그리기[E]
                                resultdrawArr.push(polyline_);
                            }
                        }
                    }
                } else {
    
                }
            } else {
                polyline_ = new Tmapv2.Polyline({
                    path : arrPoint,
                    strokeColor : "#DD0000",
                    strokeWeight : 6,
                    map : map
                });
                resultdrawArr.push(polyline_);
            }
    
        }
    
        //초기화 기능
        function resettingMap() {
            //기존마커는 삭제
            marker_s.setMap(null);
            marker_e.setMap(null);
            
            if (resultMarkerArr.length > 0) {
                for (var i = 0; i < resultMarkerArr.length; i++) {
                    resultMarkerArr[i].setMap(null);
                }
            }
    
            if (resultdrawArr.length > 0) {
                for (var i = 0; i < resultdrawArr.length; i++) {
                    resultdrawArr[i].setMap(null);
                }
            }
    
            chktraffic = [];
            drawInfoArr = [];
            resultMarkerArr = [];
            resultdrawArr = [];
        }
 
</script>
</head>
<body onload="initTmap()">
 <div id="map_wrap" class="map_wrap3">
        <div id="map_div"></div>
    </div>
    <div class="map_act_btn_wrap cleaer_box"></div>
    <button id="first">팝업창 실행</button>
    <button id="second">함수 실행</button>
        <div class="ft_area">
            <div class="ft_select_wrap">
                <div class="ft_select">
                    <select id="selectLevel">
                        <option value="0" selected="selected">교통최적+추천</option>
                        <option value="1">교통최적+무료우선</option>
                        <option value="2">교통최적+최소시간</option>
                        <option value="3">교통최적+초보</option>
                        <option value="4">교통최적+고속도로우선</option>
                        <option value="10">최단거리+유/무료</option>
                        <option value="12">이륜차도로우선</option>
                        <option value="19">교통최적+어린이보호구역 회피</option>
                    </select> <select id="year">
                        <option value="N" selected="selected">교통정보 표출 옵션</option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                    </select>
                    <button id="btn_select">적용하기</button>
                </div>
            </div>
            <div class="map_act_btn_wrap clear_box"></div>
            <div class="clear"></div>
        </div>
    
        <div id="map_wrap" class="map_wrap">
            <div id="map_div"></div>
        </div>
        <div class="map_act_btn_wrap clear_box"></div>
        <p id="result"></p>
    </body>
 
</html>


출처: https://newindow.tistory.com/131?category=1169059 [글쓰는 공대생의 블로그]