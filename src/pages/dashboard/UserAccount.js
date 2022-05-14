import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import Iconify from '../../components/Iconify';
// sections
import {
  AccountGeneral,
  AccountChangePassword,
} from '../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('프로필');

  const ACCOUNT_TABS = [
    {
      value: '프로필',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: '비밀번호 변경',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
      <Container maxWidth={themeStretch ? false : 'lx'} sx={{mt:2}}>
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={0}>
        <Tabs
          value={currentTab}
          scrollButtons={false}
          variant="scrollable"
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>
        </Stack>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <div key={tab.value}>{tab.component}</div>;
        })}
      </Container>
  );
}
