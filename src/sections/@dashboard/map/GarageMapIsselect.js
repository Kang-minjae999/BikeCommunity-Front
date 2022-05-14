import PropTypes from 'prop-types';
import { Button, Typography, Stack ,Link} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';


// ------------------------------------------------------------
GarageMapIsselect.propTypes = {
  isselect: PropTypes.object
};

export default function GarageMapIsselect({isselect}) {

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
      </Stack>
  )
}


