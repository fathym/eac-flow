import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Default as FathymActionDefault } from '../../common/FathymAction.stories';
import { FathymActionModel } from '../../../common/FathymAction';
import MainLayout from '../../../view/layouts/main.layout';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/Layouts/Main',
  component: MainLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MainLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof MainLayout> = (args) => (
  <MainLayout {...args}>
    <div>Fathym Main Layout</div>
  </MainLayout>
);

export const Default = template.bind({});
Default.args = {
  title: 'Fathym',
};

export const SingleAction = template.bind({});
SingleAction.args = {
  title: 'Fathym',
  actions: [
    {
      ...FathymActionDefault.args!.action,
    } as FathymActionModel,
  ],
};

export const MultipleActions = template.bind({});
MultipleActions.args = {
  title: 'Fathym',
  actions: [
    {
      ...FathymActionDefault.args!.action,
    } as FathymActionModel,
    {
      ...FathymActionDefault.args!.action,
    } as FathymActionModel,
    {
      ...FathymActionDefault.args!.action,
    } as FathymActionModel,
  ],
};
