export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
  }
  
export interface TextToSpeechRequest {
    text: string;
    model_id?: string;
    voice_id?: string;
    voice_settings?: VoiceSettings;
}

export interface AudioStreamListeners {
    onPlay: () => void;
    onFinished: () => void;
    onLoadError: () => void;
    onPlayError:()=>void;
}