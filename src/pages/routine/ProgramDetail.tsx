import { Flex, Image, Select, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import programApi from "../../api/programApi";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import { ThemeColor } from "../../common/styles/theme.style";

const ProgramDetail = () => {
  const slug = useParams().slug || "";
  const codeIndex = slug.lastIndexOf("code") + 4;
  const code = slug.substring(codeIndex);

  const { data } = useQuery(["program", { code: code }], async () =>
    programApi.queryProgramByCode(code)
  );

  const { register, watch } = useForm();

  const relCnt = data?.releases.length || 0;
  const latestRel = data?.releases[relCnt - 1];

  const [curVer, setCurVer] = useState(Number(watch("versionSelect")) || 0);
  console.log(curVer, watch("versionSelect"));
  return (
    <BasicPageLayout>
      <div>
        <div>
          <Flex
            bgColor={ThemeColor.topButtonColor}
            borderTopRadius="1rem"
            padding="1rem"
          >
            <Text fontWeight="bold">{data?.title}</Text>
            &nbsp;
            <Select
              bgColor={ThemeColor.backgroundColor}
              w="5rem"
              {...register("versionSelect", {
                onChange: () => {
                  setCurVer(Number(watch("versionSelect")));
                },
              })}
              defaultValue={latestRel?.version || 0}
            >
              {data?.releases.map((r, idx) => (
                <option key={idx} value={r.version}>{`v${r.version}`}</option>
              ))}
            </Select>
          </Flex>
        </div>
      </div>
    </BasicPageLayout>
  );
};

export default ProgramDetail;
