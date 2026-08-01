'use client';

import { motion } from 'framer-motion';

interface AwardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
}

interface AwardsProps {
    items: AwardItem[];
    title?: string;
}

export default function Awards({ items, title = 'Awards' }: AwardsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="group p-3 -ml-4 rounded-lg bg-white dark:bg-neutral-900/20 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    >
                        {/* Title */}
                        <h3 className="text-[15px] font-medium text-primary leading-snug mb-2">
                            {item.title}
                        </h3>

                        {/* Date + Subtitle */}
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex flex-wrap gap-x-2 gap-y-1 items-center">
                            {item.date && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                                    {item.date}
                                </span>
                            )}
                            {item.subtitle && (
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    {item.subtitle}
                                </span>
                            )}
                        </p>

                        {/* Content */}
                        {item.content && (
                            <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed mt-2">
                                {item.content}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
