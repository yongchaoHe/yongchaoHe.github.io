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
            <div className="space-y-1">
                {visibleItems.map((item, index) => (
                    <div
                        key={index}
                        className="group flex items-start space-x-3 py-2 px-3 -mx-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200"
                    >
                        <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                        <div className="flex items-start space-x-2 flex-1 min-w-0">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-neutral-300 dark:bg-neutral-600" />
                            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-sm text-neutral-500 hover:text-accent font-medium transition-colors duration-200"
                >
                    {expanded ? 'Less' : `More (+${items.length - COLLAPSED_COUNT})`}
                </button>
            )}
        </motion.section>
    );
}
