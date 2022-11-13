import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoadableObjectRecord, SharedMap } from 'fluid-framework';
import {
  AzureClient,
  AzureClientProps,
  AzureLocalConnectionConfig,
  AzureRemoteConnectionConfig,
  AzureUser,
} from '@fluidframework/azure-client';
import { InsecureTokenProvider } from '@fluidframework/test-client-utils';

class AppProperties {}

class AppState {
  public Data?: SharedMap;

  public Time?: Date;
}

export default class App extends React.Component<AppProperties, AppState> {
  //#  Fields
  //#

  //# Properties
  //#

  //# Constructors
  /**
   *
   */
  constructor(props: AppProperties) {
    super(props);

    this.state = new AppState();
  }
  //#

  //# Life Cycle
  public async componentDidMount() {
    await this.setCurrentTime();
  }
  //#
  protected async setCurrentTime() {
    let sharedTime = await this.getFluidSharedTime();

    this.setState({
      Time: sharedTime.get('current'),
    });
  }

  //# API Methods
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          {/* <p>{this.state.Time?.getUTCMilliseconds()}</p> */}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  //#

  //# Helpers
  protected buildClient(): AzureClient {
    const config: AzureRemoteConnectionConfig | AzureLocalConnectionConfig = {
      tokenProvider: new InsecureTokenProvider('', { id: 'userId' } as AzureUser),
      endpoint: 'http://localhost:7070',
      type: 'local',
    };

    const clientProps: AzureClientProps = {
      connection: config,
    };

    const client = new AzureClient(clientProps);

    return client;
  }

  protected async getFluidSharedTime(): Promise<SharedMap> {
    const client = this.buildClient();

    const containerSchema = {
      initialObjects: { sharedTime: SharedMap },
    };

    let container;
    const containerId = window.location.hash.substring(1);
    if (!containerId) {
      ({ container } = await client.createContainer(containerSchema));

      let sharedTime = container.initialObjects.sharedTime as SharedMap;

      sharedTime.set('current', Date.now().toString());

      const id = await container.attach();

      window.location.hash = id;
    } else {
      ({ container } = await client.getContainer(containerId, containerSchema));
    }

    return container.initialObjects.sharedTime as SharedMap;
  }
  //#
}
