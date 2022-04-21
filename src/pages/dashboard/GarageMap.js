import { Map, MapMarker,MarkerClusterer,panTo ,getPosition, useMap} from "react-kakao-maps-sdk"
import { useCallback, useEffect,useRef,useState} from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
// @mui
import { Container, Button, Card, Typography, Grid, Stack,CardHeader,Link, Divider } from "@mui/material"
import { styled } from '@mui/material/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SmsIcon from '@mui/icons-material/Sms';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// map
import {allPositions} from "./GeneralMapposition"
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Iconify from '../../components/Iconify';
import GeneralMapweather from "./GarageMapweather";


// ------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ------------------------------------------------------------

export default function GarageMap() {
  const { themeStretch } = useSettings();
  
  const { enqueueSnackbar } = useSnackbar();

  const [garagetrue ,setgaragetrue] =useState(false);

    const [state, setState] = useState({
      center: {
        lat: 37.498004414546934,
        lng: 127.02770621963765,
      },
      errMsg: null,
      isLoading: true,
    })
    const [wealat,setwealat] = useState('')
    const [wealng,setwealng] = useState('')
    const [weatherok ,setweatherok] = useState(false)

  
    useEffect(() => {
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setState((prev) => ({
              ...prev,
              center: {
                lat: position.coords.latitude, // 위도
                lng: position.coords.longitude, // 경도
              },
              isLoading: false,
            }))
          },
          (err) => {
            setState((prev) => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }))
          }
        )
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        setState((prev) => ({
          ...prev,
          errMsg: "위치를 알 수 없어요..",
          isLoading: false,
        }))
      }
    }, [])

  const markerImageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png"

  const iimageSize = { width: 22, height: 26 }
  const sspriteSize = { width: 36, height: 98 }

  const all = () => {
    setSelectedCategory("garage")
  }
  const storeOrigin = { x: 10, y: 36 }
  const [selectedCategory, setSelectedCategory] = useState("garage")

  const [isselect, setisselect] = useState([{
    value: '',
    name: '',
    content: '',
    tel: '', 
    time: '',
  }]);

  const [values, setvalues] = useState([{
    value: '',
    name: '',
    content: '',
    tel: '', 
    time: '',
  }]);

  const valueon = useCallback(
    () => {
      setweatherok(true)
   },[isselect])

    useEffect(() => {
      valueon()
    }, [valueon]);

    useEffect(() => {
      if(values.content === '[정비소]'){
        setgaragetrue(true)
      }else{
        
        setgaragetrue(false)
      }
     
    }, [values]);
    
    const copy = () =>{
      enqueueSnackbar('주소가 클립보드에 복사되었습니다!')
    }



  return (
     <Page title="정비소 맵">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{mt:2}}>
      <HeaderBreadcrumbs
          heading="GarageMap"
          links={[
            { name: '' },
          ]}
        />
        
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
        {/* 지도 위에 표시될 마커 카테고리 */}
        <Card>
{/*         <CardHeader title='Category' sx={{mb:2}}/>
            <Button variant='outlined' color="inherit" size='small' type='button' id="allMenu"  onClick={all} sx={{ml:1 ,mb:2}}>
              <Typography variant="body2">
              전체보기
              </Typography>
            </Button><br/> */}
        <Map // 지도를 표시할 Container
          id={`map`}
          center={state.center}
          style={{
            // 지도의 크기
            width: "100%",
            height: "60vh",
          }}
          level={11} // 지도의 확대 레벨
        >  
          {selectedCategory === "garage" &&
            allPositions.map((position) => ( 
              <MapMarker
                key={`garage-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) 
                  + setwealat(position.lat) + setwealng(position.lng) + valueon()}
              />
            ))}
        </Map>
        </Card>
        </Grid>

        
        <Grid item xs={12} md={4}>
        <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
      <Stack direction="row">
      <AssistantPhotoIcon/>  &nbsp;
        <Typography variant="subtitle1">
       {isselect.name}
        </Typography>
        <Typography variant="body2">
         {isselect.content}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row">
        <LocationOnIcon/>&nbsp;
        <CopyToClipboard text={isselect.position} onCopy={copy}>
        <Link component='button' variant="subtitle2" color="text.primary">
          <Typography variant="body2" >
          {isselect.position}
          </Typography>
          </Link>
          </CopyToClipboard>
        </Stack>

        <Stack direction="row">
        <Link href={isselect.ontel} variant="subtitle2" color="text.primary">
        <LocalPhoneIcon/>
          </Link>
          &nbsp;
        <Link href={isselect.ontel} variant="subtitle2" color="text.primary">
          <Typography variant="body2">
          {isselect.tel}
          </Typography>
          </Link>
        </Stack>

        <Stack direction="row">
        <Link href={isselect.onsms} variant="subtitle2" color="text.primary">
        <SmsIcon/>
          </Link>
          &nbsp;
        <Link href={isselect.onsms} variant="subtitle2" color="text.primary">
          <Typography variant="body2">{isselect.tel}</Typography>
          </Link>
        </Stack>

        <Stack direction="row">
        <AccessTimeIcon/>&nbsp;
          <Typography variant="body2">
           {isselect.time}
          </Typography>
        </Stack>
        <Divider />

      <GeneralMapweather name={isselect.name} wealat={wealat} wealng={wealng} weatherok={weatherok} setweatherok={setweatherok}/>
      
      <Divider />
        {garagetrue ? <div>정비소 예약이나 프로필 가게 해주세열</div> : ''}
      </Stack>
        </Card>
        </Grid>
        </Grid>
      </Container>
    </Page>
  )
}


