'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    CalendarIcon,
    BookOpenIcon,
    // ClipboardDocumentIcon,
    // DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import { cn } from '@/lib/utils';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

function getVenueColor(venue?: string) {
  if (!venue) return "bg-neutral-100 text-neutral-700";
  return "bg-neutral-100 text-neutral-700";
//   const v = venue.toLowerCase();
//   if (v.includes('preprint')) {
//     return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
//   }
//   if (v.includes('technical report')) {
//     return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
//   }
//   if (
//     v.includes('neurips') || v.includes('nips') ||
//     v.includes('icml') || v.includes('iclr') ||
//     v.includes('aaai') || v.includes('ijcai') || v.includes('kdd') ||
//     v.includes('acl') || v.includes('emnlp') || v.includes('naacl') ||
//     v.includes('cvpr') || v.includes('iccv') || v.includes('eccv')
//   ) {
//     return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
//   }
//   return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
}

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const [searchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<number | 'all' | 'older'>('all');
    const [selectedArea, setSelectedArea] = useState<string | 'all'>('all');
    // const [expandedBibtexId, setExpandedBibtexId] = useState<string | null>(null);
    // const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);

    const yearBuckets = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const cutoff = currentYear - 5; 
        const uniqueYears = Array.from(new Set(publications.map(p => p.year)));
        const recentYears = uniqueYears
            .filter(y => y >= cutoff)
            .sort((a, b) => b - a);
        const hasOlder = uniqueYears.some(y => y < cutoff);
        return {
            recentYears,
            olderLabel: hasOlder ? `≤ ${cutoff - 1}` : null,
            cutoff,
        };
    }, [publications]);

    const areas = useMemo(() => {
        const allAreas = publications.flatMap(p => p.researchAreas || []);
        return Array.from(new Set(allAreas)).sort();
    }, [publications]);

    // Filter publications
    const filteredPublications = useMemo(() => {
        return publications.filter(pub => {
            const matchesSearch =
                pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                pub.journal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.conference?.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesYear = false;
            if (selectedYear === 'all') {
                matchesYear = true;
            } else if (selectedYear === 'older') {
                matchesYear = pub.year < yearBuckets.cutoff;
            } else {
                matchesYear = pub.year === selectedYear;
            }
            // Check if selectedArea includes any of the researchAreas of the publication
            const matchesArea =
                selectedArea === 'all' || 
                pub.researchAreas.some(area => selectedArea.includes(area));
            return matchesSearch && matchesYear && matchesArea;
        });
    }, [publications, searchQuery, selectedYear, selectedArea, yearBuckets]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            {/* Header */}
            <div className="mb-8">
                <h1 className={`${embedded ? "text-xl" : "text-3xl"} font-serif font-bold text-primary mb-4`}> {config.title} </h1>
                {config.description && (
                    <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl`}> {config.description} </p>
                )}
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-4">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-6">
                            {/* Year Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center"> <CalendarIcon className="h-4 w-4 mr-1" /> Year </label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setSelectedYear('all')}
                                        className={cn(
                                            "px-3 py-1 text-xs rounded-full transition-colors",
                                            selectedYear === 'all'
                                                ? "bg-accent text-white"
                                                : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        )}
                                    >
                                        All
                                    </button>
                                    {yearBuckets.recentYears.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            className={cn(
                                                "px-3 py-1 text-xs rounded-full transition-colors",
                                                selectedYear === year
                                                    ? "bg-accent text-white"
                                                    : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            )}
                                        >
                                            {year}
                                        </button>
                                    ))}

                                    {yearBuckets.olderLabel && (
                                        <button
                                            onClick={() => setSelectedYear('older')}
                                            className={cn(
                                                "px-3 py-1 text-xs rounded-full transition-colors",
                                                selectedYear === 'older'
                                                    ? "bg-accent text-white"
                                                    : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            )}
                                        >
                                            {yearBuckets.olderLabel}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center"> <BookOpenIcon className="h-4 w-4 mr-1" /> Type </label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setSelectedArea('all')}
                                        className={cn(
                                            "px-3 py-1 text-xs rounded-full transition-colors",
                                            selectedArea === 'all'
                                                ? "bg-accent text-white"
                                                : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        )}
                                    >
                                        All
                                    </button>
                                    {areas.map(area => (
                                        <button
                                            key={area}
                                            onClick={() => setSelectedArea(area)}
                                            className={cn(
                                                "px-3 py-1 text-xs rounded-full capitalize transition-colors",
                                                selectedArea === area
                                                    ? "bg-accent text-white"
                                                    : "bg-white dark:bg-neutral-800 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            )}
                                        >
                                            {area.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Legend */}
            <p className="text-xs text-neutral-500 mb-2">
            <span className="font-medium mr-2">Legend: </span>
            <span className="mr-2">
                <sup>#</sup> Co-First Author, 
            </span>
            <span>
                <sup>*</sup> Corresponding Author
            </span>
            </p>
        
            {/* Timeline */}
            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

                {filteredPublications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                        className="relative pl-12 pb-5 group"
                    >
                        {/* dot */}
                        <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-accent border-2 border-white dark:border-neutral-900 shadow-[0_0_8px_2px_rgba(0,132,255,0.6)]" />
                        {/* content */}
                        <div className="p-2 -ml-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                            {/* Title + Year */}
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-semibold text-primary"> {pub.title} </h3>
                                <span className="text-sm text-neutral-500"> {pub.year} </span>
                            </div>

                            {/* Authors */}
                            <p className="text-sm text-neutral-600 mb-1 flex flex-wrap gap-2">
                            {pub.authors.map((a, i) => (
                                <span key={i} className="relative inline-flex items-center">
                                <span className={a.isHighlighted ? 'text-accent font-semibold relative' : 'relative'}>
                                    {a.name}
                                    {a.isCorresponding && (
                                        <sup className="text-xs text-neutral-400 ml-0.5" title="Corresponding author"> * </sup>
                                    )}
                                    {a.isCoAuthor && (
                                        <sup className="text-xs text-neutral-400 ml-0.5" title="Co-author"> # </sup>
                                    )}
                                </span>
                                {i < pub.authors.length - 1 && <span className="text-neutral-500">,</span>}
                                </span>
                            ))}
                            </p>

                            {/* Preview */}
                            {pub.preview && (
                                <div className="mt-3 mb-3 w-full max-w-md aspect-video relative rounded-lg overflow-hidden">
                                    <Image
                                        src={`/papers/${pub.preview}`}
                                        alt={pub.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            {pub.description && (<p className="text-sm text-neutral-600 mb-3"> {pub.description} </p>)}
                            {/* Actions */}
                            <div className="flex flex-wrap gap-2">
                                {pub.publishedAt && (
                                    <span
                                        className={cn(
                                        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
                                        getVenueColor(pub.publishedAt)
                                        )}
                                    >
                                        {pub.publishedAt}
                                    </span>
                                )}
                                {/* {pub.doi && (
                                    <a
                                        href={`https://doi.org/${pub.doi}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                    >
                                        DOI
                                    </a>
                                )} */}
                                {pub.code && (
                                    <a
                                        href={pub.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                    >
                                        Code
                                    </a>
                                )}
                                {pub.url && (
                                    <a
                                        href={pub.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white transition-colors"
                                    >
                                        Paper
                                    </a>
                                )}

                                {/* {pub.abstract && (
                                    <button
                                        onClick={() => setExpandedAbstractId(expandedAbstractId === pub.id ? null : pub.id)}
                                        className={cn(
                                            "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                            expandedAbstractId === pub.id
                                                ? "bg-accent text-white"
                                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white"
                                        )}
                                    >
                                        <DocumentTextIcon className="h-3 w-3 mr-1.5" />
                                        Abstract
                                    </button>
                                )} */}

                                {/* {pub.bibtex && (
                                    <button
                                        onClick={() => setExpandedBibtexId(expandedBibtexId === pub.id ? null : pub.id)}
                                        className={cn(
                                            "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors",
                                            expandedBibtexId === pub.id
                                                ? "bg-accent text-white"
                                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white"
                                        )}
                                    >
                                    <BookOpenIcon className="h-3 w-3 mr-1.5" />
                                        BibTeX
                                    </button>
                                )} */}
                            </div>

                            {/* Expand */}
                            {/* <AnimatePresence>
                                {expandedAbstractId === pub.id && pub.abstract ? (
                                    <motion.div
                                        key="abstract"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden mt-4"
                                    >
                                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                            <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed">
                                                {pub.abstract}
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : null}
                                {expandedBibtexId === pub.id && pub.bibtex ? (
                                    <motion.div
                                        key="bibtex"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden mt-4"
                                    >
                                        <div className="relative bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                            <pre className="text-xs text-neutral-600 dark:text-neutral-500 overflow-x-auto whitespace-pre-wrap font-mono">
                                                {pub.bibtex}
                                            </pre>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(pub.bibtex || '');
                                                    // Optional: Show copied feedback
                                                }}
                                                className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-neutral-700 text-neutral-500 hover:text-accent shadow-sm border border-neutral-200 dark:border-neutral-600 transition-colors"
                                                title="Copy to clipboard"
                                            >
                                                <ClipboardDocumentIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence> */}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}