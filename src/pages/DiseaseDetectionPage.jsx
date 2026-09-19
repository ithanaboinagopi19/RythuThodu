import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';
import { CropCard } from '../components/farmer/CropCard';
import { DiseaseResultCard } from '../components/farmer/DiseaseResultCard';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { LoadingState } from '../components/common/LoadingState';
import { CROPS } from '../data/mockData';
import { aiVisionService } from '../services/aiService';

export const DiseaseDetectionPage = () => {
  const { t, language } = useLanguage();
  const { addDiagnosis } = useAppData();
  const navigate = useNavigate();

  const [selectedCropId, setSelectedCropId] = useState('tomato');
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Sample leaf image presets for instant touch demo
  const sampleLeafImages = [
    {
      label: "Tomato Leaf Spots",
      url: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80"
    },
    {
      label: "Chilli Leaf Curl",
      url: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&auto=format&fit=crop&q=80"
    },
    {
      label: "Rice Blast",
      url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=80"
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (imgUrl = null) => {
    const activeImage = imgUrl || selectedImage || sampleLeafImages[0].url;
    setSelectedImage(activeImage);
    setAnalyzing(true);
    setResult(null);

    try {
      const prediction = await aiVisionService.predictCropDisease(activeImage, selectedCropId);
      setResult(prediction);

      // Save to local diagnosis history
      await addDiagnosis({
        crop: prediction.cropName,
        cropTe: prediction.cropNameTe,
        disease: prediction.diseaseName,
        diseaseTe: prediction.diseaseNameTe,
        confidence: prediction.confidence,
        image: activeImage,
        diseaseId: prediction.diseaseId
      });
    } catch (e) {
      console.error("Diagnosis prediction error:", e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">
          {t('checkCropTitle', 'Check Your Crop')}
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-xl mx-auto">
          {t('checkCropSubtitle', 'Upload or take a picture of your affected crop leaf to get instant diagnostic results.')}
        </p>
      </div>

      {/* Step 1: Select Crop */}
      <div className="space-y-3">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
          <span>{t('selectCropPrompt', '1. Select Crop')}</span>
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CROPS.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              selected={selectedCropId === crop.id}
              onSelect={(id) => {
                setSelectedCropId(id);
                setResult(null);
              }}
            />
          ))}
        </div>
      </div>

      {/* Step 2: Upload or Take Photo */}
      <div className="space-y-3">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
          <span>{t('choosePhotoPrompt', '2. Provide Photo')}</span>
        </h2>

        <Card className="border-2 border-dashed border-emerald-600 p-6 sm:p-8 text-center space-y-4 bg-emerald-50/40">
          {selectedImage ? (
            <div className="space-y-4 max-w-md mx-auto">
              <img
                src={selectedImage}
                alt="Uploaded leaf"
                className="w-full h-56 object-cover rounded-2xl border-2 border-emerald-500 shadow-md"
              />
              <div className="flex gap-2">
                <Button
                  fullWidth
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                  onClick={() => { setSelectedImage(null); setResult(null); }}
                >
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {t('dragDropText', 'Click or drag leaf photo here')}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Supports JPG, PNG up to 10MB. Make sure leaf spots are clearly visible.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <label className="w-full sm:w-auto">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    icon={Upload}
                    className="w-full sm:w-auto pointer-events-none"
                  >
                    {t('uploadPhoto', 'Upload Photo')}
                  </Button>
                </label>

                <label className="w-full sm:w-auto">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="secondary"
                    size="md"
                    icon={Camera}
                    className="w-full sm:w-auto pointer-events-none"
                  >
                    {t('takePhoto', 'Take Photo')}
                  </Button>
                </label>
              </div>

              {/* Instant Preset Sample Photos for Fast Review */}
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-2">Or click a sample leaf photo to test instantly:</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {sampleLeafImages.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnalyze(sample.url)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs"
                    >
                      <img src={sample.url} alt={sample.label} className="w-5 h-5 rounded-md object-cover" />
                      <span>{sample.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger Button */}
          {selectedImage && !result && !analyzing && (
            <div className="pt-4">
              <Button
                fullWidth
                variant="primary"
                size="lg"
                icon={Sparkles}
                onClick={() => handleAnalyze()}
              >
                Scan Crop Disease Now
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Loading State */}
      {analyzing && (
        <LoadingState message={t('analyzingText', 'Analyzing leaf pattern with AI vision engine...')} />
      )}

      {/* Result Card */}
      {result && !analyzing && (
        <div className="space-y-6 animate-fadeIn">
          <DiseaseResultCard
            result={result}
            onViewTreatment={(diseaseId) => navigate(`/treatment/${diseaseId}`)}
          />

          {/* Additional Guidance Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <strong className="font-bold flex items-center gap-1.5 text-sm text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> When to Seek Expert Help
              </strong>
              <p>If disease spreads to over 30% of your plot within 48 hours, bring a leaf sample to your local Mandal Agricultural Officer (MAO).</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
              <strong className="font-bold flex items-center gap-1.5 text-sm text-blue-950">
                <Info className="w-4 h-4 text-blue-600" /> Weather Safeguard
              </strong>
              <p>Avoid applying spray during hot afternoon sun (12 PM - 3 PM) or immediately before rainfall.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
