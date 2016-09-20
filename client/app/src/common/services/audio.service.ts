import {Injectable, Inject} from '@angular/core';

@Injectable()
export class Audio {
  
  public compressor: DynamicsCompressorNode;
  
  constructor(@Inject('audioContext') private audioCtx) {
    this.compressor = this.audioCtx.createDynamicsCompressor();
    if (this.compressor) {
      this.compressor.threshold.value = -20;
      this.compressor.knee.value = 10;
      this.compressor.ratio.value = 12;
      this.compressor.attack.value = 0;
      this.compressor.release.value = 0.25;
      // Try for lulz:
      // this.compressor.release.value = 0;
      this.compressor.connect(this.audioCtx.destination);
    }
  }
  
  public play(sample: AudioBuffer, panVal: number = 0) {
    const source: AudioBufferSourceNode = this.audioCtx.createBufferSource();
    if (source) {
      source.buffer = sample;
    }
    
    const pan: StereoPannerNode = this.audioCtx.createStereoPanner();
    if (pan) {
      pan.pan.value = panVal;
    }
    
    if (pan && source && this.compressor) {
      source.connect(pan);
      pan.connect(this.compressor);
      source.start(0);
  
      return () => {
        source.stop(0);
        source.disconnect();
        pan.disconnect();
      }
    } else {
      return () => {
        console.log('Audio is not supported');
      }
    }
  }
  
  public pinkNoiseNode(): ScriptProcessorNode {
    let b0: number, b1: number, b2: number, b3: number, b4: number, b5: number, b6: number;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    let node: ScriptProcessorNode = this.audioCtx.createScriptProcessor(4096, 1, 1);
    node.onaudioprocess = (e) => {
      let output: Float32Array = e.outputBuffer.getChannelData(0);
      for (let i: number = 0; i < 4096; i++) {
        let white: number = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // (roughly) compensate for gain
        b6 = white * 0.115926;
      }
    };
    return node;
  }
  
  public brownNoiseNode(): ScriptProcessorNode {
    let lastOut: number = 0.0;
    let node: ScriptProcessorNode = this.audioCtx.createScriptProcessor(4096, 1, 1);
    node.onaudioprocess = (e) => {
      let output: Float32Array = e.outputBuffer.getChannelData(0);
      for (let i: number = 0; i < 4096; i++) {
        var white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // (roughly) compensate for gain
      }
    };
    return node;
  }
  
  public gainFor(node): GainNode {
    let gain: GainNode = this.audioCtx.createGain();
    node.connect(gain);
    return gain;
  }
  
  public startNode(node) {
    node.connect(this.audioCtx.destination);
  }
  
  public stopNode(node) {
    node.disconnect();
  }
  
}
