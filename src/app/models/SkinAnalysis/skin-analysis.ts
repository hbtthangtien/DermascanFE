import { Advice } from "./advice";
import { OverallAnalysis } from "./overall-analysis";
import { SkinZoneAnalysis } from "./skin-zone-analysis";
import { SuggestedProduct } from "./suggested-product";

export interface SkinAnalysis {
    userId:number;
    overallAnalysis: OverallAnalysis;
    skinZoneAnalysis: SkinZoneAnalysis[];
    suggestedProducts: SuggestedProduct[];
    advice: Advice;
}
