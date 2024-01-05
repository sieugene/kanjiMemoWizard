import { SearchForPhraseResponse } from "@/server";
import { ROUTES } from "@/shared/routes";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  info: SearchForPhraseResponse["phrase"][0];
};
export const PhraseCard: FC<Props> = ({ info }) => {
  const { t } = useTranslation();
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5 ">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {info.slug}
            </h4>
            {info.senses.map((sense, senseKey) => (
              <h4
                className="text-small font-semibold leading-none text-default-600"
                key={`sense-${senseKey}`}
              >
                {sense.english_definitions[0]}
              </h4>
            ))}
          </div>
        </div>
        <Link href={ROUTES.search(info.slug)} shallow>
          <Button
            className={"bg-transparent text-foreground border-default-200"}
            color="primary"
            radius="full"
            size="sm"
            variant={"bordered"}
          >
            {t("Search")}
          </Button>
        </Link>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {info.japanese.map((example, exampleKey) => {
          return (
            <p key={`example-${exampleKey}`}>
              {example.word} [{example.reading}]
            </p>
          );
        })}
      </CardBody>
      <CardFooter className="gap-3">
        {info.slug &&
          info.slug.split("").map((kanji, kanjiOfSlugKey) => (
            <div className="flex gap-1" key={`slug-${kanjiOfSlugKey}`}>
              <Link href={ROUTES.kanji(kanji)} target="_blank">
                <p
                  className="font-semibold text-default-400 text-small"
                  style={{ color: "#0170f0" }}
                >
                  {kanji}
                </p>
              </Link>
            </div>
          ))}

        <div className="flex gap-1">
          {!!info.jlpt?.length && (
            <p className="font-semibold text-default-400 text-small">
              {info.jlpt[0]}
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
