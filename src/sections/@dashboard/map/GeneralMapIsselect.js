import PropTypes from 'prop-types';
import { Button, Typography, Stack ,Link} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';


// ------------------------------------------------------------
GeneralMapIsselct.propTypes = {
  isselect: PropTypes.object,
  onSubmitMarkerLike: PropTypes.func,
  addDesti: PropTypes.func,
  MarkerGoUserProfile: PropTypes.func,
};

export default function GeneralMapIsselct({isselect, onSubmitMarkerLike, addDesti, MarkerGoUserProfile}) {

  return (
    <Stack direction="row" justifyContent='space-between'>
    <Stack direction='column' alignItems='flex-start' spacing={2}>
      <Stack direction="row" alignItems='flex-start'>
        <Typography variant="subtitle1">
        {isselect?.name}
        </Typography>
        <Typography variant="body2" sx={{mt:0.2}} >
          [{isselect?.content}]
        </Typography>
      </Stack>
      <Stack direction="row" alignItems='flex-start'>
        <LocationOnIcon sx={{mr:1}}/>
        <Typography variant="body2">
        {isselect?.address}
        </Typography>
    </Stack>
    <Stack direction="row">
    <Link href={`tel:${isselect?.tel}`} variant="subtitle2" color="text.primary">
    <LocalPhoneIcon sx={{mr:1}}/>
      </Link>
      <Link href={`tel:${isselect?.tel}`} variant="subtitle2" color="text.primary">
      <Typography variant="body2" sx={{mt:0.2}}>
      {isselect?.tel}
      </Typography>
      </Link> 
    </Stack>
    <Stack direction="row">
      <AccessTimeIcon sx={{mr:1}}/>
      <Typography variant="body2">
       {isselect?.time}
      </Typography>
    </Stack>
    </Stack>
      <Stack direction="column" alignItems='center' spacing={1} sx={{mb:2}}>     
      <Button variant="text" onClick={onSubmitMarkerLike}>
        <StarIcon color='warning' fontSize='large'/>
      </Button>
      <Button variant='text'>
        <AddIcon color='secondary' fontSize='large' onClick={addDesti}/> 
      </Button> 
      {isselect?.profile && 
       <Button variant='text'>
      <AccountBoxOutlinedIcon color='action' fontSize='large' onClick={() => MarkerGoUserProfile(isselect.profile)}/>
      </Button>} 
      </Stack>
      </Stack>
  )
}


