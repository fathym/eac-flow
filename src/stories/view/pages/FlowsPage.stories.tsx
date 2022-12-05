import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FlowsPage from '../../../view/pages/Flows.page';
import { FathymFlow } from "../../common/FathymFlow";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/Pages/Flows',
  component: FlowsPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FlowsPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof FlowsPage> = (args) => (
  <FlowsPage {...args} />
);

const createFlow = () => {
  alert('Create Flow');
}

const flowSelected = (flow: FathymFlow) => {
  alert(flow.Name);
}

export const NoFlows = template.bind({});
NoFlows.args = {
  createFlow: createFlow,
  flowSelected: flowSelected
};

export const WithFlows = template.bind({});
WithFlows.args = {
  createFlow: createFlow,
  flowSelected: flowSelected,
  flows: [
    {
      Name: 'Test 1',
      Lookup: 'test-1',
      Template: ''
    },
  ],
};
