import { Box, Button, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/material/Grid2';
import { useForm, SubmitHandler } from 'react-hook-form';
import Slider from '@mui/material/Slider';

import { SortOrder } from '../../service/YouTubeApi';
import { useState } from 'react';
import { PageWrapper } from '../pageWrapper/PageWrapper';
import { FavoriteItemType } from '../../pages/Favorites';
import { useAppDispatch } from '../../hooks/storeHooks';
import {
  favoriteItemUpdate,
  favoriteItemAdd,
} from '../../store/slices/videoSlice';

const sortingOrder = Object.values(SortOrder);

type FavoriteFormPropsType = {
  handleClose: () => void;
  item: FavoriteItemType;
};

export const FavoriteForm: React.FC<FavoriteFormPropsType> = ({
  handleClose,
  item,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FavoriteItemType>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FavoriteItemType> = async (data) => {
    const favorite = { ...data, id: item.id || uuidv4() };
    console.log(favorite);

    if (item.id) {
      dispatch(favoriteItemUpdate({ ...data, id: item.id }));
    } else {
      dispatch(favoriteItemAdd({ ...data, id: uuidv4() }));
    }

    handleClose();
  };

  const [value, setSliderValue] = useState(item.maxCount);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const numericValue = newValue as number;
    setSliderValue(numericValue);
    setValue('maxCount', numericValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue =
      event.target.value === '' ? 0 : Number(event.target.value);
    setSliderValue(numericValue);
    setValue('maxCount', numericValue);
  };

  const handleBlur = () => {
    if (value < 0) {
      setSliderValue(0);
      setValue('maxCount', 0);
    } else if (value > 50) {
      setSliderValue(50);
      setValue('maxCount', 50);
    }
  };

  const content = (
    <PageWrapper title={'Save search query'}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="qurey"
          value={item.query}
          type="text"
          size="small"
          {...register('query')}
        />
        <TextField
          defaultValue={item.name}
          label="name"
          type="text"
          size="small"
          helperText={errors.name?.message}
          {...register('name', { required: true })}
        />
        <TextField
          select
          label="Sort By"
          defaultValue={item.sortBy}
          slotProps={{
            select: {
              native: true,
            },
          }}
          {...register('sortBy', { required: true })}
          error={!!errors.sortBy}
          helperText={errors.sortBy?.message}
        >
          {sortingOrder.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </TextField>
        <Box>
          <Typography id="input-slider" gutterBottom>
            MaxCount
          </Typography>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid size={8}>
              <Slider
                value={typeof value === 'number' ? value : 0}
                min={0}
                max={50}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid size={4}>
              <TextField
                type="number"
                value={value}
                size="small"
                helperText={errors.maxCount?.message}
                {...register('maxCount', {
                  required: true,
                  onChange: handleInputChange,
                  onBlur: handleBlur,
                  valueAsNumber: true,
                })}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              handleClose();
            }}
          >
            {'Dont save'}
          </Button>
          <Button type="submit" variant="contained" disabled={!isValid}>
            {'Save'}
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  );

  return <>{content}</>;
};
