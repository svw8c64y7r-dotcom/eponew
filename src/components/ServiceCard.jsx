import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServiceCard({ title, category, description, features, badge, icon: Icon, onSelect }) {
  return (
    <div className="group relative p-8 rounded-3xl bg-light/80 border border-border hover:border-primary/40 hover:bg-light transition-all duration-300 flex flex-col justify-between shadow-xl">
      
      {/* Top Icon & Badge */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-body border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(147,122,255,0.35)] transition-all">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {badge && (
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
              {badge}
            </span>
          )}
        </div>

        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{category}</div>
        <h3 className="text-2xl font-bold font-secondary text-white mb-3 group-hover:text-primary transition">{title}</h3>
        <p className="text-sm text-text leading-relaxed mb-6">{description}</p>

        {/* Feature List */}
        <ul className="space-y-3 mb-8 text-xs text-text-light font-sans">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer Button */}
      <button
        onClick={onSelect}
        className="w-full btn btn-outline group-hover:btn-primary text-xs justify-center font-medium"
      >
        <span>View Practice Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
}
