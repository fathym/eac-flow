import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  FathymAction,
  FathymActionModel,
  FathymActionTypes,
} from '../common/FathymAction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/FathymAction',
  component: FathymAction,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FathymAction>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const template: ComponentStory<typeof FathymAction> = (args) => (
  <FathymAction {...args} />
);
const templateListItem: ComponentStory<typeof FathymAction> = (args) => (
  <List>
    <ListItem disablePadding>
      <FathymAction {...args} />
    </ListItem>
  </List>
);

export const Default = template.bind({});
Default.args = {
  action: {
    Action: 'https://www.fathym.com/',
    Text: 'Fathym',
  } as FathymActionModel,
  type: FathymActionTypes.Button,
};

export const WithVariant = template.bind({});
WithVariant.args = {
  action: {
    Action: 'https://www.fathym.com/',
    Text: 'Fathym',
    variant: 'outlined',
  } as FathymActionModel,
  type: FathymActionTypes.Button,
};

export const WithChildren = template.bind({});
WithChildren.args = {
  action: {
    Action: 'https://www.fathym.com/',
  } as FathymActionModel,
  children: <div>Fathym</div>,
  type: FathymActionTypes.Button,
};

export const WithChildrenWithColor = template.bind({});
WithChildrenWithColor.args = {
  action: {
    Action: 'https://www.fathym.com/',
    color: 'error',
  } as FathymActionModel,
  children: (
    <h3>
      <strong>Fathym</strong>
    </h3>
  ),
  type: FathymActionTypes.Button,
};

export const WithTargetBlank = template.bind({});
WithTargetBlank.args = {
  action: {
    Action: 'https://www.fathym.com/',
    Text: 'Fathym',
    target: '_blank',
  } as FathymActionModel,
  type: FathymActionTypes.Button,
};

export const ListItemDefault = templateListItem.bind({});
ListItemDefault.args = {
  action: {
    Action: 'https://www.fathym.com/',
    Text: 'Fathym',
  } as FathymActionModel,
  type: FathymActionTypes.ListItem,
};

export const ListItemWithChildren = template.bind({});
ListItemWithChildren.args = {
  action: {
    Action: 'https://www.fathym.com/',
  } as FathymActionModel,
  children: <div>Fathym</div>,
  type: FathymActionTypes.ListItem,
};

export const ListItemWithTargetBlank = template.bind({});
ListItemWithTargetBlank.args = {
  action: {
    Action: 'https://www.fathym.com/',
    Text: 'Fathym',
    target: '_blank',
  } as FathymActionModel,
  type: FathymActionTypes.ListItem,
};
