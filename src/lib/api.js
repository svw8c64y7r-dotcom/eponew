// src/lib/api.js

export async function runSecurityAudit(targetDomain) {
    try {
        const response = await fetch('/api/audit/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                target: targetDomain,
                authorization_confirmed: true
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Audit scan failed to execute.');
        }

        return await response.json();
    } catch (err) {
        console.error('Audit API Error:', err);
        throw err;
    }
}