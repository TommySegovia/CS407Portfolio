import { AnimationMixer } from "three";

function setupModel(data : any){
    const model = data.scene.children[0];

    model.tick = (delta : number) => {
    };

    return model;
}

export { setupModel };