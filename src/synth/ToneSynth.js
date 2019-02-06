import Tone from "tone"

class ToneSynth {

  constructor(initialState, synthType) {
    this.filter = new Tone.Filter(20000, "lowpass")
    this.limiter = new Tone.Limiter(-10)

    this.masterBus = new Tone.Gain().chain(
      this.filter,
      this.limiter,
      Tone.Master
    )

    this.reverbNode = new Tone.Freeverb()
    this.chorusNode = new Tone.Chorus(4, 2.5, 0.5)
    this.driveNode = new Tone.Distortion(0.1)
    this.delayNode = new Tone.FeedbackDelay("8n", 0.5)
    this.compressor = new Tone.Compressor(-24, 12)

    this.synth = new Tone.PolySynth(12, synthType)

    this.synth.chain(
      this.compressor,
      this.reverbNode,
      this.chorusNode,
      this.driveNode,
      this.delayNode,
      this.masterBus
    )

    this.createOscillatorSettingCallbacks()
    this.initInitialSettings(initialState)
  }

  triggerAttackRelease(value, freq) {
    this.synth.triggerAttackRelease(value, freq)
  }

  // these are settings that do not apply to the N number of voices on the poly synthesizer
  static get TOP_LEVEL_SETTINGS() {
    return ["drive", "chorus", "delay", "reverb", "volume", "filterCutoff", "filterQ", "filterType"]
  }

  updateSetting(name, val) {
    if (this.constructor.TOP_LEVEL_SETTINGS.includes(name)) {
      this[name](val)
    } else {
      this.synth.voices.forEach(voice => {
        if (this[name] !== undefined) {
          this[name](voice, val) // voice should be an instance of the synth used (DuoSynth)
        } else {
          throw new Error(`${name} does not have a valid setting function defined`)
        }
      })
    }
  }

  drive(val) {
    this.driveNode.wet.value = val
  }

  reverb(val) {
    this.reverbNode.wet.value = val
  }

  delay(val) {
    this.delayNode.wet.value = val
  }

  chorus(val) {
    this.chorusNode.wet.value = val
  }

  volume(val) {
    Tone.Master.volume.value = val
  }

  filterCutoff(val) {
    this.filter.frequency.value = val
  }

  filterQ(val) {
    this.filter.Q.value = val
  }

  // "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", or "peaking"
  filterType(val) {
    this.filter.type = val
  }

  vibratoAmount(voice, val) {
    voice.vibratoAmount.value = val
  }

  vibratoRate(voice, val) {
    voice.vibratoRate.value = val
  }

  harmonicity(voice, val) {
    voice.harmonicity.value = val
  }

  createOscillatorSettingCallbacks() {
    this.oscillatorSettingCallbacks("oscillator1", "voice0")
    this.oscillatorSettingCallbacks("oscillator2", "voice1")
  }

  oscillatorSettingCallbacks(oscName, voiceName) {
    this[oscName + "Type"] = (voice, val) => {
      voice[voiceName].oscillator.type = val
      voice[voiceName].oscillator.stop()
      voice[voiceName].oscillator.start()
    }

    this[oscName + "Volume"] = (voice, val) => {
      voice[voiceName].volume.value = val
    }

    this[oscName + "Portamento"] = (voice, val) => {
      voice[voiceName].portamento = val
    }

    this[oscName + "Detune"] = (voice, val) => {
      voice[voiceName].detune.value = val
    }

    this[oscName + "FilterCutoff"] = (voice, val) => {
      voice[voiceName].filter.frequency.value = val
    }

    this[oscName + "FilterQ"] = (voice, val) => {
      voice[voiceName].filter.Q.value = val
    }

    this[oscName + "FilterEnvelopeAttack"] = (voice, val) => {
      voice[voiceName].filterEnvelope.attack = val
    }

    this[oscName + "FilterEnvelopeDecay"] = (voice, val) => {
      voice[voiceName].filterEnvelope.decay = val
    }

    this[oscName + "FilterEnvelopeSustain"] = (voice, val) => {
      voice[voiceName].filterEnvelope.sustain = val
    }

    this[oscName + "FilterEnvelopeRelease"] = (voice, val) => {
      voice[voiceName].filterEnvelope.release = val
    }

    this[oscName + "VolumeEnvelopeAttack"] = (voice, val) => {
      voice[voiceName].envelope.attack = val
    }

    this[oscName + "VolumeEnvelopeDecay"] = (voice, val) => {
      voice[voiceName].envelope.decay = val
    }

    this[oscName + "VolumeEnvelopeSustain"] = (voice, val) => {
      voice[voiceName].envelope.sustain = val
    }

    this[oscName + "VolumeEnvelopeRelease"] = (voice, val) => {
      voice[voiceName].envelope.release = val
    }
  }

  initInitialSettings(initialState) {
    Object.keys(initialState).forEach((parentName) => {
      if (parentName !== "sequencer") {
        Object.keys(initialState[parentName]).forEach((settingName) => {
          this.updateSetting(settingName, initialState[parentName][settingName])
        })
      }
    })
  }
}

export default ToneSynth

