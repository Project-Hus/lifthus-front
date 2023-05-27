//create routine page tap

import { SearchIcon } from "@chakra-ui/icons";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Input, Flex, Card } from "@chakra-ui/react";


const SelectRoutine = () => {
    return (
        <div >
            <Tabs isFitted variant='unstyled' >
                <TabList >
                    <Tab _selected={{ color: 'white', bg: "#9298E2" }}>나의 프로그램</Tab>
                    <Tab _selected={{ color: 'white', bg: "#9298E2" }}>프로그램 검색</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p >내 프로그램 결과 출력</p>
                    </TabPanel>
                    <TabPanel>
                        <form>

                            <Flex >
                                <SearchIcon marginRight="0.4em" height="100%" alignSelf={"center"} />
                                <Input type="text" placeholder="프로그램 검색" />
                            </Flex>
                        </form>
                        <Card marginTop="0.5em">
                            Search 결과 출력
                        </Card>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );

}
export default SelectRoutine;