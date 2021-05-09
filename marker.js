<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html>
 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>simpleMap</title>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=서비스키"></script>
<script type="text/javascript">
    var map, marker;
    function initTmap(){
        
        //1.지도 띄우기 
        map=new Tmapv2.Map("map_div",
        {
            center:new Tmapv2.LatLng(37.570028, 126.986072),//위도와 경도를 나타내주는 인스턴스(경도, 위도)
            width:"100%",//맵의 넓이를 100%로 지정한다
            height:"400px",//맵의 높이를 400px로 지정한다.
            zoom:15,
            zoomControl:true,//zoom이 불가능하도록
            scrollwheel:true//scrolling이 불가능하도록
        });
        
        //마커 초기화
        marker1 = new Tmapv2.Marker(
        {
            icon: "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_a.png",
            iconSize : new Tmapv2.Size(24,38),
            map : map
        });
        
        //2. api 사용요청
        var lon, lat;
        
        map.addListener(
            "click",
            function onClick(evt){//클릭을 하였을 때의 일어나는 경우를 담은 함수
                var mapLatLng=evt.latLng;//mapLatLng이라는 변수는 클릭 이벤트를 한 위치의 latLng정보를 가지고 있다.
                
                marker1.setMap(null);//기존의 마커 삭제
                
                var markerPosition=new Tmapv2.LatLng(
                        mapLatLng._lat, mapLatLng._lng);
                
                //마커 올리기
                marker1=new Tmapv2.Marker(
                {
                    position: markerPosition,
                    icon: "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_p.png",
                    iconSize: new Tmapv2.Size(24,38),
                    map:map        
                });
                
                reverseGeo(mapLatLng._lng, mapLatLng._lat);//클릭한 이벤트 위치의 경도, 위도를 ajax통신을 이용한 메소드인 reverseGeo에 대입
                
            });
        
        function reverseGeo(lon, lat){
            $.ajax({
                method:"GET",
                url:"https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
                        //요url을 이용해 sk로 전송하면 그 주소에 대한 정보를 sk가 나한테 서버 전송해줌.
                async: false,
                data:{
                    "appKey" : "서비스키",
                    "coordType" : "WGS84GEO",
                    "addressType" : "A10",
                    "lon" : lon,
                    "lat" : lat
                },
                success: function (response){
                    //3. json에서 주소 파싱
                    var arrResult = response.addressInfo;//ajax통신을 통해 얻은 주소 정보를 변수 arrResult에 넣는다.
                    
                    /*
                    //단위..? 법정동 마지막 문자, 예시로는 방화'동', 화곡'동', 서천'읍', 종천'면'
                    var lastLegal=arrResult.legalDong.charAt(arrResult.legalDong.length-1);
                    //lastLegal에는 동, 읍, 면을 대입
                    
                    //새주소, 서울시 구로구 이런 형식
                    newRoadAddr=arrResult.city_do+' '+arrResult.gu_gun+ ' ';
                    
                    //읍면이 아니고 읍면으로 주소가 존재하면 읍, 면이라는 단위를 newRoadAddr이라는 변수에 추가
                    if(arrResult.eup_myun == ' ' &&(lastLegal=="읍"||lastLegal=="면")){
                        newRoadAddr +=arrResult.legalDong;
                    }
                    else {//아니면 읍면이라는 단위를 추가로 붙여줌
                        newRoadAddr+=arrResult.eup_myun;
                    }
                    //읍면 조사이후에 도로명 주소와 건물번호를 추가
                    newRoadAddr+=' '+arrResult.roadName+' '+arrResult.buildingIndex;
                    
                    //새주소 법정동&건물명 체크, 시골이 아닌 도시로서 읍이나 면이 아니라 '동'으로 끝난다면
                if(arrResult.legalDong!= ' ' && (lastLegal !="읍" && lastLegal!="면")){
                    
                    if(arrResult.buildingName!=' '){//만약 빌딩명이 존재를 한다면
                        newRoadAddr += (' ('+arrResult.legalDong+', '+arrResult.buildingName+') ');
                    }
                    else {
                        newRoadAddr += (' ('+arrResult.legalDong +') ');
                    }    
                }
                else if (arrResult.buildingName!=' '){
                    newRoadAddr += (' ('+arrResult.buildingName + ') ');
                }
                    
                //구주소
                jibunAddr = arrResult.city_do + ' '+ arrResult.gu_gun + ' ' + arrResult.legalDong + ' '+arrResult.ri + ' '+arrResult.bunji;
                
                //구주소 빌딩명만 존재하는 경우
                if(arrResult.buildingName != ' '){
                    jibunAddr += (' '+arrResult.buildingName);
                }
                
                result = "새주소 : " + newRoadAddr + "</br>";
                result += "지번주소 : " + jibunAddr + "</br>";*/
                //result += "위경도좌표 : " + lat + ", " + lon+"</br>";    
                result = "fullAddress :" +'"'+ arrResult.fullAddress+'"'+"</br>";
                result += "addressType :" +'"'+ arrResult.addressType+'"'+"</br>";
                result += "city_do: " + '"'+ arrResult.city_do+'"'+"</br>";
                result += "gu_gun: " + '"'+ arrResult.gu_gun+'"'+"</br>";
                result += "eup_myun: " + '"'+ arrResult.eup_myun+'"'+"</br>";
                 result += "adminDong: " + '"'+ arrResult.adminDong+'"'+"</br>";
                result += "adminDongCode: " + '"'+ arrResult.adminDongCode+'"'+"</br>";
                result += "legalDong: " + '"'+ arrResult.legalDong+'"'+"</br>";
                result += "legalDongCode: " + '"'+ arrResult.legalDongCode+'"'+"</br>";
                result += "ri: " + '"'+ arrResult.ri+'"'+"</br>";
                result += "bunji: " + '"'+ arrResult.bunji+'"'+"</br>";
                result += "roadName: " + '"'+ arrResult.roadName+'"'+"</br>";
                result += "buildingName: " + '"'+ arrResult.buildingName+'"'+"</br>";
                result += "mappingDistance: " + '"'+ arrResult.mappingDistance+'"'+"</br>";
                result += "roadCode: " + '"'+ arrResult.roadCode+'"'+"</br>";
                
                var resultDiv = document.getElementById("result");
                resultDiv.innerHTML = result;
                    },
                    error: function(request, status, error){
                        console.log("code:" + request.status + "\n"
                                + "message:" + request.responseText + "\n"
                                + "error:" + error);
                }
            });
            }
        }
        
</script>
</head>
 
<body onload="initTmap();"><!-- 맵 생성 실행 -->
    <p id="result"></p>
    <div id="map_wrap" class="map_wrap3">
        <div id="map_div"></div>
    </div>
    <div class="map_act_btn_wrap cleaer_box"></div>
</body>
</html>