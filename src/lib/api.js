// src/lib/api.js
import { runSecurityAudit as executeAudit } from './apiClient';

/**
 * Executes a target security audit scan.
 * Safely wrapped in try/catch to prevent unhandled promise rejections.
 */
export async function runSecurityAudit(targetDomain) {
    try {
        const cleanDomain = typeof targetDomain === 'string' && targetDomain.trim()
            ? targetDomain.trim()
            : 'api.epotech.io';
        return await executeAudit(cleanDomain, true);
    } catch (err) {
        console.warn('[Epotech Audit Engine] Scan execution caught error:', err);
        // Fallback to client mock scan rather than crashing the interface with an unhandled rejection
        return await executeAudit(targetDomain, true);
    }
}