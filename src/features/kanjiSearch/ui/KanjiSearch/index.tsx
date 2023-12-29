import { SearchIcon } from "@/shared/ui/icons";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { useSearchKanji } from "../../hooks/useSearchKanji";
import { useMemo } from "react";
import { ROUTES } from "@/shared/routes";
import Link from "next/link";
import { css } from "styled-components";
import { useHeaderStore } from "@/widgets/Header/store";

export const KanjiSearch = () => {
  const { data, input, setInput, debouncedInput } = useSearchKanji();
  const inputIsFilled = useMemo(
    () => debouncedInput.length >= 1,
    [debouncedInput.length]
  );
  const hasData = useMemo(() => data.length >= 1, [data.length]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();
  const { close: closeHeader } = useHeaderStore();

  return (
    <>
      <InputButton
        color="primary"
        variant="bordered"
        onClick={onOpen}
        startContent={<SearchIconStyled />}
      >
        {t("Search Kanji")}
      </InputButton>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input
                  defaultValue={input}
                  label={t("Search")}
                  isClearable
                  onClear={() => {}}
                  radius="lg"
                  placeholder={t("Type kanji or sentence...")}
                  startContent={<SearchIconStyled />}
                  onChange={(e) => setInput(e.target.value)}
                />
              </ModalHeader>
              <Body>
                <ScrollShadow className="h-[400px]">
                  <ScrollContent>
                    {!inputIsFilled && (
                      <h2>{t("Type in search for show results")}</h2>
                    )}
                    {!hasData && inputIsFilled && (
                      <h2>{t("Kanji not found")}</h2>
                    )}

                    {hasData &&
                      inputIsFilled &&
                      data.map((a) => {
                        return (
                          <Preview key={a.kanji}>
                            <Link
                              onClick={() => {
                                onClose();
                                closeHeader();
                              }}
                              href={ROUTES.kanji(a.kanji)}
                              shallow
                            >
                              {a.kanji}
                            </Link>
                            <p>{`(${a.meanings[0]})`}</p>
                            <div className="readings">
                              <span>
                                {a.readings_kun.slice(0, 3).map((a) => `${a} `)}
                              </span>
                              <span>
                                {a.readings_on.slice(0, 3).map((a) => `${a} `)}
                              </span>
                            </div>
                          </Preview>
                        );
                      })}
                  </ScrollContent>
                </ScrollShadow>
              </Body>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("Close")}
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const InputButton = styled(Button)`
  ${({ theme }) => css`
    /* ${theme.fonts.base.config.style}; */
    ${theme.breakpoints.lessThan("md")} {
    }
  `}
`;
const Body = styled(ModalBody)``;
const ScrollContent = styled.div`
  height: 400px;
`;
const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  a {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.blue};
  }
  p {
    color: #706d6d;
  }
  .readings {
    display: flex;
    flex-direction: column;
    span {
      font-size: 10px;
    }
  }
`;

const SearchIconStyled = styled(SearchIcon).attrs({
  className:
    "text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0",
})``;
