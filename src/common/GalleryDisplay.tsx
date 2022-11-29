import React from 'react';
import Box from '@mui/material/Box';
import { HorizontalScroller } from './HorizontalScroller';
import Typography from '@mui/material/Typography';

export type DirectionAction = (
  direction: 'left' | 'right',
  action: () => void
) => React.ReactNode;

export class GalleryDisplayProperties {
  public children!: React.ReactNode[];

  public directionAction?: DirectionAction;

  public scrollVelocity: number;

  public spacing?: string;

  public title?: string;

  constructor() {
    this.scrollVelocity = .1;

    this.spacing = '';
  }
}

class GalleryDisplayState {
  public Position: number;

  constructor() {
    this.Position = 0;
  }
}

export class GalleryDisplay extends React.Component<
  GalleryDisplayProperties,
  GalleryDisplayState
> {
  //# Fields
  static defaultProps = new GalleryDisplayProperties();

  protected scroller: React.RefObject<HorizontalScroller>;
  //#

  //# Properties
  //#

  //# Constructors
  constructor(props: GalleryDisplayProperties) {
    super(props);

    this.scroller = React.createRef();

    this.state = new GalleryDisplayState();
  }
  //#

  //# Life Cycle
  public render(): React.ReactNode {
    return (
      <Box
        display="flex"
        flexDirection="column"
        sx={{ overflowX: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}
      >
        <Typography variant="h4">{this.props.title}</Typography>

        <Box display="flex" flexDirection="row" sx={{ position: 'relative' }}>
          {this.loadPrevAction()}

          <HorizontalScroller
            ref={this.scroller}
            spacing={this.props.spacing}
            onScroll={(pos) => this.handleScroll(pos)}
          >
            {this.props.children}
          </HorizontalScroller>

          {this.loadNextAction()}
        </Box>
      </Box>
    );
  }
  //#

  //# API Methods
  //#

  //# Helpers
  protected handleNextClick(): void {
    this.scroller?.current?.Scroll(this.props.scrollVelocity, 'right');
  }

  protected handlePrevClick(): void {
    this.scroller?.current?.Scroll(this.props.scrollVelocity, 'left');
  }

  protected handleScroll(position: number): void {
    this.setState({
      Position: position,
    });
  }

  protected loadNextAction(): React.ReactNode {
    const maxPosition =
      (this.scroller?.current?.ScrollWidth || 0) -
      (this.scroller?.current?.Width || 0) -
      1;  // Due to how the scroll position works, need to sutract 1 to fit within the proper max

    return (
      !!this.props.directionAction &&
      this.state.Position < maxPosition &&
      this.props.directionAction('right', () => this.handleNextClick())
    ); // && this.scroll;
  }

  protected loadPrevAction(): React.ReactNode {
    return (
      !!this.props.directionAction &&
      this.state.Position > 0 &&
      this.props.directionAction('left', () => this.handlePrevClick())
    ); // && this.scroll;
  }
  //#
}
