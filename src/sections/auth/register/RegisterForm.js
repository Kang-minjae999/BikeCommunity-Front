import * as Yup from 'yup';
import { useState, React } from 'react';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Button,
  Link,
  Divider,
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DaumPostcode from 'react-daum-postcode';
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox, RHFRadioGroup } from '../../../components/hook-form';
import Regicheck1 from './Rescheck1';
import Regicheck2 from './Rescheck2';
import Regicheck3 from './Rescheck3';
// import Phonecheck from './Phonecheck';

// ----------------------------------------------------------------------
export default function RegisterForm() {

  const SEX_CATEGORY_OPTIONS = [
    '남자', 
    '여자'
  ]

  const { register } = useAuth();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('유효한 이메일 주소를 입력해주세요.').required('이메일을 입력해주세요.'),
    password: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[0-9])(?=.*[~!@#$%^&*()_+-=])[a-z\d~!@#$%^&*()_+-=]{8,}$/,
        '최소 8자 이상으로 특수문자, 숫자를 최소 한개씩 포함해야 합니다.'
      )
      .min(8, '비밀번호는 최소 8자 이상입니다.'),
    password2: Yup.string()
      .required('비밀번호를 입력해주세요.')
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
    name: Yup.string().required('이름을 입력해주세요.'),
    sex: Yup.string().required('성별을 입력해주세요.'),
    nickname: Yup.string()
      .required('닉네임을 입력해주세요.')
      .max(8, '닉네임은 8자리 이하로 입력해주세요.')
      .min(2, '닉네임은 2자리 이상으로 입력해주세요.'),
    birthday: Yup.string()
      .required('생일을 입력해주세요.')
      .max(6, '8자리를 입력해주세요.')
      .min(6, '8자리를 입력해주세요.')
      .matches(/^[0123456789]*$/, '숫자만 적어주세요. '),
    phoneNumber: Yup.string()
      .required('핸드폰 번호를 입력해주세요.')
      .matches(/^[0123456789]*$/, '숫자만 적어주세요. ')
      .max(11, '11자리를 입력해주세요.')
      .min(11, '11자리를 입력해주세요.'),
    resisteragree1: Yup.boolean().oneOf([true], '체크해주세요.').required('체크해주세요.'),
    resisteragree2: Yup.boolean().oneOf([true], '체크해주세요.').required('체크해주세요.'),
    resisteragree3: Yup.boolean().oneOf([true], '체크해주세요.').required('체크해주세요.'),
  });

  const defaultValues = {
    email: '',
    password: '',
    password2: '',
    name: '',
    nickname: '',
    sex: '',
    birthday: '',
    phoneNumber: '',
    address: {
      address: '',
      detailAddress: '',
      zipcode: '',
    },
    resisteragree1: false,
    resisteragree2: false,
    resisteragree3: false,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch()

  const [ischeck, setischeck] = useState(false);

  const check = () => {
    setischeck(!ischeck);
    setValue('resisteragree1', !ischeck);
    setValue('resisteragree2', !ischeck);
    setValue('resisteragree3', !ischeck);
  };

  // 다음 주소
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소열기
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';
    const zipcode = data.zonecode;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setIsOpenPost(false);
    setValue('address.address', fullAddr);
    setValue('address.zipcode', zipcode);
  };

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '480px',
    height: '490px',
    padding: '7px',
  };
  // 다음 주소 끝

  const onSubmit = async (data) => {
    try {
      await register(
        data.email,
        data.password,
        data.name,
        data.nickname,
        data.birthday,
        data.phoneNumber,
        data.address
      );
      enqueueSnackbar('회원가입 완료!');
      navigate('/auth/login');
    } catch (error) {
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const [resiNum, setResiNum] = useState(25)
  
  const [injoong, setInjoong] = useState(false)

  const validate2 = () => {
    clearErrors('email')
    clearErrors('password')
    clearErrors('password2')
    clearErrors('nickname')
    if(!values.email){
      setError('email')
      return false;
    }
    const emai = /^(?=.*[@])(?=.*[.]).{2,50}$/;
    if(!emai.test(values.email)){
      setError('email')
      return false;
    }
    if(!values.password){
      setError('password')
      return false;
    }
    const pass = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+=-]).{8,50}$/;
    if(!pass.test(values.password)){
      setError('password')
      return false;
    }
    if(values.password !== values.password2){
      setError('password')
      setError('password2')
      return false;
    }
    if(!values.nickname){
      setError('nickname')
      return false;
    }
    const nick = /^.{2,8}$/;
    if(!nick.test(values.nickname)){
      setError('nickname')
      return false;
    }
    clearErrors('email')
    clearErrors('password')
    clearErrors('password2')
    clearErrors('nickname')
    return true;
  }

  const validate4 = () => {
    clearErrors('address.address')
    clearErrors('address.detailAddress')
    clearErrors('address.zipcode')
    if(!values.address.address){
      setError('address.address')
      return false;
    }
    if(!values.address.detailAddress){
      setError('address.detailAddress')
      return false;
    }
    if(!values.address.zipcode){
      setError('address.zipcode')
      return false;
    }
    clearErrors('address.address')
    clearErrors('address.detailAddress')
    clearErrors('address.zipcode')
    return true;
  }


  const onSubmit2 = async () => {
    try {
      if(validate2()){
      setResiNum(50)
      }
    } catch (error) {
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };
  const onSubmit4 = async () => {
    try {
      if(validate4()){
      setResiNum(100)
      }
    } catch (error) {
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <LinearProgress value={resiNum} valueBuffer={resiNum} variant="determinate" sx={{position:'fixed' , bottom:100, left:0, right:0 ,width:'100%'}}/>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {resiNum === 25 && 
        <>
        <Typography variant='h6'>회원가입</Typography>
        <RHFTextField name="email" label="이메일"  
          helperText="로그인 아이디로 사용됩니다!"autoComplete="none"/>

        <RHFTextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          helperText="최소 8자 이상으로 특수문자, 숫자를 최소 한개씩 포함해주세요."
          autoComplete="none"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="password2"
          label="비밀번호 확인"
          type={showPassword ? 'text' : 'password'}
          helperText="앞에 입력한 비밀번호와 같은 값을 입력해주세요."
          autoComplete="none"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
            name="nickname"
            label="닉네임"
            helperText="2자 이상 8자 이하로 입력해주세요."
            autoComplete="none"
          />
          <Button variant='outlined' size='large' onClick={() => onSubmit2()} >입력완료</Button>
          <Link variant="subtitle1" to={PATH_AUTH.login} component={RouterLink}>
           <Button variant='outlined' size='large' sx={{position:'fixed' , bottom:20, left:20 ,width:'10%'}}><ArrowBackIcon/></Button>
          </Link>
        <Typography variant="body1" sx={{ mt: 3, textAlign: 'center', position:'fixed', bottom:150, left:0, right:0 }}>
                이미 계정이 있으신가요?{' '}
                <Link variant="subtitle1" to={PATH_AUTH.login} component={RouterLink}>
                  로그인
                </Link>
        </Typography>
        </>}
        
        {resiNum === 50 &&
        <>
        <Typography variant='h6'>본인인증</Typography>

        {/* <Phonecheck />  */}
        <Stack direction='column' spacing={2} >

          <Button variant='outlined' size='large' onClick={() => setInjoong(true)} >본인 인증하기</Button>
          {injoong && <>         
          <Typography>아래는 휴대폰 모듈 통과되면 삭제 예정</Typography>
          <RHFTextField name="name" label="이름" helperText="한글로 입력해주세요." autoComplete="none" />
          <RHFTextField name="birthday" label="생일" helperText="'-'없이 6자리를 입력해주세요." placeholder="YYMMDD" />
          <RHFTextField
            name="phoneNumber"
            label="핸드폰 번호"
            helperText="'-'없이 11자리를 입력해주세요."
            placeholder="01012345678"
          />
          <RHFRadioGroup name="sex" options={SEX_CATEGORY_OPTIONS} sx={{ml:3}}/>
          <Button variant='outlined' size='large' onClick={() => setResiNum(75)} >입력완료</Button>
          </>}

          <Button variant='outlined' size='large' onClick={() => setResiNum(25)} sx={{position:'fixed' , bottom:20, left:20 ,width:'10%'}}><ArrowBackIcon/></Button>
        </Stack>
        </>}

        {resiNum === 75 && 
        <>
        <Typography variant='h6'>주소등록</Typography>
        <Stack direction="row" spacing={2}>
          <RHFTextField name="address.address" label="주소" autoComplete="none" />
          <Button onClick={onChangeOpenPost} variant="outlined" sx={{ width: '30%' }}>
            주소찾기
          </Button>
        </Stack>

        <Stack direction='column'  spacing={2}>
          {isOpenPost ? <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} /> : ''}
          <RHFTextField name="address.detailAddress" label="상세주소" autoComplete="none" />
        <Button variant='outlined' size='large' onClick={() => onSubmit4()} >입력완료</Button>
        <Button variant='outlined' size='large' onClick={() => setResiNum(50)} sx={{position:'fixed' , bottom:20, left:20 ,width:'10%'}}><ArrowBackIcon/></Button>
        </Stack>
        </>}

        {resiNum === 100 && 
        <>
        <Typography variant='h6'>약관동의</Typography>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Accordion sx={{width:'100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" > 
              <Typography>라이더 타운 이용약관</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Regicheck1 />
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Accordion sx={{width:'100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header"  >
              <Typography>개인정보 처리 약관</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Regicheck2 />
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Accordion sx={{width:'100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header" >
              <Typography>전자상거래 처리 약관</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Regicheck3 />
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mx:4}}>
          <Stack direction='column'justifyContent="center" alignItems="center" spacing={4} >
          <Typography>
          (필수) 약관 전체 동의하기 
          </Typography>
          <Typography>
          (필수)라이더타운 이용 약관에 동의하기 
          </Typography>
          <Typography>
          (필수)개인정보 처리 약관에 동의하기 
          </Typography>
          <Typography>
          (필수)전자상거래 처리 약관에 동의하기 
          </Typography>
          </Stack>
          <Stack direction='column'justifyContent="center" alignItems="center" spacing={2} >
          <Checkbox checked={ischeck} onChange={check} />
          <RHFCheckbox name="resisteragree1" label="" />
          <RHFCheckbox name="resisteragree2" label="" />
          <RHFCheckbox name="resisteragree3" label="" />
          </Stack>
        </Stack>

        {(errors.resisteragree1 || errors.resisteragree2 || errors.resisteragree3) && (
          <Alert severity="error">
            <strong>이용 약관에 동의해주세요.</strong>
          </Alert>
        )}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" color='secondary' loading={isSubmitting}>
          가입하기
        </LoadingButton>
        <Button variant='outlined' size='large' onClick={() => setResiNum(75)} sx={{position:'fixed' , bottom:20, left:20 ,width:'10%'}}><ArrowBackIcon/></Button>
        </>}
      </Stack>
    </FormProvider>
  );
}
