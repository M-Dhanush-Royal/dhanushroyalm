export interface VideoAnalysis {
    id?: string;
    created_at?: string;
    source: 'live' | 'upload';
    confidence_score: number;
    duration_seconds?: number;
    metadata: Record<string, any>;
    anomalies_detected?: number;
}
