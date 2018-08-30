import Tone from "tone"

class ToneSynth {

  constructor() {
    // "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", or "peaking"
    this.filter = new Tone.Filter(200, "lowpass")
    this.limiter = new Tone.Limiter(-10)

    this.masterBus = new Tone.Gain().chain(
      this.filter,
      this.limiter,
      Tone.Master
    )

    this.drive = new Tone.Distortion(0.1).receive("drive").connect(this.masterBus)
    this.chorus = new Tone.Chorus(4, 2.5, 0.5).receive("chorus").connect(this.masterBus)
    this.delay = new Tone.FeedbackDelay("8n", 0.5).receive("delay").connect(this.masterBus)
    this.reverb = new Tone.Freeverb().receive("reverb").connect(this.masterBus)

    this.compressor = new Tone.Compressor(-24, 12)

    this.polySynth = new Tone.PolySynth(12, Tone.DuoSynth).chain(
      this.compressor,
      this.masterBus
    )

    this.driveSendNode = this.polySynth.send("drive", -Infinity)
    this.chorusSendNode = this.polySynth.send("chorus", -Infinity)
    this.delaySendNode = this.polySynth.send("delay", -Infinity)
    this.reverbSendNode = this.polySynth.send("reverb", -Infinity)

    this.createOscillatorSettingCallbacks()
  }

  triggerAttackRelease(value, freq) {
    this.polySynth.triggerAttackRelease(value, freq)
  }

  // these are settings that do not apply to the N number of voices on the poly synthesizer
  static get TOP_LEVEL_SETTINGS() {
    return ["driveSend", "chorusSend", "delaySend", "reverbSend", "volume", "filterCutoff", "filterQ", "filterType"]
  }

  updateSetting(name, val) {
    if (this.constructor.TOP_LEVEL_SETTINGS.includes(name)) {
      this[name](val)
    } else {
      this.polySynth.voices.forEach(voice => {
        if (this[name] !== undefined) {
          this[name](voice, val) // voice should be an instance of the synth used (DuoSynth)
        } else {
          throw `${name} does not have a valid setting function defined`
        }
      })
    }
  }

  driveSend(val) {
    this.driveSendNode.gain.value = val
  }

  reverbSend(val) {
    this.reverbSendNode.gain.value = val
  }

  delaySend(val) {
    this.delaySendNode.gain.value = val
  }

  chorusSend(val) {
    this.chorusSendNode.gain.value = val
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
    this.filter.type.value = val
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
      console.log(val)
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
}

export default ToneSynth

