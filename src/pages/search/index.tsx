import { JishoSearcher } from "@/features/JishoSearch/ui/JishoSearcher";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SearchPage = () => {
  return (
    <div>
      <JishoSearcher />
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  const locale = context.locale || "";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}) satisfies GetServerSideProps;

export default SearchPage;
