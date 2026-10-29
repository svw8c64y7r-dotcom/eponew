import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ServiceCard({ title, category, description, features, badge, icon: Icon, onSelect }) {
  return (
    <div className="group relative p-8 rounded-2xl glass-panel border border-cyber-border hover:border-cyber-cyan/40 hover:bg-cyber-cardHover transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Glow & Badge */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-cyber-bg border border-cyber-cyan/30 flex items-center justify-center group-hover:scale-110 group-hover:border-cyber-cyan transition-transform">
            <Icon className="w-6 h-6 text-cyber-cyan glow-cyan-sm" />
          </div>
          {badge && (
            <span className="px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-semibold">
              {badge}
            </span>
          )}
        </div>

        <div className="text-xs font-mono text-cyber-cyan uppercase tracking-wider mb-1 font-semibold">{category}</div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-cyan transition">{title}</h3>
        <p className="text-sm text-cyber-muted leading-relaxed mb-6">{description}</p>

        {/* Feature List */}
        <ul className="space-y-2.5 mb-8 font-sans text-xs text-cyber-text">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-center space-x-2.5">
              <CheckCircle className="w-4 h-4 text-cyber-emerald flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer Button */}
      <button
        onClick={onSelect}
        className="w-full py-3 px-4 rounded-xl bg-cyber-bg border border-cyber-border group-hover:border-cyber-cyan/50 text-white font-medium text-xs font-mono flex items-center justify-center space-x-2 group-hover:bg-cyber-cyan group-hover:text-black transition-all duration-200"
      >
        <span>Engage Offering</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
}
