import { ImageDetails } from "./image-details";
import { Prediction } from "./prediction";

export interface InferenceResult {
    time: number;
    image: ImageDetails;
    predictions:Prediction[];
}
