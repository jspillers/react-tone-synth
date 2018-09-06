const initialState = {
  filter: {
    filterType: 'lowpass',
    filterCutoff: 20000,
    filterQ: 3.0
  },
  master: {
    drive: 0.0,
    reverb: 0.0,
    delay: 0.0,
    chorus: 0.0,
    volume: -10.0
  },
  modulation: {
    vibratoAmount: 0.0,
    vibratoRate: 0.0,
    harmonicity: 1.0
  },
  oscillator1: {
    oscillator1Type: 'sine',
    oscillator1Volume: -10.0,
    oscillator1Portamento: 0.0,
    oscillator1Detune: 0.0,
    oscillator1FilterCutoff: 350.0,
    oscillator1FilterQ: 6.0
  },
  oscillator2: {
    oscillator2Type: 'sine',
    oscillator2Volume: -10.0,
    oscillator2Portamento: 0.0,
    oscillator2Detune: 0.0,
    oscillator2FilterQ: 6.0,
    oscillator2FilterCutoff: 350.0
  },
  oscillator1FilterEnvelope: {
    oscillator1FilterEnvelopeAttack: 0.06,
    oscillator1FilterEnvelopeDecay: 0.2,
    oscillator1FilterEnvelopeSustain: 0.5,
    oscillator1FilterEnvelopeRelease: 2.0
  },
  oscillator2FilterEnvelope: {
    oscillator2FilterEnvelopeAttack: 0.06,
    oscillator2FilterEnvelopeDecay: 0.2,
    oscillator2FilterEnvelopeSustain: 0.5,
    oscillator2FilterEnvelopeRelease: 2.0
  },
  oscillator1VolumeEnvelope: {
    oscillator1VolumeEnvelopeAttack: 0.005,
    oscillator1VolumeEnvelopeDecay: 0.5,
    oscillator1VolumeEnvelopeSustain: 1.0,
    oscillator1VolumeEnvelopeRelease: 1.0
  },
  oscillator2VolumeEnvelope: {
    oscillator2VolumeEnvelopeAttack: 0.005,
    oscillator2VolumeEnvelopeDecay: 0.5,
    oscillator2VolumeEnvelopeSustain: 1.0,
    oscillator2VolumeEnvelopeRelease: 1.0
  },
  sequencer: {
    mouseDown: null,
    isPlaying: false,
    bpm: 100,
    sequencerRows: []
  }
}

export default initialState
