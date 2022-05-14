import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './AppRidingHomeCalendarOri.css';
import { Card, Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------
export default function AppRidingHomeCalendar() {
  const navigate = useNavigate()
  const [value, onChange] = useState(new Date());

  const [mark, setMark] = useState(
    [
      '2022-05-20',
      '2022-05-21',
      '2022-05-28',
      '2022-05-30',]);

  // const data = async () => {
  //     const result = await axios.get(
  //       `/api/healthLogs?health_log_type=DIET`
  //     );
  //     return result.data;
  // }


  return (
    <>
    <Box className='AppRidingHomeCalendarOri' sx={{width:'100%'}}>
    <Calendar
      onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
      formatDay={(locale, date) => moment(date).format("DD")}
      value={value}
      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      navigationLabel={null}
      next2Label={null}
      prev2Label={null}
      showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
      className="mx-auto w-full text-sm border-b"
      tileContent={({ date }) => { 
        // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
        if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
          return (
            <>
            <div className='dotclub'>
                <Typography  variant='body2' fontWeight='bold'>R</Typography>
                <Typography  variant='body2' fontWeight='bold'>D</Typography>
                <Typography  variant='body2' fontWeight='bold'>C</Typography>
            </div>
            </>
          );
        }
        // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
      }}
    />
    </Box>
    <Card sx={{my:2, border:1, borderColor:'#a0a096'}}>
    <Typography variant='body2' sx={{m:2}}>
      R = 라이딩 / D = 딩스타 / C = 클럽
    </Typography>
    </Card>
    </>
  );
}
