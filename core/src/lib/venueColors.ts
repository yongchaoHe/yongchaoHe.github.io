export type VenueCategory = 'peer-reviewed' | 'preprint';

export function categorizeVenue(venue?: string): VenueCategory {
    if (!venue) return 'preprint';
    const v = venue.toLowerCase();

    if (v.includes('preprint') || v.includes('arxiv') || v.includes('technical report')) {
        return 'preprint';
    }

    return 'peer-reviewed';
}

export function getVenueColorClasses(venue?: string): string {
    const category = categorizeVenue(venue);
    switch (category) {
        case 'peer-reviewed':
            return 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300';
        default:
            return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';
    }
}

export function getVenueDotColor(venue?: string): string {
    const category = categorizeVenue(venue);
    switch (category) {
        case 'peer-reviewed':
            return 'bg-accent shadow-[0_0_8px_2px_rgba(37,99,235,0.35)]';
        default:
            return 'bg-accent shadow-[0_0_8px_2px_rgba(37,99,235,0.35)]';
    }
}
