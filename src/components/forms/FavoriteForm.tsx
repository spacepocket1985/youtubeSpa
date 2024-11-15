import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm, SubmitHandler } from 'react-hook-form';
import Slider from '@mui/material/Slider';

import { SortOrder } from '../../service/YouTubeApi';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { PageWrapper } from '../pageWrapper/PageWrapper';

const sortingOrder = Object.values(SortOrder);

type FavoriteFormInputsType = {
  query: string;
  name: string;
  sortBy: SortOrder;
  maxCount: number;
};

type FavoriteFormPropsType = {
  handleClose: () => void;
};

export const FavoriteForm: React.FC<FavoriteFormPropsType> = ({
  handleClose,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FavoriteFormInputsType>();

  const { query, pageInfo } = useAppSelector((state) => state.videoList);

  const onSubmit: SubmitHandler<FavoriteFormInputsType> = async (data) => {
    console.log(data);
  };

  const [value, setValue] = useState(pageInfo.resultsPerPage);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 50) {
      setValue(50);
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
          value={query}
          type="text"
          size="small"
          {...register('query')}
        />
        <TextField
          label="name"
          type="text"
          size="small"
          helperText={errors.name?.message}
          {...register('name', { required: true })}
        />
        <TextField
          select
          label="Sort By"
          defaultValue={sortingOrder[2]}
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
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems:'center' }}>
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
