/**
 * RythuThodu Future AI Vision Pipeline Architecture
 * 
 * Flow in Production:
 * React App (Image Input)
 *   ↓ HTTP POST /api/v1/vision/predict/
 * Django REST Framework Backend
 *   ↓ Celery / gRPC
 * Python PyTorch / ONNX Inference Service
 *   ↓ ResNet50 / EfficientNet Crop Disease Model
 * Confidence Score + Bounding Boxes + Disease Classification
 *   ↓ Knowledge Base Query
 * Return Diagnosis JSON + Specific Treatment Protocol
 */

import { DISEASES } from '../data/mockData';

export const aiVisionService = {
  /**
   * Simulates AI Vision model inference on uploaded crop image
   * @param {File|string} imageInput - File object or base64 image data
   * @param {string} selectedCropId - Filter crop category
   * @returns {Promise<Object>} Diagnostic result object
   */
  async predictCropDisease(imageInput, selectedCropId = 'tomato') {
    // Simulate network latency for deep learning vision inference
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Match candidate disease based on crop type or default to first match
    const matchingDiseases = DISEASES.filter(d => d.cropId === selectedCropId);
    const result = matchingDiseases.length > 0 
      ? matchingDiseases[0] 
      : DISEASES[0];

    return {
      success: true,
      cropId: result.cropId,
      cropName: result.cropName,
      cropNameTe: result.cropNameTe,
      diseaseId: result.id,
      diseaseName: result.name,
      diseaseNameTe: result.nameTe,
      scientificName: result.scientificName,
      confidence: result.confidence || 0.92,
      severity: result.severity,
      symptoms: result.symptoms,
      symptomsTe: result.symptomsTe,
      quickAction: result.quickAction,
      quickActionTe: result.quickActionTe,
      isDemoResult: true,
      analyzedAt: new Date().toISOString()
    };
  }
};
