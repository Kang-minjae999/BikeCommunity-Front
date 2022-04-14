import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';

// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// @types
import { NAVBAR } from '../../../../config';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { ColorManyPicker } from '../../../../components/color-utils';
import { RHFMultiCheckbox, RHFRadioGroup, RHFTextField, FormProvider } from '../../../../components/hook-form';
import ShopFilterSidebarSlider from './ShopFilterSidebarSlider';
import ShopFilterSidebarSliderPrice from './ShopFilterSidebarSliderPrice';
import ShopFilterSidebarSliderDisplacement from './ShopFilterSidebarSliderDisplacement';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export const FILTER_GEARBOX_OPTIONS = ['메뉴얼', '스쿠터'];

export const FILTER_DISPLACEMENT_OPTIONS = ['50~250', '250~500', '500~900', '900~'];

export const FILTER_MILEAGE_OPTIONS = ['0~5000', '5000~10000', '10000~15000', '15000~20000', '20000~25000', '25000~'];

export const FILTER_PRICE_OPTIONS = ['~300', '300~600','600~900','900~1200','1200~1500','1500~'];

export const FILTER_NEGO_OPTIONS = ['가능', '불가능'];

export const FILTER_TRADE_OPTIONS = ['가능', '불가능'];

export const FILTER_CRASH_OPTIONS = ['사고있음', '무사고'];


export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];

export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];



export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------


const onSelected = (selected, item) =>
  selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item];


ShopFilterSidebar.propTypes = {
  isOpen: PropTypes.bool,
  onResetAll: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default function ShopFilterSidebar({ isOpen, onResetAll, onOpen, onClose }) {
  const { control } = useFormContext();

  return (
    <>              
      <Button disableRipple color="inherit" endIcon={<Iconify icon={'ic:round-filter-list'} />} onClick={onOpen}>
        상세검색
      </Button>

      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: { width: '100%', height:'85vh'},
        }}
      >
      <FormProvider  >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            상세검색
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ px: 1 }} spacing={2}>
            <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ px: 1 }} spacing={2}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">종류</Typography>
                <RHFRadioGroup name="gearbox" options={FILTER_GEARBOX_OPTIONS} row={false}/>
              </Stack>
              <Stack spacing={1}>
                  <Typography variant="subtitle1">사고</Typography>
                  <RHFRadioGroup name="isCrash" options={FILTER_CRASH_OPTIONS} row={false} />
                </Stack>
            </Stack>  
            <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ px: 1 }} spacing={2}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">지역</Typography>
                <RHFTextField name='address' size='small'/>
                </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1">모델명</Typography>
                <RHFTextField name='modelName' size='small'/>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle1">연식</Typography>
                <RHFTextField name='year' size='small'/>
              </Stack>
              </Stack>
            </Stack>
            
            <Stack direction="column" alignItems="flex-start" justifyContent="space-between" sx={{ px: 1, py: 2 }} spacing={2}>
              <Stack spacing={1} direction='column'>
                <Typography variant="subtitle1">배기량</Typography>
                <ShopFilterSidebarSliderDisplacement />
                <Typography variant="subtitle1">키로수</Typography>
                <ShopFilterSidebarSlider /> 
                {/* <RHFRadioGroup name="mileage" options={FILTER_MILEAGE_OPTIONS} row={false} /> */}
                <Typography variant="subtitle1">가격</Typography>
                <ShopFilterSidebarSliderPrice /> 
                {/* <RHFRadioGroup name="price" options={FILTER_PRICE_OPTIONS} sx={{ width: 1 }}  row={false} /> */}
              </Stack>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ px: 1, py: 2 }} spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">네고</Typography>
                  <RHFRadioGroup name="nego" options={FILTER_NEGO_OPTIONS} sx={{ width: 1 }} row/>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">대차</Typography>
                  <RHFRadioGroup name="trade" options={FILTER_TRADE_OPTIONS} row />
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ px: 1 }} spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">대차 가능 모델</Typography>
                  <RHFTextField name='tradeModel' size='small'/>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">검색 저장</Typography>
                <Button variant='outlined' color='inherit'>상세검색 설정 저장하기</Button>
                </Stack>
              </Stack>
          </Stack>    
        </Scrollbar>

        <Box sx={{ p: 3 }}>
            <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={onResetAll}
            startIcon={<Iconify icon={'ic:round-clear-all'} />}
          >
            초기화
          </Button>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={onResetAll}
            startIcon={<Iconify icon={'ic:search'} />}
          >
            검색
          </Button>
          </Stack>    
        </Box>
        </FormProvider>
      </Drawer>
    </>
  );
}
