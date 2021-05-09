<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
 
<head>
    
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>simpleMap2</title>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=서비스키"></script>
<script type="text/javascript">
    
    var map, marker, infoWindow;
    var arrResult;
    var markerPosition;
    
    var flag =0;
    
    function onoff(){
        if(flag==1){
            flag=0;
            }
        else if(flag==0){
            flag=1;
        }
    }
 
    
function initTmap(){
        
        
        //1. 지도를 생성한다. 지도가 들어갈 div, 넓이, 높이를 설정한다. 
        map = new Tmapv2.Map("map_div",{
            center : new Tmapv2.LatLng(37.566481622437934,126.98502302169841),
            width : "100%",
            height : "400px"
        });
        
        /*
        marker = new Tmapv2.Marker({
            icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_p.png",
            iconSize: new Tmapv2.Size(24,38),
            map : map 
        });
        */
        
        
        var lon, lat;
        
        
        map.addListener("click",
            function onClick(e){
            
            
                console.log("flag is"+flag);
            var mapLatLng=e.latLng;//이벤트 한 값의 경도와 위도
            
            if(marker){
                marker.setMap(null);
            }
            
            if (infoWindow){
                infoWindow.setVisible(false);
            }
            
            markerPosition = new Tmapv2.LatLng(
                    mapLatLng._lat, mapLatLng._lng);
            //marker의 포지션은 이벤트한 값의 경도와 위도에 위치함. 이를 markerPosition이라고 함.
            
            
            if(flag==0){
            marker = new Tmapv2.Marker({
                position : markerPosition,//위에서 정의해준 markerPosition
                icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_p.png",//아이콘은 다음 링크에서 따옴
                iconSize: new Tmapv2.Size(24,38),
                map : map
            });
            
            
            marker.addListener("click",
                    function onClick(e){
                        
                    flag==0
                    reverseGeo(markerPosition.lng(), markerPosition.lat());//클릭한 이벤트 위치의 경도, 위도를 ajax통신을 이용한 메소드인 reverseGeo에 대입
                });
        
            }    
            });
        
        function reverseGeo(lon, lat){
            console.log("lon : "+lon+ " lat : "+lat);
            
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
                
            success: function (response){
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
                        type: 2,
                        map: map
                        });
            }
            });
        }
        
        map.setCenter(new Tmapv2.LatLng(37.566481622437934,126.98502302169841));
 
}
 
 
        
</script>
</head>
 
<body onload="initTmap();"><!-- 맵 생성 실행 -->
    <div id="map_wrap" class="map_wrap3">
        <div id="map_div"></div>
    </div>
    <div class="map_act_btn_wrap cleaer_box"></div>
    <button onClick="onoff()">함수 실행</button>
</body>
</html>
