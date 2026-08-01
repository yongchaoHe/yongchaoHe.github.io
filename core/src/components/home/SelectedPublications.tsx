'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { getVenueColorClasses } from '@/lib/venueColors';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title = 'Selected Publications', enableOnePageMode = false }: SelectedPublicationsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{title}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-sm text-neutral-500 hover:text-accent font-medium transition-colors duration-200"
                >
                    View All →
                </Link>
            </div>
            <div className="space-y-3">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="group p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                    >
                        {/* Title */}
                        <h3 className="text-[15px] font-medium text-primary leading-snug mb-2">
                            {pub.title}
                        </h3>

                        {/* Venue + Authors */}
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex flex-wrap gap-x-2 gap-y-1 items-center">
                            {pub.publishedAt && (
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap ${getVenueColorClasses(pub.publishedAt)}`}>
                                    {pub.publishedAt}
                                </span>
                            )}
                            {pub.authors.map((a, i) => (
                                <span key={i} className="inline-flex items-center">
                                    <span className={a.isHighlighted ? 'text-primary font-bold' : ''}>
                                        {a.name}
                                    </span>
                                    {a.isCorresponding && (
                                        <sup className="text-xs text-neutral-400 ml-0.5" title="Corresponding author">*</sup>
                                    )}
                                    {a.isCoAuthor && (
                                        <sup className="text-xs text-neutral-400 ml-0.5" title="Co-author">#</sup>
                                    )}
                                    {i < pub.authors.length - 1 && <span className="text-neutral-400">,</span>}
                                </span>
                            ))}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
