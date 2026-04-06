'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { cn } from '@/lib/utils';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

function getVenueColor(venue?: string) {
  if (!venue) return "bg-neutral-100 text-neutral-700";
  const v = venue.toLowerCase();
  if (v.includes('preprint')) {
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  }
  if (v.includes('technical report')) {
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
  }
  if (
    v.includes('neurips') || v.includes('nips') ||
    v.includes('icml') || v.includes('iclr') ||
    v.includes('aaai') || v.includes('ijcai') || v.includes('kdd') ||
    v.includes('acl') || v.includes('emnlp') || v.includes('naacl') ||
    v.includes('cvpr') || v.includes('iccv') || v.includes('eccv')
  ) {
    return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
  }
  return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
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
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    View All →
                </Link>
            </div>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        {/* Title */}
                        <div className="flex flex-wrap items-center gap-x-2">
                        {pub.publishedAt && (
                            <span className={cn(
                            "text-xs font-semibold",
                            getVenueColor(pub.publishedAt)
                            )}>
                            {pub.publishedAt}
                            </span>
                        )}

                        <h3 className="text-[15px] font-medium text-primary leading-snug">
                            {pub.title}
                        </h3>
                        </div>

                        {/* Authors */}
                        <p className="text-sm text-neutral-600 mb-1 flex flex-wrap gap-2">
                        {pub.authors.map((a, i) => (
                            <span key={i} className="relative inline-flex items-center">
                            <span className={a.isHighlighted ? 'text-accent font-semibold relative' : 'relative'}>
                                {a.name}
                                {a.isCorresponding && (
                                <sup className="text-xs text-neutral-400 ml-0.5" title="Corresponding author">
                                    *
                                </sup>
                                )}
                                {a.isCoAuthor && (
                                <sup className="text-xs text-neutral-400 ml-0.5" title="Co-author">
                                    #
                                </sup>
                                )}
                            </span>
                            {i < pub.authors.length - 1 && <span className="text-neutral-500">,</span>}
                            </span>
                        ))}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
