'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

const COLLAPSED_COUNT = 5;

export default function News({ items, title = 'News' }: NewsProps) {
    const [expanded, setExpanded] = useState(false);
    const hasMore = items.length > COLLAPSED_COUNT;
    const visibleItems = expanded ? items : items.slice(0, COLLAPSED_COUNT);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-3">
                {visibleItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                        <p className="text-sm text-neutral-700">{item.content}</p>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-3 text-sm text-accent hover:underline font-medium"
                >
                    {expanded ? 'Less' : `More (+${items.length - COLLAPSED_COUNT})`}
                </button>
            )}
        </motion.section>
    );
}
