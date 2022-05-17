// @mui
import { Card, CardHeader,Divider, Typography} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Faqsqna() {
/*   const {user} = useAuth()
  const {id} = user
  const accessToken = window.localStorage.getItem('accessToken');

  const Qna = async () => {
    const responce = await axios.get('qnas', {
      headers:{
        Authorization: accessToken,
      },
      params: { id },
    })
    const data = responce.data.data
    // responce data에 질문과 답변 
  } 
    */
  return (
    <Card sx={{mt:2, mb:2}}>
      <CardHeader title='질문 답변' sx={{mb:1}}/>
      <Divider/>
      <Typography variant='h6' sx={{ml:1,mb:1,mt:1}}><QuestionMarkIcon/> :</Typography> 
      <Typography variant='body2' sx={{ml:1,mb:3}}><QuestionAnswerIcon/>  : </Typography> 
{/*       <Typography variant='h6' sx={{ml:1}}>{data.qna}</Typography> 
      <Typography variant='body2' sx={{ml:1,mb:3}}>{data.answer}</Typography>  */}
    </Card>
    /* 질문 있으면 있다고 없으면 없다고.. */
  );
}
