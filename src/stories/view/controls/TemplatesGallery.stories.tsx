import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TemplatesGallery from '../../../view/controls/TemplatesGallery';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Templates Gallery',
  component: TemplatesGallery,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TemplatesGallery>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof TemplatesGallery> = (args) => (
  <TemplatesGallery {...args} />
);

export const Default = template.bind({});
Default.args = {
  title: 'Templates'
};
