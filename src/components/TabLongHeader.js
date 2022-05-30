import PropTypes from 'prop-types';
import * as React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Typography, Paper, Tabs, Tab, Box, Divider, BottomNavigation, BottomNavigationAction } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import useSettings from '../hooks/useSettings';


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

TabLongHeader.propTypes = {
  TABS: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
};

export default function TabLongHeader({TABS, path}) {
  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate();
  const {value} = useParams();
  const { themeMode } = useSettings()

  const [valueMobile, setValueMobile] = useState(0);

  useEffect(() => {
    const index = TABS.map((item) => item.value).findIndex(a => a === value)
    setValueMobile(index);
  }, [value, TABS])
  
  const handleChange = (event, newValue) => {
    setValueMobile(newValue);
    navigate(`${path}/${TABS[newValue].value}`);
  };

  const handleChangeIndex = (index) => {
    setValueMobile(index);
    navigate(`${path}/${TABS[index].value}`);
  };

  const handleNavigate = (event, newValue) => {
    setValueMobile(newValue);
    navigate(`${path}/${TABS[newValue].value}`);
  };

  const valueStyle = {
    borderBottom:3,
    borderBottomColor: 'text.primary',
    fontWeight:'bold'
  };
  

  return (
    <>
    {isDesktop ? 
    <>
    <Divider sx={{ width: '100%', mt:2 }}/>
    <BottomNavigation showLabels sx={{ width: '100%' }} value={valueMobile} onChange={handleNavigate}>
    {TABS.map((item) =>       
        <BottomNavigationAction 
        key={item.value} value={item.index} style={{ minWidth: 20 }} 
        label={<Typography variant="body2" sx={{ ...(valueMobile === item.index && valueStyle)}}>{item.label}</Typography>}/>)}
    </BottomNavigation>
    <Divider sx={{ width: '100%', mb:2 }}/>
    </> 
    :
      <Paper sx={!isDesktop ? { position: 'fixed', top: 42, left: 0, right: 0, zIndex:50 } : { zIndex:50 } }>
        <Tabs
          value={valueMobile}
          onChange={handleChange}
          TabIndicatorProps={themeMode === 'light' ? { style: { background: "#000" } }: { style: { background: "#FFF" }}}
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          sx={{mx:2}}
        > 
       {TABS.map((item) =>       
        <Tab key={item.value} style={{ minWidth: 20 }} label={<Typography variant="subtitle3">{item.label}</Typography>} />)}
        </Tabs>
     <Divider sx={{ width: '100%' }}/>
    </Paper>}
     <Box sx={{mt:6}}/> 
     {TABS.map((item) =>  item.Feature &&     
      <TabPanel key={item.value} value={valueMobile} index={item.index}>
      {item.Feature}
      </TabPanel>)}
      <SwipeableViews
        axis='x'
        index={valueMobile}
        onChangeIndex={handleChangeIndex}
      >
      {TABS.map((item) =>       
      <TabPanel key={item.value} value={valueMobile} index={item.index}>
      {item.component}
      </TabPanel>)}
      </SwipeableViews>
    </>
  );
}
