import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { HorizontalScroller } from '../../common/HorizontalScroller';

class TemplatesGalleryProperties {
  public templates?: any[];
}

class TemplatesGalleryState {
  public SelectedTemplateLookup: string;

  constructor() {
    this.SelectedTemplateLookup = '';
  }
}

export default class TemplatesGallery extends React.Component<
  TemplatesGalleryProperties,
  TemplatesGalleryState
> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: TemplatesGalleryProperties) {
    super(props);

    this.state = new TemplatesGalleryState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    return (
      <Box
        display="flex"
        flex="1"
        justifyContent="left"
        alignItems="left"
        minHeight="100%"
      >
        <HorizontalScroller>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((i) => {
            return <Box sx={{ width: '200px', height: '150px' }}>{i}</Box>;
          })}
        </HorizontalScroller>
      </Box>
    );
  }
  //#

  //# Helpers
  //#
}
