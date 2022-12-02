import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Default as FathymActionDefault } from '../../common/FathymAction.stories';
import CreateFlowPage from '../../../view/pages/CreateFlow.page';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/Pages/Create Flow',
  component: CreateFlowPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CreateFlowPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof CreateFlowPage> = (args) => (
  <CreateFlowPage {...args} />
);

export const FlowName = template.bind({});
FlowName.args = {};

export const WithFlowName = template.bind({});
WithFlowName.args = {
  flowName: 'Default Flow Name',
};

export const WithFlowTemplate = template.bind({});
WithFlowTemplate.args = {
  flowName: 'Default Flow Name',
  flowTemplate: 'test-item-1',
};
