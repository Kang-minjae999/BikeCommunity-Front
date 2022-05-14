import PropTypes from 'prop-types';
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk"
import { useEffect, useState, useCallback} from "react"
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { useForm } from 'react-hook-form';
import { Container, Button, Card, Typography, Grid, Stack , Divider, Chip, Box } from "@mui/material"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from '../../utils/axiosriding';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// map
import useResponsive from '../../hooks/useResponsive';
import Page from '../../components/Page';
import GeneralMapweather from "../../sections/@dashboard/map/GeneralMapweather";
import GeneralMapViabutton from '../../sections/@dashboard/map/GeneralMapViabutton';
import GeneralMapMarker from '../../sections/@dashboard/map/GeneralMapMarker.png';
import GeneralMapMarkerBefore from '../../sections/@dashboard/map/GeneralMapMarkerBefore.png';
import AppRidingMapSearch from '../../sections/@dashboard/map/AppRidingMapSearch';
import GeneralMapIsselct from '../../sections/@dashboard/map/GeneralMapIsselect';
import GeneralMapDestiPeople from '../../sections/@dashboard/map/GeneralMapDestiPeople';

// ------------------------------------------------------------
GeneralMap.propTypes = {
  tab: PropTypes.string,
  userPo: PropTypes.object,
  open: PropTypes.string,
  setopen: PropTypes.func,
};

export default function GeneralMap({tab, userPo, open}) {
  const { user } = useAuth();
  const navigate = useNavigate()
  const isMountedRef = useIsMountedRef();
  const isDesktop = useResponsive('up', 'lg')
  const { enqueueSnackbar } = useSnackbar();
  const [allPositions, setAllPosition] = useState([])


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

  // 즐겨찾기 
  const [viaLike, setViaLike] = useState()
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
        routeName:[isselect.name],
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
    const ids = values.destination.map((item) => item.id)
    const name = values.destination.map((item) => item.name)
    const lats = values.destination.map((item) => item.lat)
    const lngs = values.destination.map((item) => item.lng)
    console.log(ids, name, lats, lngs)
    try {
      await axios.post(`/route/${user.nickname}`, 
      {
        routeName: '테스트',
        mapIds: ids,
        mapNames: name,
        mapLats: lats,
        mapLngs: lngs,
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


  return (
     <Page title="라이딩맵">
      <Container maxWidth='lx' disableGutters>
        {(open === 'map' ) && 
          <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <AppRidingMapSearch setPosition={setPosition}/>
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
      <Grid item xs={12} md={4} sx={{mb:2}}>
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

        {open === 'myroute' && 
        <>
          {viaLike && 
          <>
           {viaLike.map((item) => 
          <Box key={`${item.index}${item.mapNames}`}>
           <Stack direction='column' spacing={2} sx={{m:2}}>
            <Typography variant='subtitle1'>{item.routeName}</Typography>
            <Stack direction='row' spacing={1} >
            {item.mapNames.map((item, index) =>            
             <Stack direction='row' spacing={1} key={`${index}${item}`}><ArrowRightAltIcon/><Typography>{item}</Typography></Stack>)}
            </Stack>
            </Stack>
           <Divider />
           </Box>)}
           </>}
        </>}
    </Container>
    </Page>
  )
}


