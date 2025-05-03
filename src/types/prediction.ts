export interface Prediction {
    label: string;
    confidence: number;
    gradCam: string;
    inferenceTime: number;
    image: File;
  }
  
  export interface PredictionResponse {
    success: boolean;
    label: string;
    confidence: number;
    gradCam: string;
    inferenceTime: number;
    error?: string;
  }