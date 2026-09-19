import React from 'react';
import { Card } from '../common/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const PriceTrendChart = ({ cropName = "Tomato" }) => {
  const { t } = useLanguage();

  // Mock 7-day price data points
  const points = [
    { day: "Mon", price: 2700 },
    { day: "Tue", price: 2850 },
    { day: "Wed", price: 2790 },
    { day: "Thu", price: 2950 },
    { day: "Fri", price: 3100 },
    { day: "Sat", price: 3050 },
    { day: "Sun", price: 3200 }
  ];

  const minPrice = 2500;
  const maxPrice = 3400;
  const width = 500;
  const height = 180;
  const padding = 30;

  const pointsSvg = points.map((p, i) => {
    const x = padding + (i * (width - padding * 2)) / (points.length - 1);
    const y = height - padding - ((p.price - minPrice) / (maxPrice - minPrice)) * (height - padding * 2);
    return { ...p, x, y };
  });

  const pathD = pointsSvg.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${pointsSvg[pointsSvg.length - 1].x} ${height - padding} L ${pointsSvg[0].x} ${height - padding} Z`;

  return (
    <Card className="space-y-3 bg-gradient-to-br from-emerald-900/5 to-white border border-emerald-200">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-extrabold text-slate-800">
          7-Day Price Trend ({cropName})
        </h4>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
          ₹/Quintal
        </span>
      </div>

      <div className="w-full overflow-x-auto no-scrollbar">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[320px]">
          {/* Background grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#e2e8f0" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" />

          {/* Fill area */}
          <path d={areaD} fill="rgba(5, 150, 105, 0.12)" />

          {/* Line */}
          <path d={pathD} fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Circles and Data Labels */}
          {pointsSvg.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="5" fill="#047857" stroke="#ffffff" strokeWidth="2" />
              <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">
                ₹{p.price}
              </text>
              <text x={p.x} y={height - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                {p.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  );
};
