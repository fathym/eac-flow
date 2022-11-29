import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HorizontalScroller } from '../../common/HorizontalScroller';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Horizontal Scroller',
  component: HorizontalScroller,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HorizontalScroller>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof HorizontalScroller> = (args) => (
  <Box>
    <Typography>Content Shouldn't Move</Typography>

    <HorizontalScroller{...args} />

    <Typography>Content Shouldn't Move</Typography>
  </Box>
);

const reusableChildren: React.ReactNode[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
].map((i) => {
  return (
    <Box sx={{ width: '200px', height: '150px', border: '1px solid black' }}>
      {i}
    </Box>
  );
});

export const Default = template.bind({});
Default.args = {
  children: reusableChildren,
};

export const WithSpacing = template.bind({});
WithSpacing.args = {
  children: reusableChildren,
  spacing: '2em'
};

export const WithRandomSpacing = template.bind({});
WithRandomSpacing.args = {
  children: reusableChildren,
  spacing: '1em 3em 5em 7em'
};
