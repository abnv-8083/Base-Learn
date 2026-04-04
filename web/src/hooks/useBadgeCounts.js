import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Hook that fetches badge counts from the given role's API endpoint.
 * Returns { badges: { [key]: number }, refresh }
 *
 * Usage:
 *   const { badges } = useBadgeCounts('admin');
 *   // badges.newEnquiries, badges.pendingRequests, badges.unpaidStudents
 *
 *   const { badges } = useBadgeCounts('instructor');
 *   // badges.pendingContent, badges.pendingAssessments, badges.liveNow
 */
export function useBadgeCounts(role, intervalMs = 60000) {
    const [badges, setBadges] = useState({});

    const refresh = useCallback(async () => {
        try {
            const url = `/api/${role}/badge-counts`;
            const { data } = await axios.get(url);
            if (data?.data) setBadges(data.data);
        } catch {
            // silently fail — badges are non-critical
        }
    }, [role]);

    useEffect(() => {
        refresh();
        const id = setInterval(refresh, intervalMs);
        return () => clearInterval(id);
    }, [refresh, intervalMs]);

    return { badges, refresh };
}
