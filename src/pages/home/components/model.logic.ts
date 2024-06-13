import * as THREE from "three";

export class Animation {
  private width: number;
  private height: number;
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;
  protected geometries: THREE.Mesh[] = [];

  constructor(el: HTMLDivElement) {
    this.width = window.innerWidth / 2;
    this.height = window.innerWidth / 2;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop(this.animate.bind(this));

    el.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;
  }

  private animate(): void {
    for (let i = 0; i < this.geometries.length; i++) {
      const geometry = this.geometries[i];
      geometry.rotation.x += 0.01;
      geometry.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }

  public addGeometry(): void {
    const getR = (base: number): number => {
      const min = -base;
      const max = base;
      const r  = Math.random() * (max - min) + min;
      return (r === 0) ? getR(base) : r;
    }

    const side = getR(2);
    const geometry = new THREE.BoxGeometry(side, side, side);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.x = getR(2);
    cube.position.y = getR(2);
    cube.position.z = getR(2);

    this.geometries.push(cube);
    this.scene.add(cube);
    this.renderer.render(this.scene, this.camera);
  }
}

