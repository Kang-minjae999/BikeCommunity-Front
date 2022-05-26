import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// @mui
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import Iconify from '../../components/Iconify';
// sections
import {
  AccountGeneral,
  AccountChangePassword,
  AccountGoodBye,
} from '../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeMode } = useSettings();

  const navigate = useNavigate()

  const {profilevalue} = useParams()

  const [currentTab, setCurrentTab] = useState(profilevalue);

  const ACCOUNT_TABS = [
    {
      index:0,
      label: '프로필',
      value: 'prof',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      index:1,
      label: '비밀번호 변경',
      value: 'changepass',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
    {
      index:2,
      label: '회원탈퇴',
      value: 'goodbye',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountGoodBye />,
    },
  ];

  return (
      <Container maxWidth='lx' sx={{mt:2}}>
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={0}>
        <Tabs
          value={currentTab}
          scrollButtons={false}
          variant="scrollable"
          TabIndicatorProps={themeMode === 'light' ? { style: { background: "#000" } }: { style: { background: "#FFF" }}}
          onChange={(e, value) => setCurrentTab(value) + navigate(`/dashboard/mypage/setting/${value}`)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
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
