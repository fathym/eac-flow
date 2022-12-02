import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Box from '@mui/material/Box';
import TemplatesGallery from '../../common/Gallery';
import { GalleryItem } from '../../common/GalleryItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Common/Gallery',
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

const reusableItemData: { [lookup: string]: any } = {};

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
    Type: 'AType',
  };
});

const basicGalleryItemBox = (
  catItem: GalleryItem,
  itemSelected: () => void
) => (
  <Box
    key={catItem.Lookup}
    sx={{
      width: '100px',
      display: 'flex',
      height: '100px',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onClick={() => itemSelected()}
  >
    {reusableItemData[catItem.Lookup].Name}
  </Box>
);

const singleItemBox = (catItem: GalleryItem) => catItem.Lookup;

export const Default = template.bind({});
Default.args = {
  title: 'A Gallery',
  items: reusableItems,
  singleItemDisplay: singleItemBox,
  singleItemTitle: (catItem) =>
    `Select ${reusableItemData[catItem.Lookup].Name} Template`,
  useItem: (catItem) => alert(catItem.Lookup),
  children: basicGalleryItemBox
};
