'use client';

import { motion } from 'framer-motion';
import { CardPageConfig } from '@/types/page';

export default function CardPage({
    config,
    embedded = false
}: {
    config: CardPageConfig;
    embedded?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {/* Header */}
            {!embedded && (
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-primary mb-4">
                        {config.title}
                    </h1>
                    {config.description && (
                        <p className="text-lg text-neutral-600 dark:text-neutral-500 max-w-2xl">
                            {config.description}
                        </p>
                    )}
                </div>
            )}

            {/* Timeline */}
            <div className="relative">
                {/* vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

                {config.items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`relative pl-12 ${embedded ? "pb-5" : "pb-5"} group`}
                    >
                        {/* dot */}
                        <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-accent border-2 border-white dark:border-neutral-900 shadow-[0_0_8px_2px_rgba(37,99,235,0.35)]" />
                        {/* content */}
                        <div className="p-3 -ml-4 rounded-lg bg-white dark:bg-neutral-900/20 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                            
                            {/* Title + Year */}
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-semibold text-primary">
                                    {item.title}
                                </h3>
                                <span className="text-sm text-neutral-500">
                                    {item.date}
                                </span>
                            </div>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-sm text-neutral-500">
                                {item.link && (<a href={item.link} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-accent hover:underline transition-colors"> Source Code </a>)}
                                {item.paper && (<a href={item.paper} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-accent hover:underline transition-colors"> Technical Report </a>)}
                            </div>

                            {/* Subtitle */}
                            {item.subtitle && (<p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-400 font-medium mb-2`}> {item.subtitle} </p>)}
                            {/* Content */}
                            {item.content && (<p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}> {item.content} </p>)}
                            {/* Tags */}
                            {item.tags && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {item.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}