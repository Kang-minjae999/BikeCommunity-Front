import * as Yup from 'yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './AppRidingHomeCalendarOri.css';
import { Card, Box, Typography, Button, Autocomplete, Chip } from '@mui/material';
import { RHFTextField, FormProvider } from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { access, refresh } from '../../../../utils/jwt';

// ----------------------------------------------------------------------

export default function AppRidingHomeCalendar() {
  const TAGS_OPTION = ['소모품 교환', '정기 점검', '상담', '튜닝'];

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar();

  const [value, setV] = useState(new Date());

  const [open, setOpen] = useState(false)

  const [timePick, setTimePick] = useState(null)

  const NewBlogSchema = Yup.object().shape({
    modelName: Yup.string().required('모델명을 입력해주세요!'),
    category: Yup.array().required('정비 분류를 입력해주세요!'),
    content: Yup.string().required('상세 내용을 입력해주세요!'),
  });

  const defaultValues = {
    modelName: '',
    category: undefined,
    content: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data) => {
    try {
      await axios.post('/reservation', 
      {
        reservationDate:value,
        reservationTime:timePick,
        modelName:data.modelName,
        category:data.category,
        content:data.content,
      }, {
        headers: {
          'content-type': 'multipart/form-data',
            accesstoken: access,
            refreshtoken: refresh,
        },
      });
      enqueueSnackbar('예약 완료!');
      navigate(PATH_DASHBOARD.blog.dingstas);
    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date()

  const onChange = (time) => {
    setV(time)
    setOpen(true)
    setTimePick(null)
  }

  const mark =
    [
      '2022-05-20',
      '2022-05-21',
      '2022-05-28',
      '2022-05-30',]
    
  // const markt = new Date('2022-05-29').getDay()

  // const data = async () => {
  //     const result = await axios.get(
  //       `/api/healthLogs?health_log_type=DIET`
  //     );
  //     return result.data;
  // }
  // 1은 월요일 .....일요일 = 0

  const time = [10, 20]

  const disableTime = [12, 14]

  const anotherReaf = () => {
    const array = []
    for (let i = time[0]; i < time[1]; i += 1) {
        array.push(!disableTime.includes(i) && <Button key={i} variant={timePick === i ? 'contained' : 'outlined'} size='large' color='inherit' onClick={() => setTimePick(i)} sx={{m:2}}>{i}:00</Button>)
    }
    return array;
  }

  

  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Box className='AppRidingHomeCalendarOri' sx={{width:'100%'}}>
    <Calendar
      onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
      formatDay={(locale, date) => moment(date).format("DD")}
      value={value}
      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      minDate={today}
      navigationLabel={null}
      next2Label={null}
      prev2Label={null}
      tileDisabled={({view, date}) => (view === "month" && date.getDay() === 3) || (mark.find((x) => x === moment(date).format("YYYY-MM-DD")))}
      showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
      className="mx-auto w-full text-sm border-b"
      // eslint-disable-next-line 
      // tileContent={({ date }) => { 
      //   // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
      //   if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      //     return (
      //       <>
      //       <div className='dotclub'>
      //           <Typography  variant='body2' fontWeight='bold'>R</Typography>
      //       </div>
      //       </>
      //     );
      //   }
      //   // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
      // }}
    />
    </Box>
    {!open ? 
    <Card sx={{my:2, border:1, borderColor:'#a0a096'}}>
    <Typography variant='body2' sx={{m:2}}>
      날짜를 선택해주세요!
    </Typography>
    </Card> :
    <Card sx={{my:2, border:1, borderColor:'#a0a096'}}>
    <Box sx={{m:1}}>
    {anotherReaf()}
    </Box>
    </Card>}
    {timePick && 
    <Box sx={{m:1}}>
    <Typography variant='body2' sx={{m:1}}>
      모델명
    </Typography>
    <RHFTextField name='modelName' fullWidth color='action'/>
    <Typography variant='body2' sx={{m:1}}>
      정비 분류
    </Typography>
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          freeSolo
          onChange={(event, newValue) => field.onChange(newValue)}
          options={TAGS_OPTION.map((option) => option)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
            ))
          }
          renderInput={(params) => <RHFTextField fullWidth name="category" {...params} color='action'/>}
        />
      )}
      />
    <Typography variant='body2'  sx={{m:1}}>
      상세 내용
    </Typography>
    <RHFTextField name='content' fullWidth rows={3} multiline color='action'/>
    <LoadingButton fullWidth type="submit" color='inherit' variant='contained' size='large' loading={isSubmitting} sx={{mt:2}}>
      예약하기
    </LoadingButton>
    </Box>}
    <Box sx={{mb:5}}/>
    </FormProvider>
    </>
  );
}
