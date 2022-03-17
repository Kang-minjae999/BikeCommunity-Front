import { Map, MapMarker,MarkerClusterer,panTo ,getPosition, useMap} from "react-kakao-maps-sdk"
import { useCallback, useEffect,useRef,useState} from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
// @mui
import { Container, Button, Card, Typography, Grid, Stack,CardHeader,Link, Divider, Skeleton } from "@mui/material"
import { styled } from '@mui/material/styles';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SmsIcon from '@mui/icons-material/Sms';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddRoadIcon from '@mui/icons-material/AddRoad';
// map
import { allPositions, coffeePositions, garagePositions, roadPositions, attractionPositions} from "./GeneralMapposition"
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Iconify from '../../components/Iconify';
import GeneralMapweather from "./GeneralMapweather";


// ------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ------------------------------------------------------------

export default function GeneralMap() {
  const { themeStretch } = useSettings();
  
  const { enqueueSnackbar } = useSnackbar();
  const [garagetrue ,setgaragetrue] =useState(false);

    const [state, setState] = useState({
      center: {
        lat: 36.0400,
        lng: 127.8491,
      },
      errMsg: null,
      isLoading: true,
    })
    const [wealat,setwealat] = useState('')
    const [wealng,setwealng] = useState('')
    const [weatherok ,setweatherok] = useState(false)

  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setState((prev) => ({
              ...prev,
              center: {
                lat: position.coords.latitude, 
                lng: position.coords.longitude, 
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
        setState((prev) => ({
          ...prev,
          errMsg: "현재 위치를 알 수 없어요..",
          isLoading: false,
        }))
      }
    }, [])


/*   const allImageSrc =
    "/allicon.png"
  const roadImageSrc =
    "/roadicon.png"
  const coffeeImageSrc =
    "/coffeeicon.png"
  const attractionImageSrc =
    "/attractionicon.png"
  const garageImageSrc =
    "/garageicon.png"

  const iimageSize = { width: 22, height: 22 }
  const sspriteSize = { width: 36, height: 98 }
  const coffeeOrigin = { x: 10, y: 0 }
  const storeOrigin = { x: 10, y: 36 }
  const carparkOrigin = { x: 10, y: 72 }
 */
  const all = () => {
    setSelectedCategory("all")
  }
  const road = () => {
    setSelectedCategory("road")
  }
  const coffee = () => {
    setSelectedCategory("coffee")
  }
  const attraction = () => {
    setSelectedCategory("attraction")
  }
  const garage = () => {
    setSelectedCategory("garage")
  }

  

  const [selectedCategory, setSelectedCategory] = useState("all")

  const [isselect, setisselect] = useState({
    value: '',
    name: '',
    content: '',
    tel: '', 
    time: '',
  });

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
   },[isselect] )

    useEffect(() => {
      valueon()
    }, [valueon]);

    useEffect(() => {
      if(isselect.content === '[정비소]'){
        setgaragetrue(true)
      }else{
        
        setgaragetrue(false)
      }  
    }, [isselect]);

    const copy = () =>{
      enqueueSnackbar('주소가 클립보드에 복사되었습니다!')
    }



  return (
     <Page title="라이딩맵">
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}}>
      <HeaderBreadcrumbs
          heading="RidingMap"
          links={[
            { name: '' },
          ]}
        />
        
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
        {/* 지도 위에 표시될 마커 카테고리 */}
        <Card>
            <Button variant='outlined' color="inherit" size='small' type='button' id="allMenu"  onClick={all} sx={{mt:1, ml:1 ,mb:2}}>
              <Typography variant="body2">
              전체보기
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit" size='small' type='button' id="roadMenu" onClick={road} sx={{mt:1,ml:1,mb:2}}>
            <Typography variant="body2">
              도로
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit"size='small' type='button' id="coffeeMenu" onClick={coffee} sx={{mt:1,ml:1,mb:2}}>
            <Typography variant="body2">
              카페
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit" size='small' type='button' id="attractionMenu" onClick={attraction} sx={{mt:1,ml:1,mb:2}}>
            <Typography variant="body2">
              명소
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit" size='small' type='button' id="garagemenu" onClick={garage} sx={{mt:1,ml:1,mb:2}}>
            <Typography variant="body2">
              정비소
              </Typography>
            </Button><br/>
        <Map // 지도를 표시할 Container
          id={`map`}
          center={state.center}
          style={{
            // 지도의 크기
            width: "100%",
            height: "60vh",
          }}
          level={13} // 지도의 확대 레벨
        >  
          {selectedCategory === "all" && 
            allPositions.map((position) => (
              <MapMarker
                key={`road-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + valueon()}
              />
            ))}      
            {selectedCategory === "road" &&
            roadPositions.map((position) => (
              <MapMarker
                key={`road-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + valueon()}
              />
            ))}
          {selectedCategory === "coffee" &&
            coffeePositions.map((position) => (
              <MapMarker
                key={`coffee-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + valueon()}
              />
            ))}
          {selectedCategory === "attraction" &&
            attractionPositions.map((position) => (
              <MapMarker
                key={`attraction-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + valueon()}
              />
            ))}
          {selectedCategory === "garage" &&
            garagePositions.map((position) => (
              <MapMarker
                key={`garage-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + valueon()}
              />
            ))}
        </Map>
        </Card>
        </Grid>
        <Grid item xs={12} md={4}>

        <Card>
      <CardHeader title="About"/>
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
          </Link> &nbsp;&nbsp;
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


