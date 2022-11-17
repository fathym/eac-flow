import React from 'react';
import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export enum FathymActionTypes {
  Button = 'Button',
  ListItem = 'ListItem',
}

export class FathymActionModel {
  public Action!: string | (() => Promise<void>);

  public Actions?: FathymActionModel[];

  public EndIcon?: React.ReactNode;

  public StartIcon?: React.ReactNode;

  public Text?: string;
}

export class FathymActionProperties {
  public action!: FathymActionModel;

  public children?: React.ReactNode;

  public sx?: SxProps<Theme>;

  public type!: FathymActionTypes;

  constructor() {
    this.type = FathymActionTypes.Button;
  }
}

class FathymActionState {}

export class FathymAction extends React.Component<
  FathymActionProperties,
  FathymActionState
> {
  //# Fields
  protected get actionHandler(): (() => void) | undefined {
    return typeof this.props.action.Action === 'function'
      ? (this.props.action.Action as () => void)
      : undefined;
  }

  protected get actionPath(): string | undefined {
    return typeof this.props.action.Action === 'string'
      ? (this.props.action.Action as string)
      : undefined;
  }
  //#

  //# Properties
  //#

  //# Constructors
  //#

  //# API Methods
  public render(): React.ReactNode {
    switch (this.props.type) {
      case FathymActionTypes.ListItem:
        return (
          <ListItemButton
            sx={this.props.sx}
            href={this.actionPath as string}
            onClick={this.actionHandler}
          >
            {this.props.action.StartIcon ? (
              <ListItemIcon>{this.props.action.StartIcon}</ListItemIcon>
            ) : (
              ''
            )}

            <ListItemText primary={this.props.action.Text} />

            {this.props.action.EndIcon ? (
              <ListItemIcon>{this.props.action.EndIcon}</ListItemIcon>
            ) : (
              ''
            )}
          </ListItemButton>
        );

      case FathymActionTypes.Button:
      default:
        return (
          <Button
            endIcon={this.props.action.EndIcon}
            sx={this.props.sx}
            startIcon={this.props.action.StartIcon}
            href={this.actionPath}
            onClick={this.actionHandler}
          >
            {this.props.action.Text}
          </Button>
        );
    }
  }
  //#

  //# Helpers
  //#
}
