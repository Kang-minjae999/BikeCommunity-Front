import PropTypes from 'prop-types';
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk"
import { useEffect, useState, useCallback} from "react"
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { useForm } from 'react-hook-form';
import { Container, Button, Card, Typography, Grid, Stack , Divider, Chip } from "@mui/material"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from '../../utils/axiosriding';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// map
import useResponsive from '../../hooks/useResponsive';
import Page from '../../components/Page';
import GeneralMapweather from "../../sections/@dashboard/riding/GeneralMapweather";
import GeneralMapViabutton from '../../sections/@dashboard/riding/GeneralMapViabutton';
import GeneralMapMarker from '../../sections/@dashboard/riding/GeneralMapMarker.png';
import GeneralMapMarkerBefore from '../../sections/@dashboard/riding/GeneralMapMarkerBefore.png';
import { AppRidingMapSearch } from '../../sections/@dashboard/general/riding';
import GeneralMapIsselct from '../../sections/@dashboard/riding/GeneralMapIsselect';
import { GeneralMapDestiPeople } from '../../sections/@dashboard/riding';


// ------------------------------------------------------------
GeneralMap.propTypes = {
  tab: PropTypes.string,
  setState: PropTypes.func,
  userPo: PropTypes.object,
};

export default function GeneralMap({tab, userPo, setState}) {
  const { user } = useAuth();
  const navigate = useNavigate()
  const isMountedRef = useIsMountedRef();
  const isDesktop = useResponsive('up', 'lg')
  const { enqueueSnackbar } = useSnackbar();
  const [allPositions, setAllPosition] = useState([])

  // 지도 & 즐겨찾기
  const [open, setopen] = useState('map')

  // 선택 카테고리
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 날씨 변수
  const [wealat,setwealat] = useState()
  const [wealng,setwealng] = useState()
  const [weatherok ,setweatherok] = useState(false)

  // 마커 가는 사람 수 
  const [destiUsers, setDestiUsers] = useState()

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

  // 가는 라이더 열기
  const [isAbout, setIsAbout] = useState(false)

  // 마커 가는 사람 수 
  const [viaLike, setViaLike] = useState()

  // 내 라이딩 기록 
  const [viaRecord, setViaRecord] = useState()
  
  // ------------------------------------------------

  // 마커 불러오기
  const getMapMarker = useCallback(async () => {
      try {
        const response = await axios.get(`/marker`);
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

  // 마커 가는 사람 수 불러오기
  const getDestiUsers = useCallback(async () => {
    try {
      const response = await axios.get(`/riding/map/${isselect.id}`);
      if (isMountedRef.current) {
        setDestiUsers(response.data.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, isselect]);

  useEffect(() => {
    if(isselect.id){
      getDestiUsers();
    }
  }, [getDestiUsers, isselect.id]);

  // 여기로 갈게요
  const onSubmitDesti = async () => {
    if(!user){
      enqueueSnackbar('로그인 후 이용해주세요!');
      return ;
    }
    try {
      await axios.post(`/riding/${user.nickname}`, {mapId:isselect.id, mapName:isselect.name} );
      enqueueSnackbar('목적지 추가 완료!');
    } catch (error) {
      console.error(error);
    }
  };

  // 여러 마커 갈게요 등록 - 수정해야댐
  const onSubmitViaDesti = async () => {
    if(!user){
      enqueueSnackbar('로그인 후 이용해주세요!');
      return ;
    }
    const accessToken = window.localStorage.getItem('accessToken');
    const viaDesti = values.destination.map((item) => item.id)
    try {
      await axios.post(`/riding/${user.nickname}`, viaDesti , {
        headers: {
          'content-type': 'multipart/form-data',
          authorization: accessToken,
        },
      });
      enqueueSnackbar('목적지 추가 완료!');
    } catch (error) {
      console.error(error);
    }
  };

  // 마커 저장
  const onSubmitMarkerLike = async () => {
    if(!user){
      enqueueSnackbar('로그인 후 이용해주세요!');
      return ;
    }
    console.log( [isselect.id], [isselect.name], [isselect.lat], [isselect.lng],)
    try {
      await axios.post(`/route/${user.nickname}`, 
      {
        routeName:'테스트',
        mapIds: [isselect.id],
        mapNames: [isselect.name],
        mapLats: [isselect.lat],
        mapLngs: [isselect.lng],
        isPublic:true
      });
      enqueueSnackbar('목적지 추가 완료!');
    } catch (error) {
      console.error(error);
    }
  };

  // 경로 저장
  const onSubmitViaLike = async () => {
    if(!user){
      enqueueSnackbar('로그인 후 이용해주세요!');
      return ;
    }
    const viaDesti = values.destination.map((item) => item.id)
    try {
      await axios.post(`/route/${user.nickname}`, 
      {
        mapIds:viaDesti,
        routeName:'테스트',
        isPublic:true
      });
      enqueueSnackbar('목적지 추가 완료!');
    } catch (error) {
      console.error(error);
    }
  };
  
  // 저장된 경로 불러오기
  const getViaLike = useCallback(async () => {
    try {
      const response = await axios.get(`/route/nickname/${user?.nickname}`);
      if (isMountedRef.current) {
        setViaLike(response.data.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, user]);

  useEffect(() => {
      getViaLike()
  }, [getViaLike])

    const defaultValues = {
      name:'새로운 경로',
      destination:[]
    }

    const methods = useForm({
      defaultValues
    })

  const {
    watch,
    setValue,
  } = methods;

  const values = watch()

  const addDesti = () => {
    setValue('destination',[...values.destination,{
      id:isselect.id,
      name:isselect.name,
      lat:wealat,
      lng:wealng
    }])
  }

  const DeleteDesti = (data) => {
    setValue(`destination`, values.destination.filter((item) => item.id !== data.id))
  }

  const setPosition = (position) => { 
    getPositionDetail(position)
    setwealat(position.lat)
    setwealng(position.lng)
    setIsAbout(true)
    setState({
      center: {
        lat: position.lat,
        lng: position.lng,
      },
      errMsg: null,
      isLoading: true,
    })
  }

  // 프로필 이동
  const destiGoUserProfile = (nick) => {
    navigate(`/dashboard/user/profile/${nick}`)
  }

  const MarkerGoUserProfile = (nick) => {
    navigate(`/dashboard/user/profile/${nick}`)
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
  const valueStyle = {
    borderBottom: (isDesktop ? 3 : 2),
    borderBottomColor: 'text.primary',
    fontWeight: 'bold',
  };

  console.log(viaLike)

  return (
     <Page title="라이딩맵">
      <Container maxWidth='lx' sx={{mt:2}} disableGutters>
      {tab === 'map' &&  
      <>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>        
        <Button variant={open === 'map' ? 'contained' : 'outlined'} size='large' onClick={() => setopen('map')} color='inherit' sx={{mb:2}}>지도</Button> 
        <Button variant={open === 'myroute' ? 'contained' : 'outlined'} size='large' onClick={() => setopen('myroute')} color='inherit' sx={{mb:2}}>내 경로 / 즐겨찾기</Button>
      </Stack>

        </>}

        {open === 'map' && 
          <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {tab === 'map' && 
          <>
          <AppRidingMapSearch setPosition={setPosition}/>
        </>}
        <Card sx={{border:1, borderColor:'darkgray'}}>
          <Stack direction='row' justifyContent='center' sx={{mb:1}}>
            <Button variant='text' color="inherit" size='small' type='button' id="allMenu"  onClick={() => setSelectedCategory("all")} sx={{mt:1, ml:1}}>
              <Typography variant="body2" sx={{ ...(selectedCategory === 'all' && valueStyle)}}>
              전체보기
              </Typography>
            </Button>
            <Button  variant='text' color="inherit" size='small' type='button' id="roadMenu" onClick={() => setSelectedCategory("도로")} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === '도로' && valueStyle)}}>
              도로
              </Typography>
            </Button>
            <Button  variant='text' color="inherit"size='small' type='button' id="coffeeMenu" onClick={() => setSelectedCategory("카페")} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === '카페' && valueStyle)}}>
              카페
              </Typography>
            </Button>
            <Button  variant='text' color="inherit" size='small' type='button' id="attractionMenu" onClick={() => setSelectedCategory("명소")} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === '명소' && valueStyle)}}>
              명소
              </Typography>
            </Button>
            <Button  variant='text' color="inherit" size='small' type='button' id="garagemenu" onClick={() => setSelectedCategory("정비소")} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === '정비소' && valueStyle)}}>
              정비소
              </Typography>
            </Button>
            </Stack> 
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
          {selectedCategory === "all" && 
            allPositions.map((position) => ( 
              <MapMarker
                key={`all-${position.id},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}    
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}      
            {selectedCategory === "도로" &&
            allPositions.map((position) => ( position.content === '도로' && 
              <MapMarker
                key={`road-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}
          {selectedCategory === "카페" &&
            allPositions.map((position) => ( position.content ==='카페' && 
              <MapMarker
                key={`coffee-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}
          {selectedCategory === "명소" &&
            allPositions.map((position) => ( position.content === '명소' && 
              <MapMarker
                key={`attraction-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}
          {selectedCategory === "정비소" &&
            allPositions.map((position) => ( position.content ==='정비소' && 
              <MapMarker
                key={`garage-${position.lat},${position.lng}`}
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
      {!isAbout && <Card sx={{border:1, borderColor:'darkgray'}}><Typography variant='body2'sx={{m:2}}><strong>마커</strong>를 클릭해주세요!</Typography></Card>}
      {(isAbout && tab === 'map') &&
      <> 
       {values.destination.length > 0 && <Card sx={{border:1, borderColor:'darkgray', mb:2}}>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='subtitle1' sx={{ml:2, my:2}}>
            새로운 경로
          </Typography>
          <GeneralMapViabutton destination={values.destination} onSubmitViaDesti={onSubmitViaDesti} onSubmitViaLike={onSubmitViaLike}/>
          </Stack>
          <Chip label='현재위치' size='medium' sx={{ml:1,mx:1, mb:2}}/> 
          {values.destination.map((item) => 
          <Chip icon={<ArrowRightAltIcon/>} key={item.id} label={item.name} size='medium' sx={{ml:1,mx:1, mb:2}} onDelete={() => DeleteDesti(item)}/> 
          )}
        </Card>}
      <Card sx={{border:1, borderColor:'darkgray', mb:2}}>
      <Stack spacing={2} sx={{ p: 3 }}>
        {isselect && <GeneralMapIsselct isselect={isselect} onSubmitMarkerLike={onSubmitMarkerLike} addDesti={addDesti} MarkerGoUserProfile={MarkerGoUserProfile}/>}
        <Divider />
      <GeneralMapweather name={isselect.name} wealat={wealat} wealng={wealng} weatherok={weatherok} setweatherok={setweatherok}/>
      </Stack>
    </Card>
    </>}
    {isAbout && isselect && destiUsers &&
    <GeneralMapDestiPeople isselect={isselect} destiUsers={destiUsers} tab={tab} onSubmitDesti={onSubmitDesti} destiGoUserProfile={destiGoUserProfile}/>}
        </Grid>
        </Grid>}

        {open === 'myroute'&& 
        <>
          {viaLike && 
          <>
           {viaLike.map((item) => 
          <Card key={`${item.index}${item.mapNames}`}>
           <Stack >
            {item.mapNames}
           </Stack>
           </Card>)}
           </>}
        </>}
    </Container>
    </Page>
  )
}


