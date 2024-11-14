import { Box, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import Slider from '@mui/material/Slider';

import { SortOrder } from '../../service/YouTubeApi';

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

  const onSubmit: SubmitHandler<FavoriteFormInputsType> = async (data) => {
    console.log(data);
  };

  const content = (
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
        type="text"
        size="small"
        disabled
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
        label="sort by"
        defaultValue={sortingOrder[0]}
        slotProps={{
          select: {
            native: true,
          },
        }}
        {...(register('sortBy'), { required: true })}
        error={!!errors.sortBy}
        helperText={errors.sortBy?.message}
      >
        {sortingOrder.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </TextField>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Slider
          defaultValue={1}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
        <TextField
          label="max count"
          type="number"
          size="small"
          helperText={errors.maxCount?.message}
          {...register('maxCount', { required: true })}
        />
      </Box>
      <div>
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
      </div>
    </Box>
  );

  return <>{content}</>;
};
