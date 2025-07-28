import RankingHeader from "@/components/home/RankingSection/components/RankingHeader/index";
import RankingFilterTabs from "@/components/home/RankingSection/components/RankingFilterTabs/index";
import RankingSubFilterTabs from "@/components/home/RankingSection/components/RankingSubFilterTabs/index";
import RankingGrid from "@/components/home/RankingSection/components/RankingGrid/index";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import { Suspense } from "react";
import LoadingPage from "@/pages/LoadingPage";

export default function RankingSection() {
  return (
    <div css={whiteSectionStyle()}>
      <RankingHeader />
      <RankingFilterTabs />
      <RankingSubFilterTabs />
      <Suspense fallback={<LoadingPage />}>
        <RankingGrid />
      </Suspense>
    </div>
  );
}
