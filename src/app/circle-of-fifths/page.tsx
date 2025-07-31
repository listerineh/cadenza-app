"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/cadenza/LanguageProvider";
import CircleOfFifths from "@/components/cadenza/CircleOfFifths";
import KeyInfo from "@/components/cadenza/KeyInfo";
import PageLayout from "@/components/cadenza/PageLayout";

export default function CircleOfFifthsPage() {
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();
  const [selectedKey, setSelectedKey] = useState("C");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !t) return null;
  const tPage = t("CircleOfFifthsPage");

  return (
    <PageLayout title={tPage.title} subtitle={tPage.subtitle}>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center items-center">
          <CircleOfFifths
            selectedKey={selectedKey}
            onKeySelect={setSelectedKey}
          />
        </div>
        <div className="flex justify-center items-center">
          <KeyInfo selectedKey={selectedKey} />
        </div>
      </div>
    </PageLayout>
  );
}
