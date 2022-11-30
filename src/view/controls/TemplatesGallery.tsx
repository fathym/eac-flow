import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { GalleryDisplay } from '../../common/GalleryDisplay';

class TemplatesGalleryProperties {
  public templates?: any[];

  public title?: string;
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
  static defaultProps = new TemplatesGalleryProperties();
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
        flexDirection="column"
        justifyContent="left"
        alignItems="left"
        minHeight="100%"
      >
        <Typography variant="h3" component="div">
          {this.props.title}
        </Typography>

        <GalleryDisplay title="Test 1">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((i) => {
            return <Box sx={{ width: '200px', height: '150px' }}>{i}</Box>;
          })}
        </GalleryDisplay>
      </Box>
    );
  }
  //#

  //# Helpers
  //#
}
