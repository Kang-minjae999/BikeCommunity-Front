import { PropTypes } from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './GarageCardCalendar.css';
import { Box, Chip, Divider } from '@mui/material';

// ----------------------------------------------------------------------
GarageCardCalendar.propTypes = {
  holiday: PropTypes.array,
  field: PropTypes.object,
};


export default function GarageCardCalendar({holiday, field}) {
  const [value, setV] = useState(new Date());

  const [selectValue, setSelectValue] = useState([]);

  const today = new Date()

  const onChange = (time) => {
    setV(time)
    holydate(time)
  }

  const holydate = useCallback((time) => {
    if(!selectValue.includes(moment(time).format("YYYY-MM-DD"))){
      setSelectValue(s=> [...s, moment(time).format("YYYY-MM-DD")])
    } 
  },[selectValue])

  useEffect(() => {
    field.onChange(selectValue)
    // eslint-disable-next-line
  }, [selectValue])

  return (
    <>
    <Box className='GarageCardCalendar' sx={{width:'100%'}}>
    <Calendar
      onChange={onChange} 
      formatDay={(locale, date) => moment(date).format("DD")}
      defaultValue={undefined}
      value={value}
      minDetail="month" 
      maxDetail="month" 
      minDate={today}
      navigationLabel={null}
      next2Label={null}
      prev2Label={null}
      tileDisabled={({view, date}) => 
      (view === "month" && 
        (date.getDay() === holiday[0] 
      || date.getDay() === holiday[1]
      || date.getDay() === holiday[2]
      || date.getDay() === holiday[3]
      || date.getDay() === holiday[4]
      || date.getDay() === holiday[5]
      || date.getDay() === holiday[6])) 
      || (selectValue.find((x) => x === moment(date).format("YYYY-MM-DD")))}
      showNeighboringMonth={false} 
      className="mx-auto w-full text-sm border-b"
    />
    <Box sx={{mt:2}}>
    {selectValue.map((item) => <Chip key={item} onDelete={() => setSelectValue(selectValue.filter(element => element !== item))} label={item} sx={{mr:2, mb:2}}/> )}
    </Box>
    <Divider />
    </Box>
    </>
  );
}
