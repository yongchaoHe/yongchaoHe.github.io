module.exports = {

"[project]/.next-internal/server/app/[slug]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/lib/content.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getBibtexContent": (()=>getBibtexContent),
    "getMarkdownContent": (()=>getMarkdownContent),
    "getPageConfig": (()=>getPageConfig),
    "getTomlContent": (()=>getTomlContent)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$smol$2d$toml$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/smol-toml/dist/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$smol$2d$toml$2f$dist$2f$parse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/smol-toml/dist/parse.js [app-rsc] (ecmascript)");
;
;
;
const CONTENT_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'content');
function getMarkdownContent(filename) {
    try {
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, filename);
        return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error loading markdown file ${filename}:`, error);
        return '';
    }
}
function getBibtexContent(filename) {
    try {
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, filename);
        return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error loading bibtex file ${filename}:`, error);
        return '';
    }
}
function getTomlContent(filename) {
    try {
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, filename);
        const fileContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf-8');
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$smol$2d$toml$2f$dist$2f$parse$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parse"])(fileContent);
    } catch (error) {
        console.error(`Error loading TOML file ${filename}:`, error);
        return null;
    }
}
function getPageConfig(pageName) {
    return getTomlContent(`${pageName}.toml`);
}
}}),
"[project]/src/lib/bibtexParser.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "parseBibTeX": (()=>parseBibTeX)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.ts [app-rsc] (ecmascript)");
;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bibtexParse = __turbopack_context__.r("[project]/node_modules/bibtex-parse-js/bibtexParse.js [app-rsc] (ecmascript)");
// Map BibTeX entry types to our publication types
const typeMapping = {
    article: 'journal',
    inproceedings: 'conference',
    conference: 'conference',
    incollection: 'book-chapter',
    book: 'book',
    phdthesis: 'thesis',
    mastersthesis: 'thesis',
    techreport: 'technical-report',
    unpublished: 'preprint',
    misc: 'preprint'
};
// Convert month names to numbers
const monthMapping = {
    jan: 1,
    january: 1,
    feb: 2,
    february: 2,
    mar: 3,
    march: 3,
    apr: 4,
    april: 4,
    may: 5,
    jun: 6,
    june: 6,
    jul: 7,
    july: 7,
    aug: 8,
    august: 8,
    sep: 9,
    september: 9,
    sept: 9,
    oct: 10,
    october: 10,
    nov: 11,
    november: 11,
    dec: 12,
    december: 12
};
function parseBibTeX(bibtexContent) {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConfig"])();
    const authorName = config.author.name;
    const entries = bibtexParse.toJSON(bibtexContent);
    return entries.map((entry, index)=>{
        const tags = entry.entryTags;
        // Parse authors
        const authors = parseAuthors(tags.author || '', authorName);
        // Parse year and month
        const year = parseInt(tags.year) || new Date().getFullYear();
        const monthStr = tags.month?.toLowerCase() || '';
        const month = monthMapping[monthStr] || parseInt(monthStr) || undefined;
        // Determine type
        const type = typeMapping[entry.entryType.toLowerCase()] || 'journal';
        // Parse tags/keywords
        const keywords = tags.keywords?.split(',').map((k)=>k.trim()) || [];
        // Parse selected field (convert string to boolean)
        const selected = tags.selected === 'true' || tags.selected === 'yes';
        // Parse preview field (remove braces if present)
        const preview = tags.preview?.replace(/[{}]/g, '');
        // Create publication object
        const publication = {
            id: entry.citationKey || tags.id || `pub-${Date.now()}-${index}`,
            title: cleanBibTeXString(tags.title || 'Untitled'),
            authors,
            year,
            month: monthMapping[tags.month?.toLowerCase()] ? String(month) : tags.month,
            type,
            status: 'published',
            tags: keywords,
            keywords,
            researchArea: detectResearchArea(tags.title, keywords),
            // Optional fields
            journal: cleanBibTeXString(tags.journal),
            conference: cleanBibTeXString(tags.booktitle),
            volume: tags.volume,
            issue: tags.number,
            pages: tags.pages,
            doi: tags.doi,
            url: tags.url,
            code: tags.code,
            abstract: cleanBibTeXString(tags.abstract),
            description: cleanBibTeXString(tags.description || tags.note),
            selected,
            preview,
            // Store original BibTeX (excluding custom fields)
            bibtex: reconstructBibTeX(entry, [
                'selected',
                'preview',
                'description',
                'keywords',
                'code'
            ])
        };
        // Clean up undefined fields
        Object.keys(publication).forEach((key)=>{
            if (publication[key] === undefined) {
                delete publication[key];
            }
        });
        return publication;
    }).sort((a, b)=>{
        // Sort by year (descending), then by month if available
        if (b.year !== a.year) return b.year - a.year;
        // For month comparison, treat missing months as January (1) to ensure they appear last within the year
        const monthA = typeof a.month === 'string' ? monthMapping[a.month.toLowerCase()] || parseInt(a.month) || 1 : a.month || 1;
        const monthB = typeof b.month === 'string' ? monthMapping[b.month.toLowerCase()] || parseInt(b.month) || 1 : b.month || 1;
        // Sort by month descending (December to January)
        return monthB - monthA;
    });
}
function parseAuthors(authorsStr, highlightName) {
    if (!authorsStr) return [];
    // Split by "and" and clean up
    return authorsStr.split(/\sand\s/).map((author)=>{
        // Clean up the author name
        let name = author.trim();
        // Check for corresponding author marker
        const isCorresponding = name.includes('*');
        // Check for co-author marker (#)
        const isCoAuthor = name.includes('#');
        // Remove special markers from name
        name = name.replace(/[*#]/g, '');
        // Handle "Last, First" format
        if (name.includes(',')) {
            const parts = name.split(',').map((p)=>p.trim());
            name = `${parts[1]} ${parts[0]}`;
        }
        // Check if this is the site owner (to highlight)
        let isHighlighted = false;
        if (highlightName) {
            const lowerName = name.toLowerCase();
            const lowerHighlight = highlightName.toLowerCase();
            isHighlighted = lowerName.includes(lowerHighlight);
            // Also check for reversed order (Last First) if not found
            if (!isHighlighted && lowerHighlight.includes(' ')) {
                const parts = lowerHighlight.split(' ');
                // Handle simple First Last case
                if (parts.length === 2) {
                    const reversed = `${parts[1]} ${parts[0]}`;
                    isHighlighted = lowerName.includes(reversed);
                }
            }
        }
        return {
            name: cleanBibTeXString(name),
            isHighlighted,
            isCorresponding,
            isCoAuthor
        };
    }).filter((author)=>author.name);
}
function cleanBibTeXString(str) {
    if (!str) return '';
    // Remove outer quotes if present
    let cleaned = str.replace(/^["']|["']$/g, '');
    // Handle nested braces more carefully
    // First remove double braces {{content}} -> content
    cleaned = cleaned.replace(/\{\{([^}]*)\}\}/g, '$1');
    // Remove single braces {content} -> content, but be careful with nesting
    while(cleaned.includes('{') && cleaned.includes('}')){
        const beforeLength = cleaned.length;
        cleaned = cleaned.replace(/\{([^{}]*)\}/g, '$1');
        // If no change was made, break to avoid infinite loop
        if (cleaned.length === beforeLength) break;
    }
    // Remove any remaining single braces
    cleaned = cleaned.replace(/[{}]/g, '');
    // Handle LaTeX commands (basic)
    cleaned = cleaned.replace(/\\textbf{([^}]*)}/g, '$1');
    cleaned = cleaned.replace(/\\emph{([^}]*)}/g, '$1');
    cleaned = cleaned.replace(/\\cite{[^}]*}/g, '');
    cleaned = cleaned.replace(/~/g, ' ');
    // Remove remaining backslashes
    cleaned = cleaned.replace(/\\/g, '');
    // Remove extra spaces and newlines
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    return cleaned;
}
function detectResearchArea(title, keywords) {
    const text = (title + ' ' + keywords.join(' ')).toLowerCase();
    if (text.includes('healthcare') || text.includes('medical') || text.includes('health')) {
        return 'ai-healthcare';
    }
    if (text.includes('signal') || text.includes('processing')) {
        return 'signal-processing';
    }
    if (text.includes('reliability') || text.includes('fault') || text.includes('diagnosis')) {
        return 'reliability-engineering';
    }
    if (text.includes('quantum')) {
        return 'quantum-computing';
    }
    if (text.includes('neural') || text.includes('spiking')) {
        return 'neural-networks';
    }
    if (text.includes('transformer') || text.includes('attention')) {
        return 'transformer-architectures';
    }
    return 'machine-learning';
}
function reconstructBibTeX(entry, excludeFields = []) {
    const { entryType, citationKey, entryTags } = entry;
    let bibtex = `@${entryType}{${citationKey},\n`;
    Object.entries(entryTags).forEach(([key, value])=>{
        // Skip excluded fields
        if (!excludeFields.includes(key.toLowerCase())) {
            let cleanValue = value;
            // Clean author field by removing # and * symbols
            if (key.toLowerCase() === 'author') {
                cleanValue = value.replace(/[#*]/g, '');
            }
            bibtex += `  ${key} = {${cleanValue}},\n`;
        }
    });
    // Remove trailing comma and newline
    bibtex = bibtex.slice(0, -2) + '\n';
    bibtex += '}';
    return bibtex;
}
}}),
"[project]/src/components/publications/PublicationsList.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/publications/PublicationsList.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/publications/PublicationsList.tsx <module evaluation>", "default");
}}),
"[project]/src/components/publications/PublicationsList.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/publications/PublicationsList.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/publications/PublicationsList.tsx", "default");
}}),
"[project]/src/components/publications/PublicationsList.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$publications$2f$PublicationsList$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/publications/PublicationsList.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$publications$2f$PublicationsList$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/publications/PublicationsList.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$publications$2f$PublicationsList$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/pages/TextPage.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/pages/TextPage.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/pages/TextPage.tsx <module evaluation>", "default");
}}),
"[project]/src/components/pages/TextPage.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/pages/TextPage.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/pages/TextPage.tsx", "default");
}}),
"[project]/src/components/pages/TextPage.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$TextPage$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/pages/TextPage.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$TextPage$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/pages/TextPage.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$TextPage$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/components/pages/CardPage.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/pages/CardPage.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/pages/CardPage.tsx <module evaluation>", "default");
}}),
"[project]/src/components/pages/CardPage.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/pages/CardPage.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/pages/CardPage.tsx", "default");
}}),
"[project]/src/components/pages/CardPage.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$CardPage$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/pages/CardPage.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$CardPage$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/pages/CardPage.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$CardPage$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/[slug]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>DynamicPage),
    "generateMetadata": (()=>generateMetadata),
    "generateStaticParams": (()=>generateStaticParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bibtexParser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/bibtexParser.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$publications$2f$PublicationsList$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/publications/PublicationsList.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$TextPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/TextPage.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$CardPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/CardPage.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
function generateStaticParams() {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getConfig"])();
    return config.navigation.filter((nav)=>nav.type === 'page' && nav.target !== 'about') // 'about' is handled by root page
    .map((nav)=>({
            slug: nav.target
        }));
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const pageConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageConfig"])(slug);
    if (!pageConfig) {
        return {};
    }
    return {
        title: pageConfig.title,
        description: pageConfig.description
    };
}
async function DynamicPage({ params }) {
    const { slug } = await params;
    const pageConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageConfig"])(slug);
    if (!pageConfig) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
        children: [
            pageConfig.type === 'publication' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(PublicationPage, {
                config: pageConfig
            }, void 0, false, {
                fileName: "[project]/src/app/[slug]/page.tsx",
                lineNumber: 51,
                columnNumber: 17
            }, this),
            pageConfig.type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(TextPageWrapper, {
                config: pageConfig
            }, void 0, false, {
                fileName: "[project]/src/app/[slug]/page.tsx",
                lineNumber: 54,
                columnNumber: 17
            }, this),
            pageConfig.type === 'card' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$CardPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                config: pageConfig
            }, void 0, false, {
                fileName: "[project]/src/app/[slug]/page.tsx",
                lineNumber: 57,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[slug]/page.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
function PublicationPage({ config }) {
    const bibtex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBibtexContent"])(config.source);
    const publications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bibtexParser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseBibTeX"])(bibtex);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$publications$2f$PublicationsList$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        config: config,
        publications: publications
    }, void 0, false, {
        fileName: "[project]/src/app/[slug]/page.tsx",
        lineNumber: 66,
        columnNumber: 12
    }, this);
}
function TextPageWrapper({ config }) {
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMarkdownContent"])(config.source);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$TextPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        config: config,
        content: content
    }, void 0, false, {
        fileName: "[project]/src/app/[slug]/page.tsx",
        lineNumber: 71,
        columnNumber: 12
    }, this);
}
}}),
"[project]/src/app/[slug]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[slug]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_1ca3d665._.js.map