declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader, LoadingManager, Group, Animation } from 'three';

  export interface GLTF {
    scene: Group;
    scenes: Group[];
    animations: Animation[];
    asset: any;
    camera: any;
    parser: any;
    userData: any;
  }

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (error: ErrorEvent) => void
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<GLTF>;
    parse(data: ArrayBuffer | string, path: string, onLoad: (gltf: GLTF) => void, onError?: (error: Error) => void): void;
  }
}
