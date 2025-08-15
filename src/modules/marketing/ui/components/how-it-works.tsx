"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@template/components/ui/button";

const HowItWorks = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/* Video CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-primary/10 text-primary">
                  Watch How It Works
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  See our platform in action
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our short video walkthrough demonstrates how easy it is to get
                  started and shows the key features that make our solution
                  stand out.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Quick setup process</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Intuitive user interface</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Advanced features walkthrough</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <Button
                  size="lg"
                  asChild
                >
                  <Link href="#">Try It Free</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <Link href="#">Schedule Demo</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg">
              {isPlaying ? (
                <div className="relative w-full h-full">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-2 right-2 z-10 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-background"
                    aria-label="Close video"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Product Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  ></iframe>
                </div>
              ) : (
                <Button
                  asChild
                  className="relative h-full w-full cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <div>
                    <Image
                      src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                      alt="Product walkthrough video thumbnail showing interface demo"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-primary text-primary-foreground p-2 transition-transform group-hover:scale-110">
                        <PlayCircle className="h-12 w-12" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Video CTA Section */}
    </>
  );
};

export default HowItWorks;
