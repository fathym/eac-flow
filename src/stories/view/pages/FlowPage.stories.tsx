import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FlowPage from '../../../view/pages/Flow.page';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/Pages/Flow',
  component: FlowPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FlowPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof FlowPage> = (args) => (
  <FlowPage {...args} />
);

export const Flow = template.bind({});
Flow.args = {
  flow: {
    Name: 'Test Flow',
    Lookup: 'test-flow',
    Template: ''
  }
};
