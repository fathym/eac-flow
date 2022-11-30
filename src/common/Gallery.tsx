import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { DirectionAction, GalleryDisplay } from './GalleryDisplay';
import { GalleryItem } from './GalleryItem';

class GalleryProperties {
  public BaseActionStyles: SxProps<Theme>;

  public children!: (item: GalleryItem) => React.ReactNode;

  public items!: GalleryItem[];

  public itemSpacing?: string;

  public spacing?: string;

  public title?: string;

  constructor() {
    this.BaseActionStyles = {
      background: 'transparent',
      position: 'absolute',
      top: 0,
      bottom: 0,
      minWidth: '40px',
      fontWeight: 900,
      fontSize: '24px',
      color: 'black',
    };

    this.itemSpacing = '';

    this.spacing = '';
  }
}

class GalleryState {
  public SelectedItemLookup: string;

  constructor() {
    this.SelectedItemLookup = '';
  }
}

export default class Gallery extends React.Component<
  GalleryProperties,
  GalleryState
> {
  //#  Fields
  static defaultProps = new GalleryProperties();
  //#

  //# Properties
  //#

  //# Constructors
  constructor(props: GalleryProperties) {
    super(props);

    this.state = new GalleryState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {}
  //#

  //# API Methods
  public render() {
    const categoryMap =
      this.props.items?.reduce((map, item) => {
        item.Categories.forEach((cat) => {
          if (!map[cat]) {
            map[cat] = [];
          }

          map[cat].push(item);
        });

        return map;
      }, {} as { [cat: string]: GalleryItem[] }) || {};

    const categories = Object.keys(categoryMap);

    const curDisplay: React.ReactNode = !!this.state.SelectedItemLookup ? (
      <Box sx={{ margin: this.props.spacing }}>
        {this.state.SelectedItemLookup}
      </Box>
    ) : (
      categories.map((category) => {
        const catItems = categoryMap[category];

        return (
          <Box sx={{ padding: this.props.spacing }}>
            <GalleryDisplay
              key={category}
              title={category}
              spacing={this.props.itemSpacing}
              directionAction={this.loadDirectionAction()}
            >
              {catItems.map((catItem) => this.props.children(catItem))}
            </GalleryDisplay>
          </Box>
        );
      })
    );

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="left"
        alignItems="left"
        minHeight="100%"
      >
        <Typography variant="h4" component="div">
          {this.props.title}
        </Typography>

        {curDisplay}
      </Box>
    );
  }
  //#

  //# Helpers
  protected loadDirectionAction(): DirectionAction {
    return (direction, action) => {
      if (direction === 'left') {
        return (
          <Button
            onClick={action}
            sx={{
              ...this.props.BaseActionStyles,
              left: 0,
              backgroundImage:
                'linear-gradient(to right, #4a918e, transparent)',
            }}
          >
            {'<'}
          </Button>
        );
      } else {
        return (
          <Button
            onClick={action}
            sx={{
              ...this.props.BaseActionStyles,
              right: 0,
              backgroundImage: 'linear-gradient(to left, #4a918e, transparent)',
            }}
          >
            {'>'}
          </Button>
        );
      }
    };
  }
  //#
}
