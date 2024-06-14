import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

type AnimationTheme = "dark" | "light";

const DEFAULT_THEME: AnimationTheme = "light";

export class Animation {
  private width: number;
  private height: number;
  private theme: AnimationTheme = "light";
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;
  protected geometries: THREE.Mesh[] = [];
  protected directionalLight: THREE.DirectionalLight | undefined;
  protected hemisphereLight: THREE.HemisphereLight | undefined;

  constructor(el: HTMLDivElement) {
    this.width = window.innerWidth / 2;
    this.height = window.innerWidth / 2;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setAnimationLoop(this.animate.bind(this));

    el.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 9, 15);
    this.camera.rotation.set(75, 0, 0);

    this.addModel();
    this.addLights();
    this.setTheme(DEFAULT_THEME);
  }

  public setTheme(theme: AnimationTheme): void {
    let backgroundColor = 0x000000;

    if (theme === "dark") {
      backgroundColor = 0x0a0a0a;
    }

    if (theme === "light") {
      backgroundColor = 0xffffff;
    }

    this.theme = theme;
    this.scene.background = new THREE.Color(backgroundColor);

    if (this.directionalLight) {
      this.directionalLight.color = new THREE.Color(
        this.theme === "dark" ? 0xffffff : 0x0a0a0a
      );
    }

    if (this.hemisphereLight) {
      this.hemisphereLight.color = new THREE.Color(
        this.theme === "dark" ? 0x0a0a0a : 0xffffff
      );
    }
  }

  private animate(): void {
    for (let i = 0; i < this.geometries.length; i++) {
      const geometry = this.geometries[i];
      geometry.rotation.x += 0.01;
      geometry.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private addLights(): void {
    {
      const color = 0x0a0a0a;
      const intensity = 2.5;
      this.directionalLight = new THREE.DirectionalLight(color, intensity);
      this.directionalLight.position.set(10, 10, 10);
      this.directionalLight.target.position.set(-6, 0, -9);
      this.scene.add(this.directionalLight);
      this.scene.add(this.directionalLight.target);
    }

    {
      const skyColor = 0xffffff;
      const groundColor = 0xb97a20;
      const intensity = 2;
      this.hemisphereLight = new THREE.HemisphereLight(
        skyColor,
        groundColor,
        intensity
      );
      this.scene.add(this.hemisphereLight);
    }
  }

  private addModel() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./room/scene.gltf", (gltfScene) => {
      gltfScene.scene.rotateY(-0.75);
      this.scene.add(gltfScene.scene);
    });
  }
}
