import { useState, useRef } from 'react';
import Card from './ui/Card';
import { Video, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import MetricCard from './ui/MetricCard';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { VideoAnalysis } from '../types/database';

type UploadState = 'idle' | 'analyzing' | 'complete';
interface Result {
    confidence: number;
    isAuthentic: boolean;
    totalFrames: number;
    suspiciousFrames: number;
    duration: string;
    summary: string;
}

const UploadTab = () => {
    const [uploadState, setUploadState] = useState<UploadState>('idle');
    const [result, setResult] = useState<Result | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !file.type.startsWith('video/')) {
            alert('Please upload a valid video file.');
            return;
        }

        setUploadState('analyzing');
        setResult(null);

        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate analysis

        const confidence = 65 + Math.random() * 30;
        const isAuthentic = confidence > 80;
        const totalFrames = 450 + Math.floor(Math.random() * 200);
        const suspiciousFrames = isAuthentic ? 0 : Math.floor(Math.random() * 50);
        const durationInSeconds = 135; // 2:15

        const newResult: Result = {
            confidence,
            isAuthentic,
            totalFrames,
            suspiciousFrames,
            duration: '2:15',
            summary: isAuthentic
                ? 'Video appears to be authentic with no significant manipulation detected. All detection algorithms passed with high confidence scores. Facial landmarks, lighting consistency, and temporal coherence are all within normal parameters.'
                : 'Multiple suspicious patterns detected. Video may contain deepfake elements. Inconsistencies found in facial landmarks, lighting patterns, and edge artifacts. Recommend further manual review.'
        };
        setResult(newResult);
        setUploadState('complete');

        // Save to Supabase
        const analysisData: VideoAnalysis = {
            source: 'upload',
            confidence_score: parseFloat(newResult.confidence.toFixed(2)),
            duration_seconds: durationInSeconds,
            metadata: {
                total_frames: newResult.totalFrames,
                file_name: file.name,
                file_size: file.size,
            },
            anomalies_detected: newResult.suspiciousFrames
        };

        const tableName = newResult.isAuthentic ? 'real_videos' : 'fake_videos';
        const { error } = await supabase.from(tableName).insert([analysisData]);

        if (error) {
            console.error('Error saving upload analysis to Supabase:', error);
        } else {
            console.log(`Upload analysis saved to ${tableName}`);
        }
    };

    return (
        <div className="animate-fade-in">
            <Card className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2"><Upload /> Upload Video for Analysis</h2>
                
                {uploadState === 'idle' && (
                    <div onClick={handleFileClick} className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:border-primary hover:bg-gray-100">
                        <Video className="w-16 h-16 mx-auto mb-5 text-gray-400" />
                        <h3 className="mb-2 text-primary font-semibold text-lg">Click to upload video file</h3>
                        <p className="text-gray-500">Supports MP4, MOV, AVI, WebM (Max 500MB)</p>
                    </div>
                )}
                
                <input type="file" ref={fileInputRef} accept="video/*" className="hidden" onChange={handleFileUpload} />

                {uploadState === 'analyzing' && (
                    <div className="text-center py-10">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-primary font-semibold text-lg">Analyzing video...</p>
                    </div>
                )}

                {uploadState === 'complete' && result && (
                    <div className="animate-fade-in">
                        <div className="bg-gray-50 p-8 rounded-2xl mt-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-primary font-bold text-2xl">Analysis Complete</h3>
                                <div className={cn('py-2 px-4 rounded-full font-bold text-sm text-white flex items-center gap-2 shadow-md', { 'bg-authentic': result.isAuthentic, 'bg-suspicious': !result.isAuthentic })}>
                                    {result.isAuthentic ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                                    <span>{result.isAuthentic ? 'Authentic' : 'Suspicious'}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                <MetricCard label="Confidence" value={`${result.confidence.toFixed(1)}%`} />
                                <MetricCard label="Total Frames" value={result.totalFrames} />
                                <MetricCard label="Suspicious Frames" value={result.suspiciousFrames} />
                                <MetricCard label="Duration" value={result.duration} />
                            </div>

                            <div className="bg-white p-6 rounded-xl mt-6 shadow-inner">
                                <h4 className="text-gray-700 mb-3 font-bold text-lg">Summary</h4>
                                <p className="text-gray-600 leading-relaxed">{result.summary}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UploadTab;
