import PropTypes from 'prop-types';
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk"
import { useEffect, useRef, useState} from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
// @mui
import { useForm, Controller } from 'react-hook-form';
import { Container, Button, Card, Typography, Grid, Stack ,Link, Divider, Chip, Avatar, TextField, InputAdornment, Box } from "@mui/material"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchIcon from '@mui/icons-material/Search';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// map
import { allPositions} from "./GeneralMapposition"
import useResponsive from '../../hooks/useResponsive';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import GeneralMapweather from "./GeneralMapweather";
import GeneralMapbutton from './GeneralMapbutton';
import GeneralMapViabutton from './GeneralMapViabutton';
import GeneralMapMarker from './GeneralMapMarker.png';
import GeneralMapMarkerBefore from './GeneralMapMarkerBefore.png';
import { AppRidingMapSearch } from '../../sections/@dashboard/general/riding';


// ------------------------------------------------------------
GeneralMap.propTypes = {
  tab: PropTypes.string,
};
export default function GeneralMap({tab}) {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg')
  const { enqueueSnackbar } = useSnackbar();
  const [garagetrue ,setgaragetrue] =useState(false);
  const [user, setUser] = useState({      
    center: {
    lat: '',
    lng: '',
  }})

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
            setUser({
              center: {
              lat: position.coords.latitude, 
              lng: position.coords.longitude, 
            }})
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

  const [selectedCategory, setSelectedCategory] = useState("all")

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


  const [isselect, setisselect] = useState({
    value: '',
    name: '',
    content: '',
    tel: '', 
    time: '',
    lat: '', 
    lng: '',
  });

  const [isAbout, setIsAbout] = useState(false)

    useEffect(() => {
      if(isselect.content === '정비소'){
        setgaragetrue(true)
        setweatherok(true)
      }else{
        setweatherok(true)
        setgaragetrue(false)
      }  
    }, [isselect]);


    const valueStyle = {
      borderBottom: (isDesktop ? 3 : 2),
      borderBottomColor: 'text.primary',
      fontWeight: 'bold',
    };

    const [like, setLike] = useState(false)

    const goLike = () => {
      setLike(!like)
    }

    const defaultValues = {
      name:'새로운 경로',
      destination:[]
    }

    const methods = useForm({
      defaultValues
    })

    const {
      reset,
      watch,
      control,
      setValue,
      getValues,
      handleSubmit,
      formState: { isSubmitting },
    } = methods;

    const values = watch()

    const addDesti = () => {
      setValue('destination',[...values.destination,{
        id:`${values.destination.length}`,
        name:isselect.name,
        lat:wealat,
        lng:wealng
      }])
    }
    const DeleteDesti = (data) => {
      setValue(`destination`, values.destination.filter((item) => item.id !== data.id))
    }
    
    const setPosition = (position) => { 
      setisselect(position)
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
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}} disableGutters>
        <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {tab === 'map' && 
          <>
          <AppRidingMapSearch setPosition={setPosition}/>
        </>}
        <Card sx={{border:1, borderColor:'darkgray'}}>
          <Stack direction='row' justifyContent='center' sx={{mb:1}}>
            <Button variant='text' color="inherit" size='small' type='button' id="allMenu"  onClick={all} sx={{mt:1, ml:1}}>
              <Typography variant="body2" sx={{ ...(selectedCategory === 'all' && valueStyle)}}>
              전체보기
              </Typography>
            </Button>
            <Button  variant='text' color="inherit" size='small' type='button' id="roadMenu" onClick={road} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === 'road' && valueStyle)}}>
              도로
              </Typography>
            </Button>
            <Button  variant='text' color="inherit"size='small' type='button' id="coffeeMenu" onClick={coffee} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === 'coffee' && valueStyle)}}>
              카페
              </Typography>
            </Button>
            <Button  variant='text' color="inherit" size='small' type='button' id="attractionMenu" onClick={attraction} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === 'attraction' && valueStyle)}}>
              명소
              </Typography>
            </Button>
            <Button  variant='text' color="inherit" size='small' type='button' id="garagemenu" onClick={garage} sx={{mt:1,ml:1}}>
            <Typography variant="body2" sx={{ ...(selectedCategory === 'garage' && valueStyle)}}>
              정비소
              </Typography>
            </Button>
            </Stack> 
        <Map // 지도를 표시할 Container
          id={`map`}
          center={state.center}
          isPanto
          style={{
            // 지도의 크기
            width: "100%",
            height: "50vh",
          }}
          level={9} // 지도의 확대 레벨
        >  
        <ZoomControl />
            {user && 
            <MapMarker
                position={user.center}
              />}
          {selectedCategory === "all" && 
            allPositions.map((position) => ( 
              <MapMarker
                key={`road-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}    
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}      
            {selectedCategory === "road" &&
            allPositions.map((position) => ( position.content ==='도로' && 
              <MapMarker
                key={`road-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}
          {selectedCategory === "coffee" &&
            allPositions.map((position) => ( position.content ==='카페' && 
              <MapMarker
                key={`coffee-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}
          {selectedCategory === "attraction" &&
            allPositions.map((position) => ( position.content ==='명소' && 
              <MapMarker
                key={`attraction-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}
          {selectedCategory === "garage" &&
            allPositions.map((position) => ( position.content ==='정비소' && 
              <MapMarker
                key={`garage-${position.lat},${position.lng}`}
                position={position}
                clickable
                onClick={() => setPosition(position)}
                {...((isselect.lat === position.lat && isselect.lng === position.lng) ? valueMarker  : valueMarkerBefore)}
              />
            ))}
        </Map>
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
          <GeneralMapViabutton destination={values.destination}/>
          </Stack>
          <Chip label='현재위치' size='medium' sx={{ml:1,mx:1, mb:2}}/> 
          {values.destination.map((item) => 
          <Chip icon={<ArrowRightAltIcon/>} key={item.id} label={item.name} size='medium' sx={{ml:1,mx:1, mb:2}} onDelete={() => DeleteDesti(item)}/> 
          )}
        </Card>}
      <Card sx={{border:1, borderColor:'darkgray', mb:2}}>
      <Stack spacing={2} sx={{ p: 3 }}>
      <Stack direction="row" justifyContent='space-between'>
        <Stack direction='column' alignItems='flex-start' spacing={2}>
          <Stack direction="row" alignItems='flex-start'>
            <Typography variant="subtitle1">
            {isselect.name}
            </Typography>
            <Typography variant="body2" sx={{mt:0.4}} >
              [{isselect.content}]
            </Typography>
          </Stack>
          <Stack direction="row" alignItems='flex-start'>
            <Typography variant="body2">
            {isselect.position}
            </Typography>
        </Stack>
        <Stack direction="row">
        <Link href={isselect.ontel} variant="subtitle2" color="text.primary">
        <LocalPhoneIcon/>
          </Link>
          &nbsp;
          <Link href={isselect.ontel} variant="subtitle2" color="text.primary">
          <Typography variant="body2" sx={{mt:0.2}}>
          {isselect.tel} &nbsp;
          </Typography>
          </Link> 
        </Stack>
        <Stack direction="row">
          <AccessTimeIcon/>&nbsp;
          <Typography variant="body2">
           {isselect.time}
          </Typography>
        </Stack>
        </Stack>
          <Stack direction="column" spacing={1}>     
          <Button variant="text" onClick={goLike}>
          {!like && <StarBorderIcon color='warning' fontSize='large' />}
          {like && <StarIcon color='warning' fontSize='large'/>}
          </Button>
          <Stack direction="column" alignItems='center'> 
          <Button variant='text'>
            <AddIcon color='info' fontSize='large' onClick={addDesti}/> 
          </Button>   
          <Typography variant='subtitle2'>목적지</Typography>
          </Stack>
          </Stack>
          </Stack>

        <Divider />
      <GeneralMapweather name={isselect.name} wealat={wealat} wealng={wealng} weatherok={weatherok} setweatherok={setweatherok}/>
      </Stack>
    </Card>
    </>}
    {isAbout && 
    <Card sx={{border:1, borderColor:'darkgray'}} >
        <Stack alignItems='center' justifyContent='center'>
        <GeneralMapbutton name={isselect.name} tab={tab}/>
        </Stack>
        <Divider />
       <Typography fontSize={16} sx={{m:2}}><strong>{isselect.name}</strong> 가는 라이더</Typography>
        <Divider sx={{my:1}}/>
        <Grid container sx={{ml:1}}>
        <Grid item xs={4} lg={6}>
          <Stack direction='row' alignItems='center' sx={{m:1}}>
          <Avatar alt='하지명' src='https://cdn.getnews.co.kr/news/photo/202108/544140_230503_924.jpg'/>
          <Typography  variant='body2' sx={{m:1}}>하지명</Typography>
          </Stack>
          </Grid>
          <Grid item xs={4} lg={6}>
          <Stack direction='row' alignItems='center' sx={{m:1}}>
          <Avatar alt='하지명' src='https://cdn.getnews.co.kr/news/photo/202108/544140_230503_924.jpg'/>
          <Typography  variant='body2' sx={{m:1}}>하지정맥</Typography>
          </Stack>
          </Grid>
          <Grid item xs={4} lg={6}>
          <Stack direction='row' alignItems='center' sx={{m:1}}>
          <Avatar alt='하지명' src='https://cdn.getnews.co.kr/news/photo/202108/544140_230503_924.jpg'/>
          <Typography  variant='body2' sx={{m:1}}>하루하루</Typography>
          </Stack>
          </Grid>
          <Grid item xs={4} lg={6}>
          <Stack direction='row' alignItems='center' sx={{m:1}}>
          <Avatar alt='하지명' src='https://cdn.getnews.co.kr/news/photo/202108/544140_230503_924.jpg'/>
          <Typography  variant='body2' sx={{m:1}}>하준숴이</Typography>
          </Stack>
          </Grid>
          <Grid item xs={4} lg={6}>
          <Stack direction='row' alignItems='center' sx={{m:1}}>
          <Avatar alt='하지명' src='https://cdn.getnews.co.kr/news/photo/202108/544140_230503_924.jpg'/>
          <Typography  variant='body2' sx={{m:1}}>하자드</Typography>
          </Stack>
          </Grid>
        </Grid>
       </Card>}
        </Grid>
        </Grid>
        </Container>
    </Page>
  )
}


