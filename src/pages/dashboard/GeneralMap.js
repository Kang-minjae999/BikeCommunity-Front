import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useEffect, useState} from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
// @mui
import { Container, Button, Card, Typography, Grid, Stack,CardHeader,Link, Divider } from "@mui/material"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// map
import { allPositions, coffeePositions, garagePositions, roadPositions, attractionPositions} from "./GeneralMapposition"
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import useSettings from '../../hooks/useSettings';
import GeneralMapweather from "./GeneralMapweather";


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

  const [isAbout, setIsAbout] = useState(false)

    useEffect(() => {
      if(isselect.content === '[정비소]'){
        setgaragetrue(true)
        setweatherok(true)
      }else{
        setweatherok(true)
        setgaragetrue(false)
      }  
    }, [isselect]);

    const copy = () =>{
      enqueueSnackbar('주소가 클립보드에 복사되었습니다!')
    }



  return (
     <Page title="라이딩맵">
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}} disableGutters>
      {/* <HeaderBreadcrumbs
          heading="RidingMap"
          links={[
            { name: '' },
          ]}
        /> */}
        
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
        <Card >
          <Stack direction='row' justifyContent='center' >
            <Button variant='outlined' color="inherit" size='small' type='button' id="allMenu"  onClick={all} sx={{mt:1, ml:1}}>
              <Typography variant="body2"sx={{my:1}}>
              전체보기
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit" size='small' type='button' id="roadMenu" onClick={road} sx={{mt:1,ml:1}}>
            <Typography variant="body2">
              도로
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit"size='small' type='button' id="coffeeMenu" onClick={coffee} sx={{mt:1,ml:1}}>
            <Typography variant="body2">
              카페
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit" size='small' type='button' id="attractionMenu" onClick={attraction} sx={{mt:1,ml:1}}>
            <Typography variant="body2">
              명소
              </Typography>
            </Button>
            <Button  variant='outlined' color="inherit" size='small' type='button' id="garagemenu" onClick={garage} sx={{mt:1,ml:1}}>
            <Typography variant="body2">
              정비소
              </Typography>
            </Button>
            </Stack> 
            <br/>
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
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + setIsAbout(true)}
              />
            ))}      
            {selectedCategory === "road" &&
            roadPositions.map((position) => (
              <MapMarker
                key={`road-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + setIsAbout(true)}
              />
            ))}
          {selectedCategory === "coffee" &&
            coffeePositions.map((position) => (
              <MapMarker
                key={`coffee-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + setIsAbout(true)}
              />
            ))}
          {selectedCategory === "attraction" &&
            attractionPositions.map((position) => (
              <MapMarker
                key={`attraction-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + setIsAbout(true)}
              />
            ))}
          {selectedCategory === "garage" &&
            garagePositions.map((position) => (
              <MapMarker
                key={`garage-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setisselect(position) + setwealat(position.lat) + setwealng(position.lng) + setIsAbout(true)}
              />
            ))}
        </Map>
        </Card>
        </Grid>
        <Grid item xs={12} md={4}>
 
      {isAbout && <Card>
      <CardHeader title="About" sx={{mb:1}}/>
      
      <Stack spacing={2} sx={{ p: 3 }}>
      <Stack direction="row">
      <AssistantPhotoIcon/>  &nbsp;
        <Typography variant="subtitle1">
       {isselect.name}
        </Typography>
        <Typography variant="body2" sx={{mt:0.2}}>
         {isselect.content}
          </Typography>
        </Stack>
        <Divider />

        <Stack direction="row">
        <LocationOnIcon/>&nbsp;
        <CopyToClipboard text={isselect.position} onCopy={copy}>
        <Link component='button' variant="subtitle2" color="text.primary">
          <Typography variant="body2">
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
          {isselect.tel} &nbsp;&nbsp;
          </Typography>
          </Link> 
          <AccessTimeIcon/>&nbsp;
          <Typography variant="body2">
           {isselect.time}
          </Typography>
        </Stack>
        <Divider />
        {garagetrue ? <div>정비소 예약이나 프로필</div> : ''}

      <GeneralMapweather name={isselect.name} wealat={wealat} wealng={wealng} weatherok={weatherok} setweatherok={setweatherok}/>
     
      <Divider />
      </Stack>
    </Card>}
        </Grid>
        </Grid>
        </Container>
    </Page>
  )
}


