export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    choices: {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }[];
  }


  export enum FinishReason {
    stop = 'stop',
    length = 'length',
    content_filter = 'content_filter',
    null = 'null'
  }


  export enum IChatRoles {
   System = 'system',
   Assistant = 'assistant',
   User = 'user'
  }

  export interface IMessageData {
    message: string,
    englishTranslation: string,
    detectedLanguage: string
  }
  
  export interface IMessageObject {
   id?: string;
   role: IChatRoles | string;
   content: string;
   chatId?:string
  }

  export interface IMessageAudio {
    id?: string;
    audio: ArrayBuffer
   }


  export interface IChatMessage{
    index?: number;
    message: IMessageObject | null;
    finishReason?: FinishReason | string;
    createdAt?: number;
  }

  export interface IChatResponse {
    success: boolean;
    messages :Array<IChatMessage>;
    createdAt?: number;
    error?: string;
  }

  export interface IChatRequest {
    chat?: Array<IMessageObject>;
    uid?: string;
    chatId?: string;
    newMessage: string;
    isInitialMessage?: boolean;
  }


  export interface ChatState {
    chatId: string | null;
    chat: Array<IMessageObject>;
    audioMessages: Array<IMessageAudio>;
    updatedAt: number;
    isQueryState: boolean;
    isInitialMessage:boolean;
  }


 export interface ILanguageOption {
  label: string;
  description: string;
  languageCode: string;
 }