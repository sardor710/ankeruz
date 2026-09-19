// Topology #37 (SectionHeading "Featured Blogs and News") + #38 (card row).
//
// Spec: docs/research/components/featured-blogs.spec.md
//
// NOTE — BREAKPOINT SUBSTITUTION: the target uses named Tailwind tiers that are
// NOT registered in this project's globals.css: tablet:(768) laptop:(1024)
// desktop:(1440) lg-desktop:(1920). They are written here as Tailwind v4
// arbitrary variants with the same pixel values: min-[768px]:, min-[1024px]:,
// min-[1440px]:, min-[1920px]:.
//
// NOTE — 14px ROOT: globals.css sets `html { font-size: 14px }`, so Tailwind's
// rem scale resolves at 0.875x. Class names lifted from the target are used
// verbatim; every value the spec states as a MEASUREMENT is written as an
// arbitrary `[Npx]` instead.
//
// NOTE — NO SWIPER: the target's row is a Swiper instance. It is reproduced
// here with the same CSS `overflow-x-auto` + scroll-snap scroller as
// `ProductCarousel.tsx`, so no new dependency is added.
//
// NOTE — TARGET-SITE CONTENT BUG, REPRODUCED VERBATIM: cards 6 and 7 pair a
// charger title with a pet-odour excerpt. This is the live site's own CMS
// output (verified against its DOM per the spec), not a mistake made while
// building this component. Do not swap, rewrite, or "correct" the pairings.

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

interface BlogCard {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image: string;
  readonly href: string;
}

/**
 * 8 cards, verbatim Swedish copy. Cards 6 and 7 intentionally carry a
 * mismatched (charger title / pet-odour excerpt) pairing — see the file-level
 * note above and the spec's "Target-site content bug" callout.
 */
const FEATURED_BLOGS: readonly BlogCard[] = [
  {
    id: "blog-1",
    title:
      "Projektor utomhus till VM 2026: Välj rätt modell för din trädgård, balkong eller sommarstuga",
    excerpt:
      "VM 2026 går av stapeln den 11 juni till den 19 juli, mitt under svensk högsommar. Att se matcherna på en projektor utomhus ger dig en skärm på 120 tum eller mer mot husväggen, utan att du behöver flytta in någon tung utrustning. Den här guiden hjälper dig att välja rätt projektor för din situation och planera vilket match som passar bäst för en kväll i trädgården.",
    image: "/images/image1.jpg",
    href: "/blogs/se/projectors/outdoor-cinema-projector-for-world-cup",
  },
  {
    id: "blog-2",
    title:
      "Projektor bäst i test 2026 – Topp 5 för VM och hemmabio",
    excerpt:
      "VM 2026 är det största fotbollsmästerskapet hittills: 48 lag, 104 matcher, och Sverige är med. Att följa turneringen på en storbildsskärm gör skillnad för hela känslan i rummet. En projektor bäst i test ger dig 100–120 tum för en bråkdel av vad en TV i samma storlek kostar, och du kan dessutom flytta den efter behov.",
    image: "/images/image1.png",
    href: "/blogs/se/projectors/projector-best-in-test-world-cup",
  },
  {
    id: "blog-3",
    title:
      "Bästa mini projektorn för VM 2026: Topp 5 att titta på fotboll med",
    excerpt:
      "VM 2026 är nära och det är dags att tänka på hur du vill uppleva matcherna. En miniprojektor gör det möjligt att följa fotbollen på en storduk hemma i vardagsrummet, ute på balkongen eller i trädgården – utan att behöva investera i en fast hemmabio.",
    image:
      "/images/1ec53e0e-4f69-4972-a945-fcdc0d9cbca8.__cr0_0_2196_900_pt0_sx1464_v1.jpg",
    href: "/blogs/se/projectors/best-mini-projector-world-cup",
  },
  {
    id: "blog-4",
    title:
      "Golvet luktar illa efter moppning: Fem orsaker och lösningar",
    excerpt:
      "Din mopp ska göra rummet fräscht, inte ofräscht. Om ditt golv luktar illa efter att du har moppat kan rester av rengöringsmedel, kvardröjande fukt eller osynliga mikrober vara bove i dramat. Innan du slänger rengöringsmedlet eller skyller på moppen, stanna upp och titta på vad som händer på ytan och i små springor.",
    image: "/images/frame_4_1_-1.png",
    href: "/blogs/se/robot-vacuum/floor-smells-after-mopping",
  },
  {
    id: "blog-5",
    title:
      "Så här ansluter du din telefon till TV:n med en USB-C till HDMI-adapter",
    excerpt:
      "Det finns tillfällen då det är mycket praktiskt att kunna ansluta sin smartphone till andra enheter. Oavsett om du vill titta på film, visa bilder, spela spel eller använda mobilen för arbete hemifrån, behöver du först veta hur du ansluter en mobil enhet till en TV.",
    image: "/images/frame_10.png",
    href: "/blogs/se/chargers/connect-phone-to-tv-using-usb-c-to-hdmi-solution",
  },
  {
    id: "blog-6",
    title: "45W vs 65W laddare för telefon: Vilken bör du välja?",
    // NOTE: pet-odour excerpt, not a charger excerpt — target-site content
    // bug, reproduced verbatim. See file-level note.
    excerpt:
      "Hundar är underbara, men ibland händer det olyckor. Trots bra träning kan det hända att din hund råkar kissa på dina trägolv. Om detta händer, få inte panik. Problemet med hur man får bort hundkisslukt från golvet går att lösa, och det är faktiskt inte så svårt!",
    image: "/images/frame_12_3.png",
    href: "/blogs/se/chargers/45w-vs-65w-charger-for-phone-comparison",
  },
  {
    id: "blog-7",
    title:
      "45W vs 30W laddningshastighet: Hur mycket tid sparar du egentligen?",
    // NOTE: carpet pet-smell excerpt, not a charger excerpt — target-site
    // content bug, reproduced verbatim. See file-level note.
    excerpt:
      "Som djurägare känner vi alla till den där ”karaktäristiska husdjursdoften” som bara vägrar lämna mattan. Dessa envisa lukter kan sprida sig genom hela huset och påverka atmosfären. Men frukta inte! Innan du överväger att kasta ut mattan, låt oss fräscha upp den på ett enkelt sätt.",
    image: "/images/frame_13-3.png",
    href: "/blogs/se/chargers/45w-vs-30w-charging-speed-iphone",
  },
  {
    id: "blog-8",
    title:
      "Är en 45W-laddare bättre för daglig laddning av iPhone? Hastighet och batterihälsa",
    excerpt:
      'Under många år definierades den "vanliga" laddningsupplevelsen för iPhone av den lilla klassiska 5 W-kuben.',
    image: "/images/frame_14-2.png",
    href: "/blogs/se/chargers/45w-charger-for-daily-iphone-charging",
  },
];

export function FeaturedBlogs() {
  const headingId = "featured-blogs-heading";

  return (
    <>
      <SectionHeading text="Featured Blogs and News" id={headingId} />

      <section
        aria-labelledby={headingId}
        className="ipc_container relative z-10 w-full overflow-hidden bg-[#F5F5F7]"
      >
        <div className="mx-auto size-full px-4 pb-[27px] min-[768px]:px-8 min-[1024px]:px-16 min-[1440px]:px-16 min-[1920px]:max-w-full min-[1920px]:px-[calc(50%-832px)]">
          <ul
            tabIndex={0}
            className="flex w-full list-none snap-x snap-proximity overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
          >
            {FEATURED_BLOGS.map((blog) => (
              <li key={blog.id} className="relative shrink-0 snap-start">
                <article className="flex h-[480px] w-[824px]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={404}
                    height={480}
                    className="h-[480px] w-[404px] object-cover"
                  />
                  <div className="flex min-h-[200px] w-[420px] flex-1 flex-col gap-4 overflow-hidden bg-white p-4 min-[768px]:p-6 min-[1024px]:gap-[60px] min-[1920px]:p-8">
                    <h3 className="mb-2 text-[14px] font-bold leading-[1.2] tracking-[-0.02em] text-[#080A0F] min-[1440px]:text-[16px] min-[1920px]:text-[18px]">
                      {blog.title}
                    </h3>
                    <p className="line-clamp-6 max-h-[144px] min-h-[100px] text-xl font-bold leading-[1.2] tracking-[-0.04em] text-[#080A0F] min-[1440px]:max-h-[186px] min-[1920px]:text-2xl min-[1920px]:leading-[1.2]">
                      {blog.excerpt}
                    </p>
                    <span className="font-bold tracking-[-0.02em] text-pretty text-[#080A0F] min-[1920px]:text-[18px]">
                      Learn More
                    </span>
                  </div>
                </article>
                <Link
                  href={blog.href}
                  className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080A0F]"
                >
                  <span className="sr-only">{blog.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
