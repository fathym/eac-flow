import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Default as FathymActionDefault } from '../../common/FathymAction.stories';
import { FathymActionModel } from '../../../common/FathymAction';
import NoEscapeLayout from '../../../view/layouts/no-escape.layout';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Views/Layouts/No Escape Layout',
  component: NoEscapeLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NoEscapeLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof NoEscapeLayout> = (args) => (
  <NoEscapeLayout {...args}>
    <div>Fathym No Escape Layout</div>
  </NoEscapeLayout>
);

export const Default = template.bind({});
Default.args = {
  title: 'Fathym',
};

export const SingleAction = template.bind({});
SingleAction.args = {
  title: 'Fathym',
  action: {
    ...FathymActionDefault.args!.action,
  } as FathymActionModel,
};
