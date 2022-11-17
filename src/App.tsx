import React from 'react';
import './App.css';
import { SharedMap } from 'fluid-framework';
import {
  AzureClient,
  AzureClientProps,
  AzureLocalConnectionConfig,
  AzureRemoteConnectionConfig,
  AzureUser,
} from '@fluidframework/azure-client';
import { InsecureTokenProvider } from '@fluidframework/test-client-utils';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import FlowsPage from './view/pages/Flows.page';
import FlowPage from './view/pages/Flow.page';
import CreateFlowPage from './view/pages/CreateFlow.page';
import FlowLayout from './view/layouts/flow.layout';
import MainLayout from './view/layouts/main.layout';
import NoEscapeLayout from './view/layouts/no-escape.layout';
import { FathymActionModel } from './common/action.model';

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
    // await this.setCurrentTime();
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
    const standardActions: FathymActionModel[] = [
      {
        Action: '/dashboard',
        Text: 'Home',
      },
      {
        Action: '/flows',
        Text: 'Flows',
      },
    ];

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/flows" replace />} />

          <Route path="flow">
            <Route
              path=":id"
              element={
                <FlowLayout title="Flow Manager" actions={standardActions}>
                  <FlowPage />
                </FlowLayout>
              }
            />
          </Route>

          <Route path="flows">
            <Route
              path=""
              element={
                <MainLayout title="Flows" actions={standardActions}>
                  <FlowsPage />
                </MainLayout>
              }
            />

            <Route
              path="create"
              element={
                <NoEscapeLayout title="Create a Flow">
                  <CreateFlowPage />
                </NoEscapeLayout>
              }
            />
          </Route>
        </Routes>
      </Router>
    );
  }
  //#

  //# Helpers
  protected buildClient(): AzureClient {
    const config: AzureRemoteConnectionConfig | AzureLocalConnectionConfig = {
      tokenProvider: new InsecureTokenProvider('', {
        id: 'userId',
      } as AzureUser),
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
