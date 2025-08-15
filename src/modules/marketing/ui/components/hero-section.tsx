import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

import { Button } from "@template/components/ui/button";

const HeroSection = () => (
  <div className="relative overflow-hidden">
    {/* Background gradient accent */}
    <div className="bg-primary/10 absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl" />
    <div className="bg-primary/5 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl" />

    <div className="relative container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-5 md:gap-12 md:py-20 lg:py-24 xl:gap-16 2xl:max-w-[1400px]">
      {/* Text column - takes 3/5 on desktop, full on mobile */}
      <div className="flex flex-col justify-center md:col-span-3 md:pr-6 xl:pr-12">
        <div className="space-y-6 md:space-y-8">
          {/* Label with dots */}
          <div className="flex items-center space-x-3">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <h2 className="text-primary text-sm font-semibold tracking-wider uppercase">
              Art Director & Visual Designer
            </h2>
          </div>

          {/* Main heading with multi-line approach */}
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="block">Creating Brands</span>
            <span className="text-primary mt-1 block">That Resonate</span>
          </h1>

          {/* Description text */}
          <p className="text-muted-foreground max-w-xl text-lg">
            I specialize in transforming complex ideas into compelling visual
            narratives. With a decade of experience in branding and visual
            design, I help businesses build memorable identities that connect
            with their audience.
          </p>

          {/* Featured clients section */}
          <div className="pt-2">
            <p className="text-muted-foreground mb-3 text-sm font-medium">
              TRUSTED BY
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-muted-foreground/70 hover:text-foreground font-semibold transition-colors">
                STUDIO
              </div>
              <div className="text-muted-foreground/70 hover:text-foreground font-semibold transition-colors">
                ARTLAB
              </div>
              <div className="text-muted-foreground/70 hover:text-foreground font-semibold transition-colors">
                DESIGNCO
              </div>
              <div className="text-muted-foreground/70 hover:text-foreground font-semibold transition-colors">
                VISUALS+
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group"
            >
              View Portfolio
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group"
            >
              Contact Me
              <ExternalLink className="ml-2 h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image column - takes 2/5 on desktop, full on mobile */}
      <div className="relative flex aspect-[4/5] w-full items-center md:col-span-2 md:aspect-auto md:h-[600px]">
        {/* Decorative element */}
        <div className="border-primary/20 bg-background/50 absolute -top-6 -right-6 h-20 w-20 rounded-md border backdrop-blur-sm"></div>

        {/* Main image with frame */}
        <div className="border-muted/30 bg-muted/10 relative z-10 h-full w-full overflow-hidden rounded-2xl border shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Designer's workspace with contemporary design elements"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Decorative element */}
        <div className="border-primary/10 bg-background/50 absolute -bottom-6 -left-6 h-24 w-24 rounded-full border backdrop-blur-sm"></div>
      </div>
    </div>
  </div>
);

export default HeroSection;
