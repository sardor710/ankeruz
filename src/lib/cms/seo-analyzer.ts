/**
 * SEO Optimization Engine for Anker Store CMS
 * Computes real-time SEO score, SERP previews, and actionable checklists.
 */

export interface SeoAuditInput {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  contentHtml?: string;
  rawContent?: string;
  images?: Array<{ url: string; altText: string }>;
  canonicalUrl?: string;
  ogImage?: string;
}

export type SeoSeverity = "critical" | "warning" | "good";

export interface SeoCheckItem {
  id: string;
  title: string;
  category: "title" | "description" | "slug" | "keyword" | "content" | "media";
  status: "pass" | "warn" | "fail";
  severity: SeoSeverity;
  scoreImpact: number;
  message: string;
  recommendation: string;
}

export interface KeywordMetrics {
  keyword: string;
  count: number;
  density: number; // percentage (e.g. 1.8)
  inTitle: boolean;
  inMetaTitle: boolean;
  inMetaDescription: boolean;
  inSlug: boolean;
  inHeadings: boolean;
  inFirstParagraph: boolean;
  inImagesAltCount: number;
  totalImages: number;
}

export interface SerpPreviewData {
  desktop: {
    title: string;
    url: string;
    snippet: string;
  };
  mobile: {
    title: string;
    url: string;
    snippet: string;
  };
}

export interface SocialPreviewData {
  openGraph: {
    title: string;
    description: string;
    image: string;
    siteName: string;
    url: string;
  };
  twitter: {
    title: string;
    description: string;
    image: string;
    card: "summary_large_image";
  };
}

export interface SeoAuditResult {
  score: number; // 0 - 100
  grade: "A+" | "A" | "B" | "C" | "D" | "F";
  checks: SeoCheckItem[];
  keywordMetrics: KeywordMetrics;
  serpPreview: SerpPreviewData;
  socialPreview: SocialPreviewData;
  stats: {
    wordCount: number;
    charCount: number;
    readingTimeMinutes: number;
  };
}

export function analyzeSeo(input: SeoAuditInput): SeoAuditResult {
  const keyword = (input.focusKeyword || "").trim().toLowerCase();
  const rawText = (input.rawContent || stripHtml(input.contentHtml || "")).trim();
  const words = rawText ? rawText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const charCount = rawText.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const metaTitle = (input.metaTitle || input.title || "").trim();
  const metaDesc = (input.metaDescription || "").trim();
  const slug = (input.slug || "").trim().toLowerCase();
  const images = input.images || [];

  // Keyword analysis
  let kwCount = 0;
  if (keyword) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    kwCount = (rawText.match(regex) || []).length;
  }
  const density = wordCount > 0 && keyword ? Number(((kwCount / wordCount) * 100).toFixed(2)) : 0;

  const inTitle = keyword ? input.title.toLowerCase().includes(keyword) : false;
  const inMetaTitle = keyword ? metaTitle.toLowerCase().includes(keyword) : false;
  const inMetaDesc = keyword ? metaDesc.toLowerCase().includes(keyword) : false;
  const inSlug = keyword ? slug.includes(keyword.replace(/\s+/g, "-")) : false;

  // Check headings in HTML
  const headingRegex = /<h[1-3][^>]*>(.*?)<\/h[1-3]>/gi;
  let inHeadings = false;
  if (input.contentHtml && keyword) {
    let match;
    while ((match = headingRegex.exec(input.contentHtml)) !== null) {
      if (match[1].toLowerCase().includes(keyword)) {
        inHeadings = true;
        break;
      }
    }
  }

  // Check first 100 words
  const first100Words = words.slice(0, 100).join(" ").toLowerCase();
  const inFirstParagraph = keyword ? first100Words.includes(keyword) : false;

  // Images alt check
  let imagesWithAlt = 0;
  let imagesWithKw = 0;
  for (const img of images) {
    if (img.altText && img.altText.trim().length > 0) {
      imagesWithAlt++;
      if (keyword && img.altText.toLowerCase().includes(keyword)) {
        imagesWithKw++;
      }
    }
  }

  const checks: SeoCheckItem[] = [];
  let score = 0;

  // 1. Meta Title Length (Target: 40-60 chars)
  if (metaTitle.length >= 40 && metaTitle.length <= 60) {
    score += 15;
    checks.push({
      id: "title-length",
      title: "Meta Title Length",
      category: "title",
      status: "pass",
      severity: "good",
      scoreImpact: 15,
      message: `Meta title is ideal (${metaTitle.length} characters).`,
      recommendation: "Title will display cleanly without truncation in Google SERPs.",
    });
  } else if (metaTitle.length > 60) {
    score += 8;
    checks.push({
      id: "title-length",
      title: "Meta Title Too Long",
      category: "title",
      status: "warn",
      severity: "warning",
      scoreImpact: -7,
      message: `Meta title is ${metaTitle.length} characters (over 60 limit).`,
      recommendation: "Trim to under 60 chars to prevent truncation in search snippets.",
    });
  } else if (metaTitle.length > 0) {
    score += 6;
    checks.push({
      id: "title-length",
      title: "Meta Title Too Short",
      category: "title",
      status: "warn",
      severity: "warning",
      scoreImpact: -9,
      message: `Meta title is only ${metaTitle.length} characters (recommended 40-60).`,
      recommendation: "Expand title with brand name or key Nordic selling proposition.",
    });
  } else {
    checks.push({
      id: "title-length",
      title: "Missing Meta Title",
      category: "title",
      status: "fail",
      severity: "critical",
      scoreImpact: -15,
      message: "No meta title specified.",
      recommendation: "Add a 40-60 character meta title immediately.",
    });
  }

  // 2. Meta Description Length (Target: 120-160 chars)
  if (metaDesc.length >= 120 && metaDesc.length <= 160) {
    score += 15;
    checks.push({
      id: "desc-length",
      title: "Meta Description Length",
      category: "description",
      status: "pass",
      severity: "good",
      scoreImpact: 15,
      message: `Meta description is ideal (${metaDesc.length} characters).`,
      recommendation: "Provides high click-through rate in search results.",
    });
  } else if (metaDesc.length > 160) {
    score += 8;
    checks.push({
      id: "desc-length",
      title: "Meta Description Too Long",
      category: "description",
      status: "warn",
      severity: "warning",
      scoreImpact: -7,
      message: `Description is ${metaDesc.length} characters (over 160 limit).`,
      recommendation: "Keep meta description under 160 characters to avoid trailing ellipsis.",
    });
  } else if (metaDesc.length > 50) {
    score += 7;
    checks.push({
      id: "desc-length",
      title: "Meta Description Too Short",
      category: "description",
      status: "warn",
      severity: "warning",
      scoreImpact: -8,
      message: `Description is ${metaDesc.length} characters (minimum recommended 120).`,
      recommendation: "Add compelling product highlights and Nordic warranty details.",
    });
  } else {
    checks.push({
      id: "desc-length",
      title: "Missing or Thin Meta Description",
      category: "description",
      status: "fail",
      severity: "critical",
      scoreImpact: -15,
      message: "Meta description is missing or under 50 characters.",
      recommendation: "Write an engaging 120-160 character description.",
    });
  }

  // 3. Focus Keyword Checks
  if (keyword) {
    // In Title
    if (inMetaTitle || inTitle) {
      score += 15;
      checks.push({
        id: "kw-title",
        title: "Focus Keyword in Title",
        category: "keyword",
        status: "pass",
        severity: "good",
        scoreImpact: 15,
        message: `Keyword "${keyword}" appears in the title.`,
        recommendation: "Strong relevance signal for organic search ranking.",
      });
    } else {
      checks.push({
        id: "kw-title",
        title: "Keyword Missing in Meta Title",
        category: "keyword",
        status: "fail",
        severity: "critical",
        scoreImpact: -15,
        message: `Meta title does not contain "${keyword}".`,
        recommendation: `Include "${keyword}" early in the meta title.`,
      });
    }

    // In Meta Description
    if (inMetaDesc) {
      score += 10;
      checks.push({
        id: "kw-desc",
        title: "Focus Keyword in Description",
        category: "keyword",
        status: "pass",
        severity: "good",
        scoreImpact: 10,
        message: `Keyword appears in meta description.`,
        recommendation: "Keywords are highlighted in bold in search snippets.",
      });
    } else {
      checks.push({
        id: "kw-desc",
        title: "Keyword Missing in Description",
        category: "keyword",
        status: "warn",
        severity: "warning",
        scoreImpact: -10,
        message: `Meta description does not contain "${keyword}".`,
        recommendation: `Integrate "${keyword}" naturally in the snippet.`,
      });
    }

    // In URL Slug
    if (inSlug) {
      score += 10;
      checks.push({
        id: "kw-slug",
        title: "Focus Keyword in URL Slug",
        category: "slug",
        status: "pass",
        severity: "good",
        scoreImpact: 10,
        message: "URL slug reflects target keyword.",
        recommendation: "Clean keyword-rich URLs improve crawl relevancy.",
      });
    } else {
      checks.push({
        id: "kw-slug",
        title: "Keyword Missing in URL Slug",
        category: "slug",
        status: "warn",
        severity: "warning",
        scoreImpact: -10,
        message: `Slug "${slug}" does not reflect the focus keyword.`,
        recommendation: `Update slug to include "${keyword.replace(/\s+/g, "-")}".`,
      });
    }

    // In Content & Headings
    if (inHeadings && inFirstParagraph) {
      score += 15;
      checks.push({
        id: "kw-content-structure",
        title: "Keyword in Headings & Intro",
        category: "content",
        status: "pass",
        severity: "good",
        scoreImpact: 15,
        message: "Keyword is placed in H1/H2 and in the introductory text.",
        recommendation: "Reinforces topical authority for search crawlers.",
      });
    } else if (inFirstParagraph || inHeadings) {
      score += 8;
      checks.push({
        id: "kw-content-structure",
        title: "Partial Keyword Structural Placement",
        category: "content",
        status: "warn",
        severity: "warning",
        scoreImpact: -7,
        message: "Keyword appears in either headings or intro, but not both.",
        recommendation: "Ensure keyword is present in both an H2 subhead and the first paragraph.",
      });
    } else {
      checks.push({
        id: "kw-content-structure",
        title: "Keyword Missing in Body Hierarchy",
        category: "content",
        status: "fail",
        severity: "critical",
        scoreImpact: -15,
        message: "Focus keyword absent from headings and opening paragraph.",
        recommendation: "Add focus keyword to feature subheadings and opening overview.",
      });
    }

    // Keyword Density (0.8% - 2.5%)
    if (density >= 0.8 && density <= 2.5) {
      score += 10;
      checks.push({
        id: "kw-density",
        title: "Healthy Keyword Density",
        category: "keyword",
        status: "pass",
        severity: "good",
        scoreImpact: 10,
        message: `Keyword density is ${density}% (${kwCount} occurrences).`,
        recommendation: "Optimal frequency without risk of keyword stuffing.",
      });
    } else if (density > 2.5) {
      score += 3;
      checks.push({
        id: "kw-density",
        title: "Keyword Over-Optimization",
        category: "keyword",
        status: "warn",
        severity: "warning",
        scoreImpact: -7,
        message: `Keyword density is high at ${density}% (${kwCount} occurrences).`,
        recommendation: "Reduce repetition to avoid search penalty for keyword stuffing.",
      });
    } else {
      score += 2;
      checks.push({
        id: "kw-density",
        title: "Low Keyword Frequency",
        category: "keyword",
        status: "warn",
        severity: "warning",
        scoreImpact: -8,
        message: `Density is only ${density}% (${kwCount} occurrences in ${wordCount} words).`,
        recommendation: "Incorporate keyword into 2-3 more feature descriptions.",
      });
    }
  } else {
    checks.push({
      id: "kw-none",
      title: "No Focus Keyword Set",
      category: "keyword",
      status: "warn",
      severity: "warning",
      scoreImpact: -30,
      message: "Target focus keyword is empty.",
      recommendation: "Specify a focus keyword (e.g. 'wireless earbuds ANC') to unlock in-depth audit.",
    });
  }

  // 4. Media & ALT Text Coverage
  if (images.length > 0) {
    const altRatio = imagesWithAlt / images.length;
    if (altRatio >= 0.8) {
      score += 10;
      checks.push({
        id: "media-alt",
        title: "Image ALT Text Coverage",
        category: "media",
        status: "pass",
        severity: "good",
        scoreImpact: 10,
        message: `${imagesWithAlt}/${images.length} images have descriptive ALT text.`,
        recommendation: "Compliant with WCAG 2.1 AA and Google Image Search indexing.",
      });
    } else {
      score += Math.round(altRatio * 8);
      checks.push({
        id: "media-alt",
        title: "Missing Image ALT Text",
        category: "media",
        status: "warn",
        severity: "warning",
        scoreImpact: -5,
        message: `Only ${imagesWithAlt} of ${images.length} images have ALT text.`,
        recommendation: "Add descriptive ALT text to all gallery and feature photos.",
      });
    }
  }

  // 5. Content Volume
  if (wordCount >= 200) {
    score += 5;
    checks.push({
      id: "content-depth",
      title: "Content Length",
      category: "content",
      status: "pass",
      severity: "good",
      scoreImpact: 5,
      message: `Rich content volume with ${wordCount} words (~${readingTimeMinutes} min read).`,
      recommendation: "Sufficient depth for search engine contextual comprehension.",
    });
  } else {
    checks.push({
      id: "content-depth",
      title: "Thin Content",
      category: "content",
      status: "warn",
      severity: "warning",
      scoreImpact: -5,
      message: `Only ${wordCount} words found.`,
      recommendation: "Expand feature descriptions and overview copy to at least 200 words.",
    });
  }

  const finalScore = Math.min(100, Math.max(0, Math.round(score)));

  let grade: SeoAuditResult["grade"] = "F";
  if (finalScore >= 90) grade = "A+";
  else if (finalScore >= 80) grade = "A";
  else if (finalScore >= 70) grade = "B";
  else if (finalScore >= 60) grade = "C";
  else if (finalScore >= 50) grade = "D";

  // Previews
  const baseUrl = "https://www.ankernordics.com";
  const targetUrl = `${baseUrl}/products/${slug || "product-slug"}`;

  return {
    score: finalScore,
    grade,
    checks,
    keywordMetrics: {
      keyword,
      count: kwCount,
      density,
      inTitle,
      inMetaTitle,
      inMetaDescription: inMetaDesc,
      inSlug,
      inHeadings,
      inFirstParagraph,
      inImagesAltCount: imagesWithKw,
      totalImages: images.length,
    },
    serpPreview: {
      desktop: {
        title: metaTitle || input.title || "Anker Nordics",
        url: targetUrl,
        snippet: metaDesc || "Explore official Anker audio, charging, and smart home innovations.",
      },
      mobile: {
        title: metaTitle || input.title || "Anker Nordics",
        url: targetUrl,
        snippet: metaDesc || "Explore official Anker audio, charging, and smart home innovations.",
      },
    },
    socialPreview: {
      openGraph: {
        title: metaTitle || input.title,
        description: metaDesc || "Official Nordic warranty and express delivery.",
        image: input.ogImage || images[0]?.url || "/images/1204_black.png",
        siteName: "Anker Nordics Store",
        url: targetUrl,
      },
      twitter: {
        title: metaTitle || input.title,
        description: metaDesc || "Official Nordic warranty and express delivery.",
        image: input.ogImage || images[0]?.url || "/images/1204_black.png",
        card: "summary_large_image",
      },
    },
    stats: {
      wordCount,
      charCount,
      readingTimeMinutes,
    },
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
