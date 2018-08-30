const initialState = {
  filter: {
    filterType: "lowpass",
    dials: {
      cutoff: {
        dialValue: 20000,
      },
      q: {
        dialValue: 4,
      }
    }
  },
  modulation: {
    dials: {
      vibratoAmount: {
        dialValue: 0.0
      },
      vibratoRate: {
        dialValue: 0.0
      },
      harmonicity: {
        dialValue: 1.0
      }
    }
  },
  oscillator1: {
    selects: {
      oscillator1Type: {
        selectValue: 'sine'
      }
    },
    dials: {
      oscillator1Volume: {
        dialValue: -10.0
      },
      oscillator1Portamento: {
        dialValue: 0.0
      },
      oscillator1Detune: {
        dialValue: 0.0
      },
      oscillator1FilterCutoff: {
        dialValue: 350.0
      },
      oscillator1FilterQ: {
        dialValue: 6.0
      }
    }
  },
  oscillator2: {
    selects: {
      oscillator2Type: {
        selectValue: 'sine'
      }
    },
    dials: {
      oscillator2Volume: {
        dialValue: -10.0
      },
      oscillator2Portamento: {
        dialValue: 0.0
      },
      oscillator2Detune: {
        dialValue: 0.0
      },
      oscillator2FilterQ: {
        dialValue: 6.0
      },
      oscillator2FilterCutoff: {
        dialValue: 350.0
      }
    }
  },
  oscillator1FilterEnvelope: {
    dials: {
      oscillator1FilterEnvelopeAttack: {
        dialValue: 0.06
      },
      oscillator1FilterEnvelopeDecay: {
        dialValue: 0.2
      },
      oscillator1FilterEnvelopeSustain: {
        dialValue: 0.5
      },
      oscillator1FilterEnvelopeRelease: {
        dialValue: 2.0
      }
    }
  },
  oscillator2FilterEnvelope: {
    dials: {
      oscillator2FilterEnvelopeAttack: {
        dialValue: 0.06
      },
      oscillator2FilterEnvelopeDecay: {
        dialValue: 0.2
      },
      oscillator2FilterEnvelopeSustain: {
        dialValue: 0.5
      },
      oscillator2FilterEnvelopeRelease: {
        dialValue: 2.0
      }
    }
  },
  oscillator1VolumeEnvelope: {
    dials: {
      oscillator1VolumeEnvelopeAttack: {
        dialValue: 0.005
      },
      oscillator1VolumeEnvelopeDecay: {
        dialValue: 0.5
      },
      oscillator1VolumeEnvelopeSustain: {
        dialValue: 1.0
      },
      oscillator1VolumeEnvelopeRelease: {
        dialValue: 1.0
      }
    }
  },
  oscillator2VolumeEnvelope: {
    dials: {
      oscillator2VolumeEnvelopeAttack: {
        dialValue: 0.005
      },
      oscillator2VolumeEnvelopeDecay: {
        dialValue: 0.5
      },
      oscillator2VolumeEnvelopeSustain: {
        dialValue: 1.0
      },
      oscillator2VolumeEnvelopeRelease: {
        dialValue: 1.5
      }
    }
  },
  sequencer: {
    isPlaying: false,
    bpm: 100,
    sequencerRows: []
  }
}

export default initialState
