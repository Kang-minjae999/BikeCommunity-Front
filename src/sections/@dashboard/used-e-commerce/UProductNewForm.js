import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, React, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, Autocomplete, InputAdornment, Button } from '@mui/material';
// routes
import DaumPostcode from 'react-daum-postcode';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
// option
import BRAND_OPTION from '../../../components/option/BRAND_OPTION';
import HONDA_OPTION from '../../../components/option/HONDA_OPTION';
import YAMAHA_OPTION from '../../../components/option/YAMAHA_OPTION';
import SUZUKI_OPTION from '../../../components/option/SUZUKI_OPTION';
import KAWASAKI_OPTION from '../../../components/option/KAWASAKI_OPTION';
import BMW_OPTION from '../../../components/option/BMW_OPTION';
import DUCATI_OPTION from '../../../components/option/DUCATI_OPTION';
import HARLEY_OPTION from '../../../components/option/HARLEY_OPTION';
import INDIAN_OPTION from '../../../components/option/INDIAN_OPTION';
import TRIUMPH_OPTION from '../../../components/option/TRIUMPH_OPTION';
import KTM_OPTION from '../../../components/option/KTM_OPTION';
import HUSQVARNA_OPTION from '../../../components/option/HUSQVARNA_OPTION';
import VESPA_OPTION from '../../../components/option/VESPA_OPTION';
import DAELIM_OPTION from '../../../components/option/DAELIM_OPTION';
import KRMOTORS_OPTION from '../../../components/option/KRMOTORS_OPTION';
import KYMCO_OPTION from '../../../components/option/KYMCO_OPTION';
import ROYALENFIELD_OPTION from '../../../components/option/ROYALENFIELD_OPTION';
import BENELLI_OPTION from '../../../components/option/BENELLI_OPTION';
import CLASSIC125_OPTION from '../../../components/option/CLASSIC125_OPTION';
import APRILIA_OPTION from '../../../components/option/APRILIA_OPTION';
import MVAGUSTA_OPTION from '../../../components/option/MVAGUSTA_OPTION';
import ROYALALLOY_OPTION from '../../../components/option/ROYALALLOY_OPTION';
import FBMONDIAL_OPTION from '../../../components/option/FBMONDIAL_OPTION';
import MOTOGUZZI_OPTION from '../../../components/option/MOTOGUZZI_OPTION';
// components
import { FormProvider, RHFTextField, RHFUploadMultiFile, RHFSwitch } from '../../../components/hook-form';
import { access, refresh } from '../../../utils/jwt';
// ----------------------------------------------------------------------

const GEARBOX_OPTION = ['?????????', '?????????'];

const YEAR_OPTION = [
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
  '1989',
  '1988',
  '1987',
  '1986',
  '1985',
  '1984',
  '1983',
  '1982',
  '1981',
  '1980',
]; // ----------------------------------------------------------------------

UProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function UProductNewForm({ isEdit, currentProduct }) {
  const [MODEL_OPTION, SETMODEL_OPTION] = useState([]);
  const TRADEMODEL_OPTION = [];
  const [tradechecked, settradeChecked] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('???????????? ????????????.'),
    content: Yup.string().required('??????????????? ????????????.'),
    images: Yup.array().min(1, '????????? ??? ??? ?????? ???????????????.'),
    address: Yup.string().required('????????? ????????????.').nullable(),
    gearbox: Yup.string().required('????????? ????????????.').nullable(),
    brand: Yup.string().required('????????? ????????????.').nullable(),
    modelName: Yup.string().required('???????????? ????????????.').nullable(),
    displacement: Yup.number()
      .moreThan(1, '???????????? ??????????????????.')
      .lessThan(10000, '???????????? ????????? ??????????????????.')
      .nullable(),
    mileage: Yup.number().moreThan(0, '???????????? ??????????????????.').nullable(),
    year: Yup.string().min(4, '????????? ??????????????????.').max(4, '????????? ??????????????????.').nullable(),
    price: Yup.number().moreThan(0, '????????? 0??? ???????????????.'),
    negoable: Yup.boolean(),
    tradeable: Yup.boolean(),
    isCrashed: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentProduct?.title || '',
      content: currentProduct?.content || '',
      images: currentProduct?.bikeImageURLs || [],
      address: currentProduct?.address || '', // ?????? null
      gearbox: currentProduct?.gearbox || null, // ?????? null
      brand: currentProduct?.brand || null,
      modelName: currentProduct?.modelName || null, // ?????? null
      year: currentProduct?.year || 0, // ?????? null
      displacement: currentProduct?.displacement || 0,
      mileage: currentProduct?.mileage || 0,
      price: currentProduct?.price || 0,
      negoable: currentProduct?.negoable || false,
      tradeable: currentProduct?.tradeable || false,
      isCrashed: currentProduct?.isCrashed || false,
      tradeableModels: currentProduct?.tradeableModels || [],
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentProduct, defaultValues, reset]);

  // ---------------------------------------------------------------

  const [gearboxPost, setGearboxPost] = useState();

  useEffect(() => {
    if (values.gearbox === '?????????') {
      setGearboxPost(true);
    }
    if (values.gearbox === '?????????') {
      setGearboxPost(false);
    }
  }, [values]);

  useEffect(() => {
    if (values.tradeable) {
      settradeChecked(true);
    } else {
      settradeChecked(false);
    }
  }, [values.tradeable]);

  // ---------------------------------------------------------------

  useEffect(() => {
    if (values.brand === '??????') {
      SETMODEL_OPTION(HONDA_OPTION);
    }
    if (values.brand === '?????????') {
      SETMODEL_OPTION(YAMAHA_OPTION);
    }
    if (values.brand === '?????????') {
      SETMODEL_OPTION(SUZUKI_OPTION);
    }
    if (values.brand === '????????????') {
      SETMODEL_OPTION(KAWASAKI_OPTION);
    }
    if (values.brand === 'BMW') {
      SETMODEL_OPTION(BMW_OPTION);
    }
    if (values.brand === '?????????') {
      SETMODEL_OPTION(DUCATI_OPTION);
    }
    if (values.brand === '??????????????????') {
      SETMODEL_OPTION(HARLEY_OPTION);
    }
    if (values.brand === '?????????') {
      SETMODEL_OPTION(INDIAN_OPTION);
    }
    if (values.brand === '???????????????') {
      SETMODEL_OPTION(TRIUMPH_OPTION);
    }
    if (values.brand === 'KTM') {
      SETMODEL_OPTION(KTM_OPTION);
    }
    if (values.brand === '???????????????') {
      SETMODEL_OPTION(HUSQVARNA_OPTION);
    }
    if (values.brand === '?????????') {
      SETMODEL_OPTION(VESPA_OPTION);
    }
    if (values.brand === '??????') {
      SETMODEL_OPTION(DAELIM_OPTION);
    }
    if (values.brand === '??????') {
      SETMODEL_OPTION(KRMOTORS_OPTION);
    }
    if (values.brand === '??????') {
      SETMODEL_OPTION(KYMCO_OPTION);
    }
    if (values.brand === '???????????????') {
      SETMODEL_OPTION(ROYALENFIELD_OPTION);
    }
    if (values.brand === '?????????') {
      SETMODEL_OPTION(BENELLI_OPTION);
    }
    if (values.brand === '?????????/?????????/cg/?????????') {
      SETMODEL_OPTION(CLASSIC125_OPTION);
    }
    if (values.brand === '???????????????') {
      SETMODEL_OPTION(APRILIA_OPTION);
    }
    if (values.brand === 'MV????????????') {
      SETMODEL_OPTION(MVAGUSTA_OPTION);
    }
    if (values.brand === '???????????????') {
      SETMODEL_OPTION(ROYALALLOY_OPTION);
    }
    if (values.brand === 'FB?????????') {
      SETMODEL_OPTION(FBMONDIAL_OPTION);
    }
    if (values.brand === '????????????') {
      SETMODEL_OPTION(MOTOGUZZI_OPTION);
    }
    if (values.brand === '??????') {
      SETMODEL_OPTION([{ value: '??????' }]);
    }
  }, [values.brand]);

  // ---------------------------------------------------------------
  const onSubmit = async (data) => {
    if (!isEdit) {
      if (!Array.isArray(watch('tradeableModels'))) {
        enqueueSnackbar('?????? ????????? ????????? ?????? ????????? ??????????????????!');
        return;
      }
      const formData = new FormData();
      data.images.map((file) => formData.append('imageFiles', file));
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('address', data.address);
      formData.append('gearbox', gearboxPost);
      formData.append('brand', data.brand);
      formData.append('modelName', data.modelName);
      formData.append('year', data.year);
      formData.append('displacement', data.displacement);
      formData.append('mileage', data.mileage);
      formData.append('price', data.price);
      formData.append('negoable', data.negoable);
      formData.append('tradeable', data.tradeable);
      formData.append('isCrashed', data.isCrashed);
      data.tradeableModels.map((model) => formData.append('tradeableModels', model));
      try {
        await axios.post('/secondhand-trade-service/biketrade', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            accesstoken: access,
            refreshtoken: refresh,
          },
        });
        reset();
        enqueueSnackbar(!isEdit ? '??????????????? ????????? ???????????????!' : '??????????????? ????????? ???????????????!');
        navigate(PATH_DASHBOARD.general.marketu);
      } catch (error) {
        console.error(error);
      }
    } else {
      if (!Array.isArray(watch('tradeableModels'))) {
        enqueueSnackbar('?????? ????????? ????????? ?????? ????????? ??????????????????!');
        return;
      }
      const formData = new FormData();
      data.images.map((file) => formData.append('imageFiles', file));
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('address', data.address);
      formData.append('gearbox', gearboxPost);
      formData.append('brand', data.brand);
      formData.append('modelName', data.modelName);
      formData.append('year', data.year);
      formData.append('displacement', data.displacement);
      formData.append('mileage', data.mileage);
      formData.append('price', data.price);
      formData.append('negoable', data.negoable);
      formData.append('tradeable', data.tradeable);
      formData.append('isCrashed', data.isCrashed);
      data.tradeableModels.map((model) => formData.append('tradeableModels', model));
      try {
        await axios.put('/secondhand-trade-service/biketrade', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            accesstoken: access,
            refreshtoken: refresh,
          },
        });
        reset();
        enqueueSnackbar(!isEdit ? '??????????????? ????????? ???????????????!' : '??????????????? ????????? ???????????????!');
        navigate(PATH_DASHBOARD.general.marketu);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  //
  const [isOpenPost, setIsOpenPost] = useState(false);
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    const sido1 = data.sido;
    const sigungu1 = data.sigungu;
    const city = `${sido1} ${sigungu1}`;

    setIsOpenPost(false);
    setValue('address', city);
  };

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '100%',
    height: '490px',
    padding: '7px',
  };
  const address = watch('address');
  //

  const [modelAlert, setModelAlert] = useState('???????????? ?????? ??????????????????!');

  useEffect(() => {
    if (values.brand) {
      setModelAlert('?????? ???????????? ?????????!');
    }
    if (values.brand === '??????') {
      setModelAlert('????????? ??????????????????.');
    }
  }, [values.brand]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="?????????" autoComplete="false" />
              <RHFTextField name="content" label="????????????" autoComplete="false" multiline minRows={5} />
              <RHFUploadMultiFile
                name="images"
                showPreview
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={1} mb={1}>
                <Button
                  onClick={onChangeOpenPost}
                  variant="outlined"
                  color="inherit"
                  sx={{ width: '100%', mb: 1, color: 'text.primary' }}
                >
                  ????????????
                </Button>
                {isOpenPost ? <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} /> : ''}
                <RHFTextField
                  name="address"
                  placeholder="????????? (???/???/???/???)??? ?????????!"
                  label={address ? '??????' : '??????????????? ???????????????'}
                  autoComplete="false"
                  disabled
                />
                <Controller
                  name="gearbox"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      noOptionsText="?????????, ????????? ?????? ???????????????"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={GEARBOX_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField name="gearbox" label="??????" {...params} placeholder="??????" />
                      )}
                    />
                  )}
                />

                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      noOptionsText="?????? ???????????? ?????????!"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={BRAND_OPTION.map((option) => option.label)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField name="brand" label="?????????" {...params} placeholder="?????????" />
                      )}
                    />
                  )}
                />

                <Controller
                  name="modelName"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      noOptionsText={modelAlert}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={MODEL_OPTION.map((option) => option.value)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField name="modelName" label="?????????" {...params} placeholder="?????????" />
                      )}
                    />
                  )}
                />
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      noOptionsText="?????? ????????? ?????????"
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={YEAR_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField name="year" label="??????" {...params} placeholder="??????" />}
                    />
                  )}
                />
                <RHFTextField
                  name="displacement"
                  label="?????????"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('displacement') === 0 ? '' : getValues('displacement')}
                  onChange={(event) => setValue('displacement', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">cc</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="mileage"
                  label="?????????"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('mileage') === 0 ? '' : getValues('mileage')}
                  onChange={(event) => setValue('mileage', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="price"
                  label="??????"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">???</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>

              <RHFSwitch name="isCrashed" label="????????????" labelPlacement="start" />
              <RHFSwitch name="negoable" label="??????" labelPlacement="start" />
              <RHFSwitch name="tradeable" label="??????" labelPlacement="start" />

              {!tradechecked ? (
                ''
              ) : (
                <>
                  <Controller
                    name="tradeableModels"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        freeSolo
                        noOptionsText="???????????? ??????????????????"
                        onChange={(event, newValue) => field.onChange(newValue)}
                        options={TRADEMODEL_OPTION.map((option) => option.value)}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                          ))
                        }
                        renderInput={(params) => (
                          <RHFTextField name="tradeableModels" label="??????????????????" {...params} sx={{mt:2}}/>
                        )}
                      />
                    )}
                  />
                </>
              )}
            </Card>

            <LoadingButton
              type="submit"
              variant="outlined"
              color="inherit"
              size="large"
              loading={isSubmitting}
              sx={{ color: 'text.primary' , mb:5}}
            >
              {!isEdit ? '?????? ?????????' : '?????? ????????????'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
