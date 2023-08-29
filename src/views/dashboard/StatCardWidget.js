import { Container } from '@mui/material';
import React from 'react';

import './StatCardWidget.css';
import ConstruckStatCard from './ContruckStatCard';

export default function StatCardWidget({ item }) {
  return (
    <Container className='px-2'>
      <ConstruckStatCard
        title={item.title}
        icon={item.icon}
        data={item.data}
        color={item.color}
      />
    </Container>
  );
}
