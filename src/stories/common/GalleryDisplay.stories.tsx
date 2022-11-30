import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DirectionAction, GalleryDisplay } from '../../common/GalleryDisplay';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Gallery Display',
  component: GalleryDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof GalleryDisplay>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof GalleryDisplay> = (args) => (
  <GalleryDisplay {...args} />
);

const reusableChildren: React.ReactNode[] = Array.from(
  new Array(20),
  (x, i) => i + 1
).map((i) => {
  return (
    <Box sx={{ width: '100px', height: '100px', border: '1px solid black' }}>
      {i}
    </Box>
  );
});

export const Default = template.bind({});
Default.args = {
  children: [...reusableChildren],
  title: 'The Default Gallery',
};

export const WithSpacing = template.bind({});
WithSpacing.args = {
  children: [...reusableChildren],
  title: 'Gallery with Spacing',
  spacing: '.5em',
};

const baseActionStyles = {
  background: 'transparent',
  position: 'absolute',
  top: 0,
  bottom: 0,
  minWidth: '40px',
  fontWeight: 900,
  fontSize: '24px',
  color: 'blue',
};
const dirAction: DirectionAction = (direction, action) => {
  if (direction === 'left') {
    return (
      <Button
        onClick={action}
        sx={{
          ...baseActionStyles,
          left: 0,
          backgroundImage: 'linear-gradient(to right, black, transparent)',
        }}
      >
        {'<'}
      </Button>
    );
  } else {
    return (
      <Button
        onClick={action}
        sx={{
          ...baseActionStyles,
          right: 0,
          backgroundImage: 'linear-gradient(to left, black, transparent)',
        }}
      >
        {'>'}
      </Button>
    );
  }
};

export const WithActions = template.bind({});
WithActions.args = {
  children: [...reusableChildren],
  title: 'Gallery with Actions',
  spacing: '.5em',
  directionAction: dirAction,
};

export const WithScrollVelocity = template.bind({});
WithScrollVelocity.args = {
  children: [...reusableChildren],
  title: 'Gallery with Scroll Velocity',
  scrollVelocity: 0.5,
  spacing: '.5em',
  directionAction: dirAction,
};
