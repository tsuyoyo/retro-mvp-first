import React from 'react';
import { PriceData } from '@/utils/models/priceData';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

interface PriceInfoItemProps {
  title: string;
  priceData: PriceData;
}

const PriceInfo: React.FC<{ price: PriceData }> = ({ price }) => {
  return (
    <Table sx={{}} aria-label='simple table'>
      <TableBody>
        <TableRow>
          <TableCell align='left'>Average price</TableCell>
          <TableCell align='right'>{price.averagePrice.toString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='left'>Max price</TableCell>
          <TableCell align='right'>{price.max.toString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align='left'>Min price</TableCell>
          <TableCell align='right'>{price.min.toString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export const PriceInfoItem: React.FC<PriceInfoItemProps> = ({ title, priceData }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>{title}</Typography>
        <PriceInfo price={priceData} />
      </CardContent>
      <CardActions>
        <Button variant='text' href={priceData.url} target='_blank'>
          Open auction
        </Button>
      </CardActions>
    </Card>
  );
};
