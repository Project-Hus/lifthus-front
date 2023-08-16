import { Avatar, Stack, StackItem, Text } from "@chakra-ui/react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { ThemeColor } from "../../../common/styles/theme.style";
import "./calendar.css";

const ProfileHeatmap = () => {
  return (
    <>
      <ReactCalendarHeatmap
        startDate={new Date(new Date().setMonth(new Date().getMonth() - 9))}
        endDate={new Date()}
        monthLabels={[]}
        values={[
          { date: "2023-01-02", count: 2 },
          { date: "2023-01-03", count: 3 },
          { date: "2023-01-04", count: 4 },
          { date: "2023-01-05", count: 4 },
          { date: "2023-01-06", count: 2 },
          { date: "2023-01-07", count: 4 },
          { date: "2023-01-08", count: 4 },
          { date: "2023-01-09", count: 4 },
        ]}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${value.count}`;
        }}
      />
      <div>
        <Stack>
          <StackItem>
            <Avatar
              margin={"0.2em"}
              name={"Powerlifter"}
              bgColor={ThemeColor.basicColor}
              src={
                "https://pngimg.com/uploads/powerlifting/powerlifting_PNG44.png"
              }
              sx={{
                "@media screen and (max-width: 350px)": {
                  w: "2em",
                  h: "2em",
                },
              }}
            />
          </StackItem>
          <StackItem>
            <Text fontSize={"sm"}>
              This feature will come with routine service!
            </Text>
          </StackItem>
        </Stack>
      </div>
    </>
  );
};

export default ProfileHeatmap;
