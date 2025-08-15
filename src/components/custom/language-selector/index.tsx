"use client";
import { useCallback, useId } from "react";
import { GlobeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@template/components/ui/select";
import { Locale } from "@template/i18n/config";
import { setUserLocale } from "@template/services/locale";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const LanguageSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const id = useId();

  const onChange = useCallback(
    (value: Locale) => {
      setUserLocale(value);
      router.refresh();
    },
    [router],
  );

  if (!locale) return null;

  return (
    <Select
      defaultValue={locale}
      onValueChange={onChange}
    >
      <SelectTrigger
        id={`language-${id}`}
        className="[&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground h-8 border-none px-2 shadow-none [&>svg]:shrink-0"
        aria-label="Select language"
      >
        <GlobeIcon
          size={16}
          aria-hidden="true"
        />
        <SelectValue className="hidden sm:inline-flex" />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
        {languages.map(lang => (
          <SelectItem
            key={lang.value}
            value={lang.value}
          >
            <span className="flex items-center gap-2">
              <span className="truncate">{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
