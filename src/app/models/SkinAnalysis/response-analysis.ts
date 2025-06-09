import { InferenceResult } from "./inference-result";
import { SkinAnalysis } from "./skin-analysis";

export interface ResponseAnalysis {
    skinAnalysis: SkinAnalysis;
    inferenceResult: InferenceResult;
}
