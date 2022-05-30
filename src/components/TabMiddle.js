import PropTypes from 'prop-types';
import * as React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Typography, Box, Divider, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import useResponsive from '../hooks/useResponsive';


function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabMiddle.propTypes = {
  TABS: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  Featured: PropTypes.node,
  isTab: PropTypes.bool.isRequired,
};

export default function TabMiddle({TABS, Featured, path, isTab}) {
  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate();
  const {value} = useParams();

  const [valueMobile, setValueMobile] = useState(0);

  useEffect(() => {
    const index = TABS.map((item) => item.value).findIndex(a => a === value)
    setValueMobile(index);
  }, [value, TABS])

  const handleChangeIndex = (index) => {
    setValueMobile(index);
    navigate(`${path}/${TABS[index].value}`);
  };

  const handleNavigate = (event, newValue) => {
    setValueMobile(newValue);
    navigate(`${path}/${TABS[newValue].value}`);
  };

  const valueStyle = {
    borderBottom:(isDesktop ? 3 : 2),
    borderBottomColor: 'text.primary',
    fontWeight:'bold'
  };
  
  const valueStyleNone = {
    borderBottom:1,
    borderBottomColor: 'disabled',
  };

  const valueStyleLeft = {
    borderTop:2,
    borderTopColor: 'text.primary',
    borderRight:1,
    borderRightColor: 'disabled',
    fontWeight:'bold'
  };

  const valueStyleMiddle = {
    borderTop:2,
    borderTopColor: 'text.primary',
    borderLeft:1,
    borderLeftColor: 'disabled',
    borderRight:1,
    borderRightColor: 'disabled',
    fontWeight:'bold'
  };

  const valueStyleRight = {
    borderTop:2,
    borderTopColor: 'text.primary',
    borderLeft:1,
    borderLeftColor: 'disabled',
    fontWeight:'bold'
  };
  return (
    <>
    {isDesktop ? 
    <>
    <Divider sx={{ width: '90%', mt:2 }}/>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={valueMobile} onChange={handleNavigate}>
    {TABS.map((item) =>       
        <BottomNavigationAction 
        key={item.value} value={item.index} style={{ minWidth: 20 }} 
        label={<Typography variant="body2" sx={{ ...(valueMobile === item.index && valueStyle)}}>{item.label}</Typography>}/>)}
    </BottomNavigation>
    <Divider sx={{ width: '90%', mb:2 }}/>
    </> 
    :
    <>
    {Featured}
      {isTab && <Box sx={{height:56}}/>}
      <Paper sx={!isDesktop && isTab ? { position: 'fixed', top: 50, left: 0, right: 0, zIndex:1111 } : {} }>
    <BottomNavigation showLabels sx={{ width: '100%'}} value={valueMobile} onChange={handleNavigate} >
      <BottomNavigationAction
        sx={{ ...(valueMobile === 0 ? valueStyleLeft : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={valueMobile === 0 ? 'text.primary' : 'inherit'}>{TABS[0].label}</Typography>}
        value={TABS[0].index}
      />
      <BottomNavigationAction
        sx={{ ...(valueMobile === 1 ? valueStyleMiddle : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={valueMobile === 1 ? 'text.primary' : 'inherit'}>{TABS[1].label}</Typography>}
        value={TABS[1].index}
      />
      <BottomNavigationAction
        sx={{ ...(valueMobile === 2  ? valueStyleMiddle : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={valueMobile === 2 ? 'text.primary' : 'inherit'}>{TABS[2].label}</Typography>}
        value={TABS[2].index}
      />
      <BottomNavigationAction
        sx={{ ...(valueMobile === 3 ? valueStyleMiddle : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={valueMobile === 3 ? 'text.primary' : 'inherit'}>{TABS[3].label}</Typography>}
        value={TABS[3].index}
      />
      <BottomNavigationAction
        sx={{ ...(valueMobile === 4 ? valueStyleRight : valueStyleNone)}}
        label={<Typography variant='subtitle3' color={valueMobile === 4 ? 'text.primary' : 'inherit'}>{TABS[4].label}</Typography>}
        value={TABS[4].index}
      />
    </BottomNavigation>
    </Paper>
    </>}
     <Box sx={{mt:2}}/> 
    <SwipeableViews
        axis='x'
        index={valueMobile}
        onChangeIndex={handleChangeIndex}
      >
      {TABS.map((item) => item.index !== 2 ?     
      <TabPanel key={item.value} value={valueMobile} index={item.index}>
      {item.component}
      </TabPanel>
      : <div key={item.value}/>)}
      </SwipeableViews>
      {valueMobile === 2 && TABS[2].component}
    </>
  );
}
