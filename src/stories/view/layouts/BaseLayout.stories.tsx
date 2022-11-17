import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseLayout from '../../../view/layouts/base.layout';
import { Default as FathymActionDefault } from '../../common/FathymAction.stories';
import { FathymActionModel } from '../../../common/FathymAction';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/Layouts/Base Layout',
  component: BaseLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BaseLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof BaseLayout> = (args) => (
  <BaseLayout {...args}>
    <div>Fathym Base Layout</div>
  </BaseLayout>
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
