// 'use client';

// import { motion } from 'framer-motion';
// import { CardPageConfig } from '@/types/page';

// export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//         >
//             <div className={embedded ? "mb-4" : "mb-8"}>
//                 <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
//                 {config.description && (
//                     <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl`}>
//                         {config.description}
//                     </p>
//                 )}
//             </div>

//             <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
//                 {config.items.map((item, index) => (
//                     <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.4, delay: 0.1 * index }}
//                         className={`bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}
//                     >
//                         <div className="flex justify-between items-start mb-2">
//                             <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary`}>{item.title}</h3>
//                             <div className="flex items-center gap-x-3">
//                                 {item.link && (
//                                 <a
//                                     href={item.link}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-accent hover:underline text-sm"
//                                 >
//                                     Source Code
//                                 </a>
//                                 )}
//                                 {item.paper && (
//                                 <a
//                                     href={item.paper}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-accent hover:underline text-sm"
//                                 >
//                                     Technical Report
//                                 </a>
//                                 )}
//                                 {item.date && (
//                                     <span className="text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
//                                         {item.date}
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                         {item.subtitle && (
//                             <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-3`}>{item.subtitle}</p>
//                         )}
//                         {item.content && (
//                             <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
//                                 {item.content}
//                             </p>
//                         )}
//                         {item.tags && (
//                             <div className="flex flex-wrap gap-2 mt-4">
//                                 {item.tags.map(tag => (
//                                     <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>
//                         )}
//                     </motion.div>
//                 ))}
//             </div>
//         </motion.div>
//     );
// }

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
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-xl" : "text-3xl"} font-serif font-bold text-primary mb-4`}>
                    {config.title}
                </h1>
                {config.description && (
                    <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl`}>
                        {config.description}
                    </p>
                )}
            </div>

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
                        className={`relative pl-12 ${embedded ? "pb-4" : "pb-4"} group`}
                    >
                        {/* dot */}
                        <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-accent border-2 border-white dark:border-neutral-900 shadow-[0_0_8px_2px_rgba(0,132,255,0.6)]" />

                        {/* content */}
                        <div className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 rounded-lg p-2 -ml-4 transition-colors">
                            
                            {/* Title */}
                            <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary mb-1`}>
                                {item.title}
                            </h3>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-sm text-neutral-500">
                                {item.date && (
                                    <span className="text-xs text-neutral-400 uppercase tracking-wide">
                                        {item.date}
                                    </span>
                                )}

                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:underline"
                                    >
                                        Source Code
                                    </a>
                                )}

                                {item.paper && (
                                    <a
                                        href={item.paper}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:underline"
                                    >
                                        Technical Report
                                    </a>
                                )}
                            </div>

                            {/* Subtitle */}
                            {item.subtitle && (
                                <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-2`}>
                                    {item.subtitle}
                                </p>
                            )}

                            {/* Content */}
                            {item.content && (
                                <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                    {item.content}
                                </p>
                            )}

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