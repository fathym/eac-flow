import EventEmitter from 'events';
import { IFluidContainer, ISharedMap, IValueChanged } from 'fluid-framework';
import {
  AzureContainerServices,
  AzureMember,
  IAzureAudience,
} from '@fluidframework/azure-client';

export type EventPayload = {
  type: string;
  changed: IValueChanged;
  data?: any;
};

export default class FluidContext extends EventEmitter {
  //# Fields
  protected audience: IAzureAudience;

  protected data: ISharedMap;
  //#

  //# Properties
  //#

  //# Constructors
  constructor(
    container: IFluidContainer,
    objectId: string,
    services: AzureContainerServices
  ) {
    super();

    this.audience = services.audience;

    this.data = container.initialObjects[objectId] as ISharedMap;

    this.data.on('valueChanged', this.handleValueChanged);

    this.audience.on('membersChanged', this.handleMembersChanged);
  }
  //#

  //# API Methods
  public CreateNode(id: string, data: Node) {
    if (this.data.get(id)) {
      // id already exists
      return;
    }

    this.data.set(id, data);
  }

  public DeleteNode = (id: string) => {
    this.data.delete(id);
  };

  public EditNode = (id: string, data: Partial<Node>) => {
    this.data.set(id, data);
  };

  public GetAudience(): AzureMember[] {
    const members = Array.from(this.audience.getMembers().values());

    return members;
  }

  public GetAllNodeIDs(): string[] {
    return Array.from(this.data.keys());
  }

  public GetAllNodes() {
    const nodeIds = this.GetAllNodeIDs();

    const nodes: Record<string, Node> = {};

    for (const id of nodeIds) {
      nodes[id] = this.GetNode(id);
    }

    return nodes;
  }

  public GetNode(id: string): Node {
    const node = this.data.get<Node>(id);

    if (node === undefined) {
      throw Error(`${id} not found`);
    }

    return node;
  }

  public NodeExists(id: string): boolean {
    return this.GetAllNodeIDs().includes(id);
  }
  //#

  //# Helpers
  protected handleMembersChanged(): void {
    this.emit('modelChanged', {
      type: 'members',
    });
  }

  protected handleValueChanged(
    changed: IValueChanged,
    local: boolean,
    target: ISharedMap
  ): void {
    const type = this.NodeExists(changed.key) ? 'change' : 'delete';

    this.emit('modelChanged', {
      type,
      changed,
    });
  }
  //#
}
