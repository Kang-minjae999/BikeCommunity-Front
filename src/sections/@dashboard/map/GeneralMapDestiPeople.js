import PropTypes from 'prop-types';
import { Typography, Stack ,Card, Grid, Avatar, Divider} from "@mui/material"
import GeneralMapbutton from './GeneralMapbutton';


// ------------------------------------------------------------
GeneralMapDestiPeople.propTypes = {
  isselect: PropTypes.object,
  destiUsers: PropTypes.array,
  tab: PropTypes.string,
  destiGoUserProfile: PropTypes.func,
  onSubmitDesti: PropTypes.func,
};

export default function GeneralMapDestiPeople({isselect, destiUsers, tab, destiGoUserProfile, onSubmitDesti}) {

  return (
    <Card sx={{border:1, borderColor:'darkgray'}} >
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography fontSize={15} sx={{m:2}}><strong>{isselect?.name}</strong> 가는 라이더</Typography>
          <GeneralMapbutton name={isselect?.name} tab={tab} onSubmitDesti={onSubmitDesti}/>
        </Stack>
        <Divider sx={{my:1}}/>
        {destiUsers && <Grid container sx={{ml:1}}>
        {destiUsers?.map((item) => 
          <Grid item xs={4} lg={6} key={`${item.nicknameOfPost}${item.mapId}`}>
          <Stack direction='row' alignItems='center' sx={{m:1}} onClick={() => destiGoUserProfile(item.nicknameOfPost)}>
          <Avatar alt='하지명' src={item.avatarImageURL}/>
          <Typography  variant='body2' sx={{m:1}}>{item.nicknameOfPost}</Typography>
          </Stack>
          </Grid>)}
          </Grid>}
          {!destiUsers &&
          <Stack direction='row' alignItems='center' justifyContent='center' sx={{my:1}}>
           <Typography variant='subtitle2' sx={{m:1}}>오늘 가는 라이더가 없어요!</Typography>
          </Stack>}
       </Card>
  )
}


