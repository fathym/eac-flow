import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateFlowPage, {
  CreateFlowPageProperties,
} from '../../../view/pages/CreateFlow.page';
import { GalleryItem } from '../../../common/GalleryItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/Pages/Create Flow',
  component: CreateFlowPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CreateFlowPage>;

const reusableItemData: { [key: string]: any } = {};

const reusableItems = Array.from(new Array(50), (x, i) => i + 1).map((i) => {
  const randCat1 = Math.floor(Math.random() * 5);
  const randCat2 = Math.floor(Math.random() * 5);

  const lookup = `test-item-${i}`;

  reusableItemData[lookup] = {
    Name: `Test Item ${i}`,
  };

  return {
    Lookup: lookup,
    Categories: [`Cat ${randCat1}`, `Cat ${randCat2}`],
    Type: 'Template',
  } as GalleryItem;
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof CreateFlowPage> = (args) => (
  <CreateFlowPage {...args} />
);

const baseArgs: CreateFlowPageProperties = {
  createFlow: (flow) => {
    alert('Create Flow');
  },
  getTemplateData: (lookup) => reusableItemData[lookup || ''],
  templates: reusableItems,
};

export const FlowName = template.bind({});
FlowName.args = {
  ...baseArgs,
};

export const WithFlowName = template.bind({});
WithFlowName.args = {
  ...baseArgs,
  flowName: 'Default Flow Name',
};

export const WithFlowTemplate = template.bind({});
WithFlowTemplate.args = {
  ...baseArgs,
  flowName: 'Default Flow Name',
  flowTemplate: 'test-item-1',
};
