import React from 'react';
import Box from '@mui/material/Box';

export class HorizontalScrollerProperties {
  public children!: React.ReactNode[];

  public onScroll?: (position: number) => void;

  public spacing?: string;

  constructor() {
    this.spacing = '';
  }
}

class HorizontalScrollerState {}

export class HorizontalScroller extends React.Component<
  HorizontalScrollerProperties,
  HorizontalScrollerState
> {
  //# Fields
  protected scrollContainer: React.RefObject<HTMLDivElement>;
  //#

  //# Properties
  public get Position(): number {
    return this.scrollContainer?.current?.scrollLeft || 0;
  }

  public get ScrollWidth(): number {
    return this.scrollContainer?.current?.scrollWidth || 0;
  }

  public get Width(): number {
    return this.scrollContainer?.current?.offsetWidth || 0;
  }
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: HorizontalScrollerProperties) {
    super(props);

    this.scrollContainer = React.createRef<HTMLDivElement>();
  }
  //#

  //# Life Cycle
  public componentDidMount() {
    this.scrollContainer.current?.addEventListener('scroll', (e) => {
      this.emitScrollEvent();
    });

    this.emitScrollEvent();
  }

  public render(): React.ReactNode {
    return (
      <Box
        ref={this.scrollContainer}
        display="flex"
        sx={{ overflowX: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}
      >
        {this.props.children.map((child, i) => {
          return (
            <Box
              flexGrow={0}
              flexShrink={0}
              flexBasis="auto"
              sx={{ padding: this.props.spacing }}
              key={i}
            >
              {child}
            </Box>
          );
        })}
      </Box>
    );
  }
  //#

  //# API Methods
  public Scroll(velocity: number, direction: 'left' | 'right'): void {
    if (velocity < 0) {
      velocity = 0;
    } else if (velocity > 1) {
      velocity = 1;
    }

    const div = this.scrollContainer?.current;

    if (!!div) {
      const nextScrollAmount =
        (this.ScrollWidth - this.Width) * velocity * (direction === 'right' ? 1 : -1);

      div?.scrollBy({
        left: nextScrollAmount,
      });
    }
  }
  //#

  //# Helpers
  protected emitScrollEvent() {
    if (!!this.props.onScroll) {
      this.props.onScroll(this.Position || 0);
    }
  }
  //#
}
