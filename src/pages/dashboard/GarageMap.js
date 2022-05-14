import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk"
import { useEffect, useState, useCallback} from "react"
// @mui
import { Container, Card, Grid, Stack , Divider} from "@mui/material"
import axios from '../../utils/axiosriding';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// map
import Page from '../../components/Page';
import GeneralMapweather from "../../sections/@dashboard/map/GeneralMapweather";
import GeneralMapMarker from '../../sections/@dashboard/map/GeneralMapMarker.png';
import GeneralMapMarkerBefore from '../../sections/@dashboard/map/GeneralMapMarkerBefore.png';
import { AppRidingMapSearch, GarageMapIsselect } from '../../sections/@dashboard/map';

// ------------------------------------------------------------
export default function GarageMap() {
  const isMountedRef = useIsMountedRef();
  const [allPositions, setAllPosition] = useState([])

  // 날씨 변수
  const [wealat,setwealat] = useState()
  const [wealng,setwealng] = useState()
  const [weatherok ,setweatherok] = useState(false)
  
  const [userPo ,setUserPo] = useState({
    lat: '',
    lng: ''
  })

  // 선택 마커
  const [isselect, setisselect] = useState({
    id: '',
    profile: '',
    name: '',
    content: '',
    tel: '', 
    time: '',
    lat: '', 
    lng: '',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPo = {lat:position.coords.latitude, lng: position.coords.longitude}
        setUserPo(userPo)})
  }, [])
  

  // ------------------------------------------------

  // 마커 불러오기
  const getMapMarker = useCallback(async () => {
      try {
        const response = await axios.get(`/marker?content=정비소`);
        if (isMountedRef.current) {
          setAllPosition(response.data.data.content);
        }
      } catch (error) {
        console.error(error);
      }
  }, [isMountedRef])

  
  // 마커 디테일 불러오기
  const getPositionDetail = useCallback(async (position) => {
    try {
      const response = await axios.get(`/marker/detail/${position.id}`);
      if (isMountedRef.current) {
        setisselect(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMapMarker()
  }, [getMapMarker])

  const setPosition = (position) => { 
    getPositionDetail(position)
    setwealat(position.lat)
    setwealng(position.lng)
  }

  // 스타일
  const valueMarker = {
    zIndex: 99,
    image:{
      src:GeneralMapMarker,
      size:{width:48, height:48},
      options:{x:24, y:0}
    }}

  const valueMarkerBefore = {
    zIndex: 1,
    image:{
      src:GeneralMapMarkerBefore,
      size:{width:32, height:32},
      options:{x:16, y:0}
    }}


  return (
     <Page title="라이딩맵">
      <Container maxWidth='lx' sx={{mt:2}} disableGutters>
          <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <AppRidingMapSearch setPosition={setPosition}/>
        <Card sx={{border:1, borderColor:'darkgray'}}>
        {userPo && 
        <Map // 지도를 표시할 Container
          id={`map`}
          center={userPo}
          isPanto
          style={{
            // 지도의 크기
            width: "100%",
            height: "50vh",
          }}
          level={9} // 지도의 확대 레벨
        >  
        <ZoomControl />
            {userPo && 
            <MapMarker
                position={userPo}
              />}
            {allPositions.map((position) => ( 
              <MapMarker
                key={`all-${position.id},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}    
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}      
        </Map>}
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{mb:5}}>
      {isselect.id && <Card sx={{border:1, borderColor:'darkgray', mb:2}}>
          <Stack spacing={2} sx={{ p: 3 }}>
            <GarageMapIsselect isselect={isselect}/>
            <Divider />
          <GeneralMapweather name={isselect.name} wealat={wealat} wealng={wealng} weatherok={weatherok} setweatherok={setweatherok}/>
          </Stack>
        </Card>}
        </Grid>
        </Grid>
    </Container>
    </Page>
  )
}


