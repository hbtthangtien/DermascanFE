export interface Prediction {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class: string;
    classId: number;
    detectionId: number;
}
